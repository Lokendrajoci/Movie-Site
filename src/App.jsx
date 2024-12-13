import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import Layout from "./Layout";
import OnClick from "./components/On click/OnClick";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SearchTM from "./components/Search/SearchTM";

function DynamicRouteHandler() {
  const location = useLocation();
  const movie = location.state?.movie;
  
  const path = movie ? `${movie.media_type}/${movie.id}` : "default";
  return (
    <>
      <Navbar />
      <OnClick />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />

        <Route path="/:mediaType/:id" element={<DynamicRouteHandler />} />
        <Route
          path="/search"
          element={
            <>
              <Navbar />
              <SearchTM />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
