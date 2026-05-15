import AppSidebar from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppHeader from "@/components/layout/AppHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>

  );
}