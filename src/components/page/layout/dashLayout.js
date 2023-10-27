"use client";

import React, { useState, useEffect } from "react";
import DashNavbar from "./navbar";
import ExampleSidebar from "./sidebar";

const DashLayout = ({ children }) => {
  // local state variable
  const [windowWidth, setWindowWidth] = useState(0);

  // useEffect with event listener to check the window width
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Initial window width
    setWindowWidth(window.innerWidth);

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let width = windowWidth > 768;

  return (
    <div className="">
      <DashNavbar />
      <div className="flex items-start">
        {width && <ExampleSidebar />}
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
};

const MainContent = function ({ children }) {
  return (
    <main
      className="relative w-full pl-4"
      style={{ height: "90vh" }}
    >
      {children}
    </main>
  );
};

export default DashLayout;
