import os
import subprocess

def generate_self_signed_cert():
    certs_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../backend/certificates'))
    os.makedirs(certs_dir, exist_ok=True)
    
    cert_path = os.path.join(certs_dir, 'cert.pem')
    key_path = os.path.join(certs_dir, 'key.pem')
    
    print(f"Generating SSL certificates in {certs_dir}...")
    try:
        subprocess.run([
            "openssl", "req", "-x509", "-newkey", "rsa:4096", "-nodes",
            "-out", cert_path, "-keyout", key_path, "-days", "365",
            "-subj", "/C=US/ST=State/L=City/O=Organization/CN=localhost"
        ], check=True)
        print("Success! Generated cert.pem and key.pem")
    except Exception as e:
        print(f"Failed to generate certificate via OpenSSL. Ensure OpenSSL is installed. Error: {e}")

if __name__ == "__main__":
    generate_self_signed_cert()
