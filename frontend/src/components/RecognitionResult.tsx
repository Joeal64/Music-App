interface Song {
  title: string
  artist: string
  album?: string
  release_date?: string
  confidence?: number
  album_art?: string
  youtube_id?: string
  spotify_id?: string
  external_ids?: any
}

interface RecognitionResponse {
  success: boolean
  song: Song | null
  message: string
}

interface RecognitionResultProps {
  result: RecognitionResponse
}

const generateYouTubeSearchUrl = (title: string, artist: string) => {
  const query = encodeURIComponent(`${title} ${artist}`)
  return `https://www.youtube.com/results?search_query=${query}`
}

const generateSpotifySearchUrl = (title: string, artist: string) => {
  const query = encodeURIComponent(`${title} ${artist}`)
  return `https://open.spotify.com/search/${query}`
}

export default function RecognitionResult({ result }: RecognitionResultProps) {
  if (!result.success) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recognition Result</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-red-800">{result.message}</p>
          </div>
        </div>
      </div>
    )
  }

  const song = result.song!

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Recognition Result</h2>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          {/* Album Art */}
          <div className="flex-shrink-0">
            {song.album_art ? (
              <img 
                src={song.album_art} 
                alt={`${song.album} cover`}
                className="w-20 h-20 rounded-lg object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://via.placeholder.com/80x80/6B7280/FFFFFF?text=${encodeURIComponent(song.title.charAt(0))}`
                }}
              />
            ) : (
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
            )}
          </div>
          
          {/* Song Details */}
          <div className="flex-grow">
            <div className="space-y-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {song.title}
                </h3>
                <p className="text-gray-700">
                  by {song.artist}
                </p>
              </div>
              
              {song.album && (
                <p className="text-sm text-gray-600">
                  Album: {song.album}
                </p>
              )}
              
              {song.release_date && song.release_date !== 'Unknown' && (
                <p className="text-sm text-gray-600">
                  Release: {song.release_date}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <a
            href={generateYouTubeSearchUrl(song.title, song.artist)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube
          </a>
          
          <a
            href={generateSpotifySearchUrl(song.title, song.artist)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Spotify
          </a>
        </div>
      </div>
    </div>
  )
}
