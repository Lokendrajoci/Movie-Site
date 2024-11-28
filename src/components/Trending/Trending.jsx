import React, { useState } from "react";
import TrendingCart from "./TrendingCart";

export default function Trending({ apiUrls, setOnclickData }) {
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
    if (key === "Trending") {
      return (
        <div className="text-base bg-white h-8 rounded-2xl w-44 flex justify-between p-1">
          <button
            onClick={() => setDate("day")}
            className={`${
              date === "day" ? "bg-custom-gradient" : "text-black"
            } w-20 flex items-center justify-center rounded-2xl text-lg`}
          >
            Day
          </button>
          <button
            onClick={() => setDate("week")}
            className={`${
              date === "week" ? "bg-custom-gradient" : "text-black"
            } w-20 rounded-2xl text-center flex items-center justify-center`}
          >
            Week
          </button>
        </div>
      );
    } else if (key === "Popular") {
      return (
        <div className="text-base bg-white h-8 rounded-2xl w-44 flex justify-between p-1">
          <button
            onClick={() => setPopularCategory("movie")}
            className={`${
              popularCategory === "movie" ? "bg-custom-gradient" : "text-black"
            } w-20 flex items-center justify-center rounded-2xl text-lg`}
          >
            Movies
          </button>
          <button
            onClick={() => setPopularCategory("tv")}
            className={`${
              popularCategory === "tv" ? "bg-custom-gradient" : "text-black"
            } w-20 rounded-2xl text-center flex items-center justify-center`}
          >
            TV Shows
          </button>
        </div>
      );
    } else if (key === "Top Rated") {
      return (
        <div className="text-base bg-white h-8 rounded-2xl w-44 flex justify-between p-1">
          <button
            onClick={() => setTopRatedCategory("movie")}
            className={`${
              topRatedCategory === "movie" ? "bg-custom-gradient" : "text-black"
            } w-20 flex items-center justify-center rounded-2xl text-lg`}
          >
            Movies
          </button>
          <button
            onClick={() => setTopRatedCategory("tv")}
            className={`${
              topRatedCategory === "tv" ? "bg-custom-gradient" : "text-black"
            } w-20 rounded-2xl text-center flex items-center justify-center`}
          >
            TV Shows
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {Object.keys(apiUrls).map((key, index) => (
        <div key={index} className="text-white flex flex-col space-y-1">
          <div className="flex justify-between relative w-3/4 left-64 px-10 h-16 items-center text-3xl">
            <p>{key}</p>
            {renderButtons(key)}
          </div>

          <TrendingCart
            movieList={getApiUrl(key)}
            setOnclickData={setOnclickData}
            movetv={key === "Popular" ? popularCategory : topRatedCategory}
          />
        </div>
      ))}
    </>
  );
}
