import { Users, Heart, Star, GraduationCap, MessageSquare, ArrowRight } from "lucide-react";

const Comunidad = () => {
    const groups = [
        {
            title: "Nuestros Alumnos",
            desc: "El corazón de nuestra institución. Fomentamos su liderazgo, creatividad y bienestar socioemocional.",
            icon: <Users className="w-10 h-10" />,
            path: "/alumnos"
        },
        {
            title: "Padres de Familia",
            desc: "Aliados estratégicos en la formación. Promovemos una comunicación abierta y talleres de crecimiento familiar.",
            icon: <Heart className="w-10 h-10" />,
            path: "/padres"
        },
        {
            title: "Plana Docente",
            desc: "Profesionales apasionados y en constante capacitación para brindar la mejor experiencia educativa.",
            icon: <Star className="w-10 h-10" />,
            path: "/profesores"
        },
        {
            title: "Exalumnos",
            desc: "Nuestra huella en el mundo. Una red de líderes que siguen vinculados a su alma mater.",
            icon: <GraduationCap className="w-10 h-10" />,
            path: "/exalumnos"
        }
    ];

    return (
        <div className="flex flex-col w-full">
            {/* Header */}
            <section className="relative py-16 bg-[#1e2a5a] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-3">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight">Nuestra Comunidad</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
                        Unidos por un propósito: formar personas íntegras y exitosas.
                    </p>
                </div>
            </section>

            {/* Community Grid */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {groups.map((group, i) => (
                            <div key={i} className="group p-8 rounded-[2rem] bg-gray-50 border border-gray-100 hover:bg-[#1e2a5a] hover:text-white transition-all duration-500 flex flex-col items-start gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-[#F26513] text-white flex items-center justify-center shadow-lg">
                                    {group.icon}
                                </div>
                                <h3 className="text-2xl font-black">{group.title}</h3>
                                <p className="text-base opacity-80 leading-relaxed">
                                    {group.desc}
                                </p>
                                <button className="mt-2 flex items-center gap-2 font-bold text-[#F26513] group-hover:text-white transition-colors text-sm">
                                    CONOCER MÁS <ArrowRight size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Intranet CTA */}
            <section className="py-16 bg-[#F26513]/5">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-orange-100 flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1 space-y-4">
                            <h2 className="text-3xl font-black text-[#1e2a5a] tracking-tight">Acceso a nuestra Plataforma Virtual</h2>
                            <p className="text-base text-gray-600">
                                Gestiona tus trámites, consulta notas y mantente al día con las actividades escolares a través de nuestra Intranet.
                            </p>
                            <button className="bg-[#1e2a5a] text-white px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-[#151d3d] transition-all">
                                Ingresar a Intranet <MessageSquare size={20} />
                            </button>
                        </div>
                        <div className="flex-1">
                            <img
                                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
                                alt="Plataforma Virtual"
                                className="rounded-[2rem] shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Comunidad;
