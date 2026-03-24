import React, { useState } from 'react';
import {
  FileText,
  Download,
  CheckCircle,
  ArrowLeft,
  Calendar,
  User,
  Shield,
  Activity,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from "../components/ui";
import { Patient } from "../types";
import { OtherImages } from "../assets";

interface ExportScreenProps {
  patient: Patient | null;
  capturedImages: {[key: string]: string};
  workspaceState?: { protesisType?: 'sin-protesis' | 'con-protesis' };
  onBack: () => void;
  onFinish: () => void;
}

const ExportScreen = ({ patient, capturedImages, workspaceState, onBack, onFinish }: ExportScreenProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const capturedList = Object.keys(capturedImages);
  const totalCaptured = capturedList.length;
  const protesisType = workspaceState?.protesisType || 'sin-protesis';
  
  // Determinar imágenes finales según tipo de paciente
  const finalImages = protesisType === 'con-protesis' 
    ? [
        { src: OtherImages.RADIO_FINAL_PROTESIS, title: 'MAMA COMPLETA PROTESIS', subtitle: '4 proyecciones con implante' },
        { src: OtherImages.RADIO_FINAL_PROTESIS_EKLUND, title: 'MAMA COMPLETA PROTESIS EKLUND', subtitle: 'Técnica de desplazamiento de implante' }
      ]
    : [
        { src: OtherImages.RADIO_FINAL_BASICO, title: 'MAMA COMPLETA BASICO', subtitle: '4 proyecciones estándar' }
      ];

  const handleSave = () => {
    setIsSaving(true);
    // Didactic delay to simulate saving process
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      
      // Regresar al inicio después de que el usuario vea el éxito (2 segundos después)
      setTimeout(() => {
        onFinish();
      }, 2500);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 overflow-y-auto">
      {/* Top Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-slate-500" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Exportar Resultados</h2>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Finalización de Estudio Mamográfico</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="text-xs" onClick={onFinish}>Nueva Simulación</Button>
            <Button 
              icon={Download} 
              onClick={handleSave} 
              disabled={isSaving}
              className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
            >
              {isSaving ? 'Guardando...' : 'Guardar y Exportar'}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Patient Data & List */}
          <div className="lg:col-span-1 space-y-6">
            <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                <User size={14} /> Información del Paciente
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Nombre</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase">{patient?.name || 'Invitado'}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">ID</span>
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-300">{patient?.id || 'N/A'}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Edad</span>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{patient?.age || '0'} Años</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/50 flex items-center gap-2">
                  <Shield size={16} className="text-emerald-500" />
                  <span className="text-[10px] font-medium text-slate-500 italic">Datos protegidos bajo protocolo médico simulado</span>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                <FileText size={14} /> Imágenes Capturadas ({totalCaptured})
              </h3>
              <div className="space-y-3">
                {capturedList.length > 0 ? (
                  capturedList.map((id) => (
                    <div key={id} className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <div className="size-12 bg-black rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                        <img src={capturedImages[id]} className="w-full h-full object-cover grayscale" alt={id} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-slate-700 dark:text-slate-200 truncate uppercase">{id}</p>
                        <p className="text-[8px] text-emerald-500 font-bold uppercase flex items-center gap-1">
                          <CheckCircle size={8} /> Adquirida
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 opacity-40">
                    <Activity className="mx-auto mb-2 text-slate-400" size={24} />
                    <p className="text-[10px] font-medium uppercase text-slate-500">No hay imágenes capturadas</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Composite Radiography */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-slate-900 rounded-[2.5rem] p-4 md:p-8 border border-slate-800 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-50" />

              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                    <ImageIcon size={18} className="text-primary" /> Fusión Radiográfica Final
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase font-medium">Composición diagnóstica de la sesión</p>
                </div>
                <div className="bg-primary/10 border border-primary/30 px-4 py-1.5 rounded-full">
                  <span className="text-[10px] font-bold text-primary uppercase brightness-125">
                    {protesisType === 'con-protesis' ? 'Paciente con Prótesis' : 'Paciente Sin Prótesis'}
                  </span>
                </div>
              </div>

              {/* Mostrar una o dos imágenes según el tipo de paciente */}
              <div className={`grid gap-6 ${finalImages.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                {finalImages.map((img, idx) => (
                  <div key={idx} className="space-y-4">
                    {/* Header with formal clinic-style "membrete" */}
                    <div className="flex items-end justify-between px-2 border-b border-white/5 pb-2">
                      <div className="flex flex-col gap-0.5">
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Registro Radiológico</p>
                        <h4 className="text-[14px] font-bold text-white uppercase leading-none tracking-tight">{patient?.name || 'Invitado'}</h4>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-[9px] font-mono text-slate-400">ID: {patient?.id || 'N/A'}</span>
                          <span className="text-[9px] font-mono text-slate-400">FECHA: {new Date().toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-1.5">
                        <div className="bg-primary/20 border border-primary/50 px-3 py-1.5 rounded-lg shadow-[0_0_15px_rgba(var(--medical-accent-rgb),0.1)]">
                          <p className="text-[10px] font-black text-primary uppercase tracking-widest">{img.title}</p>
                        </div>
                        {img.title.includes('EKLUND') && (
                          <div className="bg-amber-500/20 px-3 py-1.5 rounded-lg border border-amber-500/50">
                            <p className="text-[9px] font-black text-amber-500 uppercase tracking-widest">Técnica Eklund</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="aspect-[4/3] bg-black rounded-3xl overflow-hidden border border-slate-800 relative shadow-2xl group/image">
                      {/* Simulated Grid Overlay */}
                      <div className="absolute inset-0 pointer-events-none grid grid-cols-4 grid-rows-3 opacity-10">
                        {[...Array(12)].map((_, i) => <div key={i} className="border border-white/20" />)}
                      </div>

                      <img
                        src={img.src}
                        className="w-full h-full object-contain grayscale opacity-90 transition-all duration-700 group-hover/image:opacity-100 group-hover/image:scale-[1.02]"
                        alt={img.title}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                <p className="text-[10px] text-slate-400 italic leading-relaxed">
                  * Este es un ejemplo demostrativo de cómo las proyecciones capturadas se fusionan para el análisis del radiólogo. 
                  {protesisType === 'con-protesis' 
                    ? ' En pacientes con implantes mamarios, se realiza una segunda composición con la técnica de Eklund para desplazar las prótesis y visualizar mejor el tejido glandular.'
                    : ' La calidad de la imagen final depende de los parámetros técnicos (kVp/mAs) seleccionados durante la simulación.'}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Success Notification Animation */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-[0_20px_40px_rgba(16,185,129,0.3)] border border-emerald-500 flex items-center gap-3"
          >
            <div className="size-8 bg-white/20 rounded-full flex items-center justify-center">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-sm font-bold">¡Estudio Guardado!</p>
              <p className="text-[10px] opacity-80 uppercase font-medium tracking-wide">El expediente ha sido procesado exitosamente</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Saving Overlay */}
      <AnimatePresence>
        {isSaving && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-md flex items-center justify-center"
          >
            <div className="text-center">
              <div className="size-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-6 shadow-[0_0_50px_rgba(17,82,212,0.3)]" />
              <h3 className="text-white font-bold text-xl uppercase tracking-widest mb-2">Procesando Exportación</h3>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider animate-pulse">Codificando imágenes y generando reporte radiológico...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { ExportScreen };
