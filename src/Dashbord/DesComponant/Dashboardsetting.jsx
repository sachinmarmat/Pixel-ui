import React from 'react'
import { Outlet } from 'react-router-dom'

const Dashboardsetting = () => {
  return (
    <div>
      {/* This is the wrapper page */}
      <Outlet />
    </div>
  )
}

export default Dashboardsetting
