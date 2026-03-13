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
import { Screen } from "../types";
import { Button, Input } from "../components/ui";
import { OtherImages } from "../assets";

const TopNavbar = ({ currentScreen, onNavigate, userEmail }: { currentScreen: Screen, onNavigate: (s: Screen) => void, userEmail: string }) => {
  const navItems = [
    { id: 'patient-registration', label: 'Registro', icon: User },
    { id: 'educational-workspace', label: 'Estudios', icon: FileText },
    { id: 'xray-simulator', label: 'Rayos X', icon: Play },
    { id: 'export-share', label: 'Exportar', icon: Share2 },
  ];

  return (
    <header className="h-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('patient-registration')}>
          <div className="bg-primary rounded-lg p-1 flex items-center justify-center text-white">
            <Activity size={18} />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xs font-bold leading-tight">Radiografía Pro</h1>
          </div>
        </div>
        
        <nav className="flex items-center gap-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as Screen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-bold text-[10px] uppercase tracking-wider ${currentScreen === item.id ? 'bg-primary text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              <item.icon size={14} />
              <span className="hidden md:inline">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-800">
          <div className="text-right hidden lg:block">
            <p className="text-[10px] font-bold leading-none text-slate-500 mb-1">Especialista</p>
            <p className="text-[11px] font-black leading-none">{userEmail}</p>
          </div>
          <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border border-primary/20">
            <img className="object-cover w-full h-full" src={OtherImages.AVATAR} alt={userEmail} />
          </div>
          <button onClick={() => onNavigate('login')} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};
const DashboardLayout = ({ children, currentScreen, onNavigate, userEmail }: any) => (
  <div className="h-screen flex flex-col bg-background-light dark:bg-background-dark overflow-hidden">
    <TopNavbar currentScreen={currentScreen} onNavigate={onNavigate} userEmail={userEmail} />
    <main className="flex-1 w-full overflow-hidden">
      {children}
    </main>
  </div>
);

export { TopNavbar, DashboardLayout };
