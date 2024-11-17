import React from "react";
import TrendingCart from "./TrendingCart";

export default function Trending() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const movieList = {
    "Now Playing": `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`,
    Popular: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`,
    "Top Rated": `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`,
  };

  return (
    <>
      {Object.entries(movieList).map(([key, value], index) => (
        <div key={index} className="text-white flex flex-col space-y-1 mb-10">
          <div className="flex justify-between relative w-3/4 left-64 px-10 h-16 items-center text-3xl">
            <div>
              <p>{key}</p>
            </div>
            <div className="text-base bg-white h-8 rounded-2xl w-44 flex justify-between p-1">
              <button className="bg-custom-gradient w-20 flex items-center justify-center rounded-2xl text-lg text-white">
                Day
              </button>
              <button className="text-black w-20 rounded-2xl text-center flex items-center justify-center">
                Week
              </button>
            </div>
          </div>

          {/* Pass value (movie URL) to TrendingCart */}
          <TrendingCart movieList={value}  />
        </div>
      ))}

      <div className="bg-pink-400 text-white mt-[50px]">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, cumque
        molestias unde praesentium doloribus nisi ipsum corrupti vero nihil
        culpa repellat consequuntur saepe accusamus aspernatur assumenda
        incidunt dolorem. Esse beatae officia, quidem necessitatibus nesciunt
        iure distinctio molestiae doloremque molestias at nisi expedita eum
        dolorum excepturi animi omnis eligendi. Officiis, possimus!
      </div>
    </>
  );
}
