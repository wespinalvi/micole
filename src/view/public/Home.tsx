import { Link, Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen font-sans bg-white text-[#0D0D0D]">
      {/* Header */}
      <header className="bg-[#E6E8F5] flex flex-col md:flex-row justify-between items-center px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3 mb-2 md:mb-0">
          <Link to="/"> <img
            src="https://res.cloudinary.com/dszdc6rh8/image/upload/v1747351782/image_1_vhjpzr.png"
            alt="Logo Colegio Crayon's"
            className="h-14 w-auto drop-shadow"
            style={{ background: 'transparent' }}
          /></Link>
         
        </div>
        <nav className="flex items-center gap-6">
          <Link to="/" className="font-medium text-[#2B2461] hover:text-[#F26513] transition-colors">Inicio</Link>
          <a href="#propuesta" className="font-medium text-[#2B2461] hover:text-[#F26513] transition-colors">Propuesta educativa</a>
          <Link to="/vision-mision" className="font-medium text-[#2B2461] hover:text-[#F26513] transition-colors">Visión y Misión</Link>
          <a
            href="/login"
            className="bg-[#F26513] hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold shadow transition-colors duration-200 border-2 border-[#F26513] hover:border-orange-600"
          >
            Aula Virtual
          </a>
        </nav>
      </header>
<section>
  <Outlet/>
</section>

      {/* Footer mejorado */}
      <footer className="relative bg-gradient-to-br from-[#3E328C] via-[#6C63FF] to-[#F3E6FF] text-white pt-16 pb-8 px-6 md:px-12 mt-10 overflow-hidden">
        {/* Onda decorativa SVG */}
        <div className="absolute top-0 left-0 w-full -translate-y-full pointer-events-none">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-20">
            <path fill="#6C63FF" fillOpacity="1" d="M0,64L48,58.7C96,53,192,43,288,53.3C384,64,480,96,576,101.3C672,107,768,85,864,80C960,75,1056,85,1152,90.7C1248,96,1344,96,1392,96L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
          </svg>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Logo y lema */}
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <img
              src="https://res.cloudinary.com/dszdc6rh8/image/upload/v1747351782/image_1_vhjpzr.png"
              alt="Logo Colegio Crayon's"
              className="h-20 mb-3 drop-shadow-lg"
            />
            <span className="text-sm text-white/80 mt-2 italic">Formando líderes con valores</span>
          </div>

          {/* Contacto */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-3 text-[#F26513] flex items-center justify-center md:justify-start gap-2">
              <svg className="w-6 h-6 text-[#F26513]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5h2l3.6 7.59-1.35 2.44a11.042 11.042 0 005.14 5.14l2.44-1.35L19 19v2a2 2 0 01-2 2H7a4 4 0 01-4-4V7a2 2 0 012-2z" /></svg>
              CONTACTO
            </h3>
            <p className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5h2l3.6 7.59-1.35 2.44a11.042 11.042 0 005.14 5.14l2.44-1.35L19 19v2a2 2 0 01-2 2H7a4 4 0 01-4-4V7a2 2 0 012-2z" /></svg>
              <span className="text-white">974958865</span>
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 12l-4-4m0 0l-4 4m4-4v8" /><rect width="16" height="12" x="4" y="6" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span className="text-white">pvilcapoma2022@gmail.com</span>
            </p>
          </div>

          {/* Dirección y redes sociales */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-3 text-[#F26513] flex items-center justify-center md:justify-start gap-2">
              <svg className="w-6 h-6 text-[#F26513]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.104 0 2-.895 2-2s-.896-2-2-2-2 .895-2 2 .896 2 2 2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 21c4-4 6-9 6-11a6 6 0 10-12 0c0 2 2 7 6 11z" /></svg>
              DIRECCIÓN
            </h3>
            <p className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.104 0 2-.895 2-2s-.896-2-2-2-2 .895-2 2 .896 2 2 2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 21c4-4 6-9 6-11a6 6 0 10-12 0c0 2 2 7 6 11z" /></svg>
              <span className="text-white">JR. JOSE PARDO NRO. 181 JUNIN - SATIPO</span>
            </p>
            <div className="flex justify-center md:justify-start gap-4 mt-2">
              <a href="#" className="hover:scale-110 transition-transform" aria-label="Facebook">
                <svg className="w-7 h-7 text-white hover:text-[#F26513]" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
              </a>
              <a href="#" className="hover:scale-110 transition-transform" aria-label="Instagram">
                <svg className="w-7 h-7 text-white hover:text-[#F26513]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.13 4.602.402 3.635 1.37 2.668 2.337 2.396 3.51 2.338 4.788 2.28 6.068 2.267 6.477 2.267 12c0 5.523.013 5.932.071 7.212.058 1.278.33 2.451 1.297 3.418.967.967 2.14 1.239 3.418 1.297C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.278-.058 2.451-.33 3.418-1.297.967-.967 1.239-2.14 1.297-3.418.058-1.28.071-1.689.071-7.212 0-5.523-.013-5.932-.071-7.212-.058-1.278-.33-2.451-1.297-3.418C19.399.402 18.226.13 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
              </a>
              <a href="#" className="hover:scale-110 transition-transform" aria-label="YouTube">
                <svg className="w-7 h-7 text-white hover:text-[#F26513]" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 00-2.112-2.112C19.675 3.5 12 3.5 12 3.5s-7.675 0-9.386.574A2.994 2.994 0 00.502 6.186C0 7.897 0 12 0 12s0 4.103.502 5.814a2.994 2.994 0 002.112 2.112C4.325 20.5 12 20.5 12 20.5s7.675 0 9.386-.574a2.994 2.994 0 002.112-2.112C24 16.103 24 12 24 12s0-4.103-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="relative z-10 text-center text-xs text-white/70 mt-10">&copy; {new Date().getFullYear()} Colegio Crayon's. Todos los derechos reservados.</div>
      </footer>
    </div>
  );
};

export default HomePage;
