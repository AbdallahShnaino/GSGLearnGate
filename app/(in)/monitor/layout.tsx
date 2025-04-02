import Sidebar from "@/components/SideBar/SideBar";
import {
  House,
  Book,
  Users,
  Student,
  UserGear,
  UserPlus,
  UserCirclePlus,
  ReadCvLogo,
} from "@phosphor-icons/react/dist/ssr";
import { SidebarLink } from "@/types/user";

export const links: SidebarLink[] = [
  {
    href: "/monitor/dashboard",
    label: "Dashboard",
    icon: <House size={24} weight="bold" />,
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
    href: "/monitor/create-announcement",
    label: "Create Announcement",
    icon: <UserGear size={24} weight="bold" />,
  },
  {
    href: "/monitor/grading",
    label: "Grading",
    icon: <Users size={24} weight="bold" />,
  },
  {
    href: "/monitor/attendance",
    label: "Attendance",
    icon: <UserPlus size={24} weight="bold" />,
  },
];

export default function MonitorDashboard({
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
