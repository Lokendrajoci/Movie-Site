// import React from "react";
// import TrendingCart from "../Trending/TrendingCart";

// function Recomendation() {
//   const api_key = import.meta.env.VITE_API_KEY; // Get the API key from environment variables
//   console.log(api_key);

//   const apiUrls = {
//     "Similar Movies": `https://api.themoviedb.org/3/movie/912649/similar?api_key=${api_key}`,
//     Recommendations: `https://api.themoviedb.org/3/movie/912649/recommendations?api_key=${api_key}`,
//   };

//   return (
//     <div className="space-y-6">
//       {Object.entries(apiUrls).map(([key, value]) => (
//         <div key={key} className="p-4 border rounded-lg bg-red-400 text-white shadow">
//           <h2 className="text-lg font-bold mb-2">{key}</h2>
//           <div className="bg-blue-500 p-4 rounded-lg">
//             <TrendingCart movieList={value} />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Recomendation;

import React from "react";
import Trending from "../Trending/Trending";

function Recomendation({ location }) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = {
    "Similar Movies": {
      url: `https://api.themoviedb.org/3/${location.state.number.media_type}/${location.state.number.id}/similar?api_key=${apiKey}`,
      options: ["blNK", ""],
    },
    Recommendations: {
      url: `https://api.themoviedb.org/3/${location.state.number.media_type}/${location.state.number.id}/recommendations?api_key=${apiKey}`,
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
