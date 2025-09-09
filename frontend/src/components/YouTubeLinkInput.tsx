'use client'

import { useState } from 'react'

interface YouTubeLinkInputProps {
  onSubmit: (url: string) => void
  isLoading: boolean
}

export default function YouTubeLinkInput({ onSubmit, isLoading }: YouTubeLinkInputProps) {
  const [url, setUrl] = useState('')

  const isValidYouTubeURL = (url: string) => {
    const patterns = [
      /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
      /^https?:\/\/youtu\.be\/[\w-]+/,
      /^https?:\/\/(www\.)?youtube\.com\/embed\/[\w-]+/
    ]
    return patterns.some(pattern => pattern.test(url))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValidYouTubeURL(url.trim())) {
      onSubmit(url.trim())
      setUrl('')
    } else {
      alert('Please enter a valid YouTube URL')
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            YouTube URL
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 placeholder-gray-500"
            disabled={isLoading}
          />
        </div>
        
        <button
          type="submit"
          disabled={!url.trim() || isLoading || !isValidYouTubeURL(url.trim())}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              Processing...
            </div>
          ) : (
            'Recognize from YouTube'
          )}
        </button>
      </form>
    </div>
  )
}
