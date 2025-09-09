from acrcloud.recognizer import ACRCloudRecognizer
import json

# Import API keys from local configuration
from config.keys import ACR_HOST as ACRCLOUD_HOST, ACRCLOUD_ACCESS_KEY, ACRCLOUD_ACCESS_SECRET

def recognise_song(file_path):
    try:
        # ACRCloud configuration
        config = {
            'host': ACRCLOUD_HOST,
            'access_key': ACRCLOUD_ACCESS_KEY,
            'access_secret': ACRCLOUD_ACCESS_SECRET,
            'timeout': 10  # 10 seconds timeout
        }
        
        # Create recognizer
        recognizer = ACRCloudRecognizer(config)
        
        # Recognize the audio file
        result = recognizer.recognize_by_file(file_path, 0)
        result_dict = json.loads(result)
        
        # Check if recognition was successful
        if result_dict['status']['code'] == 0:
            # Extract basic music information
            music = result_dict['metadata']['music'][0]
            
            title = music['title']
            artist = music['artists'][0]['name']
            
            # Enhanced album extraction
            album = 'Unknown Album'
            release_date = 'Unknown'
            
            if 'album' in music and music['album'] and isinstance(music['album'], dict):
                if 'name' in music['album']:
                    album = music['album']['name']
                if 'release_date' in music['album']:
                    release_date = music['album']['release_date']
            
            # Also check if release_date is at the top level
            if release_date == 'Unknown' and 'release_date' in music:
                release_date = music['release_date']
            
            # Get confidence score only if it actually exists
            confidence = None
            if 'score' in result_dict['status'] and result_dict['status']['score'] is not None:
                confidence = result_dict['status']['score'] * 100  # Convert to percentage
            
            # Try to get album artwork from various sources
            album_art = None
            try:
                # Check external metadata for album art
                if 'external_metadata' in music:
                    ext_meta = music['external_metadata']
                    
                    # Try Spotify first (usually best quality)
                    if 'spotify' in ext_meta and 'album' in ext_meta['spotify']:
                        spotify_album = ext_meta['spotify']['album']
                        if 'images' in spotify_album and spotify_album['images']:
                            album_art = spotify_album['images'][0]['url']
                    
                    # Try Deezer as backup
                    elif 'deezer' in ext_meta and 'album' in ext_meta['deezer']:
                        deezer_album = ext_meta['deezer']['album']
                        if 'cover_medium' in deezer_album:
                            album_art = deezer_album['cover_medium']
                        elif 'cover' in deezer_album:
                            album_art = deezer_album['cover']
                
                # Check if album has direct image URL
                if not album_art and 'album' in music and music['album']:
                    if 'images' in music['album'] and music['album']['images']:
                        album_art = music['album']['images'][0] if isinstance(music['album']['images'][0], str) else music['album']['images'][0].get('url')
                        
            except Exception:
                album_art = None
            
            # Return enhanced structure with real metadata
            return {
                'title': title,
                'artist': artist,
                'album': album,
                'confidence': confidence,
                'release_date': release_date,
                'album_art': album_art,
                'youtube_id': '',
                'spotify_id': '',
                'external_ids': {}
            }
        else:
            return None
            
    except Exception:
        return None
