import React, { useState } from "react";
import MovieLogo from "/src/assets/movix-logo.svg";
import { CiSearch } from "react-icons/ci";

import { NavLink } from "react-router";
export default function Navbar() {
  const [search, Setsearch] = useState(false);
  const handleSearch = () => {
    Setsearch((prevState) => !prevState);
  };
  const handleX = () => {
    Setsearch((prevState) => !prevState);
  };
  return (
    <>
      <div className=" flex justify-center h-20 items-center bg-NavbarDarkBlue ">
        <div className=" w-3/4 flex justify-between">
          <div className="cursor-pointer">
            <NavLink to="/" end>
              <img src={MovieLogo} alt="" />
            </NavLink>
          </div>
          <div>
            <ul className="flex gap-8 text-white ">
              <li className="text-base font-semibold cursor-pointer">Movie</li>
              <li className="text-base font-semibold cursor-pointer">
                TV Shows
              </li>
              <li className=" text-2xl pt-0.5 cursor-pointer ">
                <CiSearch onClick={handleSearch} />
              </li>
            </ul>
          </div>
        </div>
      </div>
      {search && (
        <div className="h-14 bg-white flex justify-center items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search for a movie or TV show..."
            className="w-[60vw] outline-0 text-3xl"
          />
          <button className="text-2xl" onClick={handleX}>
            X
          </button>
        </div>
      )}
    </>
  );
}
