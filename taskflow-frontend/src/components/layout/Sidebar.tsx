import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
} from "../ui/Sidebar";

export function Sidebar() {
  return (
    <ShadcnSidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-xl font-bold">
          TaskFlow
        </h2>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <p>Dashboard</p>
        <p>Tasks</p>
        <p>Settings</p>
      </SidebarContent>
    </ShadcnSidebar>
  );
}