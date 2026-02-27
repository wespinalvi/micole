import { useState, useEffect } from "react";
import api from "@/lib/axios";
import {
  ChevronDown,
  Calendar,
  UserCheck,
  Save,
  AlertCircle
} from 'lucide-react';

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
  const [gradoSeleccionado, setGradoSeleccionado] = useState<string>("");

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
      const fechaHoy = new Date().toISOString().split('T')[0];
      const horaActual = new Date().toLocaleTimeString('en-GB');

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
    } catch (error: unknown) {
      let errorMessage = "Error al servidor al intentar guardar.";
      if (error && typeof error === 'object' && 'response' in error) {
        const responseData = (error as any).response?.data;
        errorMessage = responseData?.message || errorMessage;
      }
      setMensaje({ text: errorMessage, isError: true });
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: alumnos.length,
    presentes: alumnos.filter(a => a.asistio).length,
    ausentes: alumnos.filter(a => !a.asistio).length
  };

  const gradosDisponibles = Array.from(
    new Map(asignaciones.map(a => [a.id_grado, a.grado])).entries()
  ).map(([id, nombre]) => ({ id, nombre }));

  const asignacionesFiltradas = gradoSeleccionado
    ? asignaciones.filter(a => a.id_grado.toString() === gradoSeleccionado)
    : asignaciones;

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            Registro de Asistencia
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <Calendar size={13} className="text-slate-400" />
            <span className="text-xs text-slate-500 font-medium capitalize">
              {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-200 mx-1" />
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Sede Central</span>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg flex flex-col items-center min-w-[65px] shadow-sm">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Total</span>
            <span className="text-base font-bold text-slate-800 leading-tight">{stats.total}</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg flex flex-col items-center min-w-[65px] shadow-sm">
            <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-tighter">Pres.</span>
            <span className="text-base font-bold text-emerald-700 leading-tight">{stats.presentes}</span>
          </div>
          <div className="bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-lg flex flex-col items-center min-w-[65px] shadow-sm">
            <span className="text-[9px] font-bold text-rose-600 uppercase tracking-tighter">Aus.</span>
            <span className="text-base font-bold text-rose-700 leading-tight">{stats.ausentes}</span>
          </div>
        </div>
      </div>

      {/* Selectors Card */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider ml-0.5">Año Académico</label>
            <div className="relative">
              <select
                value={anioSeleccionado}
                onChange={(e) => setAnioSeleccionado(e.target.value)}
                className="w-full appearance-none px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all cursor-pointer"
              >
                <option value="2026">Ciclo 2026</option>
                <option value="2025">Ciclo 2025</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider ml-0.5">Grado</label>
            <div className="relative">
              <select
                value={gradoSeleccionado}
                onChange={(e) => {
                  setGradoSeleccionado(e.target.value);
                  setAsignacionSeleccionada("");
                }}
                className="w-full appearance-none px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all cursor-pointer"
              >
                <option value="">Seleccionar grado</option>
                {gradosDisponibles.map(g => (
                  <option key={g.id} value={g.id.toString()}>{g.nombre}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider ml-0.5">Asignatura</label>
            <div className="relative">
              <select
                value={asignacionSeleccionada}
                onChange={(e) => setAsignacionSeleccionada(e.target.value)}
                className="w-full appearance-none px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all cursor-pointer"
              >
                <option value="">Seleccionar curso</option>
                {asignacionesFiltradas.map(a => (
                  <option key={a.id_asignacion} value={a.id_asignacion.toString()}>
                    {a.curso}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {mensaje && (
        <div className={`p-3 rounded-lg flex items-center gap-3 border animate-in fade-in slide-in-from-top-1 ${mensaje.isError ? "bg-red-50 text-red-700 border-red-100" : "bg-emerald-50 text-emerald-700 border-emerald-100"}`}>
          {mensaje.isError ? <AlertCircle size={16} /> : <UserCheck size={16} />}
          <span className="font-semibold text-xs tracking-tight">{mensaje.text}</span>
        </div>
      )}

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-100/10 flex justify-between items-center">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nómina de Estudiantes</h2>
          {alumnos.length > 0 && (
            <button
              onClick={() => setAlumnos(alumnos.map(al => ({ ...al, asistio: true })))}
              className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded-full transition-colors"
            >
              Marcar todos presentes
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50">
              <tr>
                <th className="px-6 py-3">Estudiante</th>
                <th className="px-6 py-3">Observación</th>
                <th className="px-6 py-3 text-right">Asistencia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {alumnos.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-20">
                    <div className="flex flex-col items-center">
                      <UserCheck className="h-10 w-10 opacity-10 mb-2 text-slate-400" />
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Seleccione curso para cargar datos</p>
                    </div>
                  </td>
                </tr>
              ) : (
                alumnos.map((alumno) => (
                  <tr key={alumno.id_alumno} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 uppercase">
                          {alumno.nombre_completo[0]}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700 leading-snug">{alumno.nombre_completo}</span>
                          <span className="text-[10px] font-medium text-slate-400">DNI: {alumno.dni}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        placeholder="Nota opcional..."
                        value={alumno.observacion}
                        onChange={(e) => handleObservacionChange(alumno.id_alumno, e.target.value)}
                        className="w-full bg-slate-50/50 text-xs border border-transparent rounded-lg px-3 py-1.5 focus:bg-white focus:border-indigo-100 outline-none transition-all placeholder:text-slate-300 font-medium"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end items-center gap-4">
                        <span className={`text-[10px] font-bold uppercase tracking-tight ${alumno.asistio ? "text-emerald-500" : "text-rose-400"}`}>
                          {alumno.asistio ? "Presente" : "Ausencia"}
                        </span>
                        <input
                          type="checkbox"
                          checked={alumno.asistio}
                          onChange={(e) => handleAsistenciaChange(alumno.id_alumno, e.target.checked)}
                          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shadow-sm"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {alumnos.length > 0 && (
          <div className="px-6 py-4 bg-slate-100/20 border-t border-slate-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider italic text-center sm:text-left">
              Verifique los marcajes antes de realizar el registro oficial
            </p>
            <button
              onClick={handleGuardarAsistencia}
              disabled={loading}
              className="bg-indigo-600 text-white px-10 py-2.5 rounded-lg font-bold text-xs shadow-md hover:bg-indigo-700 active:transform active:scale-95 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              {loading ? "PROCESANDO..." : (
                <>
                  <Save size={14} />
                  <span>GUARDAR REGISTRO</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
