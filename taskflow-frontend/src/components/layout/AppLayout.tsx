import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarMenuButton,
} from "./Sidebar";

import {
  LayoutDashboard,
  CheckSquare,
  Settings,
  User,
} from "lucide-react";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <h1 className="text-lg font-bold">TaskFlow</h1>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenuButton
            icon={LayoutDashboard}
            label="Dashboard"
            isActive
          />

          <SidebarMenuButton
            icon={CheckSquare}
            label="Tasks"
          />

          <SidebarMenuButton
            icon={Settings}
            label="Settings"
          />
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenuButton
            icon={User}
            label="Francois"
          />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}