import { Target, Eye, ShieldCheck, Heart, Users, Star } from "lucide-react";

const VisionMision = () => {
  const values = [
    { title: "Integridad", icon: <ShieldCheck className="w-6 h-6" />, desc: "Actuamos con honestidad y coherencia en cada paso." },
    { title: "Respeto", icon: <Heart className="w-6 h-6" />, desc: "Valoramos la diversidad y la dignidad de cada persona." },
    { title: "Excelencia", icon: <Star className="w-6 h-6" />, desc: "Buscamos siempre la mejor versión de nosotros mismos." },
    { title: "Comunidad", icon: <Users className="w-6 h-6" />, desc: "Trabajamos unidos por un propósito común." }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Page Header */}
      <section className="relative py-16 bg-[#1e2a5a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">Nuestra Identidad</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
            Conoce los cimientos que guían nuestra labor educativa y el futuro que construimos para nuestros estudiantes.
          </p>
        </div>
      </section>

      {/* Mission & Vision Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Misión */}
            <div className="group p-8 rounded-[2rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 rounded-[1.5rem] bg-[#F26513]/10 flex items-center justify-center text-[#F26513] mb-6 group-hover:bg-[#F26513] group-hover:text-white transition-all duration-500">
                <Target size={32} />
              </div>
              <h2 className="text-2xl font-black text-[#1e2a5a] mb-4">Nuestra Misión</h2>
              <p className="text-gray-600 leading-relaxed text-base text-justify">
                Somos una Institución Educativa Privada que brinda una educación integral basada en valores éticos,
                morales y cívicos. Desarrollamos y potenciamos las competencias de nuestros estudiantes para que
                culminen su escolaridad con excelencia, en espacios seguros, inclusivos y de sana convivencia,
                afianzando permanentemente sus aprendizajes bajo los principios de la Educación Peruana.
              </p>
            </div>

            {/* Visión */}
            <div className="group p-8 rounded-[2rem] bg-[#1e2a5a] text-white hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-500">
              <div className="w-16 h-16 rounded-[1.5rem] bg-white/10 flex items-center justify-center text-white mb-6 group-hover:bg-[#F26513] transition-all duration-500">
                <Eye size={32} />
              </div>
              <h2 className="text-2xl font-black mb-4">Nuestra Visión</h2>
              <p className="text-gray-300 leading-relaxed text-base text-justify">
                Ser reconocidos al año 2026 como una institución líder que contribuye a que todos sus estudiantes
                desarrollen su potencial desde la primera infancia. Formamos ciudadanos capaces de resolver con éxito
                los problemas de su entorno, asumiendo una actitud activa, crítica y responsable, contribuyendo así
                al desarrollo de su comunidad y del país con una visión global.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <h2 className="text-[#F26513] font-bold tracking-widest uppercase text-xs">Nuestros Valores</h2>
            <p className="text-3xl font-black text-[#1e2a5a] tracking-tight">
              Lo que nos define.
            </p>
            <div className="w-16 h-1 bg-[#F26513] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#F26513] flex items-center justify-center mx-auto">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1e2a5a]">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisionMision;