import type { ReactNode } from "react";

import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";

import { Sidebar } from "./Sidebar";

type Props = {
  children: ReactNode;
};

export function AppLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <Sidebar />

      <SidebarInset>
        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}