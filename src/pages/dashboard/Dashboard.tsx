import Logo from '../../components/Logo'

export default function Dashboard() {
//   const stats = [
//     { name: 'Total Vehicles', value: '1,234', change: '+12%', changeType: 'positive' },
//     { name: 'Active Sales', value: '89', change: '+5%', changeType: 'positive' },
//     { name: 'Monthly Revenue', value: '₨2.4M', change: '+8%', changeType: 'positive' },
//     { name: 'New Customers', value: '156', change: '+23%', changeType: 'positive' },
//   ]

//   const recentActivities = [
//     { id: 1, action: 'New vehicle added', vehicle: 'Toyota Corolla 2024', time: '2 hours ago' },
//     { id: 2, action: 'Sale completed', vehicle: 'Honda Civic 2023', time: '4 hours ago' },
//     { id: 3, action: 'Customer registered', vehicle: 'Suzuki Swift 2024', time: '6 hours ago' },
//     { id: 4, action: 'Vehicle serviced', vehicle: 'Toyota Camry 2023', time: '8 hours ago' },
//   ]


  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome to Pak Motors</h2>
            <p className="text-blue-100 text-lg">Your automotive business dashboard</p>
          </div>
          <Logo size="xl" showText={true} className="opacity-90" />
        </div>
      </div>

      {/* Stats Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`flex items-center text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div> */}

      {/* Main Content Grid */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.vehicle}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 text-center rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <div className="text-2xl mb-2">🚗</div>
              <p className="text-sm font-medium text-gray-700">Add Vehicle</p>
            </button>
            <button className="p-4 text-center rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <div className="text-2xl mb-2">👥</div>
              <p className="text-sm font-medium text-gray-700">Add Customer</p>
            </button>
            <button className="p-4 text-center rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <div className="text-2xl mb-2">💰</div>
              <p className="text-sm font-medium text-gray-700">New Sale</p>
            </button>
            <button className="p-4 text-center rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <div className="text-2xl mb-2">📊</div>
              <p className="text-sm font-medium text-gray-700">View Reports</p>
            </button>
          </div>
        </div>
      </div> */}
    </div>
  )
}
