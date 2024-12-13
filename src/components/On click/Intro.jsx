import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Intro({ location }) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    if (!location.state?.number) return;

    const fetchMovieData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${location.state.number.media_type}/${location.state.number.id}?api_key=${apiKey}&append_to_response=credits`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setMovieData({
          title: data.original_title || data.original_name,
          tagline: data.tagline,
          overview: data.overview,
          posterPath: data.poster_path,
          status: data.status || "Unknown",
          releaseDate: data.release_date || "Unknown",
          runtime: data.runtime || null,
          director:
            data.credits?.crew?.find((person) => person.job === "Director")
              ?.name || "Unknown",
          writer:
            data.credits?.crew?.find((person) => person.job === "Screenplay")
              ?.name || "Unknown",
        });
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [location.state?.number?.media_type, location.state?.number?.id, apiKey]);

  const formatRuntime = (runtime) => {
    if (!runtime) return "Unknown";
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  if (!location.state?.number) {
    return (
      <div className="text-white text-center">
        <p>Error: No movie data provided.</p>
      </div>
    );
  }

  const { number } = location.state;
  const genres = number.genreNames || [];

  return (
    <div className="w-full h-auto flex flex-col lg:flex-row gap-6 mt-8 p-4 lg:p-8">
      <div
        className="h-[50vh] lg:h-[83vh] w-full lg:w-[40vw] rounded-2xl"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieData?.posterPath})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div className="h-auto lg:h-full w-full text-white">
        <p className="text-3xl lg:text-5xl mt-2 lg:mt-5">
          {movieData?.title || "Unknown Title"}
        </p>

        <div className="flex flex-wrap gap-2 my-3">
          {genres.length > 0 ? (
            genres.map((genre, index) => (
              <button
                className="bg-[#da2f68] rounded-md px-4 py-1 text-sm lg:text-base"
                key={index}
              >
                {genre}
              </button>
            ))
          ) : (
            <p>No genres available</p>
          )}
        </div>

        <div className="flex mt-6 lg:mt-8 h-20 justify-center lg:justify-start">
          <CircularProgressbar
            value={number.avgVotes || 0}
            text={`${Math.round(number.avgVotes * 10) / 10}`}
            strokeWidth={10}
            minValue={0}
            maxValue={10}
            styles={buildStyles({
              pathColor: "#008000",
              trailColor: "white",
            })}
            className="h-16 w-16 lg:h-20 lg:w-20"
          />
        </div>

        <div className="flex flex-col gap-2 mt-6">
          <p className="text-2xl lg:text-3xl">Overview</p>
          <p>{movieData?.overview || "No overview available."}</p>
        </div>

        <div className="flex flex-wrap gap-5 mt-5 mb-3">
          <div>Status: {movieData?.status}</div>
          <div>Release Date: {movieData?.releaseDate}</div>
          <div>Duration: {formatRuntime(movieData?.runtime)}</div>
        </div>
        <hr />

        <div className="mt-2">
          <p>Director: {movieData?.director}</p>
          <hr />
          <p>Writer: {movieData?.writer}</p>
        </div>
      </div>
    </div>
  );
}

export default Intro;
