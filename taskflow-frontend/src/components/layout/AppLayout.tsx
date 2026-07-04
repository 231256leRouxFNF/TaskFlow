import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter, 
  SidebarMenuButton, 
  SidebarInset 
} from "../ui/sidebar";
import { LayoutDashboard, CheckSquare, Mail, User, Zap } from "lucide-react";
import Header from "./Header";
import DashboardHeader from "./DashboardHeader";

const projects = [
  { name: "Core API", color: "bg-indigo-500", count: 6 },
  { name: "Auth Service", color: "bg-rose-500", count: 2 },
  { name: "Frontend", color: "bg-amber-400", count: 2 },
  { name: "DevOps", color: "bg-emerald-500", count: 2 },
];

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
          {/* Sidebar Navigation Panel */}
          <Sidebar className="border-r border-zinc-800 py-">
            <SidebarHeader className="border-b border-zinc-800 px-5 py-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                        <Zap className="h-4 w-4 text-white"/>
                    </div>

                    <span className="text-lg font-semibold ">
                    TaskFlow
                    </span>
                </div>
            </SidebarHeader>
            
            <SidebarContent className="px-3 py-5 space-y-2">
                <SidebarMenuButton isActive>
                  <LayoutDashboard className="h-4 w-4 " />
                  <span >Dashboard</span>
                </SidebarMenuButton>
                <SidebarMenuButton>
                  <CheckSquare className="h-4 w-4 text-white" />
                  <span >Tasks</span>
                </SidebarMenuButton>
                <SidebarMenuButton>
                  <CheckSquare className="h-4 w-4 text-white" />
                  <span >API Explorer</span>
                </SidebarMenuButton>
                <SidebarMenuButton>
                  <CheckSquare className="h-4 w-4 text-white" />
                  <span >Settings</span>
                </SidebarMenuButton>

                <div className="mt-8">
                    <h3 className="mb-4 px-3 text-xs font-semibold tracking-[0.25em] text-zinc-500">
                      PROJECTS
                    </h3>

                    <div className="space-y-1">
                      {projects.map((project) => (
                        <button
                          key={project.name}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-zinc-800 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`h-3 w-3 rounded-full ${project.color}`} />
                            <span className="text-zinc-400">
                              {project.name}
                            </span>
                          </div>

                          <span className="text-sm text-zinc-600">
                            {project.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
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

                <Header />

                <main className="flex-1 p-8">

                    <DashboardHeader />

                    <div className="mt-8">
                        {children}
                    </div>

                </main>

            </SidebarInset>

    </SidebarProvider>
  );
}