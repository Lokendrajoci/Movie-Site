import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function Welcome() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (inputValue.trim()) {
      setSearchQuery(inputValue);
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
        navigate("/about", { state: { movie: result } }); // Navigate with state
      } catch (error) {
        console.log("Error in fetching data", error);
      }
    };

    getData();
  }, [searchQuery, navigate]);

  return (
    <div className="text-white h-[80vh] flex items-center flex-col justify-center">
      <div className="h-28 w-[5em] flex items-center justify-center text-7xl font-bold">
        <p>Welcome</p>
      </div>
      <div className="text-2xl font-semibold h-20 flex justify-center items-center relative bottom-10">
        <p>
          Millions of movies, TV shows, and people to discover. Explore Now.
        </p>
      </div>
      <div className="h-24 w-[60vw] flex relative bottom-10">
        <input
          type="text"
          placeholder="Search for a movie or TV show..."
          className="h-16 w-[58vw] text-2xl pl-5 rounded-l-full focus:outline-none text-black"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          className="w-32 bg-custom-gradient h-16 text-2xl font-semibold rounded-r-full"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}
