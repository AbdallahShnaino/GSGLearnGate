export interface User {
  id: number;
  name: string;
  email: string;
  dob: string;
}

export interface SidebarLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}
