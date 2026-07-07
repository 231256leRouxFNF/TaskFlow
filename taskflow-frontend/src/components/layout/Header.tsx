import { SidebarTrigger } from "../ui/sidebar";

import { Search, Bell, Plus } from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import TaskDialog from "../dashboard/TaskDialog";

export default function Header() {
  return (
    <header className="border-b border-sidebar-border bg-background">
      <div className="flex h-14 items-center justify-between px-6">

        {/* Left */}
        <div className="flex items-center gap-4">

          <SidebarTrigger />

          <div className="relative w-80">

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

          <TaskDialog />

        </div>

      </div>
    </header>
  );
}