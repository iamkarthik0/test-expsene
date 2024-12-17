// import ExpensePanelLayout from "@/components/layout/expense-panel-layout";

import SidebarPanelLayout from "@/components/layout/sidebar/sidebar-panel-layout";
import { Toaster } from "sonner";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" max-w-screen-2xl mx-auto">
      <SidebarPanelLayout>
        {children}

        <Toaster />
      </SidebarPanelLayout>
    </div>
  );
}
