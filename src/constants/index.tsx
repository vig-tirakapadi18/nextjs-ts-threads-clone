import {
  FaHeart,
  FaHome,
  FaReplyAll,
  FaSearch,
  FaTags,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { BsThreads } from "react-icons/bs";

export const sidebarLinks = [
  {
    icon: (size: number = 26, color: string = "#fff") => {
      return <FaHome size={size + 4} color={color} />;
    },
    route: "/",
    label: "Home",
  },
  {
    icon: (size: number = 26, color: string = "#fff") => {
      return <FaSearch size={size} color={color} />;
    },
    route: "/search",
    label: "Search",
  },
  {
    icon: (size: number = 26, color: string = "#fff") => {
      return <FaHeart size={size} color={color} />;
    },
    route: "/activity",
    label: "Activity",
  },
  {
    icon: (size: number = 26, color: string = "#fff") => {
      return <IoCreate size={size} color={color} />;
    },
    route: "/create-thread",
    label: "Create Thread",
  },
  {
    icon: (size: number = 26, color: string = "#fff") => {
      return <FaUsers size={size} color={color} />;
    },
    route: "/communities",
    label: "Communities",
  },
  {
    icon: (size: number = 26, color: string = "#fff") => {
      return <FaUser size={size} color={color} />;
    },
    route: "/profile",
    label: "Profile",
  },
];

export const profileTabs = [
  {
    value: "threads",
    label: "Threads",
    icon: (size: number = 26, color: string = "#fff") => {
      return <FaReplyAll size={size} color={color} />;
    },
  },
  {
    value: "replies",
    label: "Replies",
    icon: (size: number = 26, color: string = "#fff") => {
      return <FaUsers size={size} color={color} />;
    },
  },
  {
    value: "tagged",
    label: "Tagged",
    icon: (size: number = 26, color: string = "#fff") => {
      return <BsThreads size={size - 2} color={color} />;
    },
  },
];

export const communityTabs = [
  {
    value: "threads",
    label: "Threads",
    icon: (size: number = 26, color: string = "#fff") => {
      return <FaReplyAll size={size + 4} color={color} />;
    },
  },
  {
    value: "members",
    label: "Members",
    icon: (size: number = 26, color: string = "#fff") => {
      return <FaUsers size={size + 4} color={color} />;
    },
  },
  {
    value: "requests",
    label: "Requests",
    icon: (size: number = 26, color: string = "#fff") => {
      return <FaTags size={size + 4} color={color} />;
    },
  },
];
