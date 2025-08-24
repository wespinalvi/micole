import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Download } from "lucide-react";

interface Curso {
  curso: string;
  grado: string;
}

interface Docente {
  docente_id: number;
  dni: string;
  nombre_completo: string;
  fecha_registro: string;
  cursos: Curso[];
}

interface ApiResponse {
  success: boolean;
  data: Docente[];
  anio: string;
}

export default function ListTeacher() {
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [loading, setLoading] = useState(true);
  const [anioSeleccionado, setAnioSeleccionado] = useState("2025");

  useEffect(() => {
    const fetchDocentes = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get<ApiResponse>(
          `https://nodejsback-production.up.railway.app/api/docente/lista-docentes/${anioSeleccionado}`
        );
        if (data.success) {
          setDocentes(data.data);
        }
      } catch (error) {
        console.error("Error al cargar los docentes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocentes();
  }, [anioSeleccionado]);

  const handleEliminar = (dni: string) => {
    const confirm = window.confirm("¿Deseas eliminar este docente?");
    if (confirm) {
      setDocentes((prev) => prev.filter((d) => d.dni !== dni));
    }
  };

  const anios = ["2024", "2025", "2026"]; // Puedes ajustar los años según necesites

  const handleExportar = async () => {
    try {
      const response = await axios.get(
        `https://nodejsback-production.up.railway.app/api/docente/exportar/${anioSeleccionado}`,
        {
          responseType: 'blob',
          params: {
            orden: 'desc'
          }
        }
      );
      
      // Crear un enlace temporal para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `docentes_${anioSeleccionado}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error al exportar los datos:", error);
      alert("Error al exportar los datos");
    }
  };

  if (loading) {
    return <div className="text-center p-6">Cargando docentes...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Lista de Docentes</h2>
        <div className="flex items-center gap-4">
          <Button 
            onClick={handleExportar}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Exportar Excel
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Año:</span>
            <Select value={anioSeleccionado} onValueChange={setAnioSeleccionado}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Selecciona año" />
              </SelectTrigger>
              <SelectContent>
                {anios.map((anio) => (
                  <SelectItem key={anio} value={anio}>
                    {anio}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-md">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="px-4 py-2">DNI</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Fecha de Registro</th>
              <th className="px-4 py-2">Cursos</th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {docentes.map((docente) => (
              <tr
                key={docente.docente_id}
                className="border-t hover:bg-muted/50"
              >
                <td className="px-4 py-2">{docente.dni}</td>
                <td className="px-4 py-2">{docente.nombre_completo}</td>
                <td className="px-4 py-2">
                  {new Date(docente.fecha_registro).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 space-x-1">
                  {docente.cursos.map((curso) => (
                    <Badge
                      key={`${curso.curso}-${curso.grado}`}
                      variant="secondary"
                    >
                      {curso.curso} ({curso.grado})
                    </Badge>
                  ))}
                </td>
                <td className="px-4 py-2 text-center space-x-2">
                  <Button size="sm" variant="outline">
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleEliminar(docente.dni)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
            {docentes.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-muted-foreground"
                >
                  No hay docentes registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
