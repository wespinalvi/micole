import { CheckCircle2, Star, Baby, Palette } from "lucide-react";

const EarlyYears = () => {
    const sections = [
        {
            title: "Desarrollo Cognitivo",
            desc: "Estimulamos el pensamiento lógico y la curiosidad natural a través de proyectos de exploración y descubrimiento.",
            image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80",
            icon: <Star className="text-orange-500" />
        },
        {
            title: "Psicomotricidad",
            desc: "Contamos con circuitos diseñados para el desarrollo de la motricidad gruesa y fina, fundamentales en esta etapa.",
            image: "https://images.unsplash.com/photo-1564429138964-bb90bd4d23c2?auto=format&fit=crop&w=800&q=80",
            icon: <Baby className="text-blue-500" />
        },
        {
            title: "Expresión Artística",
            desc: "Talleres de pintura, música y teatro para que los más pequeños expresen sus emociones y creatividad.",
            image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
            icon: <Palette className="text-pink-500" />
        }
    ];

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center text-white overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1920&q=80"
                    className="absolute inset-0 w-full h-full object-cover brightness-50"
                    alt="Early Years Hero"
                />
                <div className="relative z-10 text-center space-y-4 px-6">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Early Years</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto font-light">
                        Donde el amor por el aprendizaje comienza con un juego.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
                        <div className="space-y-6">
                            <div className="inline-block px-4 py-1 rounded-full bg-orange-100 text-[#F26513] font-semibold text-xs uppercase tracking-widest">
                                Nuestra Filosofía
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1e2a5a] leading-tight">
                                Un entorno seguro y <br />estimulante para crecer.
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                En Crayon's Early Years, entendemos que los primeros años son cruciales para el desarrollo cerebral y emocional. Nuestra metodología se basa en el respeto al niño, fomentando su autonomía y seguridad personal a través de experiencias vivenciales.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    "Aulas temáticas modernas",
                                    "Docentes especializadas",
                                    "Inglés por inmersión",
                                    "Seguimiento psicológico",
                                    "Nutrición balanceada",
                                    "Seguridad 24/7"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 font-semibold text-[#1e2a5a] text-sm">
                                        <CheckCircle2 className="text-[#F26513]" size={18} />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&w=800&q=80"
                                className="rounded-3xl shadow-2xl relative z-10"
                                alt="Niños jugando"
                            />
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#F26513]/10 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#1e2a5a]/10 rounded-full blur-3xl"></div>
                        </div>
                    </div>

                    {/* Detailed Sections */}
                    <div className="space-y-12">
                        {sections.map((section, i) => (
                            <div key={i} className={`flex flex-col lg:flex-row gap-12 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                                <div className="flex-1 space-y-4">
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shadow-sm">
                                        {section.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#1e2a5a]">{section.title}</h3>
                                    <p className="text-base text-gray-600 leading-relaxed">{section.desc}</p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2 text-gray-500 text-sm"><CheckCircle2 size={14} className="text-green-500" /> Metodología personalizada</li>
                                        <li className="flex items-center gap-2 text-gray-500 text-sm"><CheckCircle2 size={14} className="text-green-500" /> Materiales didácticos premium</li>
                                        <li className="flex items-center gap-2 text-gray-500 text-sm"><CheckCircle2 size={14} className="text-green-500" /> Evaluación de progreso mensual</li>
                                    </ul>
                                </div>
                                <div className="flex-1">
                                    <img
                                        src={section.image}
                                        className="rounded-2xl shadow-xl w-full aspect-video object-cover hover:scale-105 transition-transform duration-700"
                                        alt={section.title}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-[#1e2a5a] text-white">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold">¿Quieres ver nuestras aulas?</h2>
                    <p className="text-lg text-gray-300">Agenda una visita guiada y conoce por qué somos la mejor opción para el inicio escolar de tus hijos.</p>
                    <button className="bg-[#F26513] hover:bg-[#d95a11] text-white px-10 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-1">
                        Programar Visita
                    </button>
                </div>
            </section>
        </div>
    );
};

export default EarlyYears;
