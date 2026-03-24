// Types
export type Screen =
  | 'login'
  | 'register'
  | 'recovery'
  | 'home'
  | 'patient-registration'
  | 'professional-directory'
  | 'export-share'
  | 'educational-workspace'
  | 'xray-simulator'
  | 'biblioteca';

export interface Patient {
  id: string;
  name: string;
  age: string;
  sex: 'Masculino' | 'Femenino';
  technician: string;
}