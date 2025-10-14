import React from 'react'

const Employers = () => {


    const employer = [
        {
            company: "TCS",
            jobtitle: "Frontend Developer",
            status: "Active"
        },
        {
            company: "Google",
            jobtitle: "UI Developer",
            status: "Shortlisted"
        },
        {
            company: "Pixel Genix",
            jobtitle: "Backend Developer",
            status: "Rejected"
        },
        {
            company: "Tech Corp",
            jobtitle: "Designer",
            status: "Accepted"
        },
        {
            company: "@vidia",
            jobtitle: "Designer",
            status: "Shortlisted"
        }
    ]
 
    return (
        <div>
            <div className="px-7  ">
                <div className='bg-white sm:min-h-125 p-4 mt-3 rounded-2xl'>
                    <div className='mt-4 px-1 '>
                        <div className='flex justify-between  bg-blue-300 p-4 px-8 rounded-t-2xl'>
                            <h1 className='text-xl font-medium'>Company</h1>
                            <h1 className='text-xl font-medium sm:pr-18'>Status</h1>
                            <h1 className='text-xl font-medium'>Action</h1>
                        </div>
                        <div className="mt-4">
                            {employer.length == 0 ? (
                                <h1 className=" text-3xl text-gray-400 text-center pt-15">No Jobs Application</h1>
                            ) : (
                                employer.map((data, idx) => {
                                    return (
                                        <div key={idx} className="px-4 py-4 flex gap-5 hover:bg-gray-200 rounded  justify-between text-xm font-medium  items-center">
                                            <div className="flex flex-col">
                                                <h1>{data.company}</h1>
                                                <h1 className="text-gray-500 text-xs hover:underline">{data.jobtitle}</h1>
                                            </div>
                                            <h1 className="bg-green-200 p-o.5 px-2 rounded-2xl">{data.status}</h1>
                                            <div className='flex'>
                                                <button className='border bg-blue-500 p-1 rounded text-white hover:bg-blue-600 cursor-pointer'>Activeted</button>
                                                <button className='border bg-orange-500 p-1 rounded text-white hover:bg-orange-600 cursor-pointer'>Suspend</button>
                                                <button className='border bg-black p-1 rounded text-white cursor-pointer'>Delete</button>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Employers
