import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Manageuser = () => {

    const buttonlink = ({ isActive }) =>
        ` p-2 px-3 rounded font-medium cursor-pointer border 
    ${isActive ? "bg-blue-500" : "hover:bg-blue-300"}`


    return (
        <div className='pt-5'>
            <div className="flex gap-4 px-10 pb-4">
                <NavLink to='/Admin/Manageuser' className={buttonlink} end>
                    Job Seekers</NavLink>
                <NavLink to='/Admin/Manageuser/Employers' className={buttonlink}>Employers</NavLink>
            </div>
            <div className="pb-8"> 
                <Outlet />
            </div>
        </div>
    ) 
}

export default Manageuser
