import { Dropdown } from "bootstrap";
import React from "react";
import { BsFillBellFill } from "react-icons/bs";
import { FaCirclePlus } from "react-icons/fa6";


const Postjobs = () => {
  return (
    <>
      <div className="bg-blue-200 min-h-screen  ">
        <div className=" flex justify-between text-3xl  px-12 py-10 items-center">
          <h1 className="font-bold">PixelGenix</h1>
          <p className="sm:pr-5">
            <BsFillBellFill className="text-gray-500" />
          </p>
        </div>
        <div className="border-b-2 border-gray-400"></div>

        <div className="px-8 pt-15 pb-8 sm:pr-15 ">
          <h1 className="text-2xl text-orange-600 font-medium flex gap-2 items-center">
            <FaCirclePlus className="text-3xl p-0.5" />
            Post Job
          </h1>

          <div className="bg-white  p-4 mt-5 rounded-2xl ">
            <div className="flex flex-col gap-8 p-4 py-5 ">
              <div className="flex flex-col gap-2 ">
                <h1 className="text-2xl font-semibold">Job Title</h1>
                <input
                  className="border rounded-xl py-4 font-sans border-gray-400 p-3 w-full"
                  placeholder="e.g. Seniour UI/UX Designer "
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold">Job Description</h1>
                <textarea
                  className="border rounded-xl  font-normal border-gray-400 p-3 w-full h-40"
                  placeholder="Description the role, responsibilities and requirement "
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-6   ">
                <div className="flex flex-col gap-2 sm:w-1/2">
                  <h1 className="text-2xl font-semibold">Salary range</h1>
                  <input
                    className="border rounded-xl py-4 font-sans border-gray-400 p-3 w-full"
                    placeholder="e.g. $1000-$5000 "
                  />
                </div>
                <div className="flex flex-col gap-2 sm:w-1/2">
                  <h1 className="text-2xl font-semibold">Location</h1>
                  <input
                    className="border rounded-xl py-4 font-sans border-gray-400 p-3 w-full"
                    placeholder="e.g. Shyam Nagar,Jaipur  "
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col gap-2 sm:w-1/2">
                  <h1 className="text-2xl font-semibold">Job Type</h1>
                  <input
                    className="border rounded-xl py-4 font-sans border-gray-400 p-3 w-full"
                    placeholder="Select job type "
                  />
                </div>
                <div className="flex flex-col gap-2 sm:w-1/2">
                  <h1 className="text-2xl font-semibold">
                    Application Deadline
                  </h1>
                  <input
                    className="border rounded-xl py-4 font-sans border-gray-400 p-3 w-full"
                    type="date"
                    placeholder=" "
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold">Skill Required</h1>
                <input
                  className="border rounded-xl py-4 font-sans border-gray-400 p-3 w-full"
                  placeholder="e.g. Seniour UI/UX Designer "
                />
              </div>
              <div className="flex gap-2 justify-end ">
                <button className="border bg-gray-200 p-1 sm:p-2 hover:bg-blue-500 font-medium hover:text-white rounded cursor-pointer px-4">
                  Cancal
                </button>
                <button className="border p-1 sm:p-2 bg-blue-500 hover:bg-blue-600 font-medium  text-white rounded cursor-pointer px-4">
                  Post Job
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Postjobs;
