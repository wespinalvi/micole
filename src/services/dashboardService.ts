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

export interface Debtor {
  id: number;
  studentName: string;
  amount: number;
  months: number; // number of months owed
  lastPaymentDate: string;
}

export const fetchDebtors = async (): Promise<Debtor[]> => {
  await new Promise(resolve => setTimeout(resolve, 900));

  return [
    { id: 1, studentName: "Juan Pérez", amount: 300, months: 2, lastPaymentDate: "2024-08-15" },
    { id: 2, studentName: "Ana Gómez", amount: 150, months: 1, lastPaymentDate: "2024-09-20" },
    { id: 3, studentName: "Carlos Ruiz", amount: 450, months: 3, lastPaymentDate: "2024-07-10" },
    { id: 4, studentName: "Lucía Díaz", amount: 150, months: 1, lastPaymentDate: "2024-09-05" },
    { id: 5, studentName: "Pedro Morales", amount: 300, months: 2, lastPaymentDate: "2024-08-25" },
  ];
};

export interface DebtorReportItem {
  id: number;
  dni: string;
  studentName: string;
  grade: string;
  section: string;
  amountOwed: number;
  monthsOwed: number;
  status: 'Deuda' | 'Al día';
  lastPaymentDate: string;
  year: string;
}

export const fetchDebtorsReport = async (gradeFilter?: string, statusFilter?: string, yearFilter?: string): Promise<DebtorReportItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));

  const allStudents: DebtorReportItem[] = [
    { id: 1, dni: "70123456", studentName: "Juan Pérez", grade: "1° Primaria", section: "A", amountOwed: 300, monthsOwed: 2, status: "Deuda", lastPaymentDate: "2024-08-15", year: "2024" },
    { id: 2, dni: "70123457", studentName: "Ana Gómez", grade: "2° Primaria", section: "B", amountOwed: 150, monthsOwed: 1, status: "Deuda", lastPaymentDate: "2024-09-20", year: "2024" },
    { id: 3, dni: "70123458", studentName: "Carlos Ruiz", grade: "5° Secundaria", section: "A", amountOwed: 450, monthsOwed: 3, status: "Deuda", lastPaymentDate: "2024-07-10", year: "2024" },
    { id: 4, dni: "70123459", studentName: "Lucía Díaz", grade: "3° Primaria", section: "C", amountOwed: 150, monthsOwed: 1, status: "Deuda", lastPaymentDate: "2024-09-05", year: "2024" },
    { id: 5, dni: "70123460", studentName: "Pedro Morales", grade: "1° Secundaria", section: "A", amountOwed: 300, monthsOwed: 2, status: "Deuda", lastPaymentDate: "2024-08-25", year: "2024" },
    { id: 6, dni: "70123461", studentName: "Maria Fernandez", grade: "1° Primaria", section: "A", amountOwed: 0, monthsOwed: 0, status: "Al día", lastPaymentDate: "2024-10-05", year: "2024" },
    { id: 7, dni: "70123462", studentName: "Jorge Soto", grade: "2° Primaria", section: "B", amountOwed: 0, monthsOwed: 0, status: "Al día", lastPaymentDate: "2024-10-02", year: "2024" },
    { id: 8, dni: "70123463", studentName: "Elena Quispe", grade: "5° Secundaria", section: "A", amountOwed: 150, monthsOwed: 1, status: "Deuda", lastPaymentDate: "2024-09-15", year: "2024" },
    { id: 9, dni: "70123464", studentName: "Miguel Angel", grade: "4° Primaria", section: "B", amountOwed: 600, monthsOwed: 4, status: "Deuda", lastPaymentDate: "2024-06-20", year: "2024" },
    { id: 10, dni: "70123465", studentName: "Sofia Vergara", grade: "1° Secundaria", section: "A", amountOwed: 0, monthsOwed: 0, status: "Al día", lastPaymentDate: "2024-10-10", year: "2024" },
    // Datos de ejemplo para 2023
    { id: 11, dni: "70123456", studentName: "Juan Pérez", grade: "Inicial 5 años", section: "A", amountOwed: 0, monthsOwed: 0, status: "Al día", lastPaymentDate: "2023-12-15", year: "2023" },
  ];

  return allStudents.filter(student => {
    if (gradeFilter && gradeFilter !== "Todos" && student.grade !== gradeFilter) return false;
    if (statusFilter && statusFilter !== "Todos" && student.status !== statusFilter) return false;
    if (yearFilter && student.year !== yearFilter) return false;
    return true;
  });
};

export interface DailyPayment {
  id: number;
  studentName: string;
  dni: string;
  concept: string; // "Mensualidad Marzo", "Matrícula", etc.
  amount: number;
  time: string;
  method: 'Efectivo' | 'Transferencia' | 'Yape/Plin';
  receiptNumber: string;
}

export const fetchDailyPayments = async (): Promise<DailyPayment[]> => {
  await new Promise(resolve => setTimeout(resolve, 600));

  // Mock data for "Today"
  return [
    { id: 101, studentName: "Juan Pérez", dni: "70123456", concept: "Mensualidad Marzo", amount: 150, time: "08:30 AM", method: "Efectivo", receiptNumber: "REC-001234" },
    { id: 102, studentName: "Maria Fernandez", dni: "70123461", concept: "Matrícula", amount: 200, time: "09:15 AM", method: "Yape/Plin", receiptNumber: "REC-001235" },
    { id: 103, studentName: "Carlos Ruiz", dni: "70123458", concept: "Mensualidad Marzo", amount: 150, time: "10:45 AM", method: "Efectivo", receiptNumber: "REC-001236" },
    { id: 104, studentName: "Ana Gómez", dni: "70123457", concept: "Mensualidad Abril", amount: 150, time: "11:20 AM", method: "Transferencia", receiptNumber: "REC-001237" },
  ];
};

export const fetchGradesList = async (): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return ["1° Primaria", "2° Primaria", "3° Primaria", "4° Primaria", "5° Primaria", "6° Primaria", "1° Secundaria", "2° Secundaria", "3° Secundaria", "4° Secundaria", "5° Secundaria"];
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

