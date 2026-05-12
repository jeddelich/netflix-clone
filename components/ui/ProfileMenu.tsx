import Link from "next/link";
import Image from "next/image";
import {
  FaCaretDown,
  FaEdit,
  FaRegQuestionCircle,
  FaUser,
} from "react-icons/fa";

type ProfileMenuProps = {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onLogout: () => void;
};

function ProfileMenu({
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onLogout,
}: ProfileMenuProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute w-48 h-60 bg-[#141414] -bottom-61 right-16 transition-opacity duration-200 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
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
        <Link href="/account">
          <li className="flex items-center gap-2 text-sm font-normal text-gray-400 hover:text-white mb-3">
            <FaUser className="w-5 h-5" />
            Account
          </li>
        </Link>
        <li className="flex items-center gap-2 text-sm font-normal text-gray-400 hover:text-white cursor-not-allowed mb-3">
          <FaRegQuestionCircle className="w-5 h-5" />
          Help Center
        </li>
      </ul>
      <div
        onClick={onLogout}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full pt-2.5 border-t border-gray-700 text-md font-normal text-gray-400 hover:text-white cursor-pointer"
      >
        Sign out of Netflix
      </div>
    </div>
  );
}

export default ProfileMenu;
