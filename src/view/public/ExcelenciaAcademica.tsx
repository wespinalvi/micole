import { Trophy, Star, CheckCircle2, Globe, Users } from "lucide-react";

const ExcelenciaAcademica = () => {
    const features = [
        {
            title: "Currículo Internacional",
            desc: "Basado en estándares globales que preparan a nuestros alumnos para cualquier desafío académico.",
            icon: <Globe className="w-8 h-8 text-blue-600" />
        },
        {
            title: "Docentes de Élite",
            desc: "Contamos con un equipo de profesionales altamente calificados y en constante capacitación.",
            icon: <Users className="w-8 h-8 text-orange-600" />
        },
        {
            title: "Metodología Activa",
            desc: "El estudiante es el protagonista de su propio aprendizaje a través de la investigación y el análisis.",
            icon: <Star className="w-8 h-8 text-yellow-600" />
        }
    ];

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="relative py-16 bg-[#1e2a5a] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium mb-3">
                        <Trophy size={14} className="text-[#F26513]" />
                        <span>Calidad Educativa Garantizada</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Excelencia Académica</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
                        Formamos mentes brillantes con un enfoque en la investigación, el pensamiento crítico y la superación personal.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-[#1e2a5a] leading-tight">
                                Un estándar superior de <br />aprendizaje integral.
                            </h2>
                            <p className="text-base text-gray-600 leading-relaxed">
                                En Crayon's, la excelencia no es un acto, sino un hábito. Nuestro programa académico está diseñado para potenciar las habilidades cognitivas y emocionales de cada estudiante, asegurando un ingreso exitoso a las mejores universidades.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Preparación pre-universitaria desde grados intermedios",
                                    "Laboratorios de ciencias y tecnología de última generación",
                                    "Programas de tutoría personalizada",
                                    "Certificaciones internacionales en diversas áreas"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 font-medium text-[#1e2a5a] text-sm">
                                        <CheckCircle2 className="text-[#F26513]" size={18} />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                                alt="Estudiantes estudiando"
                                className="rounded-[3rem] shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {features.map((f, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500">
                                <div className="mb-6">{f.icon}</div>
                                <h3 className="text-xl font-bold text-[#1e2a5a] mb-4">{f.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ExcelenciaAcademica;
