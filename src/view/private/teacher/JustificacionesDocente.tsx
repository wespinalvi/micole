import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Calendar, CheckCircle, XCircle, Clock, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

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
  Pendiente: { label: "Pendiente", color: "bg-amber-100 text-amber-700 border-amber-200", icon: <Clock className="w-3 h-3 mr-1" /> },
  Aprobada: { label: "Aprobada", color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: <CheckCircle className="w-3 h-3 mr-1" /> },
  Rechazada: { label: "Rechazada", color: "bg-rose-100 text-rose-700 border-rose-200", icon: <XCircle className="w-3 h-3 mr-1" /> }
};

const tipos = {
  Medica: { label: "Médica", color: "bg-blue-100 text-blue-700 border-blue-200" },
  Personal: { label: "Personal", color: "bg-purple-100 text-purple-700 border-purple-200" },
  Otros: { label: "Otros", color: "bg-slate-100 text-slate-700 border-slate-200" }
};

export default function JustificacionesDocente() {
  const [justificaciones, setJustificaciones] = useState<Justificacion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fechaInput, setFechaInput] = useState("");
  const [fecha, setFecha] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [justificacionSeleccionada, setJustificacionSeleccionada] = useState<Justificacion | null>(null);
  const [accionSeleccionada, setAccionSeleccionada] = useState<"aceptar" | "rechazar" | null>(null);
  const [comentario, setComentario] = useState("");

  const fetchJustificaciones = async () => {
    if (!fecha) {
      setJustificaciones([]);
      return;
    }

    setLoading(true);
    try {
      let urlApi = `/justificacion/docente/pendientes?page=${page}`;
      const [year, month, day] = fecha.split("-");
      urlApi += `&anio=${year}&mes=${parseInt(month)}&dia=${parseInt(day)}`;

      const res = await api.get(urlApi);
      if (res.data.success) {
        let rawData = res.data.data;

        // Si los datos vienen agrupados por fecha (formato con 'solicitudes')
        // los aplanamos para que la tabla los procese como una lista simple
        if (rawData.length > 0 && rawData[0].solicitudes) {
          rawData = rawData.flatMap((group: any) => group.solicitudes);
        }

        setJustificaciones(rawData);
        setTotalPages(res.data.totalPages || 1);
        setError("");
      } else {
        setJustificaciones([]);
        setTotalPages(1);
        setError("No se pudieron cargar las justificaciones");
      }
    } catch (err) {
      console.error(err);
      setJustificaciones([]);
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fecha) {
      fetchJustificaciones();
    } else {
      setJustificaciones([]);
    }
  }, [page, fecha]);

  const handleAccion = (id: number, accion: "aceptar" | "rechazar") => {
    const just = justificaciones.find(j => j.id === id);
    if (just) {
      setJustificacionSeleccionada(just);
      setAccionSeleccionada(accion);
      setComentario("");
      setShowDialog(true);
    }
  };

  const confirmarAccion = async () => {
    if (!justificacionSeleccionada || !accionSeleccionada) return;
    try {
      setLoading(true);
      await api.put(`/justificacion/${justificacionSeleccionada.id}/estado`, {
        estado: accionSeleccionada === "aceptar" ? "Aprobada" : "Rechazada",
        comentario_revision: comentario
      });
      setJustificaciones(justificaciones.filter(j => j.id !== justificacionSeleccionada.id));
      setShowDialog(false);
    } catch {
      setError("Error al procesar");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "dd/MM/yy", { locale: es });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="p-4 bg-[#f8fafc] min-h-full">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Header Minimalista */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Justificaciones</h1>
            <p className="text-[11px] text-slate-500">Gestión de solicitudes pendientes</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative group">
              <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="date"
                value={fechaInput}
                onChange={e => setFechaInput(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white transition-all w-[140px]"
              />
            </div>
            <Button
              size="sm"
              onClick={() => { setFecha(fechaInput); setPage(1); }}
              className="h-8 bg-purple-600 hover:bg-purple-700 text-[11px] px-4 font-bold"
            >
              Filtrar
            </Button>
            {fecha && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { setFecha(""); setFechaInput(""); setPage(1); }}
                className="h-8 text-xs text-slate-400 hover:text-slate-600 p-1"
              >
                <XCircle className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Tabla Compacta */}
        <Card className="border border-slate-200/60 shadow-sm overflow-hidden bg-white rounded-xl">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-b border-slate-100">
                    <TableHead className="h-9 px-4 text-[10px] uppercase tracking-wider font-bold text-slate-500">Alumno</TableHead>
                    <TableHead className="h-9 px-4 text-[10px] uppercase tracking-wider font-bold text-slate-500">Motivo</TableHead>
                    <TableHead className="h-9 px-4 text-[10px] uppercase tracking-wider font-bold text-slate-500">Tipo</TableHead>
                    <TableHead className="h-9 px-4 text-[10px] uppercase tracking-wider font-bold text-slate-500">Fecha</TableHead>
                    <TableHead className="h-9 px-4 text-[10px] uppercase tracking-wider font-bold text-slate-500 text-center">Doc</TableHead>
                    <TableHead className="h-9 px-4 text-[10px] uppercase tracking-wider font-bold text-slate-500">Estado</TableHead>
                    <TableHead className="h-9 px-4 text-[10px] uppercase tracking-wider font-bold text-slate-500 text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center space-y-2 opacity-50">
                          <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-[10px] font-medium text-slate-500">Cargando...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : justificaciones.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center text-slate-300 space-y-1">
                          <FileText className="w-6 h-6 opacity-20" />
                          <p className="text-[10px] font-medium">{error || "Sin pendientes"}</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    justificaciones.map(j => (
                      <TableRow key={j.id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0">
                        <TableCell className="py-2 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 border border-slate-200 flex-shrink-0">
                              {j.alumno_nombres?.[0] || '?'}{j.alumno_ap_p?.[0] || ''}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="font-semibold text-slate-700 text-[11px] truncate max-w-[120px]">
                                {j.alumno_nombres || "Sin nombre"} {j.alumno_ap_p || ""}
                              </span>
                              <span className="text-[9px] text-slate-400 -mt-0.5">Estudiante</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-2 px-4 min-w-[150px]">
                          <div className="max-w-[180px]">
                            <p className="text-[11px] font-medium text-slate-700 truncate">{j.titulo}</p>
                            <p className="text-[9px] text-slate-400 truncate opacity-70 italic">{j.descripcion}</p>
                          </div>
                        </TableCell>
                        <TableCell className="py-2 px-4 whitespace-nowrap">
                          <Badge className={`shadow-none text-[8px] px-1.5 py-0 rounded border leading-tight ${tipos[j.tipo as keyof typeof tipos]?.color || tipos.Otros.color}`}>
                            {tipos[j.tipo as keyof typeof tipos]?.label || j.tipo}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-2 px-4 whitespace-nowrap">
                          <span className="text-[10px] font-medium text-slate-600">{formatDate(j.fecha_inicio)}</span>
                        </TableCell>
                        <TableCell className="py-2 px-4 text-center">
                          <a
                            href={j.url_documento}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-7 h-7 rounded-md hover:bg-slate-100 text-slate-400 hover:text-purple-600 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </TableCell>
                        <TableCell className="py-2 px-4 whitespace-nowrap">
                          <div className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${estados[j.estado as keyof typeof estados]?.color || estados.Pendiente.color}`}>
                            <span className="w-1 h-1 rounded-full bg-current"></span>
                            {estados[j.estado as keyof typeof estados]?.label || j.estado}
                          </div>
                        </TableCell>
                        <TableCell className="py-2 px-4 text-right whitespace-nowrap">
                          <div className="flex justify-end gap-1">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleAccion(j.id, "aceptar")}
                                  className="h-7 w-7 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="text-[9px] px-2 py-1">Aprobar</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleAccion(j.id, "rechazar")}
                                  className="h-7 w-7 p-0 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="text-[9px] px-2 py-1">Rechazar</TooltipContent>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Paginación Compacta */}
            <div className="px-4 py-2 border-t border-slate-50 flex items-center justify-between bg-slate-50/10">
              <span className="text-[10px] text-slate-400 font-medium">
                {justificaciones.length} items
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1 || loading}
                  className="h-6 px-2 text-[10px] text-slate-400"
                >
                  Prev
                </Button>
                <div className="h-4 w-[1px] bg-slate-200 mx-1"></div>
                <span className="text-[10px] font-bold text-slate-400 px-2">{page} / {totalPages}</span>
                <div className="h-4 w-[1px] bg-slate-200 mx-1"></div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages || loading}
                  className="h-6 px-2 text-[10px] text-slate-400"
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[340px] p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
          <div className={`p-4 ${accionSeleccionada === "aceptar" ? "bg-emerald-600" : "bg-rose-600"}`}>
            <h3 className="text-white text-sm font-bold flex items-center gap-2">
              {accionSeleccionada === "aceptar" ? "Aprobar Solicitud" : "Rechazar Solicitud"}
            </h3>
          </div>

          <div className="p-4 space-y-3">
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Alumno</p>
              <p className="text-[12px] font-bold text-slate-700">
                {justificacionSeleccionada?.alumno_nombres} {justificacionSeleccionada?.alumno_ap_p}
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Observaciones</label>
              <Textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Indique los motivos..."
                className="min-h-[70px] text-[11px] border-slate-200 focus:ring-1 focus:ring-purple-500 bg-slate-50/50 resize-none rounded-lg"
              />
            </div>
          </div>

          <div className="p-4 flex gap-2 pt-0">
            <Button variant="ghost" size="sm" onClick={() => setShowDialog(false)} className="flex-1 text-[11px] font-bold text-slate-400 hover:bg-slate-50 h-9">
              Cancelar
            </Button>
            <Button
              size="sm"
              onClick={confirmarAccion}
              disabled={loading}
              className={`flex-1 text-[11px] font-bold text-white shadow-lg h-9 rounded-lg ${accionSeleccionada === "aceptar" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"
                }`}
            >
              {loading ? "..." : "Confirmar"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
