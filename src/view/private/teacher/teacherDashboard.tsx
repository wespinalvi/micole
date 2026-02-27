import { AppSidebarTeacher } from "@/components/app-sidebar-teacher";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import {
  Bell,
  Settings,
  ChevronRight
} from 'lucide-react';

export default function TeacherDashboard() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const activeTab = pathnames[pathnames.length - 1] || "dashboard";

  return (
    <SidebarProvider>
      <AppSidebarTeacher />
      <SidebarInset className="bg-slate-50/50">
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 sticky top-0 z-10 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-slate-400 hover:text-slate-600 transition-colors" />
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-l border-slate-100 pl-4">
              <span className="text-indigo-600">Portal Docente</span>
              <ChevronRight size={10} className="text-slate-300" />
              <span className="text-slate-600">{activeTab.replace('-', ' ')}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-slate-400 border-r border-slate-100 pr-4">
              <Bell size={16} className="hover:text-indigo-600 cursor-pointer transition-colors" />
              <Settings size={16} className="hover:text-indigo-600 cursor-pointer transition-colors" />
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-800 leading-none">Prof. Martínez</p>
                <p className="text-[9px] font-bold text-amber-600 uppercase tracking-tight mt-0.5">Nivel Secundario</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-xs shadow-sm">
                PM
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
