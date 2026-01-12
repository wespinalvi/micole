import { Trophy, Laptop, Star, Globe, ArrowRight } from "lucide-react";

const Pilares = () => {
    const pillars = [
        {
            title: "Excelencia Académica",
            desc: "Implementamos metodologías activas y estándares internacionales para asegurar un aprendizaje profundo y significativo.",
            icon: <Trophy className="w-12 h-12" />,
            features: ["Metodología ABP", "Evaluación Continua", "Docentes Especializados"]
        },
        {
            title: "Innovación Tecnológica",
            desc: "Integramos herramientas digitales de vanguardia en el aula para potenciar la creatividad y las competencias del siglo XXI.",
            icon: <Laptop className="w-12 h-12" />,
            features: ["Laboratorios STEAM", "Robótica Educativa", "Plataformas Virtuales"]
        },
        {
            title: "Formación en Valores",
            desc: "Nuestro enfoque trasciende lo académico, cultivando la integridad, el respeto y la responsabilidad en cada estudiante.",
            icon: <Star className="w-12 h-12" />,
            features: ["Programa de Virtudes", "Acción Social", "Orientación Familiar"]
        },
        {
            title: "Visión Global",
            desc: "Preparamos a nuestros alumnos para un mundo interconectado, fomentando el dominio de idiomas y la conciencia cultural.",
            icon: <Globe className="w-12 h-12" />,
            features: ["Inglés Intensivo", "Intercambios Culturales", "Certificaciones"]
        }
    ];

    return (
        <div className="flex flex-col w-full">
            {/* Header */}
            <section className="relative py-16 bg-[#1e2a5a] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-3">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Nuestros Pilares</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
                        Los fundamentos sobre los cuales construimos una educación de clase mundial.
                    </p>
                </div>
            </section>

            {/* Pillars Detail */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6 space-y-12">
                    {pillars.map((pillar, i) => (
                        <div key={i} className={`flex flex-col lg:flex-row items-center gap-16 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                            <div className="flex-1 space-y-6">
                                <div className="w-14 h-14 rounded-2xl bg-[#F26513]/10 text-[#F26513] flex items-center justify-center">
                                    {pillar.icon}
                                </div>
                                <h2 className="text-3xl font-bold text-[#1e2a5a] tracking-tight">{pillar.title}</h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {pillar.desc}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {pillar.features.map((feat, fi) => (
                                        <div key={fi} className="flex items-center gap-3 text-[#1e2a5a] font-semibold">
                                            <div className="w-2 h-2 rounded-full bg-[#F26513]"></div>
                                            {feat}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 w-full">
                                <div className="aspect-video rounded-3xl bg-gray-100 overflow-hidden shadow-2xl relative group">
                                    <img
                                        src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&w=800&q=80`}
                                        alt={pillar.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e2a5a]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
                                        <button className="bg-white text-[#1e2a5a] px-6 py-3 rounded-full font-semibold flex items-center gap-2">
                                            Saber más <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Pilares;
