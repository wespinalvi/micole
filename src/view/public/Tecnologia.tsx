import { Code, Cpu, CheckCircle2, Rocket, Brain, Globe, ShieldCheck } from "lucide-react";

const Tecnologia = () => {
    const features = [
        {
            title: "Robótica STEAM",
            desc: "Diseño, construcción y programación de robots utilizando kits de última generación para resolver retos complejos.",
            image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=800&q=80",
            icon: <Cpu className="text-blue-500" />
        },
        {
            title: "Programación y Lógica",
            desc: "Desde Scratch hasta lenguajes como Python, desarrollando el pensamiento computacional y la resolución de problemas.",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
            icon: <Code className="text-green-500" />
        },
        {
            title: "Inteligencia Artificial",
            desc: "Introducción ética y práctica a la IA, comprendiendo su funcionamiento y potencial como herramienta creativa.",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
            icon: <Brain className="text-purple-500" />
        }
    ];

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center text-white overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1920&q=80"
                    className="absolute inset-0 w-full h-full object-cover brightness-50"
                    alt="Tecnología Hero"
                />
                <div className="relative z-10 text-center space-y-4 px-6">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Tecnología e Innovación</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto font-light">
                        Empoderando a la próxima generación de creadores digitales.
                    </p>
                </div>
            </section>

            {/* Innovation Lab Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-center mb-16">
                        <div className="flex-1 space-y-6">
                            <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 font-semibold text-xs uppercase tracking-widest">
                                Innovation Lab
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1e2a5a] leading-tight">
                                Un espacio para imaginar, <br />prototipar y crear.
                            </h2>
                            <p className="text-base text-gray-600 leading-relaxed">
                                Nuestro Laboratorio de Innovación está equipado con impresoras 3D, kits de robótica, estaciones de programación y herramientas de realidad virtual. Aquí, los estudiantes transforman sus ideas en proyectos reales.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {[
                                    "Impresión 3D y Modelado",
                                    "Realidad Virtual Educativa",
                                    "Internet de las Cosas (IoT)",
                                    "Desarrollo de Apps",
                                    "Ciberseguridad Básica",
                                    "Diseño de Videojuegos"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 font-semibold text-[#1e2a5a] text-sm">
                                        <CheckCircle2 className="text-blue-500" size={18} />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <img
                                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80"
                                className="rounded-3xl shadow-2xl relative z-10"
                                alt="Laboratorio de tecnología"
                            />
                            <div className="absolute -top-10 -left-10 w-full h-full border-2 border-blue-500/20 rounded-3xl -z-10 translate-x-4 translate-y-4"></div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((f, i) => (
                            <div key={i} className="group p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-500">
                                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                    {f.icon}
                                </div>
                                <h3 className="text-xl font-bold text-[#1e2a5a] mb-4">{f.title}</h3>
                                <p className="text-gray-600 leading-relaxed mb-6 text-sm">{f.desc}</p>
                                <img src={f.image} className="rounded-2xl w-full aspect-video object-cover" alt={f.title} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Digital Citizenship */}
            <section className="py-16 bg-[#1e2a5a] text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/5 skew-x-12 translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="max-w-3xl space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ciudadanía Digital Responsable</h2>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            No solo enseñamos a usar la tecnología, sino a hacerlo de manera ética, segura y productiva. Nuestro programa incluye talleres de prevención de ciberbullying, gestión de identidad digital y pensamiento crítico ante la información.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-3 bg-white/10 px-5 py-2 rounded-full border border-white/20 text-sm">
                                <ShieldCheck className="text-blue-400" size={18} />
                                <span className="font-semibold">Seguridad Online</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white/10 px-5 py-2 rounded-full border border-white/20 text-sm">
                                <Globe className="text-blue-400" size={18} />
                                <span className="font-semibold">Ética Digital</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white/10 px-5 py-2 rounded-full border border-white/20 text-sm">
                                <Rocket className="text-blue-400" size={18} />
                                <span className="font-semibold">Emprendimiento Tech</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Tecnologia;
