# Funcionalidad de Edición de Datos del Alumno

## Descripción

Se ha implementado una funcionalidad completa para que los alumnos puedan editar sus datos personales. Esta funcionalidad incluye:

1. **Componente principal**: `EditarDatosAlumno.tsx` - Página completa para ver y editar datos
2. **Componente reutilizable**: `EditarDatosButton.tsx` - Botón con modal integrado para editar datos
3. **Rutas configuradas**: Acceso desde el sidebar del dashboard
4. **Integración en listas**: Botón de edición en la lista de estudiantes

## Características

### ✅ Funcionalidades Implementadas

- **GET** `https://nodejsback-production.up.railway.app/api/alumno/mis-datos` - Obtener datos del alumno
- **PUT** `https://nodejsback-production.up.railway.app/api/alumno/mis-datos` - Actualizar datos del alumno
- Modal de edición con formulario completo
- Validación de campos
- Mensajes de éxito/error
- Diseño responsivo
- Integración con el sistema de autenticación

### 📋 Campos Editables

- **DNI**: Número de identificación
- **Nombres**: Nombre completo del alumno
- **Apellido Paterno**: Primer apellido
- **Apellido Materno**: Segundo apellido
- **Fecha de Nacimiento**: Fecha en formato YYYY-MM-DD

### 🎨 Diseño

- Colores corporativos del colegio (#3E328C, #F26513)
- Interfaz moderna y intuitiva
- Iconos descriptivos
- Animaciones de carga
- Mensajes de feedback visual

## Uso

### 1. Acceso desde el Dashboard

Los alumnos pueden acceder a sus datos desde:
```
Dashboard > Gestión de Alumnos > Mis Datos
```

### 2. Uso del Componente Reutilizable

```tsx
import EditarDatosButton from "@/components/EditarDatosButton";

// Uso básico
<EditarDatosButton />

// Con callback personalizado
<EditarDatosButton 
  onDataUpdated={(updatedData) => {
    console.log('Datos actualizados:', updatedData);
    // Actualizar estado local, etc.
  }}
/>

// Con estilos personalizados
<EditarDatosButton
  variant="outline"
  size="sm"
  className="text-blue-600 border-blue-600"
>
  Editar Datos
</EditarDatosButton>
```

### 3. Integración en Tablas

El botón se puede agregar fácilmente a cualquier tabla de estudiantes:

```tsx
<TableCell className="flex justify-end gap-2">
  <EditarDatosButton
    variant="outline"
    size="sm"
    className="text-[#3E328C] border-[#3E328C]"
  >
    Editar
  </EditarDatosButton>
</TableCell>
```

## Estructura de Datos

### Request Body (PUT)
```json
{
  "dni": "73683521",
  "nombre": "GUSTAVO ADOLFO",
  "ap_p": "TORRES",
  "ap_m": "ESCOBAR",
  "fecha_nacimiento": "2025-07-16"
}
```

### Response (GET/PUT)
```json
{
  "success": true,
  "data": {
    "alumno_id": 1,
    "persona_id": 2,
    "dni": "73683521",
    "nombre": "GUSTAVO ADOLFO",
    "ap_p": "TORRES",
    "ap_m": "ESCOBAR",
    "fecha_nacimiento": "2025-07-16T05:00:00.000Z",
    "created_at": "2025-07-28T17:19:43.000Z",
    "updated_at": "2025-08-18T20:05:04.000Z"
  }
}
```

## Archivos Creados/Modificados

### Nuevos Archivos
- `src/view/private/EditarDatosAlumno.tsx` - Página principal de edición
- `src/components/EditarDatosButton.tsx` - Componente reutilizable
- `EDICION_DATOS_ALUMNO.md` - Esta documentación

### Archivos Modificados
- `src/routes/route-config.tsx` - Agregada nueva ruta
- `src/components/app-sidebar.tsx` - Agregada opción en menú
- `src/view/private/ListStudent.tsx` - Agregado botón de edición

## Rutas

- **GET** `/dashboard/editar-datos-alumno` - Página principal de edición
- **GET** `https://nodejsback-production.up.railway.app/api/alumno/mis-datos` - API para obtener datos
- **PUT** `https://nodejsback-production.up.railway.app/api/alumno/mis-datos` - API para actualizar datos

## Seguridad

- ✅ Autenticación requerida (Bearer Token)
- ✅ Validación de campos en frontend
- ✅ Manejo de errores de API
- ✅ Mensajes de feedback seguros

## Próximas Mejoras

- [ ] Validación más robusta en frontend
- [ ] Historial de cambios
- [ ] Notificaciones push
- [ ] Exportación de datos
- [ ] Foto de perfil
- [ ] Información de contacto adicional

## Notas Técnicas

- El componente usa `useAuth` para obtener el token de autenticación
- Las fechas se manejan en formato ISO y se convierten para el input date
- Los mensajes de error se muestran de forma amigable al usuario
- El diseño es completamente responsivo
- Se integra con el sistema de temas existente
