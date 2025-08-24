import React, { useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface CuotaConfig {
  año: string;
  costoMatricula: number;
  costoCuota: number;
}

interface FormErrors {
  año?: string;
  costoMatricula?: string;
  costoCuota?: string;
}

export default function CuotasProgramar() {
  const [cuotaConfig, setCuotaConfig] = useState<CuotaConfig>({
    año: new Date().getFullYear().toString(),
    costoMatricula: 0,
    costoCuota: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showDialog, setShowDialog] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    title: '',
    description: '',
    isError: false
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const currentYear = new Date().getFullYear();

    if (!cuotaConfig.año || parseInt(cuotaConfig.año) < currentYear) {
      newErrors.año = `El año debe ser ${currentYear} o posterior`;
    }

    if (!cuotaConfig.costoMatricula || cuotaConfig.costoMatricula <= 0) {
      newErrors.costoMatricula = 'El costo de matrícula debe ser mayor a 0';
    }

    if (!cuotaConfig.costoCuota || cuotaConfig.costoCuota <= 0) {
      newErrors.costoCuota = 'El costo de cuota debe ser mayor a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showMessage = (title: string, description: string, isError: boolean = false) => {
    setDialogConfig({
      title,
      description,
      isError
    });
    setShowDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('https://nodejsback-production.up.railway.app/api/cuotas/agregar-periodo', {
        anio: parseInt(cuotaConfig.año),
        costo_matricula: cuotaConfig.costoMatricula,
        costo_cuotas: cuotaConfig.costoCuota
      });

      if (response.status === 200 || response.status === 201) {
        showMessage(
          '¡Éxito!',
          'El período ha sido programado correctamente.',
          false
        );
        setCuotaConfig({
          año: new Date().getFullYear().toString(),
          costoMatricula: 0,
          costoCuota: 0,
        });
      }
    } catch (err) {
      showMessage(
        'Error',
        'Ha ocurrido un error al programar el período. Por favor, intente nuevamente.',
        true
      );
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Programación de Cuotas y Matrícula
          </CardTitle>
          <CardDescription className="text-center">
            Configure los costos para el año académico
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Año Académico */}
              <div className="space-y-2">
                <Label htmlFor="año">Año Académico</Label>
                <Input
                  id="año"
                  type="number"
                  value={cuotaConfig.año}
                  onChange={(e) => setCuotaConfig({ ...cuotaConfig, año: e.target.value })}
                  min={new Date().getFullYear()}
                  className={`w-full ${errors.año ? 'border-red-500' : ''}`}
                />
                {errors.año && (
                  <p className="text-sm text-red-500">{errors.año}</p>
                )}
              </div>

              {/* Costo Matrícula */}
              <div className="space-y-2">
                <Label htmlFor="costoMatricula">Costo de Matrícula</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2">S/.</span>
                  <Input
                    id="costoMatricula"
                    type="number"
                    value={cuotaConfig.costoMatricula}
                    onChange={(e) => setCuotaConfig({ ...cuotaConfig, costoMatricula: parseFloat(e.target.value) })}
                    className={`pl-8 ${errors.costoMatricula ? 'border-red-500' : ''}`}
                    min="0"
                    step="0.01"
                  />
                </div>
                {errors.costoMatricula && (
                  <p className="text-sm text-red-500">{errors.costoMatricula}</p>
                )}
              </div>

              {/* Costo Cuota */}
              <div className="space-y-2">
                <Label htmlFor="costoCuota">Costo por Cuota</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2">S/.</span>
                  <Input
                    id="costoCuota"
                    type="number"
                    value={cuotaConfig.costoCuota}
                    onChange={(e) => setCuotaConfig({ ...cuotaConfig, costoCuota: parseFloat(e.target.value) })}
                    className={`pl-8 ${errors.costoCuota ? 'border-red-500' : ''}`}
                    min="0"
                    step="0.01"
                  />
                </div>
                {errors.costoCuota && (
                  <p className="text-sm text-red-500">{errors.costoCuota}</p>
                )}
              </div>
            </div>

            {/* Resumen */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <h3 className="font-semibold">Resumen de la Configuración</h3>
              <p>Año Académico: {cuotaConfig.año}</p>
              <p>Matrícula: S/. {cuotaConfig.costoMatricula.toFixed(2)}</p>
              <p>Cuota Mensual: S/. {cuotaConfig.costoCuota.toFixed(2)}</p>
              <p>Total a Pagar (12 cuotas): S/. {(cuotaConfig.costoMatricula + (cuotaConfig.costoCuota * 12)).toFixed(2)}</p>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button" disabled={isLoading} className="bg-gray-200 text-gray-700 hover:bg-gray-300 border-gray-300">
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading} className="bg-purple-600 text-white hover:bg-purple-700">
                {isLoading ? 'Guardando...' : 'Guardar Configuración'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className={dialogConfig.isError ? 'bg-red-50' : 'bg-green-50'}>
          <DialogHeader>
            <DialogTitle className={dialogConfig.isError ? 'text-red-600' : 'text-green-600'}>
              {dialogConfig.title}
            </DialogTitle>
            <DialogDescription>
              {dialogConfig.description}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
