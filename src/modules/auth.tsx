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
  Moon,
  FlipHorizontal,
  FlipVertical,
  Sliders,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen } from "../types";
import { Button, Input } from "../components/ui";

const LoginScreen = ({ onNavigate, onLogin, isDarkMode, onToggleTheme }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const loginEmail = email.trim() || "Invitado";
    localStorage.setItem('userEmail', loginEmail);
    onLogin(loginEmail);
    onNavigate('patient-registration');
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <header className="flex items-center justify-between px-6 py-2 lg:px-20 border-b border-slate-200 dark:border-border-dark bg-white/50 dark:bg-card-dark/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="size-7 bg-primary rounded-lg flex items-center justify-center text-slate-950 shadow-[0_0_10px_rgba(0,209,255,0.3)]">
            <Activity size={18} />
          </div>
          <h2 className="text-lg font-black tracking-tighter dark:text-white uppercase">Radiología Pro</h2>
        </div>
        <div className="flex gap-2 items-center">
          <button 
            onClick={onToggleTheme}
            className="p-2 text-slate-400 hover:text-primary transition-colors duration-300"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Button variant="ghost" className="size-8 p-0 text-slate-400 hover:text-primary"><HelpCircle size={18} /></Button>
          <Button variant="ghost" className="size-8 p-0 text-slate-400 hover:text-primary"><Settings size={18} /></Button>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-[880px] grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-[#1C1F26] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-border-dark/60 transition-all duration-300">
          <div className="hidden lg:block relative min-h-[440px] bg-slate-900 overflow-hidden">
            <div 
              className="absolute inset-0 opacity-60 bg-cover bg-center"
              style={{ backgroundImage: "url('https://ca-times.brightspotcdn.com/dims4/default/85905f6/2147483647/strip/true/crop/6269x4179+0+0/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fa0%2Fa6%2Fc4b19b044384a5fd2e0ec5dff1c0%2Fla-photos-1staff-770958-he-covid-vaccine-mammograms-jlc-0511-11300.JPG')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-xl font-bold text-white mb-1">Visualización de Precisión</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Software avanzado de diagnóstico por imagen diseñado para profesionales de la salud.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center p-4 lg:p-8">
            <div className="mb-4">
              <h1 className="text-xl font-black tracking-tight mb-0.5 text-slate-800 dark:text-white uppercase">Acceso al Sistema</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Ingrese sus credenciales médicas</p>
            </div>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <Input 
                label="Usuario o Correo Electrónico" 
                icon={User} 
                placeholder="ejemplo@clinica.com" 
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] ml-1">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-11 pr-11 py-2.5 bg-slate-50 dark:bg-[#121418] border border-slate-200 dark:border-border-dark focus:border-primary rounded-xl outline-none transition-all duration-300 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-700 shadow-inner"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                  <span className="text-[10px] text-slate-600 dark:text-slate-400">Recordarme</span>
                </label>
                <button type="button" onClick={() => onNavigate('recovery')} className="text-[10px] font-bold text-primary hover:underline uppercase tracking-tighter">¿Olvidó su contraseña?</button>
              </div>
              <Button className="w-full py-2.5" icon={LogIn}>Iniciar Sesión</Button>
            </form>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-[10px] text-slate-500">
                ¿No tiene acceso? <button onClick={() => onNavigate('register')} className="text-primary font-black hover:underline uppercase">Regístrese aquí</button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const RegisterScreen = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => (
  <div className="min-h-screen flex flex-col transition-colors duration-300">
    <header className="flex items-center justify-between px-6 py-2 lg:px-20 border-b border-slate-200 dark:border-border-dark bg-white/50 dark:bg-card-dark/50 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-slate-950 shadow-[0_0_10px_rgba(0,209,255,0.3)]">
          <Stethoscope size={18} />
        </div>
        <h2 className="text-lg font-black tracking-tighter dark:text-white uppercase">Portal Médico</h2>
      </div>
      <Button variant="ghost" className="size-8 p-0 text-slate-400 hover:text-primary"><HelpCircle size={18} /></Button>
    </header>
    <main className="flex-1 flex items-center justify-center p-2">
      <div className="w-full max-w-[450px] bg-white dark:bg-[#1C1F26] p-4 rounded-xl shadow-xl border border-slate-200 dark:border-border-dark transition-all duration-300">
        <div className="mb-2">
          <h1 className="text-xl font-black tracking-tight mb-0.5 text-slate-800 dark:text-white uppercase">Registro Profesional</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Cree su cuenta profesional segura.</p>
        </div>
        <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); onNavigate('login'); }}>
          <div className="grid grid-cols-2 gap-2">
            <Input label="Nombre" placeholder="Ej. Juan" />
            <Input label="Apellidos" placeholder="Ej. Pérez" />
          </div>
          <Input label="Correo electrónico" type="email" placeholder="juan.perez@hospital.es" />
          <Input label="Contraseña" type="password" placeholder="Mínimo 8 caracteres" />
          <Input label="Confirmar" type="password" placeholder="Repita contraseña" />
          <div className="flex items-start gap-2 py-0.5">
            <input type="checkbox" id="terms" className="mt-0.5 rounded border-slate-300 text-primary focus:ring-primary" />
            <label htmlFor="terms" className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
              Acepto los <span className="text-primary hover:underline cursor-pointer font-bold">Términos</span> y la <span className="text-primary hover:underline cursor-pointer font-bold">Privacidad</span> médica.
            </label>
          </div>
          <div className="flex flex-col gap-2 mt-1">
            <Button className="w-full py-2.5" icon={UserPlus}>Registrarse</Button>
            <Button variant="secondary" className="w-full py-2.5" onClick={() => onNavigate('login')}>Volver al Inicio</Button>
          </div>
        </form>
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-4 opacity-60 grayscale">
          <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-400"><Shield size={10} /> SSL</div>
          <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-400"><ShieldCheck size={10} /> HIPAA</div>
          <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-400"><Lock size={10} /> Secure</div>
        </div>
      </div>
    </main>
  </div>
);

