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

const Button = ({ children, onClick, variant = 'primary', className = '', icon: Icon, disabled = false }: any) => {
  const variants: any = {
    primary: 'bg-[#1152d4] text-white hover:bg-[#1152d4]/90 shadow-md font-bold active:scale-[0.98] transition-all duration-300',
    secondary: 'bg-white dark:bg-[#1E2229] text-text-secondary dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#252A33] border border-slate-200 dark:border-border-dark/50 transition-all',
    danger: 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 border border-red-100 dark:border-red-500/20 hover:bg-red-600 hover:text-white transition-all',
    ghost: 'text-text-secondary dark:text-slate-500 hover:text-[#1152d4] transition-colors',
    outline: 'border border-slate-200 dark:border-border-dark/60 text-text-secondary dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#161920] hover:text-[#1152d4] hover:border-[#1152d4]/50'
  };

  return (
    <button 
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${!disabled ? 'active:scale-[0.98]' : 'opacity-50 cursor-not-allowed'} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

const Input = ({ label, icon: Icon, type = 'text', placeholder, value, onChange, onBlur, readOnly = false, className = '', error }: any) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && <label className="text-[10px] font-bold text-text-secondary dark:text-slate-500 uppercase tracking-[0.1em] ml-1">{label}</label>}
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/50 dark:text-slate-500" size={16} />}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readOnly}
        className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-2.5 bg-white dark:bg-[#121418] border ${error ? 'border-red-500/50' : 'border-slate-200 dark:border-border-dark'} focus:border-primary rounded-xl focus:ring-4 focus:ring-primary/5 text-text-title dark:text-white text-sm transition-all duration-300 outline-none placeholder:text-text-secondary/40 dark:placeholder:text-slate-700 ${readOnly ? 'cursor-not-allowed opacity-70' : ''} shadow-sm dark:shadow-inner`}
      />
    </div>
    {error && <p className="text-[10px] text-red-500 font-medium mt-0.5">{error}</p>}
  </div>
);

export { Button, Input };
