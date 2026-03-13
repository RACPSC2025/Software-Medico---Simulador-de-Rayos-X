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
import { Button, Input } from "../components/ui";

const ProfessionalDirectory = () => (
  <div className="space-y-6">
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none" placeholder="Buscar por nombre o especialidad..." />
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" icon={Settings}>Filtros</Button>
        <Button variant="secondary" icon={Download}>Exportar</Button>
        <Button icon={Plus}>Agregar Profesional</Button>
      </div>
    </div>
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
            <th className="px-6 py-4">Profesional</th>
            <th className="px-6 py-4">Especialidad</th>
            <th className="px-6 py-4">Contacto</th>
            <th className="px-6 py-4">Estado</th>
            <th className="px-6 py-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {[
            { name: 'Dr. Alejandro Sanz', id: '48293', specialty: 'Radiólogo Senior', email: 'ale.sanz@hosp.es', phone: '+34 600 000 001', status: 'Activo', color: 'emerald' },
            { name: 'Dra. Elena Gómez', id: '48512', specialty: 'Residente', email: 'elena.g@hosp.es', phone: '+34 600 000 002', status: 'En Turno', color: 'blue' },
            { name: 'Dr. Marcos Ruiz', id: '48901', specialty: 'Neuroradiólogo', email: 'm.ruiz@hosp.es', phone: '+34 600 000 003', status: 'Ausente', color: 'slate' },
            { name: 'Dra. Sofia Vidal', id: '49022', specialty: 'Intervencionista', email: 's.vidal@hosp.es', phone: '+34 600 000 004', status: 'Activo', color: 'emerald' },
          ].map((p, i) => (
            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {p.name.split(' ').slice(-2).map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{p.name}</p>
                    <p className="text-xs text-slate-500">ID: {p.id}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-[11px] font-bold rounded-full uppercase">{p.specialty}</span>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2"><Mail size={12} /> {p.email}</div>
                  <div className="flex items-center gap-2"><Activity size={12} /> {p.phone}</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className={`size-2 rounded-full bg-${p.color}-500`} />
                  <span className={`text-xs font-medium text-${p.color}-600`}>{p.status}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                  <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-400"><Edit2 size={16} /></button>
                  <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-red-500"><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-6 py-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
        <p className="text-xs text-slate-500">Mostrando <span className="font-bold">1-4</span> de <span className="font-bold">24</span> profesionales</p>
        <div className="flex items-center gap-1">
          <button className="size-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 text-slate-400"><ChevronLeft size={16} /></button>
          <button className="size-8 flex items-center justify-center rounded border border-primary bg-primary text-white text-xs font-bold">1</button>
          <button className="size-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 text-xs font-medium">2</button>
          <button className="size-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 text-xs font-medium">3</button>
          <button className="size-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 text-slate-400"><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { label: 'Total de Médicos', val: '24', icon: Stethoscope, color: 'primary' },
        { label: 'Disponibles Ahora', val: '12', icon: Check, color: 'emerald' },
        { label: 'Turnos de Residencia', val: '8', icon: History, color: 'amber' },
      ].map((s, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
          <div className={`size-12 rounded-lg bg-${s.color}-500/10 flex items-center justify-center text-${s.color}-600`}>
            <s.icon size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">{s.label}</p>
            <p className="text-xl font-bold">{s.val}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export { ProfessionalDirectory };
