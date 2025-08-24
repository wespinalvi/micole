import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      console.log("Enviando datos:", form);

      const response = await axios.post(
        "https://nodejsback-production.up.railway.app/api/auth/login",
        form,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Respuesta del servidor:", response.data);

      const token = response.data.token;

      let roleId;
      if (response.data.roleId !== undefined) {
        roleId = response.data.roleId;
      } else if (response.data.role !== undefined) {
        roleId = response.data.role;
      } else if (
        response.data.user &&
        response.data.user.roleId !== undefined
      ) {
        roleId = response.data.user.roleId;
      }

      console.log("Token obtenido:", token ? "Sí" : "No");
      console.log("RoleId obtenido:", roleId);

      login(token, roleId);
      if (roleId === 1) {
        navigate("/dashboard");
      } else if (roleId === 2) {
        navigate("/teacher");
      } else {
        navigate("/"); // o una página de error/no autorizado
      }
    } catch (error: unknown) {
      console.error("Error completo:", error);

      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { status: number; data: { message?: string; change_password_required?: boolean; token?: string; roleId?: number } } };
        const { status, data } = axiosError.response;

        console.log("Respuesta de error:", data);

        // ✅ Redirige si se requiere cambio de contraseña
        if (status === 403 && data.change_password_required) {
          if (data.token) {
            login(data.token, data.roleId || null); // Guarda token si lo trae
          }
          return navigate("/change-password");
        }

        setError(data.message || "Error al iniciar sesión");
      } else if (error && typeof error === 'object' && 'request' in error) {
        console.log("Solicitud enviada pero sin respuesta");
        setError("Error de conexión con el servidor - No hay respuesta");
      } else {
        console.log("Error de configuración:", error instanceof Error ? error.message : String(error));
        setError(`Error de conexión: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Iniciar Sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-red-600 text-center font-semibold">
                {error}
              </div>
            )}
            <div>
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                placeholder="tu_usuario"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Ingresar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
