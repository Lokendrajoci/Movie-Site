import React, { useState, useEffect } from "react";

function Youtube({ location }) {
  const [trailerKey, setTrailerKey] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${location.state.number.mediaType}/${location.state.number.id}/videos?api_key=${apiKey}`
        );
        const data = await response.json();

        const trailer = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    fetchTrailer();
  }, [location, apiKey]);

  const trailerUrl = trailerKey
    ? `https://www.youtube.com/embed/${trailerKey}`
    : "";

  return (
    <div className="w-full flex justify-center p-4">
      <div className="w-full max-w-2xl">
        {trailerKey ? (
          <div className="relative pb-[56.25%] h-0">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={trailerUrl}
              title="YouTube Trailer"
              allowFullScreen
            />
          </div>
        ) : (
          <p className="text-center text-white">No Trailer Available</p>
        )}
      </div>
    </div>
  );
}

export default Youtube;
