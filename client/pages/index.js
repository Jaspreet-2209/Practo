// pages/home.js

import Head from "next/head";
import { FiMapPin } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import { FaUserMd, FaPills, FaVials, FaBookMedical, FaNotesMedical, FaHospital } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [locationText, setLocationText] = useState("Bangalore");

  const locationRef = useRef(null);
  const searchRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target) &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowLocationDropdown(false);
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSelect = (value) => {
    setSearchText(value);
    setShowSearchDropdown(false);
    router.push(`/search-result?query=${encodeURIComponent(value)}&location=${encodeURIComponent(locationText)}`);
  };

  const handleLocationSelect = (value) => {
    setLocationText(value);
    setShowLocationDropdown(false);
    if (searchText) {
      router.push(`/search-result?query=${encodeURIComponent(searchText)}&location=${encodeURIComponent(value)}`);
    }
  };

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
          <span className="font-extrabold">practo</span>
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

      <section className="relative bg-[#2d3eec] text-white py-20 px-6 overflow-hidden min-h-[578px]">
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-[36px] md:text-[44px] font-semibold mb-3">Your home for health</h1>
          <p className="text-xl font-light mb-6">Find and Book</p>

          <div className="flex bg-white rounded-md w-full max-w-4xl mx-auto shadow-md relative">
            {/* Location Input */}
            <div
              ref={locationRef}
              className="flex items-center px-32 py-3 border-r border-gray-300 text-gray-700 cursor-pointer relative"
              onClick={() => {
                setShowLocationDropdown(!showLocationDropdown);
                setShowSearchDropdown(false);
              }}
            >
              <FiMapPin className="mr-2" />
              <span>{locationText}</span>

              {showLocationDropdown && (
                <div className="absolute top-full left-0 w-60 bg-white shadow-md rounded-md text-black mt-1 max-h-64 overflow-y-auto z-50">
                  <div onClick={() => handleLocationSelect("Use my location")} className="p-2 hover:bg-gray-100 cursor-pointer">
                    Use my location
                  </div>
                  <div className="p-2 border-b text-gray-500 text-xs">Search in entire Bangalore</div>
                  {[
                    "Jp Nagar", "Whitefield", "Hsr Layout", "Indiranagar", "Malleswaram",
                    "Sarjapur Road", "Bannerghatta Road", "Rajajinagar", "Jayanagar", "Electronics City"
                  ].map((area, idx) => (
                    <div key={idx} onClick={() => handleLocationSelect(area)} className="p-2 hover:bg-gray-100 cursor-pointer">
                      {area}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Search Input */}
            <div ref={searchRef} className="w-full relative">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search doctors, clinics, hospitals, etc."
                className="px-4 py-3 w-full text-black outline-none text-sm"
                onFocus={() => {
                  setShowSearchDropdown(true);
                  setShowLocationDropdown(false);
                }}
              />
              {showSearchDropdown && (
                <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-md text-black mt-1 max-h-72 overflow-y-auto z-50">
                  <div className="px-4 py-2 text-gray-500 text-xs border-b">Popular Searches</div>
                  <div className="flex gap-2 px-4 py-2">
                    <span onClick={() => handleSearchSelect("Hysterectomy")} className="bg-gray-200 px-3 py-1 rounded-full text-xs cursor-pointer hover:bg-gray-300">
                      Hysterectomy
                    </span>
                    <span onClick={() => handleSearchSelect("Normal Delivery")} className="bg-gray-200 px-3 py-1 rounded-full text-xs cursor-pointer hover:bg-gray-300">
                      Normal Delivery
                    </span>
                  </div>
                  <div className="px-4 py-2 text-gray-500 text-xs border-b">Common Specialities</div>
                  {[
                    "Dentist", "Gynecologist/Obstetrician", "General Physician",
                    "Dermatologist", "ENT Specialist", "Homoeopath", "Ayurveda"
                  ].map((spec, idx) => (
                    <div key={idx} onClick={() => handleSearchSelect(spec)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex justify-between">
                      <span>{spec}</span>
                      <span className="text-gray-400 text-xs">SPECIALITY</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ✅ Popular Searches below input */}
          <div className="mt-4 flex justify-center flex-wrap gap-4 text-sm text-gray-300 font-light">
            {["Dermatologist", "Pediatrician", "Gynecologist/Obstetrician", "Others"].map((item, i) => (
              <span
                key={i}
                className="hover:underline cursor-pointer"
                onClick={() => handleSearchSelect(item)}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

       

        {/* Background SVG */}
        <div className="absolute inset-0 z-0">
          <img src="/home.svg" alt="background" className="w-full h-full object-cover" />
        </div>
        
      </section>
     {/* ✅ Bottom Action Row - Updated Styling with Grey Lines */}
<div className="absolute bottom-0 w-full bg-[#1b1c4a] py-6 px-4 z-10">
  <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-6 text-white text-center text-sm">
    {[
      { icon: <FaUserMd size={20} />, label: "Consult with a doctor" },
      { icon: <FaPills size={20} />, label: "Order Medicines" },
      { icon: <FaNotesMedical size={20} />, label: "View medical records" },
      { icon: <FaVials size={20} />, label: "Book test", badge: "New" },
      { icon: <FaBookMedical size={20} />, label: "Read articles" },
      { icon: <FaHospital size={20} />, label: "For healthcare providers" },
    ].map((item, i, arr) => (
      <div
        key={i}
        className={`flex flex-col items-center justify-center cursor-pointer hover:opacity-90 relative ${
          i !== arr.length - 1
            ? "after:absolute after:right-0 after:top-1/2 after:transform after:-translate-y-1/2 after:h-6 after:border-r after:border-gray-500"
            : ""
        }`}
      >
        <div className="mb-2">{item.icon}</div>
        <div className="flex items-center justify-center gap-1">
          <span>{item.label}</span>
          {item.badge && (
            <span className="bg-green-500 text-white text-[10px] px-1.5 py-[1px] rounded-sm font-semibold">
              {item.badge}
            </span>
          )}
        </div>
      </div>
    ))}
  </div>
</div>


    </>
  );
}
