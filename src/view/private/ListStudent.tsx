import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import EditarDatosButton from "@/components/EditarDatosButton";

interface Periodo {
  id: number;
  anio: number;
}

type Apoderado = {
  dni: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  telefono: string | null;
  parentesco: string;
};

type Student = {
  alumno_id: number;
  alumno_dni: string;
  alumno_nombre: string;
  alumno_apellido_paterno: string;
  alumno_apellido_materno: string;
  fecha_nacimiento: string;
  grado: string;
  fecha_matricula: string;
  apoderados: Apoderado[];
};

export default function ListStudent() {
  const [year, setYear] = useState("2026");
  const [grade, setGrade] = useState("3");
  const [dniSearch, setDniSearch] = useState("");
  const [showParent, setShowParent] = useState<number | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [yearsAvailable, setYearsAvailable] = useState<Periodo[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [updateMessage, setUpdateMessage] = useState<{
    text: string;
    isSuccess: boolean;
  } | null>(null);
  const [grados, setGrados] = useState<{ id: number; nombre: string }[]>([]);

  // Función para actualizar un estudiante específico en la lista
  const updateStudentInList = (updatedStudent: any) => {
    // Actualizar la lista inmediatamente
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.alumno_id === updatedStudent.alumno_id
          ? {
            ...student,
            alumno_nombre: updatedStudent.nombre,
            alumno_apellido_paterno: updatedStudent.ap_p,
            alumno_apellido_materno: updatedStudent.ap_m,
            fecha_nacimiento: updatedStudent.fecha_nacimiento
          }
          : student
      )
    );

    // Mostrar mensaje de éxito inmediatamente
    setUpdateMessage({
      text: `✅ Datos actualizados: ${updatedStudent.nombre} ${updatedStudent.ap_p}`,
      isSuccess: true
    });

    // Ocultar mensaje después de 2 segundos (más rápido)
    setTimeout(() => {
      setUpdateMessage(null);
    }, 2000);
  };

  // Filtrar estudiantes por DNI (Localmente sobre los datos de la página actual)
  useEffect(() => {
    if (dniSearch.trim() === "") {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(student =>
        student.alumno_dni.toLowerCase().includes(dniSearch.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [dniSearch, students]);

  useEffect(() => {
    fetchYears();
    fetchGrados();
  }, []);

  useEffect(() => {
    fetchStudents(1);
  }, [year, grade, pagination.limit]);

  const fetchYears = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/cuotas/periodos", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setYearsAvailable(response.data.data);
      }
    } catch (error: any) {
      console.error("Error al cargar años académicos:", error);
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  const fetchGrados = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/grado/lista-grado", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.status) {
        setGrados(response.data.data);
      }
    } catch (error: any) {
      console.error("Error al cargar grados:", error);
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  const fetchStudents = async (pageToFetch: number = pagination.page) => {
    if (!year || !grade) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      console.log("Fetching students with token:", token?.substring(0, 15) + "...");

      const response = await axios.get(
        `http://localhost:3000/api/alumno/lista-alumnos/${year}/${grade}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            page: pageToFetch,
            limit: pagination.limit
          }
        }
      );

      if (response.data.success) {
        setStudents(response.data.data || []);
        // Asegurarnos de que pagination exista en la respuesta
        if (response.data.pagination) {
          setPagination(response.data.pagination);
        }
      } else {
        console.warn("Respuesta sin éxito:", response.data);
        setStudents([]);
      }
    } catch (error: any) {
      console.error("Error al cargar estudiantes:", error);
      if (error.response?.status === 401) {
        console.warn("Token inválido o expirado. Redirigiendo a login...");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchStudents(newPage);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Filtros */}
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="text-sm font-medium">Año</label>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-32 h-9 bg-white border border-slate-300 rounded px-3 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
              <SelectValue placeholder="Año" />
            </SelectTrigger>
            <SelectContent>
              {yearsAvailable.map((p) => (
                <SelectItem key={p.id} value={p.anio.toString()}>
                  {p.anio}
                </SelectItem>
              ))}
              {yearsAvailable.length === 0 && (
                <SelectItem value="2026">2026</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium">Grado</label>
          <Select value={grade} onValueChange={setGrade}>
            <SelectTrigger className="w-32 h-9 bg-white border border-slate-300 rounded px-3 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
              <SelectValue placeholder="Grado" />
            </SelectTrigger>
            <SelectContent>
              {grados.map((g) => (
                <SelectItem key={g.id} value={g.id.toString()}>
                  {g.nombre}
                </SelectItem>
              ))}
              {grados.length === 0 && (
                <>
                  <SelectItem value="1">1ro</SelectItem>
                  <SelectItem value="2">2do</SelectItem>
                  <SelectItem value="3">3ro</SelectItem>
                  <SelectItem value="4">4to</SelectItem>
                  <SelectItem value="5">5to</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium">Buscar por DNI</label>
          <Input
            type="text"
            placeholder="Ingrese DNI..."
            value={dniSearch}
            onChange={(e) => setDniSearch(e.target.value)}
            className="w-48 h-9 bg-white border border-slate-300 rounded px-3 text-sm focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500"
          />
        </div>
        <Button
          className="mt-2 h-9"
          onClick={() => fetchStudents(1)}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Buscar"}
        </Button>
      </div>

      {/* Mensaje de actualización */}
      {updateMessage && (
        <div className={`p-4 rounded-md mb-4 ${updateMessage.isSuccess
          ? 'bg-green-100 text-green-700 border border-green-300'
          : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
          {updateMessage.text}
        </div>
      )}

      {/* Información de resultados */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <div>
          Mostrando {students.length} de {pagination.total} estudiantes
          {dniSearch.trim() !== "" && ` (filtrados por DNI: ${dniSearch})`}
        </div>
        <div className="flex items-center gap-2 font-medium">
          Página {pagination.page} de {pagination.totalPages || 1}
        </div>
      </div>

      {/* Tabla */}
      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>DNI</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Grado</TableHead>
              <TableHead>Fecha Matrícula</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  {dniSearch.trim() !== ""
                    ? `No se encontraron estudiantes con DNI: ${dniSearch}`
                    : "No hay estudiantes registrados"
                  }
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <CardGroup key={student.alumno_id} student={student} showParent={showParent} setShowParent={setShowParent} updateStudentInList={updateStudentInList} />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Controles de Paginación */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1 || loading}
          >
            Anterior
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                variant={pagination.page === p ? "default" : "outline"}
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => handlePageChange(p)}
                disabled={loading}
              >
                {p}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages || loading}
          >
            Siguiente
          </Button>
        </div>
      )}
    </div>
  );
}

