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
          {
            href: `/student/${studentId}`,
            label: "Dashboard",
            icon: <Gauge />,
          },
          {
            href: `/student/${studentId}/my-courses`,
            label: "My Courses",
            icon: <Laptop />,
          },
          {
            href: `/student/${studentId}/appointments`,
            label: "Appointments",
            icon: <CalendarCheck />,
          },
          {
            href: `/student/${studentId}/announcements`,
            label: "Announcements ",
            icon: <Megaphone />,
          },
          {
            href: `/student/${studentId}/coming-soon-courses`,
            label: "Soon Courses",
            icon: <Clock />,
          },
        ]}
      />
      {children}
    </div>
  );
}
