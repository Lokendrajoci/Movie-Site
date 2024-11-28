import React from "react";
import { useLocation, } from "react-router";
import { useNavigate } from "react-router";

function Card() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.movie; 

  if (!data || !data.results || data.results.length === 0) {
    return <p className="text-center text-white">No results found.</p>;
  }

  return (
    <div className="w-[90vw] mx-auto mt-5">
      <ul className="grid grid-cols-4 gap-6">
        {data.results.map((movie, index) => (
          <div
            key={index}
            className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
          >
            <li
              className="card-item cursor-pointer"
              onClick={() => {
                console.log("Clicked data is", movie);
                navigate(`/${movie.media_type}/${movie.id}`, {
                  state: {
                    number: movie,
                  },
                });
              }}
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title || movie.name || "Movie Poster"}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <p className="text-white text-center">No Image Available</p>
              )}
            </li>
            <p className="text-3xl truncate text-white">
              {movie.original_title || movie.original_name}
            </p>
            <p className="text-gray-400">
              {movie.release_date || movie.first_air_date}
            </p>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Card;
