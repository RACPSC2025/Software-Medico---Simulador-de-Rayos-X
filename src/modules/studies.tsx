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
import { getXRayImageUrl } from "../utils/helpers";
import { MammographyImages, XRayImages } from "../assets";

const BodyMap = ({ selectedRegion, onSelectRegion }: { selectedRegion: string, onSelectRegion: (r: string) => void }) => {
  return (
    <div className="relative w-full aspect-[3/4] bg-[#0f172b] rounded-xl p-0 flex items-center justify-center border border-white/5 shadow-inner overflow-hidden transition-all">
      <svg viewBox="0 0 200 300" className="h-[90%] w-auto">
        {/* Head */}
        <circle 
          cx="100" cy="35" r="22" 
          className={`cursor-pointer transition-all duration-300 stroke-2 ${selectedRegion === 'head' ? 'fill-[#00d3f3] stroke-white filter drop-shadow-[0_0_10px_rgba(0,211,243,0.6)] scale-105 origin-center' : 'fill-[#0069a8] stroke-[#0069a8]/30 hover:fill-[#007cc2]'}`}
          onClick={() => onSelectRegion('head')}
        />
        {/* Neck */}
        <rect x="94" y="58" width="12" height="10" rx="1" className="fill-[#0069a8]/60" />
        
        {/* Chest */}
        <path 
          d="M70 70 L130 70 L135 110 L65 110 Z"
          className={`cursor-pointer transition-all duration-300 stroke-2 ${selectedRegion === 'chest' ? 'fill-[#00d3f3] stroke-white filter drop-shadow-[0_0_10px_rgba(0,211,243,0.6)] scale-105 origin-center' : 'fill-[#0069a8] stroke-[#0069a8]/30 hover:fill-[#007cc2]'}`}
          onClick={() => onSelectRegion('chest')}
        />
        {/* Abdomen */}
        <path 
          d="M68 115 L132 115 L128 150 L72 150 Z"
          className={`cursor-pointer transition-all duration-300 stroke-2 ${selectedRegion === 'abdomen' ? 'fill-[#00d3f3] stroke-white filter drop-shadow-[0_0_10px_rgba(0,211,243,0.6)] scale-105 origin-center' : 'fill-[#0069a8] stroke-[#0069a8]/30 hover:fill-[#007cc2]'}`}
          onClick={() => onSelectRegion('abdomen')}
        />
        {/* Pelvis */}
        <path 
          d="M70 155 L130 155 L135 180 L65 180 Z"
          className={`cursor-pointer transition-all duration-300 stroke-2 ${selectedRegion === 'pelvis' ? 'fill-[#00d3f3] stroke-white filter drop-shadow-[0_0_10px_rgba(0,211,243,0.6)] scale-105 origin-center' : 'fill-[#0069a8] stroke-[#0069a8]/30 hover:fill-[#007cc2]'}`}
          onClick={() => onSelectRegion('pelvis')}
        />
        {/* Arms */}
        <path 
          d="M65 75 L35 140 Q30 150 40 150 L50 145 L70 90 Z" 
          className={`cursor-pointer transition-all duration-300 stroke-2 ${selectedRegion === 'arms' ? 'fill-[#00d3f3] stroke-white' : 'fill-[#0069a8] stroke-[#0069a8]/30 hover:fill-[#007cc2]'}`}
          onClick={() => onSelectRegion('arms')}
        />
        <path 
          d="M135 75 L165 140 Q170 150 160 150 L150 145 L130 90 Z" 
          className={`cursor-pointer transition-all duration-300 stroke-2 ${selectedRegion === 'arms' ? 'fill-[#00d3f3] stroke-white' : 'fill-[#0069a8] stroke-[#0069a8]/30 hover:fill-[#007cc2]'}`}
          onClick={() => onSelectRegion('arms')}
        />
        {/* Legs */}
        <path 
          d="M75 185 L65 275 Q60 285 75 285 L90 285 L95 185 Z" 
          className={`cursor-pointer transition-all duration-300 stroke-2 ${selectedRegion === 'legs' ? 'fill-[#00d3f3] stroke-white' : 'fill-[#0069a8] stroke-[#0069a8]/30 hover:fill-[#007cc2]'}`}
          onClick={() => onSelectRegion('legs')}
        />
        <path 
          d="M125 185 L135 275 Q140 285 125 285 L110 285 L105 185 Z" 
          className={`cursor-pointer transition-all duration-300 stroke-2 ${selectedRegion === 'legs' ? 'fill-[#00d3f3] stroke-white' : 'fill-[#0069a8] stroke-[#0069a8]/30 hover:fill-[#007cc2]'}`}
          onClick={() => onSelectRegion('legs')}
        />
      </svg>
    </div>
  );
};

