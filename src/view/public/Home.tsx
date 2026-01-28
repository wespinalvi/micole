import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Youtube,
  GraduationCap, ChevronDown, BookOpen, Users, Star, Heart,
  History, Shield, Globe, Laptop, Trophy, Music, Plane, Handshake,
  UserCheck, Briefcase, Home as HomeIcon, MessageSquare
} from "lucide-react";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveMegaMenu(null);
    window.scrollTo(0, 0);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    {
      title: "Nuestro Colegio",
      icon: <HomeIcon size={18} />,
      items: [
        { name: "Bienvenida", icon: <UserCheck size={16} />, path: "/bienvenida" },
        { name: "Nuestros valores", icon: <Heart size={16} />, path: "/valores" },
        { name: "Nuestros pilares", icon: <Shield size={16} />, path: "/pilares" },
        { name: "Nuestro espacio", icon: <MapPin size={16} />, path: "/espacio" },
        { name: "Nuestra historia", icon: <History size={16} />, path: "/vision-mision" },
      ]
    },
    {
      title: "¿Qué Ofrecemos?",
      icon: <Star size={18} />,
      items: [
        { name: "Early years", icon: <Globe size={16} />, path: "/early-years" },
        { name: "Excelencia académica", icon: <Trophy size={16} />, path: "/excelencia" },
        { name: "Idiomas", icon: <MessageSquare size={16} />, path: "/idiomas" },
        { name: "Tecnología e innovación", icon: <Laptop size={16} />, path: "/tecnologia" },
        { name: "Deporte", icon: <Trophy size={16} />, path: "/deporte" },
        { name: "Arte y cultura", icon: <Music size={16} />, path: "/arte" },
        { name: "Viajes de estudio", icon: <Plane size={16} />, path: "/viajes" },
        { name: "Convenios y alianzas", icon: <Handshake size={16} />, path: "/convenios" },
      ]
    },
    {
      title: "Comunidad",
      icon: <Users size={18} />,
      items: [
        { name: "Alumnos", icon: <Users size={16} />, path: "/alumnos" },
        { name: "Padres de familia", icon: <Users size={16} />, path: "/padres" },
        { name: "Profesores", icon: <Briefcase size={16} />, path: "/profesores" },
        { name: "Exalumnos", icon: <GraduationCap size={16} />, path: "/exalumnos" },
      ]
    },
    { title: "Blog", path: "/blog", icon: <BookOpen size={18} /> },
  ];

  return (
    <div className="min-h-screen font-sans bg-white text-[#0D0D0D] flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#1e2a5a] text-white py-2 px-6 text-xs md:text-sm hidden md:flex justify-between items-center border-b border-white/10">
        <div className="flex gap-6">
          <span className="flex items-center gap-2 opacity-90 transition-opacity hover:opacity-100 cursor-default">
            <Phone size={14} className="text-[#F26513]" /> +51 974 958 865
          </span>
          <span className="flex items-center gap-2 opacity-90 transition-opacity hover:opacity-100 cursor-default">
            <Mail size={14} className="text-[#F26513]" /> pvilcapoma2022@gmail.com
          </span>
        </div>
        <div className="flex gap-6 items-center">
          <div className="flex gap-4 border-r border-white/20 pr-6">
            <Link to="/login" className="hover:text-[#F26513] transition-colors">Intranet</Link>
            <a href="#" className="hover:text-[#F26513] transition-colors">Webmail</a>
          </div>
          <div className="flex gap-3">
            <a href="#" className="hover:text-[#F26513] transition-colors"><Facebook size={16} /></a>
            <a href="#" className="hover:text-[#F26513] transition-colors"><Instagram size={16} /></a>
            <a href="#" className="hover:text-[#F26513] transition-colors"><Youtube size={16} /></a>
          </div>
        </div>
      </div>

      {/* Header Principal */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-xl py-1" : "bg-white py-2"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dszdc6rh8/image/upload/v1747351782/image_1_vhjpzr.png"
                alt="Logo Colegio Crayon's"
                className={`transition-all duration-500 ${scrolled ? "h-10" : "h-12"} w-auto drop-shadow-sm group-hover:scale-105`}
              />
              <div className="absolute -inset-1 bg-[#F26513]/10 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, idx) => (
              <div
                key={idx}
                className="relative group"
                onMouseEnter={() => setActiveMegaMenu(item.title)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                {item.items ? (
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-full font-medium text-sm text-[#1e2a5a] hover:bg-[#1e2a5a]/5 transition-all duration-300">
                    {item.title}
                    <ChevronDown size={14} className={`transition-transform duration-300 ${activeMegaMenu === item.title ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <Link
                    to={item.path || "#"}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full font-medium text-sm text-[#1e2a5a] hover:bg-[#1e2a5a]/5 transition-all duration-300"
                  >
                    {item.title}
                  </Link>
                )}

                {/* Mega Menu Dropdown */}
                {item.items && (
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${activeMegaMenu === item.title ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                    }`}>
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 min-w-[280px] grid grid-cols-1 gap-2">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100"></div>
                      {item.items.map((subItem, sIdx) => (
                        <Link
                          key={sIdx}
                          to={subItem.path}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F26513]/5 group/item transition-all duration-200"
                        >
                          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[#1e2a5a] group-hover/item:bg-[#F26513] group-hover/item:text-white transition-colors">
                            {subItem.icon}
                          </div>
                          <span className="font-medium text-gray-700 group-hover/item:text-[#F26513] transition-colors">
                            {subItem.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="flex items-center gap-2 ml-4">
              <Link
                to="/contacto"
                className="px-4 py-2 rounded-full font-semibold text-xs text-[#1e2a5a] border-2 border-[#1e2a5a] hover:bg-[#1e2a5a] hover:text-white transition-all duration-300"
              >
                CONTACTO
              </Link>
              <Link
                to="/admision"
                className="bg-[#F26513] hover:bg-[#d95a11] text-white px-6 py-2 rounded-full font-semibold text-xs shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                ADMISIÓN
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-xl bg-gray-50 text-[#1e2a5a] hover:bg-gray-100 transition-colors"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden fixed inset-0 top-[72px] bg-white z-40 transition-transform duration-500 ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}>
          <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-72px)]">
            {navItems.map((item, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-center gap-2 text-[#1e2a5a] font-semibold text-lg border-b border-gray-100 pb-2">
                  {item.icon}
                  {item.title}
                </div>
                {item.items ? (
                  <div className="grid grid-cols-1 gap-2 pl-4">
                    {item.items.map((subItem, sIdx) => (
                      <Link
                        key={sIdx}
                        to={subItem.path}
                        className="flex items-center gap-3 py-2 text-gray-600 hover:text-[#F26513]"
                        onClick={toggleMenu}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    to={item.path || "#"}
                    className="block pl-4 text-gray-600 hover:text-[#F26513]"
                    onClick={toggleMenu}
                  >
                    Ver más
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-6 grid grid-cols-1 gap-4">
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 bg-[#1e2a5a] text-white py-4 rounded-2xl font-semibold"
                onClick={toggleMenu}
              >
                <GraduationCap size={20} />
                AULA VIRTUAL
              </Link>
              <Link
                to="/admision"
                className="flex items-center justify-center bg-[#F26513] text-white py-4 rounded-2xl font-semibold"
                onClick={toggleMenu}
              >
                SOLICITAR ADMISIÓN
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer Premium - Hidden on Login and Change Password */}
      {location.pathname !== "/login" && location.pathname !== "/change-password" && (
        <footer className="bg-[#0a0f24] text-white pt-16 pb-8 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F26513] via-orange-400 to-[#F26513]"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#F26513]/5 rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {location.pathname === "/" ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                  {/* Brand Info */}
                  <div className="space-y-6">
                    <Link to="/" className="flex items-center gap-3">
                      <img
                        src="https://res.cloudinary.com/dszdc6rh8/image/upload/v1747351782/image_1_vhjpzr.png"
                        alt="Logo Footer"
                        className="h-14 w-auto brightness-0 invert"
                      />
                      <div>
                        <h3 className="font-bold text-xl tracking-tighter">CRAYON'S</h3>
                        <p className="text-[9px] text-[#F26513] font-semibold tracking-widest uppercase">Excelencia Educativa</p>
                      </div>
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Transformando el potential de cada estudiante en éxito real,
                      con valores sólidos y excelencia académica.
                    </p>
                    <div className="flex gap-3">
                      {[Facebook, Instagram, Youtube].map((Icon, i) => (
                        <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#F26513] transition-all duration-300 group">
                          <Icon size={18} className="group-hover:text-white transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div>
                    <h4 className="text-base font-semibold mb-6 flex items-center gap-2">
                      <span className="w-6 h-0.5 bg-[#F26513] rounded-full"></span>
                      Explorar
                    </h4>
                    <ul className="space-y-3">
                      {[
                        { name: "Nuestro Colegio", path: "/bienvenida" },
                        { name: "Propuesta Educativa", path: "/excelencia" },
                        { name: "Admisión 2026", path: "/admision" },
                        { name: "Comunidad", path: "/alumnos" },
                        { name: "Blog Institucional", path: "/blog" }
                      ].map((link, i) => (
                        <li key={i}>
                          <Link to={link.path} className="text-gray-400 hover:text-[#F26513] text-sm transition-colors flex items-center gap-2 group">
                            <span className="w-1 h-1 rounded-full bg-[#F26513] opacity-0 group-hover:opacity-100 transition-all"></span>
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h4 className="text-base font-semibold mb-6 flex items-center gap-2">
                      <span className="w-6 h-0.5 bg-[#F26513] rounded-full"></span>
                      Contacto
                    </h4>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3 group">
                        <MapPin className="text-[#F26513] shrink-0 mt-1" size={16} />
                        <span className="text-gray-400 text-sm leading-relaxed">
                          Jr. José Pardo Nro. 181<br />
                          Junín - Satipo, Perú
                        </span>
                      </li>
                      <li className="flex items-center gap-3 group">
                        <Phone className="text-[#F26513] shrink-0" size={16} />
                        <span className="text-gray-400 text-sm">+51 974 958 865</span>
                      </li>
                      <li className="flex items-center gap-3 group">
                        <Mail className="text-[#F26513] shrink-0" size={16} />
                        <span className="text-gray-400 text-sm">pvilcapoma2022@gmail.com</span>
                      </li>
                    </ul>
                  </div>

                  {/* Newsletter/CTA */}
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <h4 className="text-base font-semibold mb-3">Boletín Informativo</h4>
                    <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                      Recibe noticias y actualizaciones de nuestra comunidad.
                    </p>
                    <form className="space-y-2">
                      <input
                        type="email"
                        placeholder="Tu correo"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#F26513] transition-colors"
                      />
                      <button className="w-full bg-[#F26513] hover:bg-[#d95a11] text-white py-2.5 rounded-lg font-semibold text-xs transition-all duration-300">
                        SUSCRIBIRSE
                      </button>
                    </form>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-500">
                  <p>&copy; {new Date().getFullYear()} I.E. Crayon's. Todos los derechos reservados.</p>
                  <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                    <a href="#" className="hover:text-white transition-colors">Términos</a>
                    <a href="#" className="hover:text-white transition-colors">Libro de Reclamaciones</a>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center py-4">
                <Link to="/" className="flex items-center gap-3">
                  <img
                    src="https://res.cloudinary.com/dszdc6rh8/image/upload/v1747351782/image_1_vhjpzr.png"
                    alt="Logo Footer"
                    className="h-12 w-auto brightness-0 invert opacity-50 hover:opacity-100 transition-opacity"
                  />
                </Link>
                <p className="text-[10px] text-gray-600 mt-4">&copy; {new Date().getFullYear()} I.E. Crayon's</p>
              </div>
            )}
          </div>
        </footer>
      )}
    </div>
  );
};

export default HomePage;

