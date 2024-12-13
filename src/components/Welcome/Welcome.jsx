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
        navigate("/search", { state: { movie: result } });
      } catch (error) {
        console.log("Error in fetching data", error);
      }
    };

    getData();
  }, [searchQuery, navigate]);

  return (
    <div className="text-white h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="text-4xl font-bold md:text-3xl sm:text-2xl mb-4">
        <p>Welcome</p>
      </div>

      <div className="text-xl font-semibold text-center mb-6 px-4 sm:text-lg">
        <p>
          Millions of movies, TV shows, and people to discover. Explore Now.
        </p>
      </div>

      <div className="w-full max-w-4xl flex">
        <input
          type="text"
          placeholder="Search for a movie or TV show..."
          className="flex-grow h-14 text-lg pl-4 rounded-l-full focus:outline-none text-black sm:h-12 sm:text-base"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          className="w-28 bg-custom-gradient h-14 text-lg font-semibold rounded-r-full sm:h-12 sm:text-base"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}
