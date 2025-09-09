import React, { useEffect, useState } from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

const slideindex = [
  {
    img: "https://img.freepik.com/premium-photo/3d-character-animation-icon-logo-cartoon-poses-with-human-body-background_762678-15079.jpg",
    text: "This platform helped me find my dream job! The process was simple, easy, and straightforward.",
    name: "Surendra Bairwa",
  },
  {
    img: "https://tse2.mm.bing.net/th/id/OIP.BEE1wyUjPlj3sr1ny733OQAAAA?pid=ImgDetMain",
    text: "This platform guided me to my career goals! Very user-friendly and effective.",
    name: "Sachin Marmat",
  },
]

const About = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === slideindex.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handlePrev = () => {
    setIndex(index === 0 ? slideindex.length - 1 : index - 1)
  }
  const handleNext = () => {
    setIndex(index === slideindex.length - 1 ? 0 : index + 1)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Testimonials */}
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Testimonials</h1>
      <div className="border bg-blue-400 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          className="cursor-pointer text-xl sm:text-2xl p-2 bg-white rounded-full shadow hover:bg-gray-200"
        >
          <IoIosArrowBack />
        </button>

        {/* Testimonial Content */}
        <div className="flex-1 sm:w-[85%] text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img
              src={slideindex[index].img}
              alt="testimonial"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
            />
            <p className="text-white text-sm sm:text-base md:text-lg max-w-xl">
              {slideindex[index].text}
            </p>
          </div>
          <h2 className="mt-3 font-medium text-lg sm:text-xl">
            {slideindex[index].name}
          </h2>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="cursor-pointer text-xl sm:text-2xl p-2 bg-white rounded-full shadow hover:bg-gray-200"
        >
          <IoIosArrowForward />
        </button>
      </div>

      {/* Job Seeker / Employer Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Job Seeker */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold mb-6">
            For Job Seekers
          </h1>
          <div className="flex flex-col sm:flex-row justify-between border border-gray-900 p-5 rounded-2xl items-center gap-6">
            <button className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-700 transition w-full sm:w-auto cursor-pointer">
              For A Task
            </button>
            <h1 className="font-medium text-lg sm:text-xl">Find Job</h1>
          </div>
        </div>

        {/* Employers */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold mb-6">
            For Employers
          </h1>
          <div className="flex flex-col sm:flex-row justify-between border border-gray-900 p-5 rounded-2xl items-center gap-6">
            <h1 className="font-medium text-lg sm:text-xl">For Employers</h1>
            <button className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-700 transition w-full sm:w-auto cursor-pointer">
              For A Job
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
