# Matrícula Masiva - Documentación

## Descripción General

Se ha creado una nueva interfaz para realizar **matrículas masivas** que permite procesar múltiples fichas de matrícula en formato PDF de manera simultánea. Esta funcionalidad está diseñada para agilizar el proceso de registro de estudiantes al inicio del año académico.

## Ubicación

- **Ruta**: `/dashboard/bulk-enrollment`
- **Componente**: `BulkEnrollment.tsx`
- **Ubicación del archivo**: `/src/view/private/BulkEnrollment.tsx`
- **Menú**: Dashboard → Gestión de Alumnos → Matrícula Masiva

## Características Principales

### 1. Carga de Archivos
- Permite subir hasta **10 archivos PDF** simultáneamente
- Interfaz de arrastrar y soltar (drag & drop)
- Validación de tipo de archivo (solo PDF)
- Visualización inmediata de archivos seleccionados

### 2. Procesamiento Automático
- Procesamiento secuencial de archivos con IA (Gemini 2.0 Flash)
- Barra de progreso en tiempo real (0% a 100%)
- Muestra archivos procesados del total (ej: "3/10")
- Estados de procesamiento:
  - **Pendiente**: Archivo cargado pero no procesado
  - **Procesando**: Extracción de datos en curso
  - **Exitoso**: Datos extraídos correctamente
  - **Error**: Fallo en la extracción

### 3. Visualización de Datos
Tabla con información resumida de cada estudiante:
- Nombre del archivo
- DNI del estudiante
- Nombre completo (Apellidos, Nombres)
- Fecha de nacimiento
- Estado del procesamiento
- Acciones:
  - **Ver detalles** (ícono de ojo): Ver información completa del estudiante
  - **Reprocesar** (ícono de refresh): Reprocesar un archivo que falló (solo visible en archivos con error)
  - **Eliminar** (ícono X): Eliminar el archivo de la lista

### 4. Estadísticas
Panel con métricas en tiempo real:
- Total de archivos procesados
- Cantidad de registros exitosos
- Cantidad de errores

### 5. Vista Detallada
Modal con información completa del estudiante extraída del PDF:

#### Datos del Estudiante
- DNI, Código de estudiante
- Apellidos y nombres
- Sexo, Estado civil
- Fecha de nacimiento
- Lengua materna y segunda lengua

#### Lugar de Nacimiento
- País, Departamento, Provincia, Distrito

#### Domicilio Actual
- Dirección completa
- Departamento, Provincia, Distrito
- Teléfono

#### Datos del Padre
- Nombres completos
- Fecha de nacimiento
- Grado de instrucción
- Ocupación
- Si vive con el estudiante

#### Datos de la Madre
- Nombres completos
- Fecha de nacimiento
- Grado de instrucción
- Ocupación
- Si vive con el estudiante

#### Información Adicional
- Número de hermanos
- Lugar que ocupa
- Religión
- Tipo de sangre

### 6. Exportación de Datos
- Botón para exportar datos exitosos en formato JSON
- Nombre de archivo con fecha: `matriculas_masivas_YYYY-MM-DD.json`

## Integración con API

La interfaz está **completamente integrada** con el backend de extracción de datos mediante IA (Gemini 2.0 Flash).

### Endpoint Utilizado

```
POST http://localhost:3000/api/pdf/extraer-multiples
Content-Type: multipart/form-data
Body: pdfs (files, máximo 10)
```

### Flujo de Procesamiento

1. **Carga de archivos**: El usuario selecciona hasta 10 archivos PDF
2. **Envío al backend**: Los archivos se procesan **secuencialmente** (uno por uno)
3. **Procesamiento con IA**: Cada archivo se envía al backend que utiliza Gemini para extraer datos estructurados
4. **Actualización de UI en tiempo real**: 
   - El progreso se actualiza incrementalmente (cada archivo completado aumenta el %)
   - Los resultados se muestran inmediatamente al completar cada archivo
   - Estados visuales se actualizan en tiempo real
5. **Manejo de errores**: Errores de red o procesamiento se muestran claramente por archivo

### Estructura de Respuesta Esperada

```json
{
  "success": true,
  "mensaje": "Procesamiento completado",
  "totalArchivos": 3,
  "exitosos": 3,
  "fallidos": 0,
  "resultados": [
    {
      "nombreArchivo": "ficha1.pdf",
      "exito": true,
      "datos": {
        "codigoEstudiante": "",
        "dni": "63432366",
        "apellidoPaterno": "CASTRO",
        "apellidoMaterno": "MORALES",
        "nombres": "EDUAR",
        // ... más campos
      }
    }
  ]
}
```

### Manejo de Errores

La interfaz maneja los siguientes tipos de errores:

