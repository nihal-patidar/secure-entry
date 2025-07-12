import requests
import time
from datetime import datetime

# 🔁 Your deployed Render URL
RENDER_URL = "https://secure-entry-1.onrender.com/test"  # Replace with your actual URL
INTERVAL_SECONDS = 7 * 60  # 7 minutes

def ping_render():
    while True:
        try:
            response = requests.get(RENDER_URL)
            now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            if response.status_code == 200:
                print(f"[{now}] Ping successful ✅")
            else:
                print(f"[{now}] Ping failed ❌ — Status: {response.status_code}")
        except Exception as e:
            print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Error: {e}")
        
        time.sleep(INTERVAL_SECONDS)

if __name__ == "__main__":
    print("🟢 Starting Render Keep-Alive Pinger...")
    ping_render()
