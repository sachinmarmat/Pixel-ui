import React, { useRef, useState } from 'react'
import { PiHandWavingFill } from "react-icons/pi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
import Dashbord02 from '../../Componants/Dashbord02';


const Dask = () => {
  // const [index, setIndex] = useState();


  // const slideback = () => {
  //   setIndex(index === 0 ? setIndex.length - 1 : index - 1)
  // }
  // const slidenext = () => {
  //   setIndex(index === 0 ? setIndex.length + 1 : index + 1)
  // }

  const sliderRef = useRef(null);

  const slideNext = () => {
    // scroll 300px to the right
    sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const slideBack = () => {
    // scroll 300px to the left
    sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  // const cards = [
  //   { num: 12, text: "Application Submission" },
  //   { num: 9, text: "Saved Jobs" },
  //   { num: 3, text: "Jobs Shortlist" },
  //   { num: 16, text: "Career Resources" },
  //   { num: 7, text: "Status Jobs" },
  //   { num: 21, text: "Intern" },
  //   { num: 6, text: "Employers" },
  // ];

  return (
    <div>
      <div className='flex flex-col gap-1 py-10 pl-4'>
        <div className='flex gap-2'>
          <PiHandWavingFill className='text-yellow-400 text-6xl' />

          <h1 className='text-5xl font-bold text-blue-600'>Welcome Back<span className='text-orange-600 pl-1'>!</span></h1>
        </div>
        <p className='text-xl font-semibold text-gray-600 '>
          You have 5 new job recommendation today
        </p>
      </div>
      <h1 className='text-3xl font-bold  pl-4 pb-9 py-2 '>Quick State</h1>
      <div className='flex flex-row gap-2 sm:max-w-255'>
        <button className='' onClick={slideBack}>
          <IoIosArrowBack className='bg-orange-600 rounded-4xl text-white hover:bg-orange-600 text-2xl cursor-pointer' />
        </button>

        {/* <div
          ref={sliderRef}
          className="flex gap-10 overflow-x-scroll scroll-smooth scrollbar-hide overflow-hidden"
        >
          {cards.map(({ num, text }, i) => (
            <div
              key={i}
              className="min-w-[220px] w-[220px] h-[200px] bg-gray-100/60
                       shadow-md hover:bg-gray-100 hover:scale-105
                       p-10 rounded-2xl flex flex-col items-center
                       justify-center gap-3 transition-transform duration-300 "
            >
              <h1 className="flex items-center gap-4 text-3xl font-bold">
                <span className="text-blue-500"><IoDocumentText /></span>{num}
              </h1>
              <p className="text-[20px] font-bold text-gray-800 text-center">{text}</p>
            </div>
          ))}
        </div> */}



        <div className='flex flex-row gap-10 overflow-hidden items-center '
          ref={sliderRef}
        >
          <div className="min-w-[220px] w-[220px] h-[200px] bg-gray-100/60  hover:bg-gray-100 hover:scale-105 p-10 rounded-2xl text-xl flex flex-col gap-3 items-center justify-center cursor-pointer">
            <h1 className="flex gap-4 items-center text-3xl font-bold ">
              <span className="text-blue-500 "><IoDocumentText /></span>12</h1>
            <p className="text-[20px] font-bold text-gray-800 text-center">Application Submission</p>
          </div>
          <div className="min-w-[220px] w-[220px] h-[200px] bg-gray-100/60  hover:bg-gray-100 hover:scale-105 p-10 rounded-2xl text-xl flex flex-col gap-3 items-center justify-center cursor-pointer">
            <h1 className='flex gap-4 items-center text-3xl font-bold '>
              <span className='text-blue-500'><IoDocumentText /></span>9</h1>
            <p className='text-[20px] font-bold text-gray-800 text-center'>Saved Jobs </p>
          </div>
          <div className="min-w-[220px] w-[220px] h-[200px] bg-gray-100/60  hover:bg-gray-100 hover:scale-105 p-10 rounded-2xl text-xl flex flex-col gap-3 items-center justify-center cursor-pointer">
            <h1 className='flex gap-4 items-center text-3xl font-bold '> <span className='text-blue-500'><IoDocumentText /></span>3</h1>
            <p className='text-[20px] font-bold text-gray-800 text-center'>Jobs Shortlist</p>
          </div>
          <div className="min-w-[220px] w-[220px] h-[200px] bg-gray-100/60 hover:bg-gray-100 hover:scale-105 p-10 rounded-2xl text-xl flex flex-col gap-3 items-center justify-center cursor-pointer">
            <h1 className='flex gap-4 items-center text-3xl font-bold '> <span className='text-blue-500'><IoDocumentText /></span>16</h1>
            <p className='text-[20px] font-bold text-gray-800  text-center'>Career Resoures</p>
          </div>
          <div className="min-w-[220px] w-[220px] h-[200px] bg-gray-100/60  hover:bg-gray-100 hover:scale-105 p-10 rounded-2xl text-xl flex flex-col gap-3 items-center justify-center cursor-pointer">
            <h1 className='flex gap-4 items-center text-3xl font-bold '> <span className='text-blue-500'><IoDocumentText /></span>7</h1>
            <p className='text-[20px] font-bold text-gray-800  text-center'>Status Jobs</p>
          </div>
          <div className="min-w-[220px] w-[220px] h-[200px] bg-gray-100/60 hover:bg-gray-100 hover:scale-105 p-10 rounded-2xl text-xl flex flex-col gap-3 items-center justify-center cursor-pointer">
            <h1 className='flex gap-4 items-center text-3xl font-bold '> <span className='text-blue-500'><IoDocumentText /></span>21</h1>
            <p className='text-[20px] font-bold text-gray-800  text-center'>Intern</p>
          </div>
          <div className="min-w-[220px] w-[220px] h-[200px] bg-gray-100/60  hover:bg-gray-100 hover:scale-105 p-10 rounded-2xl text-xl flex flex-col gap-3 items-center justify-center cursor-pointer">
            <h1 className='flex gap-4 items-center text-3xl font-bold '> <span className='text-blue-500'><IoDocumentText /></span>6</h1>
            <p className='text-[20px] font-bold text-gray-800 pl-3  text-center'>Employers</p>
          </div>
        </div>
        <button className='' onClick={slideNext}>
          <IoIosArrowForward className='bg-orange-600 rounded-4xl text-white hover:bg-orange-600 text-2xl cursor-pointer' />
        </button>
      </div>


      <Dashbord02 />
    </div>
  )
}

export default Dask
