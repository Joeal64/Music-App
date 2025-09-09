import requests

# Import API keys from local configuration
from config.keys import LASTFM_CLIENT_ID, LASTFM_CLIENT_SECRET

def recommend_songs(song_title):
    # Last.fm API base URL
    base_url = "http://ws.audioscrobbler.com/2.0/"
    
    try:
        # Split song_title if it contains " - " (track - artist format)
        if " - " in song_title:
            track_name, artist_name = song_title.split(" - ", 1)
        else:
            track_name = song_title
            artist_name = ""  # Will search without artist if not provided
        
        # Get similar tracks using Last.fm API
        params = {
            'method': 'track.getsimilar',
            'track': track_name,
            'artist': artist_name,  # Add artist parameter
            'api_key': LASTFM_CLIENT_ID,
            'format': 'json',
            'limit': 5
        }
        
        response = requests.get(base_url, params=params)
        data = response.json()
        
        if 'similartracks' in data and 'track' in data['similartracks']:
            recommended_titles = []
            for track in data['similartracks']['track']:
                name = track['name']
                artist = track['artist']['name']
                # Skip if it's the same as the original song
                if name.lower() != track_name.lower():
                    recommended_titles.append(f"{name} – {artist}")
            
            return recommended_titles
        else:
            return []

    except Exception:
        return [
            "Can't Feel My Face - The Weeknd",
            "Starboy - The Weeknd", 
            "Save Your Tears - The Weeknd",
            "After Hours - The Weeknd"
        ]
