import * as React from "react";

import { VersionSwitcher } from "@/components/version-switcher";
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
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function AppSidebarTeacher({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();
  
  const data = {
    versions: ["1.0.0"],
    navMain: [
      {
        title: "Gestión",
        url: "#",
        items: [
          {
            title: "Registro de Asistencia",
            url: "registar-asistencia",
          },
          {
            title: "Historial de Asistencias",
            url: "ver-asistencia",
          },
          {
            title: "Justificaciones",
            url: "justificaciones",
          },
        ],
      },
    ],
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token'); // O donde tengas almacenado el token
      
      const response = await fetch('https://nodejsback-7gv3.onrender.com/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Limpiar el token del localStorage
        localStorage.removeItem('token');
        // Redirigir al login
        navigate('/login');
      } else {
        console.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subItem) => (
                  <SidebarMenuItem key={subItem.title}>
                    <SidebarMenuButton asChild>
                      <Link to={subItem.url}>{subItem.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        
        {/* Botón de cerrar sesión */}
        <div className="mt-auto p-4">
          <Button 
            onClick={handleLogout}
            variant="destructive" 
            className="w-full justify-start bg-purple-600 text-white hover:bg-purple-700"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
