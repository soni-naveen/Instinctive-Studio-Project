import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="bg-slate-100 min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header className="w-full" />
        <div className="flex-1 px-2 w-full sm:px-4 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
