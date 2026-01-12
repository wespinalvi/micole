import { Camera, Laptop, Music, Trophy, BookOpen } from "lucide-react";

const Infraestructura = () => {
    const facilities = [
        {
            title: "Laboratorios de Ciencia",
            desc: "Espacios equipados con tecnología de punta para la experimentación y el descubrimiento científico.",
            icon: <Laptop className="w-8 h-8" />,
            image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Biblioteca Multimedia",
            desc: "Un centro de recursos con miles de títulos físicos y digitales para fomentar el hábito de la lectura.",
            icon: <BookOpen className="w-8 h-8" />,
            image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Complejo Deportivo",
            desc: "Canchas polideportivas y áreas recreativas diseñadas para el desarrollo físico y el trabajo en equipo.",
            icon: <Trophy className="w-8 h-8" />,
            image: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Auditorio y Artes",
            desc: "Escenarios para la expresión artística, música y teatro, donde el talento de nuestros alumnos brilla.",
            icon: <Music className="w-8 h-8" />,
            image: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=800&q=80"
        }
    ];

    return (
        <div className="flex flex-col w-full">
            {/* Header */}
            <section className="relative py-16 bg-[#1e2a5a] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-3">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight">Nuestro Espacio</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
                        Instalaciones modernas diseñadas para inspirar el aprendizaje y la creatividad.
                    </p>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {facilities.map((fac, i) => (
                            <div key={i} className="group relative rounded-[3rem] overflow-hidden shadow-xl">
                                <div className="aspect-[16/10]">
                                    <img
                                        src={fac.image}
                                        alt={fac.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1e2a5a] via-[#1e2a5a]/20 to-transparent flex flex-col justify-end p-8">
                                    <div className="w-12 h-12 rounded-2xl bg-[#F26513] text-white flex items-center justify-center mb-4 shadow-lg">
                                        {fac.icon}
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-2">{fac.title}</h3>
                                    <p className="text-gray-200 leading-relaxed max-w-md text-sm">
                                        {fac.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Virtual Tour CTA */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white shadow-sm border border-gray-100 text-[#F26513] font-bold text-sm">
                        <Camera size={18} /> Recorrido Virtual 360°
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-[#1e2a5a] tracking-tight">
                        ¿Quieres conocer nuestro campus <br /> desde la comodidad de tu hogar?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explora cada rincón de nuestra institution a través de nuestra experiencia inmersiva.
                    </p>
                    <button className="bg-[#1e2a5a] hover:bg-[#151d3d] text-white px-10 py-4 rounded-full font-black text-base shadow-2xl transition-all hover:-translate-y-1">
                        Iniciar Recorrido
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Infraestructura;
