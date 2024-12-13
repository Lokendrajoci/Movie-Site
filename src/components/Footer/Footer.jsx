import React from "react";
import Social from "/src/components/Social Media/Social";

export default function Footer() {
  return (
    <>
      <div className="bg-[#020c1b] h-auto py-10 flex flex-col justify-center items-center text-center space-y-6">
        <div className="text-[#90949c] w-[80vw] lg:w-[50vw] text-base md:text-lg">
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