// Subcomponente para organizar el Fragment/Rows y evitar problemas de Key
function CardGroup({ student, showParent, setShowParent, updateStudentInList }: any) {
  return (
    <>
      <TableRow>
        <TableCell>{student.alumno_dni}</TableCell>
        <TableCell>
          {student.alumno_nombre} {student.alumno_apellido_paterno}{" "}
          {student.alumno_apellido_materno}
        </TableCell>
        <TableCell>{student.grado}</TableCell>
        <TableCell>
          {new Date(student.fecha_matricula).toLocaleDateString()}
        </TableCell>
        <TableCell className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setShowParent(
                showParent === student.alumno_id
                  ? null
                  : student.alumno_id
              )
            }
          >
            {showParent === student.alumno_id
              ? "Ocultar Apoderados"
              : "Ver Apoderados"}
          </Button>
          <EditarDatosButton
            variant="outline"
            size="sm"
            className="text-[#3E328C] border-[#3E328C] hover:bg-[#3E328C] hover:text-white"
            alumnoId={student.alumno_id}
            alumnoData={{
              dni: student.alumno_dni,
              nombre: student.alumno_nombre,
              ap_p: student.alumno_apellido_paterno,
              ap_m: student.alumno_apellido_materno,
              fecha_nacimiento: student.fecha_nacimiento
            }}
            onDataUpdated={updateStudentInList}
          >
            Editar
          </EditarDatosButton>
        </TableCell>
      </TableRow>

      {showParent === student.alumno_id && (
        <TableRow>
          <TableCell
            colSpan={5}
            className="bg-muted px-6 py-4 text-sm"
          >
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700">Información de Apoderados:</h4>
              {student.apoderados && student.apoderados.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {student.apoderados.map((apoderado: any, index: number) => (
                    <div key={index} className="bg-white p-3 rounded border shadow-sm">
                      <div className="font-medium text-primary mb-1">{apoderado.parentesco}</div>
                      <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-sm">
                        <span className="text-gray-500">Nombre:</span>
                        <span>{apoderado.nombre} {apoderado.apellido_paterno} {apoderado.apellido_materno}</span>

                        <span className="text-gray-500">DNI:</span>
                        <span>{apoderado.dni}</span>

                        <span className="text-gray-500">Teléfono:</span>
                        <span>{apoderado.telefono || "No registrado"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 italic">No hay apoderados registrados para este alumno.</div>
              )}
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
