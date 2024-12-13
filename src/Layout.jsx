import Navbar from "/src/components/Navbar/Navbar";
import Welcome from "/src/components/Welcome/Welcome";
import Trending from "./components/Trending/Trending";
import Footer from "./components/Footer/Footer";
import React from 'react'; 
import "./App.css";

function Layout() {
  const apiKey = import.meta.env.VITE_API_KEY;
 

  const apiUrl = {
    Trending: {
      url: `https://api.themoviedb.org/3/trending/all/{date}?api_key=${apiKey}`,
      options: ["day", "week"],
    },
    Popular: {
      url: `https://api.themoviedb.org/3/{category}/popular?api_key=${apiKey}`,
      options: ["movie", "tv"],
    },
    "Top Rated": {
      url: `https://api.themoviedb.org/3/{category}/top_rated?api_key=${apiKey}`,
      options: ["movie", "tv"],
    },
  };

  return (
    <>
      <div className="w-full bg-NavbarWindow">
        <Navbar />
        <Welcome />
        <Trending apiUrls={apiUrl} />
        <Footer />
      </div>
    </>
  );
}

export default Layout;
