import { X } from "@phosphor-icons/react";
import Link from "next/link";
import "./navLinks.css";

interface ShowNavProps {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavLinks: React.FC<ShowNavProps> = ({ showNav, setShowNav }) => {
  return (
    <nav
      className={`lg:block max-lg:absolute max-lg:${
        showNav ? "opacity-100" : "opacity-0 hidden"
      } max-lg:top-0 max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:bg-[rgba(0,0,0,0.5)] max-lg:z-50`}
      onClick={() => setShowNav(false)}
    >
      <ul className="flex items-center max-lg:z-50 max-lg:w-[70%] max-lg:h-dvh max-lg:flex-col max-lg:items-start max-lg:bg-white max-lg:relative ">
        <li className="text-white font-bold max-lg:absolute lg:hidden right-2.5 top-2.5">
          <X size={25} onClick={() => setShowNav(false)} />
        </li>
        <li className="text-white font-bold max-lg:mt-10 max-lg:w-full">
          <Link
            className="max-lg:text-lg py-2 px-4 hover:text-[var(--primary-color)]  max-lg:py-4 max-lg:w-full max-lg:block"
            href={"/"}
          >
            Home
          </Link>
        </li>
        <li className="text-white font-bold max-lg:w-full">
          <Link
            className="max-lg:text-lg py-2 px-4 hover:text-[var(--primary-color)]  max-lg:py-4 max-lg:w-full max-lg:block"
            href={"/about-us"}
          >
            About Us
          </Link>
        </li>
        <li className="text-white font-bold max-lg:w-full">
          <Link
            className="max-lg:text-lg py-2 px-4 hover:text-[var(--primary-color)]  max-lg:py-4 max-lg:w-full max-lg:block"
            href={"/contact-us"}
          >
            Contact Us
          </Link>
        </li>
        <li className="text-white font-bold max-lg:w-full">
          <Link
            className="max-lg:text-lg py-2 px-4 hover:text-[var(--primary-color)]  max-lg:py-4 max-lg:w-full max-lg:block"
            href={"/fq"}
          >
            FQ
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavLinks;