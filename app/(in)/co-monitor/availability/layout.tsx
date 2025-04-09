"use client";

import { ToastContainer } from "react-toastify";

export default function Layout({
  children,
  create,
  list,
}: {
  children: React.ReactNode;
  create: React.ReactNode;
  list: React.ReactNode;
}) {
  return (
    <div className="w-11/12 m-auto flex flex-col">
      <ToastContainer position="top-right" />

      {children}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10 mb-10">
        {create}
        {list}
      </div>
    </div>
  );
}
