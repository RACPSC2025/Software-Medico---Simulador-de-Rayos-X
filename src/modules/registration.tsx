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
      className="h-full flex flex-col p-4 md:p-6 max-w-lg mx-auto overflow-y-auto"
      onSubmit={(e) => {
        e.preventDefault();
        if (isValid) {
          onProceed(patient);
        } else {
          // Si intentan enviar y no es válido, marcamos todo como "tocado" para mostrar errores
          setTouched({
            id: true,
            name: true,
            age: true
          });
        }
      }}
    >
      <div className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-2">
          <FileText size={16} /> Datos de Paciente
        </h4>
        
        <div className="space-y-4">
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
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sexo</label>
            <div className="flex gap-3">
              {['Masculino', 'Femenino'].map(s => (
                <button 
                  key={s} 
                  type="button"
                  onClick={() => handleChange('sex', s)}
                  className={`flex-1 py-2.5 text-center rounded-xl border transition-all text-xs font-bold ${patient.sex === s ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-primary'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800/60">
          <Button 
            variant="outline" 
            type="button"
            className="px-5 py-2.5 text-xs"
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
            className="px-7 py-2.5 text-sm shadow-md"
            disabled={!isValid}
          >
            Iniciar Examen
          </Button>
        </div>
      </div>

      <div className="mt-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/50 p-2 rounded-xl flex gap-3">
        <AlertTriangle className="text-amber-600 shrink-0" size={16} />
        <div>
          <p className="text-[9px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">Seguridad Radiológica</p>
          <p className="text-[9px] text-amber-700 dark:text-amber-500/80 leading-tight">Confirmar estado de embarazo para todas las pacientes en edad reproductiva antes de proceder.</p>
        </div>
      </div>
    </form>
  );
};

export { PatientRegistration };
