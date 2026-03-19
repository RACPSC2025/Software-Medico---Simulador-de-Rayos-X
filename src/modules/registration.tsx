import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  UserPlus, 
  HelpCircle, 
  Settings, 
  ChevronRight, 
  ChevronLeft, 
  Search, 
  Bell, 
  LogOut, 
  FileText, 
  Share2, 
  Printer, 
  Download, 
  Mail, 
  MessageSquare, 
  HardDrive, 
  Table, 
  AlertTriangle, 
  Info, 
  Play, 
  Stethoscope, 
  Activity, 
  History, 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  CheckCircle2,
  ZoomIn, 
  ZoomOut,
  Move,
  RefreshCw,
  Contrast, 
  Ruler, 
  School,
  IdCard,
  Calendar,
  Contact,
  ShieldCheck,
  Shield,
  Maximize2,
  Image as ImageIcon,
  Crop,
  RotateCcw,
  RotateCw,
  Sun,
  FlipHorizontal,
  FlipVertical,
  Sliders,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen, Patient } from "../types";
import { Button, Input } from "../components/ui";

const PatientRegistration = ({ onProceed, userEmail }: { onProceed: (patient: Patient) => void, userEmail: string }) => {
  const [patient, setPatient] = useState<Patient>({
    id: '',
    name: '',
    age: '',
    sex: 'Masculino',
    technician: userEmail
  });

  const [touched, setTouched] = useState<Partial<Record<keyof Patient, boolean>>>({});

  const validate = () => {
    const errors: Partial<Record<keyof Patient, string>> = {};
    if (!patient.id.trim()) errors.id = 'El ID del paciente es requerido';
    else if (patient.id.length < 4) errors.id = 'El ID debe tener al menos 4 caracteres';
    
    if (!patient.name.trim()) errors.name = 'El nombre es requerido';
    else if (patient.name.length < 3) errors.name = 'El nombre debe tener al menos 3 caracteres';
    
    if (!patient.age) errors.age = 'La edad es requerida';
    else if (isNaN(Number(patient.age)) || Number(patient.age) <= 0 || Number(patient.age) > 120) errors.age = 'Ingrese una edad válida (1-120)';
    
    return errors;
  };

  const errors = validate();
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (field: keyof Patient, value: string) => {
    setPatient({ ...patient, [field]: value });
    setTouched({ ...touched, [field]: true });
  };

  const handleBlur = (field: keyof Patient) => {
    setTouched({ ...touched, [field]: true });
  };

  return (
    <form 
      className="h-full flex flex-col p-2 md:p-4 max-w-lg mx-auto overflow-hidden bg-transparent"
      onSubmit={(e) => {
        e.preventDefault();
        if (isValid) {
          onProceed(patient);
        } else {
          setTouched({
            id: true,
            name: true,
            age: true
          });
        }
      }}
    >
      <div className="bg-white dark:bg-[#161920] p-4 md:p-5 rounded-2xl border border-slate-200 dark:border-border-dark/40 medical-shadow space-y-4 backdrop-blur-md transition-all duration-300">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black text-text-title dark:text-primary uppercase tracking-[0.1em] flex items-center gap-2">
            <FileText size={14} /> Ficha Médica
          </h4>
          <div className="px-2 py-0.5 rounded-full bg-primary/5 border border-primary/20 text-[9px] font-bold text-primary dark:text-primary/60 uppercase tracking-tighter">
            ID: {patient.id || '---'}
          </div>
        </div>
        
        <div className="space-y-3">
          <Input 
            label="ID del Paciente" 
            icon={IdCard} 
            placeholder="1-2345-6789" 
            value={patient.id}
            onChange={(e: any) => handleChange('id', e.target.value)}
            onBlur={() => handleBlur('id')}
            error={touched.id ? errors.id : undefined}
          />
          <Input 
            label="Nombre Completo" 
            icon={User} 
            placeholder="Juan Pérez" 
            value={patient.name}
            onChange={(e: any) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            error={touched.name ? errors.name : undefined}
          />
          <Input 
            label="Edad" 
            icon={Calendar} 
            placeholder="Años" 
            type="number" 
            value={patient.age}
            onChange={(e: any) => handleChange('age', e.target.value)}
            onBlur={() => handleBlur('age')}
            error={touched.age ? errors.age : undefined}
          />
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-text-secondary dark:text-slate-500 uppercase tracking-widest ml-1">Sexo</label>
            <div className="flex gap-2">
              {['Masculino', 'Femenino'].map(s => (
                <button 
                  key={s} 
                  type="button"
                  onClick={() => handleChange('sex', s)}
                  className={`flex-1 py-2 text-center rounded-xl border transition-all text-[11px] font-bold ${patient.sex === s ? 'border-primary bg-primary/5 text-primary shadow-sm dark:shadow-[0_0_15px_rgba(var(--medical-accent-rgb),0.2)]' : 'border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-[#0a0a0b] text-text-secondary dark:text-slate-500 hover:border-primary/50'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Aviso de Seguridad Premium Medical */}
        <div className="bg-[#FEF9C3] dark:bg-amber-900/10 border border-[#FDE68A] dark:border-amber-900/30 p-2.5 rounded-xl flex gap-3 items-center mt-1 transition-all">
          <AlertTriangle className="text-[#F59E0B] dark:text-[#FFF01F] shrink-0" size={16} />
          <p className="text-[10px] text-[#78350F] dark:text-amber-200/80 leading-tight font-semibold">
            <span className="font-black uppercase mr-1.5 tracking-tighter">Protocolo:</span>
            Verificar estado de embarazo en pacientes fértiles antes de la exposición.
          </p>
        </div>

        <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-border-dark/60">
          <Button 
            variant="outline" 
            type="button"
            className="px-4 py-2 text-[10px] font-bold"
            onClick={() => {
              setPatient({ id: '', name: '', age: '', sex: 'Masculino', technician: userEmail });
              setTouched({});
            }}
          >
            Limpiar
          </Button>
          <Button 
            icon={Play} 
            type="submit"
            className="px-6 py-2 text-xs"
            disabled={!isValid}
          >
            Iniciar Examen
          </Button>
        </div>
      </div>
    </form>
  );
};

export { PatientRegistration };
