import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Search, UserCheck, UserX, GraduationCap } from "lucide-react";

// Tipo para nuestros datos falsos
type StudentStatus = "promoted" | "retained" | "pending";

type StudentData = {
    id: number;
    dni: string;
    name: string;
    lastNameP: string;
    lastNameM: string;
    currentGrade: string;
    section: string;
    isActive: boolean;
    academicStatus: StudentStatus;
    averageGrade: number; // Nota promedio simulada
};

// Datos falsos iniciales
const MOCK_DATA: StudentData[] = [
    {
        id: 1,
        dni: "72345678",
        name: "Juan",
        lastNameP: "Pérez",
        lastNameM: "Gómez",
        currentGrade: "3",
        section: "A",
        isActive: true,
        academicStatus: "promoted",
        averageGrade: 16.5,
    },
    {
        id: 2,
        dni: "71234567",
        name: "María",
        lastNameP: "López",
        lastNameM: "Torres",
        currentGrade: "3",
        section: "A",
        isActive: true,
        academicStatus: "pending",
        averageGrade: 12.0,
    },
    {
        id: 3,
        dni: "73456789",
        name: "Carlos",
        lastNameP: "Rodríguez",
        lastNameM: "Vargas",
        currentGrade: "3",
        section: "B",
        isActive: false,
        academicStatus: "retained",
        averageGrade: 10.2,
    },
    {
        id: 4,
        dni: "74567890",
        name: "Ana",
        lastNameP: "Martínez",
        lastNameM: "Sánchez",
        currentGrade: "4",
        section: "A",
        isActive: true,
        academicStatus: "promoted",
        averageGrade: 18.0,
    },
    {
        id: 5,
        dni: "75678901",
        name: "Luis",
        lastNameP: "González",
        lastNameM: "Díaz",
        currentGrade: "4",
        section: "A",
        isActive: true,
        academicStatus: "pending",
        averageGrade: 13.5,
    },
    {
        id: 6,
        dni: "76789012",
        name: "Sofía",
        lastNameP: "Hernández",
        lastNameM: "Ruiz",
        currentGrade: "5",
        section: "A",
        isActive: true,
        academicStatus: "promoted",
        averageGrade: 19.2,
    },
    {
        id: 7,
        dni: "77890123",
        name: "Miguel",
        lastNameP: "Jiménez",
        lastNameM: "Castro",
        currentGrade: "5",
        section: "B",
        isActive: false,
        academicStatus: "retained",
        averageGrade: 0, // Retirado
    },
    {
        id: 8,
        dni: "78901234",
        name: "Lucía",
        lastNameP: "Silva",
        lastNameM: "Mendoza",
        currentGrade: "2",
        section: "A",
        isActive: true,
        academicStatus: "promoted",
        averageGrade: 17.8,
    }
];

