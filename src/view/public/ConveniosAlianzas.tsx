import { Handshake, Globe, Award, ShieldCheck, CheckCircle2 } from "lucide-react";

const ConveniosAlianzas = () => {
    const partners = [
        {
            name: "Universidades Top",
            desc: "Convenios de ingreso directo y becas con las mejores universidades del país y el extranjero.",
            icon: <Award className="w-8 h-8 text-blue-600" />
        },
        {
            name: "Centros de Idiomas",
            desc: "Alianzas estratégicas para certificaciones internacionales en inglés y otros idiomas.",
            icon: <Globe className="w-8 h-8 text-orange-600" />
        },
        {
            name: "Empresas Tecnológicas",
            desc: "Acceso a herramientas y programas de vanguardia para el desarrollo de habilidades digitales.",
            icon: <ShieldCheck className="w-8 h-8 text-indigo-600" />
        }
    ];

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="relative py-16 bg-[#1e2a5a] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium mb-3">
                        <Handshake size={14} className="text-[#F26513]" />
                        <span>Red de Oportunidades</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Convenios y Alianzas</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
                        Fortalecemos nuestra propuesta educativa a través de vínculos estratégicos con instituciones líderes.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-[#1e2a5a] leading-tight">
                                Abriendo puertas al <br />futuro de nuestros alumnos.
                            </h2>
                            <p className="text-base text-gray-600 leading-relaxed">
                                Creemos en el poder de la colaboración. Por ello, mantenemos una red activa de convenios que brindan beneficios exclusivos a nuestra comunidad educativa, desde descuentos en pensiones universitarias hasta programas de intercambio.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Ingreso directo a universidades de prestigio",
                                    "Certificaciones internacionales de idiomas",
                                    "Programas de capacitación para docentes",
                                    "Acceso preferencial a eventos culturales y deportivos"
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
                                src="https://images.unsplash.com/photo-1521791136364-798a730bb361?auto=format&fit=crop&w=800&q=80"
                                alt="Alianzas estratégicas"
                                className="rounded-[3rem] shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners Grid */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {partners.map((p, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500">
                                <div className="mb-6">{p.icon}</div>
                                <h3 className="text-xl font-bold text-[#1e2a5a] mb-4">{p.name}</h3>
                                <p className="text-gray-600 leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ConveniosAlianzas;
