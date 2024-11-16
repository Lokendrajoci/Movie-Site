import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/mousewheel";
import { Mousewheel, Navigation } from "swiper/modules";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function SwiperWithMouseWheel() {
  const [movies, setMovies] = useState([]); // State to hold movie data
  const apiKey = import.meta.env.VITE_API_KEY;
  console.log(apikey);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        const movieData = data.results.map((movie) => ({
          title: movie.title,
          posterPath: movie.poster_path,
          release_date: movie.release_date,
        }));
        setMovies(movieData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const percentage = 5;
  const minValue = 0;
  const maxValue = 10;

  return (
    <>
      <Swiper
        modules={[Mousewheel, Navigation]}
        navigation={true}
        mousewheel={true}
        spaceBetween={5}
        slidesPerView={4}
        onSlideChange={() => console.log("slide change")}
        className=" mt-3 pt-6 pl-7 relative"
        style={{ backgroundColor: "#04152d", width: "75%", left: "65px" }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index} className="rounded-xl">
            <div className="w-full relative" style={{ height: "94%" }}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.posterPath})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className="rounded-xl object-cover"
              ></div>
          

              <div className="absolute w-16 h-16 bottom-[-15px] bg-white rounded-full flex justify-center items-center">
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  strokeWidth={8}
                  styles={buildStyles({
                    pathColor: "#008000",
                    trailColor: "white",
                  })}
                  className="h-14 w-14"
                />
              </div>
              <div className="flex justify-end items-center gap-1 pl-2 absolute bottom-[4px] right-1 h-10">
                <p className="bg-[#da2f68] rounded-md px-2 text-white text-sm">
                  Comedy
                </p>
                <p className="bg-[#da2f68] rounded-md px-2 text-white text-sm">
                  Drama
                </p>
              </div>
            </div>
            <p className="text-white h-20 mt-5">
              <p className="text-xl">{movie.title}</p>
              <p className="text-[#828a96]">
                {new Date(movie.release_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
