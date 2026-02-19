import { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

interface Asistencia {
  id: number;
  id_matricula: number;
  id_asignacion: number;
  fecha: string;
  estado: string;
  hora_llegada: string | null;
  observaciones: string | null;
  dni: string;
  nombre: string;
  ap_p: string;
  ap_m: string;
}

interface Asignacion {
  id_asignacion: number;
  id_curso: number;
  curso: string;
  id_grado: number;
  grado: string;
  anio: number;
}

export default function HistorialAsistencia() {
  const [fecha, setFecha] = useState(format(new Date(), "yyyy-MM-dd"));
  const [grado, setGrado] = useState<string>("");
  const [curso, setCurso] = useState<string>("");
  const [asistencias, setAsistencias] = useState<Asistencia[]>([]);
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ANIO_ACTUAL = "2026";

  const getInitials = (nombre: string, ap_p: string) => {
    return `${nombre[0]}${ap_p[0]}`.toUpperCase();
  };

  useEffect(() => {
    const fetchAsignaciones = async () => {
      try {
        const { data } = await api.get(`/docente/mis-asignaciones-alumnos/${ANIO_ACTUAL}`);
        if (data.success) setAsignaciones(data.data || []);
        else setAsignaciones([]);
      } catch { setAsignaciones([]); }
    };
    fetchAsignaciones();
  }, []);

  const gradosDisponibles = Array.from(
    new Map((asignaciones || []).map(a => [a.id_grado, a.grado])).entries()
  ).map(([id, nombre]) => ({ id, nombre }));

  const asignacionesFiltradas = grado ? (asignaciones || []).filter(a => a.id_grado.toString() === grado) : (asignaciones || []);

  const handleBuscar = async () => {
    setError("");
    setLoading(true);
    try {
      const params: Record<string, string> = {};
      if (fecha) params.fecha = fecha;
      if (grado) params.id_grado = grado;
      if (curso) params.id_curso = curso;
      const { data } = await api.get("/docente/listar-asistencias", { params });
      if (data.success) {
        setAsistencias(data.data);
        if (data.data.length === 0) setError("No se encontraron registros para estos filtros.");
      } else {
        setAsistencias([]);
        setError(data.message || "No se encontraron registros.");
      }
    } catch {
      setError("Error al conectar con el servidor.");
      setAsistencias([]);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: asistencias.length,
    presentes: asistencias.filter(a => a.estado === "Presente").length,
    faltas: asistencias.filter(a => a.estado === "Ausente").length
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-4 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">Historial de Asistencia</h1>
          <p className="text-slate-500 text-sm">Consulta los registros de asistencia por fecha y curso</p>
        </div>

        {asistencias.length > 0 && (
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
              <span className="text-[9px] font-medium text-rose-600 uppercase">Aus.</span>
              <span className="text-base font-semibold text-rose-700">{stats.faltas}</span>
            </div>
          </div>
        )}
      </div>

      <Card className="border border-slate-200 shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600">Fecha</label>
              <Input
                type="date"
                value={fecha}
                onChange={e => setFecha(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600">Grado</label>
              <Select value={grado} onValueChange={setGrado}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Seleccionar grado" />
                </SelectTrigger>
                <SelectContent>
                  {gradosDisponibles.map(g => (
                    <SelectItem key={g.id as number} value={(g.id as number).toString()}>{g.nombre as string}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600">Asignatura</label>
              <Select value={curso} onValueChange={setCurso}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Seleccionar curso" />
                </SelectTrigger>
                <SelectContent>
                  {asignacionesFiltradas.map(a => (
                    <SelectItem key={a.id_asignacion} value={a.id_curso.toString()}>{a.curso}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleBuscar}
                disabled={loading}
                className="w-full h-9 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium"
              >
                {loading ? (
                  <div className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                ) : (
                  <Search className="h-3.5 w-3.5 mr-2" />
                )}
                {loading ? "Buscando" : "Consultar"}
              </Button>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="h-10 font-medium text-xs text-slate-600">Estudiante</TableHead>
                  <TableHead className="h-10 font-medium text-xs text-slate-600 text-center">Estado</TableHead>
                  <TableHead className="h-10 font-medium text-xs text-slate-600 text-center">Hora</TableHead>
                  <TableHead className="h-10 font-medium text-xs text-slate-600">Observaciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {asistencias.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-16">
                      <FileText className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                      <p className="text-slate-400 font-medium text-sm">
                        {error || "Especifique los filtros para mostrar resultados"}
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  asistencias.map(a => (
                    <TableRow key={a.id} className="hover:bg-slate-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-600">
                            {getInitials(a.nombre, a.ap_p)}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-slate-700 text-sm">{`${a.nombre} ${a.ap_p} ${a.ap_m}`}</span>
                            <span className="text-xs text-slate-400">DNI: {a.dni}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={`px-2 py-0.5 text-xs font-medium ${a.estado === "Presente"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                            }`}
                        >
                          {a.estado}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-xs font-medium text-slate-600">
                          {a.hora_llegada || "--:--:--"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <p className="text-slate-500 text-xs truncate max-w-[200px]">
                          {a.observaciones || "Sin observaciones"}
                        </p>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {asistencias.length > 0 && (
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-xs text-slate-400 italic">
                Reporte generado el {format(new Date(), "dd/MM/yyyy HH:mm")}
              </span>

              <Button
                variant="outline"
                className="w-full sm:w-auto h-9 px-4 text-xs font-medium"
              >
                <Download className="h-3.5 w-3.5 mr-2" /> Exportar Reporte
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
