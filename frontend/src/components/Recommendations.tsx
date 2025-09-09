interface RecommendationsResponse {
  success: boolean
  song: string
  recommendations: string[]
  count: number
}

interface RecommendationsProps {
  recommendations: RecommendationsResponse
  isLoading: boolean
}

const generateYouTubeSearchUrl = (songTitle: string) => {
  const query = encodeURIComponent(songTitle)
  return `https://www.youtube.com/results?search_query=${query}`
}

const generateSpotifySearchUrl = (songTitle: string) => {
  const query = encodeURIComponent(songTitle)
  return `https://open.spotify.com/search/${query}`
}

export default function Recommendations({ recommendations, isLoading }: RecommendationsProps) {
  if (isLoading) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Similar Songs</h2>
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-700">Finding similar songs...</p>
        </div>
      </div>
    )
  }

  if (!recommendations.success || recommendations.recommendations.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Similar Songs</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="text-4xl mb-4">🤔</div>
          <p className="text-gray-700">
            No similar songs found for this track
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Similar Songs</h2>
      
      <div className="text-left">
        <div className="mb-6">
          <p className="text-gray-700">
            Based on: <span className="text-gray-900 font-semibold">{recommendations.song}</span>
          </p>
          <p className="text-sm text-gray-600">
            Found {recommendations.count} similar tracks
          </p>
        </div>
        
        <div className="grid gap-4">
          {recommendations.recommendations.map((song, index) => (
            <div 
              key={index}
              className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition-colors duration-200 border border-gray-200"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold text-lg">
                  {index + 1}
                </div>
                
                <div className="flex-grow">
                  <p className="text-gray-900 font-medium">{song}</p>
                </div>
                
                <div className="flex-shrink-0 flex space-x-2">
                  <a
                    href={generateYouTubeSearchUrl(song)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-200 text-sm"
                    title="Search on YouTube"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  
                  <a
                    href={generateSpotifySearchUrl(song)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors duration-200 text-sm"
                    title="Search on Spotify"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                  </a>
                  
                  <button 
                    className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors duration-200 text-sm"
                    onClick={() => {
                      navigator.clipboard.writeText(song)
                      alert(`"${song}" copied to clipboard!`)
                    }}
                    title="Copy to clipboard"
                  >
                    📋
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            💡 Click the buttons to watch on YouTube, listen on Spotify, or copy song names
          </p>
        </div>
      </div>
    </div>
  )
}
