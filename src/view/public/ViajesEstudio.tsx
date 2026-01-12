import { Plane, CheckCircle2 } from "lucide-react";

const ViajesEstudio = () => {
    const destinations = [
        {
            title: "Rutas Históricas",
            desc: "Visitas a centros arqueológicos y museos para conectar con nuestras raíces.",
            image: "https://images.unsplash.com/photo-1587547131116-a0655a526190?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Expediciones Científicas",
            desc: "Exploración de ecosistemas para el estudio de la biodiversidad y el medio ambiente.",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Intercambios Culturales",
            desc: "Experiencias de inmersión en diferentes comunidades para fomentar la empatía.",
            image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80"
        }
    ];

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="relative py-16 bg-[#1e2a5a] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium mb-3">
                        <Plane size={14} className="text-[#F26513]" />
                        <span>Aprendizaje sin Fronteras</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Viajes de Estudio</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
                        El mundo es nuestra aula. Llevamos el aprendizaje más allá de las paredes del colegio.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-[#1e2a5a] leading-tight">
                                Experiencias que <br />transforman vidas.
                            </h2>
                            <p className="text-base text-gray-600 leading-relaxed">
                                Nuestros viajes de estudio están cuidadosamente planificados para complementar el currículo académico, permitiendo a los estudiantes vivir en primera persona los conocimientos adquiridos en clase.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Seguridad garantizada en todo momento",
                                    "Guías especializados por área de estudio",
                                    "Bitácora de viaje y proyectos de investigación",
                                    "Fomento de la autonomía y el trabajo en equipo"
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
                                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80"
                                alt="Estudiantes de viaje"
                                className="rounded-[3rem] shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Destinations Grid */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-[#1e2a5a]">Nuestras Rutas</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {destinations.map((d, i) => (
                            <div key={i} className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                                <div className="h-56 overflow-hidden">
                                    <img src={d.image} alt={d.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-[#1e2a5a] mb-2">{d.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{d.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ViajesEstudio;
