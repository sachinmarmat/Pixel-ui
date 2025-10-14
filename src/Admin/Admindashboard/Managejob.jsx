import React from 'react'

const Managejob = () => {

    const managejobs = [
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
      
            <div className="px-8 pt-5">
                <div className='bg-white sm:min-h-125 p-4 mt-5 rounded-2xl'>
                    <div className='mt-5 px-1'>
                        <div className='flex justify-between  bg-blue-300 p-4 px-6 rounded-t-2xl'>
                            <h1 className='text-xl font-medium'>Job Title</h1>
                            <h1 className='text-xl font-medium sm:ml-10'>Company</h1>
                            <h1 className='text-xl font-medium sm:mr-15 '>Status</h1>
                            <h1 className='text-xl font-medium'>Action</h1>
                        </div>

                        <div className="mt-4">
                            {managejobs.length == 0 ? (
                                <h1 className=" text-3xl text-gray-400 text-center pt-15">No Result</h1>
                            ) : (
                                managejobs.map((items, idx) => {
                                    return (
                                        <>
                                            <div key={idx} className="px-4 py-4 flex gap-5 hover:bg-gray-200 rounded  justify-between text-xm font-medium  items-center">
                                                <h1 className='sm:w-40'>{items.jobtitle}</h1>
                                                <h1 className="items-center   text-center">{items.company}</h1>
                                                <h1 className="bg-green-200 p-o.5 px-2 rounded-2xl ">{items.status}</h1>
                                                <div className='flex'>
                                                    <button className='border bg-orange-500 p-1 px-2 text-white rounded hover:bg-orange-600 cursor-pointer'>Toggle S</button>
                                                    <button className='border bg-black p-1 px-2 rounded text-white cursor-pointer'>Delete</button>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            )}
                        </div >
                    </div>
                </div>

            </div>

    )
}

export default Managejob
