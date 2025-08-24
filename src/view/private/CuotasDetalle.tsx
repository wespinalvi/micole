import { useState } from 'react';
import axios from 'axios';
import { Search, User, Calendar, DollarSign, CheckCircle, XCircle, AlertCircle, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/context/AuthContext';

// Configuración de axios
const apiClient = axios.create({
  baseURL: 'https://nodejsback-production.up.railway.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores de autenticación
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.error('Error de autenticación:', error.response?.status);
      // Aquí podrías redirigir al login o mostrar un mensaje
    }
    return Promise.reject(error);
  }
);

// Tipos de datos según la API
interface Estudiante {
  dni: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento: string;
}

interface Matricula {
  id: number;
  fecha: string;
  dni_entregado: boolean;
  certificado_estudios: boolean;
}

interface Grado {
  id: number;
  descripcion: string;
}

interface CuotaMensual {
  numero: number;
  monto: string;
  estado: string;
}

interface Cuotas {
  id: number;
  matricula: {
    monto: string;
    estado: string;
  };
  cuotas_mensuales: CuotaMensual[];
}

interface Resumen {
  total_matricula: string;
  total_cuotas: string;
  matricula_pagada: boolean;
  cuotas_pagadas: number;
}

interface Fechas {
  creado: string;
  actualizado: string;
}

interface DatosEstudiante {
  estudiante: Estudiante;
  matricula: Matricula;
  grado: Grado;
  cuotas: Cuotas;
  resumen: Resumen;
  fechas: Fechas;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: DatosEstudiante[];
}

