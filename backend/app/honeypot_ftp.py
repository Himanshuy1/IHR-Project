import sys
import os
from pyftpdlib.authorizers import DummyAuthorizer, AuthenticationFailed
from pyftpdlib.handlers import FTPHandler
from pyftpdlib.servers import FTPServer
import threading

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))
from app.logger.attack_logger import log_attack

class HoneypotAuthorizer(DummyAuthorizer):
    def validate_authentication(self, username, password, handler):
        client_ip = handler.remote_ip
        log_attack(
            protocol="FTP",
            source_ip=client_ip,
            request_method="LOGIN",
            headers={"username": username, "password": password},
            payload="",
            attack_path=""
        )
        
        # We always want them to "login_successfully" to capture what they do,
        # but pyftpdlib requires us to actually add the user dynamically to DummyAuthorizer 
        # to grant them a session if they don't exist.
        if not self.has_user(username):
            # Give them a dummy directory with read/write access
            dummy_dir = os.path.join(os.path.dirname(__file__), "fake_ftp_dir")
            os.makedirs(dummy_dir, exist_ok=True)
            self.add_user(username, password, dummy_dir, perm="elradfmwMT")
            
        super().validate_authentication(username, password, handler)

class HoneypotFTPHandler(FTPHandler):
    # We can override specific command handlers to log all FTP interactions
    def ftp_RETR(self, file):
        log_attack(protocol="FTP", source_ip=self.remote_ip, request_method="DOWNLOAD", headers={}, payload="", attack_path=file)
        super().ftp_RETR(file)

    def ftp_STOR(self, file):
        log_attack(protocol="FTP", source_ip=self.remote_ip, request_method="UPLOAD", headers={}, payload="", attack_path=file)
        super().ftp_STOR(file)

def start_ftp_honeypot(port=2121):
    authorizer = HoneypotAuthorizer()
    
    handler = HoneypotFTPHandler
    handler.authorizer = authorizer
    handler.banner = "220 ProFTPD 1.3.5e Server (Debian) [::ffff:192.168.1.100]"
    
    # Optional: You can specify passive ports if desired
    # handler.masquerade_address = '151.25.42.11'
    # handler.passive_ports = range(60000, 65535)

    server = FTPServer(('', port), handler)
    print(f"[*] Started FTP Honeypot on port {port}")
    server.serve_forever()

if __name__ == "__main__":
    start_ftp_honeypot(2121)
