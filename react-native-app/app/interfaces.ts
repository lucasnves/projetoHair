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
  id: number;
  user_id: number;
  company_id: number;
  hairdresser_id: number;
  hairdresser: string;
  appointment_time: string;
  price: string;
  status: number;
  appointment_label: string;
  created_at: string;
  updated_at: string;
}
