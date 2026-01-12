import { Heart, Shield, Star, Users, Target, Lightbulb } from "lucide-react";

const Valores = () => {
    const values = [
        {
            title: "Integridad",
            desc: "Actuamos con honestidad, ética y transparencia en todas nuestras acciones, formando personas de palabra y confianza.",
            icon: <Shield className="w-12 h-12" />,
            color: "bg-blue-50 text-blue-600"
        },
        {
            title: "Respeto",
            desc: "Valoramos la diversidad y la dignidad de cada individuo, fomentando un ambiente de convivencia armónica y empatía.",
            icon: <Heart className="w-12 h-12" />,
            color: "bg-red-50 text-red-600"
        },
        {
            title: "Excelencia",
            desc: "Buscamos la mejora continua en todo lo que hacemos, superando expectativas y dando siempre lo mejor de nosotros.",
            icon: <Star className="w-12 h-12" />,
            color: "bg-orange-50 text-orange-600"
        },
        {
            title: "Colaboración",
            desc: "Trabajamos en equipo, reconociendo que la unión de talentos y esfuerzos nos permite alcanzar metas más grandes.",
            icon: <Users className="w-12 h-12" />,
            color: "bg-green-50 text-green-600"
        },
        {
            title: "Responsabilidad",
            desc: "Asumimos las consecuencias de nuestros actos y cumplimos con nuestros compromisos hacia la sociedad y el medio ambiente.",
            icon: <Target className="w-12 h-12" />,
            color: "bg-purple-50 text-purple-600"
        },
        {
            title: "Innovación",
            desc: "Fomentamos la creatividad y el pensamiento crítico para encontrar soluciones novedosas a los retos del futuro.",
            icon: <Lightbulb className="w-12 h-12" />,
            color: "bg-yellow-50 text-yellow-600"
        }
    ];

    return (
        <div className="flex flex-col w-full">
            {/* Header */}
            <section className="relative py-16 bg-[#1e2a5a] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-3">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight">Nuestros Valores</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
                        Los principios que guían nuestro camino y forman el carácter de nuestros estudiantes.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {values.map((val, i) => (
                            <div key={i} className="group p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
                                <div className={`w-16 h-16 rounded-[1.5rem] ${val.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                    {val.icon}
                                </div>
                                <h3 className="text-xl font-black text-[#1e2a5a] mb-3">{val.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {val.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-16 bg-[#F26513] text-white">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
                    <div className="text-6xl font-serif opacity-30">"</div>
                    <h2 className="text-2xl md:text-3xl font-black italic leading-tight">
                        La educación no es solo llenar un cubo, sino encender un fuego. Nuestros valores son la chispa que inicia ese incendio de conocimiento y virtud.
                    </h2>
                    <div className="w-20 h-1 bg-white/30 mx-auto"></div>
                    <p className="font-bold tracking-widest uppercase text-sm">Filosofía Crayon's</p>
                </div>
            </section>
        </div>
    );
};

export default Valores;
