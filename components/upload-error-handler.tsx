"use client"

import { useState } from "react"

interface UploadErrorProps {
  error: string
  tip?: string
  details?: string
  onRetry?: () => void
}

export function UploadError({ error, tip, details, onRetry }: UploadErrorProps) {
  const [showDetails, setShowDetails] = useState(false)

  const isNetworkError = error.includes("Netwerkfout") || error.includes("verbinding")
  const isStorageError = error.includes("Opslag vol") || error.includes("limiet bereikt")

  return (
    <div
      className={`p-4 rounded-lg border ${
        isNetworkError
          ? "bg-orange-50 border-orange-200"
          : isStorageError
            ? "bg-red-50 border-red-200"
            : "bg-red-50 border-red-200"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl">{isNetworkError ? "📶" : isStorageError ? "💾" : "⚠️"}</span>
        <div className="flex-1">
          <h4
            className={`font-bold ${
              isNetworkError ? "text-orange-800" : isStorageError ? "text-red-800" : "text-red-800"
            }`}
          >
            {error}
          </h4>

          {tip && (
            <p
              className={`text-sm mt-1 ${
                isNetworkError ? "text-orange-700" : isStorageError ? "text-red-700" : "text-red-700"
              }`}
            >
              💡 {tip}
            </p>
          )}

          {details && (
            <div className="mt-2">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs text-gray-600 hover:text-gray-800"
              >
                {showDetails ? "Verberg details" : "Toon details"}
              </button>
              {showDetails && <p className="text-xs text-gray-600 mt-1 font-mono bg-gray-100 p-2 rounded">{details}</p>}
            </div>
          )}

          {onRetry && isNetworkError && (
            <button
              onClick={onRetry}
              className="mt-3 bg-orange-600 text-white px-4 py-2 rounded text-sm hover:bg-orange-700 transition-colors"
            >
              🔄 Probeer Opnieuw
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
