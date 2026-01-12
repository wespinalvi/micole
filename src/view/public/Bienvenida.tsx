import { UserCheck, Heart, Star } from "lucide-react";

const Bienvenida = () => {
    return (
        <div className="flex flex-col w-full">
            {/* Header */}
            <section className="relative py-16 bg-[#1e2a5a] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-3">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight">Bienvenidos a Crayon's</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
                        Un mensaje de nuestra dirección para toda la comunidad educativa.
                    </p>
                </div>
            </section>

            {/* Message Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="flex-1 relative">
                            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                                    alt="Directora"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-8 -right-8 bg-[#F26513] text-white p-8 rounded-[2rem] shadow-xl hidden md:block">
                                <p className="font-black text-xl">Dra. Patricia Vilcapoma</p>
                                <p className="opacity-80 text-sm">Directora General</p>
                            </div>
                        </div>
                        <div className="flex-1 space-y-6">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-[#1e2a5a]/5 text-[#1e2a5a] flex items-center justify-center">
                                <UserCheck size={32} />
                            </div>
                            <h2 className="text-3xl font-black text-[#1e2a5a] tracking-tight">Formando con amor y excelencia.</h2>
                            <div className="space-y-4 text-base text-gray-600 leading-relaxed text-justify">
                                <p>
                                    Estimados padres de familia y alumnos, es un honor para mí darles la más cordial bienvenida a nuestra institución. En Crayon's, creemos que cada niño es un universo de posibilidades esperando ser descubierto.
                                </p>
                                <p>
                                    Nuestra misión va más allá de la enseñanza académica; buscamos formar seres humanos íntegros, con valores sólidos y la capacidad d e transformar su entorno de manera positiva. Contamos con un equipo docente altamente calificado y comprometido con la innovación pedagógica.
                                </p>
                                <p>
                                    Les invito a ser parte de esta gran familia, donde el aprendizaje es una aventura diaria y el éxito de nuestros alumnos es nuestra mayor recompensa.
                                </p>
                            </div>
                            <div className="flex gap-6 pt-4">
                                <div className="flex items-center gap-2 text-[#F26513] font-bold">
                                    <Heart size={20} /> Pasión por educar
                                </div>
                                <div className="flex items-center gap-2 text-[#F26513] font-bold">
                                    <Star size={20} /> Compromiso total
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats / Quick Info */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="space-y-3">
                            <h3 className="text-4xl font-black text-[#1e2a5a]">13+</h3>
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Años de Trayectoria</p>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-4xl font-black text-[#1e2a5a]">500+</h3>
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Alumnos Egresados</p>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-4xl font-black text-[#1e2a5a]">100%</h3>
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Compromiso Educativo</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Bienvenida;
