import uvicorn
import os
import multiprocessing
import sys
import threading
from app.honeypot_ssh import start_ssh_honeypot
from app.honeypot_ftp import start_ftp_honeypot

def run_fastapi():
    print("[*] Starting HTTP server on port 8000...")
    uvicorn.run("app.server:app", host="0.0.0.0", port=8000)

if __name__ == "__main__":
    print("Starting SecureShield Honeypot System...")
    
    # We use multiprocessing to run these blocking servers concurrently
    p_fastapi = multiprocessing.Process(target=run_fastapi)
    p_ssh = multiprocessing.Process(target=start_ssh_honeypot, args=(2222,))
    p_ftp = multiprocessing.Process(target=start_ftp_honeypot, args=(2121,))
    
    p_fastapi.start()
    p_ssh.start()
    p_ftp.start()
    
    try:
        p_fastapi.join()
        p_ssh.join()
        p_ftp.join()
    except KeyboardInterrupt:
        print("\nShutting down Honeypot System...")
        p_fastapi.terminate()
        p_ssh.terminate()
        p_ftp.terminate()
        sys.exit(0)
