import { useState, useEffect, useCallback } from "react";
import api from "@/lib/axios";
import {
  FileText,
  Download,
  Search,
  Calendar,
  ChevronDown,
  Clock
} from "lucide-react";
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

  useEffect(() => {
    const fetchAsignaciones = async () => {
      try {
        const { data } = await api.get(`/docente/mis-asignaciones-alumnos/${ANIO_ACTUAL}`);
        if (data.success) setAsignaciones(data.data || []);
      } catch { setAsignaciones([]); }
    };
    fetchAsignaciones();
  }, []);

  const gradosDisponibles = Array.from(
    new Map((asignaciones || []).map(a => [a.id_grado, a.grado])).entries()
  ).map(([id, nombre]) => ({ id, nombre }));

  const asignacionesFiltradas = grado ? (asignaciones || []).filter(a => a.id_grado.toString() === grado) : (asignaciones || []);

  const handleBuscar = useCallback(async () => {
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
      } else {
        setAsistencias([]);
        setError(data.message || "No se encontraron registros.");
      }
    } catch {
      setError("Error de conexión");
      setAsistencias([]);
    } finally {
      setLoading(false);
    }
  }, [fecha, grado, curso]);

  useEffect(() => {
    if (fecha || grado || curso) {
      handleBuscar();
    }
  }, [handleBuscar]);

  const stats = {
    total: asistencias.length,
    presentes: asistencias.filter(a => a.estado === "Presente").length,
    ausentes: asistencias.filter(a => a.estado === "Ausente").length
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            Historial de Asistencias
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <Calendar size={13} className="text-slate-400" />
            <span className="text-xs text-slate-500 font-medium tracking-tight">Registro histórico por curso y ciclo académico</span>
            <span className="w-1 h-1 rounded-full bg-slate-200 mx-1" />
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Periodo {ANIO_ACTUAL}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg flex flex-col items-center min-w-[65px] shadow-sm">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Registros</span>
            <span className="text-base font-bold text-slate-800 leading-none">{stats.total}</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg flex flex-col items-center min-w-[65px] shadow-sm">
            <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-tighter">Puntuales</span>
            <span className="text-base font-bold text-emerald-700 leading-none">{stats.presentes}</span>
          </div>
          <div className="bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-lg flex flex-col items-center min-w-[65px] shadow-sm">
            <span className="text-[9px] font-bold text-rose-600 uppercase tracking-tighter">Faltas</span>
            <span className="text-base font-bold text-rose-700 leading-none">{stats.ausentes}</span>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-end gap-4">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight ml-0.5">Fecha</label>
            <div className="relative">
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight ml-0.5">Grado Académico</label>
            <div className="relative">
              <select
                value={grado}
                onChange={(e) => {
                  setGrado(e.target.value);
                  setCurso("");
                }}
                className="w-full appearance-none px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all cursor-pointer"
              >
                <option value="">Todos los grados</option>
                {gradosDisponibles.map(g => (
                  <option key={g.id} value={g.id.toString()}>{g.nombre}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight ml-0.5">Asignatura</label>
            <div className="relative">
              <select
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
                className="w-full appearance-none px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all cursor-pointer"
              >
                <option value="">Todas las materias</option>
                {asignacionesFiltradas.map(a => (
                  <option key={a.id_asignacion} value={a.id_curso.toString()}>
                    {a.curso}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
        <button
          onClick={handleBuscar}
          disabled={loading}
          className="bg-slate-800 text-white px-6 py-2 rounded-lg font-bold text-xs shadow-sm flex items-center gap-2 h-10 hover:bg-slate-900 transition-all shrink-0 uppercase tracking-wider"
        >
          {loading ? "..." : <><Search size={14} /> <span>Consultar</span></>}
        </button>
      </div>

      {/* Table Content */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Registros Consolidados</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Actualizado</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/30 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50">
              <tr>
                <th className="px-6 py-3">Estudiante</th>
                <th className="px-6 py-3 text-center">Estado</th>
                <th className="px-6 py-3 text-center">Marcaje</th>
                <th className="px-6 py-3">Observaciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-6 w-6 border-2 border-slate-100 border-t-indigo-500 rounded-full animate-spin" />
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest tracking-tighter">Procesando...</p>
                    </div>
                  </td>
                </tr>
              ) : asistencias.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-20 text-center">
                    <div className="flex flex-col items-center text-slate-300">
                      <FileText className="h-10 w-10 opacity-10 mb-2" />
                      <p className="text-xs font-bold uppercase tracking-widest">{error || "Seleccione filtros para mostrar datos"}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                asistencias.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/20 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-slate-400 text-[10px]">
                          {a.nombre[0]}{a.ap_p[0]}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700 leading-tight group-hover:text-indigo-600 transition-colors">{a.nombre} {a.ap_p}</span>
                          <span className="text-[10px] font-medium text-slate-400">ID Secundario: {a.dni}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border shadow-sm ${a.estado === "Presente" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"}`}>
                          {a.estado}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1.5 text-slate-500 font-bold text-xs">
                        <Clock size={12} className="text-amber-500" />
                        {a.hora_llegada || "--:--"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-slate-400 font-medium italic truncate max-w-[200px]">{a.observaciones || "---"}</p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {asistencias.length > 0 && (
          <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest italic">Archivo MICole System © v2.0</p>
            <button className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 hover:text-slate-800 transition-all uppercase tracking-wider">
              <Download size={13} /> Descargar Reporte
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
