"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { BellIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout } = useAuth();

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

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10 ">
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />

        <ul className="hidden space-x-4 lg:space-x-6 md:flex">
          <li className="header__link">Home</li>
          <li className="header__link">Tv Shows</li>
          <li className="header__link">Movies</li>
          <li className="header__link">New & Popular</li>
          <li className="header__link">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <MagnifyingGlassIcon className="h-6 w-6 cursor-pointer mt-0.5 " />
        <p className="hidden lg:inline font-semibold md:text-xl cursor-pointer">Kids</p>
        <BellIcon className="hidden h-6 w-6 mt-1 lg:inline cursor-pointer" />
        {/* <Link href="/account" onClick={}> */}
          <img
            onClick={logout}
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded lg:h-8 lg:w-8"
          />
        {/* </Link> */}
      </div>
    </header>
  );
}

export default Header;
