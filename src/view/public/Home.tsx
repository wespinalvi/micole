import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Youtube, GraduationCap } from "lucide-react";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen font-sans bg-white text-[#0D0D0D] flex flex-col">
      {/* Top Bar - Información de contacto rápida */}
      <div className="bg-[#3E328C] text-white py-2 px-6 text-xs md:text-sm hidden md:flex justify-between items-center">
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><Phone size={14} /> +51 974 958 865</span>
          <span className="flex items-center gap-2"><Mail size={14} /> pvilcapoma2022@gmail.com</span>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-[#F26513] transition-colors">Intranet</a>
          <a href="#" className="hover:text-[#F26513] transition-colors">Webmail</a>
        </div>
      </div>

      {/* Header Principal */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="https://res.cloudinary.com/dszdc6rh8/image/upload/v1747351782/image_1_vhjpzr.png"
              alt="Logo Colegio Crayon's"
              className="h-12 md:h-16 w-auto drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
            />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-[#3E328C] leading-none">CRAYON'S</h1>
              <p className="text-xs text-[#F26513] font-medium tracking-wider">INSTITUCIÓN EDUCATIVA</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="font-medium text-[#2B2461] hover:text-[#F26513] transition-colors relative group">
              Inicio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F26513] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/vision-mision" className="font-medium text-[#2B2461] hover:text-[#F26513] transition-colors relative group">
              Nosotros
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F26513] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <a href="#niveles" className="font-medium text-[#2B2461] hover:text-[#F26513] transition-colors relative group">
              Niveles
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F26513] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#admision" className="font-medium text-[#2B2461] hover:text-[#F26513] transition-colors relative group">
              Admisión 2025
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F26513] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <Link
              to="/login"
              className="bg-[#F26513] hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <GraduationCap size={18} />
              Aula Virtual
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#3E328C] hover:text-[#F26513] transition-colors"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg animate-in slide-in-from-top-5 duration-200">
            <div className="flex flex-col p-4 space-y-4">
              <Link to="/" className="font-medium text-[#2B2461] hover:text-[#F26513] py-2 border-b border-gray-50" onClick={toggleMenu}>Inicio</Link>
              <Link to="/vision-mision" className="font-medium text-[#2B2461] hover:text-[#F26513] py-2 border-b border-gray-50" onClick={toggleMenu}>Nosotros</Link>
              <a href="#niveles" className="font-medium text-[#2B2461] hover:text-[#F26513] py-2 border-b border-gray-50" onClick={toggleMenu}>Niveles</a>
              <a href="#admision" className="font-medium text-[#2B2461] hover:text-[#F26513] py-2 border-b border-gray-50" onClick={toggleMenu}>Admisión</a>
              <Link to="/login" className="bg-[#F26513] text-white px-4 py-2 rounded-lg font-semibold text-center mt-2" onClick={toggleMenu}>
                Aula Virtual
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer Mejorado */}
      <footer className="bg-[#2B2461] text-white pt-16 pb-8 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F26513] via-[#FF8C42] to-[#F26513]"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F26513] rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#3E328C] rounded-full opacity-20 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img
                  src="https://res.cloudinary.com/dszdc6rh8/image/upload/v1747351782/image_1_vhjpzr.png"
                  alt="Logo Footer"
                  className="h-16 w-auto brightness-0 invert opacity-90"
                />
                <div>
                  <h3 className="font-bold text-xl tracking-wide">CRAYON'S</h3>
                  <p className="text-xs text-gray-300">Excelencia Educativa</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Formando líderes del mañana con valores sólidos, excelencia académica y tecnología de vanguardia. Más de 13 años al servicio de la educación.
              </p>
              <div className="flex gap-4">
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-[#F26513] transition-all duration-300 hover:scale-110">
                  <Facebook size={20} />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-[#F26513] transition-all duration-300 hover:scale-110">
                  <Instagram size={20} />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-[#F26513] transition-all duration-300 hover:scale-110">
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 border-l-4 border-[#F26513] pl-3">Enlaces Rápidos</h4>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/" className="hover:text-[#F26513] transition-colors flex items-center gap-2">› Inicio</Link></li>
                <li><Link to="/vision-mision" className="hover:text-[#F26513] transition-colors flex items-center gap-2">› Nosotros</Link></li>
                <li><a href="#propuesta" className="hover:text-[#F26513] transition-colors flex items-center gap-2">› Propuesta Educativa</a></li>
                <li><a href="#admision" className="hover:text-[#F26513] transition-colors flex items-center gap-2">› Admisión 2025</a></li>
                <li><Link to="/login" className="hover:text-[#F26513] transition-colors flex items-center gap-2">› Intranet</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6 border-l-4 border-[#F26513] pl-3">Contáctanos</h4>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <MapPin className="text-[#F26513] mt-1 shrink-0" size={18} />
                  <span>Jr. José Pardo Nro. 181<br />Junín - Satipo, Perú</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-[#F26513] shrink-0" size={18} />
                  <span>+51 974 958 865</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="text-[#F26513] shrink-0" size={18} />
                  <span>pvilcapoma2022@gmail.com</span>
                </li>
              </ul>
            </div>

            {/* Horario */}
            <div>
              <h4 className="text-lg font-bold mb-6 border-l-4 border-[#F26513] pl-3">Horario de Atención</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex justify-between">
                  <span>Lunes - Viernes:</span>
                  <span className="text-white font-medium">7:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sábados:</span>
                  <span className="text-white font-medium">8:00 AM - 12:00 PM</span>
                </li>
                <li className="flex justify-between text-gray-400">
                  <span>Domingos:</span>
                  <span>Cerrado</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 mt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Institución Educativa Crayon's. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
