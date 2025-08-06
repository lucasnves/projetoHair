export interface Company {
  id: number;
  owner_id: string;
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  logo: string;
  description: string;
  address: string;
  zip_code: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CompanyUserPivot {
  company_id: number;
  user_id: number;
}

export interface CompanyTeam {
  id: number;
  name: string;
  email: string;
  company_id: number;
  specialty?: string;
  pivot: CompanyUserPivot;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  company_id: number;
  user_id: number;
  employee_id: number | undefined;
  service_id: number | undefined;
  status_id: number;
  appointment_time: string;
  notes: string | undefined;
}

export interface LoadAppointment {
  id: number;
  company: string;
  user: string;
  employee: string;
  service: string;
  status: string;
  status_id: number;
  appointment_time: string;
  price: string;
  notes: string;
}

export interface Service {
  id: number;
  company_id: number;
  name: string;
  price: string;
  duration: number;
  description: string;
}
