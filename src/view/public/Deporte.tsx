import { Trophy, CheckCircle2, Users, Medal, Heart } from "lucide-react";

const Deporte = () => {
    const sports = [
        {
            title: "Fútbol",
            desc: "Nuestra disciplina estrella. Contamos con una academia de fútbol que participa en torneos regionales y nacionales, fomentando la técnica y la estrategia.",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
            features: ["Entrenamiento táctico", "Preparación física", "Torneos Interescolares"]
        },
        {
            title: "Vóleibol",
            desc: "Desarrollamos la coordinación, agilidad y el espíritu de equipo en nuestras canchas polideportivas techadas.",
            image: "https://images.unsplash.com/photo-1592656670411-2918f7ed47ad?auto=format&fit=crop&w=800&q=80",
            features: ["Técnica de saque y recepción", "Trabajo en equipo", "Competencias regionales"]
        },
        {
            title: "Básquetbol",
            desc: "Fomentamos la rapidez mental y física a través del básquet, con entrenamientos dinámicos y competitivos.",
            image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
            features: ["Fundamentos de tiro", "Estrategia de juego", "Liderazgo en cancha"]
        },
        {
            title: "Atletismo",
            desc: "Carreras de velocidad, saltos y lanzamientos para desarrollar la potencia y resistencia de nuestros atletas.",
            image: "https://images.unsplash.com/photo-1461896756985-21465c16c73e?auto=format&fit=crop&w=800&q=80",
            features: ["Técnica de carrera", "Salto largo y alto", "Resistencia aeróbica"]
        }
    ];

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center text-white overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=1920&q=80"
                    className="absolute inset-0 w-full h-full object-cover brightness-50"
                    alt="Deporte Hero"
                />
                <div className="relative z-10 text-center space-y-4 px-6">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Deporte y Bienestar</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto font-light">
                        Formando campeones dentro y fuera de la cancha.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-8 bg-[#F26513] text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="space-y-2">
                            <Trophy className="mx-auto w-10 h-10 opacity-80" />
                            <div className="text-3xl font-bold">50+</div>
                            <div className="text-xs uppercase tracking-widest font-semibold">Trofeos Ganados</div>
                        </div>
                        <div className="space-y-2">
                            <Users className="mx-auto w-10 h-10 opacity-80" />
                            <div className="text-3xl font-bold">12</div>
                            <div className="text-xs uppercase tracking-widest font-semibold">Selecciones Activas</div>
                        </div>
                        <div className="space-y-2">
                            <Medal className="mx-auto w-10 h-10 opacity-80" />
                            <div className="text-3xl font-bold">100%</div>
                            <div className="text-xs uppercase tracking-widest font-semibold">Participación Alumnos</div>
                        </div>
                        <div className="space-y-2">
                            <Heart className="mx-auto w-10 h-10 opacity-80" />
                            <div className="text-3xl font-bold">Vida</div>
                            <div className="text-xs uppercase tracking-widest font-semibold">Saludable</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                        <h2 className="text-[#F26513] font-semibold tracking-widest uppercase text-xs">Nuestra Propuesta Deportiva</h2>
                        <p className="text-3xl md:text-4xl font-bold text-[#1e2a5a] tracking-tight">
                            Disciplinas que forjan el carácter.
                        </p>
                        <p className="text-lg text-gray-600">
                            Contamos con infraestructura de primer nivel y un equipo de entrenadores profesionales dedicados a potenciar el talento de cada estudiante.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {sports.map((sport, i) => (
                            <div key={i} className="group bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500">
                                <div className="h-64 overflow-hidden relative">
                                    <img
                                        src={sport.image}
                                        alt={sport.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-6 py-2 rounded-full font-bold text-[#1e2a5a] shadow-lg">
                                        {sport.title}
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    <p className="text-gray-600 leading-relaxed">{sport.desc}</p>
                                    <div className="space-y-3">
                                        {sport.features.map((feat, fi) => (
                                            <div key={fi} className="flex items-center gap-3 font-semibold text-[#1e2a5a]">
                                                <CheckCircle2 className="text-[#F26513]" size={18} />
                                                {feat}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Infrastructure Preview */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="flex-1 space-y-6">
                            <h2 className="text-3xl font-bold text-[#1e2a5a]">Infraestructura de Vanguardia</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Nuestras instalaciones deportivas están diseñadas para cumplir con los más altos estándares de seguridad y rendimiento.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-[#F26513] flex items-center justify-center text-white shrink-0 mt-1">1</div>
                                    <div>
                                        <h4 className="font-semibold text-[#1e2a5a]">Canchas de Grass Sintético</h4>
                                        <p className="text-gray-500">Certificadas para la práctica profesional del fútbol.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-[#F26513] flex items-center justify-center text-white shrink-0 mt-1">2</div>
                                    <div>
                                        <h4 className="font-semibold text-[#1e2a5a]">Coliseo Cerrado</h4>
                                        <p className="text-gray-500">Espacio techado para vóley, básquet y eventos masivos.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-[#F26513] flex items-center justify-center text-white shrink-0 mt-1">3</div>
                                    <div>
                                        <h4 className="font-semibold text-[#1e2a5a]">Gimnasio Equipado</h4>
                                        <p className="text-gray-500">Área de preparación física y musculación controlada.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4">
                            <img src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80" className="rounded-3xl shadow-lg" alt="Gym" />
                            <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=400&q=80" className="rounded-3xl shadow-lg mt-8" alt="Soccer" />
                            <img src="https://images.unsplash.com/photo-1592656670411-2918f7ed47ad?auto=format&fit=crop&w=400&q=80" className="rounded-3xl shadow-lg -mt-8" alt="Volley" />
                            <img src="https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&q=80" className="rounded-3xl shadow-lg" alt="Basket" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Deporte;
