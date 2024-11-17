import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/mousewheel";
import { Mousewheel, Navigation } from "swiper/modules";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function SwiperWithMouseWheel() {
  const [movies, setMovies] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;


  useEffect(() => {
  
    fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const movieData = data.results.map((movie) => ({
          title: movie.title,
          posterPath: movie.poster_path,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          id: movie.id,
          genres: [],
        }));
        setMovies(movieData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData = await Promise.all(
          movies.map((movie) =>
            fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`
            )
              .then((response) => response.json())
              .then((data) => ({
                id: movie.id,
                genres: data.genres.map((genre) => genre.name),
              }))
          )
        );

    
        setMovies((prevMovies) =>
          prevMovies.map((movie) => {
            const genreData = genresData.find((g) => g.id === movie.id);
            return { ...movie, genres: genreData?.genres || [] };
          })
        );
      } catch (error) {
        console.error("Error fetching movie genres:", error);
      }
    };

    if (movies.length > 0) {
      fetchGenres();
    }
  }, [movies, apiKey]);

  const minValue = 0;
  const maxValue = 10;

  return (
    <>
      <Swiper
        modules={[Mousewheel, Navigation]}
        navigation={true}
        mousewheel={true}
        spaceBetween={8}
        slidesPerView={4}
        className="mt-3 pt-6 pl-7 relative h-[100vh]"
        style={{ backgroundColor: "#04152d", width: "75%", left: "65px" }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index} className="rounded-xl">
            <div className="w-full relative h-[70vh]">
              <div
                style={{
                  width: "100%",
                  height: "60vh",
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.posterPath})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="rounded-2xl"
              ></div>

              <div className="absolute w-16 h-16 bottom-[70px] bg-white rounded-full flex justify-center items-center">
                <CircularProgressbar
                  value={movie.vote_average}
                  text={Math.round(movie.vote_average * 10) / 10}
                  strokeWidth={8}
                  minValue={minValue}
                  maxValue={maxValue}
                  styles={buildStyles({
                    pathColor: "#008000",
                    trailColor: "white",
                  })}
                  className="h-14 w-14"
                />
              </div>

              <div className="flex flex-wrap justify-end items-center gap-1 pl-2 absolute bottom-[70px] right-1 h-auto">
                {movie.genres.slice(0, 2).map((genre, i) => (
                  <p
                    key={i}
                    className="bg-[#da2f68] rounded-md px-2 text-white text-sm"
                  >
                    {genre}
                  </p>
                ))}
              </div>
            </div>

            <div className="text-white absolute bottom-[-8rem] h-14 flex flex-col justify-between w-64">
              <p className="text-xl truncate h-7">{movie.title}</p>
              <p className="text-[#828a96]">
                {new Date(movie.release_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
