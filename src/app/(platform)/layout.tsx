import React from "react";

import { Menu } from "@/components/menu";
import serverAuth from "@/libs/server-auth";

export default async function Layout({ children }: React.PropsWithChildren) {
  const auth = await serverAuth();
  return (
    <div className="h-screen flex">
      <aside className="w-[260px] bg-white border-r border-slate-200 text-slate-950 flex flex-col gap-6 px-4 py-6">
        <div className="text-lg font-semibold tracking-tight text-black ml-3 mt-2">
          nextlms.
        </div>
        <section>
          <h5 className="font-medium text-slate-500">Platform Menu</h5>
          <Menu label="My Courses" href="/dashboard/my-courses" />
          <Menu label="Certificates" href="/dashboard/certificates" />
          <Menu label="Orders" href="/dashboard/orders" />
        </section>
        {auth?.role === "admin" && (
          <section>
            <h5 className=" font-medium text-slate-500">Admin Menu</h5>
            <Menu label="Analytics" href="/admin/analytics" />
            <Menu label="Flash sale" href="/admin/flash-sales" />
            <Menu label="Courses" href="/admin/courses" />
            <Menu label="Certificates" href="/admin/certificate-approvals" />
            <Menu label="Users" href="/admin/users" />
          </section>
        )}
      </aside>
      <main className="w-[calc(100%-260px)] h-screen overflow-y-auto bg-white">
        {children}
      </main>
    </div>
  );
}
