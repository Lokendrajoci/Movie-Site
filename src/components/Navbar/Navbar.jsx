import React from "react";
import MovieLogo from "/src/assets/movix-logo.svg";
import { CiSearch } from "react-icons/ci";

export default function Navbar() {
  const apiKey = "YOUR_API_KEY";
  const baseUrl = "https://api.themoviedb.org/3";

  return (
    <>
      <div className=" flex justify-center h-20 items-center bg-NavbarDarkBlue">
        <div className=" w-3/4 flex justify-between">
          <div>
            <img src={MovieLogo} alt="" />
          </div>
          <div>
            <ul className="flex gap-8 text-white">
              <li className="text-base font-semibold">Movie</li>
              <li className="text-base font-semibold">TV Shows</li>
              <li className=" text-2xl pt-0.5 ">
                <CiSearch />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
