import {
  RiDashboard3Line,
  RiBookReadFill,
  RiBookMarkedLine,
} from "react-icons/ri";
import { FiHelpCircle } from "react-icons/fi";
import { AiOutlinePieChart } from "react-icons/ai";
import { TbSettings2 } from "react-icons/tb";

export const COMMON_SIDEBAR = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <RiDashboard3Line />,
  },
  {
    key: "student",
    label: "Students",
    path: "/students",
    icon: <RiBookReadFill />,
  },
  {
    key: "chapters",
    label: "Chapter",
    path: "/chapters",
    icon: <RiBookMarkedLine />,
  },
  {
    key: "support",
    label: "Help",
    path: "/help",
    icon: <FiHelpCircle />,
  },
  {
    key: "reports",
    label: "Reports",
    path: "/reports",
    icon: <AiOutlinePieChart />,
  },
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: <TbSettings2 />,
  },
];
