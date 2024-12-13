import React from "react";
import { useLocation, useNavigate } from "react-router";

function Card() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.movie; 

  if (!data || !data.results || data.results.length === 0) {
    return <p className="text-center text-white">No results found.</p>;
  }

  return (
    <div className="w-[90vw] mx-auto mt-5 px-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {data.results.map((movie, index) => (
          <li
            key={index}
            className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
            onClick={() => {
              console.log("Clicked data is", movie);
              navigate(`/${movie.media_type}/${movie.id}`, {
                state: {
                  number: movie,
                },
              });
            }}
          >
            <div className="cursor-pointer">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title || movie.name || "Movie Poster"}
                  className="w-full h-auto aspect-[2/3] object-cover"
                />
              ) : (
                <div className="w-full aspect-[2/3] flex items-center justify-center text-white bg-gray-700">
                  No Image Available
                </div>
              )}
              <div className="p-3">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold truncate text-white mb-1">
                  {movie.original_title || movie.original_name}
                </h3>
                <p className="text-sm text-gray-400">
                  {movie.release_date || movie.first_air_date}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Card;