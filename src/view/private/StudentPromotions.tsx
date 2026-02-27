import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
    Users,
    CheckCircle2,
    Calendar,
    LockOpen,
    ChevronRight,
    LayoutDashboard,
    ArrowUpCircle,
    MoreVertical,
    GraduationCap,
    Search,
    Loader2,
    AlertCircle,
    ArrowRight
} from "lucide-react";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

// --- Tipos ---
interface GradeInfo {
    id: string;
    name: string;
    level: string;
    studentCount: number;
    promotedCount: number;
    blockedCount: number;
    capacity: number;
    progress: number;
}

interface AcademicPeriod {
    id: string;
    year: string;
    status: "active" | "closed" | "upcoming";
}

interface Student {
    id: string;
    alumnoId: string;
    dni: string;
    name: string;
    lastName: string;
    currentGrade: string;
    status: "pending" | "ready" | "promoted" | "needs_review" | "failed";
    hasDebt: boolean;
    puede_promover: boolean;
}

const BASE_URL = "http://localhost:3000/api/promocion";

// --- Componentes Pequeños ---
const StatCard = ({ title, value, icon: Icon, colorClass, subtext }: any) => (
    <div className="bg-white border border-slate-200 rounded-xl p-5 transition-all hover:shadow-md group">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-2.5 rounded-lg ${colorClass} bg-opacity-10`}>
                <Icon size={20} className={colorClass.replace("bg-", "text-")} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-500">
                Info
            </span>
        </div>
        <div>
            <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
            <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
                {subtext && (
                    <span className="text-xs text-slate-400 font-normal">{subtext}</span>
                )}
            </div>
        </div>
    </div>
);

const GradeCard = ({ title, level, students, progress, onManage }: any) => (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-blue-300 transition-all hover:shadow-sm group">
        <div className="p-5">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                        {title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{level}</p>
                </div>
                <div className="bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                    <span className="text-xs font-bold text-slate-600">
                        {students} Est.
                    </span>
                </div>
            </div>

            <div className="space-y-2 mb-6">
                <div className="flex justify-between text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    <span>Progreso de promoción</span>
                    <span className={progress > 0 ? "text-blue-600" : ""}>{progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <button
                onClick={onManage}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-50 text-slate-700 text-sm font-medium border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
            >
                Gestionar Alumnos
                <ChevronRight size={14} />
            </button>
        </div>
    </div>
);

// --- Componente Principal ---
export default function AcademicManagement() {
    const [activeTab, setActiveTab] = useState<"resumen" | "promocion">("resumen");
    const [headerPortalTarget, setHeaderPortalTarget] = useState<HTMLElement | null>(null);

    // States for data
    const [periods, setPeriods] = useState<AcademicPeriod[]>([]);
    const [selectedPeriod, setSelectedPeriod] = useState<string>("");
    const [grades, setGrades] = useState<GradeInfo[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedGradeId, setSelectedGradeId] = useState<string>("");
    const [allGradesList, setAllGradesList] = useState<any[]>([]);

    // UI States
    const [loading, setLoading] = useState(false);
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isPromoting, setIsPromoting] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [promotionProgress, setPromotionProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Initial Data Fetching
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                const [periodsRes, gradesRes] = await Promise.all([
                    axios.get(`${BASE_URL}/periodos`),
                    axios.get("http://localhost:3000/api/grado/lista-grado"),
                ]);

                if (gradesRes.data.status) {
                    setAllGradesList(gradesRes.data.data);
                }

                if (periodsRes.data.status) {
                    const mappedPeriods = periodsRes.data.data.map((p: any) => ({
                        id: p.id.toString(),
                        year: p.anio.toString(),
                        status: p.activo === 1 ? "active" : "closed",
                    }));
                    setPeriods(mappedPeriods);

                    const active = mappedPeriods.find((p: any) => p.status === "active");
                    if (active) setSelectedPeriod(active.id);
                    else if (mappedPeriods.length > 0) setSelectedPeriod(mappedPeriods[0].id);
                }
            } catch (err) {
                console.error("Error fetching initial data:", err);
                setError("No se pudieron cargar los datos iniciales.");
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    useEffect(() => {
        setHeaderPortalTarget(document.getElementById("header-right-slot"));
    }, []);

    const fetchStats = async () => {
        if (!selectedPeriod || allGradesList.length === 0) return;
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/estadisticas/${selectedPeriod}`);
            if (response.data.status) {
                const mappedGrades = response.data.data.map((g: any, index: number) => {
                    const realGrade = allGradesList.find((ag) => ag.nombre === g.nombre);
                    const id = (
                        realGrade?.id ||
                        g.id ||
                        g.grado_id ||
                        `grade-${index}`
                    ).toString();

                    const total = g.total || 0;
                    const promoted = g.promovidos || 0;
                    return {
                        id,
                        name: g.nombre || "Grado",
                        level: "Secundaria",
                        studentCount: total,
                        promotedCount: promoted,
                        blockedCount: g.repitentes_bloqueados || 0,
                        capacity: 30,
                        progress: total > 0 ? Math.round((promoted / total) * 100) : 0,
                    };
                });
                setGrades(mappedGrades);
            }
        } catch (err) {
            console.error("Error fetching stats:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [selectedPeriod, allGradesList]);

    const fetchStudents = async () => {
        if (!selectedGradeId || !selectedPeriod || activeTab !== "promocion") return;
        if (selectedGradeId.startsWith("grade-")) return;

        try {
            setLoadingStudents(true);
            const response = await axios.get(
                `${BASE_URL}/alumnos-estado?periodId=${selectedPeriod}&gradoId=${selectedGradeId}`
            );
            if (response.data.status) {
                const mappedStudents = response.data.data.map((s: any, index: number) => ({
                    id: (s.id_matricula || s.id || `student-${index}`).toString(),
                    alumnoId: (s.id_alumno || "").toString(),
                    dni: s.dni || "",
                    name: s.nombre_completo ? s.nombre_completo.split(", ")[1] || "" : "",
                    lastName: s.nombre_completo
                        ? s.nombre_completo.split(", ")[0] || s.nombre_completo
                        : "",
                    currentGrade: grades.find((g) => g.id === selectedGradeId)?.name || "",
                    status: s.hasDebt ? "needs_review" : "ready",
                    hasDebt: s.hasDebt === 1 || s.hasDebt === true,
                    puede_promover: s.puede_promover === 1 || s.puede_promover === true,
                }));
                setStudents(mappedStudents);
            }
        } catch (err) {
            console.error("Error fetching students:", err);
        } finally {
            setLoadingStudents(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [selectedGradeId, selectedPeriod, activeTab]);

    const togglePromotionPermission = async (id: string, currentStatus: boolean) => {
        try {
            const response = await axios.patch(
                `${BASE_URL}/matricula/${id}/toggle-promocion`,
                {
                    puede_promover: currentStatus ? 0 : 1,
                }
            );
            if (response.data.status) {
                fetchStudents();
            }
        } catch (err) {
            console.error("Error toggling promotion:", err);
            setError("Error al cambiar el permiso de promoción.");
        }
    };

    const handlePromoteAll = async () => {
        setConfirmDialogOpen(false);
        setIsPromoting(true);
        setError(null);
        setPromotionProgress(5);

        try {
            const sortedPeriods = [...periods].sort(
                (a, b) => parseInt(a.year) - parseInt(b.year)
            );
            const currentIndex = sortedPeriods.findIndex((p) => p.id === selectedPeriod);
            const nextPeriod = sortedPeriods[currentIndex + 1];

            if (!nextPeriod) {
                throw new Error(
                    "No se encontró un período académico destino (Año Siguiente). Debe crearlo primero."
                );
            }

            setPromotionProgress(30);
            const response = await axios.post(`${BASE_URL}/procesar-masivo`, {
                periodIdActual: parseInt(selectedPeriod),
                periodIdSiguiente: parseInt(nextPeriod.id),
            });

            if (response.data.status) {
                setPromotionProgress(100);
                setSuccessMessage(
                    `¡Promoción exitosa! Alumnos trasladados al año ${nextPeriod.year}.`
                );
                setTimeout(() => {
                    setIsPromoting(false);
                    setPromotionProgress(0);
                    fetchStats();
                    setActiveTab("resumen");
                    setSuccessMessage(null);
                }, 2000);
            }
        } catch (err: any) {
            console.error("Error in promotion process:", err);
            setError(
                err.response?.data?.message ||
                err.message ||
                "Ocurrió un error crítico durante la promoción."
            );
            setIsPromoting(false);
            setPromotionProgress(0);
        }
    };

    const totalStudents = grades.reduce((acc, curr) => acc + curr.studentCount, 0);
    const totalPromoted = grades.reduce((acc, curr) => acc + curr.promotedCount, 0);
    const currentPeriodInfo = periods.find((p) => p.id === selectedPeriod);

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased">
            {headerPortalTarget && createPortal(
                <div className="relative hidden md:block">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                        type="text"
                        placeholder="Buscar grado o alumno..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-1.5 bg-slate-100 border-transparent focus:bg-white focus:border-blue-300 rounded-lg text-sm transition-all outline-none w-64"
                    />
                </div>,
                headerPortalTarget
            )}

            <main className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8">
                {/* Mensajes de error/éxito */}
                {error && (
                    <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-center gap-3 text-rose-800 text-sm animate-in slide-in-from-top-2">
                        <AlertCircle className="h-5 w-5" />
                        <p className="flex-1">{error}</p>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-rose-800 hover:bg-rose-100"
                            onClick={() => setError(null)}
                        >
                            Cerrar
                        </Button>
                    </div>
                )}

                {successMessage && (
                    <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center gap-3 text-emerald-800 text-sm animate-in slide-in-from-top-2">
                        <CheckCircle2 className="h-5 w-5" />
                        <p>{successMessage}</p>
                    </div>
                )}

                {/* Encabezado de Página */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-blue-600 p-2 rounded-lg shadow-blue-200 shadow-lg">
                                <GraduationCap className="text-white" size={24} />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                Gestión de Grados Académicos
                            </h1>
                        </div>
                        <p className="text-slate-500 max-w-xl text-[15px] leading-relaxed">
                            Planifica períodos lectivos, promueve estudiantes de forma masiva y revisa
                            el historial académico centralizado.
                        </p>
                    </div>

                    <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                        <button
                            onClick={() => setActiveTab("resumen")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "resumen"
                                ? "bg-slate-900 text-white shadow-md"
                                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                                }`}
                        >
                            <LayoutDashboard size={16} />
                            Resumen
                        </button>
                        <button
                            onClick={() => setActiveTab("promocion")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "promocion"
                                ? "bg-slate-900 text-white shadow-md"
                                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                                }`}
                        >
                            <ArrowUpCircle size={16} />
                            Promoción
                        </button>
                        <div className="w-px h-6 bg-slate-200 mx-1" />

                        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                            <SelectTrigger className="flex items-center gap-2 px-4 py-2 h-9 border-none bg-transparent text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:ring-0">
                                <Calendar size={16} />
                                <SelectValue placeholder="Periodo" />
                            </SelectTrigger>
                            <SelectContent>
                                {periods.map((p) => (
                                    <SelectItem key={p.id} value={p.id}>
                                        Año {p.year} {p.status === "active" ? "(Activo)" : ""}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </header>

                {activeTab === "resumen" && (
                    <>
                        {/* Indicadores Clave */}
                        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <StatCard
                                title="Total Estudiantes"
                                value={loading ? "..." : totalStudents}
                                icon={Users}
                                colorClass="bg-blue-600"
                                subtext="Matriculados"
                            />
                            <StatCard
                                title="Habilitados"
                                value={loading ? "..." : totalPromoted}
                                icon={CheckCircle2}
                                colorClass="bg-emerald-600"
                                subtext="Para promover"
                            />
                            <StatCard
                                title="Período Actual"
                                value={`Año ${currentPeriodInfo?.year || "---"}`}
                                icon={Calendar}
                                colorClass="bg-amber-600"
                            />
                            <StatCard
                                title="Estado del Sistema"
                                value={currentPeriodInfo?.status === "active" ? "Abierto" : "Cerrado"}
                                icon={LockOpen}
                                colorClass="bg-indigo-600"
                            />
                        </section>

                        {/* Sección de Contenido */}
                        <section className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-lg font-bold text-slate-800">
                                        Explorador de Grados
                                    </h2>
                                    <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded">
                                        SECUNDARIA
                                    </span>
                                </div>
                                <button className="text-slate-400 hover:text-slate-600 p-1">
                                    <MoreVertical size={20} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {loading && grades.length === 0 ? (
                                    Array(6)
                                        .fill(0)
                                        .map((_, i) => (
                                            <div
                                                key={i}
                                                className="h-48 bg-slate-100 animate-pulse rounded-xl"
                                            />
                                        ))
                                ) : (
                                    grades
                                        .filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map((grade) => (
                                            <GradeCard
                                                key={grade.id}
                                                title={grade.name}
                                                level={grade.level}
                                                students={grade.studentCount}
                                                progress={grade.progress}
                                                onManage={() => {
                                                    setSelectedGradeId(grade.id);
                                                    setActiveTab("promocion");
                                                }}
                                            />
                                        ))
                                )}
                            </div>
                        </section>
                    </>
                )}

                {activeTab === "promocion" && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-500">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">
                                    Configuración de Promoción
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Habilita a los alumnos aptos para el proceso masivo.
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
                                        Grado
                                    </p>
                                    <Select
                                        value={selectedGradeId || ""}
                                        onValueChange={setSelectedGradeId}
                                    >
                                        <SelectTrigger className="w-[200px] h-9 bg-slate-50">
                                            <SelectValue placeholder="Seleccionar Grado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {grades.map((g) => (
                                                <SelectItem key={g.id} value={g.id}>
                                                    {g.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="pt-5 hidden md:block">
                                    <ArrowRight className="h-4 w-4 text-slate-300" />
                                </div>
                                <div className="pt-4">
                                    <Dialog
                                        open={confirmDialogOpen}
                                        onOpenChange={setConfirmDialogOpen}
                                    >
                                        <DialogTrigger asChild>
                                            <Button
                                                className="h-9 bg-slate-900 hover:bg-blue-600 text-xs shadow-md transition-all"
                                                disabled={currentPeriodInfo?.status !== "active" || isPromoting}
                                            >
                                                <ArrowUpCircle className="h-3.5 w-3.5 mr-2" />
                                                PROCESAR PROMOCIÓN MASIVA
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Confirmar Promoción Masiva</DialogTitle>
                                                <DialogDescription>
                                                    Este proceso trasladará a TODOS los alumnos habilitados al
                                                    siguiente año académico de forma automática.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="bg-slate-50 p-4 rounded-lg space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span>Origen:</span>
                                                    <span className="font-bold">{currentPeriodInfo?.year}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Destino:</span>
                                                    <span className="font-bold">
                                                        {parseInt(currentPeriodInfo?.year || "0") + 1}
                                                    </span>
                                                </div>
                                            </div>
                                            <DialogFooter className="pt-4">
                                                <Button
                                                    variant="ghost"
                                                    onClick={() => setConfirmDialogOpen(false)}
                                                >
                                                    Cancelar
                                                </Button>
                                                <Button
                                                    onClick={handlePromoteAll}
                                                    className="bg-slate-900 hover:bg-blue-600"
                                                >
                                                    Iniciar Proceso
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm relative min-h-[400px]">
                            {isPromoting && (
                                <div className="absolute inset-0 z-30 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-8">
                                    <div className="w-full max-w-sm space-y-6">
                                        <div className="flex flex-col items-center">
                                            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
                                            <h4 className="text-lg font-bold text-slate-900">
                                                Ejecutando Promoción Masiva
                                            </h4>
                                            <p className="text-xs text-slate-500 text-center mt-1">
                                                Generando matrículas y cuotas para el nuevo año...
                                            </p>
                                        </div>
                                        <Progress value={promotionProgress} className="h-2 bg-slate-100" />
                                    </div>
                                </div>
                            )}

                            {loadingStudents ? (
                                <div className="flex flex-col items-center justify-center h-64 gap-3">
                                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                                    <p className="text-sm text-slate-500">Cargando lista de alumnos...</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader className="bg-slate-50/50">
                                            <TableRow>
                                                <TableHead className="w-[100px] text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                    DNI
                                                </TableHead>
                                                <TableHead className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                    Estudiante
                                                </TableHead>
                                                <TableHead className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                    Deuda
                                                </TableHead>
                                                <TableHead className="text-center text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                    Estado
                                                </TableHead>
                                                <TableHead className="text-center text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                    Permitir Promoción
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {students
                                                .filter(
                                                    (s) =>
                                                        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                        s.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                        s.dni.includes(searchTerm)
                                                )
                                                .map((student) => (
                                                    <TableRow key={student.id} className="hover:bg-slate-50/50">
                                                        <TableCell className="text-xs font-medium text-slate-600">
                                                            {student.dni}
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-slate-900 leading-tight">
                                                                    {student.lastName}
                                                                </span>
                                                                <span className="text-xs text-slate-500">
                                                                    {student.name}
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                variant="secondary"
                                                                className={
                                                                    student.hasDebt
                                                                        ? "bg-rose-50 text-rose-600 border-none"
                                                                        : "bg-emerald-50 text-emerald-600 border-none"
                                                                }
                                                            >
                                                                {student.hasDebt ? "CON DEUDA" : "AL DÍA"}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Badge
                                                                variant="secondary"
                                                                className={
                                                                    student.puede_promover
                                                                        ? "bg-blue-50 text-blue-700 border-none"
                                                                        : "bg-amber-50 text-amber-700 border-none"
                                                                }
                                                            >
                                                                {student.puede_promover ? "Habilitado" : "Retenido"}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Switch
                                                                checked={student.puede_promover}
                                                                onCheckedChange={() =>
                                                                    togglePromotionPermission(
                                                                        student.id,
                                                                        student.puede_promover
                                                                    )
                                                                }
                                                                className="data-[state=checked]:bg-blue-600"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            {selectedGradeId && students.length === 0 && (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={5}
                                                        className="h-64 text-center text-slate-400"
                                                    >
                                                        No se encontraron alumnos para este grado en el año {currentPeriodInfo?.year}.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                            {!selectedGradeId && (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={5}
                                                        className="h-64 text-center text-slate-400 font-medium"
                                                    >
                                                        Selecciona un grado para comenzar la gestión de alumnos.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>

            {/* Botón Flotante de Resumen (Solo en tab de promoción) */}
            {activeTab === "promocion" && selectedGradeId && students.length > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-slate-900 text-white border border-slate-700 shadow-2xl rounded-full px-6 py-3 flex items-center gap-6 animate-in slide-in-from-bottom-10">
                    <span className="text-sm font-bold">{students.length} Estudiantes</span>
                    <div className="h-4 w-[px] bg-slate-700" />
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                        <span className="text-xs font-bold text-emerald-400">
                            {students.filter((s) => s.puede_promover).length} Habilitados
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-400 rounded-full" />
                        <span className="text-xs font-bold text-amber-400">
                            {students.filter((s) => !s.puede_promover).length} Retenidos
                        </span>
                    </div>
                </div>
            )}

            {/* Botón Flotante de Asistencia */}
            <button className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-full shadow-2xl hover:bg-blue-600 transition-all flex items-center gap-3 font-medium text-sm group z-40">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Soporte
            </button>
        </div>
    );
}
