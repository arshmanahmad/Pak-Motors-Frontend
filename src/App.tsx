import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AuthWrapper from './views/auth'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import DashboardWrapper from './components/DashboardWrapper'
import Dashboard from './pages/dashboard/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthWrapper />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<DashboardWrapper />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
