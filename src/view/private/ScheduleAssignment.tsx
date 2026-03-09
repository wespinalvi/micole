import { useEffect, useMemo, useState } from "react";
import api from "@/lib/axios";
import { CalendarClock, Plus, Save, Trash2 } from "lucide-react";

type PeriodoItem = { id: number; anio: number; activo: number };
type DocenteItem = { id: number; codigo_docente: string; nombre_completo: string };
type AsignacionDocente = {
  id_asignacion: number;
  id_curso: number;
  curso: string;
  id_grado: number;
  grado: string;
  id_seccion: number | null;
  seccion: string | null;
};

type Bloque = {
  dia_semana: string;
  hora_inicio: string;
  hora_fin: string;
  aula: string;
};

const DIAS = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

const emptyBloque = (): Bloque => ({
  dia_semana: "Lunes",
  hora_inicio: "08:00",
  hora_fin: "08:45",
  aula: "",
});

export default function ScheduleAssignment() {
  const [periodos, setPeriodos] = useState<PeriodoItem[]>([]);
  const [docentes, setDocentes] = useState<DocenteItem[]>([]);
  const [asignacionesDocente, setAsignacionesDocente] = useState<AsignacionDocente[]>([]);

  const [idPeriodo, setIdPeriodo] = useState<string>("");
  const [idDocente, setIdDocente] = useState<string>("");
  const [idGrado, setIdGrado] = useState<string>("");
  const [idCurso, setIdCurso] = useState<string>("");
  const [bloques, setBloques] = useState<Bloque[]>([emptyBloque()]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  useEffect(() => {
    const loadCatalogs = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/horario/catalogos");
        if (!data?.success) {
          setMessage({ text: "No se pudieron cargar catálogos.", isError: true });
          return;
        }

        const payload = data.data || {};
        const periodosData: PeriodoItem[] = payload.periodos || [];
        setPeriodos(periodosData);
        setDocentes(payload.docentes || []);

        const periodoActivo = periodosData.find((p) => p.activo === 1);
        if (periodoActivo) {
          setIdPeriodo(String(periodoActivo.id));
        } else if (periodosData.length > 0) {
          setIdPeriodo(String(periodosData[0].id));
        }
      } catch (error) {
        setMessage({ text: "Error cargando catálogos de horarios.", isError: true });
      } finally {
        setLoading(false);
      }
    };

    loadCatalogs();
  }, []);

  useEffect(() => {
    const loadAsignacionesDocente = async () => {
      if (!idDocente || !idPeriodo) {
        setAsignacionesDocente([]);
        return;
      }

      setLoading(true);
      setMessage(null);
      try {
        const { data } = await api.get(`/horario/docente/${idDocente}/asignaciones`, {
          params: { id_periodo: idPeriodo },
        });

        if (data?.success) {
          setAsignacionesDocente(data.data || []);
        } else {
          setAsignacionesDocente([]);
        }
      } catch (error: any) {
        setAsignacionesDocente([]);
        setMessage({ text: error?.response?.data?.message || "Error al cargar asignaciones del docente.", isError: true });
      } finally {
        setLoading(false);
      }

      setIdGrado("");
      setIdCurso("");
    };

    loadAsignacionesDocente();
  }, [idDocente, idPeriodo]);

  const gradosDisponibles = useMemo(() => {
    const map = new Map<number, string>();
    for (const a of asignacionesDocente) {
      if (!map.has(a.id_grado)) {
        map.set(a.id_grado, a.grado);
      }
    }
    return Array.from(map.entries()).map(([id, nombre]) => ({ id, nombre }));
  }, [asignacionesDocente]);

  const cursosDisponibles = useMemo(() => {
    const filtered = idGrado
      ? asignacionesDocente.filter((a) => String(a.id_grado) === idGrado)
      : asignacionesDocente;

    const map = new Map<number, string>();
    for (const a of filtered) {
      if (!map.has(a.id_curso)) {
        map.set(a.id_curso, a.curso);
      }
    }
    return Array.from(map.entries()).map(([id, nombre]) => ({ id, nombre }));
  }, [asignacionesDocente, idGrado]);

  const asignacionesCoincidentes = useMemo(() => {
    if (!idGrado || !idCurso) return [];
    return asignacionesDocente.filter(
      (a) => String(a.id_grado) === idGrado && String(a.id_curso) === idCurso
    );
  }, [asignacionesDocente, idGrado, idCurso]);

  const asignacionSeleccionada = useMemo(() => {
    if (asignacionesCoincidentes.length === 0) return null;
    return asignacionesCoincidentes.find((a) => a.id_seccion === null) || asignacionesCoincidentes[0];
  }, [asignacionesCoincidentes]);

  const isFormValid = useMemo(() => {
    return Boolean(idPeriodo && idDocente && idGrado && idCurso && asignacionSeleccionada && bloques.length > 0);
  }, [idPeriodo, idDocente, idGrado, idCurso, asignacionSeleccionada, bloques.length]);

  const updateBloque = (index: number, key: keyof Bloque, value: string) => {
    setBloques((prev) => prev.map((b, i) => (i === index ? { ...b, [key]: value } : b)));
  };

  const addBloque = () => setBloques((prev) => [...prev, emptyBloque()]);

  const removeBloque = (index: number) => {
    setBloques((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGuardar = async () => {
    if (!isFormValid || !asignacionSeleccionada) {
      setMessage({ text: "Selecciona docente, período, grado y curso válidos.", isError: true });
      return;
    }

    if (bloques.some((b) => !b.hora_inicio || !b.hora_fin || b.hora_inicio >= b.hora_fin)) {
      setMessage({ text: "Cada bloque debe tener hora inicio menor a hora fin.", isError: true });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const payloadHorario = {
        id_asignacion: asignacionSeleccionada.id_asignacion,
        bloques: bloques.map((b) => ({
          dia_semana: b.dia_semana,
          hora_inicio: `${b.hora_inicio}:00`,
          hora_fin: `${b.hora_fin}:00`,
          aula: b.aula || null,
        })),
      };

      const { data: horarioRes } = await api.post("/horario", payloadHorario);

      if (horarioRes?.success) {
        setMessage({ text: "Horario guardado correctamente.", isError: false });
      } else {
        setMessage({ text: horarioRes?.message || "No se pudo guardar horario.", isError: true });
      }
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Error al guardar horario.";
      setMessage({ text: msg, isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-4">
      <div className="flex items-center gap-2">
        <CalendarClock className="w-5 h-5 text-blue-700" />
        <h1 className="text-xl font-semibold text-slate-900">Asignar Horario de Clases</h1>
      </div>

      {message && (
        <div
          className={`rounded border px-4 py-2 text-sm ${message.isError ? "bg-rose-50 border-rose-200 text-rose-700" : "bg-emerald-50 border-emerald-200 text-emerald-700"
            }`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white border rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-medium text-slate-600">Docente <span className="text-red-500">*</span></label>
          <select className="w-full h-10 border rounded px-3 text-sm mt-1" value={idDocente} onChange={(e) => setIdDocente(e.target.value)}>
            <option value="">Seleccionar</option>
            {docentes.map((item) => (
              <option key={item.id} value={item.id}>{item.nombre_completo}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-600">Período <span className="text-red-500">*</span></label>
          <select className="w-full h-10 border rounded px-3 text-sm mt-1" value={idPeriodo} onChange={(e) => setIdPeriodo(e.target.value)}>
            <option value="">Seleccionar</option>
            {periodos.map((item) => (
              <option key={item.id} value={item.id}>{item.anio}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-600">Grado <span className="text-red-500">*</span></label>
          <select
            className="w-full h-10 border rounded px-3 text-sm mt-1"
            value={idGrado}
            onChange={(e) => {
              setIdGrado(e.target.value);
              setIdCurso("");
            }}
            disabled={!idDocente}
          >
            <option value="">Seleccionar</option>
            {gradosDisponibles.map((item) => (
              <option key={item.id} value={item.id}>{item.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-600">Curso <span className="text-red-500">*</span></label>
          <select
            className="w-full h-10 border rounded px-3 text-sm mt-1"
            value={idCurso}
            onChange={(e) => setIdCurso(e.target.value)}
            disabled={!idGrado}
          >
            <option value="">Seleccionar</option>
            {cursosDisponibles.map((item) => (
              <option key={item.id} value={item.id}>{item.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-4">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">Horario Semanal</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border rounded">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left px-3 py-2">Día <span className="text-red-500 text-xs">*</span></th>
                <th className="text-left px-3 py-2">Hora de Inicio <span className="text-red-500 text-xs">*</span></th>
                <th className="text-left px-3 py-2">Hora de Fin <span className="text-red-500 text-xs">*</span></th>
                <th className="text-left px-3 py-2">Aula <span className="text-slate-400 font-normal text-xs ml-1">(Opcional)</span></th>
                <th className="px-3 py-2 text-right">Acción</th>
              </tr>
            </thead>
            <tbody>
              {bloques.map((b, i) => (
                <tr key={`${b.dia_semana}-${i}`} className="border-t">
                  <td className="px-3 py-2">
                    <select
                      className="w-full h-9 border rounded px-2"
                      value={b.dia_semana}
                      onChange={(e) => updateBloque(i, "dia_semana", e.target.value)}
                    >
                      {DIAS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="time"
                      className="w-full h-9 border rounded px-2"
                      value={b.hora_inicio}
                      onChange={(e) => updateBloque(i, "hora_inicio", e.target.value)}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="time"
                      className="w-full h-9 border rounded px-2"
                      value={b.hora_fin}
                      onChange={(e) => updateBloque(i, "hora_fin", e.target.value)}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      className="w-full h-9 border rounded px-2"
                      placeholder="Aula 203"
                      value={b.aula}
                      onChange={(e) => updateBloque(i, "aula", e.target.value)}
                    />
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button
                      type="button"
                      onClick={() => removeBloque(i)}
                      disabled={bloques.length === 1}
                      className="inline-flex items-center gap-1 text-rose-600 text-xs font-semibold disabled:text-slate-300"
                    >
                      <Trash2 className="w-4 h-4" /> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={addBloque}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 border border-blue-200 bg-blue-50 px-3 py-2 rounded"
          >
            <Plus className="w-4 h-4" /> Agregar Horario
          </button>

          <button
            type="button"
            disabled={!isFormValid || loading}
            onClick={handleGuardar}
            className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded font-semibold disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {loading ? "Guardando..." : "Guardar Horario"}
          </button>
        </div>
      </div>
    </div>
  );
}
