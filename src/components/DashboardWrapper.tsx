import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import Logo from './Logo'

interface DashboardWrapperProps {
  children?: React.ReactNode
}

export default function DashboardWrapper({ children }: DashboardWrapperProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Purchase', href: '/purchase', icon: '🛒' },
    { name: 'Companies', href: '/companies', icon: '🏢' },
    { name: 'Models', href: '/models', icon: '🚗' },
    { name: 'Entities', href: '/entities', icon: '📋' },
    // { name: 'Vehicles', href: '/dashboard/vehicles', icon: '🚗' },
    // { name: 'Customers', href: '/dashboard/customers', icon: '👥' },
    // { name: 'Sales', href: '/dashboard/sales', icon: '💰' },
    // { name: 'Inventory', href: '/dashboard/inventory', icon: '📦' },
    // { name: 'Reports', href: '/dashboard/reports', icon: '📈' },
    // { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white shadow-lg`}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {sidebarOpen && (
              <Logo size="md" showText={true} />
            )}
            {!sidebarOpen && (
              <Logo size="md" showText={false} />
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg mr-3">{item.icon}</span>
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                U
              </div>
              {sidebarOpen && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">User Name</p>
                  <p className="text-xs text-gray-500">user@pakmotors.com</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Pak Motors Dashboard</h1>
            <div className="flex items-center space-x-4">
             
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  )
}
