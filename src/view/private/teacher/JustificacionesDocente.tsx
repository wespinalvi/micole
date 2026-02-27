import { useEffect, useState, useCallback } from "react";
import api from "@/lib/axios";
import {
  FileText,
  Calendar,
  CheckCircle,
  XCircle,
  ExternalLink,
  Filter
} from "lucide-react";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";

interface Justificacion {
  id: number;
  id_matricula: number;
  id_docente: number;
  titulo: string;
  descripcion: string;
  tipo: string;
  fecha_inicio: string;
  fecha_fin: string;
  url_documento: string;
  cloudinary_public_id: string;
  estado: string;
  fecha_revision: string | null;
  comentario_revision: string | null;
  created_at: string;
  updated_at: string;
  alumno_nombres: string;
  alumno_ap_p: string;
  alumno_ap_m: string;
}

const estados = {
  Pendiente: { label: "Pendiente", color: "bg-amber-50 text-amber-600 border-amber-100", dot: "bg-amber-400" },
  Aprobada: { label: "Aprobada", color: "bg-emerald-50 text-emerald-600 border-emerald-100", dot: "bg-emerald-400" },
  Rechazada: { label: "Rechazada", color: "bg-rose-50 text-rose-600 border-rose-100", dot: "bg-rose-400" }
};

