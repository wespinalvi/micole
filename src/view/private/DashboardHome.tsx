import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  fetchDebtors,
  fetchSummaryStats,
  fetchRecentPayments,
  type RecentPayment,
  type Debtor,
  type DashboardSummaryData
} from "@/services/dashboardService";
import { SimpleLineChart } from "@/components/charts/SimpleLineChart";
import { SimplePieChart } from "@/components/charts/SimplePieChart";
import {
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const MONTH_NAMES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export default function DashboardHome() {
  const [summaryData, setSummaryData] = useState<DashboardSummaryData | null>(null);
  const [recentPayments, setRecentPayments] = useState<RecentPayment[]>([]);
  const [debtors, setDebtors] = useState<Debtor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      const [summary, paymentsData, debtorsData] = await Promise.all([
        fetchSummaryStats(),
        fetchRecentPayments(),
        fetchDebtors()
      ]);

      if (summary) {
        setSummaryData(summary);
      }

      setRecentPayments(paymentsData);
      setDebtors(debtorsData);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number | string) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numAmount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-PE').format(num);
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-6">
          <div className="h-16 w-16 border-4 border-blue-50 border-t-blue-600 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <TrendingUp size={16} className="text-blue-600" />
          </div>
        </div>
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Sincronizando Datastore</p>
        <p className="text-xs text-slate-400 font-medium mt-2">Accediendo a registros financieros y académicos...</p>
      </div>
    );
  }

  if (!summaryData) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mb-4 border border-rose-100">
          <TrendingDown size={24} />
        </div>
        <p className="text-sm font-bold text-slate-900">Error de Conexión</p>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold opacity-50">No se pudieron cargar los datos del sistema</p>
      </div>
    );
  }

  const { kpis, distribucion_sexo, tendencia_ingresos, comparativa_pagos } = summaryData;

  const paymentStatusData = [
    { label: "Pagado", value: comparativa_pagos.pagado, color: "#2563eb" },
    { label: "Pendiente", value: comparativa_pagos.pendiente, color: "#94a3b8" }
  ];

  const monthlyTrendData = tendencia_ingresos.map(item => ({
    label: MONTH_NAMES[item.mes - 1] || item.mes.toString(),
    value: parseFloat(item.total)
  }));

  const ingresosActuales = parseFloat(kpis.ingresos_mensuales);
  const ingresosAnteriores = parseFloat(kpis.ingresos_mes_anterior);
  const crecimiento = ingresosAnteriores > 0
    ? ((ingresosActuales - ingresosAnteriores) / ingresosAnteriores) * 100
    : 0;

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen overflow-x-hidden">
      {/* Topbar Compact */}
      <div className="h-14 border-b border-slate-200 flex items-center justify-between px-6 bg-white sticky top-0 z-20">
        <div>
          <h1 className="text-sm font-semibold text-slate-900">
            Panel de Control General
          </h1>
          <div className="flex items-center gap-2 mt-0.5">
            <TrendingUp size={12} className="text-blue-500" />
            <span className="text-[11px] text-slate-500 font-medium tracking-tight">Estrategia y Métricas Globales</span>
            <span className="w-1 h-1 rounded-full bg-slate-200 mx-0.5" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Sincronizado: {new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-md border border-emerald-100">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-tight">Servidor Online</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 space-y-6 max-w-full">
        {/* Main KPI Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Ingresos Mensuales"
            value={formatCurrency(kpis.ingresos_mensuales)}
            trend={`${crecimiento >= 0 ? '+' : ''}${crecimiento.toFixed(1)}%`}
            trendUp={crecimiento >= 0}
            color="bg-blue-600"
          />
          <MetricCard
            label="Estudiantes Activos"
            value={formatNumber(kpis.estudiantes_activos)}
            subtitle="Población Educativa"
            color="bg-indigo-600"
          />
          <MetricCard
            label="Morosidad Total"
            value={formatCurrency(kpis.pagos_pendientes)}
            subtitle={`${kpis.estudiantes_con_deuda} deudores`}
            color="bg-rose-500"
          />
          <MetricCard
            label="Tasa de Recaudación"
            value={`${kpis.tasa_recaudacion}%`}
            trend={kpis.tasa_recaudacion >= kpis.meta_mensual ? 'Meta Lograda' : 'En Progreso'}
            trendUp={kpis.tasa_recaudacion >= kpis.meta_mensual}
            color="bg-emerald-600"
          />
        </div>

        {/* Charts & Analytical Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border border-slate-200 rounded-xl shadow-none bg-white overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tendencia de Ingresos</span>
              <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">Mensual Anual</span>
            </div>
            <CardContent className="p-6">
              <div className="h-[260px]">
                {monthlyTrendData.length > 0 ? (
                  <SimpleLineChart
                    data={monthlyTrendData}
                    height={260}
                    color="#2563eb"
                    showDots={true}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center opacity-20">
                    <TrendingUp size={48} className="text-slate-300" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 rounded-xl shadow-none bg-white overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/30">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Distribución de Cobros</span>
            </div>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <SimplePieChart data={paymentStatusData} size={160} showLegend={false} />
                <div className="w-full mt-6 space-y-2">
                  {paymentStatusData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-slate-50/50">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[11px] font-medium text-slate-600">{item.label}</span>
                      </div>
                      <span className="text-[11px] font-bold text-slate-900">{formatCurrency(item.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Detailed Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border border-slate-200 rounded-xl shadow-none bg-white overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/30">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Población por Sexo</span>
            </div>
            <CardContent className="p-6 flex items-center justify-around h-full min-h-[140px]">
              {distribucion_sexo.map((item, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-3xl font-black text-slate-900 leading-tight">
                    {formatNumber(item.cantidad)}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{item.sexo === 'M' ? 'Varones' : 'Mujeres'}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border border-slate-200 rounded-xl shadow-none bg-white overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pagos Recientes</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <CardContent className="p-2">
              <div className="max-h-[180px] overflow-y-auto space-y-1 p-2">
                {recentPayments.length > 0 ? recentPayments.slice(0, 5).map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-slate-800 uppercase truncate leading-tight">{p.studentName}</p>
                      <p className="text-[9px] text-slate-400 font-medium uppercase mt-0.5">{p.type}</p>
                    </div>
                    <span className="text-[11px] font-bold text-slate-900 tabular-nums ml-2">{formatCurrency(p.amount)}</span>
                  </div>
                )) : (
                  <div className="py-10 text-center text-slate-300 text-[10px] uppercase font-bold">Sin movimientos</div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 rounded-xl shadow-none bg-white overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-rose-600">Alerta de Deuda</span>
              <TrendingDown size={14} className="text-rose-400" />
            </div>
            <CardContent className="p-2">
              <div className="max-h-[180px] overflow-y-auto space-y-1 p-2">
                {debtors.length > 0 ? debtors.slice(0, 5).map((d) => (
                  <div key={d.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-rose-50/50 transition-colors">
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-slate-800 uppercase truncate leading-tight">{d.studentName}</p>
                      <p className="text-[9px] text-rose-500 font-bold uppercase mt-0.5">{d.months} {d.months === 1 ? 'Periodo' : 'Periodos'}</p>
                    </div>
                    <span className="text-[11px] font-black text-rose-600 tabular-nums ml-2">{formatCurrency(d.amount)}</span>
                  </div>
                )) : (
                  <div className="py-10 text-center text-slate-300 text-[10px] uppercase font-bold">Cartera Saneada</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer info compact */}
        <div className="flex justify-between items-center text-[9px] font-bold text-slate-300 uppercase tracking-widest pt-4 opacity-70">
          <p>Admin Core v4.5 · Security Ledger</p>
          <p>© 2026 Academic Intel · Cloud Sinc</p>
        </div>
      </div>
    </div>
  );
}

// Compact Metric Card aligned with Report Style
function MetricCard({ label, value, trend, trendUp, subtitle, color = "bg-blue-600" }: any) {
  return (
    <Card className="border border-slate-200 rounded-xl shadow-none bg-white overflow-hidden hover:border-slate-300 transition-all group">
      <CardContent className="p-5 flex flex-col gap-2 relative">
        <div className={`absolute top-0 right-0 w-1 h-full ${color} opacity-20`} />

        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {label}
        </p>

        <h2 className="text-2xl font-black text-slate-900 tracking-tighter tabular-nums leading-none">
          {value}
        </h2>

        {trend && (
          <div className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase ${trendUp ? 'text-emerald-600' : 'text-rose-500'}`}>
            {trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend}
          </div>
        )}

        {subtitle && !trend && (
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-tight">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}
