import React from "react";
import Trending from "../Trending/Trending";

function Recomendation({ location }) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = {
    "Similar Movies": {
      url: `https://api.themoviedb.org/3/${location.state.number.mediaType}/${location.state.number.id}/similar?api_key=${apiKey}`,
      options: ["blNK", ""],
    },
    Recommendations: {
      url: `https://api.themoviedb.org/3/${location.state.number.mediaType}/${location.state.number.id}/recommendations?api_key=${apiKey}`,
      options: ["", ""],
    },
  };

  return (
    <>
      <Trending apiUrls={apiUrl} />
    </>
  );
}

export default Recomendation;
