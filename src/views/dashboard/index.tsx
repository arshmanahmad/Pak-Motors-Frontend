import { Outlet } from 'react-router-dom'
import DashboardWrapper from '../../components/DashboardWrapper'

export default function DashboardLayout() {
  return (
    <DashboardWrapper>
      <Outlet />
    </DashboardWrapper>
  )
}
