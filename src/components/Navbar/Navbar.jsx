import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import MovieLogo from "/src/assets/movix-logo.svg";
import { CiSearch } from "react-icons/ci";

export default function Navbar() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();
  const [search, setSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchToggle = () => {
    setSearch((prevState) => !prevState);
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      setSearchQuery(inputValue);
      setSearch(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (!searchQuery) return;

    const getData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchQuery}`
        );
        const result = await response.json();
        navigate("/search", { state: { movie: result } });
      } catch (error) {
        console.log("Error in fetching data", error);
      }
    };

    getData();
  }, [searchQuery, navigate, apiKey]);

  return (
    <>
      <div className="flex justify-between items-center h-20 bg-NavbarDarkBlue px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="cursor-pointer">
          <NavLink to="/" end>
            <img src={MovieLogo} alt="Movie Logo" className="h-10 md:h-12" />
          </NavLink>
        </div>
        <div className="hidden sm:flex gap-6 md:gap-8 text-white">
          <div className="text-base font-semibold">Movie</div>
          <div className="text-base font-semibold ">TV Shows</div>
          <div
            className="text-2xl cursor-pointer flex items-center"
            onClick={handleSearchToggle}
          >
            <CiSearch />
          </div>
        </div>
        <div className="sm:hidden flex items-center">
          <CiSearch
            className="text-2xl text-white cursor-pointer"
            onClick={handleSearchToggle}
          />
        </div>
      </div>
      {search && (
        <div className="h-14 bg-white flex justify-center items-center px-4 sm:px-6 md:px-10">
          <input
            type="text"
            placeholder="Search for a movie or TV show..."
            className="w-full max-w-md text-lg outline-none border-b-2 border-gray-300 focus:border-gray-600"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            className="text-xl font-bold text-gray-600 ml-4"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="text-xl font-bold text-gray-600 ml-2"
            onClick={handleSearchToggle}
          >
            X
          </button>
        </div>
      )}
    </>
  );
}
