import Sidebar from "@/components/SideBar/SideBar";
import {
  House,
  Book,
  Users,
  Student,
  Megaphone,
  UserGear,
} from "@phosphor-icons/react/dist/ssr";
import { SidebarLink } from "@/types/user";

export const links: SidebarLink[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <House size={24} weight="bold" />,
  },
  {
    href: "/courses",
    label: "Courses",
    icon: <Book size={24} weight="bold" />,
  },
  {
    href: "/monitors",
    label: "Monitors",
    icon: <UserGear size={24} weight="bold" />,  // Updated icon
  },
  {
    href: "/co-monitors",
    label: "Co-Monitors",
    icon: <Users size={24} weight="bold" />,
  },
  {
    href: "/students",
    label: "Students",
    icon: <Student size={24} weight="bold" />,
  },
  {
    href: "/announcement",
    label: "Announcement",
    icon: <Megaphone size={24} weight="bold" />,
  },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar links={links} />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
