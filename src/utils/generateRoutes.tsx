// import type { ISidebarItem } from "@/types";

import type { ComponentType } from "react";

export interface ISidebarItem{
    title:string;
    url:string
    component:ComponentType
}


export const generateRoutes = (sideBarItems: ISidebarItem[]) => {
  return sideBarItems.map((item) => ({
    path: item.url,
    Component: item.component,
  }));
};
