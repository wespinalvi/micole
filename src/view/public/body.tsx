import {
  ArrowRight, Trophy,
  Heart, Globe, Monitor,
  MapPin, Phone, Mail, Calendar, Quote, CheckCircle2,
  Play, ChevronRight,
  Facebook, Instagram, Youtube, ShieldCheck, MessageSquare
} from "lucide-react";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Body = () => {
  const levels = [
    {
      number: "01",
      tag: "Exploradores iniciales",
      name: "Inicial",
      age: "3 — 5 años",
      description: "Donde la curiosidad se transforma en conocimiento a través del juego dirigido y el afecto.",
      image: "https://scontent.flim22-1.fna.fbcdn.net/v/t39.30808-6/607612405_1393774129204838_1077893171308163344_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeGkKK603AAmYxeGF1I3050tagIEAWcgtkpqAgQBZyC2SkQAMsEbHeSGjVp_d6BjsnZhe0VAcI0dVh1-Ul4CG4vA&_nc_ohc=QIdOYR5of5kQ7kNvwE-zaF6&_nc_oc=AdnyScCuuCGxfqe6nBmaAsZb6JygZbrsJcYHFZ_HIqAZ-qaftQReawYYMBQHAwVsGB0&_nc_zt=23&_nc_ht=scontent.flim22-1.fna&_nc_gid=gKFCmzReEYLyTYCFJFP_2A&oh=00_AfvDZDKbKHFMriHaEZ389D3_agBF5OAMm13D2el5sELeXA&oe=699A9AFA",
      color: "#10b981",
      path: "/inicial"
    },
    {
      number: "02",
      tag: "Crecimiento integral",
      name: "Primaria",
      age: "6 — 12 años",
      description: "Construyendo las bases del pensamiento crítico y la autonomía en un entorno bilingüe.",
      image: "https://scontent.flim22-1.fna.fbcdn.net/v/t39.30808-6/607843865_1393754615873456_6747360168549501012_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeGKerXTlu-twbKV_TDk7Ht-OcrEAAAUlTI5ysQAABSVMk08ydZSp22KYJOBD33dxw40DFnderI7I1vmmVji7rYw&_nc_ohc=Qm-1aaxvcjEQ7kNvwFcjn-6&_nc_oc=AdmzaSG4VjpO4hdGlim851f1ZT9kZNFEnC1cZJSD0oeebIu2JChXIzkrWkxXW5ea_NY&_nc_zt=23&_nc_ht=scontent.flim22-1.fna&_nc_gid=HxkOr4GqeL6J4-8tqwHTVQ&oh=00_AfsyhZmj7MItuJ7VhOFpk9Ln4UWX14ekePry0ewTa87VEg&oe=699AA1DB",
      color: "#3b82f6",
      path: "/excelencia"
    },
    {
      number: "03",
      tag: "Visión de futuro",
      name: "Secundaria",
      age: "12 — 17 años",
      description: "Preparación académica de alto rendimiento con enfoque en liderazgo y proyectos globales.",
      image: "https://scontent.flim22-1.fna.fbcdn.net/v/t39.30808-6/601436941_1389175849664666_3409070667327536129_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeGNZuA8ED9XYXLe8tUMb5wURvHQ92Ede09G8dD3YR17T2MC8jUwKZkqHHhmWJ-wfoE5JJVhZ3ww9HPsFjSC2gGQ&_nc_ohc=g0WJlldyG4oQ7kNvwGOmNls&_nc_oc=Adnmh9-WFnTkGx7JjQUOSd4LpU3XyCPlnlFu2Zlw0miLEtVKzdhS_1sMTIFCV0b9yh0&_nc_zt=23&_nc_ht=scontent.flim22-1.fna&_nc_gid=QSaTtz_3uS91mBjcn-x6AQ&oh=00_AftkqTNrIapJWMbmZdhQj0EvdBDeN-QOgLGB-sknVCPY7w&oe=699A9231",
      color: "#8b5cf6",
      path: "/excelencia"
    }
  ];

  const pillars = [
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Excelencia Académica",
      desc: "Altos estándares de aprendizaje y mejora continua en cada etapa.",
      id: "01"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Formación en Valores",
      desc: "Integridad, respeto y responsabilidad como base de nuestra comunidad.",
      id: "02"
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Innovación Digital",
      desc: "Tecnología integrada con propósito para potenciar la creatividad nativa.",
      id: "03"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Visión Global",
      desc: "Preparando ciudadanos para un mundo interconectado y multicultural.",
      id: "04"
    }
  ];

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden bg-white">
      {/* Hero Section - Diseño de Autor Full Width */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-[#0a0a0c] text-white overflow-hidden selection:bg-orange-500/40 w-full pt-32 pb-20 lg:pt-40">
        {/* Background con Textura y Profundidad */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000"
            alt="Estudiantes colaborando"
            className="w-full h-full object-cover opacity-40 grayscale-[20%]"
          />
          {/* Grano de película sutil */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-4xl">
            {/* Badge de Admisión */}
            <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-orange-200">
                Admisión 2026 Abierta
              </span>
            </div>

            {/* Título Principal */}
            <h1 className={`text-6xl md:text-8xl font-light leading-[0.9] tracking-tighter mb-8 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              Formando Líderes <br />
              <span className="font-serif italic text-orange-500 block mt-2">con Propósito</span>
              <span className="text-white/90">& Excelencia.</span>
            </h1>

            {/* Descripción */}
            <p className={`max-w-xl text-lg text-slate-400 leading-relaxed mb-12 transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              En <span className="text-white font-medium">Crayon's</span>, transformamos el potencial de cada estudiante en éxito real,
              combinando valores tradicionales con innovación educativa de vanguardia.
            </p>

            {/* Call to Actions */}
            <div className={`flex flex-col sm:flex-row items-center gap-6 transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <Link to="/admision" className="w-full sm:w-auto group relative px-8 py-5 bg-orange-500 text-black font-bold text-sm tracking-widest uppercase rounded-full overflow-hidden transition-all hover:pr-12 text-center md:text-left">
                <span className="relative z-10">Postula Ahora</span>
                <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all w-5 h-5" />
              </Link>

              <Link to="/excelencia" className="flex items-center gap-4 group text-sm font-bold tracking-widest uppercase text-white/70 hover:text-white transition-colors">
                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-orange-500/50 transition-all relative">
                  <Play className="w-4 h-4 fill-white ml-1" />
                  <div className="absolute inset-0 rounded-full border border-orange-500 scale-0 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                </div>
                Conoce nuestra propuesta
              </Link>
            </div>
          </div>
        </div>

        {/* Decoración abstracta */}
        <div className="absolute bottom-0 right-0 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Indicador de scroll minimalista */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* Sección: Nuestros Pilares y Propuesta Diferenciada */}
      <div className="bg-[#fcfcfd] text-[#0a0a0c] py-24 px-6 overflow-hidden selection:bg-orange-500/20 w-full">

        {/* Nuestros Pilares */}
        <section className="max-w-7xl mx-auto mb-32">
          <div className="text-center mb-20">
            <span className="text-orange-600 font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">
              ¿Por qué elegir Crayon's?
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#0a0a0c]">
              Nuestros <span className="font-serif italic text-orange-600/80">Pilares</span>
            </h2>
            <div className="w-12 h-[2px] bg-orange-200 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="group relative p-10 bg-white border border-slate-100 rounded-tr-[40px] rounded-bl-[40px] hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                <span className="absolute top-4 right-8 text-5xl font-black text-slate-50 select-none group-hover:text-orange-50 transition-colors">
                  {pillar.id}
                </span>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform duration-500">
                    {pillar.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-3 tracking-tight text-[#0a0a0c]">{pillar.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Educación que trasciende */}
        <section className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            {/* Columna Imagen con Composición de Autor */}
            <div className="relative w-full lg:w-1/2">
              <div className="relative aspect-[4/5] md:aspect-square overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://scontent.flim22-1.fna.fbcdn.net/v/t39.30808-6/536268515_1291017672813818_5771292147782689872_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeFpgkj3WeHWN_E2BYO-n-ntS8k5iFdJdl1LyTmIV0l2XeQMC2TXrzyXfjOoB2C0V7TBngxG2pdjoGyxYRdRVGoC&_nc_ohc=Nv8ElENt60UQ7kNvwEb9hGE&_nc_oc=AdlHGIjJoX_MgyCgZfTpx-7c4H7I4nmeLdaPAzUdSL-lfreJSKbGb8eGWSUVTE8gqb8&_nc_zt=23&_nc_ht=scontent.flim22-1.fna&_nc_gid=I192-TU3ZqT7xvUOpyo9MQ&oh=00_AfuFoPOiwSdt3xz0olRe4f-KkmneC6VH7_c1a4J1s3DGMQ&oe=699A866E"
                  alt="Educación colaborativa"
                  className="w-full h-full object-cover grayscale-[20%] contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-orange-900/10 mix-blend-multiply"></div>
              </div>

              {/* Floating Badge (Efecto Manual) */}
              <div className={`absolute -bottom-10 -right-6 md:right-10 bg-white p-8 rounded-2xl shadow-2xl border border-slate-50 transition-all duration-1000 delay-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} z-20`}>
                <div className="flex items-center gap-4">
                  <div className="text-orange-500">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-[#0a0a0c] leading-none">Top 1%</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      Instituciones Regionales
                    </div>
                  </div>
                </div>
              </div>

              {/* Decoración geométrica */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-orange-200 -z-10"></div>
            </div>

            {/* Columna Texto Editorial */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="space-y-4">
                <span className="text-orange-600 font-bold tracking-[0.2em] text-[10px] uppercase block">
                  Propuesta Diferenciada
                </span>
                <h2 className="text-4xl md:text-6xl font-light leading-[1.1] text-[#0a0a0c]">
                  Educación que <br />
                  <span className="font-serif italic text-orange-600/80">trasciende</span> las aulas.
                </h2>
              </div>

              <p className="text-slate-500 text-lg leading-relaxed font-light">
                Nuestra metodología integra el rigor académico con el desarrollo socio-emocional, garantizando que nuestros estudiantes no solo estén preparados para la universidad, sino para ser <span className="text-[#0a0a0c] font-medium">ciudadanos globales íntegros.</span>
              </p>

              {/* Grid de Beneficios con Checks Especiales */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-y border-slate-100">
                {[
                  "Metodología por Proyectos",
                  "Certificaciones Internacionales",
                  "Formación en Liderazgo",
                  "Infraestructura Tecnológica"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full border border-orange-200 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all">
                      <CheckCircle2 className="w-3 h-3 text-orange-500 group-hover:text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/excelencia" className="inline-flex items-center gap-6 group">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0a0a0c] group-hover:text-orange-600 transition-colors">
                  Descubre nuestro modelo
                </span>
                <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-[#0a0a0c] group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Niveles Educativos Section - Rediseño Artístico/Editorial */}
      <section className="relative py-32 bg-[#0a0a0c] text-[#e5e5e5] overflow-hidden selection:bg-orange-500/30 w-full">
        {/* Grano de textura sutil */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Cabecera Editorial */}
          <header className="mb-24 flex flex-col md:flex-row items-start md:items-end justify-between border-l-2 border-orange-500/30 pl-8 ml-2">
            <div className="space-y-4">
              <h3 className="text-orange-500 font-medium tracking-[0.2em] text-xs uppercase italic">
                Nuestra Metodología
              </h3>
              <h2 className="text-5xl md:text-7xl font-light tracking-tight text-white leading-[0.9]">
                Formando el <br />
                <span className="font-serif italic font-normal text-orange-100/90">mañana hoy.</span>
              </h2>
            </div>
            <div className="mt-8 md:mt-0 text-right">
              <p className="max-w-xs text-sm text-slate-500 mb-6 leading-relaxed">
                Un recorrido pedagógico diseñado por expertos para potenciar el talento individual en cada etapa.
              </p>
              <Link to="/excelencia" className="inline-flex items-center gap-4 text-xs font-bold tracking-widest uppercase hover:text-orange-500 transition-all group">
                Explorar currículum
                <span className="w-10 h-[1px] bg-slate-700 group-hover:w-16 group-hover:bg-orange-500 transition-all duration-500"></span>
              </Link>
            </div>
          </header>

          {/* Grid asimétrico de niveles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {levels.map((level, idx) => (
              <div
                key={idx}
                className={`group relative transition-all duration-700 ease-out ${idx === 1 ? 'md:-translate-y-8' : 'md:translate-y-8'}`}
              >
                {/* Número de fondo (Brutalismo sutil) */}
                <span className="absolute -top-12 -left-4 text-9xl font-black text-white/[0.02] select-none pointer-events-none transition-all duration-700 group-hover:text-white/[0.05]">
                  {level.number}
                </span>

                {/* Contenedor de Imagen */}
                <div className="relative aspect-[4/5] rounded-tl-[60px] rounded-br-[60px] overflow-hidden mb-8 shadow-2xl">
                  <img
                    src={level.image}
                    alt={level.name}
                    className="w-full h-full object-cover filter grayscale-[0.3] contrast-[1.1] transition-transform duration-[1.5s] group-hover:scale-110 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0c]/80"></div>

                  <div className="absolute bottom-6 left-6 -rotate-2">
                    <span className="bg-white text-black text-[10px] font-bold px-3 py-1 uppercase tracking-tighter shadow-xl">
                      {level.age}
                    </span>
                  </div>
                </div>

                {/* Textos */}
                <div className="space-y-4 px-2">
                  <div className="flex items-center gap-2">
                    <span className="h-[1px] w-4 bg-orange-500"></span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500/80">
                      {level.tag}
                    </span>
                  </div>

                  <h4 className="text-3xl font-serif text-white group-hover:italic transition-all">
                    {level.name}
                  </h4>

                  <p className="text-slate-400 text-sm leading-relaxed font-light">
                    {level.description}
                  </p>

                  <Link to={level.path} className="pt-4 flex items-center gap-3 text-[10px] font-black tracking-[0.2em] uppercase group/btn">
                    <span className="group-hover/btn:mr-2 transition-all">Ver detalle</span>
                    <div className="w-8 h-8 border border-slate-800 rounded-full flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Elementos decorativos abstractos */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none"></div>
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



      {/* SECCIÓN TESTIMONIOS (Diseño de Red Social Premium / Ecos de Comunidad) */}
      <section className="py-36 px-6 bg-[#0a0f1d] relative overflow-hidden">
        {/* Grano de película sutil */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-24 text-center md:text-left">
            <div>
              <span className="text-orange-500 text-[10px] font-bold tracking-[0.6em] uppercase mb-4 block">Ecos de Comunidad</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none text-white">
                Voces que nos <br />
                <span className="text-white/40 italic font-serif font-light lowercase">definen.</span>
              </h2>
            </div>
            <div className="hidden md:block w-32 h-[1px] bg-white/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                name: "Mariana Velásquez",
                role: "Familia Rivera",
                initial: "R",
                text: "La calidad educativa y el enfoque humano han hecho que mi hijo ame ir al colegio todos los días."
              },
              {
                name: "Marco Torres",
                role: "Exalumno '18",
                initial: "T",
                text: "Agradezco la base académica y los valores que me permitieron destacar en mi carrera profesional."
              },
              {
                name: "Sofía Mendoza",
                role: "Estudiante 5to Sec.",
                initial: "M",
                text: "El nivel de inglés y tecnología que manejamos aquí nos da una ventaja competitiva increíble."
              }
            ].map((t, idx) => (
              <div
                key={idx}
                className={`relative p-12 bg-white/[0.02] border border-white/[0.05] flex flex-col group hover:bg-white/[0.04] transition-all duration-700 shadow-2xl ${idx % 2 !== 0 ? 'rounded-[100px_40px_100px_40px]' : 'rounded-[40px_100px_40px_100px]'
                  }`}
              >
                <Quote className="w-8 h-8 text-orange-600/20 mb-10 group-hover:text-orange-600/40 transition-colors" />

                <p className="text-slate-300 text-lg leading-[1.6] font-serif italic mb-16 relative z-10">
                  "{t.text}"
                </p>

                <div className="mt-auto flex items-center gap-6">
                  {/* Monograma editorial */}
                  <div className="w-16 h-16 rounded-full bg-[#1c2541] border border-white/10 flex items-center justify-center font-serif italic text-2xl text-orange-500 shadow-inner group-hover:scale-105 transition-transform duration-500">
                    {t.initial}
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold tracking-[0.2em] text-white uppercase">{t.name}</h5>
                    <p className="text-[9px] text-slate-500 font-bold tracking-widest mt-1 uppercase">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1. SECCIÓN DE INSTALACIONES */}
      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-600 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              Nuestras Instalaciones
            </span>
            <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] text-slate-900">
              Espacios diseñados para <span className="italic text-orange-600">inspirar</span>
            </h2>
          </div>
          <button className="group relative px-8 py-4 bg-[#1A237E] text-white rounded-full font-bold overflow-hidden transition-all hover:pr-12 shadow-lg text-center">
            <span className="relative z-10 flex items-center gap-3 tracking-wider text-sm justify-center">
              VER TOUR VIRTUAL <Play size={18} fill="currentColor" />
            </span>
            <div className="absolute inset-y-0 right-0 w-0 bg-orange-600 transition-all group-hover:w-full"></div>
          </button>
        </div>

        {/* Galería Dinámica */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-[700px]">
          {/* Card Principal - Biblioteca */}
          <div className="md:col-span-7 relative overflow-hidden rounded-[40px] group shadow-2xl border border-white/20">
            <img
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1200"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              alt="Biblioteca moderna"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-12 left-12 text-white text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">Centro de Aprendizaje</p>
              <h3 className="text-4xl md:text-5xl font-bold font-serif leading-tight">Biblioteca del <br />Mañana</h3>
            </div>
          </div>

          {/* Columna Derecha - Galería secundaria */}
          <div className="md:col-span-5 flex flex-col gap-8 text-white">
            <div className="h-1/2 relative overflow-hidden rounded-[40px] group shadow-xl">
              <img
                src="https://scontent.flim22-1.fna.fbcdn.net/v/t39.30808-6/574609225_1348386233743628_4410908790404705450_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEKeC5SCDF8_zgfwj3ePdfXfg_4NoJrJRt-D_g2gmslG9Iw2Jr5Z-g7QHY8Y3bt0wTND3ugKzIZLueH0n3OZ_dx&_nc_ohc=4Odmp0hUZXoQ7kNvwH7cauY&_nc_oc=AdlTz6v2PoZnGxtBHdZDIBzUFaGZaTfLcRWQpoP4w2DYU4_3bP2gZoQ_8kB9l-Pa69Q&_nc_zt=23&_nc_ht=scontent.flim22-1.fna&_nc_gid=2D5Ec6JsgOULgKXntP0PIQ&oh=00_Aftt2DK_6kAAzOdQRqrGQp6V6X7lHXoUKEXX7A3ZWGkNog&oe=699A9FE5"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt="Campus deportivo"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-10 left-10 text-left">
                <h4 className="text-3xl font-bold font-serif tracking-wide">Campus Deportivo</h4>
              </div>
            </div>

            <div className="h-1/2 grid grid-cols-2 gap-8 text-slate-900">
              <div className="relative overflow-hidden rounded-[40px] group shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400"
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  alt="Aulas equipadas"
                />
                <div className="absolute inset-0 bg-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white p-4 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                    <ChevronRight className="text-orange-600" size={24} />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-[40px] p-10 flex flex-col justify-center border-l-[12px] border-orange-500 shadow-2xl text-left">
                <span className="text-5xl font-black text-orange-600 mb-3 tracking-tighter">+25</span>
                <p className="text-sm font-bold leading-snug text-slate-600 uppercase tracking-wide">Aulas con tecnología interactiva de vanguardia.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECCIÓN FINAL REDISEÑADA (Estilo Editorial Abierto) */}
      <section className="relative py-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Texto con Composición Artística */}
            <div className="relative z-10 text-left">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-[2px] w-16 bg-orange-600"></div>
                <span className="text-orange-600 font-bold text-xs uppercase tracking-[0.4em]">Próximo Ciclo Escolar</span>
              </div>

              <h2 className="text-6xl md:text-8xl font-serif text-slate-900 leading-[0.95] mb-12">
                ¿Listo para <br />
                formar <span className="italic text-orange-600">parte</span> <br />
                <span className="text-slate-300">de nosotros?</span>
              </h2>

              <p className="text-xl text-slate-500 mb-16 max-w-lg leading-relaxed border-l-2 border-slate-100 pl-8">
                Inicia el proceso de admisión hoy mismo y asegura el futuro educativo de tus hijos en la institución líder de formación integral de la región.
              </p>

              <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                <Link to="/admision" className="group flex items-center gap-6">
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110 group-hover:rotate-12 shadow-xl shadow-orange-600/20">
                    <ArrowRight size={28} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-black uppercase tracking-widest text-slate-900">Solicitar Información</p>
                    <p className="text-xs text-slate-400 font-medium">Respuesta en menos de 24h</p>
                  </div>
                </Link>

                <Link to="/contacto" className="group flex items-center gap-6">
                  <div className="w-16 h-16 bg-[#1A237E] rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110 group-hover:-rotate-12 shadow-xl shadow-blue-900/20">
                    <Calendar size={28} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-black uppercase tracking-widest text-slate-900">Agendar Visita</p>
                    <p className="text-xs text-slate-400 font-medium">Recorrido personalizado</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Imagen Flotante Asimétrica */}
            <div className="relative h-[600px] w-full mt-12 lg:mt-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-50 rounded-full blur-[120px] opacity-50 -z-10"></div>

              {/* Marco de Imagen tipo Galería de Arte */}
              <div className="relative w-full h-full p-8 bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] rounded-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
                <img
                  src="https://scontent.flim22-1.fna.fbcdn.net/v/t39.30808-6/523492449_1265930268655892_6450876978158931345_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFbU_GuiWv8J9PwNuUwGzubbA-m4R-KsvNsD6bhH4qy82H8wU85OCAzrMFJB2PLCLEG1zeDcsFH97jOIjENeQMm&_nc_ohc=uURjEyDry6IQ7kNvwHpBKsv&_nc_oc=AdlFlpCNEfsFOYK2S5Vy43d2DUHiSItIVOWMBucAO5rAeYrGqU3NBu1pvWh7pihEMgg&_nc_zt=23&_nc_ht=scontent.flim22-1.fna&_nc_gid=3kUiM-nD6NrOdgWm9pD2LA&oh=00_AfvzbsuyePUK3FznmI6w5jGSxcJNuJ03kh63a-PM_P0vOQ&oe=699A85EC"
                  className="w-full h-full object-cover rounded-lg"
                  alt="Estudiante"
                />
                {/* Etiqueta flotante */}
                <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-2xl border border-slate-50 max-w-[240px] text-left">
                  <p className="text-orange-600 font-serif italic text-2xl mb-2">"La mejor elección"</p>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none">Familia Rodríguez - 2024</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Industrial/Premium */}
      <footer className="w-full bg-[#080B16] text-white pt-24 pb-8 font-sans overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          {/* Rejilla de Información Principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">

            {/* Columna Branding */}
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-6">
                <img
                  src="https://res.cloudinary.com/dszdc6rh8/image/upload/v1747351782/image_1_vhjpzr.png"
                  alt="Logo Crayon's"
                  className="h-24 w-auto brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                />
                <p className="text-slate-400 text-sm leading-relaxed">
                  Institución Educativa comprometida con la formación de líderes íntegros, innovadores y con valores sólidos en la ciudad de Satipo.
                </p>
              </div>

              <div className="flex gap-4">
                {[
                  { Icon: Facebook, color: 'hover:bg-blue-600' },
                  { Icon: Instagram, color: 'hover:bg-pink-600' },
                  { Icon: Youtube, color: 'hover:bg-red-600' }
                ].map(({ Icon, color }, i) => (
                  <a key={i} href="#" className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all duration-300 ${color}`}>
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Columna Navegación */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-orange-500 mb-8">Colegio</h4>
              <ul className="space-y-4">
                {['Nosotros', 'Propuesta', 'Admisión', 'Comunidad', 'Convenios'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors flex items-center group">
                      <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all mr-2 text-orange-500" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna Contacto */}
            <div className="lg:col-span-3">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-orange-500 mb-8">Ubícanos</h4>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-orange-600/10 flex items-center justify-center text-orange-500 shrink-0">
                    <MapPin size={16} />
                  </div>
                  <p className="text-slate-400 text-sm leading-snug">
                    Jr. José Pardo Nro. 181, <br /> Satipo, Junín — Perú.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-orange-600/10 flex items-center justify-center text-orange-500 shrink-0">
                    <Phone size={16} />
                  </div>
                  <p className="text-slate-400 text-sm">+51 974 958 865</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-orange-600/10 flex items-center justify-center text-orange-500 shrink-0">
                    <Mail size={16} />
                  </div>
                  <p className="text-slate-400 text-sm break-all">admision@crayons.edu.pe</p>
                </div>
              </div>
            </div>

            {/* Columna Certificaciones/Confianza */}
            <div className="lg:col-span-3">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-orange-500 mb-8">Atención</h4>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-green-500" size={20} />
                  <span className="text-xs font-bold uppercase tracking-widest text-white">Admisión Abierta</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Contáctanos directamente para agendar una visita guiada a nuestras instalaciones.
                </p>
                <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                  <MessageSquare size={14} /> WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* Copyright y Barra Inferior */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <span>© 2026 COLEGIO CRAYON'S</span>
              <span className="hidden md:block w-1 h-1 bg-slate-700 rounded-full"></span>
              <span className="text-orange-900">Satipo, Perú</span>
            </div>

            <div className="flex gap-8 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <a href="#" className="hover:text-orange-500 transition-colors">Privacidad</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Términos</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Libro de Reclamaciones</a>
            </div>

            <div className="flex items-center gap-2 opacity-30">
              <Globe size={12} />
              <span className="text-[8px] font-black uppercase tracking-tighter">Educación Global</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Body;