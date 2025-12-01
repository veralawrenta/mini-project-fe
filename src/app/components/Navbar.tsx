"use client";
import { Button } from "@/components/ui/button";
import { Activity, LogIn, Menu, Plus, User, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="container mx-auto op-0 z-50 w-full ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-0 lg:max-w-full xl:max-w-[95%]">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Activity className="w-6 h-6 text-[#FFD700]" strokeWidth={3} />
            <span className="text-xl font-extrabold tracking-wider text-accent">
              Vibe<span className="text-primary">Pulse</span>
            </span>
          </div>
          <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center">
            <Link 
              href={"#upcoming-events"}
              className="text-lg font-semibold transition duration-200 text-accent"
            >
              Find Event
            </Link>
            <Link 
              href={"/organizer/login"}
              className="flex items-center text-lg font-semibold transition duration-200 text-accent"
            >
              <Plus className="w-5 h-5 mr-1" />
              Create Event
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <Link
              href={"/signin"} 
              className="flex items-center px-3 py-1.5 text-base font-semibold 
                          rounded-full transition duration-200 text-secondary"
            >
              <LogIn className="w-5 h-5 mr-1 text-secondary" />
              Sign In
            </Link>
            
            <Button>
            <Link 
              href={"/register"}
              className="flex items-center px-2 py-2 text-base font-bold"
            >
              <User className="w-5 h-5 mr-1" />
              Register
            </Link>
            </Button>
          </div>
          <Button 
            onClick={toggleMenu} 
            className="md:hidden p-2 z-50"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>

        </div>
      </div>
      <div 
        className={`fixed inset-0 bg-[#1A1A1A] transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } md:hidden z-40`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col items-center pt-24 space-y-8">
          <Link
            href={"/events"}
            onClick={toggleMenu}
            className="text-3xl font-extrabold transition duration-200">
            Find Event
          </Link>
          <Link 
            href={"/organizer/login"}
            onClick={toggleMenu}
            className={`flex items-center text-3xl font-extrabold transition duration-200`}
          >
            <Plus className="w-8 h-8 mr-2" />
            Create Event
          </Link>

          <hr className={`w-1/3 border-t border-[#2C2C2C] my-4`} />
          <Link 
            href={"/signin"} 
            onClick={toggleMenu}
            className={`flex items-center text-2xl font-semibold transition duration-200`}
          >
            <LogIn className="w-6 h-6 mr-2" />
            Sign In
          </Link>
          <Link 
            href={"/register"} 
            onClick={toggleMenu}
            className="flex items-center px-8 py-3 text-2xl font-bold rounded-full 
                       transition duration-300 shadow-lg mt-6"
          >
            <User className="w-6 h-6 mr-2" />
            Register
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
