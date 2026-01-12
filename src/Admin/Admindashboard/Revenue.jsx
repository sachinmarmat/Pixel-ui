import React from 'react'

const revenu = [
    {
        month: "January",
        revenue: "40000"
    },
    {
        month: "Fabuary",
        revenue: "2200"
    },
    {
        month: "March",
        revenue: "30000"
    },
    {
        month: "April",
        revenue: "2000"
    },
    {
        month: "may",
        revenue: "8200"
    },
    {
        month: "Jun",
        revenue: "7700"
    },
    {
        month: "July",
        revenue: "10200"
    },
]


const Revenue = () => {
    return (
        <div className='px-8 mt-5'>
            <div className="bg-white rounded-t-xl ">
                <div className="bg-orange-500 p-3 rounded-xl shadow-2xl px-8 flex justify-between">
                    <h1 className="">Month</h1>
                    <h1 className="">Revenue($)</h1>
                </div>
                <div className="px-5">
                    {
                        revenu.map((item) => {
                            return (
                                <div className='flex justify-between p-4 '>
                                    <h1 className=''>{item.month}</h1>
                                    <h1 className=''>{item.revenue}</h1>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Revenue
