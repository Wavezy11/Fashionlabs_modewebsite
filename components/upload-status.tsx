"use client"

interface UploadStatusProps {
  status: "idle" | "uploading" | "success" | "error"
  progress?: number
  message?: string
}

export function UploadStatus({ status, progress = 0, message }: UploadStatusProps) {
  if (status === "idle") return null

  return (
    <div className="mt-4">
      {status === "uploading" && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <div className="flex-1">
              <p className="text-blue-800 font-medium">Uploaden...</p>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-blue-600 text-sm mt-1">{progress}% voltooid</p>
            </div>
          </div>
        </div>
      )}

      {status === "success" && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="text-green-800 font-medium">Upload succesvol!</p>
              {message && <p className="text-green-600 text-sm">{message}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
