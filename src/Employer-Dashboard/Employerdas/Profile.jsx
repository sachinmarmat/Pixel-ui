import React from "react";
import { BiSearch } from "react-icons/bi";
import { BsFillBellFill } from "react-icons/bs";
import { IoPeopleSharp } from "react-icons/io5";
import profilebg from "../../assets/profilebg.jpg";
import { Repeat } from "lucide-react";
import logo from "../../assets/logo.png";
import { IoEarthOutline } from "react-icons/io5";
import { IoMail } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { BsBuildingFillAdd } from "react-icons/bs";


const Profile = () => {
  return (
    <div className="bg-blue-200 min-h-screen  ">
      <div className=" flex justify-between text-3xl  px-12 py-10 items-center">
        <h1 className="font-bold">PixelGenix</h1>
        <p>
          <BsFillBellFill className="text-gray-500 cursor-pointer hover:text-gray-600" />
        </p>
      </div>
      <div className="border-b-2 border-gray-400"></div>

      <div className="px-8 pt-15 pb-8">
        <h1 className="text-2xl text-orange-600 font-medium flex gap-2 items-center">
          <IoPeopleSharp className="bg-white text-3xl rounded-4xl p-0.5 " />
          Application
        </h1>
        <div
          className=" rounded-2xl  mt-5"
          style={{
            backgroundImage: `url(${profilebg}) `, backgroundSize: "cover", backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="bg-gray-300/40">
            <div className="  p-4  rounded-2xl pt-5">
              <div className="relative hidden md:block text-right mt-3 ">
                <input
                  placeholder="Search job here"
                  className="w-65 text-xm  border outline-none  border-gray-400 pl-4 pr-10 py-1.5 rounded-3xl bg-gray-200/70"
                />
                <BiSearch className="absolute top-5 right-1  -translate-y-1/2 text-3xl bg-blue-500 rounded-full p-1 text-white cursor-pointer hover:bg-blue-600" />
              </div>
            </div>

            <div className="flex items-center gap-2 sm:pl-8">
              <a href="/">
                <img
                  src={logo}
                  alt="logo-img"
                  className="w-10 sm:w-12 rounded-3xl"
                /> 
              </a>
              <h1 className="text-2xl md:text-3xl font-medium">PixelGenix</h1>
            </div>
            <div className="px-5 pt-12">
              <div className="bg-black/60  px-5 pr-20 p-4  rounded-2xl">
                <h1 className="text-xl font-bold pb-3">About</h1>
                <p className="w-full h-23 text-gray-400 ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusantium sint suscipit <br />sequi iste ratione perspiciatis
                  voluptatem. Dignissimos, ea. Veniam beatae, maiores <br />incidunt
                  suscipit obcaecati nobis blanditiis consectetur error modi odit
                  dignissimos<br /> eveniet vero facere voluptatem.
                </p>
              </div>
            </div>
            <div className="mt-10 px-5  pb-15">
              <div className="bg-gray-400/90 w-full p-4 flex flex-col gap-3 sm:text-xm  rounded-2xl">
                <h1 className="text-2xl font-bold ">Contect Information</h1>
                <h1 className="flex gap-2 text-white font-medium hover:underline cursor-pointer"><span><IoEarthOutline className="text-blue-700 text-2xl" />
                </span >https://pixelgenixitsolution.com/</h1>
                <h1 className="flex gap-2 items-center cursor-pointer hover:underline"><span><IoMail className="text-2xl" /></span>pixelgenix@gmail.com</h1>
                <h1 className="flex gap-2 items-center cursor-pointer hover:underline "><span><FaPhone className="text-green-700 text-2xl" /></span>+91 9876543210</h1>
                <h1 className="flex gap-2 items-center cursor-pointer hover:underline"><span><BsBuildingFillAdd className="text-2xl" /></span>New Sanganer, jaipur, Raj. (302019)</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
