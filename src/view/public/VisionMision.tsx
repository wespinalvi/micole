

const VisionMision = () => (
  <section id="vision" className="py-16 px-4 md:px-16 bg-gradient-to-br from-[#E6E8F5] via-[#F3F4FB] to-[#fff] min-h-[60vh]">
    <h2 className="text-3xl md:text-4xl font-extrabold text-[#3E328C] mb-12 text-center relative inline-block after:content-[''] after:block after:w-20 after:h-1 after:bg-[#F26513] after:mx-auto after:mt-2">
      Nuestra Misión y Visión
    </h2>
    <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
      {/* Misión */}
      <div className="bg-white border-0 rounded-2xl p-8 shadow-xl flex flex-col items-center hover:scale-105 transition-transform duration-300">
        <div className="bg-[#3E328C]/10 rounded-full p-4 mb-4">
          <svg className="w-12 h-12 text-[#3E328C]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
        </div>
        <h3 className="text-2xl font-bold text-[#3E328C] mb-3 border-b-2 border-[#F26513] pb-1">Misión</h3>
        <p className="text-[#2B2461] text-justify leading-relaxed">
          Somos una Institución Educativa Privada que brinda una educación integral a través de los Compromisos de Gestión Escolar, basada en valores éticos, morales y cívicos, desarrollando y potenciando sus competencias y capacidades de los estudiantes hacia los niveles esperados según su grado, ciclo y nivel en el marco del CNEB puedan culminar la escolaridad de manera satisfactoria, orientados hacia la excelencia y alcanzando su desarrollo integral en espacios seguros, inclusivos, de sana convivencia y libres de violencia, afianzando permanentemente sus aprendizajes basados en los fines y principios de la Educación Peruana.
        </p>
      </div>
      {/* Visión */}
      <div className="bg-white border-0 rounded-2xl p-8 shadow-xl flex flex-col items-center hover:scale-105 transition-transform duration-300">
        <div className="bg-[#F26513]/10 rounded-full p-4 mb-4">
          <svg className="w-12 h-12 text-[#F26513]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
        </div>
        <h3 className="text-2xl font-bold text-[#F26513] mb-3 border-b-2 border-[#3E328C] pb-1">Visión</h3>
        <p className="text-[#2B2461] text-justify leading-relaxed">
          Ser reconocidos en nuestra localidad al año 2026, como una Institución Educativa Privada que contribuye a que todos sus estudiantes puedan desarrollar su potencial desde la primera infancia, sean ciudadanos capaces de resolver con éxito los problemas que se les presente, asumiendo una actitud activa, crítica, analítica y responsable frente a los hechos de su entorno, practicando los valores basados en los principios de la Educación Peruana, autoevaluándose y evaluando a los demás para seguir aprendiendo, asumiéndose como ciudadanos con derechos y responsabilidades. Contribuyendo así al desarrollo de su comunidad y del país, combinando su capital cultural y natural con los avances mundiales en concordancia en el marco de los once aspectos del perfil de egreso del CNEB.
        </p>
      </div>
    </div>
  </section>
);

export default VisionMision; 