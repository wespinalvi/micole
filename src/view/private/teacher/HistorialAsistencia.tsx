import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import api from "@/lib/axios";

interface Asistencia {
  id: number;
  dni: string;
  nombre: string;
  ap_p: string;
  ap_m: string;
  asistio: number;
  observacion: string;
}

interface CursoDocente {
  id_docente_curso: number;
  id_curso: number;
  curso: string;
  id_grado: number;
  grado: string;
}

const ANIO = "2025";

const HistorialAsistencia = () => {
  const [fecha, setFecha] = useState("");
  const [grado, setGrado] = useState<string>("");
  const [curso, setCurso] = useState<string>("");
  const [asistencias, setAsistencias] = useState<Asistencia[]>([]);
  const [cursos, setCursos] = useState<CursoDocente[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Obtener cursos del docente al cargar
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const { data } = await api.get(`/docente/mis-cursos/${ANIO}`);
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
  }, []);

  // Grados únicos de los cursos del docente
  const gradosDisponibles = Array.from(
    new Map(cursos.map(c => [c.id_grado, c.grado])).entries()
  ).map(([id, nombre]) => ({ id, nombre }));

  // Cursos filtrados por grado seleccionado
  const cursosFiltrados = grado
    ? cursos.filter(c => c.id_grado.toString() === grado)
    : cursos;

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
      } else {
        setAsistencias([]);
        setError("No se encontraron asistencias para los filtros seleccionados.");
      }
    } catch {
      setError("Error al cargar asistencias");
      setAsistencias([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExportarExcel = async () => {
    if (!fecha || !grado || !curso) {
      setError("Debe seleccionar fecha, grado y curso para exportar");
      return;
    }

    try {
      setLoading(true);
      const params = new URLSearchParams({
        fecha: fecha,
        id_grado: grado,
        id_curso: curso
      });

      const response = await api.get(`/docente/exportar-asistencia?${params}`, {
        responseType: 'blob'
      });

      // Crear un enlace para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `asistencia_${fecha}_grado${grado}_curso${curso}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      setError("Error al exportar el archivo Excel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-4xl mt-8">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-2xl">Historial de Asistencia</CardTitle>
        <Button onClick={handleExportarExcel} disabled={loading} className="bg-purple-600 text-white hover:bg-purple-700">
          {loading ? "Exportando..." : "Exportar a Excel"}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <Input type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
          <Select value={grado} onValueChange={setGrado}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Grado" />
            </SelectTrigger>
            <SelectContent>
              {gradosDisponibles.map(g => (
                <SelectItem key={g.id} value={g.id.toString()}>{g.nombre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={curso} onValueChange={setCurso}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Curso" />
            </SelectTrigger>
            <SelectContent>
              {cursosFiltrados.map(c => (
                <SelectItem key={c.id_docente_curso} value={c.id_curso.toString()}>{c.curso}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleBuscar} disabled={loading} className="bg-purple-600 text-white hover:bg-purple-700">
            {loading ? "Buscando..." : "Mostrar"}
          </Button>
        </div>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>DNI</TableHead>
              <TableHead>Nombre completo</TableHead>
              <TableHead>Asistió</TableHead>
              <TableHead>Observación</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {asistencias.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">No hay datos</TableCell>
              </TableRow>
            ) : (
              asistencias.map(a => (
                <TableRow key={a.id}>
                  <TableCell>{a.dni}</TableCell>
                  <TableCell>{`${a.nombre} ${a.ap_p} ${a.ap_m}`}</TableCell>
                  <TableCell>{a.asistio === 1 ? "Sí" : "No"}</TableCell>
                  <TableCell>{a.observacion}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default HistorialAsistencia;
