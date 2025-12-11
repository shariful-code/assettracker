// src/constants/SidebarItems.js
import { IconBuildingStore, IconUser ,IconCategory,IconBrandAngularFilled,IconBusinessplan, IconUserCircle} from "@tabler/icons-react";
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
    label: "Employee",
    icon: IconUserCircle,
    link: urls.EMPLOYEE, 
  },
  {
    label: "Assets",
    icon: IconBuildingStore,
    link: urls.ASSETS, // /assets
  },
  {
    label: "Department",
    icon: IconUser,
    link: urls.DEPARTMENT, 
  },
  {
    label: "Category",
    icon: IconCategory,
    link: urls.CATEGORIES,
  },
   {
    label: "Brand",
    icon: IconBrandAngularFilled,
    link: urls.BRAND, 
  },
  {
    label: "Vendor",
    icon: IconBusinessplan,
    link: urls.VENDOR, 
  },
   
  
];

export default SidebarItems;
