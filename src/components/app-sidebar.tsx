import * as React from "react";
import { useState } from "react";

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
import { ChevronDown, ChevronRight, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const toggleGroup = (title: string) => {
    setExpandedGroup(prev => prev === title ? null : title);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token'); // O donde tengas almacenado el token
      
      const response = await fetch('https://nodejsback-production.up.railway.app/api/auth/logout', {
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

  const data = {
    versions: ["1.0.0"],
    navMain: [
      {
        title: "Gestión de Alumnos",
        url: "#",
        items: [
          {
            title: "Registro de Alumno",
            url: "/dashboard/register-student",
          },
          {
            title: "Lista de Alumnos",
            url: "/dashboard/list-student",
          },

        ],
      },
      {
        title: "Gestión de Docentes",
        url: "#",
        items: [
          {
            title: "Registro de Docente",
            url: "/dashboard/register-teacher",
          },
          {
            title: "Lista de Docentes",
            url: "/dashboard/list-teacher",
          },
        ],
      },
      {
        title: "Gestión de Cuotas",
        url: "#",
        items: [
          {
            title: "Programar cuota",
            url: "/dashboard/programar-cuotas",
          },
          {
            title: "Cuotas",
            url: "/dashboard/cuotas-detalle",
          },
         
        ],
      },
      {
        title: "Automatización con IA",
        url: "#",
        items: [
          {
            title: "Generación de Facturas con IA",
            url: "#/facturas-ia",
          },
          {
            title: "Resumen de Pagos Inteligente",
            url: "#/resumen-pagos-ia",
          },
        ],
      },
    ],
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
            <SidebarGroupLabel 
              onClick={() => toggleGroup(item.title)}
              className="cursor-pointer flex items-center justify-between"
            >
              {item.title}
              {expandedGroup === item.title ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </SidebarGroupLabel>
            {expandedGroup === item.title && (
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
            )}
          </SidebarGroup>
        ))}
        
        {/* Botón de cerrar sesión */}
        <div className="mt-auto p-4">
          <Button 
            onClick={handleLogout}
            variant="destructive" 
            className="w-full justify-start"
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
