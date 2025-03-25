'use client'
import SideBar from "@/components/SideBar/SideBar";
import { SidebarLink } from "@/types/user";
import { Megaphone ,CallBell, ClipboardText } from "@phosphor-icons/react";
import { VideoCamera } from "@phosphor-icons/react/dist/ssr";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const links: SidebarLink[] = [

    { href: "/co-mentor/attended-student", label: "Attended", icon: <CallBell size={16} /> },
    { href: "/co-mentor/announcments", label: "Announcment", icon: <Megaphone size={16} /> },
    { href: "/co-mentor/meeting-requests", label: "Meeting Requests", icon:<VideoCamera size={16} /> },
    { href: "/co-mentor/add-task", label: "Create Task", icon:<ClipboardText size={16} weight="bold" /> },
    
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
