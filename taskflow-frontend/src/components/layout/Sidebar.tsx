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
import { LayoutDashboard, CheckSquare, Mail, User, Zap } from "lucide-react";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>

      {/* Sidebar Navigation Panel */}
      <Sidebar className="border-r border-zinc-800 bg-[#0F1117]">
        <SidebarHeader className="border-b border-zinc-800 px-5 py-5 bg-[#0E1019]">
            <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                    <Zap className="h-4 w-4 text-white"/>
                </div>

                <span className="text-lg font-semibold text-white">
                TaskFlow
                </span>
            </div>
        </SidebarHeader>
        
        <SidebarContent className="px-3 py-5 space-y-2 bg-[#0B0D15]">
          <SidebarMenuButton isActive className="bg-[#6366F1]">
            <LayoutDashboard className="h-4 w-4 " />
            <span className="text-blue-400">Dashboard</span>
          </SidebarMenuButton>
          <SidebarMenuButton>
            <CheckSquare className="h-4 w-4 text-white" />
            <span className="text-white">My Tasks</span>
          </SidebarMenuButton>
          <SidebarMenuButton>
            <CheckSquare className="h-4 w-4 text-white" />
            <span className="text-white">My Tasks</span>
          </SidebarMenuButton>
          <SidebarMenuButton>
            <CheckSquare className="h-4 w-4 text-white" />
            <span className="text-white">My Tasks</span>
          </SidebarMenuButton>
          </SidebarContent>

        <SidebarFooter>
          <SidebarMenuButton>
            <User className="h-4 w-4" />
            <span>User</span>
          </SidebarMenuButton>

          <SidebarMenuButton>
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content Area */}
    <SidebarInset>
    

        <header className="flex h-12 items-center gap-4 border-b pb-3 mb-4">
          <SidebarTrigger />
          <h2 className="text-lg font-semibold tracking-tight">
            Active Workspace
          </h2>
        </header>

        <div className="min-h-screen bg-[#090B12] p-8">
          {children}
        </div>

      </SidebarInset>

    </SidebarProvider>
  );
}