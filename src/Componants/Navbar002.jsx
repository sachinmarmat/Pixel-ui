import React from 'react'
import bgimg from '../assets/bg-img.jpg'

const Navbar002 = () => {
  return (
    <div>
      <div className=" min-h-130">

        <div
          className="absolute inset-0 h-160 bg-cover bg-center z-0 "
          style={{ backgroundImage: `url(${bgimg})` }}
        ></div>

        <div className=' relative z-10 container m-auto'>
          <div className='mt-30 justify-center ml-22 '>
            <h1 className='text-7xl font-bold mb-5'>Find the <span className='bg-blue-400 rounded-4xl '>job</span> you love</h1>
            <p className='text-xl text-gray-300 ml-10'>Sreach Through Thousant of Jobs Opportunities</p>
          </div>
          <div className='gap-5 mt-20 flex flex-wrap ml-15'>
            <input type='text' placeholder='Job Title' className='border border-gray-400 p-3 rounded-2xl placeholder:text-gray-200 font-medium items-center pl-4 w-77' />
            <input type='text' placeholder='Location' className='border border-gray-400 p-3 rounded-2xl  placeholder:text-gray-200 font-medium items-center pl-4 w-50 ' />
            <button className='bg-blue-500 p-2 rounded hover:bg-blue-800 cursor-pointer font-medium pl-4 pr-4 transform transition-transform duration-200 hover:scale-110'>Find Job</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar002
