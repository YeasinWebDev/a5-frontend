import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <div>
          <SidebarTrigger className="h-10 w-14 bg-primary/60 m-2 rounded-sm hover:scale-105 transition-all duration-300 ease-in-out hover:bg-primary/80 cursor-pointer flex items-center justify-center" />
        </div>
        <div className="w-full p-5 lg:p-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
