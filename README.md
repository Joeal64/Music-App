# Music Recognition & Recommendation App

A modern web application that recognizes songs from audio files or YouTube links and provides music recommendations.

## Features

- 🎵 **Audio Recognition**: Upload audio files (MP3, WAV, M4A) to identify songs
- 🎬 **YouTube Recognition**: Paste YouTube links to identify songs from videos  
- 🎯 **Song Recommendations**: Get similar songs based on recognized tracks
- 🎨 **Modern UI**: Clean, responsive design with dark text for better readability
- 🚀 **Fast Processing**: Powered by ACRCloud for accurate music recognition

## Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **ACRCloud**: Music recognition service
- **Last.fm API**: Song recommendations
- **yt-dlp**: YouTube audio extraction
- **Uvicorn**: ASGI server

### Frontend  
- **Next.js 15**: React framework with TypeScript
- **Tailwind CSS**: Utility-first CSS framework
- **Modern Design**: Clean, minimal interface

## Setup & Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd music-app/backend
```

2. Create and activate virtual environment:
```bash
python -m venv music-app-env
music-app-env\Scripts\activate  # Windows
# or
source music-app-env/bin/activate  # macOS/Linux
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure API keys in `config/keys.py`:

**Get your API keys:**
- **ACRCloud**: Sign up at [ACRCloud Console](https://console.acrcloud.com/) for music recognition
- **Last.fm**: Get API key at [Last.fm API](https://www.last.fm/api) for recommendations

**Update `config/keys.py` with your keys:**
```python
# ACRCloud Configuration (get from ACRCloud Console)
ACR_HOST = 'identify-your-region.acrcloud.com'  # e.g., identify-eu-west-1.acrcloud.com
ACRCLOUD_ACCESS_KEY = 'your_access_key'
ACRCLOUD_ACCESS_SECRET = 'your_access_secret'

# Last.fm Configuration (get from Last.fm API)
LASTFM_CLIENT_ID = 'your_lastfm_api_key'
LASTFM_CLIENT_SECRET = 'your_lastfm_secret'
```

5. Start the backend server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd music-app/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Quick Start

Use the included batch file to start both servers:
```bash
# Windows
start-app.bat

# Or manually start both servers:
# Terminal 1: Backend
cd backend
music-app-env\Scripts\activate
python main.py

# Terminal 2: Frontend  
cd frontend
npm run dev
```

## API Endpoints

- `POST /recognize` - Recognize song from uploaded audio file
- `POST /recognize-youtube` - Recognize song from YouTube URL
- `POST /recommend` - Get song recommendations
- `GET /` - Health check endpoint

## License

This project is for educational and personal use.
