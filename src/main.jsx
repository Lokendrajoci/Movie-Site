import React from 'react';  // Correct import of React
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>  {/* This is optional, but it's good practice for development */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
