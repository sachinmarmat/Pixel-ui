import React from 'react'

const AdminProfile = () => {
  return (
    <div className="ml-20 mt-8">
      <div className='bg-white rounded-2xl w-125 p-4 inline-block px-5 sm:pr-30'>
        <div className="flex flex-col gap-3 justify-between  pb-8 px-3 ">
          <div className="flex gap-4 items-center"> <img src="https://img.lovepik.com/png/20231125/man-avatar-image-for-profile-child-diverse-guy_693690_wh860.png" alt="" className="w-17 rounded-4xl" />
            <h1 className="flex flex-col font-medium ">Admin <span className="text-gray-800 text-xs">HR Manager</span></h1> 
            
            </div> 
          <h1 className="">Email : admin@gmail.com</h1>
          <h1 className="">Phone : +91 123 4567 890</h1>
          <p className="">Website : Pixelgenix.com</p>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile
