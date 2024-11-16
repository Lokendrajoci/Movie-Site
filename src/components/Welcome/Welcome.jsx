import React from "react";

export default function Welcome() {
  return (
    <>
      <div className="text-white  h-[80vh] flex  items-center flex-col justify-center">
        <div className="h-28 w-[5em]  flex items-center justify-center text-7xl font-bold">
          <p>Welcome</p>
        </div>
        <div className="text-2xl font-semibold h-20  flex justify-center items-center relative bottom-10">
          <p>
            Millions of movies, TV shows and people to discover. Explore Now.
          </p>
        </div>
        <div className="  h-24 w-[60vw] flex relative bottom-10">
          <input
            type="text"
            placeholder="Search for a movie or TV show...."
            className="h-16 w-[58vw] text-2xl pl-5 rounded-l-full focus:outline-none text-black"
          />
          <span>
            <button className="w-32 bg-custom-gradient h-16 text-2xl font-semibold rounded-r-full ">
              Search
            </button>
          </span>
        </div>
      </div>
    </>
  );
}
