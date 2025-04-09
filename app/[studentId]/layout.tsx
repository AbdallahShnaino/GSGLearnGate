import Sidebar from "@/components/SideBar/SideBar";
import { Gauge } from "@phosphor-icons/react/dist/ssr";
import { Laptop } from "@phosphor-icons/react/dist/ssr";
import { CalendarCheck } from "@phosphor-icons/react/dist/ssr";
import { Megaphone } from "@phosphor-icons/react/dist/ssr";
import { Clock } from "@phosphor-icons/react/dist/ssr";

export default async function StudentLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ studentId: string }>;
  children: React.ReactNode;
}>) {
  const { studentId } = await params;
  return (
    <div className="flex">
      <Sidebar
        links={[
          { href: `/${studentId}`, label: "Dashboard", icon: <Gauge /> },
          {
            href: `/${studentId}/my-courses`,
            label: "My Courses",
            icon: <Laptop />,
          },
          {
            href: `/${studentId}/appointments`,
            label: "Appointments",
            icon: <CalendarCheck />,
          },
          {
            href: `/${studentId}/announcements`,
            label: "Announcements ",
            icon: <Megaphone />,
          },
          {
            href: `/${studentId}/coming-soon-courses`,
            label: "Soon Courses",
            icon: <Clock />,
          },
        ]}
      />
      {children}
    </div>
  );
}
