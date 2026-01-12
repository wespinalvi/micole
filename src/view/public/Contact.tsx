import { MapPin, Phone, Clock, Facebook, Instagram, Youtube, Send } from "lucide-react";

const Contact = () => {
    return (
        <div className="flex flex-col w-full">
            {/* Page Header */}
            <section className="relative py-16 bg-[#1e2a5a] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-3">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight">Contáctanos</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
                        Estamos aquí para resolver tus dudas y acompañarte en el proceso educativo de tus hijos.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Form */}
                        <div className="bg-gray-50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <h2 className="text-2xl font-black text-[#1e2a5a] mb-6">Envíanos un mensaje</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[#1e2a5a] ml-1">Nombre Completo</label>
                                        <input type="text" className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-3 text-sm focus:outline-none focus:border-[#F26513] transition-colors" placeholder="Ej. Juan Pérez" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[#1e2a5a] ml-1">Correo Electrónico</label>
                                        <input type="email" className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-3 text-sm focus:outline-none focus:border-[#F26513] transition-colors" placeholder="juan@ejemplo.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#1e2a5a] ml-1">Asunto</label>
                                    <select className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-3 text-sm focus:outline-none focus:border-[#F26513] transition-colors appearance-none">
                                        <option>Información sobre Admisión</option>
                                        <option>Consulta General</option>
                                        <option>Soporte Técnico</option>
                                        <option>Otros</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#1e2a5a] ml-1">Mensaje</label>
                                    <textarea rows={4} className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-3 text-sm focus:outline-none focus:border-[#F26513] transition-colors resize-none" placeholder="¿En qué podemos ayudarte?"></textarea>
                                </div>
                                <button className="w-full bg-[#F26513] hover:bg-[#d95a11] text-white py-4 rounded-2xl font-bold text-base shadow-xl shadow-orange-500/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                                    Enviar Mensaje <Send size={18} />
                                </button>
                            </form>
                        </div>

                        {/* Contact Info & Social */}
                        <div className="space-y-10">
                            <div className="space-y-6">
                                <h2 className="text-2xl font-black text-[#1e2a5a]">Información de Contacto</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-5 group">
                                        <div className="w-12 h-12 rounded-2xl bg-[#1e2a5a]/5 flex items-center justify-center text-[#1e2a5a] group-hover:bg-[#F26513] group-hover:text-white transition-all duration-300 shrink-0">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#1e2a5a] text-base">Nuestra Ubicación</h4>
                                            <p className="text-gray-600 leading-relaxed text-sm">Jr. José Pardo Nro. 181, Junín - Satipo, Perú</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-5 group">
                                        <div className="w-12 h-12 rounded-2xl bg-[#1e2a5a]/5 flex items-center justify-center text-[#1e2a5a] group-hover:bg-[#F26513] group-hover:text-white transition-all duration-300 shrink-0">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#1e2a5a] text-base">Llámanos</h4>
                                            <p className="text-gray-600 leading-relaxed text-sm">+51 974 958 865 <br /> (064) 545-123</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-5 group">
                                        <div className="w-12 h-12 rounded-2xl bg-[#1e2a5a]/5 flex items-center justify-center text-[#1e2a5a] group-hover:bg-[#F26513] group-hover:text-white transition-all duration-300 shrink-0">
                                            <Clock size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#1e2a5a] text-base">Horario de Atención</h4>
                                            <p className="text-gray-600 leading-relaxed text-sm">Lunes a Viernes: 7:30 AM - 4:00 PM <br /> Sábados: 8:00 AM - 12:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-gray-100">
                                <h3 className="font-bold text-[#1e2a5a] mb-6">Síguenos en nuestras redes</h3>
                                <div className="flex gap-3">
                                    {[Facebook, Instagram, Youtube].map((Icon, i) => (
                                        <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center hover:bg-[#F26513] hover:text-white transition-all duration-300">
                                            <Icon size={20} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
