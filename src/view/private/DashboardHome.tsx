import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  fetchDashboardStats,
  fetchRecentPayments,
  fetchMonthlyData,
  type DashboardStats,
  type RecentPayment,
  type MonthlyData
} from "@/services/dashboardService";
import { SimpleBarChart } from "@/components/charts/SimpleBarChart";
import { SimpleLineChart } from "@/components/charts/SimpleLineChart";
import { SimplePieChart } from "@/components/charts/SimplePieChart";
import {
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  CreditCard,
  Target
} from "lucide-react";


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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch data using service functions
      const [statsData, paymentsData, monthlyDataResult] = await Promise.all([
        fetchDashboardStats(),
        fetchRecentPayments(),
        fetchMonthlyData()
      ]);

      setStats(statsData);
      setRecentPayments(paymentsData);
      setMonthlyData(monthlyDataResult);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(amount);
  };


  const targetProgress = (stats.currentMonthRevenue / stats.monthlyTarget) * 100;

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Cargando dashboard...</div>
        </div>
      </div>
    );
  }

  // Prepare chart data
  const paymentStatusData = [
    { label: "Pagados", value: stats.paidStudents, color: "#10b981" },
    { label: "Con Deuda", value: stats.studentsWithDebt, color: "#ef4444" },
    { label: "Pendientes", value: stats.totalStudents - stats.paidStudents - stats.studentsWithDebt, color: "#f59e0b" }
  ];

  const monthlyRevenueData = monthlyData.map(item => ({
    label: item.month,
    value: item.revenue / 1000, // Convert to thousands for better display
    color: "#8b5cf6"
  }));

  const monthlyTrendData = monthlyData.map(item => ({
    label: item.month,
    value: item.revenue
  }));

  return (
    <div className="container mx-auto p-4 space-y-4">
      {/* Compact Header */}
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold">Dashboard Administrativo</h1>
        <p className="text-sm text-muted-foreground">
          Resumen de estudiantes, pagos y métricas institucionales
        </p>
      </div>

      {/* Compact Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-500" />
            <div>
              <div className="text-lg font-bold">{stats.totalStudents}</div>
              <div className="text-xs text-muted-foreground">Estudiantes</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-500" />
            <div>
              <div className="text-lg font-bold">{formatCurrency(stats.currentMonthRevenue / 1000)}K</div>
              <div className="text-xs text-muted-foreground">Este mes</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <div>
              <div className="text-lg font-bold text-red-600">{stats.studentsWithDebt}</div>
              <div className="text-xs text-muted-foreground">Con deuda</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <div>
              <div className="text-lg font-bold text-green-600">{stats.paymentCompletionRate}%</div>
              <div className="text-xs text-muted-foreground">Pagos</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Trend Chart */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-purple-500" />
            <h3 className="font-semibold text-sm">Tendencia de Ingresos</h3>
          </div>
          <SimpleLineChart data={monthlyTrendData} height={60} />
          <div className="mt-2 text-xs text-muted-foreground">
            Últimos 5 meses (miles de soles)
          </div>
        </Card>

        {/* Payment Status Pie Chart */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <h3 className="font-semibold text-sm">Estado de Pagos</h3>
          </div>
          <SimplePieChart data={paymentStatusData} size={100} showLegend={false} />
          <div className="mt-2 space-y-1">
            {paymentStatusData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.label}</span>
                </div>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Monthly Revenue Bar Chart */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="h-4 w-4 text-green-500" />
            <h3 className="font-semibold text-sm">Ingresos Mensuales</h3>
          </div>
          <SimpleBarChart data={monthlyRevenueData} height={80} showValues={false} />
          <div className="mt-2 text-xs text-muted-foreground">
            En miles de soles
          </div>
        </Card>
      </div>

      {/* Compact Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Payments */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="h-4 w-4 text-blue-500" />
            <h3 className="font-semibold text-sm">Pagos Recientes</h3>
          </div>
          <div className="space-y-2">
            {recentPayments.slice(0, 4).map((payment) => (
              <div key={payment.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{payment.studentName}</p>
                  <p className="text-xs text-muted-foreground">
                    {payment.type === 'matricula' ? 'Matrícula' : 'Cuota'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{formatCurrency(payment.amount)}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    payment.status === 'paid' ? 'bg-green-500' : 
                    payment.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Key Metrics */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-4 w-4 text-purple-500" />
            <h3 className="font-semibold text-sm">Métricas Clave</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Meta Mensual</span>
              <span className="text-sm font-medium">{targetProgress.toFixed(1)}%</span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-purple-600 transition-all duration-300 ease-in-out"
                style={{ width: `${Math.min(100, Math.max(0, targetProgress))}%` }}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-lg font-bold text-blue-600">{stats.totalTeachers}</div>
                <div className="text-xs text-muted-foreground">Docentes</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-lg font-bold text-orange-600">{formatCurrency(stats.pendingPayments / 1000)}K</div>
                <div className="text-xs text-muted-foreground">Pendiente</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            <div>
              <div className="text-lg font-bold text-blue-700">7</div>
              <div className="text-xs text-blue-600">Nuevos</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <div>
              <div className="text-lg font-bold text-green-700">12</div>
              <div className="text-xs text-green-600">Pagos hoy</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <div>
              <div className="text-lg font-bold text-orange-700">{stats.overduePayments}</div>
              <div className="text-xs text-orange-600">Alertas</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-purple-600" />
            <div>
              <div className="text-lg font-bold text-purple-700">+12%</div>
              <div className="text-xs text-purple-600">Crecimiento</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
