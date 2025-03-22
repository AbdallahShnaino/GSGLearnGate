"use client";
import React, { useState } from "react";
import HeaderLogo from "../HeaderLogo/HeaderLogo";
import NavLinks from "../NavLinks/NavLinks";
import UserMenu from "../UserMenu/UserMenu";

const HeaderNav = () => {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [login, setLogin] = useState(true);
  const user = {
    first_name: "Mohammed",
    last_name: "Qashqesh",
    email: "mo.qashqesh@gmail.com",
    adminRole: true,
  };

  return (
    <header className="md:w-[750] lg:w-[970] xl:w-[1170] m-auto px-[15] flex items-center justify-between">
      <HeaderLogo />
      <NavLinks />
      <UserMenu
        user={user}
        showUserDetails={showUserDetails}
        setShowUserDetails={setShowUserDetails}
        login={login}
        setLogin={setLogin}
      />
    </header>
  );
};

export default HeaderNav;
