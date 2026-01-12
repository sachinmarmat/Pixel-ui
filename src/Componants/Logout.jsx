import React, { useState } from 'react';

const GetAheadWithPixel = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const jobCategories = [
    { name: 'Web Development', icon: '💻' }, // You'd use actual icon components/SVGs in a real app
    { name: 'Product Manager', icon: '📦' },
    { name: 'Graphic Designer', icon: '🎨' },
    { name: 'UX Designer', icon: '💡' },
    { name: 'Marketing Manager', icon: '📈' },
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryClick = (categoryName) => {
    setSearchTerm(categoryName);
    // In a real application, you might also trigger a search API call here
    console.log(`Filtering by: ${categoryName}`);
  };

  // const filterdata = jobCategories.filter((t) =>
  //   t.toLowerCase().includes(searchTerm.toLowerCase())
  // )
 

  return (
    <section className="py-16 bg-gray-50 flex flex-col items-center justify-center">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-10 text-center px-4">
        Get ahead with Pixel
      </h2>

      <div className="w-11/12 max-w-2xl flex flex-col items-center">
        {/* Search Bar */}
        <div className="flex w-full bg-white rounded-full shadow-lg overflow-hidden border border-gray-200">
          <input
            type="text"
            placeholder="Search for a job title or company..."
            className="flex-grow py-4 px-6 text-lg focus:outline-none rounded-l-full"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="bg-blue-600 text-white p-4 rounded-r-full hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
          {/* Optional: Filters button - can be implemented as a modal/dropdown */}
          <button className="hidden sm:flex items-center px-6 text-gray-600 hover:bg-gray-100 transition-colors duration-200">
            Filters
          </button>
        </div>

        {/* Job Category Pills */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 px-4">
          {jobCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category.name)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-full text-base font-medium
                border transition-all duration-200
                ${searchTerm === category.name
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }
              `}
            >
              {/* <span className="text-lg">{category.icon}</span>  */}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetAheadWithPixel;