"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Upload, FileText, CheckCircle2, XCircle, Eye, Trash2, Download, RefreshCw, Database, Save, File } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Tipo para los datos de grado desde el API
interface GradoData {
    id: number;
    nivel: string;
    grado: number;
    seccion: string;
    capacidad_maxima: number;
    descripcion: string;
}

// Tipo para los datos extraídos de cada ficha
interface StudentData {
    id: string;
    fileName: string;
    status: "pending" | "processing" | "success" | "error" | "registering" | "registered";
    codigoEstudiante: string;
    dni: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    nombres: string;
    sexo: string;
    estadoCivil: string;
    nacimientoRegistrado: string;
    diaNacimiento: string;
    mesNacimiento: string;
    anioNacimiento: string;
    fechaNacimiento: string;
    lenguaMaterna: string;
    segundaLengua: string;
    paisNacimiento: string;
    departamentoNacimiento: string;
    provinciaNacimiento: string;
    distritoNacimiento: string;
    numeroHermanos: string;
    lugarQueOcupa: string;
    religion: string;
    tipoDiscapacidad: string;
    certificadoDiscapacidad: string;
    anioDomicilio: string;
    direccion: string;
    lugarDomicilio: string;
    departamentoDomicilio: string;
    provinciaDomicilio: string;
    distritoDomicilio: string;
    telefono: string;
    apellidoPaternoPadre: string;
    apellidoMaternoPadre: string;
    nombresPadre: string;
    vivePadre: string;
    fechaNacimientoPadre: string;
    gradoInstruccionPadre: string;
    ocupacionPadre: string;
    viveConEstudiantePadre: string;
    religionPadre: string;
    apellidoPaternoMadre: string;
    apellidoMaternoMadre: string;
    nombresMadre: string;
    viveMadre: string;
    fechaNacimientoMadre: string;
    gradoInstruccionMadre: string;
    ocupacionMadre: string;
    viveConEstudianteMadre: string;
    religionMadre: string;
    trabajaEstudiante: string;
    descripcionLaboral: string;
    horasSemanales: string;
    tipoNacimiento: string;
    complicacionesNacimiento: string;
    tipoSangre: string;
    alergias: string;
    edadLevantoCabeza: string;
    edadSeSento: string;
    edadGateo: string;
    edadSeParo: string;
    edadCamino: string;
    edadControloEsfinteres: string;
    edadHabloPrimeras: string;
    edadHabloFluidez: string;
    // Campos de matrícula actual
    anioMatriculaActual: string;
    gradoActual: string;
    nivelActual: string;
    institucionEducativaActual: string;

    // Historial de escolaridad
    historialEscolaridad: Array<{
        anio: string;
        institucionEducativa: string;
        grado: string;
        nivel: string;
    }>;

    // Campos de matrícula masiva
    gradoId?: number; // ID del grado seleccionado desde el API
    grado?: number; // Número de grado (para mostrar)
    seccion?: string; // Letra de sección (para mostrar)
}

