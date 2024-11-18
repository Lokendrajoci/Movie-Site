import React, { useState } from "react";
import TrendingCart from "./TrendingCart";

export default function Trending() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [date, setDate] = useState("day"); // State for "Trending" (Day/Week)
  const [category, setCategory] = useState("movie"); // State for switching between Movies and TV Shows

  // API URL configurations for each section
  const apiUrls = {
    Trending: {
      url: `https://api.themoviedb.org/3/trending/{category}/{date}?api_key=${apiKey}`,
      options: ["day", "week"], // Options for time period (Day/Week)
    },
    Popular: {
      url: `https://api.themoviedb.org/3/{category}/popular?api_key=${apiKey}`,
      options: ["movie", "tv"], // Options for movie/TV show
    },
    "Top Rated": {
      url: `https://api.themoviedb.org/3/{category}/top_rated?api_key=${apiKey}`,
      options: ["movie", "tv"], // Options for movie/TV show
    },
  };

  // Function to generate the correct API URL based on selected category and date
  const getApiUrl = (section) => {
    const url = apiUrls[section].url;
    return url.replace("{category}", category).replace("{date}", date);
  };

  // Handle button click to change date for trending
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // Handle button click to change category (Movies/TV Shows)
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <>
      {Object.keys(apiUrls).map((key, index) => (
        <div key={index} className="text-white flex flex-col space-y-1 mb-10">
          <div className="flex justify-between relative w-3/4 left-64 px-10 h-16 items-center text-3xl">
            <div>
              <p>{key}</p>
            </div>
            {key === "Trending" ? (
              <div className="text-base bg-white h-8 rounded-2xl w-44 flex justify-between p-1">
                <button
                  onClick={() => handleDateChange("day")}
                  className={`${
                    date === "day" ? "bg-custom-gradient" : "text-black"
                  } w-20 flex items-center justify-center rounded-2xl text-lg text-white`}
                >
                  Day
                </button>
                <button
                  onClick={() => handleDateChange("week")}
                  className={`${
                    date === "week" ? "bg-custom-gradient" : "text-black"
                  } w-20 rounded-2xl text-center flex items-center justify-center`}
                >
                  Week
                </button>
              </div>
            ) : (
              <div className="text-base bg-white h-8 rounded-2xl w-44 flex justify-between p-1">
                <button
                  onClick={() => handleCategoryChange("movie")}
                  className={`${
                    category === "movie" ? "bg-custom-gradient" : "text-black"
                  } w-20 flex items-center justify-center rounded-2xl text-lg text-white`}
                >
                  Movies
                </button>
                <button
                  onClick={() => handleCategoryChange("tv")}
                  className={`${
                    category === "tv" ? "bg-custom-gradient" : "text-black"
                  } w-20 rounded-2xl text-center flex items-center justify-center`}
                >
                  TV Shows
                </button>
              </div>
            )}
          </div>

          <TrendingCart movieList={getApiUrl(key)} />
        </div>
      ))}
    </>
  );
}
