import React, { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useAuth } from "@/context/AuthContext";

interface Alumno {
  id: number;
  nombre: string;
  asistio: boolean;
  observacion: string;
}

// Tipos para la respuesta de la API
interface AlumnoAPI {
  alumno_id: number;
  alumno_dni: string;
  alumno_nombre: string;
  alumno_apellido_paterno: string;
  alumno_apellido_materno: string;
  fecha_nacimiento: string;
  grado: string;
  fecha_matricula: string;
}
interface GradoAPI {
  grado: string;
  id_grado: string;
  alumnos: AlumnoAPI[];
}
interface ApiResponse {
  success: boolean;
  data: GradoAPI[];
  anio: string;
}

interface CursoDocente {
  id_docente_curso: number;
  id_curso: number;
  curso: string;
  id_grado: number;
  grado: string;
}

export default function RegistrarAsistencia() {
  const { token, roleId } = useAuth();
  const [cursoSeleccionado, setCursoSeleccionado] = useState<string>("");
  const [gradoSeleccionado, setGradoSeleccionado] = useState<string>("");
  const [anioSeleccionado, setAnioSeleccionado] = useState<string>(new Date().getFullYear().toString());
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [mensaje, setMensaje] = useState<string>("");
  const [cursos, setCursos] = useState<CursoDocente[]>([]);
  const fechaActual = format(new Date(), "EEEE d 'de' MMMM 'de' yyyy", {
    locale: es,
  });

  // Obtener cursos del docente al cargar o cambiar año
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const { data } = await api.get(`/docente/mis-cursos/${anioSeleccionado}`);
        if (data.success) {
          setCursos(data.cursos);
        } else {
          setCursos([]);
        }
      } catch {
        setCursos([]);
      }
    };
    fetchCursos();
  }, [anioSeleccionado]);

  // Grados únicos de los cursos del docente
  const gradosDisponibles = Array.from(
    new Map(cursos.map(c => [c.id_grado, c.grado])).entries()
  ).map(([id, nombre]) => ({ id, nombre }));

  // Cursos filtrados por grado seleccionado
  const cursosFiltrados = gradoSeleccionado
    ? cursos.filter(c => c.id_grado.toString() === gradoSeleccionado)
    : cursos;

  // Fetch alumnos cuando cambian año o grado
  useEffect(() => {
    if (!anioSeleccionado || !gradoSeleccionado) {
      setAlumnos([]);
      setMensaje("");
      return;
    }
    setMensaje("");
    api
      .get<ApiResponse>(`/docente/alumnos-matriculados/${anioSeleccionado}?id_grado=${gradoSeleccionado}`)
      .then(res => {
        const data = res.data;
        if (data.success && data.data.length > 0 && data.data[0].alumnos.length > 0) {
          setAlumnos(
            data.data[0].alumnos.map((a) => ({
              id: a.alumno_id,
              nombre: `${a.alumno_nombre} ${a.alumno_apellido_paterno} ${a.alumno_apellido_materno}`,
              asistio: false,
              observacion: ""
            }))
          );
          setMensaje("");
        } else {
          setAlumnos([]);
          setMensaje("No tienes alumnos asignados para este año y grado.");
        }
      })
      .catch(() => {
        setAlumnos([]);
        setMensaje("Error al cargar los alumnos.");
      });
  }, [anioSeleccionado, gradoSeleccionado]);

  // Función para manejar cambios en la asistencia
  const handleAsistenciaChange = (id: number, checked: boolean) => {
    setAlumnos(
      alumnos.map((alumno) =>
        alumno.id === id ? { ...alumno, asistio: checked } : alumno
      )
    );
  };

  // Función para manejar cambios en observaciones
  const handleObservacionChange = (id: number, observacion: string) => {
    setAlumnos(
      alumnos.map((alumno) =>
        alumno.id === id ? { ...alumno, observacion } : alumno
      )
    );
  };

  // Función para guardar asistencia
  const handleGuardarAsistencia = async () => {
    try {
      // Verificar token
      console.log("Token actual:", token ? "Presente" : "Ausente");
      console.log("RoleId:", roleId);
      
      if (!token) {
        setMensaje("Error: No hay token de autenticación. Por favor, inicie sesión nuevamente.");
        return;
      }

      // Verificar que se haya seleccionado un curso
      if (!cursoSeleccionado) {
        setMensaje("Error: Debe seleccionar un curso antes de registrar la asistencia.");
        return;
      }

      for (const alumno of alumnos) {
        // Restar un día a la fecha actual
        const fechaHoy = new Date();
        const fechaAEnviar = fechaHoy.toISOString().slice(0, 10);
        await api.post("/docente/registrar-asistencia", {
          id_alumno: alumno.id,
          id_docente_curso: parseInt(cursoSeleccionado),
          docente_id: roleId, // Agregar el ID del docente logueado
          fecha: fechaAEnviar,
          asistio: alumno.asistio,
          observacion: alumno.observacion,
        });
      }
      setMensaje("¡Asistencia registrada correctamente!");
    } catch (error: unknown) {
      console.error("Error completo:", error);
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { status: number; data: { message?: string } } };
        console.error("Respuesta del servidor:", axiosError.response?.data);
        
        if (axiosError.response?.status === 403) {
          setMensaje("Error 403: No tiene permisos para registrar asistencia. Verifique su autenticación.");
        } else if (axiosError.response?.status === 401) {
          setMensaje("Error 401: Token inválido. Por favor, inicie sesión nuevamente.");
        } else {
          setMensaje(`Error al registrar la asistencia: ${axiosError.response?.data?.message || 'Error desconocido'}`);
        }
      } else {
        setMensaje("Error al registrar la asistencia: Error desconocido");
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Registro de Asistencia</CardTitle>
          <p className="text-sm text-gray-500">{fechaActual}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Año</label>
              <Select
                value={anioSeleccionado}
                onValueChange={setAnioSeleccionado}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un año" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={new Date().getFullYear().toString()}>{new Date().getFullYear()}</SelectItem>
                  <SelectItem value={(new Date().getFullYear() + 1).toString()}>{new Date().getFullYear() + 1}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Grado</label>
              <Select
                value={gradoSeleccionado}
                onValueChange={setGradoSeleccionado}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un grado" />
                </SelectTrigger>
                <SelectContent>
                  {gradosDisponibles.map((g) => (
                    <SelectItem key={g.id} value={g.id.toString()}>
                      {g.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Curso</label>
              <Select
                value={cursoSeleccionado}
                onValueChange={setCursoSeleccionado}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un curso" />
                </SelectTrigger>
                <SelectContent>
                  {cursosFiltrados.map((c) => (
                    <SelectItem key={c.id_docente_curso} value={c.id_docente_curso.toString()}>
                      {c.curso}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
           
          </div>

          {mensaje && (
            <div className={`mb-4 p-3 rounded ${
              mensaje.includes("¡Asistencia registrada correctamente!") 
                ? "bg-green-100 text-green-800 border border-green-300" 
                : "bg-red-100 text-red-800 border border-red-300"
            }`}>
              {mensaje}
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alumno</TableHead>
                <TableHead className="w-[100px]">Asistencia</TableHead>
                <TableHead>Observación</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alumnos.map((alumno) => (
                <TableRow key={alumno.id}>
                  <TableCell>{alumno.nombre}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={alumno.asistio}
                      onCheckedChange={(checked) =>
                        handleAsistenciaChange(alumno.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Textarea
                      placeholder="Observación..."
                      value={alumno.observacion}
                      onChange={(e) =>
                        handleObservacionChange(alumno.id, e.target.value)
                      }
                      className="h-20"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-end mt-6 space-x-4">
            <Button variant="outline" className="bg-gray-200 text-gray-700 hover:bg-gray-300 border-gray-300">Cancelar</Button>
            <Button 
              onClick={handleGuardarAsistencia}
              disabled={!cursoSeleccionado || alumnos.length === 0}
              className="bg-purple-600 text-white hover:bg-purple-700"
            >
              Guardar Asistencia
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
