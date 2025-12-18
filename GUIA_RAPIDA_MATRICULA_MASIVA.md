# 🚀 Guía Rápida: Matrícula Masiva

## ¿Qué hace esta funcionalidad?

Permite procesar **hasta 10 fichas de matrícula en PDF simultáneamente** usando IA (Gemini 2.0 Flash) para extraer automáticamente todos los datos de los estudiantes.

## 📋 Requisitos Previos

1. **Backend corriendo**: El servidor debe estar activo en `http://localhost:3000`
2. **PDFs de fichas de matrícula**: Archivos PDF con las fichas únicas de matrícula

## 🎯 Cómo Usar

### Paso 1: Acceder a la Funcionalidad
```
Dashboard → Gestión de Alumnos → Matrícula Masiva
```
O directamente: `http://localhost:5174/dashboard/bulk-enrollment`

### Paso 2: Cargar Archivos PDF
1. Haz clic en el área de carga o en "Seleccionar Archivos"
2. Selecciona hasta 10 archivos PDF
3. Los archivos aparecerán en una tabla con estado "Pendiente"

### Paso 3: Procesar
1. Haz clic en el botón **"Procesar Archivos"**
2. Espera mientras la IA extrae los datos (verás una barra de progreso)
3. Los estados cambiarán a:
   - 🔵 **Procesando...** (mientras se analiza)
   - ✅ **Exitoso** (datos extraídos correctamente)
   - ❌ **Error** (si hubo un problema)

### Paso 4: Revisar Datos
1. Haz clic en el ícono del ojo 👁️ para ver los detalles completos
2. Revisa toda la información extraída del PDF
3. Verifica que los datos sean correctos

### Paso 5: Exportar
1. Haz clic en **"Exportar Datos"** para descargar un JSON
2. El archivo contendrá todos los registros exitosos
3. Nombre del archivo: `matriculas_masivas_YYYY-MM-DD.json`

## 📊 Datos Extraídos

La IA extrae automáticamente:

### 👤 Estudiante
- DNI, Nombres, Apellidos
- Fecha de nacimiento
- Sexo, Estado civil
- Idiomas (materna y segunda lengua)

### 📍 Ubicación
- Lugar de nacimiento (país, departamento, provincia, distrito)
- Domicilio actual completo
- Teléfono

### 👨‍👩‍👧 Familia
- **Padre**: Nombres, fecha de nacimiento, ocupación, grado de instrucción
- **Madre**: Nombres, fecha de nacimiento, ocupación, grado de instrucción
- Número de hermanos
- Religión

### 🏥 Salud
- Tipo de sangre
- Alergias
- Discapacidades

## ⚠️ Solución de Problemas

### Error: "Verifica que el servidor esté corriendo"
**Solución**: 
```bash
# En el directorio del backend
npm run dev
```
Verifica que esté corriendo en `http://localhost:3000`

### Error: "Error del servidor: 500"
**Posibles causas**:
- API key de Gemini no configurada
- Archivo PDF corrupto o no legible
- Límite de tamaño excedido (máx 10MB por archivo)

**Solución**:
1. Verifica el archivo `.env` del backend
2. Revisa los logs del servidor
3. Intenta con un PDF más pequeño

### Archivos marcados como "Error"
**Qué hacer**:
1. Verifica que el PDF sea una ficha de matrícula válida
2. Asegúrate de que el PDF no esté protegido con contraseña
3. Intenta procesar el archivo individualmente
4. Revisa la calidad del escaneo (debe ser legible)

## 💡 Consejos

### Para Mejores Resultados:
- ✅ Usa PDFs de buena calidad (no borrosos)
- ✅ Asegúrate de que el texto sea legible
- ✅ Procesa archivos similares juntos
- ✅ Verifica los datos extraídos antes de guardar

### Limitaciones:
- ⚠️ Máximo 10 archivos por lote
- ⚠️ Máximo 10MB por archivo
- ⚠️ Solo archivos PDF
- ⚠️ Requiere conexión a internet (para la API de Gemini)

## 🔄 Flujo Completo

```
1. Seleccionar PDFs (hasta 10)
   ↓
2. Hacer clic en "Procesar Archivos"
   ↓
3. Esperar procesamiento (barra de progreso)
   ↓
4. Revisar resultados en la tabla
   ↓
5. Ver detalles de cada estudiante (ícono ojo)
   ↓
6. Exportar datos exitosos (botón "Exportar Datos")
   ↓
7. [Futuro] Guardar en base de datos
```

## 📞 Soporte

Si encuentras problemas:
1. Revisa los logs del navegador (F12 → Console)
2. Revisa los logs del servidor backend
3. Verifica que la API key de Gemini esté configurada
4. Asegúrate de que ambos servidores estén corriendo

## 🎨 Características Visuales

- **Barra de progreso**: Muestra el avance del procesamiento
- **Badges de estado**: Colores claros para cada estado
- **Estadísticas**: Total, exitosos y errores en tiempo real
- **Modal de detalles**: Vista completa de información extraída
- **Mensajes de feedback**: Alertas de éxito/error claras

---

**¿Listo para procesar tus fichas de matrícula? ¡Comienza ahora!** 🚀
