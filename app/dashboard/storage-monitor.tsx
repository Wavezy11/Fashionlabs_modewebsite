"use client"

import { useState, useEffect } from "react"
import { supabase } from "../../lib/supabase"

export function StorageMonitor() {
  const [storageInfo, setStorageInfo] = useState({
    totalFiles: 0,
    totalSizeMB: 0,
    percentUsed: 0,
  })

  useEffect(() => {
    async function checkStorage() {
      try {
        const { data: files, error } = await supabase.storage.from("uploads").list()

        if (files && !error) {
          const totalSize = files.reduce((sum, file) => sum + (file.metadata?.size || 0), 0)
          const totalSizeMB = totalSize / 1024 / 1024
          const maxStorageMB = 2000 // 1GB in MB
          const percentUsed = (totalSizeMB / maxStorageMB) * 100

          setStorageInfo({
            totalFiles: files.length,
            totalSizeMB: Math.round(totalSizeMB * 100) / 100,
            percentUsed: Math.round(percentUsed * 100) / 100,
          })
        }
      } catch (error) {
        console.error("Storage check failed:", error)
      }
    }

    checkStorage()
    // Check elke 5 minuten
    const interval = setInterval(checkStorage, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = () => {
    if (storageInfo.percentUsed > 90) return "text-red-600 bg-red-50"
    if (storageInfo.percentUsed > 75) return "text-orange-600 bg-orange-50"
    return "text-green-600 bg-green-50"
  }

  return (
    <div className={`p-3 rounded-lg ${getStatusColor()}`}>
      <h4 className="font-bold mb-2">📊 Opslag Status</h4>
      <div className="text-sm space-y-1">
        <div>
          Foto's: <strong>{storageInfo.totalFiles}/350</strong>
        </div>
        <div>
          Gebruikt: <strong>{storageInfo.totalSizeMB} MB / 2000 MB</strong>
        </div>
        <div>
          Percentage: <strong>{storageInfo.percentUsed}%</strong>
        </div>
      </div>

      {storageInfo.percentUsed > 85 && (
        <div className="mt-2 text-xs font-medium">⚠️ Opslag bijna vol! Overweeg oude foto's te verwijderen.</div>
      )}
    </div>
  )
}
