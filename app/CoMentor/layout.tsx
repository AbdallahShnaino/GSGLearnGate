'use client'
import SideBar from "@/components/SideBar/SideBar";
import { SidebarLink } from "@/types/user";
import { Megaphone ,CallBell } from "@phosphor-icons/react";
import { VideoCamera } from "@phosphor-icons/react/dist/ssr";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const links: SidebarLink[] = [
    // { href: "/", label: "Home", icon: <Info size={24} /> },
    { href: "/CoMentor/AttendedPage", label: "Attended", icon: <CallBell size={16} /> },
    { href: "/CoMentor/Announcment", label: "Announcment", icon: <Megaphone size={16} /> },
    { href: "/CoMentor/MeetingRequests", label: "Meeting Requests", icon:<VideoCamera size={16} /> },
    
  ];
 
  return (
        <div className="flex min-h-screen">
          <SideBar links={links} />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      
  );
}