- **Error de red**: "Error desconocido al procesar los archivos. Verifica que el servidor esté corriendo."
- **Error del servidor**: "Error del servidor: [código de estado]"
- **Respuesta inválida**: "Respuesta inválida del servidor"
- **Archivos individuales**: Cada archivo puede tener estado "error" si falla su procesamiento

#### Reprocesamiento Individual

Cuando un archivo tiene estado de "error", aparece un botón de **Reprocesar** (ícono de refresh en color naranja) que permite:
- Reintentar el procesamiento de ese archivo específico
- No afecta el estado de los demás archivos
- Muestra mensajes de éxito o error específicos para ese archivo
- El botón se deshabilita mientras hay un procesamiento en curso

## Datos Extraídos

Los siguientes campos son extraídos automáticamente de cada PDF:

```json
{
  "codigoEstudiante": "EST001000",
  "dni": "63432366",
  "apellidoPaterno": "CASTRO",
  "apellidoMaterno": "MORALES",
  "nombres": "EDUAR",
  "sexo": "H",
  "estadoCivil": "SOLTERO",
  "fechaNacimiento": "11/12/2011",
  "lenguaMaterna": "ASHANINKA",
  "segundaLengua": "CASTELLANO",
  "departamentoNacimiento": "JUNIN",
  "provinciaNacimiento": "SATIPO",
  "distritoNacimiento": "RIO TAMBO",
  "nombresPadre": "WILDER",
  "nombresMadre": "AURORA",
  
  // Datos de Matrícula Actual
  "anioMatriculaActual": "2025",
  "gradoActual": "CUARTO",
  "nivelActual": "SECUNDARIA",
  "institucionEducativaActual": "JOSE FLORES",

  // Historial de Escolaridad
  "historialEscolaridad": [
    {
      "anio": "2024",
      "institucionEducativa": "JOSE FLORES",
      "grado": "TERCERO",
      "nivel": "SECUNDARIA"
    },
    {
      "anio": "2023",
      "institucionEducativa": "JOSE FLORES",
      "grado": "SEGUNDO",
      "nivel": "SECUNDARIA"
    }
  ]
}
```

## Flujo de Uso

1. **Acceder a la vista**: Dashboard → Gestión de Alumnos → Matrícula Masiva
2. **Seleccionar archivos**: Hacer clic en el área de carga o arrastrar archivos PDF
3. **Procesar archivos**: Hacer clic en "Procesar Archivos"
4. **Revisar resultados**: Ver el estado de cada archivo en la tabla
5. **Ver detalles**: Hacer clic en el ícono de ojo para ver información completa
6. **Exportar datos**: Hacer clic en "Exportar Datos" para descargar el JSON

## Estado de Integración

✅ **Completado:**
- Interfaz de usuario completa
- Integración con API de extracción de datos
- Procesamiento con Gemini 2.0 Flash
- Manejo de errores y feedback visual
- Exportación de datos en JSON

## Mejoras Futuras (Opcionales)

Para llevar la funcionalidad al siguiente nivel:

1. **Guardar en Base de Datos**:
   ```typescript
   POST /api/enrollment/bulk-save
   Body: { students: StudentData[] }
   ```
   - Validar datos antes de guardar
   - Generar credenciales de acceso automáticamente
   - Enviar notificaciones a apoderados

2. **Vista Previa y Edición**:
   - Permitir editar datos extraídos antes de confirmar
   - Validación de campos obligatorios
   - Detección de duplicados (DNI existente)

3. **Historial de Importaciones**:
   - Guardar registro de cada importación masiva
   - Fecha, usuario, cantidad de registros
   - Opción de revertir importación

4. **Mejoras de UX**:
   - Drag & drop real para archivos
   - Vista previa de PDFs
   - Comparación lado a lado (PDF vs datos extraídos)
   - Corrección manual de errores de OCR

5. **Reportes**:
   - Generar reporte de matrícula masiva
   - Exportar a Excel/CSV
   - Estadísticas de procesamiento

6. **Notificaciones**:
   - Email a apoderados con credenciales
   - SMS de confirmación
   - Notificaciones en tiempo real con WebSockets

## Tecnologías Utilizadas

- **React** con TypeScript
- **shadcn/ui** para componentes UI
- **Lucide React** para iconos
- **React Router** para navegación
- **Tailwind CSS** para estilos

## Componentes UI Utilizados

- `Card`, `CardContent`, `CardHeader`, `CardTitle`
- `Button`
- `Table`, `TableBody`, `TableCell`, `TableHead`, `TableHeader`, `TableRow`
- `Dialog`, `DialogContent`, `DialogDescription`, `DialogHeader`, `DialogTitle`
- `Progress`
- `Badge`

## Notas de Diseño

- **Diseño responsive**: Se adapta a diferentes tamaños de pantalla
- **Feedback visual**: Estados claros con colores y badges
- **Accesibilidad**: Uso de componentes semánticos y ARIA labels
- **UX optimizada**: Proceso claro y guiado paso a paso
