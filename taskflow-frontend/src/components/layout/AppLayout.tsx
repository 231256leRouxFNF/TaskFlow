"use client";

import * as React from "react";
import { LayoutDashboard, CheckSquare, Settings, LogOut, Bell } from "lucide-react";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter, 
  SidebarMenuButton, 
  SidebarTrigger, 
  SidebarInset 
} from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  // Simple state tracking for active menu selection
  const [activeTab, setActiveTab] = React.useState("dashboard");

  return (
    <SidebarProvider>
      {/* 1. Left Nav Sidebar Section */}
      <Sidebar>
        <SidebarHeader>
          <span className="text-sm font-bold bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent px-1">
            TaskFlow App
          </span>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarMenuButton 
            icon={LayoutDashboard} 
            label="Dashboard" 
            isActive={activeTab === "dashboard"} 
            onClick={() => setActiveTab("dashboard")} 
          />
          <SidebarMenuButton 
            icon={CheckSquare} 
            label="My Tasks" 
            isActive={activeTab === "tasks"} 
            onClick={() => setActiveTab("tasks")} 
          />
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenuButton 
            icon={Settings} 
            label="Settings" 
            isActive={activeTab === "settings"} 
            onClick={() => setActiveTab("settings")} 
          />
          <SidebarMenuButton 
            icon={LogOut} 
            label="Logout" 
            onClick={() => console.log("Logging out...")} 
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          />
        </SidebarFooter>
      </Sidebar>

      {/* 2. Main Content Display Window */}
      <SidebarInset>
        {/* Persistent Workspace Utility Header */}
        <header className="flex h-14 items-center justify-between border-b pb-3 mb-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h2 className="text-lg font-semibold tracking-tight capitalize">
              {activeTab} Workspace
            </h2>
          </div>
          
          {/* Header Action Items */}
          <div className="flex items-center gap-2">
            <button className="rounded-md p-2 hover:bg-accent text-muted-foreground transition-colors">
              <Bell className="h-4 w-4" />
            </button>
            <div className="h-7 w-7 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-xs font-semibold text-primary">
              U
            </div>
          </div>
        </header>
        
        {/* Slot rendering view markup passed from page roots */}
        <div className="flex-1 bg-muted/20 rounded-xl border border-dashed p-4 md:p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}