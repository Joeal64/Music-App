from http.server import BaseHTTPRequestHandler
import json
import os
import tempfile
import yt_dlp
import sys

# Add the backend directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', 'backend'))

from services.recognition import recognise_song

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Parse request body
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            youtube_url = data.get('url')
            if not youtube_url:
                self.send_error(400, "No URL provided")
                return
            
            # Configure yt-dlp
            ydl_opts = {
                'format': 'bestaudio/best',
                'noplaylist': True,
                'extract_flat': False,
            }
            
            # Download audio
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                with tempfile.NamedTemporaryFile(delete=False, suffix='.%(ext)s') as temp_file:
                    ydl_opts['outtmpl'] = temp_file.name.replace('.%(ext)s', '.%(ext)s')
                    ydl.download([youtube_url])
                    
                    # Find the downloaded file
                    for ext in ['m4a', 'webm', 'mp3', 'opus']:
                        audio_file = temp_file.name.replace('.%(ext)s', f'.{ext}')
                        if os.path.exists(audio_file):
                            break
                    
                    if not os.path.exists(audio_file):
                        self.send_error(500, "Failed to download audio")
                        return
                    
                    # Recognize the song
                    result = recognise_song(audio_file)
                    
                    # Clean up
                    os.unlink(audio_file)
                    
                    # Send response
                    self.send_response(200)
                    self.send_header('Content-type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps(result).encode())
                    
        except Exception as e:
            self.send_error(500, str(e))
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
