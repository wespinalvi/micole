import { ClipboardList, UserPlus, FileCheck, CreditCard, ArrowRight, CheckCircle2 } from "lucide-react";

const Admision = () => {
    const steps = [
        { title: "Solicitud", icon: <ClipboardList size={32} />, desc: "Completa el formulario de pre-inscripción en línea o presencial." },
        { title: "Entrevista", icon: <UserPlus size={32} />, desc: "Programamos una reunión con los padres y una evaluación diagnóstica." },
        { title: "Documentación", icon: <FileCheck size={32} />, desc: "Entrega de documentos requeridos por el MINEDU y la institución." },
        { title: "Matrícula", icon: <CreditCard size={32} />, desc: "Pago de cuota de ingreso y confirmación de vacante." }
    ];

    return (
        <div className="flex flex-col w-full">
            {/* Page Header */}
            <section className="relative py-16 bg-[#1e2a5a] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-3">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Proceso de Admisión</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
                        Únete a nuestra comunidad educativa y brinda a tus hijos una formación de excelencia.
                    </p>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                        <h2 className="text-[#F26513] font-semibold tracking-widest uppercase text-xs">Paso a Paso</h2>
                        <p className="text-3xl font-bold text-[#1e2a5a] tracking-tight">¿Cómo postular?</p>
                        <div className="w-16 h-1 bg-[#F26513] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                        {/* Connector Line (Desktop) */}
                        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-12 z-0"></div>

                        {steps.map((step, i) => (
                            <div key={i} className="relative z-10 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 text-center space-y-4">
                                <div className="w-20 h-20 rounded-3xl bg-[#F26513] text-white flex items-center justify-center mx-auto shadow-lg shadow-orange-500/20">
                                    {step.icon}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-semibold text-[#1e2a5a]">{step.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                                </div>
                                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#1e2a5a] text-white flex items-center justify-center font-bold text-lg">
                                    {i + 1}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Requirements Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-[#1e2a5a] tracking-tight">Requisitos Generales</h2>
                            <div className="space-y-4">
                                {[
                                    "Copia del DNI del estudiante y de ambos padres.",
                                    "Ficha Única de Matrícula del SIAGIE.",
                                    "Certificado de estudios de los grados anteriores.",
                                    "Constancia de no adeudo del colegio de procedencia.",
                                    "Partida de nacimiento original.",
                                    "Informe de progreso (Libreta de notas) del año anterior."
                                ].map((req, i) => (
                                    <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100">
                                        <CheckCircle2 className="text-[#F26513] shrink-0" size={20} />
                                        <span className="text-gray-700 font-medium text-sm">{req}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-[#1e2a5a] rounded-3xl p-8 text-white space-y-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F26513] rounded-full blur-3xl opacity-20"></div>
                            <h3 className="text-2xl font-semibold">¿Necesitas ayuda?</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Nuestro equipo de admisión está listo para guiarte en cada paso.
                                Si tienes dudas sobre las vacantes disponibles o los costos, no dudes en contactarnos.
                            </p>
                            <div className="space-y-4">
                                <button className="w-full bg-[#F26513] hover:bg-[#d95a11] text-white py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2">
                                    Descargar Guía de Admisión <ArrowRight size={20} />
                                </button>
                                <button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-4 rounded-2xl font-semibold transition-all">
                                    Ver Preguntas Frecuentes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Admision;
