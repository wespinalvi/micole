import { Star, Trophy, Laptop, Music, Plane, MessageSquare, ArrowRight } from "lucide-react";

const PropuestaEducativa = () => {
    const offerings = [
        {
            title: "Excelencia Académica",
            desc: "Nuestro currículo está diseñado para desafiar y motivar a los estudiantes, preparándolos para los retos universitarios y profesionales.",
            icon: <Trophy className="w-10 h-10" />,
            color: "bg-blue-50 text-blue-600"
        },
        {
            title: "Idiomas (Inglés)",
            desc: "Programa intensivo de inglés con certificaciones internacionales, permitiendo a nuestros alumnos comunicarse con fluidez en un mundo global.",
            icon: <MessageSquare className="w-10 h-10" />,
            color: "bg-orange-50 text-orange-600"
        },
        {
            title: "Tecnología e Innovación",
            desc: "Integración de robótica, programación y herramientas digitales para desarrollar el pensamiento lógico y la creatividad.",
            icon: <Laptop className="w-10 h-10" />,
            color: "bg-indigo-50 text-indigo-600"
        },
        {
            title: "Deporte y Bienestar",
            desc: "Fomentamos la actividad física y el espíritu deportivo a través de diversas disciplinas y competencias interescolares.",
            icon: <Star className="w-10 h-10" />,
            color: "bg-green-50 text-green-600"
        },
        {
            title: "Arte y Cultura",
            desc: "Talleres de música, danza, teatro y artes plásticas para el desarrollo de la sensibilidad y la expresión personal.",
            icon: <Music className="w-10 h-10" />,
            color: "bg-red-50 text-red-600"
        },
        {
            title: "Viajes de Estudio",
            desc: "Experiencias vivenciales que complementan el aprendizaje en el aula, conociendo la realidad cultural y natural de nuestro país.",
            icon: <Plane className="w-10 h-10" />,
            color: "bg-yellow-50 text-yellow-600"
        }
    ];

    return (
        <div className="flex flex-col w-full">
            {/* Header */}
            <section className="relative py-16 bg-[#1e2a5a] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-3">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Nuestra Propuesta</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
                        Un modelo educativo integral diseñado para potenciar el talento de cada estudiante.
                    </p>
                </div>
            </section>

            {/* Grid */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {offerings.map((off, i) => (
                            <div key={i} className="group p-8 rounded-[2rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
                                <div className={`w-14 h-14 rounded-2xl ${off.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                    {off.icon}
                                </div>
                                <h3 className="text-xl font-bold text-[#1e2a5a] mb-3">{off.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                    {off.desc}
                                </p>
                                <button className="flex items-center gap-2 font-semibold text-[#F26513] hover:text-[#1e2a5a] transition-colors text-xs">
                                    VER DETALLES <ArrowRight size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12 space-y-3">
                        <h2 className="text-2xl font-bold text-[#1e2a5a]">Convenios y Alianzas</h2>
                        <p className="text-gray-500 text-sm">Trabajamos con las mejores instituciones para brindar mayores oportunidades.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholder logos */}
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="h-16 w-40 bg-gray-200 rounded-xl flex items-center justify-center font-semibold text-gray-400">
                                PARTNER {i}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PropuestaEducativa;
