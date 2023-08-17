"use client";
import React from "react";
import CustomButton from "../CustomButton/CustomButton";

import HomeChart from "../HomeChart/HomeChart";

const Hero = () => {
  const scrollHandler = () => {
    const nextSection = document.getElementById("discover");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero ">
      <div className="flex pt-16 flex-col md:flex-row lg:flex-row">
        <div className="flex-1 pt-20 padding-x">
          <h1 className="hero__title">Discover with us</h1>
          <p className="hero__subtitle">
            Variety of products at best price and fast delivery
          </p>
          <CustomButton
            title="Explore our Products"
            containerStyles="bg-primary-blue text-white rounded-full mt-10 w-full"
            handleClick={scrollHandler}
            btnType="button"
          />
        </div>
        <div className="flex pt-20 padding-x w-full ">
          <HomeChart />
        </div>
      </div>
    </div>
  );
};

export default Hero;