export default function StudentPromotions() {
    const [students, setStudents] = useState<StudentData[]>(MOCK_DATA);
    const [filterGrade, setFilterGrade] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [showInactive, setShowInactive] = useState(true);

    // Filtrar estudiantes
    const filteredStudents = students.filter((student) => {
        const matchesGrade = filterGrade === "all" || student.currentGrade === filterGrade;
        const matchesSearch =
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.lastNameP.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.dni.includes(searchTerm);
        const matchesActive = showInactive ? true : student.isActive;

        return matchesGrade && matchesSearch && matchesActive;
    });

    // Manejar cambio de estado Activo/Inactivo
    const toggleActiveStatus = (id: number) => {
        setStudents(students.map(s =>
            s.id === id ? { ...s, isActive: !s.isActive } : s
        ));
    };

    // Manejar cambio de estado Académico
    const changeAcademicStatus = (id: number, status: StudentStatus) => {
        setStudents(students.map(s =>
            s.id === id ? { ...s, academicStatus: status } : s
        ));
    };

    // Renderizar estado académico con estilos
    const getStatusBadge = (status: StudentStatus) => {
        switch (status) {
            case "promoted":
                return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">Aprobado</Badge>;
            case "retained":
                return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">Reprobado</Badge>;
            case "pending":
                return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200">Pendiente</Badge>;
        }
    };

    // Renderizar grado formateado
    const formatGrade = (grade: string) => {
        return `${grade}° Secundaria`;
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-[#1a1a1a]">Gestión de Promoción</h1>
                    <p className="text-muted-foreground mt-1">Administra el estado activo y la promoción de grado de los alumnos.</p>
                </div>
                <div className="flex items-center gap-2 bg-white p-2 rounded-lg border shadow-sm">
                    <span className="text-sm font-medium text-gray-600 px-2">Mostrar Inactivos</span>
                    <Switch
                        checked={showInactive}
                        onCheckedChange={setShowInactive}
                    />
                </div>
            </div>

            {/* Panel de Filtros */}
            <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="relative col-span-1 md:col-span-2">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Buscar por nombre o DNI..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 bg-white"
                            />
                        </div>

                        <div>
                            <Select value={filterGrade} onValueChange={setFilterGrade}>
                                <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="Filtrar por Grado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos los Grados</SelectItem>
                                    <SelectItem value="1">1° Secundaria</SelectItem>
                                    <SelectItem value="2">2° Secundaria</SelectItem>
                                    <SelectItem value="3">3° Secundaria</SelectItem>
                                    <SelectItem value="4">4° Secundaria</SelectItem>
                                    <SelectItem value="5">5° Secundaria</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            variant="outline"
                            onClick={() => {
                                setFilterGrade("all");
                                setSearchTerm("");
                            }}
                            className="hover:bg-gray-100"
                        >
                            Limpiar Filtros
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Tabla de Alumnos */}
            <Card className="overflow-hidden border-none shadow-lg">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow>
                                <TableHead className="w-[100px]">DNI</TableHead>
                                <TableHead>Estudiante</TableHead>
                                <TableHead>Grado Actual</TableHead>
                                <TableHead>Promedio</TableHead>
                                <TableHead>Estado Activo</TableHead>
                                <TableHead>Estado Académico</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredStudents.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                        No se encontraron estudiantes con los filtros aplicados.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredStudents.map((student) => (
                                    <TableRow key={student.id} className="hover:bg-slate-50/50 transition-colors">
                                        <TableCell className="font-medium text-slate-700">{student.dni}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-900">{student.name} {student.lastNameP}</span>
                                                <span className="text-xs text-muted-foreground">{student.lastNameM}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{formatGrade(student.currentGrade)}</span>
                                                <Badge variant="outline" className="text-xs text-slate-500 bg-slate-100">{student.section}</Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`font-bold ${student.averageGrade < 11 ? 'text-red-500' : 'text-slate-700'}`}>
                                                {student.averageGrade.toFixed(1)}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Switch
                                                    checked={student.isActive}
                                                    onCheckedChange={() => toggleActiveStatus(student.id)}
                                                    className="data-[state=checked]:bg-[#3E328C]"
                                                />
                                                <span className={`text-xs font-medium ${student.isActive ? 'text-green-600' : 'text-gray-400'}`}>
                                                    {student.isActive ? 'Activo' : 'Inactivo'}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(student.academicStatus)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Select
                                                value={student.academicStatus}
                                                onValueChange={(val) => changeAcademicStatus(student.id, val as StudentStatus)}
                                            >
                                                <SelectTrigger className="w-[130px] ml-auto h-8 text-xs">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="promoted" className="text-green-600 focus:text-green-700">
                                                        <div className="flex items-center gap-2">
                                                            <GraduationCap className="w-3 h-3" /> Aprobado
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="retained" className="text-red-600 focus:text-red-700">
                                                        <div className="flex items-center gap-2">
                                                            <UserX className="w-3 h-3" /> Reprobado
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="pending" className="text-amber-600 focus:text-amber-700">
                                                        <div className="flex items-center gap-2">
                                                            <UserCheck className="w-3 h-3" /> Pendiente
                                                        </div>
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}
