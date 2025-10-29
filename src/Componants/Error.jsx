import React from 'react'

const Error = () => {
  return (
    <div className='bg-blue-200 min-h-screen'>
      <div className="p-10 py-16">
        <div className="bg-white min-w-full min-h-185 sm:min-h-161 rounded-2xl text-center align-middle  items-center sm:py-53  py-65 flex flex-col gap-3">

          <h1 className="text-6xl font-bold ">404

          </h1>
          <p className="text-xl font-medium"> Oops! This Page Not Found</p>
          <a href="/" className="bg-black p-2 px-4 text-white font-medium inline-block rounded mt-5"> Back to Home Page</a>
        </div>
      </div>
    </div>
  )
}

export default Error
