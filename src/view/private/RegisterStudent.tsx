"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";
import axios, { AxiosError } from "axios";

const steps = [
  { id: 1, title: "Estudiante" },
  { id: 2, title: "Apoderado" },
  { id: 3, title: "Información Económica" },
  { id: 4, title: "Documentos" },
  { id: 5, title: "Confirmar" },
];

type Grado = {
  id: number;
  descripcion: string;
  created_at: string;
  updated_at: string;
};

interface FormData {
  // Alumno
  alumno_dni: string;
  alumno_nombre: string;
  alumno_ap_p: string;
  alumno_ap_m: string;
  alumno_fecha_nacimiento: string;
  alumno_email: string;
  id_grado: string;
  tipo_ingreso: string;

  // Apoderado
  apoderado_dni: string;
  apoderado_nombre: string;
  apoderado_ap_p: string;
  apoderado_ap_m: string;
  apoderado_fecha_nacimiento: string;
  apoderado_telefono: string;
  apoderado_relacion: string;

  // Documentos
  dni_entregado: boolean;
  certificado_estudios: boolean;

  // Económico
  matricula_precio: number;
  costo_cuota: number;
  año_academico: string;
  // Cuotas mensuales
  [key: string]: string | number | boolean;
  c1: number;
  c2: number;
  c3: number;
  c4: number;
  c5: number;
  c6: number;
  c7: number;
  c8: number;
  c9: number;
  c10: number;
}

interface ErrorResponse {
  message: string;
}

