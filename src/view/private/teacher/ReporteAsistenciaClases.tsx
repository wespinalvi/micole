import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Search, FileText, Download, User, Clock } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface AsistenciaDetalle {
    curso: string;
    estado: string;
    hora: string | null;
}

interface ReporteDia {
    fecha: string;
    dni: string;
    nombre_alumno: string;
    grado: string;
    entrada: AsistenciaDetalle;
    salida: AsistenciaDetalle;
    total_cursos: number;
}

export default function ReporteAsistenciaClases() {
    const [fecha, setFecha] = useState<string>(new Date().toISOString().split('T')[0]);
    const [reporte, setReporte] = useState<ReporteDia[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchReporte = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/asistencia/reporte-dia?fecha=${fecha}`);
            if (data.success) {
                setReporte(data.data || []);
            } else {
                setReporte([]);
            }
        } catch (error) {
            console.error("Error fetching daily report:", error);
            setReporte([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReporte();
    }, [fecha]);

    const filteredReporte = reporte.filter(r =>
        r.nombre_alumno.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.dni.includes(searchTerm)
    );

    const getStatusBadge = (estado: string) => {
        switch (estado?.toLowerCase()) {
            case 'presente':
                return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case 'ausente':
                return "bg-rose-50 text-rose-700 border-rose-200";
            case 'tarde':
                return "bg-amber-50 text-amber-700 border-amber-200";
            default:
                return "bg-slate-50 text-slate-700 border-slate-200";
        }
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 space-y-4 max-w-7xl">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">
                        Reporte Diario de Asistencia
                    </h1>
                    <p className="text-slate-500 text-sm flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Seguimiento consolidado de ingresos y salidas por día
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-medium text-slate-600">
                            Seleccionar Fecha
                        </label>
                        <div className="relative">
                            <Input
                                type="date"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                className="w-full sm:w-48 h-9 pl-9 text-sm"
                            />
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        className="h-9 px-4 text-xs font-medium self-end"
                        onClick={() => window.print()}
                    >
                        <Download className="h-3.5 w-3.5 mr-2" />
                        Exportar
                    </Button>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Card className="border border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg">
                            <User className="h-4 w-4 text-slate-600" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500">Total Estudiantes</p>
                            <p className="text-xl font-semibold text-slate-800">{reporte.length}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border border-emerald-200 shadow-sm bg-emerald-50/30">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                            <Clock className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-emerald-600">Presentes Hoy</p>
                            <p className="text-xl font-semibold text-emerald-700">
                                {reporte.filter(r => r.entrada.estado === 'Presente').length}
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border border-rose-200 shadow-sm bg-rose-50/30">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2 bg-rose-100 rounded-lg">
                            <FileText className="h-4 w-4 text-rose-600" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-rose-600">Inasistencias</p>
                            <p className="text-xl font-semibold text-rose-700">
                                {reporte.filter(r => r.entrada.estado !== 'Presente').length}
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg">
                            <Calendar className="h-4 w-4 text-slate-600" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500">Fecha Reporte</p>
                            <p className="text-base font-semibold text-slate-800">{format(new Date(fecha + 'T00:00:00'), "d 'de' MMM", { locale: es })}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border border-slate-200 shadow-sm">
                <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-base font-semibold text-slate-800">
                        Detalle de Asistencia
                    </CardTitle>
                    <div className="relative w-64">
                        <Input
                            placeholder="Buscar por nombre o DNI..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-8 pl-8 text-xs"
                        />
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    </div>
                </CardHeader>
                <CardContent className="p-0 mt-4">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-slate-50">
                                <TableRow>
                                    <TableHead className="w-[100px] h-10 font-medium text-xs text-slate-600 text-center">DNI</TableHead>
                                    <TableHead className="h-10 font-medium text-xs text-slate-600">Estudiante / Grado</TableHead>
                                    <TableHead className="h-10 font-medium text-xs text-slate-600 text-center">Primer Ingreso</TableHead>
                                    <TableHead className="h-10 font-medium text-xs text-slate-600 text-center">Último Marcaje</TableHead>
                                    <TableHead className="w-[80px] h-10 font-medium text-xs text-slate-600 text-center">Cursos</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-32 text-center">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <div className="h-6 w-6 border-3 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                                                <p className="text-slate-400 text-xs font-medium">Cargando reporte...</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredReporte.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-32 text-center text-slate-400">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <Search className="h-8 w-8 opacity-20" />
                                                <p className="text-sm font-medium">No se encontraron registros para esta fecha</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredReporte.map((item, idx) => {
                                        // Lógica inteligente para Entrada/Salida cuando hay valores null
                                        let displayEntrada = item.entrada;
                                        let displaySalida = item.salida;

                                        // Si la entrada no tiene hora pero la salida sí, los invertimos
                                        if (!item.entrada.hora && item.salida.hora) {
                                            displayEntrada = item.salida;
                                            displaySalida = item.entrada;
                                        }

                                        return (
                                            <TableRow key={idx} className="hover:bg-slate-50">
                                                <TableCell className="text-center">
                                                    <code className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-medium">
                                                        {item.dni}
                                                    </code>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-slate-700 text-sm">
                                                            {item.nombre_alumno}
                                                        </span>
                                                        <span className="text-xs text-slate-400">
                                                            {item.grado}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col items-center gap-1">
                                                        <Badge variant="outline" className={`px-2 py-0.5 text-xs font-medium border ${getStatusBadge(displayEntrada.estado)}`}>
                                                            {displayEntrada.estado}
                                                        </Badge>
                                                        <div className="flex flex-col items-center">
                                                            <span className="text-xs font-semibold text-slate-700">
                                                                {displayEntrada.hora || '--:--'}
                                                            </span>
                                                            <span className="text-[10px] text-slate-400 italic max-w-[120px] truncate text-center">
                                                                {displayEntrada.curso || 'No registrado'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col items-center gap-1">
                                                        <Badge variant="outline" className={`px-2 py-0.5 text-xs font-medium border ${getStatusBadge(displaySalida.estado)}`}>
                                                            {displaySalida.estado}
                                                        </Badge>
                                                        <div className="flex flex-col items-center">
                                                            <span className="text-xs font-semibold text-slate-700">
                                                                {displaySalida.hora || '--:--'}
                                                            </span>
                                                            <span className="text-[10px] text-slate-400 italic max-w-[120px] truncate text-center">
                                                                {displaySalida.curso || 'No registrado'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <div className="flex items-center justify-center">
                                                        <div className="h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                                                            <span className="text-xs font-semibold text-slate-700">{item.total_cursos}</span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
