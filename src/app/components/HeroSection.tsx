"use client";
import { Activity } from "lucide-react";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";

const HeroSection = () => {
  return (
    <div className="container mx-auto relative h-[45vh] md:h-[55vh] w-full flex items-center justify-center overflow-hidden rounded-2xl">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/hero-photo.jpg')` }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-[#1A1A1A]/60 via-[#1A1A1A]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-primary/10"></div>
      </div>
      <div className="container mx-auto relative z-10 text-center px-4 max-w-7xl w-full">
        <h1 className="mt-20 text-3xl md:text-6xl lg:text-8xl font-extrabold tracking-tight mb-4 leading-tight text-accent">
          Find Your Next <span className="text-purple-400 underline decoration-solid decoration-[#FFD700] decoration-8 underline-offset-8"> Pulse</span>{" "}
          <Activity className="inline-block h-[1em] w-[1em] mx-2 text-[#FFD700]" />
        </h1>
        <p className="text-l md:text-xl lg:text-2xl mb-10 font-medium text-muted">
          Grab tickets to the hottest shows, talks, and games happening right
          now!
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
