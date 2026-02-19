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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
          <p className="text-sm text-gray-500">Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (!summaryData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">No se pudieron cargar los datos</p>
      </div>
    );
  }

  const { kpis, distribucion_sexo, tendencia_ingresos, comparativa_pagos } = summaryData;

  // Prepare chart data
  const paymentStatusData = [
    { label: "Pagado", value: comparativa_pagos.pagado, color: "#10b981" },
    { label: "Pendiente", value: comparativa_pagos.pendiente, color: "#f59e0b" }
  ];

  const monthlyTrendData = tendencia_ingresos.map(item => ({
    label: MONTH_NAMES[item.mes - 1] || item.mes.toString(),
    value: parseFloat(item.total)
  }));

  // Calculate growth percentage
  const ingresosActuales = parseFloat(kpis.ingresos_mensuales);
  const ingresosAnteriores = parseFloat(kpis.ingresos_mes_anterior);
  const crecimiento = ingresosAnteriores > 0
    ? ((ingresosActuales - ingresosAnteriores) / ingresosAnteriores) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            {new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Main KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Ingresos del Mes"
            value={formatCurrency(kpis.ingresos_mensuales)}
            trend={`${crecimiento >= 0 ? '+' : ''}${crecimiento.toFixed(1)}%`}
            trendUp={crecimiento >= 0}
          />

          <MetricCard
            label="Estudiantes Activos"
            value={formatNumber(kpis.estudiantes_activos)}
            subtitle="matriculados"
          />

          <MetricCard
            label="Pagos Pendientes"
            value={formatCurrency(kpis.pagos_pendientes)}
            subtitle={`${kpis.estudiantes_con_deuda} con deuda`}
          />

          <MetricCard
            label="Tasa de Recaudación"
            value={`${kpis.tasa_recaudacion}%`}
            subtitle={`Meta: ${kpis.meta_mensual}%`}
            trend={kpis.tasa_recaudacion >= kpis.meta_mensual ? 'Cumplida' : 'Pendiente'}
            trendUp={kpis.tasa_recaudacion >= kpis.meta_mensual}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Revenue Trend */}
          <Card className="lg:col-span-2 border shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Tendencia de Ingresos</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Evolución mensual</p>
                </div>
                <span className="text-xs text-gray-500">2026</span>
              </div>
              <div className="h-[220px]">
                {monthlyTrendData.length > 0 ? (
                  <SimpleLineChart
                    data={monthlyTrendData}
                    height={220}
                    color="#3b82f6"
                    showDots={true}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    <p className="text-sm">No hay datos disponibles</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payment Distribution */}
          <Card className="border shadow-sm">
            <CardContent className="p-5">
              <div className="mb-4">
                <h3 className="text-base font-semibold text-gray-900">Distribución de Pagos</h3>
                <p className="text-xs text-gray-500 mt-0.5">Estado actual</p>
              </div>
              <div className="flex flex-col items-center">
                <SimplePieChart data={paymentStatusData} size={140} showLegend={false} />
                <div className="w-full mt-4 space-y-2">
                  {paymentStatusData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-gray-700">{item.label}</span>
                      </div>
                      <span className="font-semibold text-gray-900">{formatCurrency(item.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Gender Distribution */}
          <Card className="border shadow-sm">
            <CardContent className="p-5">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Distribución por Sexo</h3>
              <div className="flex justify-around">
                {distribucion_sexo.map((item, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{item.cantidad}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {item.sexo === 'M' ? 'Varones' : 'Mujeres'}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Payments */}
          <Card className="border shadow-sm">
            <CardContent className="p-5">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Pagos Recientes</h3>
              <div className="space-y-2.5">
                {recentPayments.length > 0 ? (
                  recentPayments.slice(0, 4).map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between text-sm border-b border-gray-100 pb-2 last:border-0">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{payment.studentName}</p>
                        <p className="text-xs text-gray-500">
                          {payment.type === 'matricula' ? 'Matrícula' : 'Cuota'}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 ml-2">{formatCurrency(payment.amount)}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400 py-4 text-sm">No hay pagos recientes</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Top Debtors */}
          <Card className="border shadow-sm">
            <CardContent className="p-5">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Deudores</h3>
              <div className="space-y-2.5">
                {debtors.length > 0 ? (
                  debtors.slice(0, 4).map((debtor) => (
                    <div key={debtor.id} className="flex items-center justify-between text-sm border-b border-gray-100 pb-2 last:border-0">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{debtor.studentName}</p>
                        <p className="text-xs text-gray-500">
                          {debtor.months} {debtor.months === 1 ? 'mes' : 'meses'}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-red-600 ml-2">{formatCurrency(debtor.amount)}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400 py-4 text-sm">No hay deudores</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Simple Metric Card Component
function MetricCard({
  label,
  value,
  trend,
  trendUp,
  subtitle
}: {
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  subtitle?: string;
}) {
  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <p className="text-xs font-medium text-gray-600 mb-2">{label}</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{value}</h2>
        {trend && (
          <div className="flex items-center gap-1">
            {trendUp ? (
              <TrendingUp className="h-3.5 w-3.5 text-green-600" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 text-red-600" />
            )}
            <span className={`text-xs font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {trend}
            </span>
          </div>
        )}
        {subtitle && !trend && (
          <p className="text-xs text-gray-500">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}
