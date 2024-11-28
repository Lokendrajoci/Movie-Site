// OnClick.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Intro from "./Intro";
import Cast from "./Cast";
import Recomendation from "./Recomendation";
import Youtube from "./Youtube";

function OnClick() {
  const location = useLocation();

  return (
    <>
      <div className="bg-NavbarWindow flex justify-center mb-5">
        <div className="h-full w-3/4">
          <Intro location={location} />
          <Cast location={location} />
        </div>
      </div>
      <Recomendation location={location} />
      <Youtube location={location} />
    </>
  );
}

export default OnClick;
