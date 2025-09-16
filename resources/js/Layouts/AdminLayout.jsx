import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import FlashToast from "@/Components/FlashToast";

export default function AdminLayout({ children, siteHeader }) {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <SidebarProvider>
                <Toaster position="top-center" />
                <AppSidebar />
                <main className="w-full h-full">
                    {siteHeader ?? <SiteHeader />}
                    <div className="p-4 min-h-screen">
                        <FlashToast />
                        {children}
                    </div>
                </main>
            </SidebarProvider>
        </ThemeProvider>
    );
}
