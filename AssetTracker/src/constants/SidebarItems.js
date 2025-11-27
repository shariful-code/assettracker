// src/constants/SidebarItems.js
import { IconBuildingStore, IconUser } from "@tabler/icons-react";
import * as urls from "./AppUrls";

const SidebarItems = [
    {
    label: "Dashboard",
    icon: IconBuildingStore,
    link: urls.DASHBOARD, // /assets
  },
   {
    label: "User",
    icon: IconUser,
    link: urls.USER, // /employee
  },
  {
    label: "Assets",
    icon: IconBuildingStore,
    link: urls.ASSETS, // /assets
  },
  {
    label: "Employee",
    icon: IconUser,
    link: urls.EMPLOYEE, // /employee
  },
];

export default SidebarItems;
