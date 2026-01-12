import { Globe, Languages, CheckCircle2, MessageSquare, BookOpen, GraduationCap, Plane } from "lucide-react";

const Idiomas = () => {
    const levels = [
        {
            title: "Starters / Movers",
            target: "Primaria Baja",
            desc: "Iniciación lúdica y comunicativa para sentar las bases del idioma.",
            icon: <BookOpen className="text-blue-500" />
        },
        {
            title: "Flyers / KET",
            target: "Primaria Alta",
            desc: "Desarrollo de las cuatro habilidades: hablar, leer, escribir y escuchar.",
            icon: <Languages className="text-orange-500" />
        },
        {
            title: "PET / FCE",
            target: "Secundaria",
            desc: "Niveles intermedios y avanzados para una comunicación fluida y académica.",
            icon: <GraduationCap className="text-purple-500" />
        }
    ];

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center text-white overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1920&q=80"
                    className="absolute inset-0 w-full h-full object-cover brightness-50"
                    alt="Idiomas Hero"
                />
                <div className="relative z-10 text-center space-y-4 px-6">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Idiomas</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto font-light">
                        Conectando a nuestros estudiantes con un mundo sin fronteras.
                    </p>
                </div>
            </section>

            {/* Methodology Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
                        <div className="space-y-6">
                            <div className="inline-block px-4 py-1 rounded-full bg-orange-100 text-[#F26513] font-semibold text-xs uppercase tracking-widest">
                                Global Communication
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1e2a5a] leading-tight">
                                Más que aprender un idioma, <br />enseñamos a vivirlo.
                            </h2>
                            <p className="text-base text-gray-600 leading-relaxed">
                                Nuestro enfoque comunicativo integral permite que los estudiantes utilicen el inglés como una herramienta natural de aprendizaje en diversas áreas, desde ciencias hasta artes, preparándolos para un entorno globalizado.
                            </p>
                            <div className="space-y-3">
                                {[
                                    "Metodología 100% comunicativa",
                                    "Preparación para Exámenes Cambridge",
                                    "Docentes con certificaciones internacionales",
                                    "Laboratorio de idiomas multimedia",
                                    "Proyectos de intercambio virtual",
                                    "Club de debate en inglés"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 font-semibold text-[#1e2a5a] text-sm">
                                        <CheckCircle2 className="text-[#F26513]" size={18} />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80" className="rounded-2xl shadow-xl" alt="Estudiantes" />
                            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80" className="rounded-2xl shadow-xl mt-8" alt="Clase" />
                        </div>
                    </div>

                    {/* Cambridge Levels */}
                    <div className="text-center mb-12 space-y-3">
                        <h3 className="text-2xl md:text-3xl font-bold text-[#1e2a5a]">Ruta de Certificación Cambridge</h3>
                        <p className="text-gray-500 max-w-2xl mx-auto text-sm">Acompañamos a nuestros alumnos en cada etapa de su crecimiento lingüístico con estándares internacionales.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {levels.map((level, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center hover:bg-white hover:shadow-xl transition-all duration-500">
                                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mx-auto mb-5">
                                    {level.icon}
                                </div>
                                <h4 className="text-xl font-bold text-[#1e2a5a] mb-2">{level.title}</h4>
                                <div className="text-[#F26513] font-semibold text-xs mb-4 uppercase tracking-wider">{level.target}</div>
                                <p className="text-gray-600 leading-relaxed text-sm">{level.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* International Experience */}
            <section className="py-16 bg-[#F26513] text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="flex-1 space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Experiencias Internacionales</h2>
                            <p className="text-lg text-orange-50 leading-relaxed">
                                Fomentamos el intercambio cultural a través de viajes de estudio opcionales y proyectos colaborativos con colegios de otros países, permitiendo que nuestros alumnos pongan en práctica sus habilidades en el mundo real.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-3 bg-white/10 px-5 py-2 rounded-full border border-white/20 text-sm">
                                    <Plane className="text-white" size={18} />
                                    <span className="font-semibold">Study Tours</span>
                                </div>
                                <div className="flex items-center gap-3 bg-white/10 px-5 py-2 rounded-full border border-white/20 text-sm">
                                    <Globe className="text-white" size={18} />
                                    <span className="font-semibold">Intercambios Virtuales</span>
                                </div>
                                <div className="flex items-center gap-3 bg-white/10 px-5 py-2 rounded-full border border-white/20 text-sm">
                                    <MessageSquare className="text-white" size={18} />
                                    <span className="font-semibold">Debate Global</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <img
                                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80"
                                className="rounded-2xl shadow-2xl border-8 border-white/10"
                                alt="Experiencia internacional"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Idiomas;
