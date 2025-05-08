'use client'

import { useState } from 'react'

export default function TestPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testAI = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/test-ai')
      const data = await response.json()
      if (!data.success) {
        throw new Error(data.error || 'Failed to generate thought')
      }
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">AI Test Page</h1>
      
      <button
        onClick={testAI}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
      >
        {loading ? 'Testing...' : 'Test AI Generation'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="font-bold mb-2">Generated Thought:</h2>
          <p className="mb-4">{result.thought}</p>
          
          <h2 className="font-bold mb-2">Details:</h2>
          <pre className="bg-gray-200 p-2 rounded overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
} 