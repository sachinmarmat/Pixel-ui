import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Homedashboard from './Homedashboard'

const Dashboard = () => {
    return (
        <>

            <div className='flex  flex-row  mt-30'>
               <div className=" sticky top-25  ">
                 <Homedashboard />
               </div>
                <div className="flex  p-6 overflow-y-auto"> 
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Dashboard
