import * as React from "react";
import { Sidebar, SidebarContent, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";
import { useMeQuery } from "@/redux/feature/authApi";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { Link, useLocation } from "react-router";
import Logo from "@/assets/images/logo.png";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: user } = useMeQuery({});
  const location = useLocation();
  const data = {
    navMain: getSidebarItems(user?.data?.user?.role),
  };

  return (
    <Sidebar {...props} className="overflow-hidden">
      <SidebarHeader>
        <Link to="/" className="flex items-center py-2 pl-3 border-b transition-all duration-300 ease-in-out">
          <img src={Logo} alt="logo" className="w-9 h-9 mr-10" />
          <span className="text-lg font-bold text-primary/80 -ml-8">SafePay</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {data?.navMain?.map((item, index) => {
          const isActive = location.pathname === item.url;
          return (
            <SidebarGroupContent key={index} className="ml-2 w-[10rem]">
              <SidebarMenu>
                <SidebarMenuButton asChild isActive={isActive} className="text-[1rem]">
                  <Link to={item.url}> {item.title}</Link>
                </SidebarMenuButton>
              </SidebarMenu>
            </SidebarGroupContent>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
