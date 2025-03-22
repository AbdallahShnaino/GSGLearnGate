"use client";
import React, { useState } from "react";
import HeaderLogo from "../HeaderLogo/HeaderLogo";
import NavLinks from "../NavLinks/NavLinks";
import UserMenu from "../UserMenu/UserMenu";
import { List } from "@phosphor-icons/react/dist/ssr";

const HeaderNav = () => {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [login, setLogin] = useState(true);
  const user = {
    first_name: "Mohammed",
    last_name: "Qashqesh",
    email: "mo.qashqesh@gmail.com",
    adminRole: true,
  };

  return (
    <header className="md:w-[750] lg:w-[970] xl:w-[1170] m-auto px-[15] flex items-center justify-between lg:absolute lg:left-1/2 lg:-translate-x-1/2 z-50 py-2.5">
      <HeaderLogo />
      <NavLinks showNav={showNav} setShowNav={setShowNav} />
      <UserMenu
        user={user}
        showUserDetails={showUserDetails}
        setShowUserDetails={setShowUserDetails}
        login={login}
        setLogin={setLogin}
      />
      <List
        onClick={() => setShowNav(!showNav)}
        size={26}
        className="cursor-pointer lg:hidden"
      />
    </header>
  );
};

export default HeaderNav;
