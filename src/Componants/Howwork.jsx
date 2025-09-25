import React from "react";
import { BsFilePerson } from "react-icons/bs";
import { MdEditDocument } from "react-icons/md";
import { PiHandshakeFill } from "react-icons/pi";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";


const Howwork = () => {
  const steps = [
    {
      icon: <BsFilePerson className="text-6xl text-blue-600" />,
      title: "Register",
      title2: "(Step-1)",
    },
    { icon: <FaArrowRightLong className="text-4xl text-gray-500" /> },
    {
      icon: <MdEditDocument className="text-6xl text-blue-600 hover:text-red-600  hover:scale-110" />,
      title: "Apply",
      title2: "(Step-2)",
    },
    { icon: <FaArrowRightLong className="text-4xl text-gray-500" /> },
    {
      icon: <PiHandshakeFill className="text-6xl text-blue-600" />,
      title: "Get Hired",
      title2: "(Step-3)",
    },
  ];

  // ✨ Animation variant
  const stepVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 1.2, // stagger each item by 0.2s
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="sm:px-20">
      <div className="mt-15 bg-gray-100 shadow-xm hover:shadow p-5 rounded-2xl">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-11 sm:mb-7 hover:underline">
          How it Works
        </h1>

        <div className="flex sm:flex-row gap-11 sm:gap-14 items-center justify-center sm:pr-22">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={stepVariant}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-2 items-center text-center"
            >
              {/* ✅ Show the icon */}
              <div className="hover:scale-110 cursor-pointer hover:text-red-700"> {step.icon}</div>

              {/* Show title only if it exists (arrows don’t need text) */}
              {step.title && (
                <>
                  <h1 className="font-medium text-xl sm:text-2xl pt-4">
                    {step.title}
                  </h1>
                  <h1 className="font-medium text-gray-500 text-center text-sm">
                    {step.title2}
                  </h1>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Howwork;
