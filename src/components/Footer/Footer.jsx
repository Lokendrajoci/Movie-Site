import React from "react";
import Social from "/src/components/Social Media/Social";

export default function Footer() {
  return (
    <>
      <div className="bg-[#020c1b] h-80 flex justify-around	 items-center flex-col">
        <div className="text-[#90949c] w-[50vw] text-center">
          Discover the latest movie trailers and dive into detailed film
          information with Movix Glow, your go-to movie streaming website.
          Explore trailers, read brief overviews, and learn about directors,
          writers, and cast members for a comprehensive movie browsing
          experience. Stay updated with trending trailers and new releases,
          ensuring you never miss out on the next big hit.
        </div>
        <div>
          <Social />
        </div>
      </div>
    </>
  );
}