const RecoveryScreen = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => (
  <div className="min-h-screen flex flex-col transition-colors duration-300">
    <header className="flex items-center justify-between px-6 py-2 lg:px-20 border-b border-slate-200 dark:border-border-dark bg-white/50 dark:bg-card-dark/50 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <Activity className="text-primary" size={20} />
        <h2 className="text-lg font-black tracking-tighter dark:text-white uppercase">RadiologySoft</h2>
      </div>
      <Button variant="ghost" className="size-8 p-0 text-slate-400 hover:text-primary"><Settings size={18} /></Button>
    </header>
    <main className="flex-1 flex justify-center py-8 px-6">
      <div className="w-full max-w-[450px] flex flex-col gap-4">
        <div className="py-2">
          <h1 className="text-2xl font-black mb-1 text-slate-800 dark:text-white uppercase tracking-tighter">Recuperar Contraseña</h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            Introduce tu correo institucional para recibir las instrucciones de recuperación.
          </p>
        </div>
        <Input label="Correo Electrónico Institucional" icon={Mail} placeholder="usuario@hospital.com" />
        <Button className="py-3" onClick={() => onNavigate('login')}>Enviar Instrucciones</Button>
        <button onClick={() => onNavigate('login')} className="flex items-center justify-center gap-2 text-primary text-sm font-black hover:underline uppercase">
          <ChevronLeft size={16} /> Volver al Inicio
        </button>
        <div className="mt-auto pt-10 border-t border-slate-100 dark:border-slate-800 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-slate-400 uppercase tracking-widest text-[9px] font-black">
            <Lock size={12} /> Sistema Cifrado de Alta Seguridad
          </div>
          <div className="flex justify-center gap-3 opacity-40">
            <span className="text-[9px] font-bold border border-slate-400 px-2 py-0.5 rounded text-slate-500">HL7</span>
            <span className="text-[9px] font-bold border border-slate-400 px-2 py-0.5 rounded text-slate-500">HIPAA</span>
            <span className="text-[9px] font-bold border border-slate-400 px-2 py-0.5 rounded text-slate-500">GDPR</span>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export { LoginScreen, RegisterScreen, RecoveryScreen };