export default function RegisterStudent() {
  const [step, setStep] = useState(0);
  const [grados, setGrados] = useState<Grado[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    // Alumno
    alumno_dni: "",
    alumno_nombre: "",
    alumno_ap_p: "",
    alumno_ap_m: "",
    alumno_fecha_nacimiento: "",
    alumno_email: "",
    id_grado: "",
    tipo_ingreso: "",

    // Apoderado
    apoderado_dni: "",
    apoderado_nombre: "",
    apoderado_ap_p: "",
    apoderado_ap_m: "",
    apoderado_fecha_nacimiento: "",
    apoderado_telefono: "",
    apoderado_relacion: "",

    // Documentos
    dni_entregado: false,
    certificado_estudios: false,

    // Económico
    matricula_precio: 0,
    costo_cuota: 0,
    año_academico: "",
    // Cuotas mensuales
    c1: 0,
    c2: 0,
    c3: 0,
    c4: 0,
    c5: 0,
    c6: 0,
    c7: 0,
    c8: 0,
    c9: 0,
    c10: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (name: string, value: string | number | boolean) => {
    // Convertir el valor a string para la validación
    const stringValue = value.toString();
    
    switch (name) {
      case 'alumno_dni':
        if (!stringValue) return 'El DNI es obligatorio';
        if (stringValue.length !== 8) return 'El DNI debe tener 8 dígitos';
        return '';
      case 'alumno_nombre':
        if (!stringValue) return 'El nombre es obligatorio';
        return '';
      case 'alumno_ap_p':
        if (!stringValue) return 'El apellido paterno es obligatorio';
        return '';
      case 'alumno_ap_m':
        if (!stringValue) return 'El apellido materno es obligatorio';
        return '';
      case 'alumno_fecha_nacimiento':
        if (!stringValue) return 'La fecha de nacimiento es obligatoria';
        return '';
      case 'id_grado':
        if (!stringValue) return 'Debe seleccionar un grado';
        return '';
      case 'tipo_ingreso':
        if (!stringValue) return 'Debe seleccionar el tipo de ingreso';
        return '';
      case 'apoderado_dni':
        if (!stringValue) return 'El DNI del apoderado es obligatorio';
        if (stringValue.length !== 8) return 'El DNI debe tener 8 dígitos';
        return '';
      case 'apoderado_nombre':
        if (!stringValue) return 'El nombre del apoderado es obligatorio';
        return '';
      case 'apoderado_ap_p':
        if (!stringValue) return 'El apellido paterno del apoderado es obligatorio';
        return '';
      case 'apoderado_ap_m':
        if (!stringValue) return 'El apellido materno del apoderado es obligatorio';
        return '';
      case 'apoderado_telefono':
        if (!stringValue) return 'El teléfono del apoderado es obligatorio';
        if (stringValue.length !== 9) return 'El teléfono debe tener 9 dígitos';
        return '';
      case 'matricula_precio':
        if (!stringValue) return 'El precio de matrícula es obligatorio';
        if (Number(stringValue) <= 0) return 'El precio debe ser mayor a 0';
        return '';
      case 'costo_cuota':
        if (!stringValue) return 'El costo de cuota es obligatorio';
        if (Number(stringValue) <= 0) return 'El costo debe ser mayor a 0';
        return '';
      default:
        return '';
    }
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  // Cargar grados al montar el componente
  useEffect(() => {
    const fetchGrados = async () => {
      try {
        const response = await axios.get(
          "https://nodejsback-production.up.railway.app/api/grado/lista-grado"
        );
        setGrados(response.data.data);
      } catch {
        setMessage({ text: "No se pudieron cargar los grados", isError: true });
      }
    };
    fetchGrados();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : 
                    type === "number" ? Number(value) : value;
    
    setFormData(prev => {
      const newFormData = {
        ...prev,
        [name]: newValue,
      };

      // Si es un checkbox de cuota, actualizar el valor correspondiente
      if (name.startsWith('cuota_')) {
        const mesIndex = {
          'cuota_marzo': 'c1',
          'cuota_abril': 'c2',
          'cuota_mayo': 'c3',
          'cuota_junio': 'c4',
          'cuota_julio': 'c5',
          'cuota_agosto': 'c6',
          'cuota_septiembre': 'c7',
          'cuota_octubre': 'c8',
          'cuota_noviembre': 'c9',
          'cuota_diciembre': 'c10'
        }[name] as keyof FormData;

        if (mesIndex) {
          newFormData[mesIndex] = checked ? Number(prev.costo_cuota) : 0;
        }
      }

      return newFormData;
    });

    // Validar el campo
    const error = validateField(name, newValue);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Función para obtener los costos del año
  const obtenerCostosAnio = async (anio: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://nodejsback-production.up.railway.app/api/cuotas/anio/${anio}`);
      if (response.data.success) {
        setFormData(prev => ({
          ...prev,
          matricula_precio: parseFloat(response.data.data.costo_matricula),
          costo_cuota: parseFloat(response.data.data.costo_cuotas)
        }));
      }
    } catch {
      setMessage({
        text: "Error al cargar los costos del año",
        isError: true
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    // Si se cambia el año académico, obtener los costos
    if (name === 'año_academico') {
      obtenerCostosAnio(value);
    }

    // Validar el campo
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Modificar los campos de input para mostrar errores
  const renderInput = (name: Extract<keyof FormData, string>, label: string, type: string = "text", placeholder: string = "") => (
    <div>
      <Label className="">{label}</Label>
      <Input
        type={type}
        name={name}
        value={String(formData[name])}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={errors[name] ? "border-red-500" : ""}
      />
      {errors[name] && (
        <p className="text-sm text-red-500 mt-1">{errors[name]}</p>
      )}
    </div>
  );

  const renderSelect = (name: Extract<keyof FormData, string>, label: string, options: { value: string; label: string }[]) => (
    <div>
      <Label>{label}</Label>
      <Select
        value={String(formData[name])}
        onValueChange={(value) => handleSelectChange(name, value)}
      >
        <SelectTrigger className={errors[name] ? "border-red-500" : ""}>
          <SelectValue placeholder={`Seleccione ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors[name] && (
        <p className="text-sm text-red-500 mt-1">{errors[name]}</p>
      )}
    </div>
  );

  const verificarAlumno = async () => {
    if (!formData.alumno_dni) {
      setMessage({ text: "Ingrese el DNI del alumno", isError: true });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `https://nodejsback-production.up.railway.app/api/dni/buscar-dni/${formData.alumno_dni}`
      );

      if (response.data.status) {
        // Autocompletar datos del alumno existente
        setFormData((prev) => ({
          ...prev,
          alumno_nombre: response.data.data.nombres,
          alumno_ap_p: response.data.data.apellidoPaterno,
          alumno_ap_m: response.data.data.apellidoMaterno,
        }));

        setMessage({
          text: "Alumno encontrado. Puede editar los datos si lo desea",
          isError: false,
        });
      } else {
        setMessage({
          text: "Alumno no registrado. Complete los datos",
          isError: false,
        });
      }
    } catch {
      setMessage({
        text: "Ocurrió un error al verificar el alumno",
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const verificarApoderado = async () => {
    if (!formData.apoderado_dni) {
      setMessage({ text: "Ingrese el DNI del apoderado", isError: true });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `https://nodejsback-production.up.railway.app/api/dni/buscar-dni/${formData.apoderado_dni}`
      );

      if (response.data.status) {
        // Autocompletar datos del apoderado
        setFormData((prev) => ({
          ...prev,
          apoderado_nombre: response.data.data.nombres,
          apoderado_ap_p: response.data.data.apellidoPaterno,
          apoderado_ap_m: response.data.data.apellidoMaterno,
        }));

        setMessage({
          text: "Apoderado encontrado. Puede editar los datos si lo desea",
          isError: false,
        });
      } else {
        setMessage({
          text: "Apoderado no registrado. Complete los datos",
          isError: false,
        });
      }
    } catch {
      setMessage({
        text: "Ocurrió un error al verificar el apoderado",
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    // Validación básica
    if (
      !formData.alumno_dni ||
      !formData.alumno_nombre ||
      !formData.alumno_ap_p ||
      !formData.alumno_ap_m ||
      !formData.alumno_fecha_nacimiento
    ) {
      setMessage({
        text: "Complete todos los campos obligatorios del alumno",
        isError: true,
      });
      return;
    }

    if (!formData.apoderado_dni) {
      setMessage({ text: "Complete el DNI del apoderado", isError: true });
      return;
    }

    if (!formData.id_grado) {
      setMessage({ text: "Seleccione un grado", isError: true });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://nodejsback-production.up.railway.app/api/das/matricula",
        formData
      );

      setMessage({
        text: "Matrícula registrada correctamente",
        isError: false,
      });

      // Mostrar credenciales generadas
      if (response.data.data) {
        const { username, password } = response.data.data;
        setMessage({
          text: `Matrícula exitosa! Usuario: ${username} | Contraseña: ${password}`,
          isError: false,
        });
      }

      // Reset form
      setFormData({
        alumno_dni: "",
        alumno_nombre: "",
        alumno_ap_p: "",
        alumno_ap_m: "",
        alumno_fecha_nacimiento: "",
        alumno_email: "",
        id_grado: "",
        apoderado_dni: "",
        apoderado_nombre: "",
        apoderado_ap_p: "",
        apoderado_ap_m: "",
        apoderado_fecha_nacimiento: "",
        apoderado_telefono: "",
        apoderado_relacion: "",
        dni_entregado: false,
        certificado_estudios: false,
        matricula_precio: 0,
        costo_cuota: 0,
        año_academico: "",
        c1: 0,
        c2: 0,
        c3: 0,
        c4: 0,
        c5: 0,
        c6: 0,
        c7: 0,
        c8: 0,
        c9: 0,
        c10: 0,
        tipo_ingreso: "",
      });
      setStep(0);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      setMessage({
        text:
          axiosError.response?.data?.message || "Error al registrar la matrícula",
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Stepper Header */}
      <div className="flex justify-between mb-6">
        {steps.map((s, idx) => (
          <div key={s.id} className="flex flex-col items-center flex-1">
            <div
              className={clsx(
                "w-8 h-8 flex items-center justify-center rounded-full border text-sm font-medium",
                step === idx
                  ? "bg-primary text-white"
                  : "border-muted text-muted-foreground"
              )}
            >
              {s.id}
            </div>
            <span
              className={clsx(
                "text-xs mt-1",
                step === idx ? "text-primary" : "text-muted-foreground"
              )}
            >
              {s.title}
            </span>
          </div>
        ))}
      </div>

      {/* Message display */}
      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.isError
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{steps[step].title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 0 && (
            <>
              <div className="flex gap-4">
                <div className="flex-1">
                  {renderInput("alumno_dni", "DNI")}
                </div>
                <Button
                  className="self-end"
                  onClick={verificarAlumno}
                  disabled={loading}
                >
                  {loading ? "Buscando..." : "Buscar"}
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  {renderSelect("tipo_ingreso", "Tipo de Ingreso", [
                    { value: "nuevo", label: "Nuevo Ingresante" },
                    { value: "traslado", label: "Traslado" },
                    { value: "repitente", label: "Repitente" },
                  ])}
                </div>
                <div>
                  {renderInput("alumno_nombre", "Nombre")}
                </div>
                <div>
                  {renderInput("alumno_ap_p", "Apellido Paterno")}
                </div>
                <div>
                  {renderInput("alumno_ap_m", "Apellido Materno")}
                </div>
                <div>
                  {renderInput("alumno_fecha_nacimiento", "Fecha de Nacimiento", "date")}
                </div>
                <div>
                  {renderSelect("id_grado", "Grado", grados.map((g) => ({ value: g.id.toString(), label: g.descripcion })))}
                </div>
                <div>
                  {renderInput("alumno_email", "Email", "email")}
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="flex gap-4">
                <div className="flex-1">
                  {renderInput("apoderado_dni", "DNI")}
                </div>
                <Button
                  className="self-end"
                  onClick={verificarApoderado}
                  disabled={loading}
                >
                  {loading ? "Buscando..." : "Buscar"}
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  {renderInput("apoderado_nombre", "Nombre")}
                </div>
                <div>
                  {renderInput("apoderado_ap_p", "Apellido Paterno")}
                </div>
                <div>
                  {renderInput("apoderado_ap_m", "Apellido Materno")}
                </div>
                <div>
                  {renderInput("apoderado_fecha_nacimiento", "Fecha de Nacimiento", "date")}
                </div>
                <div>
                  {renderSelect("apoderado_relacion", "Relación", [
                    { value: "padre", label: "Padre" },
                    { value: "madre", label: "Madre" },
                    { value: "hermano", label: "Hermano/a" },
                    { value: "tutor", label: "Tutor" },
                  ])}
                </div>
                <div>
                  {renderInput("apoderado_telefono", "Teléfono", "tel")}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  {renderSelect("año_academico", "Año Académico", [
                    { value: new Date().getFullYear().toString(), label: new Date().getFullYear().toString() },
                    { value: (new Date().getFullYear() + 1).toString(), label: (new Date().getFullYear() + 1).toString() },
                  ])}
                </div>
                <div>
                  <div className="relative">
                    {renderInput("matricula_precio", "Precio Matrícula", "number", "0.00")}
                  
                  </div>
                </div>
                <div>
                  <div className="relative">
                    {renderInput("costo_cuota", "Costo Cuota Mensual", "number", "0.00")}
                   
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4">Cuotas del Año</h3>
                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="todas_cuotas"
                      checked={Object.values(formData)
                        .filter((_, index) => 
                          index >= Object.keys(formData).indexOf('c1') && 
                          index <= Object.keys(formData).indexOf('c10')
                        )
                        .every((value) => Number(value) > 0)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setFormData(prev => {
                          const newData = { ...prev };
                          ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'].forEach(
                            key => newData[key as keyof FormData] = checked ? prev.costo_cuota : 0
                          );
                          return newData;
                        });
                      }}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="todas_cuotas" className="text-sm font-medium">
                      Marcar/Desmarcar Todas las Cuotas
                    </Label>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { mes: "Marzo", id: "marzo", cuota: "c1" as keyof FormData },
                    { mes: "Abril", id: "abril", cuota: "c2" as keyof FormData },
                    { mes: "Mayo", id: "mayo", cuota: "c3" as keyof FormData },
                    { mes: "Junio", id: "junio", cuota: "c4" as keyof FormData },
                    { mes: "Julio", id: "julio", cuota: "c5" as keyof FormData },
                    { mes: "Agosto", id: "agosto", cuota: "c6" as keyof FormData },
                    { mes: "Septiembre", id: "septiembre", cuota: "c7" as keyof FormData },
                    { mes: "Octubre", id: "octubre", cuota: "c8" as keyof FormData },
                    { mes: "Noviembre", id: "noviembre", cuota: "c9" as keyof FormData },
                    { mes: "Diciembre", id: "diciembre", cuota: "c10" as keyof FormData }
                  ].map(({ mes, id, cuota }) => {
                    const valorCuota = formData[cuota] as number;
                    return (
                      <div key={id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={id}
                          name={`cuota_${id}`}
                          checked={valorCuota > 0}
                          onChange={handleInputChange}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor={id} className="text-sm">
                          {mes} - S/. {valorCuota.toFixed(2)}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Resumen de Pagos</h3>
                <div className="space-y-1 text-sm">
                  <p>Matrícula: S/. {Number(formData.matricula_precio).toFixed(2)}</p>
                  <p>Cuota Mensual: S/. {Number(formData.costo_cuota).toFixed(2)}</p>
                  <p>Número de Cuotas: {Object.values(formData)
                    .filter((value, index) => 
                      index >= Object.keys(formData).indexOf('c1') && 
                      index <= Object.keys(formData).indexOf('c10') && 
                      Number(value) > 0
                    ).length}</p>
                  <p className="font-medium pt-2">
                    Total a Pagar: S/. {(
                      Number(formData.matricula_precio) + 
                      Object.values(formData)
                        .filter((_, index) => 
                          index >= Object.keys(formData).indexOf('c1') && 
                          index <= Object.keys(formData).indexOf('c10')
                        )
                        .map((value) => Number(value))
                        .reduce((sum, value) => sum + value, 0)
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="dni"
                  name="dni_entregado"
                  checked={formData.dni_entregado}
                  onChange={handleInputChange}
                />
                <Label htmlFor="dni">Entregó copia de DNI</Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="certificado"
                  name="certificado_estudios"
                  checked={formData.certificado_estudios}
                  onChange={handleInputChange}
                />
                <Label htmlFor="certificado">
                  Entregó certificado de estudios
                </Label>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Verifica los datos ingresados:
              </p>
              <div className="bg-muted p-4 rounded text-xs space-y-2">
                <p>
                  <strong>Alumno:</strong> {formData.alumno_nombre}{" "}
                  {formData.alumno_ap_p} {formData.alumno_ap_m} (DNI:{" "}
                  {formData.alumno_dni})
                </p>
                <p>
                  <strong>Apoderado:</strong> {formData.apoderado_nombre}{" "}
                  {formData.apoderado_ap_p} {formData.apoderado_ap_m} (DNI:{" "}
                  {formData.apoderado_dni})
                </p>
                <p>
                  <strong>Grado:</strong>{" "}
                  {
                    grados.find((g) => g.id.toString() === formData.id_grado)
                      ?.descripcion
                  }
                </p>
                <p>
                  <strong>Matrícula:</strong> S/ {formData.matricula_precio.toFixed(2)}
                </p>
                <p>
                  <strong>Cuotas:</strong> 10 de S/ {formData.c1.toFixed(2)} cada una
                </p>
                <p>
                  <strong>Documentos:</strong>{" "}
                  {formData.dni_entregado
                    ? "DNI entregado"
                    : "DNI no entregado"}
                  ,{" "}
                  {formData.certificado_estudios
                    ? "Certificado entregado"
                    : "Certificado no entregado"}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={prevStep} disabled={step === 0}>
          Atrás
        </Button>
        {step < steps.length - 1 ? (
          <Button onClick={nextStep}>Siguiente</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </Button>
        )}
      </div>
    </div>
  );
}
