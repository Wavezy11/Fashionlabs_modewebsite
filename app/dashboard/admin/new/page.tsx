"use client"

import ProtectedRoute from "../../../../components/ProtectedRoute"
// Make sure the file exists at the correct path and update the import if necessary
import NewAdminPage from "./new-admin-page"

export default function NewAdmin() {
  return (
    <ProtectedRoute>
      <NewAdminPage />
    </ProtectedRoute>
  )
}
