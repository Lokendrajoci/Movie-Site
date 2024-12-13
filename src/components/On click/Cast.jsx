import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Cast({ location }) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [userData, setUserData] = useState([]);
  console.log("Cast location", location);

  useEffect(() => {
    const fetchCastData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${location.state.number.media_type}/${location.state.number.id}/credits?api_key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data.cast || []);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchCastData();
  }, [location, apiKey]);

  return (
    <div className="mt-5 text-white px-4 sm:px-6 md:px-8 lg:px-12">
      <p className="text-3xl sm:text-4xl mb-6">Top Cast</p>
      <Swiper
        slidesPerView="auto"
        spaceBetween={5}
        loop={true}
        centeredSlides={false}
        className="h-auto cursor-pointer"
      >
        {userData.length > 0 ? (
          userData
            .filter((actor) => actor.profile_path)
            .map((actor) => (
              <SwiperSlide
                key={actor.id}
                className="flex flex-col justify-center items-center !w-auto !p-0 mx-1 sm:mx-2"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                  alt={actor.name}
                  className="rounded-full h-48 sm:h-60 md:h-72 w-48 sm:w-60 md:w-72 object-cover"
                />
                <div className="w-full flex justify-center flex-col items-center mt-2">
                  <p className="text-base sm:text-xl md:text-2xl">
                    {actor.original_name}
                  </p>
                  <p className="text-[#6e7886] text-xs sm:text-sm md:text-base">
                    {actor.character}
                  </p>
                </div>
              </SwiperSlide>
            ))
        ) : (
          <p>Loading...</p>
        )}
      </Swiper>
    </div>
  );
}
