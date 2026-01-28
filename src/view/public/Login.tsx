import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { User, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        form,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const token = response.data.token;
      let roleId = response.data.roleId || response.data.role || (response.data.user && response.data.user.roleId);

      login(token, roleId);
      if (roleId === 1) {
        navigate("/dashboard");
      } else if (roleId === 2) {
        navigate("/teacher");
      } else {
        navigate("/");
      }
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { status: number; data: { message?: string; change_password_required?: boolean; token?: string; roleId?: number } } };
        const { status, data } = axiosError.response;

        if (status === 403 && data.change_password_required) {
          if (data.token) {
            login(data.token, data.roleId || null);
          }
          return navigate("/change-password");
        }
        setError(data.message || "Credenciales incorrectas");
      } else {
        setError("Error de conexión con el servidor");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Shapes - increased opacity for better visibility */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-[#1e2a5a]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#F26513]/10 rounded-full blur-3xl"></div>

      <Card className="w-full max-w-md border border-gray-100 shadow-[0_20px_60px_-15px_rgba(30,42,90,0.2)] overflow-hidden bg-white z-10 scale-100 transition-transform duration-500">
        {/* Top Accent bar - School Colors Gradient */}
        <div className="h-2 w-full bg-gradient-to-r from-[#1e2a5a] via-[#F26513] to-[#1e2a5a]"></div>

        <CardContent className="p-8 md:p-10">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-6">
              <div className="absolute -inset-4 bg-gray-50 rounded-full scale-110"></div>
              <img
                src="https://res.cloudinary.com/dszdc6rh8/image/upload/v1747351782/image_1_vhjpzr.png"
                alt="Logo Colegio Crayon's"
                className="h-20 w-auto relative z-10 drop-shadow-md"
              />
            </div>
            <h2 className="text-3xl font-bold text-[#1e2a5a] text-center mb-2">MiCole</h2>
            <div className="h-1 w-12 bg-[#F26513] rounded-full mb-4"></div>
            <p className="text-gray-500 text-center text-sm font-medium">Plataforma de Gestión Educativa</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md text-sm animate-in fade-in duration-300">
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 font-bold ml-1">Usuario</Label>
              <div className="relative group">
                <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r border-gray-100">
                  <User className="w-4 h-4 text-gray-400 group-focus-within:text-[#1e2a5a] transition-colors" />
                </div>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Ingresa tu usuario"
                  className="pl-14 h-14 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#1e2a5a]/10 focus:border-[#1e2a5a] transition-all rounded-xl text-base"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" className="text-gray-700 font-bold">Contraseña</Label>
                <a href="#" className="text-xs text-[#F26513] hover:underline font-bold">¿Olvidaste tu contraseña?</a>
              </div>
              <div className="relative group">
                <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r border-gray-100">
                  <Lock className="w-4 h-4 text-gray-400 group-focus-within:text-[#1e2a5a] transition-colors" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="pl-14 h-14 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#1e2a5a]/10 focus:border-[#1e2a5a] transition-all rounded-xl text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#1e2a5a] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-[#1e2a5a] hover:bg-[#151c3d] text-white font-bold rounded-xl shadow-xl shadow-[#1e2a5a]/20 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 text-lg"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </form>
        </CardContent>


      </Card>
    </div>
  );
}
