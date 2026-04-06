import paramiko
import threading
import sys
import os
import socket

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))
from app.logger.attack_logger import log_attack

class SSHServer(paramiko.ServerInterface):
    def __init__(self, client_ip):
        self.event = threading.Event()
        self.client_ip = client_ip

    def check_channel_request(self, kind, chanid):
        if kind == 'session':
            return paramiko.OPEN_SUCCEEDED
        return paramiko.OPEN_FAILED_ADMINISTRATIVELY_PROHIBITED

    def check_auth_password(self, username, password):
        # Accept any authentication, log it
        log_attack(
            protocol="SSH",
            source_ip=self.client_ip,
            request_method=username,
            headers={"password": password},
            payload="",
            attack_path="login"
        )
        return paramiko.AUTH_SUCCESSFUL
        
    def check_auth_publickey(self, username, key):
        # Reject public key, force password auth to capture passwords
        return paramiko.AUTH_FAILED
        
    def get_allowed_auths(self, username):
        return 'password'
        
    def check_channel_shell_request(self, channel):
        self.event.set()
        return True

    def check_channel_pty_request(self, channel, term, width, height, pixelwidth, pixelheight, modes):
        return True

def handle_ssh_connection(client, addr, rsa_key):
    try:
        transport = paramiko.Transport(client)
        transport.add_server_key(rsa_key)
        
        server_interface = SSHServer(addr[0])
        try:
            transport.start_server(server=server_interface)
        except paramiko.SSHException:
            return

        channel = transport.accept(20)
        if channel is None:
            return
            
        server_interface.event.wait(10)
        if not server_interface.event.is_set():
            return
            
        channel.send("Welcome to Ubuntu 22.04.1 LTS (GNU/Linux 5.15.0-53-generic x86_64)\r\n\r\nroot@server:~# ")
        
        while True:
            try:
                command = channel.recv(1024).decode('utf-8').strip()
                if not command:
                    break
                    
                if command in ["exit", "quit", "logout"]:
                    break
                    
                log_attack(
                    protocol="SSH",
                    source_ip=addr[0],
                    request_method="EXEC",
                    headers={},
                    payload=command,
                    attack_path="shell"
                )
                
                channel.send("\r\nroot@server:~# ")
                
            except Exception:
                break
                
    except Exception as e:
        print(f"SSH Handler error: {e}")
    finally:
        try:
            client.close()
        except:
            pass

def start_ssh_honeypot(port=2222):
    # Generate a temporary RSA key for the server if it doesn't exist
    key_path = os.path.join(os.path.dirname(__file__), 'dummy_rsa.key')
    if not os.path.exists(key_path):
        key = paramiko.RSAKey.generate(2048)
        key.write_private_key_file(key_path)
    
    rsa_key = paramiko.RSAKey(filename=key_path)
    
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    
    try:
        server_socket.bind(('', port))
        server_socket.listen(100)
        print(f"[*] Started SSH Honeypot on port {port}")
        
        while True:
            client, addr = server_socket.accept()
            print(f"[*] Incoming SSH connection from {addr[0]}")
            threading.Thread(target=handle_ssh_connection, args=(client, addr, rsa_key)).start()
            
    except Exception as e:
        print(f"Failed to start SSH server: {e}")

if __name__ == '__main__':
    start_ssh_honeypot(2222)
