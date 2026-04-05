"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { BellIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";
import useAuth from "@/hooks/useAuth";
import {
  FaCaretDown,
  FaEdit,
  FaRegQuestionCircle,
  FaUser,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const closeMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const { logout } = useAuth();

  const openProfileMenu = () => {
    if (closeMenuTimeoutRef.current) {
      clearTimeout(closeMenuTimeoutRef.current);
      closeMenuTimeoutRef.current = null;
    }
    setIsProfileMenuOpen(true);
  };

  const closeProfileMenuWithDelay = () => {
    closeMenuTimeoutRef.current = setTimeout(() => {
      setIsProfileMenuOpen(false);
      closeMenuTimeoutRef.current = null;
    }, 300);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (closeMenuTimeoutRef.current) {
        clearTimeout(closeMenuTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10 ">
        <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <Image
            alt="Netflix Logo"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            width={100}
            height={100}
            className="cursor-pointer object-contain"
          />
        </Link>

        <ul className="hidden space-x-4 lg:space-x-6 md:flex">
          <li className="header__link">Home</li>
          <li className="header__link">Tv Shows</li>
          <li className="header__link">Movies</li>
          <li className="header__link">New & Popular</li>
          <li className="header__link">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <MagnifyingGlassIcon className="h-6 w-6 cursor-not-allowed mt-0.5 " />
        <p className="hidden lg:inline font-semibold md:text-xl cursor-not-allowed">
          Kids
        </p>
        <BellIcon className="hidden h-6 w-6 mt-1 lg:inline cursor-not-allowed" />
        <button
          onMouseEnter={openProfileMenu}
          onMouseLeave={closeProfileMenuWithDelay}
          className="flex items-center gap-x-3 cursor-pointer"
        >
          <Image
            alt="User Avatar"
            width={32}
            height={32}
            src="https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
            className="rounded"
          />
          <FaCaretDown
            className={`w-5 h-5 transition-transform duration-200 ${isProfileMenuOpen ? "rotate-180" : ""}`}
          />
          <div
            onMouseEnter={openProfileMenu}
            onMouseLeave={closeProfileMenuWithDelay}
            className={`absolute w-48 h-60 bg-[#141414] -bottom-61 right-16 transition-opacity duration-200 ${isProfileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          >
            <FaCaretDown className="absolute -top-3 right-5.5 w-5 h-5 text-white rotate-180" />
            <ul className="flex flex-col justify-start items-start gap-1 p-4 w-full h-full">
              <li className="flex items-center gap-2 text-sm font-normal text-gray-400 hover:text-white cursor-not-allowed mb-3">
                <Image
                  alt="User Avatar"
                  src="https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
                  width={20}
                  height={20}
                  className="rounded"
                />
                My Account
              </li>
              <li className="flex items-center gap-2 text-sm font-normal text-gray-400 hover:text-white cursor-not-allowed mb-3">
                <div className="relative h-5 w-5 overflow-hidden rounded">
                  <Image
                    alt="Kids Avatar"
                    src="https://i.ytimg.com/vi/KTBpSSDHLks/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGH8gFCg2MA8=&rs=AOn4CLBAHOhTL9hgIc0aPXejil0w4XZ0yg"
                    fill
                    sizes="20px"
                    className="object-cover"
                  />
                </div>
                Kids
              </li>
              <li className="flex items-center gap-2 text-sm font-normal text-gray-400 hover:text-white cursor-not-allowed mb-3">
                <FaEdit className="w-5 h-5" />
                Manage Profiles
              </li>
              <li className="flex items-center gap-2 text-sm font-normal text-gray-400 hover:text-white cursor-not-allowed mb-3">
                <FaUser className="w-5 h-5" />
                Account
              </li>
              <li className="flex items-center gap-2 text-sm font-normal text-gray-400 hover:text-white cursor-not-allowed mb-3">
                <FaRegQuestionCircle className="w-5 h-5" />
                Help Center
              </li>
            </ul>
            <div
              onClick={logout}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full pt-2.5 border-t border-gray-700 text-md font-normal text-gray-400 hover:text-white cursor-pointer"
            >
              Sign out of Netflix
            </div>
          </div>
        </button>
      </div>
    </header>
  );
}

export default Header;
