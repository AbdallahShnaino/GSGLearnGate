"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarLink } from "@/types/user";
import { SignOut, List } from "@phosphor-icons/react/dist/ssr";

interface IProps {
  links: SidebarLink[];
}

export default function Sidebar({ links }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        className={`md:hidden p-3 text-[#E99375] fixed top-4 left-4 z-50 ${
          isOpen ? "hidden" : "block"
        }`}
        onClick={() => setIsOpen(true)}
      >
        <List size={32} />
      </button>
      <aside
        className={`bg-[#FFF5E8] w-72 h-screen text-white p-4 flex flex-col fixed top-0 left-0 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="flex justify-center items-center gap-2 mb-8 pt-4">
          <Image src="/img/gsgLogo.png" width={50} height={50} alt="gsgLogo" />
          <h1 className="text-[#8c9294] font-semibold text-lg">
            Gaza Sky Geeks
          </h1>
          <button
            className="md:hidden text-[#E99375]"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>
        <nav className="flex-1">
          <ul>
            {links.map(({ href, label, icon }) => {
              const isActive = pathname === href;

              return (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center p-3 rounded-lg transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <div
                      className={`flex items-center gap-3 w-full p-3 rounded-lg ${
                        isActive
                          ? "bg-[#FFA41F] text-white font-medium"
                          : "text-gray-100 bg-[#E99375] hover:text-white"
                      }`}
                    >
                      <div>{icon}</div>
                      <div>{label}</div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-auto pt-4 border-t border-[#4A4F57]">
          <div className="flex items-center gap-3 p-3 cursor-pointer">
            <SignOut size={24} />
            <p className="font-medium text-[#8c9294]">Log Out</p>
          </div>
        </div>
      </aside>
    </>
  );
}

