import React from 'react'

const Notification = () => {
  return (
    <div className='ml-15'>
      <div className='py-2'>
        <h1 className='text-2xl font-bold '>Notifications</h1>
      </div>
      <div className='bg-blue-100 p-33 place-items-center flex flex-col gap-3 items-center rounded-2xl max-w-full px-55 h-[80vh]'>
       
       <img src='https://cdn-icons-png.flaticon.com/512/7271/7271863.png' alt='bell-img'className='w-35'/>
        <h1 className='text-2xl font-semibold'>
          Haven`t got any Notification?
        </h1>
        <p className='text-xm text-gray-700 font-medium items-center text-center'>
          You will soon get notification. meanwill <br />browser relative jobs and Noukri
        </p>
        <button className='text-white bg-blue-600 p-2 px-4 cursor-pointer hover:bg-blue-700 rounded-3xl'>Go to Recommendation</button>
      </div>
    </div>
  )
}

export default Notification
