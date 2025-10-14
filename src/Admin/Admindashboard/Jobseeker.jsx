import React from 'react'

const Jobseeker = () => {


  const jobseeker = [
        {
            employer: "Raghav singh",
            jobtitle: "Frontend Developer",
            status: "Active"
        },
        {
            employer: "Devs dhosan",
            jobtitle: "UI Developer",
            status: "Shortlisted"
        },
        {
            employer: "Rajan chipa",
            jobtitle: "Backend Developer",
            status: "Rejected"
        },
        {
            employer: "Surendra bairwa",
            jobtitle: "Designer",
            status: "Accepted"
        },
        {
            employer: "Raghav chadda",
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
                                <h1 className='text-xl font-medium'>Name</h1>
                                <h1 className='text-xl font-medium sm:pr-18'>Status</h1>
                                <h1 className='text-xl font-medium'>Action</h1>
                            </div>
                            <div className="mt-4">
                                {jobseeker.length == 0 ? (
                                    <h1 className=" text-3xl text-gray-400 text-center pt-15">No Jobs Application</h1>
                                ) : (
                                    jobseeker.map((item, idx) => {
                                        return (
                                            <div key={idx} className="px-4 py-4 flex gap-5 hover:bg-gray-200 rounded  justify-between text-xm font-medium  items-center">
                                                <div className="flex flex-col">
                                                    <h1>{item.employer}</h1>
                                                    <h1 className="text-gray-500 text-xs hover:underline">{item.jobtitle}</h1>
                                                </div>
                                                <h1 className="bg-green-200 p-o.5 px-2 rounded-2xl">{item.status}</h1>
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

export default Jobseeker
