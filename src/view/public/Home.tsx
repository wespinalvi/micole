import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Youtube,
  GraduationCap, ChevronDown, Users, Star, Heart,
  History, Shield, Globe, Laptop, Trophy, Music,
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
        { name: "Inicial", icon: <Globe size={16} />, path: "/inicial" },
        { name: "Excelencia académica", icon: <Trophy size={16} />, path: "/excelencia" },
        { name: "Idiomas", icon: <MessageSquare size={16} />, path: "/idiomas" },
        { name: "Tecnología e innovación", icon: <Laptop size={16} />, path: "/tecnologia" },
        { name: "Deporte", icon: <Trophy size={16} />, path: "/deporte" },
        { name: "Arte y cultura", icon: <Music size={16} />, path: "/arte" },
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

  ];

  return (
    <div className="min-h-screen font-sans bg-white text-[#0D0D0D] flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#0f172a] text-white py-2.5 px-6 text-[11px] md:text-xs hidden md:flex justify-between items-center tracking-wide uppercase font-medium">
        <div className="flex gap-8 max-w-7xl mx-auto w-full justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2 opacity-80 transition-all hover:opacity-100 cursor-default">
              <Phone size={13} className="text-[#F26513]" /> +51 974 958 865
            </span>
            <span className="flex items-center gap-2 opacity-80 transition-all hover:opacity-100 cursor-default">
              <Mail size={13} className="text-[#F26513]" /> pvilcapoma2022@gmail.com
            </span>
          </div>
          <div className="flex gap-8 items-center">
            <div className="flex gap-6 border-r border-white/10 pr-8">
              <Link to="/login" className="hover:text-[#F26513] transition-colors flex items-center gap-1.5">
                <UserCheck size={14} /> Intranet
              </Link>
            </div>
            <div className="flex gap-4">
              <a href="#" className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#F26513] hover:border-[#F26513] transition-all duration-300"><Facebook size={12} /></a>
              <a href="#" className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#F26513] hover:border-[#F26513] transition-all duration-300"><Instagram size={12} /></a>
              <a href="#" className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#F26513] hover:border-[#F26513] transition-all duration-300"><Youtube size={12} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Header Principal */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/95 backdrop-blur-xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] py-2" : "bg-white py-4"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="https://res.cloudinary.com/dszdc6rh8/image/upload/v1747351782/image_1_vhjpzr.png"
              alt="Logo Colegio Crayon's"
              className={`transition-all duration-500 ${scrolled ? "h-11" : "h-14"} w-auto`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item, idx) => (
              <div
                key={idx}
                className="relative group h-full flex items-center"
                onMouseEnter={() => setActiveMegaMenu(item.title)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                {item.items ? (
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-sm text-[#1e2a5a] hover:text-[#F26513] transition-all duration-300 relative">
                    {item.title}
                    <ChevronDown size={14} className={`transition-transform duration-500 ${activeMegaMenu === item.title ? "rotate-180 text-[#F26513]" : ""}`} />
                    <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-[#F26513] transform scale-x-0 transition-transform duration-300 origin-left ${activeMegaMenu === item.title ? "scale-x-100" : ""}`}></span>
                  </button>
                ) : (
                  <Link
                    to={(item as any).path || "#"}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-sm text-[#1e2a5a] hover:text-[#F26513] transition-all duration-300 relative group"
                  >
                    {item.title}
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#F26513] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
                  </Link>
                )}

                {/* Dropdown Menu - Redesigned */}
                {item.items && (
                  <div className={`absolute top-full left-0 pt-2 transition-all duration-500 ease-out ${activeMegaMenu === item.title ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
                    }`}>
                    <div className="bg-white/98 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100/50 p-3 min-w-[320px] overflow-hidden">
                      {/* Decorative header in dropdown */}
                      <div className="px-4 py-2 mb-2 border-b border-gray-50 flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">{item.title}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#F26513]"></div>
                      </div>

                      <div className="grid grid-cols-1 gap-1">
                        {item.items.map((subItem, sIdx) => (
                          <Link
                            key={sIdx}
                            to={subItem.path}
                            className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-gray-50 group/item transition-all duration-300"
                          >
                            <div className="w-10 h-10 rounded-xl bg-[#1e2a5a]/5 flex items-center justify-center text-[#1e2a5a] group-hover/item:bg-[#1e2a5a] group-hover/item:text-white group-hover/item:scale-110 transition-all duration-300 shadow-sm">
                              {subItem.icon}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-sm text-gray-800 group-hover/item:text-[#F26513] transition-colors">
                                {subItem.name}
                              </span>
                              <span className="text-[11px] text-gray-400 group-hover/item:text-gray-500 transition-colors">
                                Explorar sección
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="flex items-center gap-3 ml-6">
              <Link
                to="/contacto"
                className="px-5 py-2.5 rounded-xl font-bold text-xs text-[#1e2a5a] bg-gray-50 border border-gray-200 hover:bg-white hover:border-[#1e2a5a] hover:shadow-lg transition-all duration-300 active:scale-95"
              >
                CONTACTO
              </Link>
              <Link
                to="/admision"
                className="bg-[#F26513] hover:bg-[#e05600] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-[0_10px_20px_-5px_rgba(242,101,19,0.3)] hover:shadow-[0_12px_25px_-5px_rgba(242,101,19,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
              >
                ADMISIÓN 2026
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-3 rounded-xl bg-gray-50 text-[#1e2a5a] hover:bg-gray-100 transition-all active:scale-90"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden fixed inset-0 top-0 bg-white z-[100] transition-transform duration-500 ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}>
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <img
                src="https://res.cloudinary.com/dszdc6rh8/image/upload/v1747351782/image_1_vhjpzr.png"
                alt="Logo"
                className="h-10 w-auto"
              />
              <button onClick={toggleMenu} className="p-3 bg-gray-50 rounded-xl"><X size={24} /></button>
            </div>

            <div className="space-y-6 overflow-y-auto flex-grow pr-2">
              {navItems.map((item, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="flex items-center gap-3 text-[#1e2a5a] font-bold text-lg">
                    <div className="w-8 h-8 rounded-lg bg-[#1e2a5a]/5 flex items-center justify-center text-[#1e2a5a]">
                      {item.icon}
                    </div>
                    {item.title}
                  </div>
                  {item.items ? (
                    <div className="grid grid-cols-1 gap-2 pl-11">
                      {item.items.map((subItem, sIdx) => (
                        <Link
                          key={sIdx}
                          to={subItem.path}
                          className="flex items-center gap-3 py-1 text-gray-500 hover:text-[#F26513] font-medium"
                          onClick={toggleMenu}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      to={(item as any).path || "#"}
                      className="block pl-11 text-gray-500 hover:text-[#F26513] font-medium"
                      onClick={toggleMenu}
                    >
                      Ir a {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-8 space-y-4 border-t border-gray-100">
              <Link
                to="/login"
                className="flex items-center justify-center gap-3 bg-[#1e2a5a] text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-900/10"
                onClick={toggleMenu}
              >
                <UserCheck size={20} />
                AULA VIRTUAL
              </Link>
              <Link
                to="/admision"
                className="flex items-center justify-center bg-[#F26513] text-white py-4 rounded-2xl font-bold shadow-xl shadow-orange-500/10"
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
    </div>
  );
};

export default HomePage;

