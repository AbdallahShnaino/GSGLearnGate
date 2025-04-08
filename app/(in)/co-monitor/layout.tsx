"use client";
import SideBar from "@/components/SideBar/SideBar";
import { SidebarLink } from "@/types/user";
import { Megaphone, CallBell, ClipboardText } from "@phosphor-icons/react";
import { VideoCamera } from "@phosphor-icons/react/dist/ssr";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links: SidebarLink[] = [
    {
      href: "/co-monitor/schedule",
      label: "Attendance",
      icon: <CallBell size={16} />,
    },
    {
      href: "/co-monitor/announcements",
      label: "Announcements",
      icon: <Megaphone size={16} />,
    },
    {
      href: "/co-monitor/availability",
      label: "Availability",
      icon: <Megaphone size={16} />,
    },
    {
      href: "/co-monitor/meeting-requests",
      label: "Meeting Appointments",
      icon: <VideoCamera size={16} />,
    },
    {
      href: "/co-monitor/tasks",
      label: "Tasks",
      icon: <ClipboardText size={16} weight="bold" />,
    },
  ];

  return (
    <div className="flex min-h-screen">
      <SideBar links={links} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
