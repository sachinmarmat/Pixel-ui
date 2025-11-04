import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

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
  const [titleOpen, setTitleOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [titleFilter, setTitleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const jobTitles = [
    "Web Development",
    "Product Manager",
    "Graphic Design",
    "UX Designer",
    "Marketing Manager",
    "HR Specialist",
  ];

  const jobLocations = [
    "Full Stack",
    "Frontend",
    "Backend",
    "Designer",
    "Management",
    "HR",
  ];

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === slideindex.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () =>
    setIndex(index === 0 ? slideindex.length - 1 : index - 1);
  const handleNext = () =>
    setIndex(index === slideindex.length - 1 ? 0 : index + 1);

  const filteredTitles = jobTitles.filter((t) =>
    t.toLowerCase().includes(titleFilter.toLowerCase())
  );
  const filteredLocations = jobLocations.filter((l) =>
    l.toLowerCase().includes(locationFilter.toLowerCase())
  );

  return (
    <div className="px-4 sm:px-22 py-6">
      {/* ===== Testimonials ===== */}
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Testimonials</h1>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border bg-blue-400 sm:p-6 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrev}
          className="cursor-pointer text-xl sm:text-2xl p-1 bg-gray-100/20 rounded-full shadow hover:bg-gray-100/40"
        >
          <IoIosArrowBack />
        </motion.button>

        <div className="flex-1 sm:w-[85%] text-center sm:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <img
                src={slideindex[index].img}
                alt="testimonial"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
              />
              <p className="text-white text-sm sm:text-base md:text-lg max-w-[80%] sm:max-w-xl">
                {slideindex[index].text}
              </p>
            </motion.div>
          </AnimatePresence>
          <h2 className="mt-3 font-medium text-lg sm:text-xl">
            {slideindex[index].name}
          </h2>
        </div>

        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          className="cursor-pointer text-xl sm:text-2xl p-1 bg-gray-100/20 rounded-full shadow hover:bg-gray-100/40"
        >
          <IoIosArrowForward />
        </motion.button>
      </motion.div>

      {/* ===== Get Ahead Section ===== */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full flex flex-col items-center py-16 px-4"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-900 mb-8">
          Get ahead with Pixel
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          {/* Dropdown 1 */}
          <div className="relative w-full sm:w-64">
            <button
              onClick={() => {
                setTitleOpen(!titleOpen);
                setLocationOpen(false);
              }}
              className="w-full flex justify-between items-center px-4 py-3
             bg-white rounded-lg shadow hover:shadow-md
             border border-gray-200 text-gray-700 font-medium
             transition"
            >
              {"For Job Seeker"}
              <MdKeyboardArrowDown
                className={`text-xl transform transition-transform duration-200 ${
                  titleOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {titleOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute z-20 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200"
                >
                  <input
                    type="text"
                    placeholder="Filter titles..."
                    value={titleFilter}
                    onChange={(e) => setTitleFilter(e.target.value)}
                    className="w-full px-3 py-2 border-b text-sm focus:outline-none"
                  />
                  <ul className="max-h-48 overflow-y-auto">
                    {filteredTitles.map((title) => (
                      <li
                        key={title}
                        className="px-4 py-2 hover:bg-indigo-50 cursor-pointer text-gray-700"
                        onClick={() => {
                          setTitleFilter(title);
                          setTitleOpen(false);
                        }}
                      >
                        {title}
                      </li>
                    ))}
                    {filteredTitles.length === 0 && (
                      <li className="px-4 py-2 text-gray-400 text-sm">
                        No results
                      </li>
                    )}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden sm:block w-px h-12 bg-gray-300"></div>

          {/* Dropdown 2 */}
          <div className="relative w-full sm:w-64">
            <button
              onClick={() => {
                setLocationOpen(!locationOpen);
                setTitleOpen(false);
              }}
              className="w-full flex justify-between items-center px-4 py-3
             bg-white rounded-lg shadow hover:shadow-md
             border border-gray-200 text-gray-700 font-medium
             transition"
            >
              {"For Employers"}
              <MdKeyboardArrowDown
                className={`text-xl transform transition-transform duration-200 ${
                  locationOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {locationOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute z-20 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200"
                >
                  <input
                    type="text"
                    placeholder="Filter locations..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full px-3 py-2 border-b text-sm focus:outline-none"
                  />
                  <ul className="max-h-48 overflow-y-auto">
                    {filteredLocations.map((loc) => (
                      <li
                        key={loc}
                        className="px-4 py-2 hover:bg-indigo-50 cursor-pointer text-gray-700"
                        onClick={() => {
                          setLocationFilter(loc);
                          setLocationOpen(false);
                        }}
                      >
                        {loc}
                      </li>
                    ))}
                    {filteredLocations.length === 0 && (
                      <li className="px-4 py-2 text-gray-400 text-sm">
                        No results
                      </li>
                    )}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
