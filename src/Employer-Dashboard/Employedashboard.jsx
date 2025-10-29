import React from 'react'
import Employernav from './Employernav'
import { Outlet } from 'react-router-dom'

const Employedashboard = () => {
    return (
        <>
        
            <div className='flex flex-row min-h-screen '>
                <Employernav />

                <div className='flex-1  w-full '>
                    <Outlet />
                </div>
            </div>
        </> 
    )
}

export default Employedashboard
