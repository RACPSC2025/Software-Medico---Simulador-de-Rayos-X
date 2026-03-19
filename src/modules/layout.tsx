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
import { OtherImages } from "../assets";

const TopNavbar = ({ currentScreen, onNavigate, userEmail, isDarkMode, onToggleTheme }: any) => {
  const navItems = [
    { id: 'patient-registration', label: 'Registro', icon: User },
    { id: 'educational-workspace', label: 'Estudios', icon: FileText },
    { id: 'xray-simulator', label: 'Rayos X', icon: Play },
    { id: 'export-share', label: 'Exportar', icon: Share2 },
  ];

  return (
    <header className="h-12 bg-white dark:bg-card-dark border-b border-slate-200 dark:border-border-dark flex items-center justify-between px-4 sticky top-0 z-50 transition-colors duration-300">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('patient-registration')}>
          <div className="bg-primary rounded-lg p-1 flex items-center justify-center text-white shadow-[0_0_10px_rgba(26,86,219,0.3)]">
            <Activity size={18} />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xs font-black leading-tight text-text-title dark:text-slate-100 tracking-tighter uppercase">Radiografía Pro</h1>
          </div>
        </div>
        
        <nav className="flex items-center gap-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as Screen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-bold text-xs uppercase tracking-[0.1em] ${currentScreen === item.id ? 'text-primary border border-primary/30 bg-primary/5 shadow-[0_0_15px_rgba(26,86,219,0.05)]' : 'text-slate-700 dark:text-slate-500 hover:text-primary dark:hover:text-slate-300'}`}
            >
              <item.icon size={14} />
              <span className="hidden md:inline">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button 
          onClick={onToggleTheme}
          className="p-2 text-slate-400 hover:text-primary transition-colors duration-300"
          title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-border-dark">
          <div className="text-right hidden lg:block">
            <p className="text-[10px] font-bold leading-none text-slate-400 mb-1 uppercase tracking-tighter">Especialista</p>
            <p className="text-[11px] font-black leading-none text-primary">{userEmail}</p>
          </div>
          <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-border-dark shadow-inner">
            <img 
              className="object-cover w-full h-full" 
              src={OtherImages.AVATAR} 
              alt={userEmail}
            />
          </div>
          <button onClick={() => onNavigate('login')} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};

const DashboardLayout = ({ children, currentScreen, onNavigate, userEmail, isDarkMode, onToggleTheme }: any) => (
  <div className="h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
    <TopNavbar 
      currentScreen={currentScreen} 
      onNavigate={onNavigate} 
      userEmail={userEmail} 
      isDarkMode={isDarkMode} 
      onToggleTheme={onToggleTheme} 
    />
    <div className="flex-1 w-full overflow-hidden relative">
      {children}
    </div>
  </div>
);

export { TopNavbar, DashboardLayout };
