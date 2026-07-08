import { SidebarTrigger } from "../ui/sidebar";

import { Search, Bell, } from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import TaskDialog from "../dashboard/TaskDialog";

import type { Task } from "@/types/task";

interface HeaderProps {
    addTask: (task: Task) => void;
}

export default function Header({ addTask, }: HeaderProps) {
  return (
    <header className="border-b border-sidebar-border bg-background">
      <div className=" flex flex-col gap-4 p-4 md:h-14 md:flex-row md:items-center md:justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">

          <SidebarTrigger />

          <div className="relative w-full md:w-80">

            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search tasks..."
              className="pl-10 bg-sidebar-bg text-sidebar-text"
            />

          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-3">

          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>

          <TaskDialog addTask={addTask} />

        </div>

      </div>
    </header>
  );
}