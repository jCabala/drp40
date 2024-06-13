"use client";
import React, { useEffect, useState } from "react";
import type { NavbarConfig } from "@/data/navbarConfig";
import Cookies from "js-cookie";
type Props = {
  navConfig: NavbarConfig;
};

export default function Navbar({ navConfig }: Props) {
  const [userID, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Function to update userId based on current value of Cookies.get("userID")
    const updateUserId = () => {
      const userID = Cookies.get("userID");
      setUserId(userID); // Assuming setUserId is a state setter function
    };

    // Initial call to update userId when component mounts
    updateUserId();

    // Poll for updates every 1 second using setInterval
    const intervalId = setInterval(updateUserId, 1000);

    // Clean up interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <nav
      className="fixed w-full z-20 flex flex-wrap items-center justify-between h-14 bg-orange-500 shadow-lg"
      style={{ zIndex: 100 }}
    >
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <a
            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
            href="/"
          >
            {navConfig.title}
          </a>
          <button
            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            {navConfig.links.map((link) => (
              <li className="nav-item" key={link.title}>
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href={link.path}
                >
                  <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">{link.title}</span>
                </a>
              </li>
            ))}
            <li className="nav-item">
              <a
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                href={userID ? `/profile/${userID}` : "/"}
              >
                <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                <span className="ml-2">Your Profile</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
