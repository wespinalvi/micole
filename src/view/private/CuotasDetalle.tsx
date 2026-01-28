import { useState, useEffect, Fragment } from 'react';
import api from "@/lib/axios";
import axios from 'axios';
import { Search, User, Calendar, DollarSign, CheckCircle, XCircle, AlertCircle, CreditCard, ChevronDown, ChevronRight, FileDown, Printer, Banknote } from 'lucide-react';
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
  type DailyPayment,
  type Grade as GradeFromService
} from "@/services/dashboardService";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Tipos de datos según la respuesta REAL de la API
interface PagoDetalle {
  id: number;
  id_matricula: number;
  tipo: string; // "Matricula" o "Cuota"
  numero_cuota: number | null;
  monto: string;
  fecha_vencimiento: string;
  fecha_pago: string | null;
  monto_pagado: string;
  estado: string; // "Pendiente", "Pagado", "Parcial"
  metodo_pago: string | null;
  numero_recibo: string | null;
  observaciones: string | null;
  created_at: string;
  updated_at: string;
}

interface ResumenEstudiante {
  id_matricula: number;
  id_alumno: number;
  id_periodo: number;
  total_cuotas: number;
  monto_total: string;
  total_pagado: string;
  saldo_pendiente: string;
  cuotas_pagadas: string;
  cuotas_pendientes: string;
  cuotas_vencidas: string;
}

interface DatosEstudiante {
  estudiante: string;
  grado: string;
  anio: string;
  resumen: ResumenEstudiante;
  detalle: PagoDetalle[];
  dni: string;
}

interface SearchApiResponse {
  status: boolean;
  message?: string;
  data: DatosEstudiante;
}

