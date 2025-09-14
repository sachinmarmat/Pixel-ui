import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa6";


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
];

const About = () => {
  const [index, setIndex] = useState(0); 
 
  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === slideindex.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setIndex(index === 0 ? slideindex.length - 1 : index - 1);
  };
  const handleNext = () => {
    setIndex(index === slideindex.length - 1 ? 0 : index + 1);
  };



  // const [steps, setSteps] = useState(["for Apply ", "For topic", "in expert"]); // 3 filters
  // const [openDropdown, setOpenDropdown] = useState();

  // // Step 1 options (only two)
  // const firstOptions = ["For Job Seekers", "For Job Employers"];

  // // Step 2 options based on Step 1
  // const secondOptions = {
  //   "For Job Seekers": ["webDeginer", "Frontend", "Intern"],
  //   "For Job Employers": ["Backend", "Frontend", "Fullstack"],
  // };

  // // Step 3 options (final filter)
  // const thirdOptions = {
  //   Frontend: ["React", "Angular", "Vue"],
  //   Backend: ["Node.js", "Django", "Spring Boot"],
  //   Fullstack: ["MERN", "MEAN", "LAMP"],
  //   Intern: ["frashar", "some experiouns"],
  //   webDeginer: ["Figma", "Animation"]
  // };

  // const handleSelect = (index, value) => {
  //   const newSteps = [...steps];
  //   newSteps[index] = value;

  //   // Reset next steps if parent changes
  //   if (index === 0) {
  //     newSteps[1] = "";
  //     newSteps[2] = "";
  //   } else if (index === 1) {
  //     newSteps[2] = "";
  //   }

  //   setSteps(newSteps);
  //   setOpenDropdown();
  // };

  // const handleSubmit = () => {
  //   alert("Selected filters: " + steps.filter(Boolean).join(" → "));
  // };

  // // Dynamically set options
  // const getOptions = (index) => {
  //   if (index === 0) return firstOptions;
  //   if (index === 1) return secondOptions[steps[0]] || [];
  //   if (index === 2) return thirdOptions[steps[1]] || [];
  //   return [];
  // };

  const [activeSection, setActiveSection] = useState("");

  return (
    <div className="container mx-auto px-4 py-2 md:py-6">
      {/* Testimonials */}
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Testimonials</h1>
      <div className="border bg-blue-400 sm:p-6 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 max-w-[100%]">
        <button
          onClick={handlePrev}
          className="cursor-pointer text-xl sm:text-2xl p-1 bg-gray-100/20 rounded-full shadow hover:bg-gray-100/40"
        >
          <IoIosArrowBack />
        </button>

        <div className="flex-1 sm:w-[85%] text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img
              src={slideindex[index].img}
              alt="testimonial"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
            />
            <p className="text-white text-sm sm:text-base md:text-lg max-w-[80%] sm:max-w-xl">
              {slideindex[index].text}
            </p>
          </div>
          <h2 className="mt-3 font-medium text-lg sm:text-xl">
            {slideindex[index].name}
          </h2>
        </div>

        <button
          onClick={handleNext}
          className="cursor-pointer text-xl sm:text-2xl p-1 bg-gray-100/20 rounded-full shadow hover:bg-gray-100/40"
        >
          <IoIosArrowForward />
        </button>
      </div> 

      {/* <div className="p-6 flex flex-col gap-6 items-start">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <button
              disabled={index > 0 && !steps[index - 1]}
              onClick={() =>
                setOpenDropdown(openDropdown === index ? null : index)
              }
              className={`px-4 py-2 border rounded-lg shadow w-56 text-left ${index > 0 && !steps[index - 1]
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
                }`}
            >
              {step || ` ${index + 1}`}
            </button>

            {openDropdown === index && (
              <div className="absolute mt-2 bg-white border rounded-lg shadow w-56 z-10">
                {getOptions(index).map((opt) => (
                  <div
                    key={opt}
                    onClick={() => handleSelect(index, opt)}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {steps.every((s) => s !== "") && (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Submit
          </button>
        )}
      </div> */}

      <div className="my-15">
        <div className="items-start flex flex-col gap-5 ">
          {/* First button */}
          <div className=""> <button
            className="bg-orange-600 p-3 text-2xl font-semibold rounded px-7 cursor-pointer hover:bg-orange-700"
            onClick={() => setActiveSection("first")}
          >
            For Job Seeker
          </button>
            <div className="mt-3">
              {activeSection === "first" && (
                <div className="items-center flex flex-col gap-2 ">

                  <FaChevronDown className="items-center" />
                  <div className="p-4 rounded-xl bg-blue-50 shadow">
                    <div className="flex gap-5 text-xl font-medium"> <button className=" bg-orange-500 p-3 px-4 rounded cursor-pointer hover:bg-orange-600">
                      For a Task</button>
                      <button className=" bg-orange-500 p-2 px-4 rounded cursor-pointer hover:bg-orange-600"
                      >Find job</button></div>
                  </div></div>
              )}
            </div></div>
          {/* Second button */}
          <div className=""> <button
            className="bg-orange-600 p-3 text-2xl font-semibold rounded px-8 cursor-pointer hover:bg-orange-700"
            onClick={() => setActiveSection("second")}
          >
            For Employer
          </button>
          </div>

          {/* Show content based on activeSection */}
          <div className="mt-">


            {activeSection === "second" && (
                <div className="items-center flex flex-col gap-2 ">

                  <FaChevronDown className="" />
              <div className="p-6  rounded-xl bg-green-50 shadow">
                  <div className="flex gap-5 text-xl font-medium"> <button className=" bg-orange-500 p-3 px-4 rounded cursor-pointer hover:bg-orange-600">For a Task</button>
                    <button className=" bg-orange-500 p-2 px-4 rounded cursor-pointer hover:bg-orange-600">Find job</button></div>
                </div></div>
            )}
          </div></div>
      </div>



    </div>
  );
};

export default About;
