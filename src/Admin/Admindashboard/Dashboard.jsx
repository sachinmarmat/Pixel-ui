import React from 'react'
import AnalyticsOverview from './AnalyticsOverview'
import DashboardCards from './Chart'

const Dashboards = () => {
    return (
        <div className='px-10 mr-10'>
            <h1 className='text-gray-400 font-medium  text-xm pb-4 sm:pb-8'>Information about current plan & Users</h1>
            <div className="flex flex-row  justify-center gap-5">
                <div className="bg-white p-2 pt-3 flex flex-col gap-1.5 px-6 rounded">
                    <h1 className='flex flex-row gap-3 text-center items-center text-xl font-medium'>Total Employers <span className="bg-red-300 rounded-2xl text-xs p-0.5">10.0%</span></h1>
                    <h3 className="text-xl font-semibold">886 </h3>
                    <p className="text-gray-400 font-medium text-xm">Employer</p>
                </div>
                <div className="bg-white p-2 pt-3 flex flex-col gap-1.5 px-6 rounded">
                    <h1 className='flex flex-row gap-3 text-center items-center text-xl font-medium'>Total Employers <span className="bg-red-300 rounded-2xl text-xs p-0.5">10.0%</span></h1>
                    <h3 className="text-xl font-semibold">886 </h3>
                    <p className="text-gray-400 font-medium text-xm">Employer</p>
                </div>
                <div className="bg-white p-2 pt-3 flex flex-col gap-1.5 px-6 rounded">
                    <h1 className='flex flex-row gap-3 text-center items-center text-xl font-medium'>Total Employers <span className="bg-red-300 rounded-2xl text-xs p-0.5">10.0%</span></h1>
                    <h3 className="text-xl font-semibold">886 </h3>
                    <p className="text-gray-400 font-medium text-xm">Employer</p>
                </div>
                <div className="bg-white p-2 pt-3 flex flex-col gap-1.5 px-6 rounded">
                    <h1 className='flex flex-row gap-3 text-center items-center text-xl font-medium'>Total Employers <span className="bg-red-300 rounded-2xl text-xs p-0.5">10.0%</span></h1>
                    <h3 className="text-xl font-semibold">886 </h3>
                    <p className="text-gray-400 font-medium text-xm">Employer</p>
                </div>
            </div>
            <div className="mt-8">

                <AnalyticsOverview />
            </div>
            <div className="mt-10 pb-10">
                <DashboardCards/>
            </div>
        </div>
    )
}

export default Dashboards
