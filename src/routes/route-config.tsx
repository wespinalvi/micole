import { createBrowserRouter } from "react-router-dom";

// Componentes públicos
import HomePage from "@/view/public/Home";
import Login from "@/view/public/Login";
import ChangePassword from "@/view/public/ChangePassword";

// Componentes del dashboard
// Este es el nuevo componente que creamos
import Page from "@/view/dashboard";
import ListStudent from "@/view/private/ListStudent";
import ListTeacher from "@/view/private/ListTeacher";
import RegsiterStudent from "@/view/private/RegisterStudent";
import RegisterTeacher from "@/view/private/RegisterTeacher";
import ProtectedRoute from "./ProtectedRoute";

import TeacherDashboard from "@/view/private/teacher/teacherDashboard";
import RegistrarAsistencia from "@/view/private/teacher/RegistrarAsistencia";
import CuotasProgramar from "@/view/private/teacher/CuotasProgramar";
import HistorialAsistencia from "@/view/private/teacher/HistorialAsistencia";
import VisionMision from "@/view/public/VisionMision";
import Body from "@/view/public/body";
import CuotasDetalle from "@/view/private/CuotasDetalle";

import JustificacionesDocente from "@/view/private/teacher/JustificacionesDocente";

// Componente para protección de rutas

const router = createBrowserRouter([
  // Ruta pública con hijos
  {
    path: "/",
    element: <HomePage />,
    children: [
      { path: "login", element: <Login /> },
      { path: "vision-mision", element: <VisionMision /> },
      { path: "change-password", element: <ChangePassword /> },
      { path: "/", element: <Body /> },
    ],
  },

  // Ruta protegida del dashboard (la protección aplica a todas las hijas)
  {
    path: "/dashboard/",
    element: (
      <ProtectedRoute allowedRoles={[1, 2]}>
        <Page /> {/* Este es tu layout del dashboard */}
      </ProtectedRoute>
    ),
    children: [
      // { index: true, element: <ListStudent /> }, // Página por defecto del dashboard
      { path: "register-student", element: <RegsiterStudent /> },
      { path: "list-student", element: <ListStudent /> },
      { path: "register-teacher", element: <RegisterTeacher /> },
      { path: "list-teacher", element: <ListTeacher /> },
      { path: "programar-cuotas", element: <CuotasProgramar /> },
      { path: "cuotas-detalle", element: <CuotasDetalle /> },

    ],
  },
  {
    path: "/teacher/",
    element: (
      <ProtectedRoute allowedRoles={[2]}>
        <TeacherDashboard />
      </ProtectedRoute>
    ),
    children: [
      // { index: true, element: <ListStudent /> }, // Página por defecto del dashboard
      { path: "registar-asistencia", element: <RegistrarAsistencia /> },
      { path: "ver-asistencia", element: <HistorialAsistencia /> },
      { path: "justificaciones", element: <JustificacionesDocente /> },
    ],
    // children: [{ path: "list-teacher", element: <ListTeacher /> }],
  },
]);

export default router;
