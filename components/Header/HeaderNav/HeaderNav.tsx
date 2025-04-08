"use client";
import React, { useState } from "react";
import UserMenu from "../UserMenu/UserMenu";
import { List } from "@phosphor-icons/react/dist/ssr";
import HeaderLogo from "../HeaderLogo/HeaderLogo";
import NavLinks from "@/components/NavLinks/NavLinks";
import { useCookie } from "@/hooks/useCookie";
import Link from "next/link";

interface positionProps {
  position: string;
}

const HeaderNav = ({ position }: positionProps) => {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const {email, role, token} = useCookie();
  console.log(token)
  const user = {
    email: email || "",
    role: role || "",
  };

  return (
    <header
      className={`md:w-[750] lg:w-[970] xl:w-[1170] m-auto px-[15] flex items-center justify-between  z-50 py-2.5 ${
        position === "absolute"
          ? "lg:absolute lg:left-1/2 lg:-translate-x-1/2"
          : ""
      } `}
    >
      <HeaderLogo position={position}/>
      <NavLinks showNav={showNav} setShowNav={setShowNav} position={position}/>
      {token !==null ? (
        <UserMenu
          user={user}
          showUserDetails={showUserDetails}
          setShowUserDetails={setShowUserDetails}
        />
      ) : (
        <div className="flex items-center gap-3">
          <Link className="py-2 px-4 hover:bg-[#f9fafb]" href={"/login"}>
            Log in
          </Link>
          <Link
            className="py-2 px-4 bg-[var(--primary-color)] rounded text-white"
            href={"/signup"}
          >
            Get started
          </Link>
        </div>
      )}
      <List
        onClick={() => setShowNav(!showNav)}
        size={26}
        className="cursor-pointer lg:hidden"
      />
    </header>
  );
};

export default HeaderNav;