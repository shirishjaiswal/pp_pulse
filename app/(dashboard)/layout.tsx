import { AppSidebar } from "@/components/custom/app-side-bar";
import SessionValidation from "@/components/custom/session-validation";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <h1 className="text-sm font-medium">Dashboard</h1>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4">
            <SessionValidation>{children}</SessionValidation>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
