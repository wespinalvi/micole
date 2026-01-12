import {
  ArrowRight, Trophy,
  Heart, Globe, Laptop,
  Star, MapPin, Phone, Mail, Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

const Body = () => {
  const levels = [
    {
      name: "Early Years",
      age: "3 - 5 años",
      description: "Desarrollo integral basado en el juego, la exploración y el afecto.",
      image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80",
      color: "bg-blue-50",
      textColor: "text-blue-600",
      path: "/early-years"
    },
    {
      name: "Primaria",
      age: "6 - 12 años",
      description: "Excelencia académica con enfoque en valores y habilidades del siglo XXI.",
      image: "https://images.unsplash.com/photo-1577891729319-f4871c674d41?auto=format&fit=crop&w=800&q=80",
      color: "bg-orange-50",
      textColor: "text-orange-600",
      path: "/excelencia"
    },
    {
      name: "Secundaria",
      age: "12 - 17 años",
      description: "Preparación pre-universitaria y formación de líderes con propósito.",
      image: "https://images.unsplash.com/photo-1523050335392-9bc567597280?auto=format&fit=crop&w=800&q=80",
      color: "bg-indigo-50",
      textColor: "text-indigo-600",
      path: "/excelencia"
    }
  ];

  const pillars = [
    { title: "Excelencia Académica", icon: <Trophy className="w-8 h-8" />, desc: "Altos estándares de aprendizaje y mejora continua." },
    { title: "Formación en Valores", icon: <Heart className="w-8 h-8" />, desc: "Integridad, respeto y responsabilidad como base." },
    { title: "Innovación Digital", icon: <Laptop className="w-8 h-8" />, desc: "Tecnología integrada para potenciar la creatividad." },
    { title: "Visión Global", icon: <Globe className="w-8 h-8" />, desc: "Preparando ciudadanos para un mundo interconectado." }
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section - Premium & Dynamic */}
      <section className="relative h-[60vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/dszdc6rh8/image/upload/v1747351782/image_1_vhjpzr.png"
            alt="Hero Background"
            className="w-full h-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e2a5a]/60 via-transparent to-[#1e2a5a]/80"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium animate-fade-in">
            <Star className="w-3.5 h-3.5 text-[#F26513]" fill="currentColor" />
            <span>Admisión 2026 Abierta</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.1] animate-slide-up">
            Formando Líderes con <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26513] to-orange-400">
              Propósito y Excelencia
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto font-light leading-relaxed animate-slide-up delay-100">
            En Crayon's, transformamos el potencial de cada estudiante en éxito real,
            combinando valores tradicionales con innovación educativa.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 animate-slide-up delay-200">
            <Link to="/admision" className="w-full sm:w-auto bg-[#F26513] hover:bg-[#d95a11] text-white px-8 py-3.5 rounded-full font-semibold text-base shadow-2xl shadow-orange-500/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
              Postula Ahora <ArrowRight size={18} />
            </Link>
            <Link to="/excelencia" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-3.5 rounded-full font-semibold text-base transition-all">
              Conoce Nuestra Propuesta
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <h2 className="text-[#F26513] font-semibold tracking-widest uppercase text-[10px]">¿Por qué elegir Crayon's?</h2>
            <p className="text-2xl md:text-3xl font-bold text-[#1e2a5a] tracking-tight">
              Nuestros Pilares
            </p>
            <div className="w-12 h-1 bg-[#F26513] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, i) => (
              <div key={i} className="group p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-[#1e2a5a]/5 flex items-center justify-center text-[#1e2a5a] group-hover:bg-[#F26513] group-hover:text-white transition-all duration-500 mb-4">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#1e2a5a] mb-2">{pillar.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Levels Section - Modern Grid */}
      <section className="py-12 bg-[#1e2a5a] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F26513]/5 skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-10 gap-6">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-[#F26513] font-semibold tracking-widest uppercase text-[10px]">Niveles Educativos</h2>
              <p className="text-2xl md:text-3xl font-bold tracking-tight">
                Una ruta de aprendizaje <br /> diseñada para el éxito.
              </p>
            </div>
            <Link to="/excelencia" className="flex items-center gap-2 text-[#F26513] font-semibold hover:text-white transition-colors group text-sm">
              Ver todos los niveles <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {levels.map((level, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500">
                <div className="h-44 overflow-hidden">
                  <img src={level.image} alt={level.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider bg-${level.color.split('-')[1]}-50 text-${level.textColor.split('-')[1]}-600`}>
                      {level.age}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">{level.name}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{level.description}</p>
                  <Link to={level.path} className="pt-2 flex items-center gap-2 font-semibold text-xs hover:text-[#F26513] transition-colors">
                    MÁS INFORMACIÓN <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: "Años de Excelencia", value: "13+" },
              { label: "Estudiantes Felices", value: "500+" },
              { label: "Docentes Calificados", value: "40+" },
              { label: "Tasa de Ingreso Univ.", value: "98%" }
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-1">
                <div className="text-3xl md:text-4xl font-bold text-[#1e2a5a] tracking-tighter">{stat.value}</div>
                <div className="text-gray-500 font-medium uppercase tracking-widest text-[10px]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News / Blog Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-6">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-[#F26513] font-semibold tracking-widest uppercase text-[10px]">Actualidad</h2>
              <p className="text-2xl font-bold text-[#1e2a5a] tracking-tight">
                Últimas noticias y eventos.
              </p>
            </div>
            <Link to="/blog" className="flex items-center gap-2 text-[#F26513] font-semibold hover:text-[#1e2a5a] transition-colors group text-sm">
              Ver todas las noticias <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Inauguración del nuevo Laboratorio de Innovación",
                date: "15 Oct, 2025",
                category: "Infraestructura",
                image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Nuestros alumnos destacan en las Olimpiadas de Matemática",
                date: "10 Oct, 2025",
                category: "Logros",
                image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Taller de Liderazgo para Padres de Familia",
                date: "05 Oct, 2025",
                category: "Comunidad",
                image: "https://images.unsplash.com/photo-1524178232363-1fb28f74b0cd?auto=format&fit=crop&w=800&q=80"
              }
            ].map((news, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative h-40 rounded-xl overflow-hidden mb-3">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-md text-[#1e2a5a] px-3 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider shadow-lg">
                      {news.category}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                    <Calendar size={12} className="text-[#F26513]" />
                    {news.date}
                  </div>
                  <h3 className="text-lg font-semibold text-[#1e2a5a] group-hover:text-[#F26513] transition-colors leading-tight">
                    {news.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-[#F26513] rounded-3xl p-6 md:p-10 text-center text-white relative overflow-hidden shadow-2xl shadow-orange-500/20">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                ¿Listo para formar parte de <br /> nuestra familia?
              </h2>
              <p className="text-lg text-orange-50 max-w-2xl mx-auto font-light">
                Inicia el proceso de admisión hoy mismo y asegura el futuro educativo de tus hijos en la mejor institución de la región.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link to="/contacto" className="w-full sm:w-auto bg-[#1e2a5a] hover:bg-[#151d3d] text-white px-8 py-3.5 rounded-full font-semibold text-base transition-all hover:-translate-y-1 flex items-center justify-center">
                  Solicitar Información
                </Link>
                <Link to="/contacto" className="w-full sm:w-auto bg-white text-[#F26513] hover:bg-orange-50 px-8 py-3.5 rounded-full font-semibold text-base transition-all hover:-translate-y-1 flex items-center justify-center">
                  Agendar Visita
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Contact Preview */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-[#F26513] font-semibold tracking-widest uppercase text-[10px]">Ubicación</h2>
                <p className="text-2xl font-bold text-[#1e2a5a] tracking-tight">Estamos cerca de ti.</p>
              </div>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-[#F26513] shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e2a5a] text-sm">Dirección Principal</h4>
                    <p className="text-gray-600 text-sm">Jr. José Pardo Nro. 181, Junín - Satipo, Perú</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-[#F26513] shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e2a5a] text-sm">Teléfonos de Contacto</h4>
                    <p className="text-gray-600 text-sm">+51 974 958 865 / (064) 545-123</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-[#F26513] shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1e2a5a] text-sm">Correo Electrónico</h4>
                    <p className="text-gray-600 text-sm">admision@crayons.edu.pe</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[400px] rounded-3xl overflow-hidden shadow-2xl border-8 border-gray-50">
              <iframe
                title="Mapa Colegio Crayon's"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.547317541468!2d-74.6466083!3d-11.258158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910bc110abf95455%3A0xdd33d47930091cf9!2sI.E.P.%20CRAYOLITAS%20-%20CRAYONS!5e0!3m2!1ses!2spe!4v1724260000000!5m2!1ses!2spe"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Body;