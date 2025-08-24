import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";

interface CursoAsignado {
  idCurso: number;
  idGrado: number;
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
    nombres: string;
    apellidoMaterno: string;
    apellidoPaterno: string;
    nombre: string;
    numeroDocumento: string;
  };
}

export default function RegisterTeacher() {
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [email, setEmail] = useState("");
  const [cursosAsignados, setCursosAsignados] = useState<CursoAsignado[]>([]);
  const [loading, setLoading] = useState(false);
  const [credenciales, setCredenciales] = useState<Credenciales | null>(null);

  const cursosDisponibles = [
    { id: 1, nombre: "Matemática", grados: [1, 2, 3, 4, 5] },
    { id: 2, nombre: "Comunicación", grados: [1, 2, 3, 4, 5] },
    { id: 3, nombre: "Ciencia", grados: [1, 2, 3, 4, 5] },
    { id: 4, nombre: "Historia", grados: [1, 2, 3, 4, 5] },
    { id: 5, nombre: "Educación Física", grados: [1, 2, 3, 4, 5] },
    { id: 6, nombre: "Arte", grados: [1, 2, 3, 4, 5] },
    { id: 7, nombre: "Música", grados: [1, 2, 3, 4, 5] },
    { id: 8, nombre: "Biología", grados: [1, 2, 3, 4, 5] },
    { id: 9, nombre: "Química", grados: [1, 2, 3, 4, 5] },
    { id: 10, nombre: "Física", grados: [1, 2, 3, 4, 5] },
  ];

  const handleBuscar = async () => {
    if (!dni || dni.length !== 8) {
      alert("Por favor, ingrese un DNI válido de 8 dígitos");
      return;
    }

    try {
      console.log("Intentando buscar DNI:", dni);
      const response = await axios.get<DniResponse>(
        `https://nodejsback-production.up.railway.app/api/dni/buscar-dni/${dni}`
      );
      console.log("Respuesta del servidor:", response.data);

      if (response.data.status) {
        // Rellenar automáticamente los inputs con los datos recibidos
        setNombre(response.data.data.nombres);
        setApellidoPaterno(response.data.data.apellidoPaterno);
        setApellidoMaterno(response.data.data.apellidoMaterno);
      }
    } catch (error) {
      console.error("Error completo:", error);

      if (axios.isAxiosError(error)) {
        console.log("Detalles del error:", {
          url: error.config?.url,
          method: error.config?.method,
          status: error.response?.status,
          data: error.response?.data,
        });

        if (error.response?.status === 500) {
          alert(
            "Error en el servidor. Por favor, verifique que el servidor esté funcionando correctamente."
          );
        } else if (error.response?.data?.message) {
          alert(error.response.data.message);
        } else {
          alert(
            "Error al buscar el DNI. Por favor, verifique que el DNI sea correcto."
          );
        }
      } else {
        alert("Error al buscar el DNI");
      }
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
        dni,
        nombre,
        ap_p: apellidoPaterno,
        ap_m: apellidoMaterno,
        fecha_nacimiento: fechaNacimiento,
        username: `${nombre.toLowerCase()}${apellidoPaterno
          .toLowerCase()
          .charAt(0)}`,
        email,
        password: `${nombre.toLowerCase()}${dni.slice(-4)}`,
        role_id: 2,
        cursos_asignados: cursosAsignados,
      };

      const { data } = await axios.post<ApiResponse>(
        "https://nodejsback-production.up.railway.app/api/docente/registrar-docente",
        payload
      );

      if (data.success) {
        setCredenciales(data.credenciales);
        // Limpiar el formulario
        setDni("");
        setNombre("");
        setApellidoPaterno("");
        setApellidoMaterno("");
        setFechaNacimiento("");
        setEmail("");
        setCursosAsignados([]);
      }
    } catch (error) {
      alert("Error al registrar el docente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {credenciales && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Credenciales Generadas
          </h3>
          <div className="space-y-2">
            <div>
              <span className="font-medium text-green-700">Usuario:</span>
              <span className="ml-2 text-green-600">
                {credenciales.username}
              </span>
            </div>
            <div>
              <span className="font-medium text-green-700">Contraseña:</span>
              <span className="ml-2 text-green-600">
                {credenciales.password}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="border rounded-md p-6 space-y-4">
        <h2 className="text-lg font-semibold">Registro de Docente</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1 sm:col-span-2 flex gap-2 items-end">
            <div className="flex-1">
              <Label>DNI</Label>
              <Input value={dni} onChange={(e) => setDni(e.target.value)} />
            </div>
            <Button onClick={handleBuscar}>Buscar</Button>
          </div>

          <div>
            <Label>Nombre</Label>
            <Input value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div>
            <Label>Apellido Paterno</Label>
            <Input
              value={apellidoPaterno}
              onChange={(e) => setApellidoPaterno(e.target.value)}
            />
          </div>
          <div>
            <Label>Apellido Materno</Label>
            <Input
              value={apellidoMaterno}
              onChange={(e) => setApellidoMaterno(e.target.value)}
            />
          </div>
          <div>
            <Label>Fecha de Nacimiento</Label>
            <Input
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="sm:col-span-2">
            <Label>Cursos y Grados</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  {cursosAsignados.length > 0
                    ? `${cursosAsignados.length} curso(s) seleccionado(s)`
                    : "Seleccionar cursos y grados"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-64 overflow-y-auto w-72 p-2">
                {cursosDisponibles.map((curso) => (
                  <div key={curso.id} className="space-y-2">
                    <div className="font-medium">{curso.nombre}</div>
                    <div className="grid grid-cols-5 gap-1">
                      {curso.grados.map((grado) => (
                        <div
                          key={grado}
                          className="flex items-center space-x-1"
                        >
                          <Checkbox
                            id={`${curso.id}-${grado}`}
                            checked={cursosAsignados.some(
                              (c) =>
                                c.idCurso === curso.id && c.idGrado === grado
                            )}
                            onCheckedChange={(checked) =>
                              handleCursoChange(
                                curso.id,
                                grado,
                                Boolean(checked)
                              )
                            }
                          />
                          <Label
                            htmlFor={`${curso.id}-${grado}`}
                            className="text-sm cursor-pointer"
                          >
                            {grado}°
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleGuardar} disabled={loading}>
            {loading ? "Registrando..." : "Guardar Docente"}
          </Button>
        </div>
      </div>
    </div>
  );
}
