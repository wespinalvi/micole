import React, { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Card, CardContent } from "@/components/ui/card";
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
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Save, X, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Student {
  id_alumno: number;
  id_matricula: number;
  dni: string;
  nombre_completo: string;
}

interface AlumnoAsistencia extends Student {
  asistio: boolean;
  observacion: string;
}

interface Asignacion {
  id_asignacion: number;
  id_curso: number;
  curso: string;
  id_grado: number;
  grado: string;
  anio: number;
  alumnos: Student[];
}

export default function RegistrarAsistencia() {
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);
  const [asignacionSeleccionada, setAsignacionSeleccionada] = useState<string>("");
  const [anioSeleccionado, setAnioSeleccionado] = useState<string>(new Date().getFullYear().toString());
  const [alumnos, setAlumnos] = useState<AlumnoAsistencia[]>([]);
  const [mensaje, setMensaje] = useState<{ text: string; isError: boolean } | null>(null);
  const [loading, setLoading] = useState(false);

  const fechaActual = format(new Date(), "EEEE d 'de' MMMM 'de' yyyy", { locale: es });

  useEffect(() => {
    const fetchAsignaciones = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/docente/mis-asignaciones-alumnos/${anioSeleccionado}`);
        if (data.success) {
          setAsignaciones(data.data || []);
        } else {
          setAsignaciones([]);
        }
      } catch (error) {
        console.error("Error fetching asignaciones:", error);
        setAsignaciones([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAsignaciones();
  }, [anioSeleccionado]);

  useEffect(() => {
    if (!asignacionSeleccionada) {
      setAlumnos([]);
      return;
    }

    const selected = asignaciones.find(a => a.id_asignacion.toString() === asignacionSeleccionada);
    if (selected) {
      setAlumnos(
        selected.alumnos.map(al => ({
          ...al,
          asistio: true,
          observacion: ""
        }))
      );
      setMensaje(null);
    } else {
      setAlumnos([]);
    }
  }, [asignacionSeleccionada, asignaciones]);

  const handleAsistenciaChange = (id: number, checked: boolean) => {
    setAlumnos(alumnos.map(a => a.id_alumno === id ? { ...a, asistio: checked } : a));
  };

  const handleObservacionChange = (id: number, observacion: string) => {
    setAlumnos(alumnos.map(a => a.id_alumno === id ? { ...a, observacion } : a));
  };

  const handleGuardarAsistencia = async () => {
    if (!asignacionSeleccionada) return;
    setLoading(true);
    setMensaje(null);
    try {
      const fechaHoy = format(new Date(), "yyyy-MM-dd");
      const horaActual = format(new Date(), "HH:mm:ss");

      const payload = {
        asistencias: alumnos.map((alumno) => ({
          id_matricula: alumno.id_matricula,
          id_asignacion: parseInt(asignacionSeleccionada),
          fecha: fechaHoy,
          estado: alumno.asistio ? "Presente" : "Ausente",
          hora_llegada: alumno.asistio ? horaActual : null,
          observaciones: alumno.observacion,
        })),
      };

      const { data } = await api.post("/docente/registrar-asistencia-masiva", payload);

      if (data.success) {
        setMensaje({ text: data.message || "¡Asistencia registrada con éxito!", isError: false });
      } else {
        setMensaje({ text: data.message || "Error al registrar la asistencia.", isError: true });
      }
    } catch (error: any) {
      const responseData = error.response?.data;
      const errorMessage = responseData?.message || "Error al servidor al intentar guardar.";

      if (error.response?.status === 400) {
        setMensaje({ text: errorMessage, isError: true });
      } else {
        console.error("Error inesperado al registrar asistencia:", error);
        setMensaje({ text: errorMessage, isError: true });
      }
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: alumnos.length,
    presentes: alumnos.filter(a => a.asistio).length,
    faltas: alumnos.filter(a => !a.asistio).length
  };

  const gradosDisponibles = Array.from(
    new Map(asignaciones.map(a => [a.id_grado, a.grado])).entries()
  ).map(([id, nombre]) => ({ id, nombre }));

  const [gradoSeleccionado, setGradoSeleccionado] = useState<string>("");

  const asignacionesFiltradas = gradoSeleccionado
    ? asignaciones.filter(a => a.id_grado.toString() === gradoSeleccionado)
    : asignaciones;

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-4 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">Registro de Asistencia</h1>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Calendar className="h-4 w-4" />
            <span className="capitalize">{fechaActual}</span>
          </div>
        </div>

        {alumnos.length > 0 && (
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 rounded-lg">
            <div className="px-3 py-1.5 bg-white rounded border border-slate-100 flex flex-col items-center min-w-[60px]">
              <span className="text-[9px] font-medium text-slate-500 uppercase">Total</span>
              <span className="text-base font-semibold text-slate-700">{stats.total}</span>
            </div>
            <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 flex flex-col items-center rounded min-w-[60px]">
              <span className="text-[9px] font-medium text-emerald-600 uppercase">Pres.</span>
              <span className="text-base font-semibold text-emerald-700">{stats.presentes}</span>
            </div>
            <div className="px-3 py-1.5 bg-rose-50 border border-rose-200 flex flex-col items-center rounded min-w-[60px]">
              <span className="text-[9px] font-medium text-rose-600 uppercase">Fal.</span>
              <span className="text-base font-semibold text-rose-700">{stats.faltas}</span>
            </div>
          </div>
        )}
      </div>

      <Card className="border border-slate-200 shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600">Año Académico</label>
              <Select value={anioSeleccionado} onValueChange={setAnioSeleccionado}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Año" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600">Grado</label>
              <Select value={gradoSeleccionado} onValueChange={(val) => {
                setGradoSeleccionado(val);
                setAsignacionSeleccionada("");
              }}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Seleccionar grado" />
                </SelectTrigger>
                <SelectContent>
                  {gradosDisponibles.map(g => (
                    <SelectItem key={g.id} value={g.id.toString()}>{g.nombre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600">Asignatura</label>
              <Select value={asignacionSeleccionada} onValueChange={setAsignacionSeleccionada}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Seleccionar curso" />
                </SelectTrigger>
                <SelectContent>
                  {asignacionesFiltradas.map(a => (
                    <SelectItem key={a.id_asignacion} value={a.id_asignacion.toString()}>
                      {a.curso}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {mensaje && (
            <div className={`p-3 rounded-lg mb-4 flex items-center justify-between border ${mensaje.isError ? "bg-red-50 text-red-700 border-red-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
              <div className="flex items-center gap-2">
                {mensaje.isError ? <X className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                <span className="font-medium text-sm">{mensaje.text}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setMensaje(null)} className="h-6 w-6 p-0">
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}

          <div className="rounded-lg border border-slate-200 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="h-10 px-4 font-medium text-xs text-slate-600">Estudiante</TableHead>
                  <TableHead className="h-10 px-2 font-medium text-xs text-slate-600">Observación</TableHead>
                  <TableHead className="h-10 px-4 font-medium text-xs text-slate-600 text-right">Asistencia</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alumnos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-12">
                      <Users className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                      <p className="text-slate-400 font-medium text-sm">Seleccione un curso para ver los estudiantes</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  alumnos.map((alumno: AlumnoAsistencia) => (
                    <TableRow key={alumno.id_alumno} className="hover:bg-slate-50">
                      <TableCell className="py-2 px-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-700 text-sm">{alumno.nombre_completo}</span>
                          <span className="text-xs text-slate-400">DNI: {alumno.dni}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-2 px-2">
                        <Input
                          placeholder="Agregar nota..."
                          value={alumno.observacion}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleObservacionChange(alumno.id_alumno, e.target.value)}
                          className="h-8 text-xs border-slate-200"
                        />
                      </TableCell>
                      <TableCell className="py-2 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Badge
                            variant="secondary"
                            className={`px-2 py-0.5 text-xs font-medium ${alumno.asistio
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-rose-100 text-rose-700"
                              }`}
                          >
                            {alumno.asistio ? "Presente" : "Falta"}
                          </Badge>
                          <Checkbox
                            className={`h-4 w-4 ${alumno.asistio
                              ? "border-emerald-500 data-[state=checked]:bg-emerald-500"
                              : "border-slate-300"
                              }`}
                            checked={alumno.asistio}
                            onCheckedChange={(checked) => handleAsistenciaChange(alumno.id_alumno, checked as boolean)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {alumnos.length > 0 && (
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
              <span className="text-xs text-slate-400 italic">
                Verifique los datos antes de guardar
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="h-9 px-4 text-xs font-medium"
                  onClick={() => setAlumnos(alumnos.map(al => ({ ...al, asistio: true })))}
                >
                  Marcar todos
                </Button>
                <Button
                  onClick={handleGuardarAsistencia}
                  disabled={!asignacionSeleccionada || loading}
                  className="h-9 px-6 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium flex gap-2"
                >
                  {loading ? (
                    <div className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="h-3.5 w-3.5" />
                  )}
                  <span>Registrar Asistencia</span>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
