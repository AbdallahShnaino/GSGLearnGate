import Sidebar from "@/components/SideBar/SideBar";
import { Gauge } from "@phosphor-icons/react/dist/ssr";

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar
        links={[{ href: "/student", label: "Dashboard", icon: <Gauge /> }]}
      />
      {children}
    </div>
  );
}
