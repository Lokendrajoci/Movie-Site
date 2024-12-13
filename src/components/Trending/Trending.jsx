import React, { useState } from "react";
import TrendingCart from "./TrendingCart";

export default function Trending({ apiUrls }) {
  const [date, setDate] = useState("day");
  const [popularCategory, setPopularCategory] = useState("movie");
  const [topRatedCategory, setTopRatedCategory] = useState("movie");

  const getApiUrl = (section) => {
    const sectionData = apiUrls[section];
    if (!sectionData || !sectionData.url) {
      console.error(`Invalid section key: ${section}`);
      return "";
    }
    let url = sectionData.url;
    if (section === "Popular" && popularCategory) {
      url = url.replace("{category}", popularCategory);
    } else if (section === "Top Rated" && topRatedCategory) {
      url = url.replace("{category}", topRatedCategory);
    }
    if (date) {
      url = url.replace("{date}", date);
    }
    return url;
  };

  const renderButtons = (key) => {
    const buttonClasses =
      "w-full sm:w-20 flex items-center justify-center rounded-2xl text-sm sm:text-lg py-1 sm:py-0";
    const activeClasses = "bg-custom-gradient text-white";
    const inactiveClasses = "text-black bg-white";

    if (key === "Trending") {
      return (
        <div className="w-full sm:w-44 bg-white h-10 sm:h-8 rounded-2xl flex justify-between p-1">
          <button
            onClick={() => setDate("day")}
            className={`${buttonClasses} ${
              date === "day" ? activeClasses : inactiveClasses
            }`}
          >
            Day
          </button>
          <button
            onClick={() => setDate("week")}
            className={`${buttonClasses} ${
              date === "week" ? activeClasses : inactiveClasses
            }`}
          >
            Week
          </button>
        </div>
      );
    } else if (key === "Popular") {
      return (
        <div className="w-full sm:w-44 bg-white h-10 sm:h-8 rounded-2xl flex justify-between p-1">
          <button
            onClick={() => setPopularCategory("movie")}
            className={`${buttonClasses} ${
              popularCategory === "movie" ? activeClasses : inactiveClasses
            }`}
          >
            Movies
          </button>
          <button
            onClick={() => setPopularCategory("tv")}
            className={`${buttonClasses} ${
              popularCategory === "tv" ? activeClasses : inactiveClasses
            }`}
          >
            TV Shows
          </button>
        </div>
      );
    } else if (key === "Top Rated") {
      return (
        <div className="w-full sm:w-44 bg-white h-10 sm:h-8 rounded-2xl flex justify-between p-1">
          <button
            onClick={() => setTopRatedCategory("movie")}
            className={`${buttonClasses} ${
              topRatedCategory === "movie" ? activeClasses : inactiveClasses
            }`}
          >
            Movies
          </button>
          <button
            onClick={() => setTopRatedCategory("tv")}
            className={`${buttonClasses} ${
              topRatedCategory === "tv" ? activeClasses : inactiveClasses
            }`}
          >
            TV Shows
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-36">
      {Object.keys(apiUrls).map((key, index) => (
        <div key={index} className="text-white flex flex-col space-y-3 mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 px-2 sm:px-4 py-2 rounded-lg">
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-center sm:text-left">
              {key}
            </p>
            <div className="flex justify-center sm:justify-end w-full sm:w-auto">
              {renderButtons(key)}
            </div>
          </div>

          <TrendingCart
            movieList={getApiUrl(key)}
            movetv={key === "Popular" ? popularCategory : topRatedCategory}
          />
        </div>
      ))}
    </div>
  );
}
