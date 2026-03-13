export // Types
export type Screen = 
  | 'login' 
  | 'register' 
  | 'recovery' 
  | 'patient-registration' 
  | 'professional-directory' 
  | 'export-share' 
  | 'educational-workspace' 
  | 'xray-simulator';

export interface Patient {
  id: string;
  name: string;
  age: string;
  sex: 'Masculino' | 'Femenino';
  technician: string;
}