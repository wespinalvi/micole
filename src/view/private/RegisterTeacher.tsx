import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Search, Loader2 } from "lucide-react";

interface CursoAsignado {
  idCurso: number;
  idGrado: number;
}

interface GradoDisponibilidad {
  id_grado: number;
  numero_grado: number;
  nombre_grado: string;
  ocupado: boolean;
}

interface CursoItem {
  id_curso: number;
  nombre: string;
  grados: GradoDisponibilidad[];
}

interface Credenciales {
  username: string;
  password: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  credenciales: Credenciales;
}

interface DniResponse {
  status: boolean;
  data: {
    first_name?: string;
    last_name?: string;
    first_last_name?: string;
    second_last_name?: string;
    nombres?: string;
    apellidoMaterno?: string;
    apellidoPaterno?: string;
    nombre?: string;
    numeroDocumento?: string;
  };
}

import { useEffect } from "react";

export default function RegisterTeacher() {
  const [formData, setFormData] = useState({
    dni: "",
    nombres: "",
    apellido_paterno: "",
    apellido_materno: "",
    fecha_nacimiento: "",
    sexo: "M",
    email: "",
    telefono: "",
    direccion: "",
    especialidad: "",
    grado_academico: "",
  });

  const [cursosAsignados, setCursosAsignados] = useState<CursoAsignado[]>([]);
  const [cursosDisponibles, setCursosDisponibles] = useState<CursoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [credenciales, setCredenciales] = useState<Credenciales | null>(null);

  const [currentYear, setCurrentYear] = useState<string>("");

  useEffect(() => {
    const initializeYear = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/cuotas/periodos");
        const data = response.data;
        if (data) {
          const list = Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);
          if (list.length > 0) {
            const years = list.map((p: any) => p.anio).sort((a: number, b: number) => b - a);
            setCurrentYear(years[0].toString());
          }
        }
      } catch (error) {
        console.error("Error al obtener el año actual:", error);
      }
    };
    initializeYear();
  }, []);

  useEffect(() => {
    if (currentYear) {
      fetchDisponibilidad(currentYear);
    }
  }, [currentYear]);

  const fetchDisponibilidad = async (year: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/docente/disponibilidad-cursos/${year}`);
      if (response.data.success) {
        setCursosDisponibles(response.data.data);
      }
    } catch (error) {
      console.error("Error al cargar disponibilidad:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBuscar = async () => {
    if (!formData.dni || formData.dni.length !== 8) {
      alert("Por favor, ingrese un DNI válido de 8 dígitos");
      return;
    }

    setSearching(true);
    try {
      const response = await axios.get<DniResponse>(
        `http://localhost:3000/api/dni/buscar-dni/${formData.dni}`
      );

      if (response.data.status) {
        const d = response.data.data;
        setFormData((prev) => ({
          ...prev,
          nombres: d.first_name || d.nombres || d.nombre || "",
          apellido_paterno: d.first_last_name || d.apellidoPaterno || "",
          apellido_materno: d.second_last_name || d.apellidoMaterno || "",
        }));
      }
    } catch (error) {
      console.error("Error al buscar DNI:", error);
      alert("Error al buscar el DNI");
    } finally {
      setSearching(false);
    }
  };

  const handleCursoChange = (
    idCurso: number,
    idGrado: number,
    checked: boolean
  ) => {
    setCursosAsignados((prev) => {
      if (checked) {
        return [...prev, { idCurso, idGrado }];
      }
      return prev.filter(
        (curso) => !(curso.idCurso === idCurso && curso.idGrado === idGrado)
      );
    });
  };

  const handleGuardar = async () => {
    setLoading(true);
    try {
      const payload = {
        ...formData,
        cursos_asignados: cursosAsignados,
      };

      const { data } = await axios.post<ApiResponse>(
        "http://localhost:3000/api/docente/registrar-docente",
        payload
      );

      if (data.success) {
        setCredenciales(data.credenciales);
        alert("Docente registrado exitosamente");
        setFormData({
          dni: "",
          nombres: "",
          apellido_paterno: "",
          apellido_materno: "",
          fecha_nacimiento: "",
          sexo: "M",
          email: "",
          telefono: "",
          direccion: "",
          especialidad: "",
          grado_academico: "",
        });
        setCursosAsignados([]);
        fetchDisponibilidad(currentYear);
      }
    } catch (error) {
      alert("Error al registrar el docente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900">Registro de Docente</h1>
        <p className="text-sm text-slate-600 mt-1">Complete los datos del docente y asigne sus cursos</p>
      </div>

      {credenciales && (
        <div className="bg-green-50 border border-green-200 rounded p-3 mb-4">
          <h3 className="text-sm font-semibold text-green-800 mb-2">Credenciales Generadas</h3>
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-green-700 font-medium">Usuario:</span>
              <span className="ml-2 text-green-600">{credenciales.username}</span>
            </div>
            <div>
              <span className="text-green-700 font-medium">Contraseña:</span>
              <span className="ml-2 text-green-600">{credenciales.password}</span>
            </div>
          </div>
        </div>
      )}

      <Card className="border border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Datos Personales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* DNI + Buscar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <Label className="text-xs font-medium text-slate-700">DNI</Label>
              <Input
                name="dni"
                value={formData.dni}
                onChange={handleInputChange}
                placeholder="Número de documento"
                className="mt-1 h-9 bg-white border border-slate-300 rounded px-3 text-sm focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleBuscar} className="h-9 w-full" disabled={searching}>
                {searching ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Search className="w-4 h-4 mr-2" />
                )}
                {searching ? "Buscando..." : "Buscar"}
              </Button>
            </div>
          </div>

          {/* Nombres y Apellidos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label className="text-xs font-medium text-slate-700">Nombres</Label>
              <Input
                name="nombres"
                value={formData.nombres}
                onChange={handleInputChange}
                className="mt-1 h-9 bg-white border border-slate-300 rounded px-3 text-sm focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500"
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-slate-700">Apellido Paterno</Label>
              <Input
                name="apellido_paterno"
                value={formData.apellido_paterno}
                onChange={handleInputChange}
                className="mt-1 h-9 bg-white border border-slate-300 rounded px-3 text-sm focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500"
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-slate-700">Apellido Materno</Label>
              <Input
                name="apellido_materno"
                value={formData.apellido_materno}
                onChange={handleInputChange}
                className="mt-1 h-9 bg-white border border-slate-300 rounded px-3 text-sm focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500"
              />
            </div>
          </div>

          {/* Fecha, Sexo, Email */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label className="text-xs font-medium text-slate-700">Fecha de Nacimiento</Label>
              <Input
                name="fecha_nacimiento"
                type="date"
                value={formData.fecha_nacimiento}
                onChange={handleInputChange}
                className="mt-1 h-9 bg-white border border-slate-300 rounded px-3 text-sm focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500"
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-slate-700">Sexo</Label>
              <Select
                value={formData.sexo}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, sexo: value }))}
              >
                <SelectTrigger className="mt-1 h-9 bg-white border border-slate-300 rounded px-3 text-sm focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500">
                  <SelectValue placeholder="Seleccione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="M" className="text-sm">Masculino</SelectItem>
                  <SelectItem value="F" className="text-sm">Femenino</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-medium text-slate-700">Email</Label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 h-9 bg-white border border-slate-300 rounded px-3 text-sm focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500"
              />
            </div>
          </div>

          {/* Teléfono, Especialidad, Grado Académico */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label className="text-xs font-medium text-slate-700">Teléfono</Label>
              <Input
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className="mt-1 h-9 bg-white border border-slate-300 rounded px-3 text-sm focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500"
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-slate-700">Especialidad</Label>
              <Input
                name="especialidad"
                value={formData.especialidad}
                onChange={handleInputChange}
                className="mt-1 h-9 bg-white border border-slate-300 rounded px-3 text-sm focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500"
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-slate-700">Grado Académico</Label>
              <Input
                name="grado_academico"
                value={formData.grado_academico}
                onChange={handleInputChange}
                className="mt-1 h-9 bg-white border border-slate-300 rounded px-3 text-sm focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500"
              />
            </div>
          </div>

          {/* Dirección */}
          <div>
            <Label className="text-xs font-medium text-slate-700">Dirección</Label>
            <Input
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              className="mt-1 h-9 bg-white border border-slate-300 rounded px-3 text-sm focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500"
            />
          </div>

          {/* Cursos y Grados */}
          <div className="border border-slate-200 rounded p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">Cursos y Grados</h3>
              <span className="text-xs text-slate-500">
                {cursosAsignados.length} seleccionado(s)
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start h-9 text-sm">
                  {cursosAsignados.length > 0
                    ? `${cursosAsignados.length} curso(s) seleccionado(s)`
                    : "Seleccionar cursos y grados"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-64 overflow-y-auto w-[350px] p-4">
                {cursosDisponibles.map((curso) => (
                  <div key={curso.id_curso} className="space-y-2 mb-4">
                    <div className="text-sm font-semibold border-b pb-1 text-slate-700">{curso.nombre}</div>
                    <div className="grid grid-cols-3 gap-2">
                      {curso.grados.map((grado) => (
                        <div
                          key={grado.id_grado}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`${curso.id_curso}-${grado.id_grado}`}
                            checked={cursosAsignados.some(
                              (c) =>
                                c.idCurso === curso.id_curso && c.idGrado === grado.id_grado
                            )}
                            disabled={grado.ocupado}
                            onCheckedChange={(checked) =>
                              handleCursoChange(
                                curso.id_curso,
                                grado.id_grado,
                                Boolean(checked)
                              )
                            }
                          />
                          <Label
                            htmlFor={`${curso.id_curso}-${grado.id_grado}`}
                            className={`text-sm cursor-pointer ${grado.ocupado ? 'text-gray-400 line-through' : ''}`}
                            title={grado.ocupado ? "Grado ya ocupado" : ""}
                          >
                            {grado.numero_grado}° {grado.ocupado && "(Ocupado)"}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={handleGuardar} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Registrando...
                </>
              ) : (
                "Guardar Docente"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
