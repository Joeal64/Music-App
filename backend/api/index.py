from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import tempfile
import yt_dlp
from services.recognition import recognise_song
from services.recommendations import recommend_songs

app = FastAPI(title="Music Recognition & Recommendation API", version="1.0.0")

# CORS middleware for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Vercel handler
from mangum import Mangum
handler = Mangum(app)

@app.get("/api")
async def root():
    return {"message": "Music Recognition & Recommendation API"}

@app.post("/api/recognize")
async def recognize_audio(file: UploadFile = File(...)):
    """
    Recognize a song from an uploaded audio file
    """
    try:
        # Validate file type
        if not file.content_type.startswith('audio/'):
            raise HTTPException(status_code=400, detail="File must be an audio file")
        
        # Create temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp3') as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_file_path = temp_file.name
        
        try:
            # Recognize the song
            recognized_song = recognise_song(temp_file_path)
            
            if recognized_song:
                return {
                    "success": True,
                    "song": recognized_song,
                    "message": "Song recognized successfully"
                }
            else:
                return {
                    "success": False,
                    "song": None,
                    "message": "Could not recognize the song"
                }
        
        finally:
            # Clean up temporary file
            os.unlink(temp_file_path)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Recognition failed: {str(e)}")

@app.post("/api/recommend")
async def get_recommendations(request: dict):
    """
    Get song recommendations based on a song title or artist/track combination
    """
    try:
        # Handle both formats: {"song_title": "..."} or {"artist": "...", "track": "..."}
        song_title = request.get("song_title")
        artist = request.get("artist")
        track = request.get("track")
        
        if song_title:
            search_query = song_title
        elif artist and track:
            search_query = f"{track} - {artist}"
        elif track:
            search_query = track
        else:
            raise HTTPException(status_code=400, detail="Either 'song_title' or 'track' is required")
        
        recommendations = recommend_songs(search_query)
        
        return {
            "success": True,
            "song": search_query,
            "recommendations": recommendations,
            "count": len(recommendations)
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Recommendation failed: {str(e)}")

@app.post("/api/recognize-youtube")
async def recognize_youtube(request: dict):
    """
    Recognize a song from a YouTube URL
    """
    try:
        youtube_url = request.get("url")
        if not youtube_url:
            raise HTTPException(status_code=400, detail="YouTube URL is required")
        
        # Validate YouTube URL
        if not ("youtube.com" in youtube_url or "youtu.be" in youtube_url):
            raise HTTPException(status_code=400, detail="Invalid YouTube URL")
        
        # Create temporary directory for audio extraction
        with tempfile.TemporaryDirectory() as temp_dir:
            audio_file_path = os.path.join(temp_dir, "audio.%(ext)s")
            
            # Configure yt-dlp options for audio-only download
            ydl_opts = {
                'format': 'bestaudio[ext=m4a]/bestaudio[ext=webm]/bestaudio[ext=mp3]/bestaudio',
                'outtmpl': audio_file_path,
                'extract_flat': False,
                'writethumbnail': False,
                'writeinfojson': False,
                'no_warnings': True,
                'ignoreerrors': False,
                'quiet': True,
            }
            
            try:
                # Extract audio from YouTube video
                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    ydl.download([youtube_url])
                
                # Find the extracted audio file
                audio_files = [f for f in os.listdir(temp_dir) if any(f.endswith(ext) for ext in ['.m4a', '.webm', '.mp3', '.opus'])]
                if not audio_files:
                    raise HTTPException(status_code=400, detail="Failed to extract audio from YouTube video")
                
                extracted_audio_path = os.path.join(temp_dir, audio_files[0])
                
                # Recognize the song
                recognized_song = recognise_song(extracted_audio_path)
                
                if recognized_song:
                    return {
                        "success": True,
                        "song": recognized_song,
                        "message": "Song recognized successfully from YouTube",
                        "source": "youtube"
                    }
                else:
                    return {
                        "success": False,
                        "song": None,
                        "message": "Could not recognize the song from YouTube video"
                    }
            
            except yt_dlp.DownloadError as e:
                raise HTTPException(status_code=400, detail=f"Failed to download YouTube video: {str(e)}")
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Audio extraction failed: {str(e)}")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"YouTube recognition failed: {str(e)}")

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "API is running"}
