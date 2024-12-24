import {
  FaHeart,
  FaHome,
  FaSearch,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { IoCreate } from "react-icons/io5";

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
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/members.svg" },
  { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];