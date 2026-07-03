import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter, 
  SidebarMenuButton, 
  SidebarTrigger, 
  SidebarInset 
} from "../ui/sidebar";
import { LayoutDashboard, CheckSquare, Settings, LogOut } from "lucide-react";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* Sidebar Navigation Panel */}
      <Sidebar className="border-r border-zinc-800 bg-[#0F1117]">
        <SidebarHeader className="border-b border-zinc-800 px-5 py-5">
            <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                ⚡
                </div>

                <span className="text-lg font-semibold text-white">
                TaskFlow
                </span>
            </div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarMenuButton icon={LayoutDashboard} label="Dashboard" isActive={true} />
          <SidebarMenuButton icon={CheckSquare} label="My Tasks" />
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenuButton icon={Settings} label="Settings" />
          <SidebarMenuButton icon={LogOut} label="Logout" />
        </SidebarFooter>
      </Sidebar>

      {/* Primary Body Content Interface */}
      <SidebarInset>
        <header className="flex h-12 items-center gap-4 border-b pb-3 mb-4">
          <SidebarTrigger />
          <h2 className="text-lg font-semibold tracking-tight">Active Workspace</h2>
        </header>
        
        <div className="flex-1 bg-muted/30 rounded-xl border border-dashed p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}