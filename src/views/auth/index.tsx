import { Outlet } from 'react-router-dom'

export default function AuthWrapper() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  )
}
