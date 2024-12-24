import React from "react";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { FiHelpCircle } from "react-icons/fi";
import { RiMessage2Line } from "react-icons/ri";
import { LuSettings2 } from "react-icons/lu";
import { VscBellDot } from "react-icons/vsc";
import UserPic from "../../../public/userpic.jpeg";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="bg-slate-100 h-20 px-4 flex items-center justify-between">
      <div className="relative">
        <IoSearchOutline
          fontSize={20}
          className="text-gray-500 absolute top-1/2 left-5 -translate-y-1/2"
        />
        <input
          type="text"
          placeholder="Search your course"
          className="text-sm focus:outline-none rounded-xl placeholder-gray-400 font-medium tracking-wide active:outline-none hidden sm:flex sm:w-[17rem] xl:w-[30rem] h-[52px] pl-12 pr-5 rounded-sm"
        />
      </div>
      <div className="flex items-center gap-3 mr-2 text-gray-500 lg:gap-5 xl:gap-8">
        <FiHelpCircle
          onClick={() => navigate("/help")}
          className="hover:cursor-pointer hover:text-black"
        />
        <RiMessage2Line
          onClick={() => navigate("/reports")}
          className="hover:cursor-pointer hover:text-black"
        />
        <LuSettings2
          onClick={() => navigate("/settings")}
          className="hover:cursor-pointer hover:text-black"
        />
        <VscBellDot
          onClick={() => navigate("/students")}
          className="hover:cursor-pointer hover:text-black"
        />
        <div className="flex items-center gap-3 xl:gap-5">
          <img
            src={UserPic}
            alt="user"
            className="w-6 h-6 xl:w-8 xl:h-8 rounded-md"
          />
          <div className="text-sm sm:text-base text-black font-medium">
            Adeline H. Dancy
          </div>
        </div>
      </div>
    </div>
  );
}
