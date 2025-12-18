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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  fetchDebtorsReport,
  fetchGradesList,
  fetchDailyPayments,
  type DebtorReportItem,
  type DailyPayment
} from "@/services/dashboardService";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FileDown, Printer, Banknote } from 'lucide-react';

// Configuración de axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
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

  // Estados para el reporte
  const [viewMode, setViewMode] = useState<'search' | 'report' | 'daily'>('search');
  const [reportData, setReportData] = useState<DebtorReportItem[]>([]);
  const [dailyPayments, setDailyPayments] = useState<DailyPayment[]>([]);
  const [grades, setGrades] = useState<string[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string>("Todos");
  const [selectedStatus, setSelectedStatus] = useState<string>("Deuda");
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [isReportLoading, setIsReportLoading] = useState(false);
  const [isDailyLoading, setIsDailyLoading] = useState(false);

  // Cargar grados al montar
  useState(() => {
    const loadGrades = async () => {
      try {
        const gradesList = await fetchGradesList();
        setGrades(gradesList);
      } catch (error) {
        console.error("Error loading grades:", error);
      }
    };
    loadGrades();
  });

  const handleSearchReport = async () => {
    setIsReportLoading(true);
    try {
      const data = await fetchDebtorsReport(selectedGrade, selectedStatus, selectedYear);
      setReportData(data);
    } catch (error) {
      console.error("Error fetching report:", error);
    } finally {
      setIsReportLoading(false);
    }
  };

  const handleLoadDailyReport = async () => {
    setIsDailyLoading(true);
    try {
      const data = await fetchDailyPayments();
      setDailyPayments(data);
    } catch (error) {
      console.error("Error fetching daily payments:", error);
    } finally {
      setIsDailyLoading(false);
    }
  };

  const handleExportExcel = () => {
    if (reportData.length === 0) {
      alert("No hay datos para exportar");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(reportData.map(item => ({
      "DNI": item.dni,
      "Estudiante": item.studentName,
      "Grado": item.grade,
      "Sección": item.section,
      "Estado": item.status,
      "Deuda (S/)": item.amountOwed,
      "Meses": item.monthsOwed,
      "Último Pago": item.lastPaymentDate,
      "Año": item.year
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte Deudores");
    XLSX.writeFile(workbook, `Reporte_Deudores_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handlePrintReceipt = (payment: DailyPayment) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.text('RECIBO DE PAGO', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Institución Educativa "Mi Cole"', 105, 30, { align: 'center' });
    doc.text(`RUC: 20123456789`, 105, 36, { align: 'center' });

    // Receipt Info
    doc.setFontSize(10);
    doc.text(`N° Recibo: ${payment.receiptNumber}`, 150, 50);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 150, 56);
    doc.text(`Hora: ${payment.time}`, 150, 62);

    // Student Info
    doc.text(`Estudiante: ${payment.studentName}`, 20, 50);
    doc.text(`DNI: ${payment.dni}`, 20, 56);

    // Payment Details Table
    autoTable(doc, {
      startY: 70,
      head: [['Concepto', 'Método de Pago', 'Importe']],
      body: [
        [payment.concept, payment.method, `S/ ${payment.amount.toFixed(2)}`]
      ],
      theme: 'grid',
      headStyles: { fillColor: [66, 66, 66] }
    });

    // Total
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL PAGADO: S/ ${payment.amount.toFixed(2)}`, 140, finalY);

    // Footer
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text('Gracias por su pago.', 105, finalY + 20, { align: 'center' });
    doc.text('Este documento es un comprobante de pago válido.', 105, finalY + 25, { align: 'center' });

    doc.save(`Recibo_${payment.receiptNumber}.pdf`);
  };

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
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestión de Cuotas</h1>
          <p className="text-gray-600 dark:text-gray-400">Consulta y gestión de cuotas estudiantiles</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('search')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'search'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
              }`}
          >
            Búsqueda Individual
          </button>
          <button
            onClick={() => {
              setViewMode('report');
              if (reportData.length === 0) handleSearchReport();
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'report'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
              }`}
          >
            Reporte General
          </button>
          <button
            onClick={() => {
              setViewMode('daily');
              handleLoadDailyReport();
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewMode === 'daily'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
              }`}
          >
            Caja Diaria
          </button>
        </div>
      </div>

      {viewMode === 'daily' ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Banknote className="w-5 h-5 text-green-600" />
                Caja Diaria - {new Date().toLocaleDateString()}
              </CardTitle>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Recaudado Hoy</p>
                <p className="text-2xl font-bold text-green-600">
                  S/ {dailyPayments.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hora</TableHead>
                  <TableHead>Recibo</TableHead>
                  <TableHead>Estudiante</TableHead>
                  <TableHead>Concepto</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                  <TableHead className="text-center">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isDailyLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">Cargando movimientos...</TableCell>
                  </TableRow>
                ) : dailyPayments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No hay movimientos registrados hoy
                    </TableCell>
                  </TableRow>
                ) : (
                  dailyPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.time}</TableCell>
                      <TableCell>{payment.receiptNumber}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{payment.studentName}</p>
                          <p className="text-xs text-gray-500">{payment.dni}</p>
                        </div>
                      </TableCell>
                      <TableCell>{payment.concept}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell className="text-right font-bold">S/ {payment.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePrintReceipt(payment)}
                          title="Imprimir Recibo"
                        >
                          <Printer className="w-4 h-4 text-gray-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : viewMode === 'report' ? (
        <div className="space-y-6">
          {/* Filtros del Reporte */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Filtros de Reporte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Año
                  </label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar año" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Grado
                  </label>
                  <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar grado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todos">Todos</SelectItem>
                      {grades.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Estado
                  </label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todos">Todos</SelectItem>
                      <SelectItem value="Deuda">Con Deuda</SelectItem>
                      <SelectItem value="Al día">Al día</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end gap-2">
                  <Button
                    onClick={handleSearchReport}
                    disabled={isReportLoading}
                    className="flex-1"
                  >
                    {isReportLoading ? 'Generando...' : 'Generar Reporte'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleExportExcel}
                    disabled={reportData.length === 0}
                    title="Exportar a Excel"
                  >
                    <FileDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resultados del Reporte */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Resultados del Reporte</CardTitle>
                <Badge variant="outline" className="text-base px-3 py-1">
                  Total: {reportData.length} estudiantes
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Estudiante</TableHead>
                    <TableHead>Grado y Sección</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Deuda Total</TableHead>
                    <TableHead className="text-center">Meses</TableHead>
                    <TableHead>Último Pago</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No se encontraron resultados con los filtros seleccionados
                      </TableCell>
                    </TableRow>
                  ) : (
                    reportData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{item.studentName}</p>
                            <p className="text-xs text-gray-500">DNI: {item.dni}</p>
                          </div>
                        </TableCell>
                        <TableCell>{item.grade} - "{item.section}"</TableCell>
                        <TableCell>
                          <Badge variant={item.status === 'Deuda' ? 'destructive' : 'default'} className={item.status === 'Al día' ? 'bg-green-500' : ''}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-bold text-red-600">
                          {item.amountOwed > 0 ? `S/ ${item.amountOwed.toFixed(2)}` : '-'}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.monthsOwed > 0 ? (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              {item.monthsOwed}
                            </Badge>
                          ) : '-'}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {new Date(item.lastPaymentDate).toLocaleDateString('es-PE')}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
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
        </>
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