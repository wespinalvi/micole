import { useState, useEffect, useCallback } from "react";
import api from "@/lib/axios";
import {
    Calendar,
    Search,
    Download,
    ChevronDown,
    AlertCircle
} from "lucide-react";

interface AsistenciaItem {
    curso: string;
    docente: string;
    estado: string;
    hora: string | null;
    observaciones: string | null;
}

interface ReporteAlumno {
    id_matricula: number;
    dni: string;
    nombre_alumno: string;
    grado: string;
    asistencias: AsistenciaItem[];
}

export default function ReporteAsistenciaClases() {
    const [fecha, setFecha] = useState<string>(new Date().toISOString().split('T')[0]);
    const [reporte, setReporte] = useState<ReporteAlumno[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [gradoSeleccionado, setGradoSeleccionado] = useState<string>("1");
    const [mensajeAPI, setMensajeAPI] = useState<string | null>(null);

    const fetchReporte = useCallback(async () => {
        setLoading(true);
        try {
            const url = gradoSeleccionado === "todos"
                ? `/asistencia/reporte-dia?fecha=${fecha}`
                : `/asistencia/reporte-grado?fecha=${fecha}&id_grado=${gradoSeleccionado}`;

            const { data } = await api.get(url);
            if (data.success) {
                setReporte(data.data || []);
                setMensajeAPI(!data.asistencia_registrada ? data.mensaje : null);
            } else {
                setReporte([]);
                setMensajeAPI(null);
            }
        } catch (error) {
            console.error("Error fetching report:", error);
            setReporte([]);
            setMensajeAPI(null);
        } finally {
            setLoading(false);
        }
    }, [fecha, gradoSeleccionado]);

    useEffect(() => {
        fetchReporte();
    }, [fetchReporte]);

    const filteredReporte = reporte.filter(r =>
        r.nombre_alumno.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.dni.includes(searchTerm)
    );

    const statsFiltered = {
        total: filteredReporte.length,
        presentes: filteredReporte.filter(r => r.asistencias.some(a => a.estado === 'Presente')).length,
        inasistencias: filteredReporte.filter(r => r.asistencias.length === 0 || r.asistencias.every(a => a.estado !== 'Presente')).length
    };

    const getStatusStyle = (estado: string) => {
        switch (estado?.toLowerCase()) {
            case 'presente':
                return "bg-emerald-50 text-emerald-600 border-emerald-100";
            case 'ausente':
                return "bg-rose-50 text-rose-600 border-rose-100";
            default:
                return "bg-slate-50 text-slate-500 border-slate-200";
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-8">
            {/* Header Section - Refined sizes */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                        Reporte Diario de Asistencia
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                        <Calendar size={13} className="text-slate-400" />
                        <span className="text-xs text-slate-500 font-medium">Consolidado diario de ingresos y salidas</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300 mx-1" />
                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Sede Central</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg flex flex-col items-center min-w-[70px] shadow-sm">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Total</span>
                        <span className="text-base font-bold text-slate-800 leading-tight">{statsFiltered.total}</span>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg flex flex-col items-center min-w-[70px] shadow-sm">
                        <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-tighter">Presentes</span>
                        <span className="text-base font-bold text-emerald-700 leading-tight">{statsFiltered.presentes}</span>
                    </div>
                    <div className="bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-lg flex flex-col items-center min-w-[70px] shadow-sm">
                        <span className="text-[9px] font-bold text-rose-600 uppercase tracking-tighter">Faltas</span>
                        <span className="text-base font-bold text-rose-700 leading-tight">{statsFiltered.inasistencias}</span>
                    </div>
                </div>
            </div>

            {/* Filters Bar - More compact paddings */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-end gap-4">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider ml-0.5">Grado Académico</label>
                        <div className="relative">
                            <select
                                value={gradoSeleccionado}
                                onChange={(e) => setGradoSeleccionado(e.target.value)}
                                className="w-full appearance-none px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all cursor-pointer"
                            >
                                <option value="1">1° Grado de Secundaria</option>
                                <option value="2">2° Grado de Secundaria</option>
                                <option value="3">3° Grado de Secundaria</option>
                                <option value="4">4° Grado de Secundaria</option>
                                <option value="5">5° Grado de Secundaria</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider ml-0.5">Fecha del Reporte</label>
                        <div className="relative">
                            <input
                                type="date"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 bg-slate-800 text-white px-5 py-2 rounded-lg font-bold text-xs shadow-sm hover:bg-slate-900 transition-all shrink-0 h-10"
                >
                    <Download size={14} /> EXPORTAR PDF
                </button>
            </div>

            {/* API Information Message */}
            {mensajeAPI && (
                <div className="bg-amber-50/50 border border-amber-200/50 rounded-lg p-3 flex items-center gap-3 text-amber-800 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                    <p className="text-xs font-semibold">{mensajeAPI}</p>
                </div>
            )}

            {/* Main Content Area - Refined Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/30">
                    <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <div className="w-1.5 h-4 bg-indigo-500 rounded-full" />
                        Detalle de Estudiantes
                    </h2>
                    <div className="relative w-full sm:w-64">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o DNI..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs w-full focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                            <tr>
                                <th className="py-3 px-6">DNI</th>
                                <th className="py-3 px-4">Estudiante</th>
                                <th className="py-3 px-4">Ingreso</th>
                                <th className="py-3 px-4">Salida</th>
                                <th className="py-3 px-4 text-center">Clases</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-16 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="h-6 w-6 border-2 border-indigo-100 border-t-indigo-500 rounded-full animate-spin" />
                                            <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Cargando...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredReporte.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-16 text-center">
                                        <div className="flex flex-col items-center text-slate-300">
                                            <Search className="h-8 w-8 opacity-20 mb-2" />
                                            <p className="text-xs font-bold uppercase tracking-tighter">Sin resultados</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredReporte.map((item, idx) => {
                                    const sortedAsistencias = [...item.asistencias].sort((a, b) =>
                                        (a.hora || "").localeCompare(b.hora || "")
                                    );

                                    const entry = sortedAsistencias[0] || { estado: 'Ausente', hora: null, curso: 'N/A' };
                                    const logout = sortedAsistencias.length > 1 ? sortedAsistencias[sortedAsistencias.length - 1] : { estado: '---', hora: null, curso: '---' };

                                    return (
                                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="py-3 px-6">
                                                <span className="text-[11px] font-bold text-slate-500 bg-slate-100/50 px-2 py-0.5 rounded border border-slate-100">{item.dni}</span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-700">{item.nombre_alumno}</span>
                                                    <span className="text-[10px] text-slate-400 font-medium">{item.grado}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border w-fit uppercase tracking-tighter ${getStatusStyle(entry.estado)}`}>
                                                        {entry.estado}
                                                    </span>
                                                    <div className="flex items-center gap-1.5 text-slate-600">
                                                        <span className="text-xs font-bold">{entry.hora || '--:--'}</span>
                                                        <span className="text-[10px] text-slate-400 italic truncate max-w-[120px] font-medium">{entry.curso}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border w-fit uppercase tracking-tighter ${getStatusStyle(logout.estado)}`}>
                                                        {logout.estado}
                                                    </span>
                                                    <div className="flex items-center gap-1.5 text-slate-600">
                                                        <span className="text-xs font-bold">{logout.hora || '--:--'}</span>
                                                        <span className="text-[10px] text-slate-400 italic truncate max-w-[120px] font-medium">{logout.curso}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 text-[11px] font-bold text-slate-600 border border-slate-200 shadow-sm group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-400 transition-all">
                                                    {item.asistencias.length}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center italic">
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">System Report v2.0 • MICole</p>
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-tight">Sincronizado</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
