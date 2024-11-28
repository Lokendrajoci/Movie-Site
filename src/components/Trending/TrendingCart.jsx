import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/mousewheel";
import { Mousewheel, Navigation } from "swiper/modules";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function SwiperWithMouseWheel(props) {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;
  const [category, setCategory] = useState("movie");
  const [date, setDate] = useState("day");

  useEffect(() => {
    const fetchMoviesAndGenres = async () => {
      try {
        const response = await fetch(props.movieList);
        const data = await response.json();
        const movieData = data.results.map((movie) => ({
          title: movie.title || movie.original_name,
          posterPath: movie.poster_path,
          release_date: movie.release_date || movie.first_air_date,
          vote_average: movie.vote_average,
          id: movie.id,
          media_type: movie.media_type || props.movetv,
          genres: [], 
        }));

        const genresData = await Promise.all(
          movieData.map((movie) =>
            fetch(
              `https://api.themoviedb.org/3/${movie.media_type}/${movie.id}?api_key=${apiKey}`
            )
              .then((response) => response.json())
              .then((data) => ({
                id: movie.id,
                genres: data.genres.map((genre) => genre.name),
              }))
          )
        );

        const updatedMovies = movieData.map((movie) => {
          const genreData = genresData.find((g) => g.id === movie.id);
          return { ...movie, genres: genreData?.genres || [] };
        });

        setMovies(updatedMovies);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMoviesAndGenres();
  }, [category, date, props.movieList]);

  const minValue = 0;
  const maxValue = 10;

  return (
    <>
      <Swiper
        modules={[Mousewheel, Navigation]}
        navigation={true}
        spaceBetween={8}
        slidesPerView={4}
        className="mt-3 pt-6 pl-7 relative h-[70vh] !mb-[20vh]"
        style={{ backgroundColor: "#04152d", width: "75%", left: "65px" }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide
            key={index}
            className="rounded-xl cursor-pointer"
            onClick={() => {
              navigate(`/${movie.media_type}/${movie.id}`, {
                state: {
                  number: movie,
                  genreIds: movie.genres.map((genre) => genre.id),
                },
              });
            }}
          >
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
                {(movie.genres || []).slice(0, 2).map((genre, i) => (
                  <p key={i} className="bg-[#da2f68] rounded-md px-2 text-white text-sm">
                    {genre}
                  </p>
                ))}
              </div>
            </div>

            <div className="text-white absolute bottom-[0rem] h-14 flex flex-col justify-between w-64">
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
