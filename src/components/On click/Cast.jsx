import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css";

export default function Cast({ location }) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [userData, setUserData] = useState([]);

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
    <div className="h-96 mt-5 text-white">
      <p className="text-4xl mb-6">Top Cast</p>
      <Swiper slidesPerView={"auto"} spaceBetween={5} className="h-80">
        {userData.length > 0 ? (
          userData
            .filter((actor) => actor.profile_path)
            .map((actor) => (
              <SwiperSlide
                key={actor.id}
                className="flex justify-center items-center !h-60 !w-auto !p-0"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                  alt={actor.name}
                  className="rounded-full !h-60 !w-60 object-cover"
                />
                <div className="w-full flex justify-center flex-col items-center">
                  <p className="text-2xl">{actor.original_name}</p>
                  <p className="text-[#6e7886]">{actor.character}</p>
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
