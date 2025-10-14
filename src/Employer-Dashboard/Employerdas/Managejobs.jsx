import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { BsFillBellFill } from 'react-icons/bs'
import { IoPeopleSharp } from 'react-icons/io5'

const Managejobs = () => {


  const [search, setsearch] = useState("");

  const managejobs = [
    {
      employer: "Raghav singh",
      jobtitle: "Frontend Developer",
      date: "22 sep 2025",
      status: "Active",
      recived: "13",
    },
    {
      employer: "Devs dhosan",
      jobtitle: "UI Developer",
      date: "21 august 2025",
      status: "Shortlisted",
      recived: "4",

    },
    {
      employer: "Rajan chipa",
      jobtitle: "Backend Developer",
      date: "14 sep 2025",
      status: "Rejected",
      recived: "22",

    },
    {
      employer: "Surendra bairwa",
      jobtitle: "Designer",
      date: "4 june 2025",
      status: "Accepted",
      recived: "10",

    },
    {
      employer: "Raghav chadda",
      jobtitle: "Designer",
      date: "30 june 2025",
      status: "Shortlisted",
      recived: "23",

    }
  ]

  const managejobfilter = managejobs.filter(jobs =>
    jobs.jobtitle.toLowerCase().includes(search.toLowerCase()) ||
    jobs.employer.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='bg-blue-200 min-h-screen  '>
      <div className=' flex justify-between text-3xl  px-12 py-10 items-center'>
        <h1 className='font-bold'>
          PixelGenix
        </h1>
        <p>
          <BsFillBellFill className='text-gray-500 hover:text-gray-600 cursor-pointer' />
        </p>

      </div>
      <div className='border-b-2 border-gray-400'></div>


      <div className='px-8 pt-15 pb-8'>
        <h1 className='text-2xl text-orange-600 font-medium flex gap-2 items-center'>
          <IoPeopleSharp className='bg-white text-3xl rounded-4xl p-0.5' />
          Manage Jobs
        </h1>

        <div className='bg-white sm:min-h-125 p-4 mt-5 rounded-2xl'>
          <div className="relative hidden md:block text-right mt-3 ">
            <input
              placeholder="Search job here"
              type='text'
              value={search}
              onChange={e => setsearch(e.target.value)}
              className="w-65 text-xm  border outline-none  border-gray-400 pl-4 pr-10 py-2 rounded-3xl bg-gray-200"
            />
            <BiSearch className="absolute top-5 right-1 -translate-y-1/2 text-3xl bg-blue-500 rounded-full p-1 text-white  cursor-pointer hover:bg-blue-600" />
          </div>
          <div className='mt-8 px-1'>
            <div className='flex justify-between mt-5  bg-blue-300 p-4 px-5 rounded-t-2xl'>
              <h1 className='text-xl font-medium'>Job Title</h1>
              <h1 className='text-xl font-medium sm:pl-20'>Status</h1>
              <h1 className='text-xl font-medium sm:pl-15'>Date Posted</h1>
              <h1 className='text-xl font-medium'>Application Recived</h1>
              <h1 className='text-xl font-medium'>Action</h1>
            </div>

            <div className="mt-4">
              {managejobfilter.length == 0 ? (
                <h1 className=" text-3xl text-gray-400 text-center pt-15">No Result</h1>
              ) : (
                managejobfilter.map((items, idx) => {
                  return (
                    <>
                      <div key={idx} className="px-4 py-4 flex gap-5 hover:bg-gray-200 rounded  justify-between text-xm font-medium  items-center">
                        <div className="flex flex-col">
                          <h1>{items.employer}</h1>
                          <h1 className="text-gray-500 text-xs hover:underline">{items.jobtitle}</h1>
                        </div>
                        <h1 className="bg-green-400 p-o.5 px-2 rounded-2xl ">{items.status}</h1>
                        <h1 className=" ">{items.date}</h1>
                        <h1 className="w-5 text-center">{items.recived}</h1>
                        <div className='flex'>
                          <button className='border bg-blue-500 p-1 rounded hover:bg-blue-600 cursor-pointer'>Edit</button>
                          <button className='border bg-blue-500 p-1 rounded hover:bg-blue-600 cursor-pointer'>Close</button>
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
    </div>
  )
}

export default Managejobs