export default function BulkEnrollment() {
    const [files, setFiles] = useState<File[]>([]);
    const [studentsData, setStudentsData] = useState<StudentData[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
    const [showDetailDialog, setShowDetailDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [viewPdfUrl, setViewPdfUrl] = useState<string | null>(null);
    const [showPdfDialog, setShowPdfDialog] = useState(false);

    // Estados para asignación masiva de grado y sección desde API
    const [gradosDisponibles, setGradosDisponibles] = useState<GradoData[]>([]);
    const [selectedGradoId, setSelectedGradoId] = useState<number | null>(null);
    const [isLoadingGrados, setIsLoadingGrados] = useState(false);

    // Cargar grados disponibles desde el API
    useEffect(() => {
        const fetchGrados = async () => {
            setIsLoadingGrados(true);
            try {
                const response = await fetch('http://localhost:3000/api/grado/lista-grado');
                const data = await response.json();

                if (data.status && data.data) {
                    setGradosDisponibles(data.data);
                    // Seleccionar el primer grado por defecto
                    if (data.data.length > 0) {
                        setSelectedGradoId(data.data[0].id);
                    }
                }
            } catch (error) {
                console.error('Error al cargar grados:', error);
                setErrorMessage('Error al cargar los grados disponibles');
            } finally {
                setIsLoadingGrados(false);
            }
        };

        fetchGrados();
    }, []);

    // Manejar la selección de archivos
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);

        // Limitar a 10 archivos
        if (selectedFiles.length > 10) {
            alert("Solo puedes subir un máximo de 10 archivos");
            return;
        }

        setFiles(selectedFiles);

        // Inicializar datos vacíos para cada archivo
        const initialData: StudentData[] = selectedFiles.map((file, index) => ({
            id: `student-${index}`,
            fileName: file.name,
            status: "pending",
            codigoEstudiante: "",
            dni: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
            nombres: "",
            sexo: "",
            estadoCivil: "",
            nacimientoRegistrado: "",
            diaNacimiento: "",
            mesNacimiento: "",
            anioNacimiento: "",
            fechaNacimiento: "",
            lenguaMaterna: "",
            segundaLengua: "",
            paisNacimiento: "",
            departamentoNacimiento: "",
            provinciaNacimiento: "",
            distritoNacimiento: "",
            numeroHermanos: "",
            lugarQueOcupa: "",
            religion: "",
            tipoDiscapacidad: "",
            certificadoDiscapacidad: "",
            anioDomicilio: "",
            direccion: "",
            lugarDomicilio: "",
            departamentoDomicilio: "",
            provinciaDomicilio: "",
            distritoDomicilio: "",
            telefono: "",
            apellidoPaternoPadre: "",
            apellidoMaternoPadre: "",
            nombresPadre: "",
            vivePadre: "",
            fechaNacimientoPadre: "",
            gradoInstruccionPadre: "",
            ocupacionPadre: "",
            viveConEstudiantePadre: "",
            religionPadre: "",
            apellidoPaternoMadre: "",
            apellidoMaternoMadre: "",
            nombresMadre: "",
            viveMadre: "",
            fechaNacimientoMadre: "",
            gradoInstruccionMadre: "",
            ocupacionMadre: "",
            viveConEstudianteMadre: "",
            religionMadre: "",
            trabajaEstudiante: "",
            descripcionLaboral: "",
            horasSemanales: "",
            tipoNacimiento: "",
            complicacionesNacimiento: "",
            tipoSangre: "",
            alergias: "",
            edadLevantoCabeza: "",
            edadSeSento: "",
            edadGateo: "",
            edadSeParo: "",
            edadCamino: "",
            edadControloEsfinteres: "",
            edadHabloPrimeras: "",
            edadHabloFluidez: "",
            anioMatriculaActual: "",
            gradoActual: "",
            nivelActual: "",
            institucionEducativaActual: "",
            historialEscolaridad: [],
        }));

        setStudentsData(initialData);
        setProgress(0);
        setErrorMessage(null);
        setSuccessMessage(null);
    };

    // Procesar archivos con la API real - uno por uno para progreso real
    const processFiles = async () => {
        setIsProcessing(true);
        setProgress(0);
        setErrorMessage(null);
        setSuccessMessage(null);

        const totalFiles = files.length;
        let successCount = 0;
        let errorCount = 0;

        try {
            // Marcar todos como procesando
            setStudentsData(prev =>
                prev.map(student => ({ ...student, status: "processing" as const }))
            );

            // Procesar cada archivo individualmente para tener progreso real
            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                try {
                    // Crear FormData con el archivo actual
                    const formData = new FormData();
                    formData.append('pdfs', file);

                    // Llamar a la API para este archivo
                    const response = await fetch('http://localhost:3000/api/pdf/extraer-multiples', {
                        method: 'POST',
                        body: formData,
                    });

                    if (!response.ok) {
                        throw new Error(`Error del servidor: ${response.status}`);
                    }

                    const data = await response.json();

                    // Actualizar el archivo procesado
                    if (data.success && data.resultados && data.resultados[0]) {
                        const resultado = data.resultados[0];

                        setStudentsData(prev =>
                            prev.map((student, index) => {
                                if (index === i) {
                                    if (resultado.exito) {
                                        successCount++;
                                        return {
                                            ...student,
                                            ...resultado.datos,
                                            status: "success" as const,
                                        };
                                    } else {
                                        errorCount++;
                                        return {
                                            ...student,
                                            status: "error" as const,
                                        };
                                    }
                                }
                                return student;
                            })
                        );
                    } else {
                        errorCount++;
                        setStudentsData(prev =>
                            prev.map((student, index) =>
                                index === i ? { ...student, status: "error" as const } : student
                            )
                        );
                    }
                } catch (fileError) {
                    console.error(`Error procesando archivo ${file.name}:`, fileError);
                    errorCount++;
                    setStudentsData(prev =>
                        prev.map((student, index) =>
                            index === i ? { ...student, status: "error" as const } : student
                        )
                    );
                }

                // Actualizar progreso: de 0% a 100% basado en archivos procesados
                const progressPercentage = Math.round(((i + 1) / totalFiles) * 100);
                setProgress(progressPercentage);
            }

            // Mensaje final
            setSuccessMessage(
                `Procesamiento completado: ${successCount} exitoso${successCount !== 1 ? 's' : ''}, ${errorCount} fallido${errorCount !== 1 ? 's' : ''}`
            );

        } catch (error) {
            console.error('Error al procesar archivos:', error);
            setErrorMessage(
                error instanceof Error
                    ? `Error: ${error.message}`
                    : 'Error desconocido al procesar los archivos. Verifica que el servidor esté corriendo.'
            );
            // Marcar todos los pendientes como error
            setStudentsData(prev =>
                prev.map(student =>
                    student.status === "processing" ? { ...student, status: "error" as const } : student
                )
            );
        } finally {
            setIsProcessing(false);
        }
    };

    // Ver detalles de un estudiante
    const viewStudentDetails = (student: StudentData) => {
        setSelectedStudent(student);
        setShowDetailDialog(true);
    };

    // Reprocesar un archivo específico
    const reprocessFile = async (index: number) => {
        const fileToReprocess = files[index];
        if (!fileToReprocess) return;

        // Marcar el archivo como procesando
        setStudentsData(prev =>
            prev.map((student, i) =>
                i === index ? { ...student, status: "processing" as const } : student
            )
        );

        try {
            // Crear FormData con el archivo específico
            const formData = new FormData();
            formData.append('pdfs', fileToReprocess);

            // Llamar a la API
            const response = await fetch('http://localhost:3000/api/pdf/extraer-multiples', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status}`);
            }

            const data = await response.json();

            // Actualizar solo el archivo reprocesado
            if (data.success && data.resultados && data.resultados[0]) {
                const resultado = data.resultados[0];
                setStudentsData(prev =>
                    prev.map((student, i) => {
                        if (i === index) {
                            if (resultado.exito) {
                                return {
                                    ...student,
                                    ...resultado.datos,
                                    status: "success" as const,
                                };
                            } else {
                                return {
                                    ...student,
                                    status: "error" as const,
                                };
                            }
                        }
                        return student;
                    })
                );

                if (resultado.exito) {
                    setSuccessMessage(`Archivo "${fileToReprocess.name}" reprocesado exitosamente`);
                } else {
                    setErrorMessage(`Error al reprocesar "${fileToReprocess.name}"`);
                }
            } else {
                throw new Error('Respuesta inválida del servidor');
            }
        } catch (error) {
            console.error('Error al reprocesar archivo:', error);
            setErrorMessage(
                error instanceof Error
                    ? `Error al reprocesar: ${error.message}`
                    : 'Error desconocido al reprocesar el archivo'
            );
            // Marcar como error
            setStudentsData(prev =>
                prev.map((student, i) =>
                    i === index ? { ...student, status: "error" as const } : student
                )
            );
        }
    };

    // Ver el PDF original
    const handleViewPdf = (index: number) => {
        const file = files[index];
        if (file) {
            const url = URL.createObjectURL(file);
            setViewPdfUrl(url);
            setShowPdfDialog(true);
        }
    };

    // Eliminar un archivo
    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        setStudentsData(prev => prev.filter((_, i) => i !== index));
    };

    // Limpiar todo
    const clearAll = () => {
        setFiles([]);
        setStudentsData([]);
        setProgress(0);
        setIsProcessing(false);
    };

    // Aplicar grado y sección a todos los estudiantes exitosos
    const applyBulkGradoSeccion = () => {
        if (!selectedGradoId) {
            setErrorMessage('Por favor selecciona un grado');
            return;
        }

        const gradoSeleccionado = gradosDisponibles.find(g => g.id === selectedGradoId);
        if (!gradoSeleccionado) {
            setErrorMessage('Grado no encontrado');
            return;
        }

        setStudentsData(prev =>
            prev.map(student => {
                if (student.status === "success" || student.status === "registered") {
                    return {
                        ...student,
                        gradoId: gradoSeleccionado.id,
                        grado: gradoSeleccionado.grado,
                        seccion: gradoSeleccionado.seccion
                    };
                }
                return student;
            })
        );
        setSuccessMessage(`${gradoSeleccionado.descripcion} aplicado a todos los estudiantes exitosos`);
    };

    // Registrar un estudiante en la base de datos
    const handleInsertData = async (student: StudentData, index: number) => {
        // Actualizar estado a registrando
        setStudentsData(prev => prev.map((s, i) => i === index ? { ...s, status: "registering" as const } : s));
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const response = await fetch('http://localhost:3000/api/matricula/matricula/insertar-extraidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ datos: student }),
            });

            if (!response.ok) {
                throw new Error('Error al registrar en la base de datos');
            }

            // Actualizar estado a registrado
            setStudentsData(prev => prev.map((s, i) => i === index ? { ...s, status: "registered" as const } : s));
            setSuccessMessage(`Estudiante ${student.nombres} registrado correctamente`);

        } catch (error) {
            console.error('Error al registrar:', error);
            setErrorMessage(`Error al registrar a ${student.nombres}: ${error instanceof Error ? error.message : 'Error desconocido'}`);
            // Revertir estado a success para permitir reintento
            setStudentsData(prev => prev.map((s, i) => i === index ? { ...s, status: "success" as const } : s));
        }
    };

    // Registrar todos los estudiantes exitosos
    const handleInsertAll = async () => {
        const studentsToRegister = studentsData.map((s, i) => ({ student: s, index: i })).filter(item => item.student.status === "success");

        if (studentsToRegister.length === 0) return;

        setIsProcessing(true);
        let successCount = 0;
        let errorCount = 0;

        for (const { student, index } of studentsToRegister) {
            try {
                // Actualizar UI
                setStudentsData(prev => prev.map((s, i) => i === index ? { ...s, status: "registering" as const } : s));

                const response = await fetch('http://localhost:3000/api/matricula/matricula/insertar-extraidos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ datos: student }),
                });

                if (!response.ok) throw new Error('Failed');

                setStudentsData(prev => prev.map((s, i) => i === index ? { ...s, status: "registered" as const } : s));
                successCount++;
            } catch (error) {
                errorCount++;
                setStudentsData(prev => prev.map((s, i) => i === index ? { ...s, status: "success" as const } : s));
            }
        }

        setIsProcessing(false);
        setSuccessMessage(`Registro masivo completado: ${successCount} registrados, ${errorCount} fallidos`);
    };

    const exportData = () => {
        const successfulData = studentsData.filter(s => s.status === "success");
        const dataStr = JSON.stringify(successfulData, null, 2);
        const dataBlob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `matriculas_masivas_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    };

    const getStatusBadge = (status: StudentData["status"]) => {
        switch (status) {
            case "pending":
                return <Badge variant="secondary">Pendiente</Badge>;
            case "processing":
                return <Badge className="bg-blue-500">Procesando...</Badge>;
            case "success":
                return <Badge className="bg-green-500">Exitoso</Badge>;
            case "error":
                return <Badge variant="destructive">Error</Badge>;
            case "registering":
                return <Badge className="bg-blue-600">Registrando...</Badge>;
            case "registered":
                return <Badge className="bg-purple-600">Registrado</Badge>;
        }
    };

    const successCount = studentsData.filter(s => s.status === "success").length;
    const errorCount = studentsData.filter(s => s.status === "error").length;

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Matrícula Masiva</h1>
                    <p className="text-muted-foreground mt-1">
                        Sube hasta 10 fichas de matrícula en formato PDF para procesamiento automático
                    </p>
                </div>
                {studentsData.length > 0 && (
                    <Button variant="outline" onClick={clearAll} disabled={isProcessing}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Limpiar Todo
                    </Button>
                )}
            </div>

            {/* Success/Error Messages */}
            {successMessage && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    <p>{successMessage}</p>
                </div>
            )}
            {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2">
                    <XCircle className="h-5 w-5" />
                    <p>{errorMessage}</p>
                </div>
            )}

            {/* Upload Area */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Upload className="h-5 w-5" />
                        Cargar Fichas de Matrícula
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
                        <input
                            type="file"
                            id="file-upload"
                            multiple
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="hidden"
                            disabled={isProcessing}
                        />
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer flex flex-col items-center gap-4"
                        >
                            <div className="p-4 bg-primary/10 rounded-full">
                                <FileText className="h-12 w-12 text-primary" />
                            </div>
                            <div>
                                <p className="text-lg font-medium">
                                    Haz clic para seleccionar archivos PDF
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    o arrastra y suelta aquí (máximo 10 archivos)
                                </p>
                            </div>
                            <Button type="button" disabled={isProcessing}>
                                Seleccionar Archivos
                            </Button>
                        </label>
                    </div>

                    {files.length > 0 && (
                        <div className="mt-6">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-sm font-medium">
                                    {files.length} archivo{files.length !== 1 ? "s" : ""} seleccionado{files.length !== 1 ? "s" : ""}
                                </p>
                                {!isProcessing && studentsData.every(s => s.status === "pending") && (
                                    <Button onClick={processFiles}>
                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                        Procesar Archivos
                                    </Button>
                                )}
                                {studentsData.some(s => s.status === "success") && !isProcessing && (
                                    <div className="flex gap-2">
                                        <Button onClick={exportData} variant="outline">
                                            <Download className="mr-2 h-4 w-4" />
                                            Exportar Datos ({successCount})
                                        </Button>
                                        <Button onClick={handleInsertAll} className="bg-purple-600 hover:bg-purple-700">
                                            <Database className="mr-2 h-4 w-4" />
                                            Registrar Todos
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {isProcessing && (
                                <div className="mb-6 space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span>
                                            Procesando archivos... ({Math.round((progress / 100) * files.length)}/{files.length})
                                        </span>
                                        <span className="font-semibold">{Math.round(progress)}%</span>
                                    </div>
                                    <Progress value={progress} className="h-2" />
                                </div>
                            )}

                            {/* Statistics */}
                            {(successCount > 0 || errorCount > 0) && (
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="text-center">
                                                <p className="text-2xl font-bold">{studentsData.length}</p>
                                                <p className="text-sm text-muted-foreground">Total</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-green-600">{successCount}</p>
                                                <p className="text-sm text-muted-foreground">Exitosos</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-red-600">{errorCount}</p>
                                                <p className="text-sm text-muted-foreground">Errores</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}

                            {/* Asignación Masiva de Grado y Sección */}
                            {successCount > 0 && (
                                <Card className="mb-6 border-blue-200 bg-blue-50/50">
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <Database className="h-5 w-5 text-blue-600" />
                                            Asignar Grado y Sección a Todos
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-end gap-4">
                                            <div className="flex-1">
                                                <Label htmlFor="bulk-grado" className="text-sm font-medium mb-2 block">
                                                    Seleccionar Grado y Sección
                                                </Label>
                                                <Select
                                                    value={selectedGradoId?.toString() || ""}
                                                    onValueChange={(value) => setSelectedGradoId(Number(value))}
                                                    disabled={isLoadingGrados || gradosDisponibles.length === 0}
                                                >
                                                    <SelectTrigger id="bulk-grado">
                                                        <SelectValue placeholder={
                                                            isLoadingGrados
                                                                ? "Cargando grados..."
                                                                : gradosDisponibles.length === 0
                                                                    ? "No hay grados disponibles"
                                                                    : "Seleccionar grado y sección"
                                                        } />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {gradosDisponibles.map((grado) => (
                                                            <SelectItem key={grado.id} value={grado.id.toString()}>
                                                                {grado.descripcion} - {grado.nivel}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <Button
                                                onClick={applyBulkGradoSeccion}
                                                className="bg-blue-600 hover:bg-blue-700"
                                                disabled={isProcessing || !selectedGradoId || isLoadingGrados}
                                            >
                                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                                Aplicar a Todos ({successCount})
                                            </Button>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-3">
                                            Esto asignará el grado y sección seleccionados a todos los estudiantes con estado "Exitoso" o "Registrado"
                                        </p>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Files Table - Vista Simplificada */}
                            <div className="border rounded-lg">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Archivo</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead>DNI</TableHead>
                                            <TableHead>Código</TableHead>
                                            <TableHead>Estudiante</TableHead>
                                            <TableHead>Fecha Nacimiento</TableHead>
                                            <TableHead>Grado</TableHead>
                                            <TableHead>Sección</TableHead>
                                            <TableHead className="text-right">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {studentsData.map((student, index) => (
                                            <TableRow key={student.id}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                                        <span className="truncate max-w-[150px]" title={student.fileName}>
                                                            {student.fileName}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(student.status)}
                                                </TableCell>
                                                <TableCell>{student.dni}</TableCell>
                                                <TableCell>{student.codigoEstudiante}</TableCell>
                                                <TableCell className="font-medium">
                                                    {student.apellidoPaterno} {student.apellidoMaterno}, {student.nombres}
                                                </TableCell>
                                                <TableCell>{student.fechaNacimiento}</TableCell>
                                                <TableCell>
                                                    {student.grado ? (
                                                        <Badge variant="outline" className="bg-blue-50">
                                                            {student.grado}°
                                                        </Badge>
                                                    ) : (
                                                        <span className="text-muted-foreground text-sm">-</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {student.seccion ? (
                                                        <Badge variant="outline" className="bg-green-50">
                                                            {student.seccion}
                                                        </Badge>
                                                    ) : (
                                                        <span className="text-muted-foreground text-sm">-</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {student.status === "success" && (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleInsertData(student, index)}
                                                                disabled={isProcessing}
                                                                title="Registrar en Base de Datos"
                                                                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                                                            >
                                                                <Save className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                        {(student.status === "error" || student.status === "success") && (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => reprocessFile(index)}
                                                                disabled={isProcessing}
                                                                title="Reprocesar archivo"
                                                                className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                                                            >
                                                                <RefreshCw className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => viewStudentDetails(student)}
                                                            disabled={student.status === "pending"}
                                                            title="Ver todos los detalles"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleViewPdf(index)}
                                                            title="Ver PDF original"
                                                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                        >
                                                            <File className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => removeFile(index)}
                                                            disabled={isProcessing}
                                                            title="Eliminar"
                                                        >
                                                            <XCircle className="h-4 w-4 text-red-500" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Detail Dialog */}
            <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Detalles del Estudiante</DialogTitle>
                        <DialogDescription>
                            Información extraída de la ficha de matrícula
                        </DialogDescription>
                    </DialogHeader>

                    {selectedStudent && (
                        <div className="space-y-6">
                            {/* Datos del Estudiante */}
                            <div>
                                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                    <div className="h-1 w-1 bg-primary rounded-full"></div>
                                    Datos del Estudiante
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">DNI:</span>
                                        <p className="font-medium">{selectedStudent.dni}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Código:</span>
                                        <p className="font-medium">{selectedStudent.codigoEstudiante}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Apellido Paterno:</span>
                                        <p className="font-medium">{selectedStudent.apellidoPaterno}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Apellido Materno:</span>
                                        <p className="font-medium">{selectedStudent.apellidoMaterno}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Nombres:</span>
                                        <p className="font-medium">{selectedStudent.nombres}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Sexo:</span>
                                        <p className="font-medium">{selectedStudent.sexo === "H" ? "Masculino" : "Femenino"}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Fecha de Nacimiento:</span>
                                        <p className="font-medium">{selectedStudent.fechaNacimiento}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Estado Civil:</span>
                                        <p className="font-medium">{selectedStudent.estadoCivil}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Idiomas */}
                            <div>
                                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                    <div className="h-1 w-1 bg-primary rounded-full"></div>
                                    Idiomas
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Lengua Materna:</span>
                                        <p className="font-medium">{selectedStudent.lenguaMaterna}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Segunda Lengua:</span>
                                        <p className="font-medium">{selectedStudent.segundaLengua}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Lugar de Nacimiento */}
                            <div>
                                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                    <div className="h-1 w-1 bg-primary rounded-full"></div>
                                    Lugar de Nacimiento
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">País:</span>
                                        <p className="font-medium">{selectedStudent.paisNacimiento}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Departamento:</span>
                                        <p className="font-medium">{selectedStudent.departamentoNacimiento}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Provincia:</span>
                                        <p className="font-medium">{selectedStudent.provinciaNacimiento}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Distrito:</span>
                                        <p className="font-medium">{selectedStudent.distritoNacimiento}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Domicilio */}
                            <div>
                                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                    <div className="h-1 w-1 bg-primary rounded-full"></div>
                                    Domicilio Actual
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Dirección:</span>
                                        <p className="font-medium">{selectedStudent.direccion}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Lugar:</span>
                                        <p className="font-medium">{selectedStudent.lugarDomicilio}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Departamento:</span>
                                        <p className="font-medium">{selectedStudent.departamentoDomicilio}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Provincia:</span>
                                        <p className="font-medium">{selectedStudent.provinciaDomicilio}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Distrito:</span>
                                        <p className="font-medium">{selectedStudent.distritoDomicilio}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Teléfono:</span>
                                        <p className="font-medium">{selectedStudent.telefono || "No registrado"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Datos del Padre */}
                            <div>
                                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                    <div className="h-1 w-1 bg-primary rounded-full"></div>
                                    Datos del Padre
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Nombres Completos:</span>
                                        <p className="font-medium">
                                            {selectedStudent.apellidoPaternoPadre} {selectedStudent.apellidoMaternoPadre}, {selectedStudent.nombresPadre}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Vive:</span>
                                        <p className="font-medium">{selectedStudent.vivePadre}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Fecha de Nacimiento:</span>
                                        <p className="font-medium">{selectedStudent.fechaNacimientoPadre}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Grado de Instrucción:</span>
                                        <p className="font-medium">{selectedStudent.gradoInstruccionPadre}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Ocupación:</span>
                                        <p className="font-medium">{selectedStudent.ocupacionPadre}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Vive con el estudiante:</span>
                                        <p className="font-medium">{selectedStudent.viveConEstudiantePadre}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Datos de la Madre */}
                            <div>
                                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                    <div className="h-1 w-1 bg-primary rounded-full"></div>
                                    Datos de la Madre
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Nombres Completos:</span>
                                        <p className="font-medium">
                                            {selectedStudent.apellidoPaternoMadre} {selectedStudent.apellidoMaternoMadre}, {selectedStudent.nombresMadre}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Vive:</span>
                                        <p className="font-medium">{selectedStudent.viveMadre}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Fecha de Nacimiento:</span>
                                        <p className="font-medium">{selectedStudent.fechaNacimientoMadre}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Grado de Instrucción:</span>
                                        <p className="font-medium">{selectedStudent.gradoInstruccionMadre}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Ocupación:</span>
                                        <p className="font-medium">{selectedStudent.ocupacionMadre}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Vive con el estudiante:</span>
                                        <p className="font-medium">{selectedStudent.viveConEstudianteMadre}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Información Adicional */}
                            <div>
                                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                    <div className="h-1 w-1 bg-primary rounded-full"></div>
                                    Información Adicional
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Número de Hermanos:</span>
                                        <p className="font-medium">{selectedStudent.numeroHermanos}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Lugar que Ocupa:</span>
                                        <p className="font-medium">{selectedStudent.lugarQueOcupa}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Religión:</span>
                                        <p className="font-medium">{selectedStudent.religion || "No especificado"}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Tipo de Sangre:</span>
                                        <p className="font-medium">{selectedStudent.tipoSangre || "No especificado"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Información de Matrícula Actual */}
                            <div>
                                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                    <div className="h-1 w-1 bg-primary rounded-full"></div>
                                    Información de Matrícula Actual
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Año:</span>
                                        <p className="font-medium">{selectedStudent.anioMatriculaActual || "No especificado"}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Institución Educativa:</span>
                                        <p className="font-medium">{selectedStudent.institucionEducativaActual || "No especificado"}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Grado:</span>
                                        <p className="font-medium">{selectedStudent.gradoActual || "No especificado"}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Nivel:</span>
                                        <p className="font-medium">{selectedStudent.nivelActual || "No especificado"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Información de Matrícula Masiva */}
                            {(selectedStudent.grado || selectedStudent.seccion) && (
                                <div>
                                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                        <div className="h-1 w-1 bg-primary rounded-full"></div>
                                        Asignación de Matrícula Masiva
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-muted-foreground">Grado Asignado:</span>
                                            <p className="font-medium">
                                                {selectedStudent.grado ? `${selectedStudent.grado}° Grado` : "No asignado"}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">Sección Asignada:</span>
                                            <p className="font-medium">
                                                {selectedStudent.seccion ? `Sección ${selectedStudent.seccion}` : "No asignada"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Historial de Escolaridad */}
                            {selectedStudent.historialEscolaridad && selectedStudent.historialEscolaridad.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                        <div className="h-1 w-1 bg-primary rounded-full"></div>
                                        Historial de Escolaridad
                                    </h3>
                                    <div className="border rounded-md overflow-hidden">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Año</TableHead>
                                                    <TableHead>Institución Educativa</TableHead>
                                                    <TableHead>Grado</TableHead>
                                                    <TableHead>Nivel</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {selectedStudent.historialEscolaridad.map((item, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{item.anio}</TableCell>
                                                        <TableCell>{item.institucionEducativa}</TableCell>
                                                        <TableCell>{item.grado}</TableCell>
                                                        <TableCell>{item.nivel}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* PDF Viewer Dialog */}
            <Dialog open={showPdfDialog} onOpenChange={(open) => {
                setShowPdfDialog(open);
                if (!open && viewPdfUrl) {
                    URL.revokeObjectURL(viewPdfUrl);
                    setViewPdfUrl(null);
                }
            }}>
                <DialogContent className="max-w-[95vw] w-full h-[95vh]">
                    <DialogHeader>
                        <DialogTitle>Visualizar PDF</DialogTitle>
                        <DialogDescription>
                            Vista previa del archivo seleccionado
                        </DialogDescription>
                    </DialogHeader>
                    {viewPdfUrl && (
                        <iframe
                            src={viewPdfUrl}
                            className="w-full h-full rounded-md border"
                            title="PDF Viewer"
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
