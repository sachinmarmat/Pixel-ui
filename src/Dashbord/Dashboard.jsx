import React from 'react'
import { Outlet } from 'react-router-dom'
import Homedashboard from './Homedashboard'
import Dask from './DesComponant/Dask'

const Dashboard = () => {
    return (
        <>
            <div className='flex flex-row min-h-screen mt-30'>
                <Homedashboard />
                <div className="flex  p-6">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Dashboard
