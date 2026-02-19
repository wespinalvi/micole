import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Search, Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface IngresoClase {
    id: number;
    alumno: string;
    dni: string;
    primera_clase: string; // Hora/Fecha
    ultima_clase: string;   // Hora/Fecha
    curso_primera: string;
    curso_ultima: string;
    estado: "Presente" | "Tardanza" | "Falta";
}

const DUMMY_INGRESOS: IngresoClase[] = [
    {
        id: 1,
        alumno: "Juan Pérez Gómez",
        dni: "74127183",
        primera_clase: "2026-02-02 07:30 AM",
        ultima_clase: "2026-02-02 01:45 PM",
        curso_primera: "Matemática",
        curso_ultima: "Educación Física",
        estado: "Presente",
    },
    {
        id: 2,
        alumno: "Maria García Lopez",
        dni: "65687457",
        primera_clase: "2026-02-02 07:45 AM",
        ultima_clase: "2026-02-02 01:30 PM",
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

    const filteredData = DUMMY_INGRESOS.filter(item =>
        item.alumno.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.dni.includes(searchTerm)
    );

    return (
        <div className="container mx-auto p-6 space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-2xl font-bold text-slate-800">Seguimiento de Ingresos</CardTitle>
                            <p className="text-sm text-slate-500">Control de la primera y última clase registrada por estudiante.</p>
                        </div>
                        <div className="bg-indigo-50 p-3 rounded-lg flex items-center gap-3 border border-indigo-100">
                            <Calendar className="text-indigo-600 h-5 w-5" />
                            <span className="text-indigo-900 font-semibold">{new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4 mb-8">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <Input
                                placeholder="Buscar por nombre o DNI..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button className="bg-slate-800 hover:bg-slate-900">
                            Exportar Reporte
                        </Button>
                    </div>

                    <div className="border rounded-xl overflow-hidden shadow-sm">
                        <Table>
                            <TableHeader className="bg-slate-50">
                                <TableRow>
                                    <TableHead className="font-semibold">Estudiante</TableHead>
                                    <TableHead className="font-semibold">Primera Clase (Ingreso)</TableHead>
                                    <TableHead className="font-semibold">Última Clase (Salida)</TableHead>
                                    <TableHead className="text-center font-semibold">Estado Diario</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-slate-50 transition-colors">
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-700">{item.alumno}</span>
                                                <span className="text-xs text-slate-400">DNI: {item.dni}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {item.primera_clase !== "N/A" ? (
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-2 text-slate-600">
                                                        <Clock className="h-3 w-3 text-indigo-500" />
                                                        <span className="text-sm font-medium">{item.primera_clase}</span>
                                                    </div>
                                                    <span className="text-xs text-indigo-400 font-medium ml-5">{item.curso_primera}</span>
                                                </div>
                                            ) : (
                                                <span className="text-slate-300 italic">Sin registro</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {item.ultima_clase !== "N/A" ? (
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-2 text-slate-600">
                                                        <Clock className="h-3 w-3 text-emerald-500" />
                                                        <span className="text-sm font-medium">{item.ultima_clase}</span>
                                                    </div>
                                                    <span className="text-xs text-emerald-400 font-medium ml-5">{item.curso_ultima}</span>
                                                </div>
                                            ) : (
                                                <span className="text-slate-300 italic">Sin registro</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge
                                                className={
                                                    item.estado === "Presente" ? "bg-green-100 text-green-700 hover:bg-green-200 border-none" :
                                                        item.estado === "Tardanza" ? "bg-amber-100 text-amber-700 hover:bg-amber-200 border-none" :
                                                            "bg-red-100 text-red-700 hover:bg-red-200 border-none"
                                                }
                                            >
                                                {item.estado}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
