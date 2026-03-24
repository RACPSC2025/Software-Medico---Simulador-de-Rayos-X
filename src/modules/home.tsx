import React from 'react';
import { motion } from 'motion/react';
import { 
  UserPlus, 
  Library, 
  BookOpen, 
  IdCard, 
  Activity, 
  ArrowRight,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { Button } from "../components/ui";
import { OtherImages } from "../assets";

const HomeScreen = ({ onNavigate, userEmail }: any) => {
  return (
    <div className="flex-1 overflow-y-auto bg-[#F9FAFB] text-slate-800 p-4 lg:px-12 lg:py-2">
      <div className="max-w-[1400px] mx-auto space-y-4 py-2">
        
        {/* Header Institucional - Estilo Premium Académico */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center space-y-4 pt-4"
        >
          {/* Logo UPTM - Compacto */}
          <div className="w-32 lg:w-40 relative group">
            <div className="absolute inset-0 bg-primary/5 blur-xl rounded-full" />
            <img 
              src={OtherImages.LOGO} 
              alt="Logo UPTM Kleber Ramírez" 
              className="w-full h-auto object-contain relative z-10 filter drop-shadow-sm"
            />
          </div>
          
          {/* Título Académico - Extendido */}
          <div className="max-w-[90%] lg:max-w-[95%] mx-auto pb-4 border-b border-slate-100">
            <h1 className="text-sm md:text-lg lg:text-xl font-black text-[#1E293B] leading-[1.3] uppercase tracking-wide drop-shadow-sm">
              PLATAFORMA PARTICIPATIVA PARA LA OPTIMIZACIÓN DEL ESTUDIO MAMOGRÁFICO EN EL PROGRAMA NACIONAL DE FORMACIÓN DE RADIOIMAGENOLOGÍA DE LA UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ESTADO MÉRIDA "KLEBER RAMÍREZ"
            </h1>
          </div>
        </motion.div>

        {/* Espacio para Integrantes (Alineado a la Derecha - Estilo Tesis) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-end pr-10 pt-20 pb-20"
        >
          <div className="text-left space-y-2">
            <h2 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-3">Integrantes:</h2>
            <div className="space-y-1 font-bold text-slate-700 text-sm md:text-base uppercase tracking-tight">
              <p>Jeys Vera</p>
              <p>Dennis Fernandez</p>
            </div>
          </div>
        </motion.div>
        
        <div className="pt-24 pb-6">
          <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] leading-relaxed">
            República Bolivariana de Venezuela • UPTM "Kléber Ramírez" • Ejido
          </p>
        </div>
      </div>
    </div>
  );
};

export { HomeScreen };
