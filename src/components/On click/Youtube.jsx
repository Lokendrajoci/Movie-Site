import React, { useState, useEffect } from "react";

function Youtube({ location }) {
  const [trailerKey, setTrailerKey] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${location.state.number.media_type}/${location.state.number.id}/videos?api_key=${apiKey}`
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
    <div className="youtube-container  bg-red-400 h-96 w-96  ">
      {trailerKey ? (
        <iframe
          width="100%"
          height="400"
          src={trailerUrl}
          title="YouTube Trailer"
          allowFullScreen
        />
      ) : (
        <p>No Trailer Available</p>
      )}
    </div>
  );
}

export default Youtube;
