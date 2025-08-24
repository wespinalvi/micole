const Body = () => {
    return <>
     
    
      {/* Hero principal */}
      <section className="relative bg-gradient-to-r from-[#E6E8F5] to-[#F3F4FB] py-16 px-6 md:px-12 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#3E328C] mb-4">Bienvenidos al Colegio Crayon's</h1>
          <p className="text-lg md:text-xl text-[#2B2461] mb-6">Formando líderes con valores, creatividad y excelencia académica.</p>
          <a href="https://wa.me/51914791640" className="inline-block bg-[#F26513] hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold shadow transition-colors duration-200">Solicita información</a>
        </div>
        <div className="flex-1 flex justify-center">
          <img src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=500&q=80" alt="Estudiantes felices" className="rounded-2xl shadow-lg w-full max-w-md" />
        </div>
      </section>

      {/* Sobre nosotros */}
      <section className="py-16 px-6 md:px-12 bg-white max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#3E328C] mb-4 text-center">Sobre Nosotros</h2>
        <p className="text-center text-[#2B2461] max-w-2xl mx-auto">Somos una institución educativa comprometida con el desarrollo integral de nuestros estudiantes, promoviendo valores, creatividad y pensamiento crítico. Más de 20 años formando generaciones con excelencia y calidez humana.</p>
      </section>

      {/* Propuesta educativa */}
      <section id="propuesta" className="py-16 px-6 md:px-12 bg-[#F3F4FB]">
        <h2 className="text-3xl font-bold text-[#3E328C] mb-4 text-center">Propuesta Educativa</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h3 className="font-bold text-[#F26513] mb-2">Innovación</h3>
            <p>Metodologías activas, tecnología en el aula y aprendizaje basado en proyectos.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h3 className="font-bold text-[#F26513] mb-2">Valores</h3>
            <p>Educación en valores, respeto, responsabilidad y trabajo en equipo.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h3 className="font-bold text-[#F26513] mb-2">Excelencia</h3>
            <p>Docentes calificados y acompañamiento personalizado para cada estudiante.</p>
          </div>
        </div>
      </section>

      {/* Niveles educativos */}
      <section className="py-16 px-6 md:px-12 bg-white max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#3E328C] mb-8 text-center">Nuestros Niveles</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Preescolar */}
          <div className="bg-[#E6E8F5] rounded-xl p-6 text-center flex flex-col items-center">
            <img src="https://img.icons8.com/color/96/000000/abc.png" alt="Inicial" className="mx-auto mb-4" />
            <h3 className="font-bold text-[#F26513] mb-1 text-xl">Inicial</h3>
            <span className="text-[#3E328C] font-semibold mb-2">3-5 años</span>
            <p className="mb-3">Desarrollo de habilidades básicas a través del juego y la exploración.</p>
            <ul className="text-left text-[#2B2461] mb-4 list-disc list-inside">
              <li>Estimulación temprana</li>
              <li>Desarrollo psicomotor</li>
              <li>Socialización</li>
            </ul>
            <a href="https://wa.me/51914791640" className="mt-auto bg-[#F26513] hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition-colors duration-200">Más Información</a>
          </div>
          {/* Primaria */}
          <div className="bg-[#E6E8F5] rounded-xl p-6 text-center flex flex-col items-center">
            <img src="https://img.icons8.com/color/96/000000/school.png" alt="Primaria" className="mx-auto mb-4" />
            <h3 className="font-bold text-[#F26513] mb-1 text-xl">Primaria</h3>
            <span className="text-[#3E328C] font-semibold mb-2">6-12 años</span>
            <p className="mb-3">Formación integral con énfasis en lectoescritura y matemáticas.</p>
            <ul className="text-left text-[#2B2461] mb-4 list-disc list-inside">
              <li>Metodología activa</li>
              <li>Inglés intensivo</li>
              <li>Valores ciudadanos</li>
            </ul>
            <a href="https://wa.me/51914791640" className="mt-auto bg-[#F26513] hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition-colors duration-200">Más Información</a>
          </div>
          {/* Secundaria */}
          <div className="bg-[#E6E8F5] rounded-xl p-6 text-center flex flex-col items-center">
            <img src="https://img.icons8.com/color/96/000000/graduation-cap.png" alt="Secundaria" className="mx-auto mb-4" />
            <h3 className="font-bold text-[#F26513] mb-1 text-xl">Secundaria</h3>
            <span className="text-[#3E328C] font-semibold mb-2">12-18 años</span>
            <p className="mb-3">Preparación académica sólida con orientación vocacional.</p>
            <ul className="text-left text-[#2B2461] mb-4 list-disc list-inside">
              <li>Laboratorios equipados</li>
              <li>Proyectos de investigación</li>
              <li>Liderazgo estudiantil</li>
            </ul>
            <a href="https://wa.me/51914791640" className="mt-auto bg-[#F26513] hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition-colors duration-200">Más Información</a>
          </div>
        </div>
      </section>

   

      {/* Galería de fotos */}
      <section className="py-16 px-6 md:px-12 bg-white max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#3E328C] mb-8 text-center">Galería</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Imágenes de ejemplo, reemplaza por tus propias fotos */}
          <img src="https://res.cloudinary.com/dykfhtdsz/image/upload/v1755996947/01_oa8rts.jpg" alt="Galería 1" className="rounded-lg h-40 w-full object-cover" />
          <img src="https://res.cloudinary.com/dykfhtdsz/image/upload/v1755996947/04_txhnvz.jpg" alt="Galería 2" className="rounded-lg h-40 w-full object-cover" />
          <img src="https://res.cloudinary.com/dykfhtdsz/image/upload/v1755996946/03_uigsf1.jpg" alt="Galería 3" className="rounded-lg h-40 w-full object-cover" />
          <img src="https://res.cloudinary.com/dykfhtdsz/image/upload/v1755996946/02_jsrlhx.jpg" alt="Galería 4" className="rounded-lg h-40 w-full object-cover" />
        </div>
      </section>

      {/* Instalaciones y Recursos */}
      <section className="py-16 px-6 md:px-12 bg-[#F3F4FB]">
        <h2 className="text-3xl font-bold text-[#3E328C] mb-8 text-center">Nuestras Instalaciones</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="bg-[#3E328C] text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            </div>
            <h3 className="font-bold text-[#3E328C] mb-2">Laboratorios de Ciencias</h3>
            <p className="text-[#2B2461] text-sm">Equipados con microscopios, reactivos y materiales para experimentos prácticos en física, química y biología.</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="bg-[#F26513] text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="font-bold text-[#3E328C] mb-2">Sala de Computación</h3>
            <p className="text-[#2B2461] text-sm">Computadoras modernas con software educativo especializado para desarrollar habilidades tecnológicas.</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="bg-[#3E328C] text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </div>
            <h3 className="font-bold text-[#3E328C] mb-2">Biblioteca</h3>
            <p className="text-[#2B2461] text-sm">Amplia colección de libros, enciclopedias y recursos digitales para fomentar la lectura y la investigación.</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg">
            <div className="bg-[#F26513] text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="font-bold text-[#3E328C] mb-2">Áreas Deportivas</h3>
            <p className="text-[#2B2461] text-sm">Canchas de fútbol, básquet y vóley, para actividades físicas y deportivas.</p>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 px-6 md:px-12 bg-[#F3F4FB]">
        <h2 className="text-3xl font-bold text-[#3E328C] mb-8 text-center">Testimonios</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow p-6">
            <p className="italic mb-2">"El colegio Crayon's ha sido una segunda casa para mi hijo. Excelente formación y valores."</p>
            <span className="font-bold text-[#F26513]">- Madre de familia</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <p className="italic mb-2">"Gracias a los profesores, ahora me siento preparado para la universidad."</p>
            <span className="font-bold text-[#F26513]">- Exalumno</span>
          </div>
        </div>
      </section>

      {/* Actividades Extracurriculares */}
      <section className="py-16 px-6 md:px-12 bg-white max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#3E328C] mb-8 text-center">Actividades Extracurriculares</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[#E6E8F5] rounded-xl p-6 text-center shadow-lg">
            <div className="bg-[#F26513] text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
            </div>
            <h3 className="font-bold text-[#3E328C] mb-3 text-xl">Música y Arte</h3>
            <p className="text-[#2B2461] mb-4">Clases de guitarra, piano, canto coral, pintura y manualidades. Desarrollamos la creatividad y expresión artística de nuestros estudiantes.</p>
            <ul className="text-left text-[#2B2461] text-sm space-y-1">
              <li>• Orquesta estudiantil</li>
              <li>• Coro institucional</li>
              <li>• Talleres de arte</li>
            </ul>
          </div>
          <div className="bg-[#E6E8F5] rounded-xl p-6 text-center shadow-lg">
            <div className="bg-[#3E328C] text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h3 className="font-bold text-[#3E328C] mb-3 text-xl">Deportes</h3>
            <p className="text-[#2B2461] mb-4">Fútbol, básquet, vóley, atletismo y natación. Promovemos la salud física y el trabajo en equipo.</p>
            <ul className="text-left text-[#2B2461] text-sm space-y-1">
              <li>• Selecciones deportivas</li>
              <li>• Intercambios escolares</li>
              <li>• Olimpiadas internas</li>
            </ul>
          </div>
          <div className="bg-[#E6E8F5] rounded-xl p-6 text-center shadow-lg">
            <div className="bg-[#F26513] text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            </div>
            <h3 className="font-bold text-[#3E328C] mb-3 text-xl">Ciencias y Tecnología</h3>
            <p className="text-[#2B2461] mb-4">Robótica, programación, club de ciencias y ferias tecnológicas. Preparando a los estudiantes para el futuro digital.</p>
            <ul className="text-left text-[#2B2461] text-sm space-y-1">
              <li>• Club de robótica</li>
              <li>• Programación básica</li>
              <li>• Proyectos científicos</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Equipo directivo y docente */}
      <section className="py-16 px-6 md:px-12 bg-white max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#3E328C] mb-8 text-center">Nuestro Equipo</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Ejemplo de personal, reemplaza por tu equipo real */}
          <div className="flex flex-col items-center bg-[#E6E8F5] rounded-xl p-6">
            <img src="https://res.cloudinary.com/dykfhtdsz/image/upload/v1755997152/icon-7797704_640_nqtyoo.png" alt="Directora" className="rounded-full h-24 w-24 mb-4 object-cover" />
            <h3 className="font-bold text-[#F26513]">Pedro Vilcapoma Malpartida</h3>
            <span className="text-[#2B2461]">Director</span>
          </div>
          <div className="flex flex-col items-center bg-[#E6E8F5] rounded-xl p-6">
            <img src="https://res.cloudinary.com/dykfhtdsz/image/upload/v1755997152/icon-7797704_640_nqtyoo.png" alt="Profesor" className="rounded-full h-24 w-24 mb-4 object-cover" />
            <h3 className="font-bold text-[#F26513]">Prof. Juan López</h3>
            <span className="text-[#2B2461]">Profesor de Matemática</span>
          </div>
          <div className="flex flex-col items-center bg-[#E6E8F5] rounded-xl p-6">
            <img src="https://res.cloudinary.com/dykfhtdsz/image/upload/v1755997152/icon-7797704_640_nqtyoo.png" alt="Profesora" className="rounded-full h-24 w-24 mb-4 object-cover" />
            <h3 className="font-bold text-[#F26513]">Prof. Ana Torres</h3>
            <span className="text-[#2B2461]">Profesora de Inicial</span>
          </div>
        </div>
      </section>

      {/* Mapa de ubicación */}
      <section className="py-16 px-6 md:px-12 bg-[#F3F4FB]">
        <h2 className="text-3xl font-bold text-[#3E328C] mb-8 text-center">¿Dónde estamos?</h2>
        <div className="flex justify-center">
          {/* Puedes reemplazar el iframe por un componente de mapa más avanzado si lo deseas */}
          <iframe
            title="Mapa Colegio Crayon's"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.547317541468!2d-74.6466083!3d-11.258158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910bc110abf95455%3A0xdd33d47930091cf9!2sI.E.P.%20CRAYOLITAS%20-%20CRAYONS!5e0!3m2!1ses!2spe!4v1724260000000!5m2!1ses!2spe"
            
            width="100%"
            height="300"
            className="rounded-xl border-0 shadow w-full max-w-2xl"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Estadísticas y Logros */}
      <section className="py-16 px-6 md:px-12 bg-white max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#3E328C] mb-8 text-center">Nuestros Logros en Números</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-[#3E328C] text-white p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold">13+</span>
            </div>
            <h3 className="font-bold text-[#3E328C] mb-2">Años de Experiencia</h3>
            <p className="text-[#2B2461] text-sm">Formando generaciones con excelencia educativa desde 2011</p>
          </div>
          <div className="text-center">
            <div className="bg-[#F26513] text-white p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold">300+</span>
            </div>
            <h3 className="font-bold text-[#3E328C] mb-2">Estudiantes</h3>
            <p className="text-[#2B2461] text-sm">Alumnos activos en todos los niveles educativos</p>
          </div>
          <div className="text-center">
            <div className="bg-[#3E328C] text-white p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold">25+</span>
            </div>
            <h3 className="font-bold text-[#3E328C] mb-2">Docentes</h3>
            <p className="text-[#2B2461] text-sm">Profesionales calificados y comprometidos</p>
          </div>
          <div className="text-center">
            <div className="bg-[#F26513] text-white p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold">95%</span>
            </div>
            <h3 className="font-bold text-[#3E328C] mb-2">Tasa de Éxito</h3>
            <p className="text-[#2B2461] text-sm">Estudiantes que ingresan a universidades prestigiosas</p>
          </div>
        </div>
        
        <div className="mt-12 bg-[#E6E8F5] rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-[#3E328C] mb-4">Reconocimientos y Certificaciones</h3>
          <div className="grid md:grid-cols-2 gap-6 justify-center">
            <div className="bg-white rounded-lg p-4">
              <div className="bg-[#F26513] text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
              </div>
              <h4 className="font-bold text-[#3E328C] mb-2">Certificación MINEDU</h4>
              <p className="text-[#2B2461] text-sm">Institución educativa autorizada por el Ministerio de Educación</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="bg-[#3E328C] text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              </div>
              <h4 className="font-bold text-[#3E328C] mb-2">Premio a la Excelencia</h4>
              <p className="text-[#2B2461] text-sm">Reconocimiento por la calidad educativa 2023</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Información de Contacto y Horarios */}
      <section className="py-16 px-6 md:px-12 bg-[#F3F4FB]">
        <h2 className="text-3xl font-bold text-[#3E328C] mb-8 text-center">Información de Contacto</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-[#3E328C] mb-6">Horarios de Atención</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="font-semibold text-[#2B2461]">Lunes a Viernes:</span>
                <span className="text-[#F26513]">7:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="font-semibold text-[#2B2461]">Sábados:</span>
                <span className="text-[#F26513]">8:00 AM - 12:00 PM</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="font-semibold text-[#2B2461]">Domingos:</span>
                <span className="text-[#F26513]">Cerrado</span>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-bold text-[#3E328C] mb-3">Horarios de Clases:</h4>
              <p className="text-[#2B2461] mb-2"><span className="font-semibold">Inicial:</span> 8:00 AM - 12:00 PM</p>
              <p className="text-[#2B2461] mb-2"><span className="font-semibold">Primaria:</span> 8:00 AM - 1:00 PM</p>
              <p className="text-[#2B2461]"><span className="font-semibold">Secundaria:</span> 8:00 AM - 2:00 PM</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-[#3E328C] mb-6">Datos de Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-[#3E328C] text-white p-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <p className="font-semibold text-[#3E328C]">Dirección</p>
                  <p className="text-[#2B2461]">Jr. José Pardo Nro. 181<br />Junín - Satipo, Perú</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-[#F26513] text-white p-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <p className="font-semibold text-[#3E328C]">Teléfono</p>
                  <p className="text-[#2B2461]">+51 974 958 865</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-[#3E328C] text-white p-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="font-semibold text-[#3E328C]">Email</p>
                  <p className="text-[#2B2461]">pvilcapoma2022@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Redes sociales */}
      <section className="py-8 px-6 md:px-12 bg-white max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-[#3E328C] mb-4 text-center">Síguenos en redes sociales</h2>
        <div className="flex justify-center gap-6">
          <a href="#" className="hover:scale-110 transition-transform" aria-label="Facebook">
            <svg className="w-8 h-8 text-[#3E328C]" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
          </a>
          <a href="#" className="hover:scale-110 transition-transform" aria-label="Instagram">
            <svg className="w-8 h-8 text-[#F26513]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.13 4.602.402 3.635 1.37 2.668 2.337 2.396 3.51 2.338 4.788 2.28 6.068 2.267 6.477 2.267 12c0 5.523.013 5.932.071 7.212.058 1.278.33 2.451 1.297 3.418.967.967 2.14 1.239 3.418 1.297C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.278-.058 2.451-.33 3.418-1.297.967-.967 1.239-2.14 1.297-3.418.058-1.28.071-1.689.071-7.212 0-5.523-.013-5.932-.071-7.212-.058-1.278-.33-2.451-1.297-3.418C19.399.402 18.226.13 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
          </a>
          <a href="#" className="hover:scale-110 transition-transform" aria-label="YouTube">
            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 00-2.112-2.112C19.675 3.5 12 3.5 12 3.5s-7.675 0-9.386.574A2.994 2.994 0 00.502 6.186C0 7.897 0 12 0 12s0 4.103.502 5.814a2.994 2.994 0 002.112 2.112C4.325 20.5 12 20.5 12 20.5s7.675 0 9.386-.574a2.994 2.994 0 002.112-2.112C24 16.103 24 12 24 12s0-4.103-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>
      </section>
    
    </>
};
     
export default Body;
     
     
     
     
     
     
     
    