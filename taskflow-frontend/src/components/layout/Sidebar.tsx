        "use client";

        import * as React from "react";
        import { PanelLeft, ChevronRight, Menu, X } from "lucide-react";
        import { cn } from "@/lib/utils"; 

        type SidebarContextProps = {
        isOpen: boolean;
        setIsOpen: (open: boolean) => void;
        isMobile: boolean;
        };

        const SidebarContext = React.createContext<SidebarContextProps | null>(null);

        export function useSidebar() {
        const context = React.useContext(SidebarContext);
        if (!context) throw new Error("useSidebar must be used within a SidebarProvider");
        return context;
        }

        export function SidebarProvider({ children }: { children: React.ReactNode }) {
        const [isOpen, setIsOpen] = React.useState(true);
        const [isMobile, setIsMobile] = React.useState(false);

        React.useEffect(() => {
            const checkMobile = () => setIsMobile(window.innerWidth < 768);
            checkMobile();
            window.addEventListener("resize", checkMobile);
            return () => window.removeEventListener("resize", checkMobile);
        }, []);

        return (
            <SidebarContext.Provider value={{ isOpen, setIsOpen, isMobile }}>
            <div className="flex min-h-screen w-full bg-background text-foreground">{children}</div>
            </SidebarContext.Provider>
        );
        }

        export function Sidebar({
            children,
            className 
        }: { 
            children: React.ReactNode;
            className?: string 
        }) 
        {
        const { isOpen, setIsOpen, isMobile } = useSidebar();

        if (isMobile) {
            return (
            <>
                {isOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-200 md:hidden" 
                    onClick={() => setIsOpen(false)} 
                />
                )}
                <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-card p-4 shadow-xl transition-transform duration-300 md:hidden",
                    isOpen ? "translate-x-0" : "-translate-x-full",
                    className
                )}
                >
                <div className="flex justify-end mb-2">
                    <button onClick={() => setIsOpen(false)} className="rounded-md p-1.5 hover:bg-accent text-muted-foreground">
                    <X className="h-5 w-5" />
                    </button>
                </div>
                {children}
                </aside>
            </>
            );
        }

        return (
            <aside
            className={cn(
                "sticky top-0 z-30 hidden h-screen flex-col border-r bg-card p-4 transition-[width] duration-300 md:flex shrink-0",
                isOpen ? "w-64" : "w-16",
                className
            )}
            >
            {children}
            </aside>
        );
        }

        export function SidebarTrigger({ className }: { className?: string }) {
        const { isOpen, setIsOpen, isMobile } = useSidebar();
        return (
            <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
                "rounded-md p-2 border bg-popover text-popover-foreground hover:bg-accent transition-colors",
                className
            )}
            >
            {isMobile ? <Menu className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
            </button>
        );
        }

        export function SidebarContent({ children, className }: { children: React.ReactNode; className?: string }) {
        return <div className={cn("flex flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden py-2", className)}>{children}</div>;
        }

        export function SidebarHeader({ children, className }: { children: React.ReactNode; className?: string }) {
        const { isOpen, isMobile } = useSidebar();
        return (
            <div className={cn("flex h-10 items-center justify-between font-semibold tracking-tight border-b pb-2", className)}>
            {(isOpen || isMobile) ? children : <div className="w-full text-center text-xs font-bold text-primary">TF</div>}
            </div>
        );
        }

        export function SidebarFooter({ children, className }: { children: React.ReactNode; className?: string }) {
        return <div className={cn("flex flex-col gap-1 border-t pt-2 mt-auto", className)}>{children}</div>;
        }

        export function SidebarMenuButton({
        icon: Icon,
        label,
        isActive,
        onClick,
        className,
        }: {
        icon: React.ComponentType<{ className?: string }>;
        label: string;
        isActive?: boolean;
        onClick?: () => void;
        className?: string;
        }) {
        const { isOpen, isMobile } = useSidebar();
        const showText = isOpen || isMobile;

        return (
            <button
            onClick={onClick}
            title={!showText ? label : undefined}
            className={cn(
                "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all outline-none",
                "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                isActive && "bg-accent text-accent-foreground font-semibold",
                !showText && "justify-center px-0 h-9 w-9 mx-auto",
                className
            )}
            >
            <Icon className="h-4 w-4 shrink-0" />
            {showText && <span className="truncate">{label}</span>}
            </button>
        );
        }

        export function SidebarInset({ children, className }: { children: React.ReactNode; className?: string }) {
        return <main className={cn("flex w-full flex-1 flex-col overflow-x-hidden p-4 md:p-6", className)}>{children}</main>;
        }