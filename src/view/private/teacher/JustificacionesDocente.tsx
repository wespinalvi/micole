import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Justificacion {
  id: number;
  id_alumno: number;
  id_docente: number;
  titulo: string;
  descripcion: string;
  tipo_justificacion: string;
  url_pdf: string;
  estado: string;
  fecha_falta: string;
  fecha_subida: string;
  nombre_alumno: string;
  nombre_docente: string;
}

const estados = {
  pendiente: "Pendiente",
  aprobada: "Aprobada",
  rechazada: "Rechazada"
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

  useEffect(() => {
    setLoading(true);
    let urlApi = `/justificaciones/docente/justificaciones?page=${page}`;
    if (fecha) {
      urlApi += `&fecha_inicio=${fecha}`;
    }
    api.get(urlApi)
      .then(res => {
        if (res.data.success) {
          setJustificaciones(res.data.data);
          setTotalPages(res.data.totalPages || 1);
        } else {
          setJustificaciones([]);
          setTotalPages(1);
          setError("No se pudieron cargar las justificaciones");
        }
      })
      .catch(() => {
        setJustificaciones([]);
        setTotalPages(1);
        setError("Error al cargar justificaciones");
      })
      .finally(() => setLoading(false));
  }, [page, fecha]);

  const handleAccion = async (id: number, accion: "aceptar" | "rechazar") => {
    setJustificacionSeleccionada(justificaciones.find(j => j.id === id) || null);
    setAccionSeleccionada(accion);
    setComentario("");
    setShowDialog(true);
  };

  const confirmarAccion = async () => {
    if (!justificacionSeleccionada || !accionSeleccionada) return;
    
    try {
      setLoading(true);
      await api.put(`/justificaciones/${justificacionSeleccionada.id}/estado`, {
        estado: accionSeleccionada === "aceptar" ? "aprobada" : "rechazada",
        comentario_revision: comentario
      });
      
      setJustificaciones(justificaciones.map(j =>
        j.id === justificacionSeleccionada.id ? { 
          ...j, 
          estado: accionSeleccionada === "aceptar" ? "aprobada" : "rechazada" 
        } : j
      ));
      
      setShowDialog(false);
      setJustificacionSeleccionada(null);
      setAccionSeleccionada(null);
      setComentario("");
    } catch {
      setError("No se pudo actualizar la justificación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1000px] p-2 sm:p-4">
        <Card>
          <CardHeader>
            <CardTitle>Justificaciones de alumnos</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && <p>Cargando...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="w-full flex justify-center mb-4">
              <div className="w-full max-w-[1000px] flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                <label className="font-medium">Buscar por fecha de falta:</label>
                <input
                  type="date"
                  value={fechaInput}
                  onChange={e => setFechaInput(e.target.value)}
                  className="border rounded px-2 py-1"
                />
                <Button size="sm" variant="outline" onClick={() => { setFecha(fechaInput); setPage(1); }} className="bg-purple-600 text-white hover:bg-purple-700 border-purple-600">Buscar</Button>
                {fecha && (
                  <Button size="sm" variant="outline" onClick={() => { setFecha(""); setFechaInput(""); setPage(1); }} className="bg-purple-200 text-purple-800 hover:bg-purple-300 border-purple-300">Limpiar</Button>
                )}
              </div>
            </div>
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alumno</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>PDF</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                    <TableHead>Fecha de la falta</TableHead>
                    <TableHead>Fecha de subida</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {justificaciones.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">No hay justificaciones</TableCell>
                    </TableRow>
                  ) : (
                    justificaciones.map(j => (
                      <TableRow key={j.id}>
                        <TableCell>{j.nombre_alumno}</TableCell>
                        <TableCell>{j.titulo}</TableCell>
                        <TableCell style={{ maxWidth: 220, minWidth: 120, padding: 0 }}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span style={{ cursor: 'pointer', display: 'inline-block', width: '100%' }}>
                                {(() => {
                                  const palabras = j.descripcion.split(/\s+/);
                                  if (palabras.length <= 7) {
                                    return (
                                      <span style={{
                                        display: 'inline-block',
                                        maxWidth: 210,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        verticalAlign: 'bottom',
                                      }}>{j.descripcion}</span>
                                    );
                                  } else {
                                    const primeras = palabras.slice(0, 7).join(' ');
                                    const resto = palabras.slice(7).join(' ');
                                    return (
                                      <span style={{ display: 'inline-block', width: '100%' }}>
                                        <span style={{
                                          display: 'block',
                                          maxWidth: 210,
                                          whiteSpace: 'nowrap',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                        }}>{primeras}</span>
                                        <span style={{
                                          display: 'block',
                                          maxWidth: 210,
                                          whiteSpace: 'nowrap',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                        }}>{resto}</span>
                                      </span>
                                    );
                                  }
                                })()}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              {j.descripcion}
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            j.tipo_justificacion === "medica" 
                              ? "bg-green-100 text-green-800 border-green-300" 
                              : j.tipo_justificacion === "personal" 
                                ? "bg-blue-100 text-blue-800 border-blue-300"
                                : "bg-purple-100 text-purple-800 border-purple-300"
                          }>
                            {j.tipo_justificacion}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <a href={j.url_pdf} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Ver PDF</a>
                        </TableCell>
                        <TableCell>
                          <Badge variant={j.estado === "pendiente" ? "default" : j.estado === "aprobada" ? "default" : "destructive"}>
                            {estados[j.estado as keyof typeof estados] || j.estado}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {j.estado === "pendiente" && (
                            <div className="flex gap-2">
                              <Button size="sm" variant="default" onClick={() => handleAccion(j.id, "aceptar")} className="bg-purple-600 text-white hover:bg-purple-700">Aceptar</Button>
                              <Button size="sm" variant="outline" onClick={() => handleAccion(j.id, "rechazar")} className="bg-gray-200 text-gray-700 hover:bg-gray-300 border-gray-300">Rechazar</Button>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{new Date(j.fecha_falta).toLocaleDateString("es-PE")}</TableCell>
                        <TableCell>{new Date(j.fecha_subida).toLocaleDateString("es-PE")}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-between items-center mt-4">
              <Button size="sm" variant="outline" onClick={() => setPage(page - 1)} disabled={page === 1} className="bg-purple-200 text-purple-800 hover:bg-purple-300 border-purple-300 disabled:bg-gray-200 disabled:text-gray-400">Anterior</Button>
              <span className="text-purple-700 font-medium">Página {page} de {totalPages}</span>
              <Button size="sm" variant="outline" onClick={() => setPage(page + 1)} disabled={page === totalPages} className="bg-purple-200 text-purple-800 hover:bg-purple-300 border-purple-300 disabled:bg-gray-200 disabled:text-gray-400">Siguiente</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Modal para comentario */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {accionSeleccionada === "aceptar" ? "Aceptar" : "Rechazar"} Justificación
            </DialogTitle>
            <DialogDescription>
              {accionSeleccionada === "aceptar" 
                ? "¿Estás seguro de que quieres aceptar esta justificación?" 
                : "¿Estás seguro de que quieres rechazar esta justificación?"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Comentario (opcional):</label>
              <Textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Escribe un comentario sobre tu decisión..."
                className="mt-1"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowDialog(false)} className="bg-gray-200 text-gray-700 hover:bg-gray-300">
                Cancelar
              </Button>
              <Button 
                variant={accionSeleccionada === "aceptar" ? "default" : "outline"}
                onClick={confirmarAccion}
                disabled={loading}
                className={accionSeleccionada === "aceptar" ? "bg-purple-600 text-white hover:bg-purple-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
              >
                {loading ? "Procesando..." : accionSeleccionada === "aceptar" ? "Aceptar" : "Rechazar"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 