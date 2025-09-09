'use client'

import { useState } from 'react'
import AudioUpload from '@/components/AudioUpload'
import RecognitionResult from '@/components/RecognitionResult'
import Recommendations from '@/components/Recommendations'
import YouTubeLinkInput from '@/components/YouTubeLinkInput'

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

interface RecommendationsResponse {
  success: boolean
  song: string
  recommendations: string[]
  count: number
}

export default function Home() {
  const [recognitionResult, setRecognitionResult] = useState<RecognitionResponse | null>(null)
  const [recommendations, setRecommendations] = useState<RecommendationsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false)
  const [activeTab, setActiveTab] = useState<'upload' | 'youtube'>('upload')

  // Dynamic API base URL - works for both local and production
  const getApiUrl = (endpoint: string) => {
    if (typeof window !== 'undefined') {
      // Client-side: detect if running locally or in production
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      if (isLocal) {
        return `http://localhost:8000${endpoint}` // Local development
      } else {
        return `/api${endpoint}` 
      }
    }
    return `/api${endpoint}` // Server-side rendering fallback
  }

  const handleAudioUpload = async (file: File) => {
    setIsLoading(true)
    setRecognitionResult(null)
    setRecommendations(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(getApiUrl('/recognize'), {
        method: 'POST',
        body: formData,
      })

      const result: RecognitionResponse = await response.json()
      setRecognitionResult(result)

      // If recognition was successful, get recommendations
      if (result.success && result.song) {
        await getRecommendations(result.song.title, result.song.artist)
      }
    } catch (error) {
      console.error('Recognition failed:', error)
      setRecognitionResult({
        success: false,
        song: null,
        message: 'Recognition failed. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleYouTubeSubmit = async (url: string) => {
    setIsLoading(true)
    setRecognitionResult(null)
    setRecommendations(null)

    try {
      const response = await fetch(getApiUrl('/recognize-youtube'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const result: RecognitionResponse = await response.json()
      setRecognitionResult(result)

      // If recognition was successful, get recommendations
      if (result.success && result.song) {
        await getRecommendations(result.song.title, result.song.artist)
      }
    } catch (error) {
      console.error('YouTube recognition failed:', error)
      setRecognitionResult({
        success: false,
        song: null,
        message: 'YouTube recognition failed. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getRecommendations = async (track: string, artist: string) => {
    setIsLoadingRecommendations(true)

    try {
      const response = await fetch(getApiUrl('/recommend'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          track: track,
          artist: artist
        }),
      })

      const result: RecommendationsResponse = await response.json()
      setRecommendations(result)
    } catch (error) {
      console.error('Recommendations failed:', error)
    } finally {
      setIsLoadingRecommendations(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            Music Recognition
          </h1>
          <p className="text-lg text-gray-700">
            Upload an audio file or YouTube link to identify songs
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="grid gap-6">
            {/* Input Method Tabs */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => {
                    setActiveTab('upload')
                    setRecognitionResult(null)
                    setRecommendations(null)
                  }}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'upload'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-800 hover:text-gray-900'
                  }`}
                >
                  Upload Audio
                </button>
                <button
                  onClick={() => {
                    setActiveTab('youtube')
                    setRecognitionResult(null)
                    setRecommendations(null)
                  }}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'youtube'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-800 hover:text-gray-900'
                  }`}
                >
                  YouTube Link
                </button>
              </div>

              {/* Input Components */}
              {activeTab === 'upload' && (
                <AudioUpload onUpload={handleAudioUpload} isLoading={isLoading} />
              )}
              
              {activeTab === 'youtube' && (
                <YouTubeLinkInput onSubmit={handleYouTubeSubmit} isLoading={isLoading} />
              )}
            </div>

            {/* Recognition Result Section */}
            {recognitionResult && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <RecognitionResult result={recognitionResult} />
              </div>
            )}

            {/* Recommendations Section */}
            {recommendations && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <Recommendations 
                  recommendations={recommendations} 
                  isLoading={isLoadingRecommendations} 
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
