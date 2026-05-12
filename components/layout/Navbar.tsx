"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { BellIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";
import useAuth from "@/contexts/AuthContext";
import { FaCaretDown } from "react-icons/fa";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import BasicMenu from "../ui/BasicMenu";
import ProfileMenu from "../ui/ProfileMenu";
import toast from "react-hot-toast";
import useList from "@/hooks/useList";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const closeMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const router = useRouter();
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const list = useList(user?.uid);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToSection = (sectionId: "trending" | "my-list") => {
    const targetHash = `#${sectionId}`;

    if (pathname !== "/") {
      router.push(`/${targetHash}`);
      return;
    }

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (window.location.hash !== targetHash) {
      window.history.replaceState(null, "", `/${targetHash}`);
    }
  };

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
      window.removeEventListener("scroll", handleScroll);
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
        <Link href="/" onClick={scrollToTop}>
          <Image
            alt="Netflix Logo"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            width={100}
            height={100}
            className="cursor-pointer object-contain"
          />
        </Link>

        <BasicMenu />

        <ul className="hidden space-x-4 lg:space-x-6 md:flex">
          <Link href="/" className="header__link" onClick={scrollToTop}>Home</Link>
          <div style={{cursor: "not-allowed"}} className="header__link">Tv Shows</div>
          <div style={{cursor: "not-allowed"}} className="header__link">Movies</div>
          <button className="header__link" style={{ cursor: "pointer" }}
          onClick={() => navigateToSection("trending")}>
            New & Popular
          </button>
          <button
            className="header__link"
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (list.length === 0) {
                toast.dismiss();
                toast("Add some movies to your list to view!", { icon: "🎬" });
              } else {
                navigateToSection("my-list");
              }
            }}
          >
            My List
          </button>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <MagnifyingGlassIcon className="h-6 w-6 cursor-not-allowed mt-0.5 transition duration-[.4s] hover:text-[#b3b3b3]" />
        <p className="header__link hidden lg:inline cursor-not-allowed">
          Kids
        </p>
        <BellIcon className="hidden h-6 w-6 mt-0.5 transition duration-[.4s] hover:text-[#b3b3b3] lg:inline cursor-not-allowed" />
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
          <ProfileMenu
            isOpen={isProfileMenuOpen}
            onMouseEnter={openProfileMenu}
            onMouseLeave={closeProfileMenuWithDelay}
            onLogout={logout}
          />
        </button>
      </div>
    </header>
  );
}

export default Header;
