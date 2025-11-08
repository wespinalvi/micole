// Dashboard API service functions
// Replace these mock functions with actual API calls

export interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  totalTeachers: number;
  totalRevenue: number;
  pendingPayments: number;
  studentsWithDebt: number;
  paidStudents: number;
  currentMonthRevenue: number;
  averagePaymentAmount: number;
  paymentCompletionRate: number;
  monthlyTarget: number;
  overduePayments: number;
}

export interface RecentPayment {
  id: number;
  studentName: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
  type: 'matricula' | 'cuota';
}

export interface MonthlyData {
  month: string;
  revenue: number;
  students: number;
}

// Mock API functions - replace with actual API calls
export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    totalStudents: 245,
    activeStudents: 238,
    totalTeachers: 18,
    totalRevenue: 125400,
    pendingPayments: 15600,
    studentsWithDebt: 32,
    paidStudents: 213,
    currentMonthRevenue: 28750,
    averagePaymentAmount: 450,
    paymentCompletionRate: 87,
    monthlyTarget: 50000,
    overduePayments: 8
  };
};

export const fetchRecentPayments = async (): Promise<RecentPayment[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    { id: 1, studentName: "María García", amount: 450, date: "2024-10-28", status: "paid", type: "cuota" },
    { id: 2, studentName: "Carlos López", amount: 800, date: "2024-10-27", status: "paid", type: "matricula" },
    { id: 3, studentName: "Ana Rodríguez", amount: 450, date: "2024-10-26", status: "pending", type: "cuota" },
    { id: 4, studentName: "Luis Martínez", amount: 450, date: "2024-10-25", status: "overdue", type: "cuota" },
    { id: 5, studentName: "Sofia Hernández", amount: 450, date: "2024-10-24", status: "paid", type: "cuota" },
  ];
};

export const fetchMonthlyData = async (): Promise<MonthlyData[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return [
    { month: "Jun", revenue: 45200, students: 220 },
    { month: "Jul", revenue: 48100, students: 225 },
    { month: "Ago", revenue: 52300, students: 235 },
    { month: "Sep", revenue: 49800, students: 240 },
    { month: "Oct", revenue: 28750, students: 245 },
  ];
};

// Real API functions (commented out - implement when backend is ready)
/*
export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const response = await fetch('/api/dashboard/stats');
  if (!response.ok) throw new Error('Failed to fetch dashboard stats');
  return response.json();
};

export const fetchRecentPayments = async (): Promise<RecentPayment[]> => {
  const response = await fetch('/api/dashboard/recent-payments');
  if (!response.ok) throw new Error('Failed to fetch recent payments');
  return response.json();
};

export const fetchMonthlyData = async (): Promise<MonthlyData[]> => {
  const response = await fetch('/api/dashboard/monthly-data');
  if (!response.ok) throw new Error('Failed to fetch monthly data');
  return response.json();
};
*/