const CuotasDetalle = () => {
  const { token, isAuthenticated } = useAuth();
  const [dni, setDni] = useState('');
  const [año, setAño] = useState(new Date().getFullYear().toString());
  const [datosEstudiante, setDatosEstudiante] = useState<DatosEstudiante | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPagoLoading, setIsPagoLoading] = useState(false);
  const [isMatriculaLoading, setIsMatriculaLoading] = useState(false);
  const [showPagoDialog, setShowPagoDialog] = useState(false);
  const [showMatriculaDialog, setShowMatriculaDialog] = useState(false);
  const [pagoPresencial, setPagoPresencial] = useState(false);
  const [pagoMatriculaPresencial, setPagoMatriculaPresencial] = useState(false);
  const [cuotaSeleccionada, setCuotaSeleccionada] = useState<CuotaMensual | null>(null);

  const buscarEstudiante = async () => {
    if (!dni.trim() || !año.trim()) {
      alert('Por favor ingrese DNI y año');
      return;
    }

    if (!token) {
      alert('No hay token de autenticación. Por favor inicie sesión.');
      return;
    }

    // Verificar si el servidor está respondiendo
    try {
      console.log('Verificando conexión con el servidor...');
      await apiClient.get('/api/health', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Servidor responde correctamente');
    } catch {
      console.log('Servidor no responde o no tiene endpoint /api/health');
    }

    setIsLoading(true);
    
    try {
      const response = await apiClient.get<ApiResponse>(
        `/api/cuotas/estudiante/${dni}/${año}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (response.data.status && response.data.data.length > 0) {
        setDatosEstudiante(response.data.data[0]);
      } else {
        setDatosEstudiante(null);
        alert('No se encontró el estudiante con el DNI proporcionado');
      }
    } catch (error) {
      console.error('Error al buscar estudiante:', error);
      setDatosEstudiante(null);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          alert('Error de autorización. Verifique sus permisos o inicie sesión nuevamente.');
        } else if (error.response?.status === 401) {
          alert('Sesión expirada. Por favor inicie sesión nuevamente.');
        } else if (error.response?.status === 404) {
          alert('No se encontró el estudiante con el DNI proporcionado.');
        } else {
          alert(`Error al buscar el estudiante: ${error.response?.data?.message || error.message}`);
        }
      } else {
        alert('Error inesperado al buscar el estudiante.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado.toUpperCase()) {
      case 'PAGADO':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3" /> Pagado</Badge>;
      case 'PENDIENTE':
        return <Badge variant="secondary"><AlertCircle className="w-3 h-3" /> Pendiente</Badge>;
      case 'VENCIDO':
        return <Badge variant="destructive"><XCircle className="w-3 h-3" /> Vencido</Badge>;
      default:
        return <Badge variant="outline">{estado}</Badge>;
    }
  };

  const handlePagoPresencial = (cuota: CuotaMensual) => {
    setCuotaSeleccionada(cuota);
    setShowPagoDialog(true);
  };

  const handlePagoMatriculaPresencial = () => {
    setShowMatriculaDialog(true);
  };

  const confirmarPago = async () => {
    if (!pagoPresencial) {
      alert('Debe activar el switch para confirmar el pago presencial');
      return;
    }

    if (!datosEstudiante || !cuotaSeleccionada) {
      alert('Error: No hay datos de estudiante o cuota seleccionada');
      return;
    }

    setIsPagoLoading(true);

    try {
      console.log('Intentando pago con datos:', {
        dni_estudiante: datosEstudiante.estudiante.dni,
        anio: año,
        tipo_cuota: cuotaSeleccionada.numero.toString(),
        pagado: true
      });

      // Verificar si el endpoint existe
      console.log('URL completa:', `${apiClient.defaults.baseURL}/api/cuotas/marcar-pagada`);

      // Intentar primero con POST
      let response;
      try {
        response = await apiClient.post(
          '/api/cuotas/marcar-pagada',
          {
            dni_estudiante: datosEstudiante.estudiante.dni,
            anio: año,
            tipo_cuota: cuotaSeleccionada.numero.toString(),
            pagado: true
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
      } catch {
        console.log('POST falló, intentando con PUT...');
        // Si POST falla, intentar con PUT
        response = await apiClient.put(
          '/api/cuotas/marcar-pagada',
          {
            dni_estudiante: datosEstudiante.estudiante.dni,
            anio: año,
            tipo_cuota: cuotaSeleccionada.numero.toString(),
            pagado: true
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
      }

      if (response.data.status) {
        // Actualizar el estado local
        const cuotasActualizadas = datosEstudiante.cuotas.cuotas_mensuales.map(cuota =>
          cuota.numero === cuotaSeleccionada.numero
            ? { ...cuota, estado: 'PAGADO' }
            : cuota
        );

        setDatosEstudiante({
          ...datosEstudiante,
          cuotas: {
            ...datosEstudiante.cuotas,
            cuotas_mensuales: cuotasActualizadas
          }
        });

        setShowPagoDialog(false);
        setPagoPresencial(false);
        setCuotaSeleccionada(null);
        alert('Pago registrado exitosamente');
      } else {
        alert('Error al registrar el pago: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error al registrar pago:', error);
      if (axios.isAxiosError(error)) {
        alert(`Error al registrar el pago: ${error.response?.data?.message || error.message}`);
      } else {
        alert('Error inesperado al registrar el pago');
      }
    } finally {
      setIsPagoLoading(false);
    }
  };

  const confirmarPagoMatricula = async () => {
    if (!pagoMatriculaPresencial) {
      alert('Debe activar el switch para confirmar el pago presencial de matrícula');
      return;
    }

    if (!datosEstudiante) {
      alert('Error: No hay datos de estudiante');
      return;
    }

    setIsMatriculaLoading(true);

    try {
      console.log('Intentando pago de matrícula con datos:', {
        dni_estudiante: datosEstudiante.estudiante.dni,
        anio: año,
        tipo_cuota: "matricula",
        pagado: true
      });

      // Intentar primero con POST
      let response;
      try {
                  response = await apiClient.post(
            '/api/cuotas/marcar-pagada',
            {
              dni_estudiante: datosEstudiante.estudiante.dni,
              anio: año,
              tipo_cuota: "matricula", // Para matrícula
              pagado: true
            },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
      } catch {
        console.log('POST falló para matrícula, intentando con PUT...');
        // Si POST falla, intentar con PUT
        response = await apiClient.put(
          '/api/cuotas/marcar-pagada',
          {
            dni_estudiante: datosEstudiante.estudiante.dni,
            anio: año,
            tipo_cuota: "matricula", // Para matrícula
            pagado: true
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
      }

      if (response.data.status) {
        // Actualizar el estado local
        setDatosEstudiante({
          ...datosEstudiante,
          cuotas: {
            ...datosEstudiante.cuotas,
            matricula: {
              ...datosEstudiante.cuotas.matricula,
              estado: 'PAGADO'
            }
          }
        });

        setShowMatriculaDialog(false);
        setPagoMatriculaPresencial(false);
        alert('Pago de matrícula registrado exitosamente');
      } else {
        alert('Error al registrar el pago de matrícula: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error al registrar pago de matrícula:', error);
      if (axios.isAxiosError(error)) {
        alert(`Error al registrar el pago de matrícula: ${error.response?.data?.message || error.message}`);
      } else {
        alert('Error inesperado al registrar el pago de matrícula');
      }
    } finally {
      setIsMatriculaLoading(false);
    }
  };

  // Calcular totales basados en los datos de la API
  const totalPendiente = datosEstudiante 
    ? parseFloat(datosEstudiante.cuotas.matricula.monto) + 
      datosEstudiante.cuotas.cuotas_mensuales
        .filter(cuota => cuota.estado === 'PENDIENTE')
        .reduce((sum, cuota) => sum + parseFloat(cuota.monto), 0)
    : 0;

  const totalPagado = datosEstudiante
    ? datosEstudiante.cuotas.cuotas_mensuales
        .filter(cuota => cuota.estado === 'PAGADO')
        .reduce((sum, cuota) => sum + parseFloat(cuota.monto), 0)
    : 0;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestión de Cuotas</h1>
          <p className="text-gray-600 dark:text-gray-400">Consulta y gestión de cuotas estudiantiles</p>
        </div>
      </div>

      {/* Formulario de búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Buscar Estudiante
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isAuthenticated && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-yellow-800 text-sm">
                ⚠️ No está autenticado. Algunas funciones pueden no estar disponibles.
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                DNI del Estudiante
              </label>
              <Input
                type="text"
                placeholder="Ingrese DNI"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                maxLength={8}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Año Académico
              </label>
              <Input
                type="number"
                placeholder="Año"
                value={año}
                onChange={(e) => setAño(e.target.value)}
                min="2020"
                max="2030"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={buscarEstudiante} 
                disabled={isLoading || !isAuthenticated}
                className="w-full"
              >
                {isLoading ? 'Buscando...' : 'Buscar'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información del estudiante */}
      {datosEstudiante && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Información del Estudiante
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">Nombre Completo</p>
                <p className="font-semibold">
                  {datosEstudiante.estudiante.nombre} {datosEstudiante.estudiante.apellido_paterno} {datosEstudiante.estudiante.apellido_materno}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">DNI</p>
                <p className="font-semibold">{datosEstudiante.estudiante.dni}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">Grado</p>
                <p className="font-semibold">{datosEstudiante.grado.descripcion}°</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">Matrícula</p>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-green-600">S/ {parseFloat(datosEstudiante.cuotas.matricula.monto).toFixed(2)}</p>
                  {datosEstudiante.cuotas.matricula.estado === 'PENDIENTE' && (
                    <Button
                      size="sm"
                      onClick={handlePagoMatriculaPresencial}
                      disabled={isMatriculaLoading}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CreditCard className="w-4 h-4 mr-1" />
                      {isMatriculaLoading ? 'Procesando...' : 'Pago Presencial'}
                    </Button>
                  )}
                </div>
                <div className="mt-1">
                  {getEstadoBadge(datosEstudiante.cuotas.matricula.estado)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resumen de cuotas */}
      {datosEstudiante && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Pagado</p>
                  <p className="text-xl font-bold text-green-600">S/ {totalPagado.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Pendiente</p>
                  <p className="text-xl font-bold text-orange-600">S/ {totalPendiente.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Año Académico</p>
                  <p className="text-xl font-bold text-blue-600">{año}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabla de cuotas */}
      {datosEstudiante && datosEstudiante.cuotas.cuotas_mensuales.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Detalle de Cuotas - {año}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {datosEstudiante.cuotas.cuotas_mensuales.map((cuota) => (
                  <TableRow key={cuota.numero}>
                    <TableCell className="font-medium">Cuota {cuota.numero}</TableCell>
                    <TableCell>S/ {parseFloat(cuota.monto).toFixed(2)}</TableCell>
                    <TableCell>{getEstadoBadge(cuota.estado)}</TableCell>
                    <TableCell>
                      {cuota.estado === 'PENDIENTE' && (
                        <Button
                          size="sm"
                          onClick={() => handlePagoPresencial(cuota)}
                          disabled={isPagoLoading}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CreditCard className="w-4 h-4 mr-1" />
                          {isPagoLoading ? 'Procesando...' : 'Pago Presencial'}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Dialog de confirmación de pago de cuota */}
      <Dialog open={showPagoDialog} onOpenChange={setShowPagoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Pago Presencial</DialogTitle>
            <DialogDescription>
              ¿Está seguro de que desea registrar el pago presencial para la cuota número {cuotaSeleccionada?.numero}?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">Detalles del Pago:</h4>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Cuota:</span> Número {cuotaSeleccionada?.numero}</p>
                <p><span className="font-medium">Monto:</span> S/ {cuotaSeleccionada ? parseFloat(cuotaSeleccionada.monto).toFixed(2) : '0.00'}</p>
                <p><span className="font-medium">Fecha:</span> {new Date().toLocaleDateString('es-ES')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={pagoPresencial}
                onCheckedChange={setPagoPresencial}
                id="pago-presencial"
              />
              <label htmlFor="pago-presencial" className="text-sm font-medium">
                Confirmo que el pago se realizó presencialmente
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPagoDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmarPago} disabled={!pagoPresencial || isPagoLoading}>
              {isPagoLoading ? 'Procesando...' : 'Confirmar Pago'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmación de pago de matrícula */}
      <Dialog open={showMatriculaDialog} onOpenChange={setShowMatriculaDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Pago Presencial de Matrícula</DialogTitle>
            <DialogDescription>
              ¿Está seguro de que desea registrar el pago presencial de la matrícula?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">Detalles del Pago:</h4>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Concepto:</span> Matrícula</p>
                <p><span className="font-medium">Monto:</span> S/ {datosEstudiante ? parseFloat(datosEstudiante.cuotas.matricula.monto).toFixed(2) : '0.00'}</p>
                <p><span className="font-medium">Fecha:</span> {new Date().toLocaleDateString('es-ES')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={pagoMatriculaPresencial}
                onCheckedChange={setPagoMatriculaPresencial}
                id="pago-matricula-presencial"
              />
              <label htmlFor="pago-matricula-presencial" className="text-sm font-medium">
                Confirmo que el pago de matrícula se realizó presencialmente
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMatriculaDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmarPagoMatricula} disabled={!pagoMatriculaPresencial || isMatriculaLoading}>
              {isMatriculaLoading ? 'Procesando...' : 'Confirmar Pago'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CuotasDetalle;