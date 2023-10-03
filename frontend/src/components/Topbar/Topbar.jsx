"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../../styles/home/topbar.css";

const Topbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="otherlinks">
          <Link href="aboutus" className="navlinks">
            AboutUs
          </Link>
          <Link href="services" className="navlinks">
            Services
          </Link>
          <Link href="resources" className="navlinks">
            Resources
          </Link>
        </div>
        <Link href="/" className="logolink">
          {/* <Image src="" alt="logo" /> */}
          <p className="logo">Logo</p>
        </Link>
        <div className="signbtn">
          <button className="signupbtn">Sign Up</button>
        </div>
      </nav>
    </>
  );
};

export default Topbar;
