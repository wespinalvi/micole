import { useState } from "react";
import {
    Search,
    Clock,
    ChevronDown,
    FileDown
} from "lucide-react";

interface IngresoClase {
    id: number;
    alumno: string;
    dni: string;
    primera_clase: string;
    ultima_clase: string;
    curso_primera: string;
    curso_ultima: string;
    estado: "Presente" | "Tardanza" | "Falta";
}

const DUMMY_INGRESOS: IngresoClase[] = [
    {
        id: 1,
        alumno: "Juan Pérez Gómez",
        dni: "74127183",
        primera_clase: "07:30 AM",
        ultima_clase: "01:45 PM",
        curso_primera: "Matemática",
        curso_ultima: "Educación Física",
        estado: "Presente",
    },
    {
        id: 2,
        alumno: "Maria García Lopez",
        dni: "65687457",
        primera_clase: "07:45 AM",
        ultima_clase: "01:30 PM",
        curso_primera: "Matemática",
        curso_ultima: "Educación Física",
        estado: "Tardanza",
    },
    {
        id: 3,
        alumno: "Carlos Rodríguez Ruiz",
        dni: "16535028",
        primera_clase: "N/A",
        ultima_clase: "N/A",
        curso_primera: "---",
        curso_ultima: "---",
        estado: "Falta",
    },
];

export default function SeguimientoIngresos() {
    const [searchTerm, setSearchTerm] = useState("");
    const [grado, setGrado] = useState("1");

    const filteredData = DUMMY_INGRESOS.filter(item =>
        item.alumno.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.dni.includes(searchTerm)
    );

    const getStatusStyle = (estado: string) => {
        switch (estado) {
            case "Presente": return "bg-emerald-50 text-emerald-600 border-emerald-100";
            case "Tardanza": return "bg-amber-50 text-amber-600 border-amber-100";
            case "Falta": return "bg-rose-50 text-rose-600 border-rose-100";
            default: return "bg-slate-50 text-slate-400 border-slate-100";
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                        Seguimiento de Ingresos
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                        <Clock size={13} className="text-slate-400" />
                        <span className="text-xs text-slate-500 font-medium tracking-tight">Monitoreo de asistencia oficial por estudiante</span>
                        <span className="w-1 h-1 rounded-full bg-slate-200 mx-1" />
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">En Tiempo Real</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg flex flex-col items-center min-w-[65px] shadow-sm">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Fecha</span>
                        <span className="text-base font-bold text-slate-800 leading-tight">
                            {new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })}
                        </span>
                    </div>
                    <button className="bg-indigo-600 text-white p-2.5 rounded-lg shadow-md hover:bg-indigo-700 transition-all flex items-center justify-center h-11 w-11">
                        <FileDown size={18} />
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-end gap-4">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight ml-0.5">Filtrar por Grado</label>
                        <div className="relative">
                            <select
                                value={grado}
                                onChange={(e) => setGrado(e.target.value)}
                                className="w-full appearance-none px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all cursor-pointer"
                            >
                                <option value="1">1° Grado de Secundaria</option>
                                <option value="2">2° Grado de Secundaria</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight ml-0.5">Buscar Estudiante</label>
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Nombre o Documento..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Table Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/30 flex items-center">
                    <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <div className="w-1.5 h-3 bg-indigo-500 rounded-full" />
                        Marcaje Consolidado del Día
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50">
                            <tr>
                                <th className="px-6 py-3">Nombres del Estudiante</th>
                                <th className="px-6 py-3">Primer Ingreso</th>
                                <th className="px-6 py-3">Último Marcaje</th>
                                <th className="px-6 py-3 text-center">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredData.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-700 leading-tight group-hover:text-indigo-600 transition-all">{item.alumno}</span>
                                            <span className="text-[10px] font-medium text-slate-400">Documento: {item.dni}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.primera_clase !== "N/A" ? (
                                            <div className="flex flex-col gap-0.5">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                                    <span className="text-sm font-bold text-slate-700 leading-none">{item.primera_clase}</span>
                                                </div>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight ml-3.5 italic">{item.curso_primera}</span>
                                            </div>
                                        ) : (
                                            <span className="text-[11px] text-slate-300 font-bold italic tracking-wide">Sin registros</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.ultima_clase !== "N/A" ? (
                                            <div className="flex flex-col gap-0.5">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                    <span className="text-sm font-bold text-slate-700 leading-none">{item.ultima_clase}</span>
                                                </div>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight ml-3.5 italic">{item.curso_ultima}</span>
                                            </div>
                                        ) : (
                                            <span className="text-[11px] text-slate-300 font-bold italic tracking-wide">---</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight border shadow-sm ${getStatusStyle(item.estado)}`}>
                                                {item.estado}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center text-[10px]">
                    <p className="text-slate-400 font-bold uppercase tracking-widest italic opacity-60">MICole Management © 2026</p>
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.3)] animate-pulse" />
                        <span className="text-slate-400 font-bold uppercase tracking-tighter">Live Monitor</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
