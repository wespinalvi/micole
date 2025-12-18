import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  fetchDashboardStats,
  fetchRecentPayments,
  fetchMonthlyData,
  fetchDebtors,
  type DashboardStats,
  type RecentPayment,
  type MonthlyData,
  type Debtor
} from "@/services/dashboardService";
import { SimpleLineChart } from "@/components/charts/SimpleLineChart";
import { SimplePieChart } from "@/components/charts/SimplePieChart";
import {
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DashboardHome() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    activeStudents: 0,
    totalTeachers: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    studentsWithDebt: 0,
    paidStudents: 0,
    currentMonthRevenue: 0,
    averagePaymentAmount: 0,
    paymentCompletionRate: 0,
    monthlyTarget: 50000,
    overduePayments: 0,
  });

  const [recentPayments, setRecentPayments] = useState<RecentPayment[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [debtors, setDebtors] = useState<Debtor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      const [statsData, paymentsData, monthlyDataResult, debtorsData] = await Promise.all([
        fetchDashboardStats(),
        fetchRecentPayments(),
        fetchMonthlyData(),
        fetchDebtors()
      ]);

      setStats(statsData);
      setRecentPayments(paymentsData);
      setMonthlyData(monthlyDataResult);
      setDebtors(debtorsData);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-PE').format(num);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-gray-300 border-t-blue-600"></div>
          <p className="text-sm text-gray-500">Cargando datos...</p>
        </div>
      </div>
    );
  }

  // Prepare chart data
  const paymentStatusData = [
    { label: "Al día", value: stats.paidStudents, color: "#10b981" },
    { label: "Con Deuda", value: stats.studentsWithDebt, color: "#ef4444" },
    { label: "Pendientes", value: stats.totalStudents - stats.paidStudents - stats.studentsWithDebt, color: "#f59e0b" }
  ];

  const monthlyTrendData = monthlyData.map(item => ({
    label: item.month,
    value: item.revenue
  }));

  // Calculate sparkline data for each metric (last 6 months)
  const revenueSparkline = monthlyData.slice(-6).map(item => ({
    label: '',
    value: item.revenue
  }));

  const studentsSparkline = monthlyData.slice(-6).map((_, i) => ({
    label: '',
    value: stats.activeStudents - (5 - i) * 2 // Simulated growth
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Panel de Control</h1>
            <p className="text-sm text-gray-500 mt-1">
              {new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Ingresos Totales"
            value={formatCurrency(stats.currentMonthRevenue)}
            trend="+8.1%"
            trendUp={true}
            badge="Este mes"
            sparklineData={revenueSparkline}
            sparklineColor="#10b981"
          />

          <MetricCard
            label="Tasa de Recaudación"
            value={`${stats.paymentCompletionRate}%`}
            trend="+2.5%"
            trendUp={true}
            badge="vs mes anterior"
            sparklineData={revenueSparkline}
            sparklineColor="#3b82f6"
          />

          <MetricCard
            label="Estudiantes Activos"
            value={formatNumber(stats.activeStudents)}
            trend="+2%"
            trendUp={true}
            badge="Total"
            sparklineData={studentsSparkline}
            sparklineColor="#f59e0b"
          />

          <MetricCard
            label="Pagos Pendientes"
            value={formatCurrency(stats.pendingPayments)}
            trend="-3.4%"
            trendUp={false}
            badge="Por cobrar"
            sparklineData={revenueSparkline}
            sparklineColor="#06b6d4"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SimpleMetricCard
            label="Tasa de Morosidad"
            value="4.8%"
            trend="-1%"
            trendUp={false}
            source="Deudores"
          />

          <SimpleMetricCard
            label="Estudiantes con Deuda"
            value={formatNumber(stats.studentsWithDebt)}
            trend="+2.1%"
            trendUp={true}
            source="Estudiantes"
          />

          <SimpleMetricCard
            label="Promedio de Pago"
            value={formatCurrency(stats.averagePaymentAmount)}
            trend="+1.8%"
            trendUp={true}
            source="Cuotas"
          />

          <SimpleMetricCard
            label="Meta Mensual"
            value={`${((stats.currentMonthRevenue / stats.monthlyTarget) * 100).toFixed(0)}%`}
            trend="+5.2%"
            trendUp={true}
            source="Objetivo"
          />
        </div>

        {/* Charts and Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Trend */}
          <Card className="lg:col-span-2 border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Tendencia de Ingresos</h3>
                  <p className="text-sm text-gray-500 mt-1">Últimos 6 meses</p>
                </div>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-0">
                  2024
                </Badge>
              </div>
              <div className="h-[240px]">
                <SimpleLineChart
                  data={monthlyTrendData}
                  height={240}
                  color="#3b82f6"
                  showDots={true}
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Distribution */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900">Distribución de Pagos</h3>
                <p className="text-sm text-gray-500 mt-1">Estado actual</p>
              </div>
              <div className="flex flex-col items-center">
                <SimplePieChart data={paymentStatusData} size={180} showLegend={false} />
                <div className="w-full mt-6 space-y-3">
                  {paymentStatusData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-gray-600">{item.label}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Payments & Debtors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Payments */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-base font-semibold text-gray-900">Pagos Recientes</h3>
                <p className="text-sm text-gray-500 mt-1">Últimas transacciones</p>
              </div>
              <div className="space-y-3">
                {recentPayments.slice(0, 5).map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{payment.studentName}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {payment.type === 'matricula' ? 'Matrícula' : 'Cuota'} • {new Date(payment.date).toLocaleDateString('es-PE')}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-gray-900">{formatCurrency(payment.amount)}</span>
                      <div className={`w-2 h-2 rounded-full ${payment.status === 'paid' ? 'bg-green-500' : 'bg-yellow-500'
                        }`} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Debtors */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-base font-semibold text-gray-900">Alertas de Morosidad</h3>
                <p className="text-sm text-gray-500 mt-1">Deudas pendientes</p>
              </div>
              <div className="space-y-3">
                {debtors.slice(0, 5).map((debtor) => (
                  <div key={debtor.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{debtor.studentName}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {debtor.months} {debtor.months === 1 ? 'mes' : 'meses'} de atraso
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-red-600">{formatCurrency(debtor.amount)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Metric Card with Sparkline
function MetricCard({
  label,
  value,
  trend,
  trendUp,
  badge,
  sparklineData,
  sparklineColor
}: {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  badge: string;
  sparklineData: Array<{ label: string; value: number }>;
  sparklineColor: string;
}) {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
          <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-[10px] border-0 px-2 py-0.5">
            {badge}
          </Badge>
        </div>

        <div className="mb-3">
          <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
        </div>

        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-1 text-xs font-medium ${trendUp ? 'text-green-600' : 'text-red-600'
            }`}>
            {trendUp ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{trend}</span>
          </div>

          <div className="w-20 h-8">
            <SimpleLineChart
              data={sparklineData}
              height={32}
              color={sparklineColor}
              showDots={false}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Simple Metric Card (no sparkline)
function SimpleMetricCard({
  label,
  value,
  trend,
  trendUp,
  source
}: {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  source: string;
}) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
        </div>

        <div className="mb-2">
          <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
        </div>

        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-1 text-xs font-medium ${trendUp ? 'text-green-600' : 'text-red-600'
            }`}>
            {trendUp ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{trend}</span>
          </div>
          <span className="text-xs text-gray-500">{source}</span>
        </div>
      </CardContent>
    </Card>
  );
}
