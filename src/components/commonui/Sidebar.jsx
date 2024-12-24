import React, { useState } from "react";
import classNames from "classnames";
import Logo from "../../../public/logo.png";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { FiMenu, FiX } from "react-icons/fi";
import { COMMON_SIDEBAR } from "../../utils/index";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="md:hidden flex items-center justify-between bg-white p-3">
        <img src={Logo} alt="Logo" className="h-10" />
        <button
          className="text-black text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
      <div
        className={`fixed top-0 left-0 min-h-screen bg-neutral-550 sm:w-44 xl:w-60 p-3 flex flex-col transform transition-transform duration-300 z-50 bg-white
          ${!isOpen ? "-translate-x-full" : "translate-x-0"}
          md:translate-x-0 md:static md:flex`}
      >
        <div className="flex items-center gap-2 px-1 py-3">
          <img src={Logo} alt="Logo" className="h-16" />
        </div>
        <div className="py-3 flex flex-1 flex-col gap-3">
          {COMMON_SIDEBAR.map((link) => (
            <SidebarLink key={link.key} link={link} />
          ))}
        </div>
        <div className="flex flex-col gap-0.5 pt-2 border-t border-gray-300">
          <Link to="/register">
            <div className="flex items-center gap-3 font-semibold px-3 py-2 hover:no-underline hover:bg-[#EEEEEE] rounded-sm text-base cursor-pointer text-red-500">
              <span className="text-xl">
                <HiOutlineLogout />
              </span>
              Logout
            </div>
          </Link>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

function SidebarLink({ link }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={link.path}
      className={classNames(
        pathname === link.path
          ? "bg-[#EEEEEE] text-black flex items-center gap-3 font-bold px-3 py-2 hover:no-underline hover:bg-[#EEEEEE] rounded-sm text-base"
          : "text-gray-500 flex items-center gap-3 font-semibold px-3 py-2 hover:no-underline hover:bg-[#EEEEEE] rounded-sm text-base"
      )}
    >
      <span className="text-2xl">{link.icon}</span>
      {link.label}
    </Link>
  );
}
