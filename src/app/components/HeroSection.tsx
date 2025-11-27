"use client";
import { Activity } from "lucide-react";
import SearchBar from "./ui/SearchBar";

const HeroSection = () => {
  const handleSearch = (query: string) => {
    console.log("Navigating to search results for:", query);
  };

  return (
    <div className="relative h-[55vh] md:h-[55vh] w-full flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/hero-photo-concert.jpg')` }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-primary/5"></div>
      </div>
      <div className="container mx-auto relative z-10 text-center px-4 max-w-7xl w-full">
        <h1 className="text-3xl sm:text-5xl md:text-8xl font-extrabold tracking-tight mb-4 leading-tight text-secondary text-shadow-accent">
          Find Your Next Pulse{" "}
          <Activity className="inline-block h-[1em] w-[1em] mx-2 text-[#FFD700]" />
        </h1>
        <p className="text-l sm:tex-xl md:text-2xl mb-10 font-medium text-muted">
          Grab tickets to the hottest shows, talks, and games happening right
          now!
        </p>
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default HeroSection;
