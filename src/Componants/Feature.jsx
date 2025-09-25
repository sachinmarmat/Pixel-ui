import React, { useEffect, useState } from "react";
import img from "../assets/img.jpg";


const Feature = () => {
  const [index, setIndex] = useState(0);


  const logos = [
    "https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo-2014-present.jpg",
    "https://tse2.mm.bing.net/th/id/OIP.96OxWjEy7in-wy0k-f12ZgHaEK?r=0&pid=ImgDetMain",
    "https://www.logo-designer.co/wp-content/uploads/2015/10/Apple-Google-Interbrand-6th-annual-Best-Global-Brands-report.png",
    "https://static.vecteezy.com/system/resources/previews/014/018/578/non_2x/microsoft-logo-on-transparent-background-free-vector.jpg",
    "https://th.bing.com/th/id/R.e479c6b4c67f974f7ceb4605f17332d9?rik=RGN0%2biDVLnpAXw&riu=http%3a%2f%2flofrev.net%2fwp-content%2fphotos%2f2016%2f05%2fAmazon-logo.png&ehk=xF4jh7u2oTUutljz77AHIyPxQVM26QYgt7y0za9cQTs%3d&risl=&pid=ImgRaw&r=0",
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Facebook_Logo.png",
    "https://logos-world.net/wp-content/uploads/2020/11/Shopify-Symbol.png",
    "https://tse3.mm.bing.net/th/id/OIP.cMhtTaiB-Dck7s34XHVMhwHaHa?r=0&cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
  ];

  // Auto slide every 3s
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % logos.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // Show 4 logos at a time
  const visible = [
    logos[index % logos.length],
    logos[(index + 1) % logos.length],
    logos[(index + 2) % logos.length],
  ];

  const jobs = [
    {
      title: "Product Designer",
      location: "Luxman Colony, Jaipur, Raj",
      salary: "40k–50k / Monthly",
    },
    {
      title: "Web-Development",
      location: "Luxman Colony, Jaipur, Raj",
      salary: "40k–45k / Monthly",
    },
    {
      title: "Graphix-Designer",
      location: "Luxman Colony, Jaipur, Raj",
      salary: "30k–40k / Monthly",
    },
  ];
  

  return (
    <div className="px-4 sm:px-20 py-12">
      <div className="flex flex-col lg:flex-row gap-10 justify-between sm:items-center">
        <div className="flex flex-col gap-6 flex-1 ">
          <h1 className="text-2xl sm:text-3xl font-semibold">Featured Jobs</h1>

          {jobs.map((job, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row justify-between border shadow-sm hover:shadow-lg transition rounded-lg border-gray-400 p-5 gap-6 md:gap-10"
            >
              {/* Left Side */}
              <div>
                <div className="flex items-center gap-4 font-semibold text-lg md:text-xl mb-3">
                  <img src={img} alt="logo" className="w-12" />
                  <h1>{job.title}</h1>
                </div>
                <p className="font-medium text-gray-700">{job.location}</p>
              </div>

              {/* Right Side */}
              <div className="flex flex-col md:items-end gap-4">
                <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition cursor-pointer">
                  Apply Now
                </button>
                <h2 className="font-semibold">{job.salary}</h2>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 items-center ">
          <h1 className="text-2xl sm:text-3xl font-semibold ">Top Companies</h1>
          <div className="mt-6 border  rounded-lg border-gray-300 py-8  sm:py-22 overflow-hidden">
            <style>{`
        @keyframes slide {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .animate-slide {
          display: flex;
          width: max-content;
          animation: slide 10s linear infinite;
        }
      `}</style>
            <div className="flex  ml-2  gap-7 sm:pb-1 justify-center">
              {visible.map((logo, i) => (
                <img
                  key={`${index}-${i}`}
                  src={logo}
                  alt={`Company-${i}`}
                  className="w-35 h-25 object-contain hover:scale-115 transition"
                  style={{
                    animation: `slideFade 2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards`,
                    animationDelay: `${i * 200}ms`, // stagger effect
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
  
    </div>
  );
};

export default Feature;