const CuotasDetalle = () => {
  const { token } = useAuth();
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
  const [cuotaSeleccionada, setCuotaSeleccionada] = useState<PagoDetalle | null>(null);

  // Estados para el reporte
  const [viewMode, setViewMode] = useState<'search' | 'report' | 'daily'>('search');
  const [reportData, setReportData] = useState<DebtorReportItem[]>([]);
  const [dailyPayments, setDailyPayments] = useState<DailyPayment[]>([]);
  const [grades, setGrades] = useState<GradeFromService[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string>("Todos");
  const [selectedStatus, setSelectedStatus] = useState<string>("Deuda");
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [isReportLoading, setIsReportLoading] = useState(false);
  const [isDailyLoading, setIsDailyLoading] = useState(false);
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);

  // Cargar grados al montar
  useEffect(() => {
    const loadGrades = async () => {
      try {
        const gradesList = await fetchGradesList();
        setGrades(gradesList);
      } catch (error) {
        console.error("Error loading grades:", error);
      }
    };
    loadGrades();
  }, []);

  const toggleExpand = (dni: string) => {
    setExpandedStudent(expandedStudent === dni ? null : dni);
  };

  const handleSearchReport = async () => {
    setIsReportLoading(true);
    setExpandedStudent(null);
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
      console.error("Error fetching daily report:", error);
    } finally {
      setIsDailyLoading(false);
    }
  };

  const handleExportExcel = () => {
    const dataToExport = reportData.map(item => ({
      DNI: item.dni,
      Estudiante: item.studentName,
      Grado: item.grade,
      Estado: item.status,
      'Deuda Total': `S/ ${item.amountOwed.toFixed(2)}`,
      'Meses Pendientes': item.monthsOwed,
      'Último Pago': item.lastPaymentDate === 'Sin pagos' ? 'Sin pagos' : new Date(item.lastPaymentDate).toLocaleDateString(),
      Año: item.year
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reporte_Deudores");
    XLSX.writeFile(wb, `Reporte_Deudores_${selectedGrade}_${selectedYear}.xlsx`);
  };

  const handlePrintReceipt = (payment: DailyPayment) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('RECIBO DE PAGO', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Institución Educativa "Mi Cole"', 105, 30, { align: 'center' });
    doc.text(`N° Recibo: ${payment.receiptNumber}`, 150, 50);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 150, 56);
    doc.text(`Estudiante: ${payment.studentName}`, 20, 50);
    doc.text(`DNI: ${payment.dni}`, 20, 56);

    autoTable(doc, {
      startY: 70,
      head: [['Concepto', 'Método de Pago', 'Importe']],
      body: [[payment.concept, payment.method, `S/ ${payment.amount.toFixed(2)}`]],
      theme: 'grid',
      headStyles: { fillColor: [66, 66, 66] }
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL PAGADO: S/ ${payment.amount.toFixed(2)}`, 140, finalY);
    doc.save(`Recibo_${payment.receiptNumber}.pdf`);
  };

  const buscarEstudiante = async () => {
    if (!dni.trim() || !año.trim()) {
      alert('Por favor ingrese DNI y año');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.get<SearchApiResponse>(`/cuotas/estudiante/${dni}/${año}`);
      if (response.data.status && response.data.data) {
        // Asegurarnos de que el DNI esté en el objeto para la UI
        const data = response.data.data;
        if (!data.dni) data.dni = dni;
        setDatosEstudiante(data);
      } else {
        setDatosEstudiante(null);
        alert('No se encontró el estudiante con el DNI proporcionado');
      }
    } catch (error) {
      console.error('Error al buscar estudiante:', error);
      setDatosEstudiante(null);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          alert('Error de autorización. Inicie sesión nuevamente.');
        } else if (error.response?.status === 404) {
          alert('No se encontró el estudiante.');
        } else {
          alert(`Error: ${error.response?.data?.message || error.message}`);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getEstadoBadge = (estado: string) => {
    const estadoUpper = (estado || '').toUpperCase();
    switch (estadoUpper) {
      case 'PAGADO':
        return <Badge className="bg-green-100 text-green-700 border-green-200">PAGADO</Badge>;
      case 'PENDIENTE':
        return <Badge variant="destructive">PENDIENTE</Badge>;
      case 'PARCIAL':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">PARCIAL</Badge>;
      default:
        return <Badge variant="outline">{estado}</Badge>;
    }
  };

  const confirmarPago = async () => {
    if (!datosEstudiante || !cuotaSeleccionada) return;
    setIsPagoLoading(true);
    try {
      await api.post(`/cuotas/pagar`, {
        dni: datosEstudiante.dni,
        anio: año,
        tipo: 'Cuota',
        numero_cuota: cuotaSeleccionada.numero_cuota,
        metodo_pago: 'Efectivo',
        presencial: pagoPresencial
      });
      alert('Pago realizado con éxito');
      setShowPagoDialog(false);
      buscarEstudiante();
    } catch (error) {
      console.error('Error al procesar pago:', error);
      alert('Error al procesar el pago');
    } finally {
      setIsPagoLoading(false);
    }
  };

  const confirmarPagoMatricula = async () => {
    if (!datosEstudiante) return;
    setIsMatriculaLoading(true);
    try {
      await api.post(`/cuotas/pagar`, {
        dni: datosEstudiante.dni,
        anio: año,
        tipo: 'Matricula',
        metodo_pago: 'Efectivo',
        presencial: pagoMatriculaPresencial
      });
      alert('Matrícula pagada con éxito');
      setShowMatriculaDialog(false);
      buscarEstudiante();
    } catch (error) {
      console.error('Error al pagar matrícula:', error);
      alert('Error al pagar matrícula');
    } finally {
      setIsMatriculaLoading(false);
    }
  };

  const matriculaInfo = datosEstudiante?.detalle.find(p => p.tipo.toLowerCase() === 'matricula');
  const cuotasMensuales = datosEstudiante?.detalle.filter(p => p.tipo.toLowerCase() === 'cuota') || [];

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Gestión de Cuotas</h1>
          <p className="text-gray-500 mt-1">Administración de pagos y reportes de pensiones</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <Button
            variant={viewMode === 'search' ? 'default' : 'ghost'}
            onClick={() => setViewMode('search')}
            className="rounded-md"
          >
            Buscar Alumno
          </Button>
          <Button
            variant={viewMode === 'report' ? 'default' : 'ghost'}
            onClick={() => { setViewMode('report'); if (reportData.length === 0) handleSearchReport(); }}
            className="rounded-md"
          >
            Reporte Deudores
          </Button>
          <Button
            variant={viewMode === 'daily' ? 'default' : 'ghost'}
            onClick={() => { setViewMode('daily'); if (dailyPayments.length === 0) handleLoadDailyReport(); }}
            className="rounded-md"
          >
            Pagos del Día
          </Button>
        </div>
      </div>

      {viewMode === 'search' && (
        <div className="space-y-6">
          <Card className="border-none shadow-md bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-600" />
                Buscar Registro de Estudiante
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Ingrese DNI del estudiante"
                    className="pl-10 h-11"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && buscarEstudiante()}
                  />
                </div>
                <div className="relative w-full md:w-32">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Año"
                    className="pl-10 h-11"
                    value={año}
                    onChange={(e) => setAño(e.target.value)}
                  />
                </div>
                <Button
                  onClick={buscarEstudiante}
                  disabled={isLoading}
                  className="h-11 px-8 bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? 'Buscando...' : 'Buscar Alumno'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {datosEstudiante && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <Card className="border-none shadow-md overflow-hidden">
                  <div className="h-2 bg-blue-600" />
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="h-20 w-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                        <User className="h-10 w-10 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{datosEstudiante.estudiante}</h3>
                      <p className="text-gray-500 font-medium">{datosEstudiante.grado}</p>
                      <Badge variant="outline" className="mt-2">DNI: {datosEstudiante.dni}</Badge>
                    </div>
                    <div className="mt-8 space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Total Pagado</span>
                        <span className="font-bold text-green-600 font-mono">S/ {parseFloat(datosEstudiante.resumen.total_pagado).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="text-sm text-red-600">Saldo Pendiente</span>
                        <span className="font-bold text-red-600 font-mono">S/ {parseFloat(datosEstudiante.resumen.saldo_pendiente).toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                      Matrícula {año}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {matriculaInfo ? (
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Monto Matrícula</p>
                          <p className="font-bold text-lg">S/ {parseFloat(matriculaInfo.monto).toFixed(2)}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {getEstadoBadge(matriculaInfo.estado)}
                          {(matriculaInfo.estado.toUpperCase() === 'PENDIENTE' || matriculaInfo.estado.toUpperCase() === 'PARCIAL') && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setShowMatriculaDialog(true)}
                              className="text-xs h-8"
                            >
                              Registrar Pago
                            </Button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">No hay información de matrícula</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Card className="border-none shadow-md h-full">
                  <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      Cuotas Mensuales
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50/50">
                          <TableHead className="w-[100px]">Nra. Cuota</TableHead>
                          <TableHead>Vencimiento</TableHead>
                          <TableHead>Monto</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead className="text-right">Acción</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cuotasMensuales.length > 0 ? (
                          cuotasMensuales.map((cuota) => (
                            <TableRow key={cuota.id} className="hover:bg-gray-50 transition-colors">
                              <TableCell className="font-medium">Cuota {cuota.numero_cuota}</TableCell>
                              <TableCell className="text-gray-600">
                                {new Date(cuota.fecha_vencimiento).toLocaleDateString('es-ES', { day: '2-digit', month: 'long' })}
                              </TableCell>
                              <TableCell className="font-mono font-medium">S/ {parseFloat(cuota.monto).toFixed(2)}</TableCell>
                              <TableCell>{getEstadoBadge(cuota.estado)}</TableCell>
                              <TableCell className="text-right">
                                {(cuota.estado.toUpperCase() === 'PENDIENTE' || cuota.estado.toUpperCase() === 'PARCIAL') && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8"
                                    onClick={() => { setCuotaSeleccionada(cuota); setShowPagoDialog(true); }}
                                  >
                                    Pagar Presencial
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="h-32 text-center text-gray-500">
                              No se encontraron cuotas para este estudiante
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      )}

      {viewMode === 'report' && (
        <div className="space-y-6">
          <Card className="border-none shadow-md bg-white">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Reporte de Deudores {selectedYear}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleExportExcel} disabled={reportData.length === 0}>
                    <FileDown className="h-4 w-4 mr-2" />
                    Excel
                  </Button>
                  <Button size="sm" onClick={handleSearchReport} disabled={isReportLoading}>
                    {isReportLoading ? 'Buscando...' : 'Actualizar'}
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium mb-1 block">Año</label>
                  <Input value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Grado</label>
                  <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar grado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todos">Todos los grados</SelectItem>
                      {grades.map(grade => (
                        <SelectItem key={grade.id} value={grade.id.toString()}>{grade.nombre}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Estado</label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todos">Todos</SelectItem>
                      <SelectItem value="Deuda">Con Deuda</SelectItem>
                      <SelectItem value="Al día">Al día</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10"></TableHead>
                      <TableHead>Estudiante</TableHead>
                      <TableHead>Grado</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Monto Deuda</TableHead>
                      <TableHead className="text-center">Cuotas</TableHead>
                      <TableHead>Último Pago</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isReportLoading ? (
                      <TableRow><TableCell colSpan={7} className="h-32 text-center">Cargando datos...</TableCell></TableRow>
                    ) : reportData.length > 0 ? (
                      reportData.map((item) => (
                        <Fragment key={item.dni}>
                          <TableRow
                            className="cursor-pointer hover:bg-gray-50/50"
                            onClick={() => toggleExpand(item.dni)}
                          >
                            <TableCell>
                              {expandedStudent === item.dni ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            </TableCell>
                            <TableCell className="font-medium">
                              <div className="flex flex-col">
                                <span>{item.studentName}</span>
                                <span className="text-xs text-gray-500">{item.dni}</span>
                              </div>
                            </TableCell>
                            <TableCell>{item.grade}</TableCell>
                            <TableCell>
                              <Badge variant={item.status === 'Deuda' ? 'destructive' : 'default'} className="bg-opacity-10 text-opacity-100 border-none">
                                {item.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right font-mono">S/ {item.amountOwed.toFixed(2)}</TableCell>
                            <TableCell className="text-center">{item.monthsOwed}</TableCell>
                            <TableCell className="text-sm text-gray-500">
                              {item.lastPaymentDate === 'Sin pagos' ? 'Nunca' : new Date(item.lastPaymentDate).toLocaleDateString()}
                            </TableCell>
                          </TableRow>

                          {expandedStudent === item.dni && (
                            <TableRow className="bg-gray-50/30">
                              <TableCell colSpan={7} className="p-4">
                                <Card className="shadow-sm border">
                                  <Table>
                                    <TableHeader className="bg-gray-50">
                                      <TableRow>
                                        <TableHead className="text-xs h-8">Tipo</TableHead>
                                        <TableHead className="text-xs h-8">N°</TableHead>
                                        <TableHead className="text-xs h-8">Vencimiento</TableHead>
                                        <TableHead className="text-xs h-8">Monto</TableHead>
                                        <TableHead className="text-xs h-8">Pagado</TableHead>
                                        <TableHead className="text-xs h-8">Estado</TableHead>
                                        <TableHead className="text-xs h-8 font-mono">Recibo</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {item.detalle.map((det: any) => (
                                        <TableRow key={det.id} className="text-xs hover:bg-gray-50">
                                          <TableCell className="font-medium">{det.tipo}</TableCell>
                                          <TableCell>{det.numero_cuota || '-'}</TableCell>
                                          <TableCell>{new Date(det.fecha_vencimiento).toLocaleDateString()}</TableCell>
                                          <TableCell>S/ {parseFloat(det.monto).toFixed(2)}</TableCell>
                                          <TableCell>S/ {parseFloat(det.monto_pagado).toFixed(2)}</TableCell>
                                          <TableCell>{getEstadoBadge(det.estado)}</TableCell>
                                          <TableCell className="font-mono text-[10px]">{det.numero_recibo || '-'}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </Card>
                              </TableCell>
                            </TableRow>
                          )}
                        </Fragment>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={7} className="h-32 text-center">No se encontraron resultados</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {viewMode === 'daily' && (
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Pagos Registrados Hoy</span>
              <Button size="sm" onClick={handleLoadDailyReport} disabled={isDailyLoading}>
                Actualizar
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recibo</TableHead>
                  <TableHead>Estudiante</TableHead>
                  <TableHead>Concepto</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isDailyLoading ? (
                  <TableRow><TableCell colSpan={6} className="h-32 text-center">Cargando...</TableCell></TableRow>
                ) : dailyPayments.length > 0 ? (
                  dailyPayments.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-mono text-xs">{p.receiptNumber}</TableCell>
                      <TableCell>{p.studentName}</TableCell>
                      <TableCell>{p.concept}</TableCell>
                      <TableCell>{p.time}</TableCell>
                      <TableCell className="font-bold">S/ {p.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handlePrintReceipt(p)}>
                          <Printer className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={6} className="h-32 text-center">No se han registrado pagos hoy</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Dialogo Pago Cuota */}
      <Dialog open={showPagoDialog} onOpenChange={setShowPagoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Pago de Cuota</DialogTitle>
            <DialogDescription>
              Se registrará el pago de la Cuota {cuotaSeleccionada?.numero_cuota} para {datosEstudiante?.estudiante || 'el estudiante'}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span>Monto a cobrar:</span>
              <span className="font-bold text-lg">S/ {cuotaSeleccionada ? parseFloat(cuotaSeleccionada.monto).toFixed(2) : '0.00'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Switch checked={pagoPresencial} onCheckedChange={setPagoPresencial} />
              <label>¿Es pago presencial?</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPagoDialog(false)}>Cancelar</Button>
            <Button onClick={confirmarPago} disabled={isPagoLoading}>
              {isPagoLoading ? 'Procesando...' : 'Confirmar Pago'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogo Pago Matricula */}
      <Dialog open={showMatriculaDialog} onOpenChange={setShowMatriculaDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Pago de Matrícula</DialogTitle>
            <DialogDescription>
              Se registrará el pago de matrícula {año} para {datosEstudiante?.estudiante || 'el estudiante'}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span>Monto de Matrícula:</span>
              <span className="font-bold text-lg">S/ {matriculaInfo ? parseFloat(matriculaInfo.monto).toFixed(2) : '0.00'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Switch checked={pagoMatriculaPresencial} onCheckedChange={setPagoMatriculaPresencial} />
              <label>¿Es pago presencial?</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMatriculaDialog(false)}>Cancelar</Button>
            <Button onClick={confirmarPagoMatricula} disabled={isMatriculaLoading}>
              {isMatriculaLoading ? 'Procesando...' : 'Confirmar Pago'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CuotasDetalle;