export default function JustificacionesDocente() {
  const [justificaciones, setJustificaciones] = useState<Justificacion[]>([]);
  const [loading, setLoading] = useState(false);
  const [fechaInput, setFechaInput] = useState(new Date().toISOString().split('T')[0]);
  const [showDialog, setShowDialog] = useState(false);
  const [justificacionSeleccionada, setJustificacionSeleccionada] = useState<Justificacion | null>(null);
  const [accionSeleccionada, setAccionSeleccionada] = useState<"aceptar" | "rechazar" | null>(null);
  const [comentario, setComentario] = useState("");

  const fetchJustificaciones = useCallback(async () => {
    setLoading(true);
    try {
      const [year, month, day] = fechaInput.split("-");
      const urlApi = `/justificacion/docente/pendientes?anio=${year}&mes=${parseInt(month)}&dia=${parseInt(day)}`;
      const res = await api.get(urlApi);
      if (res.data.success) {
        let rawData = res.data.data;
        if (rawData.length > 0 && rawData[0].solicitudes) {
          rawData = rawData.flatMap((group: any) => group.solicitudes);
        }
        setJustificaciones(rawData);
      } else {
        setJustificaciones([]);
      }
    } catch (err) {
      console.error(err);
      setJustificaciones([]);
    } finally {
      setLoading(false);
    }
  }, [fechaInput]);

  useEffect(() => {
    fetchJustificaciones();
  }, [fetchJustificaciones]);

  const handleAccion = (j: Justificacion, accion: "aceptar" | "rechazar") => {
    setJustificacionSeleccionada(j);
    setAccionSeleccionada(accion);
    setComentario("");
    setShowDialog(true);
  };

  const confirmarAccion = async () => {
    if (!justificacionSeleccionada || !accionSeleccionada) return;
    try {
      setLoading(true);
      const res = await api.put(`/justificacion/${justificacionSeleccionada.id}/estado`, {
        estado: accionSeleccionada === "aceptar" ? "Aprobada" : "Rechazada",
        comentario_revision: comentario
      });
      if (res.data.success) {
        setJustificaciones(justificaciones.filter(j => j.id !== justificacionSeleccionada.id));
        setShowDialog(false);
      }
    } catch (error) {
      console.error("Error processing justification:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            Gestión de Justificaciones
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <FileText size={13} className="text-slate-400" />
            <span className="text-xs text-slate-500 font-medium tracking-tight">Revision de solicitudes de ausencia por estudiantes</span>
            <span className="w-1 h-1 rounded-full bg-slate-200 mx-1" />
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Pendientes: {justificaciones.length}</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-3 shadow-sm">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter leading-none">Corte Actual</span>
            <span className="text-sm font-bold text-slate-700">Ciclo 2026</span>
          </div>
          <div className="w-px h-6 bg-slate-200" />
          <Filter size={16} className="text-slate-400" />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-end gap-4">
        <div className="flex-1 space-y-1.5 w-full">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight ml-0.5">Fecha de Solicitud</label>
          <div className="relative">
            <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="date"
              value={fechaInput}
              onChange={(e) => setFechaInput(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-slate-600"
            />
          </div>
        </div>
        <button
          onClick={fetchJustificaciones}
          className="bg-slate-800 text-white px-8 py-2 rounded-lg font-bold text-xs shadow-sm hover:bg-slate-900 transition-all uppercase tracking-wider h-10 w-full md:w-auto"
        >
          FILTRAR
        </button>
      </div>

      {/* Table Content */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-100/10">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nómina de Solicitudes</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-3">Estudiante</th>
                <th className="px-6 py-3">Motivo y Detalle</th>
                <th className="px-6 py-3">Documento</th>
                <th className="px-6 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-6 w-6 border-2 border-slate-100 border-t-indigo-500 rounded-full animate-spin" />
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sincronizando...</p>
                    </div>
                  </td>
                </tr>
              ) : justificaciones.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-20 text-center text-slate-400">
                    <div className="flex flex-col items-center">
                      <CheckCircle className="h-10 w-10 opacity-10 mb-2" />
                      <p className="text-xs font-bold uppercase tracking-widest">Sin solicitudes pendientes</p>
                    </div>
                  </td>
                </tr>
              ) : (
                justificaciones.map((j) => (
                  <tr key={j.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-400 text-[10px] uppercase">
                          {j.alumno_nombres[0]}{j.alumno_ap_p[0]}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700 leading-snug">{j.alumno_nombres} {j.alumno_ap_p}</span>
                          <div className={`inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-tighter mt-0.5 ${estados[j.estado as keyof typeof estados]?.color || estados.Pendiente.color} bg-transparent border-none`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${estados[j.estado as keyof typeof estados]?.dot || estados.Pendiente.dot}`} />
                            {j.estado}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col max-w-xs">
                        <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">{j.tipo}</span>
                        <span className="text-[13px] font-bold text-slate-600 truncate">{j.titulo}</span>
                        <p className="text-[11px] text-slate-400 italic truncate overflow-hidden font-medium">{j.descripcion}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={j.url_documento}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 bg-indigo-50/50 px-2.5 py-1 rounded border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all shadow-sm uppercase tracking-tighter"
                      >
                        Adjunto <ExternalLink size={11} />
                      </a>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleAccion(j, "aceptar")}
                          className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                          title="Aprobar"
                        >
                          <CheckCircle size={16} />
                        </button>
                        <button
                          onClick={() => handleAccion(j, "rechazar")}
                          className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                          title="Rechazar"
                        >
                          <XCircle size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md p-0 overflow-hidden rounded-2xl border-none shadow-2xl">
          <div className={`p-5 ${accionSeleccionada === "aceptar" ? "bg-emerald-600" : "bg-rose-600"}`}>
            <h3 className="text-white text-lg font-bold tracking-tight flex items-center gap-2">
              {accionSeleccionada === "aceptar" ? "Aprobar Solicitud" : "Rechazar Solicitud"}
            </h3>
            <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mt-0.5">Sistema de Gestión Académica</p>
          </div>
          <div className="p-6 space-y-5">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Estudiante</span>
              <p className="text-base font-bold text-slate-800 leading-tight">{justificacionSeleccionada?.alumno_nombres} {justificacionSeleccionada?.alumno_ap_p}</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Comentario de Revisión</label>
                <span className="text-[9px] text-slate-300 font-bold uppercase italic">Opcional</span>
              </div>
              <textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Escriba sus observaciones aquí..."
                className="w-full min-h-[100px] p-3 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none resize-none placeholder:text-slate-300"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDialog(false)}
                className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-50 transition-all uppercase tracking-tight"
              >
                Cerrar
              </button>
              <button
                onClick={confirmarAccion}
                className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition-all active:scale-95 uppercase tracking-wider ${accionSeleccionada === "aceptar" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"}`}
              >
                Confirmar {accionSeleccionada === "aceptar" ? "Aprobación" : "Rechazo"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
