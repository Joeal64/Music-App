# Music Recognition & Recommendation App

A modern web application that recognizes songs from audio files or YouTube links and provides music recommendations.

## 🚀 Live Demo
Deployed on Vercel with automatic deployments from GitHub.

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
```python
# ACRCloud Configuration
ACRCLOUD_HOST = 'your_acrcloud_host'
ACRCLOUD_ACCESS_KEY = 'your_access_key'
ACRCLOUD_ACCESS_SECRET = 'your_access_secret'

# Last.fm Configuration  
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

## API Endpoints

- `POST /recognize` - Recognize song from uploaded audio file
- `POST /recognize-youtube` - Recognize song from YouTube URL
- `POST /recommend` - Get song recommendations
- `GET /health` - Health check endpoint

## Deployment

### Backend Deployment
1. Install dependencies from `requirements.txt`
2. Set up environment variables for API keys
3. Run with: `uvicorn main:app --host 0.0.0.0 --port 8000`

### Frontend Deployment
1. Build the production app: `npm run build`
2. Start production server: `npm start`
3. Or deploy to platforms like Vercel, Netlify, etc.

## Environment Variables

Create a `.env` file in the backend directory:

```env
ACRCLOUD_HOST=your_host
ACRCLOUD_ACCESS_KEY=your_key
ACRCLOUD_ACCESS_SECRET=your_secret
LASTFM_CLIENT_ID=your_lastfm_key
LASTFM_CLIENT_SECRET=your_lastfm_secret
```

## License

This project is for educational and personal use.
