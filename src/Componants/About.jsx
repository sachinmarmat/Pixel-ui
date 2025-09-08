import React, { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const slideindex = [
    {
        img: "https://img.freepik.com/premium-photo/3d-character-animation-icon-logo-cartoon-poses-with-human-body-background_762678-15079.jpg",
        text: "This platform help me for dream job! The process was simple, and easy and stratforward",
        name: "Surendra bairwa",
    },
    {
        img: "https://tse2.mm.bing.net/th/id/OIP.BEE1wyUjPlj3sr1ny733OQAAAA?r=0&cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        text: "This platform help me for dream job! The process was simple, and easy and stratforward",
        name: "Sachin marmat",
    }
]

const About = () => {

    const [index, setindex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setindex((prev) => (prev === slideindex.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handlepre = () => {
        setindex(index === 0 ? slideindex.length - 1 : index - 1)
    }
    const handlenext = () => {
        setindex(index === slideindex.length - 1 ? 0 : index + 1)
    }


    return (
        <div className='container m-auto'>
            <div>
                <h1 className='text-3xl font-semibold mt-10 '>Testimonials</h1>
                <div className='border  bg-blue-400 p-5 rounded-2xl mt-7 flex justify-between gap-15 items-center '>
                    <div>
                        <button onClick={handlepre} className='cursor-pointer'>
                            <IoIosArrowBack />
                        </button>
                    </div>
                    <div className='md:w-[85%] '>

                        <div className='flex gap-5 items-center'>
                            <img src={slideindex[index].img} alt='img' className='w-12 rounded-3xl' />
                            <p className='w-140'>{slideindex[index].text}</p>
                        </div>
                        <div className='mt-3 font-medium'><h1>{slideindex[index].name}</h1></div>
                    </div>
                    <div className='cursor-pointer  right-3'>
                        <button onClick={handlenext}>
                            <IoIosArrowForward />
                        </button>
                    </div>
                </div>

            </div>
            <div className='flex justify-items-center gap-22 mt-11'>
                <div>
                    <h1 className='text-3xl font-semibold mb-8'>For job speakar</h1>
                    <div className='flex justify-between border border-gray-900 p-5 rounded-2xl items-center gap-49' >
                        <button className='bg-red-500 text-white px-4 py-2 rounded cursor-pointer  hover:bg-red-800'>For A Task</button>

                        <h1 className='font-medium text-xl'>Find Job</h1>
                    </div>
                </div>
                <div>
                    <h1 className='text-3xl font-semibold mb-8'>For Employers</h1>
                    <div className='flex justify-between border border-gray-900 p-5 rounded-2xl gap-49 items-center' >
                        <h1 className='font-medium text-xl'>For Employers</h1>
                        <button className='bg-red-500 text-white px-4 py-2 rounded cursor-pointer  hover:bg-red-800'>For A Job</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