const ProjectionList = ({ 
  projections, 
  onSelect, 
  selectedIndex, 
  validatedIndices,
  selectedIndices,
  onToggleSelection
}: any) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(projections.length / itemsPerPage);
  
  const currentItems = projections.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="flex flex-col gap-1 mt-1">
      <div className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-1 md:pb-0 snap-x hide-scrollbar">
        {currentItems.map((item: any, i: number) => {
          const actualIndex = (page - 1) * itemsPerPage + i;
          const isValidated = validatedIndices.includes(actualIndex);
          const isSelected = selectedIndices.includes(actualIndex);
          const selectionOrder = selectedIndices.indexOf(actualIndex) + 1;

          return (
            <div
              key={actualIndex}
              className={`w-48 md:w-full shrink-0 snap-start flex items-center gap-1.5 p-1 rounded-lg border transition-all duration-300 ${
                selectedIndex === actualIndex 
                  ? 'border-primary bg-primary/5 shadow-sm dark:shadow-[0_0_10px_rgba(var(--medical-accent-rgb),0.1)]' 
                  : isSelected 
                    ? 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10' 
                    : 'bg-transparent border-transparent'
              }`}
            >
              <button 
                onClick={() => onToggleSelection(actualIndex)}
                className={`size-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-primary border-primary text-white shadow-[0_0_8px_rgba(26,86,219,0.3)]' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600'}`}
              >
                {isSelected ? (
                  <span className="text-[9px] font-bold">{selectionOrder}</span>
                ) : (
                  <Plus size={10} className="text-slate-400" />
                )}
              </button>

              <button
                onClick={() => onSelect(actualIndex)}
                className="flex-1 flex items-center gap-2 text-left overflow-hidden"
              >
                <div className="size-8 bg-slate-900 rounded overflow-hidden border border-white/5 shrink-0 relative">
                  <img src={item.img} className="w-full h-full object-cover grayscale opacity-70" alt="" />
                  {isValidated && (
                    <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                      <Check size={12} className="text-emerald-500" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-start overflow-hidden flex-1">
                  <span className="text-[9px] font-bold text-text-title dark:text-slate-200 truncate w-full leading-tight">{item.title}</span>
                  <span className="text-[7px] text-text-secondary dark:text-slate-500 font-mono leading-none">{item.id}</span>
                </div>
                {isValidated && <CheckCircle2 size={10} className="text-emerald-500 shrink-0" />}
              </button>
            </div>
          );
        })}
      </div>
      
      <div className="flex items-center justify-between mt-0.5 px-1 bg-slate-50 dark:bg-slate-800/50 p-1 rounded-lg transition-colors">
        <div className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-transparent px-2 py-0.5 rounded text-[9px] font-bold text-text-secondary dark:text-slate-300 shadow-sm">
          {page} / {totalPages || 1}
        </div>
        <div className="flex gap-1">
          <button 
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="p-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-transparent disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-slate-600 transition-all"
          >
            <ChevronLeft size={14} />
          </button>
          <button 
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage(p => p + 1)}
            className="p-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-transparent disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-slate-600 transition-all"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const EducationalWorkspace = ({ 
  onNavigate, 
  patient, 
  capturedImages,
  workspaceState,
  setWorkspaceState
}: { 
  onNavigate: (s: Screen, simData?: any) => void, 
  patient: Patient | null, 
  capturedImages: {[key: string]: string},
  workspaceState: any,
  setWorkspaceState: any
}) => {
  const { 
    selectedRegion, 
    selectedProjectionIndex, 
    selectedProjectionIndices, 
    validatedIndices, 
    viewMode, 
    zoomStates, 
    panStates 
  } = workspaceState;

  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const toggleValidation = (index: number) => {
    setWorkspaceState((prev: any) => ({
      ...prev,
      validatedIndices: prev.validatedIndices.includes(index) 
        ? prev.validatedIndices.filter((i: number) => i !== index) 
        : [...prev.validatedIndices, index]
    }));
  };

  const toggleSelection = (index: number) => {
    setWorkspaceState((prev: any) => ({
      ...prev,
      selectedProjectionIndices: prev.selectedProjectionIndices.includes(index)
        ? prev.selectedProjectionIndices.filter((i: number) => i !== index)
        : [...prev.selectedProjectionIndices, index]
    }));
  };

  const handleRegionSelect = (region: string | null) => {
    setWorkspaceState((prev: any) => ({
      ...prev,
      selectedRegion: region,
      selectedProjectionIndex: 0,
      validatedIndices: [],
      selectedProjectionIndices: region === 'chest' ? [0, 1, 2, 3] : [],
      zoomStates: {},
      panStates: {}
    }));
  };

  const setSelectedProjectionIndex = (index: number) => {
    setWorkspaceState((prev: any) => ({ ...prev, selectedProjectionIndex: index }));
  };

  const setViewMode = (mode: number) => {
    setWorkspaceState((prev: any) => ({ ...prev, viewMode: mode }));
  };

  const getProjections = () => {
    if (!selectedRegion) return [];

    if (selectedRegion === 'chest') {
      return [
        { title: 'MAMA CC D', id: 'M-01', img: MammographyImages['MAMA CC D'] },
        { title: 'MAMA CC I', id: 'M-02', img: MammographyImages['MAMA CC I'] },
        { title: 'MAMA MLO D', id: 'M-03', img: MammographyImages['MAMA MLO D'] },
        { title: 'MAMA MLO I', id: 'M-04', img: MammographyImages['MAMA MLO I'] },
        { title: 'MAMA FOC CCD', id: 'M-05', img: MammographyImages['MAMA CC D'] },
        { title: 'TORAX PA', id: 'TX-01', img: XRayImages.chest['TORAX PA'] },
        { title: 'TORAX RF', id: 'TX-02', img: XRayImages.chest['TORAX RF'] },
        { title: 'TORAX LRT', id: 'TX-03', img: XRayImages.chest['TORAX LRT'] },
        { title: 'TORAX PA INU', id: 'TX-04', img: XRayImages.chest['TORAX PA INU'] },
        { title: 'COSTILLAS', id: 'TX-05', img: XRayImages.chest['COSTILLAS'] },
        { title: 'EXTERNON', id: 'TX-06', img: XRayImages.chest['EXTERNON'] },
        { title: 'D - COLUMNA', id: 'TX-07', img: XRayImages.chest['D - COLUMNA'] },
      ];
    }

    switch(selectedRegion) {
      case 'head':
        return [
          { title: 'Cráneo AP', id: 'CR-01', img: XRayImages.head['Cráneo AP'] },
          { title: 'Cráneo Lateral', id: 'CR-02', img: XRayImages.head['Cráneo Lateral'] },
          { title: 'Senos Paranasales', id: 'CR-03', img: XRayImages.head['Senos Paranasales'] },
        ];
      case 'abdomen':
        return [
          { title: 'Abdomen AP', id: 'AB-01', img: XRayImages.abdomen['Abdomen AP'] },
          { title: 'Abdomen Lateral', id: 'AB-02', img: XRayImages.abdomen['Abdomen Lateral'] },
        ];
      default:
        return [
          { title: 'Vista General AP', id: 'GEN-01', img: XRayImages[selectedRegion]?.['Vista General AP'] || MammographyImages['MAMA CC D'] },
        ];
    }
  };

  const projections = getProjections();
  const currentProjection = projections[selectedProjectionIndex] || projections[0];

  const gridClass = viewMode === 1 ? 'grid-cols-1' : viewMode === 2 ? 'grid-cols-1 sm:grid-cols-2' : viewMode === 4 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className="h-full flex flex-col bg-bg-main dark:bg-slate-950 overflow-y-auto md:overflow-hidden transition-all duration-300">
      <div className="flex-none md:flex-1 flex flex-col md:flex-row min-h-full">
        {/* Left Sidebar Ultra-Compacto */}
        <div className="w-full md:w-52 bg-white dark:bg-[#121418] border-b md:border-b-0 md:border-r border-slate-200 dark:border-border-dark/60 flex flex-col shrink-0 transition-all">
          <div className="p-0.5 border-b border-slate-100 dark:border-border-dark/40">
            <div className="flex flex-row md:flex-col items-center gap-0.5 md:gap-0">
              <div className="w-16 md:w-[80%] mx-auto px-0 shrink-0">
                <BodyMap 
                  selectedRegion={selectedRegion} 
                  onSelectRegion={handleRegionSelect} 
                />
              </div>

              {/* Patient Info & Grid Controls Compactos - TALLER & #1d293d */}
              <div className="mt-0 md:mt-1 flex-1 md:w-full px-2 py-3.5 bg-[#1d293d] rounded-lg border border-white/10 flex flex-col justify-center gap-2 transition-all shadow-md">
                <div className="flex flex-col border-b border-white/10 pb-1.5">
                  <div className="flex items-baseline justify-between mb-0.5">
                    <span className="text-[7px] font-black text-slate-300 uppercase tracking-tighter">Paciente</span>
                    <span className="text-[7px] font-medium text-slate-400 uppercase">{patient?.sex === 'Masculino' ? 'Mas' : 'Fem'}</span>
                  </div>
                  <span className="text-[11px] font-bold text-white uppercase truncate leading-none mb-0.5">{patient?.name || 'N/A'}</span>
                </div>

                <div className="flex flex-col gap-1.5 mt-0.5">
                  <div className="flex gap-1 justify-between px-0.5">
                    {[1, 2, 4, 6].map((mode) => (
                      <button 
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        className={`flex-1 h-6 flex items-center justify-center rounded border transition-all duration-300 ${viewMode === mode ? 'border-primary bg-primary/5 text-white' : 'bg-transparent border-slate-800/50 text-slate-500 hover:text-slate-300'}`}
                        title={`${mode} Vista`}
                      >
                        {mode === 1 && <div className="size-2 border-2 border-current" />}
                        {mode === 2 && (
                          <div className="grid grid-cols-2 gap-0.5">
                            <div className="size-1.5 border border-current" />
                            <div className="size-1.5 border border-current" />
                          </div>
                        )}
                        {mode === 4 && (
                          <div className="grid grid-cols-2 gap-0.5">
                            <div className="size-1 border border-current" />
                            <div className="size-1 border border-current" />
                            <div className="size-1 border border-current" />
                            <div className="size-1 border border-current" />
                          </div>
                        )}
                        {mode === 6 && (
                          <div className="grid grid-cols-3 gap-0.5">
                            {[...Array(6)].map((_, i) => <div key={i} className="size-0.5 border border-current" />)}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-none md:flex-1 overflow-hidden md:overflow-y-auto p-1 min-h-0">
            {selectedRegion ? (
              <ProjectionList 
                projections={projections} 
                onSelect={setSelectedProjectionIndex} 
                selectedIndex={selectedProjectionIndex}
                validatedIndices={validatedIndices}
                selectedIndices={selectedProjectionIndices}
                onToggleSelection={toggleSelection}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-center p-4">
                <p className="text-[10px] text-text-secondary font-medium italic">Seleccione región</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Area: Grid Viewer (ALWAYS DARK) */}
        <div className="flex-1 bg-[#050505] overflow-hidden flex flex-col min-h-[100vh] md:min-h-0">
          <div className={`flex-1 overflow-hidden grid ${gridClass} gap-px bg-white/5 p-px h-full`}>
            {selectedProjectionIndices.slice(0, viewMode).map((projIdx, idx) => {
              const proj = projections[projIdx];
              if (!proj) return null;
              
              const isActive = activeSlot === idx;
              const isValidated = validatedIndices.includes(projIdx);
              const hasCaptured = Boolean(capturedImages[proj.id]);

              return (
                <div 
                  key={idx} 
                  className={`relative bg-[#050505] group flex flex-col border-2 transition-all duration-300 min-h-0 min-w-0 ${isValidated ? 'border-emerald-500' : isActive ? 'border-primary/50' : 'border-white/5'}`}
                  onClick={() => setActiveSlot(idx)}
                >
                  <div className="flex-1 relative overflow-hidden min-h-0">
                    {hasCaptured ? (
                      <img 
                        src={capturedImages[proj.id]} 
                        className="absolute inset-0 w-full h-full object-contain grayscale select-none"
                        alt={proj.title} 
                        draggable={false}
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505] overflow-hidden">
                        {/* Sensor Activity Pulse */}
                        <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                        
                        <div className="flex flex-col items-center gap-3 relative z-10">
                          <div className="size-12 border-2 border-primary/20 rounded-xl flex items-center justify-center bg-primary/5 shadow-[0_0_20px_rgba(0,209,255,0.1)]">
                            <Activity size={24} className="text-primary/60 animate-pulse" />
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-[9px] font-black text-primary/40 uppercase tracking-[0.2em] animate-pulse">Standby</span>
                            <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest mt-1">Esperando Señal</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute top-1.5 left-2 flex flex-col gap-0 pointer-events-none z-10">
                      <span className="text-[9px] font-bold text-white drop-shadow-lg uppercase leading-tight">{proj.title}</span>
                      <span className="text-[7px] font-mono text-white/40">{proj.id}</span>
                    </div>

                    {hasCaptured && (
                      <div className="absolute bottom-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setFullscreenImage(capturedImages[proj.id]); 
                          }}
                          className="size-7 bg-slate-800/80 backdrop-blur-sm text-white rounded flex items-center justify-center hover:bg-primary transition-colors"
                        >
                          <Eye size={13} />
                        </button>
                      </div>
                    )}

                    {isValidated && (
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-emerald-500/10 z-10">
                        <div className="bg-emerald-500/80 backdrop-blur-sm text-white rounded-full p-3 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                          <Check size={32} strokeWidth={3} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Lower bar: OXFORD BLUE & LARGER BUTTONS */}
                  <div className="h-10 bg-[#0f172b] border-t border-white/10 flex items-center justify-between px-3 shrink-0 z-10 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className={`size-2.5 rounded-full ${hasCaptured ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-slate-600 animate-pulse'}`} />
                      <span className="text-[10px] text-white/80 font-bold uppercase truncate max-w-[100px] tracking-tight">{proj.title}</span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleValidation(projIdx); }}
                        disabled={!hasCaptured}
                        className={`px-3 py-1 rounded-md text-[9px] font-black tracking-widest transition-all duration-300 border ${
                          !hasCaptured 
                            ? 'border-white/5 text-white/20 cursor-not-allowed'
                            : isValidated 
                              ? 'bg-emerald-500 border-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.4)]' 
                              : 'border-white/20 text-white hover:border-primary/60 hover:bg-primary/5 hover:text-primary'
                        }`}
                      >
                        {isValidated ? 'VERIFICADO' : 'VALIDAR'}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('xray-simulator', {
                            id: proj.id,
                            title: proj.title,
                            region: selectedRegion === 'chest' ? 'Tórax' : selectedRegion === 'head' ? 'Cráneo' : 'Abdomen',
                            description: `Adquisición de ${proj.title} para el paciente ${patient?.name}.`,
                            img: getXRayImageUrl(selectedRegion, proj.title),
                            params: proj.id.startsWith('M') ? { kvp: 28, mas: 80 } : { kvp: 110, mas: 5 }
                          });
                        }}
                        className="px-3 py-1 bg-[#1152d4] text-white text-[9px] font-black tracking-widest rounded-md hover:bg-[#1152d4]/90 transition-all duration-300 flex items-center gap-1 shadow-lg active:scale-95 border border-white/10"
                      >
                        <Activity size={12} /> RX
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {fullscreenImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <button 
              onClick={() => setFullscreenImage(null)}
              className="absolute top-6 right-6 size-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors z-50"
            >
              <X size={24} />
            </button>
            <img src={fullscreenImage} className="max-w-full max-h-full object-contain grayscale" alt="" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { BodyMap, ProjectionList, EducationalWorkspace };
