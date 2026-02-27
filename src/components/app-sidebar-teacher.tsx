import * as React from "react";
import {
  History,
  FileText,
  TrendingUp,
  ShieldCheck,
  LogOut,
  UserCheck
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function AppSidebarTeacher({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'registro', label: 'Registro Asistencia', icon: UserCheck, url: 'registrar-asistencia' },
    { id: 'historial', label: 'Historial General', icon: History, url: 'ver-asistencia' },
    { id: 'reporte', label: 'Reporte Diario', icon: FileText, url: 'reporte-clases' },
    { id: 'ingresos', label: 'Seguimiento Marcajes', icon: TrendingUp, url: 'seguimiento-ingresos' },
    { id: 'justificaciones', label: 'Justificaciones', icon: ShieldCheck, url: 'justificaciones' },
  ];

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (error) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <Sidebar className="border-r border-slate-200" {...props}>
      <SidebarHeader className="p-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center text-white font-black text-base italic shadow-md shrink-0">
            C
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold tracking-tight text-slate-800 leading-none uppercase">Crayons</h1>
            <p className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest mt-0.5">Academic System</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-3 mt-2">
            Panel de Control
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname.includes(item.url);
                return (
                  <SidebarMenuItem key={item.id} className="mb-0.5">
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-bold text-xs ${isActive
                          ? 'bg-slate-800 text-white shadow-sm'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                      >
                        <item.icon size={16} />
                        <span className="tracking-tight">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto px-1 py-4 border-t border-slate-100">
          <Button
            onClick={handleLogout}
            className="w-full bg-rose-50 text-rose-600 px-3 py-2 rounded-lg flex items-center gap-3 font-bold text-xs hover:bg-rose-600 hover:text-white transition-all border-none shadow-none"
          >
            <LogOut size={16} />
            <span>Cerrar Sesión</span>
          </Button>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
