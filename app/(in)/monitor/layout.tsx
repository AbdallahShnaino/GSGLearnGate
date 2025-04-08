import Sidebar from "@/components/SideBar/SideBar";
import {
  Student,
  UserGear,
  UserCirclePlus,
  BookOpenUser,
} from "@phosphor-icons/react/dist/ssr";
import { SidebarLink } from "@/types/user";

export const links: SidebarLink[] = [
  {
    href: "/monitor/students",
    label: "Students",
    icon: <BookOpenUser size={24} weight="bold" />,
  },
  {
    href: "/monitor/joining-requests",
    label: "Joining Requests",
    icon: <UserCirclePlus size={24} weight="bold" />,
  },
  {
    href: "/monitor/tasks",
    label: "Tasks",
    icon: <Student size={24} weight="bold" />,
  },
  {
    href: "/monitor/announcements",
    label: "Announcement",
    icon: <UserGear size={24} weight="bold" />,
  },
];

export default function MonitorDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <Sidebar links={links} />
      <main className="flex-grow px-4 py-6">
        <div className="max-w-[1200px] mx-auto w-full">{children}</div>
      </main>
    </div>
  );
}
