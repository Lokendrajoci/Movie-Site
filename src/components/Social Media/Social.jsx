import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const SocialMediaButtons = () => {
  const platforms = [
    {
      href: "https://github.com",
      icon: "fa-github",
      hover: "hover:bg-gray-700",
    },
    {
      href: "https://instagram.com",
      icon: "fa-instagram",
      hover: "hover:bg-pink-500",
    },
    {
      href: "https://linkedin.com",
      icon: "fa-linkedin",
      hover: "hover:bg-blue-700",
    },

    {
      href: "https://facebook.com",
      icon: "fa-facebook",
      hover: "hover:bg-blue-600",
    },
  ];

  return (
    <div className="  flex flex-col items-center justify-center">
      <ul className="flex gap-4">
        {platforms.map((platform, index) => (
          <li key={index}>
            <a
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${platform.icon.split("-")[1]} profile`}
              className={`flex items-center justify-center w-12 h-12 bg-white text-black rounded-full shadow-lg transform transition-transform hover:translate-y-[-10px] ${platform.hover}`}
            >
              <i className={`fa ${platform.icon}`}></i>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialMediaButtons;
