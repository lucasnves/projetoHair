export interface Company {
  id: number;
  name: string;
  observation: string;
  location: string;
  email: string;
  phone_number: string;
  perfil_photo: string;
  created_at: string;
  updated_at: string;
}

export interface Hairdresser {
  id: number;
  name: string;
  email: string;
  user_type: number;
  company_id: number;
  specialty: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: number;
  user_id: number;
  company_id: number;
  hairdresser_id: number;
  appointment_time: string;
  price: string;
  status: number;
  created_at: string;
  updated_at: string;
}
