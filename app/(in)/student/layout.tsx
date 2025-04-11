import SideBar from "@/components/Sidebar/Sidebar";
import { Gauge } from "@phosphor-icons/react/dist/ssr";
import { Laptop } from "@phosphor-icons/react/dist/ssr";
import { CalendarCheck } from "@phosphor-icons/react/dist/ssr";
import { Megaphone } from "@phosphor-icons/react/dist/ssr";
import { Clock } from "@phosphor-icons/react/dist/ssr";

export default async function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <SideBar
        links={[
          {
            href: `/student`,
            label: "Dashboard",
            icon: <Gauge />,
          },
          {
            href: `/student/my-courses`,
            label: "My Courses",
            icon: <Laptop />,
          },
          {
            href: `/student/appointments`,
            label: "Appointments",
            icon: <CalendarCheck />,
          },
          {
            href: `/student/announcements`,
            label: "Announcements ",
            icon: <Megaphone />,
          },
          {
            href: `/student/coming-soon-courses`,
            label: "Soon Courses",
            icon: <Clock />,
          },
        ]}
      />
      {children}
    </div>
  );
}
