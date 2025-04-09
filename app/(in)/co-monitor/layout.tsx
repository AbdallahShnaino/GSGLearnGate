"use client";
import SideBar from "@/components/SideBar/SideBar";
import { SidebarLink } from "@/types/user";
import {
  Megaphone,
  CallBell,
  ClipboardText,
  Student,
} from "@phosphor-icons/react";
import { VideoCamera } from "@phosphor-icons/react/dist/ssr";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links: SidebarLink[] = [
    {
      href: "/co-monitor/tasks",
      label: "Tasks",
      icon: <ClipboardText size={20} weight="bold" />,
    },
    {
      href: "/co-monitor/students",
      label: "Students",
      icon: <Student size={20} weight="bold" />,
    },
    {
      href: "/co-monitor/schedule",
      label: "Attendance",
      icon: <CallBell size={20} weight="bold" />,
    },
    {
      href: "/co-monitor/announcements",
      label: "Announcements",
      icon: <Megaphone size={20} weight="bold" />,
    },
    {
      href: "/co-monitor/availability",
      label: "Meetings Appointments",
      icon: <VideoCamera size={20} weight="bold" />,
    },
  ];

  return (
    <div className="flex min-h-screen">
      <SideBar links={links} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
