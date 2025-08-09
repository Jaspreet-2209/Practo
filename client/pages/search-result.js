import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FaThumbsUp, FaCalendarAlt ,FaChevronDown } from "react-icons/fa";

export default function SearchResult() {
  const router = useRouter();
  const { query, location } = router.query;

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (query && location) {
      fetch(`http://localhost:5000/api/search?query=${query}&location=${location}`)
        .then(res => res.json())
        .then(data => setDoctors(data));
    }
  }, [query, location]);

  return (
    <>
    <Head>
        <title>Practo Clone</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm text-sm font-medium">
        <div className="flex items-center space-x-2 text-2xl font-bold text-[#1a1a4b]">
          <span className="text-blue-400 text-2xl">•</span>
          <a href="/" className="font-extrabold">practo</a>
          <span className="text-blue-400 text-2xl">•</span>
        </div>

        <div className="hidden mr-98 lg:flex space-x-8 text-gray-800 font-semibold">
          <a href="#" className="text-blue-600 border-b-[3px] border-blue-600 pb-1">Find Doctors</a>
          <a href="#" className="hover:text-blue-600">Video Consult</a>
          <a href="#" className="hover:text-blue-600">Surgeries</a>
        </div>

        <div className="hidden lg:flex items-center space-x-6 text-gray-800">
          <div className="flex items-center space-x-1">
            <span className="text-white bg-blue-900 text-[10px] px-1.5 py-[2px] rounded-sm font-bold leading-none">NEW</span>
            <a href="#" className="text-grey-100 opacity-90 hover:text-blue-600">
              For Corporates <FaChevronDown className="inline" />
            </a>
          </div>
          <a href="#" className="text-grey-100 opacity-90 hover:text-blue-600">For Providers <FaChevronDown className="inline" /></a>
          <a href="#" className="text-grey-100 opacity-90 hover:text-blue-600">Security & help <FaChevronDown className="inline" /></a>
          <button className="border border-gray-300 hover:border-blue-500 text-sm px-4 py-1 rounded font-medium hover:bg-gray-100 transition">Login / Signup</button>
        </div>
      </nav>

      {/* Search Bar */}
<div className="bg-white border-b">
  <div className="max-w-6xl mx-auto px-4 py-4 flex items-center space-x-2">
    <input
      type="text"
      placeholder="Jp Nagar"
      className="border border-gray-300 rounded px-4 py-2 w-[200px] focus:outline-none focus:border-blue-500"
    />
    <input
      type="text"
      placeholder="Dermatologist"
      className="border border-gray-300 rounded px-4 py-2 flex-1 focus:outline-none focus:border-blue-500"
    />
    <button className="bg-[#117ACA] text-white px-4 py-2 rounded hover:bg-[#0f68ad]">
      Search
    </button>
  </div>
</div>
{/* Blue Filter Bar */}
<div className="bg-[#2b2b6e] text-white text-sm">
  <div className="max-w-6xl mx-auto flex items-center px-4 h-[40px]">
    
    {/* Left Filters */}
    <div className="flex space-x-2">
      {["Gender", "Patient Stories", "Experience", "All Filters"].map((label) => (
        <button
          key={label}
          className="flex items-center justify-between px-3 h-[28px] bg-[#4b4b93] rounded-sm"
        >
          <span>{label}</span>
          <FaChevronDown className="text-[10px] ml-2" />
        </button>
      ))}
    </div>

    {/* Right Sort */}
    <div className="ml-auto flex items-center space-x-2">
      <span>Sort By</span>
      <select className="h-[28px] bg-[#4b4b93] text-white text-sm rounded-sm px-2 focus:outline-none">
        <option>Relevance</option>
        <option>Experience</option>
        <option>Rating</option>
      </select>
    </div>
  </div>
</div>



    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Heading */}
      <h2 className="text-[20px] font-semibold mb-1">
        {doctors.length} {query}s available in {location}
      </h2>
      <p className="text-[14px] text-gray-600 mb-6 flex items-center gap-2">
        <span>✅</span> Book appointments with minimum wait-time & verified doctor details
      </p>

      {/* Doctor List */}
      {doctors.map((doc, index) => (
        <div key={index} className="border-b pb-6 mb-6 flex flex-col md:flex-row gap-4">
          {/* Image */}
          <img
            src={doc.image || "/default-doc.jpg"}
            alt={doc.name}
            className="w-[80px] h-[80px] rounded-full object-cover border"
          />

          {/* Doctor Info */}
          <div className="flex-1">
            <h3 className="text-[18px] text-[#117ACA] font-semibold">{doc.name}</h3>
            <p className="text-[14px] text-gray-700">{doc.specialization}</p>
            <p className="text-[14px] text-gray-500">{doc.experience} experience overall</p>
            <p className="text-[14px] text-gray-500">{doc.location}</p>
            <p className="text-[14px] text-gray-800 font-semibold">₹{doc.fee} Consultation fee at clinic</p>

            {/* Rating & Reviews */}
            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                <FaThumbsUp /> {doc.rating}%
              </span>
              <span className="text-[#117ACA] cursor-pointer hover:underline">
                {doc.reviews} Patient Stories
              </span>
            </div>

            {/* Availability */}
            {doc.availability && (
              <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                <FaCalendarAlt /> {doc.availability}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-start gap-2 mt-2 md:mt-0 md:items-end">
            <button className="bg-[#117ACA] text-white px-4 py-2 rounded hover:bg-[#0f68ad] text-sm font-medium">
              Book Clinic Visit
            </button>
            <button className="border border-gray-300 text-sm px-4 py-2 rounded hover:bg-gray-50">
              Contact Clinic
            </button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

