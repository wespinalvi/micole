import { Music, Palette, Theater, Mic2, Brush, Camera, Star } from "lucide-react";

const ArteCultura = () => {
    const workshops = [
        {
            title: "Música e Instrumentos",
            desc: "Desde la flauta dulce hasta el piano y la guitarra. Nuestros alumnos aprenden teoría musical y práctica instrumental en un entorno creativo.",
            image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
            icon: <Music className="text-purple-500" />,
            features: ["Coro Institucional", "Banda de Música", "Composición Digital"]
        },
        {
            title: "Artes Plásticas",
            desc: "Exploramos diversas técnicas como óleo, acuarela, escultura y grabado, permitiendo que cada estudiante encuentre su propio estilo visual.",
            image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80",
            icon: <Palette className="text-red-500" />,
            features: ["Pintura y Dibujo", "Escultura en Arcilla", "Diseño Gráfico Básico"]
        },
        {
            title: "Teatro y Oratoria",
            desc: "Desarrollamos la confianza, la expresión corporal y la elocuencia a través de las artes escénicas y el debate.",
            image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80",
            icon: <Theater className="text-blue-500" />,
            features: ["Actuación Dramática", "Técnicas de Oratoria", "Producción Escénica"]
        },
        {
            title: "Danzas Folclóricas",
            desc: "Revaloramos nuestra identidad cultural a través del aprendizaje de danzas tradicionales de las tres regiones del Perú.",
            image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
            icon: <Star className="text-yellow-500" />,
            features: ["Marinera y Huayno", "Danzas de la Selva", "Festivales Culturales"]
        }
    ];

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center text-white overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1920&q=80"
                    className="absolute inset-0 w-full h-full object-cover brightness-50"
                    alt="Arte Hero"
                />
                <div className="relative z-10 text-center space-y-4 px-6">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Arte y Cultura</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto font-light">
                        Donde la imaginación cobra vida y el talento se transforma en expresión.
                    </p>
                </div>
            </section>

            {/* Intro Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
                        <div className="space-y-6">
                            <div className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-600 font-semibold text-xs uppercase tracking-widest">
                                Expresión Creativa
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1e2a5a] leading-tight">
                                El arte como motor de <br />desarrollo personal.
                            </h2>
                            <p className="text-base text-gray-600 leading-relaxed">
                                En Crayon's, el arte no es una materia secundaria, sino un eje fundamental para el desarrollo de la sensibilidad, el pensamiento crítico y la inteligencia emocional. Nuestros talleres están diseñados para inspirar y desafiar a los estudiantes.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                                    <Mic2 className="mx-auto mb-2 text-purple-500" size={24} />
                                    <h4 className="font-semibold text-[#1e2a5a] text-sm">Voz y Canto</h4>
                                </div>
                                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                                    <Brush className="mx-auto mb-2 text-red-500" size={24} />
                                    <h4 className="font-semibold text-[#1e2a5a] text-sm">Pintura</h4>
                                </div>
                                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                                    <Camera className="mx-auto mb-2 text-blue-500" size={24} />
                                    <h4 className="font-semibold text-[#1e2a5a] text-sm">Fotografía</h4>
                                </div>
                                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                                    <Star className="mx-auto mb-2 text-yellow-500" size={24} />
                                    <h4 className="font-semibold text-[#1e2a5a] text-sm">Danza</h4>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?auto=format&fit=crop&w=800&q=80"
                                className="rounded-3xl shadow-2xl relative z-10"
                                alt="Arte en el colegio"
                            />
                            <div className="absolute -bottom-10 -right-10 w-full h-full bg-purple-500/10 rounded-3xl -z-10 translate-x-4 translate-y-4"></div>
                        </div>
                    </div>

                    {/* Workshops Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {workshops.map((ws, i) => (
                            <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">
                                <div className="h-56 overflow-hidden">
                                    <img
                                        src={ws.image}
                                        alt={ws.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                                            {ws.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-[#1e2a5a]">{ws.title}</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">{ws.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {ws.features.map((feat, fi) => (
                                            <span key={fi} className="px-3 py-1 rounded-full bg-gray-50 text-gray-500 text-xs font-semibold border border-gray-100">
                                                {feat}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Exhibition CTA */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="relative z-10 space-y-6">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Galería de Talentos</h2>
                            <p className="text-lg text-purple-50 max-w-2xl mx-auto font-light">
                                Cada año celebramos nuestra "Noche de las Artes", donde los alumnos exponen sus trabajos y realizan presentaciones en vivo para toda la comunidad.
                            </p>
                            <button className="bg-white text-purple-600 hover:bg-purple-50 px-10 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-1">
                                Ver Galería Virtual
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ArteCultura;
