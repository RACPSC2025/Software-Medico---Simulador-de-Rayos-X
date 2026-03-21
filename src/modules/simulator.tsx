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
import { Button } from "../components/ui";
import { MammographyImages } from "../assets";

const XRaySimulator = ({ initialCase, onAccept, onCancel }: { initialCase?: any, onAccept: (id: string, url: string) => void, onCancel: () => void }) => {
  const [selectedCase, setSelectedCase] = useState<any>(initialCase || null);
  const [simState, setSimState] = useState<'idle' | 'configuring' | 'capturing' | 'digitizing' | 'result'>(initialCase ? 'configuring' : 'idle');
  const [kvp, setKvp] = useState(initialCase?.params?.kvp || 70);
  const [mas, setMas] = useState(initialCase?.params?.mas || 20);
  const [sensorNoise, setSensorNoise] = useState(0);
  const [progress, setProgress] = useState(0);
  const [digitizationProgress, setDigitizationProgress] = useState(0);
  const [isConfigOpen, setIsConfigOpen] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [imageRetryKey, setImageRetryKey] = useState(0);
  const [imgTransform, setImgTransform] = useState({
    brightness: 100,
    contrast: 100,
    rotation: 0,
    scale: 1,
    flipX: false,
    flipY: false
  });

  const cases = [
    // Mamografías Básicas
    { id: 'M-01', title: 'MAMA CC D', region: 'Tórax', description: 'Paciente para tamizaje. Evaluar densidad glandular.', img: MammographyImages['MAMA CC D'], params: { kvp: 28, mas: 80 } },
    { id: 'M-02', title: 'MAMA CC I', region: 'Tórax', description: 'Evaluación contralateral.', img: MammographyImages['MAMA CC I'], params: { kvp: 28, mas: 80 } },
    { id: 'M-03', title: 'MAMA MLO D', region: 'Tórax', description: 'Evaluar prolongación axilar.', img: MammographyImages['MAMA MLO D'], params: { kvp: 30, mas: 100 } },
    { id: 'M-04', title: 'MAMA MLO I', region: 'Tórax', description: 'Evaluación contralateral MLO.', img: MammographyImages['MAMA MLO I'], params: { kvp: 30, mas: 100 } },
    // Mamografías con Prótesis
    { id: 'M-05', title: 'MAMA CC D PROTESIS', region: 'Tórax', description: 'Paciente con implante mamario derecho.', img: MammographyImages['MAMA CC D PROTESIS'], params: { kvp: 30, mas: 90 } },
    { id: 'M-06', title: 'MAMA CC I PROTESIS', region: 'Tórax', description: 'Paciente con implante mamario izquierdo.', img: MammographyImages['MAMA CC I PROTESIS'], params: { kvp: 30, mas: 90 } },
    { id: 'M-07', title: 'MAMA MLO D PROTESIS', region: 'Tórax', description: 'Proyección MLO con implante derecho.', img: MammographyImages['MAMA MLO D PROTESIS'], params: { kvp: 32, mas: 110 } },
    { id: 'M-08', title: 'MAMA MLO I PROTESIS', region: 'Tórax', description: 'Proyección MLO con implante izquierdo.', img: MammographyImages['MAMA MLO I PROTESIS'], params: { kvp: 32, mas: 110 } },
    // Mamografías con Prótesis - Técnica Eklund
    { id: 'M-09', title: 'MAMA CC D PROTESIS EKLUND', region: 'Tórax', description: 'Técnica de Eklund para desplazar implante derecho.', img: MammographyImages['MAMA CC D PROTESIS EKLUND'], params: { kvp: 30, mas: 90 } },
    { id: 'M-10', title: 'MAMA CC I PROTESIS EKLUND', region: 'Tórax', description: 'Técnica de Eklund para desplazar implante izquierdo.', img: MammographyImages['MAMA CC I PROTESIS EKLUND'], params: { kvp: 30, mas: 90 } },
    { id: 'M-11', title: 'MAMA MLO D PROTESIS EKLUND', region: 'Tórax', description: 'Proyección MLO con técnica de Eklund derecho.', img: MammographyImages['MAMA MLO D PROTESIS EKLUND'], params: { kvp: 32, mas: 110 } },
    { id: 'M-12', title: 'MAMA MLO I PROTESIS EKLUND', region: 'Tórax', description: 'Proyección MLO con técnica de Eklund izquierdo.', img: MammographyImages['MAMA MLO I PROTESIS EKLUND'], params: { kvp: 32, mas: 110 } },
  ];

  const startSimulation = (c: any) => {
    setSelectedCase(c);
    setSimState('configuring');
    setKvp(c.params.kvp);
    setMas(c.params.mas);
    setSensorNoise(0);
    setImageError(false);
    setImageRetryKey(0);
    setImgTransform({ brightness: 100, contrast: 100, rotation: 0, scale: 1, flipX: false, flipY: false });
  };

  const handleCapture = () => {
    setSimState('capturing');
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSimState('digitizing');
          startDigitization();
          return 100;
        }
        return prev + 2; // 50 steps
      });
    }, 100); // 5 seconds total (50 * 100ms)
  };

  const startDigitization = () => {
    setDigitizationProgress(0);
    const interval = setInterval(() => {
      setDigitizationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSimState('result');
          return 100;
        }
        return prev + 1; // Slow for photocopier effect
      });
    }, 150); // 15 seconds total (100 * 150ms)
  };

  const reset = () => {
    setImageError(false);
    setImageRetryKey(prev => prev + 1);
    setImgTransform({ brightness: 100, contrast: 100, rotation: 0, scale: 1, flipX: false, flipY: false });
    if (initialCase) {
      setSelectedCase(initialCase);
      setSimState('configuring');
      setDigitizationProgress(0);
      setProgress(0);
    } else {
      setSelectedCase(null);
      setSimState('idle');
    }
  };

  const calculateImageQuality = () => {
    if (!selectedCase) return { filter: '', noise: 0, scatter: 0, status: 'ÓPTIMA', color: 'text-emerald-400' };

    const optimalKvp = selectedCase.params.kvp;
    const optimalMas = selectedCase.params.mas;

    const deltaKvp = kvp - optimalKvp;
    const deltaMas = mas - optimalMas;

    // Contrast: Higher kVp = lower contrast (more penetration, less absorption difference).
    // Lower kVp = higher contrast.
    let contrast = 100 - (deltaKvp * 1.5);
    contrast = Math.max(30, Math.min(200, contrast));

    // Brightness (Density): Higher mAs = darker image (overexposed).
    // Lower mAs = brighter image (underexposed).
    // Also higher kVp increases density slightly.
    let brightness = 100 - (deltaMas * 2) - (deltaKvp * 0.5);
    brightness = Math.max(20, Math.min(250, brightness));

    // Noise (Quantum mottle): Occurs when mAs is too low.
    let noise = 0;
    if (mas < optimalMas) {
      noise = Math.min(0.8, (optimalMas - mas) / optimalMas);
    }
    
    // Add manual sensor noise
    noise = Math.min(1, noise + (sensorNoise / 100) * 0.8);

    // Scatter (Fog): Occurs when kVp is too high.
    let scatter = 0;
    if (kvp > optimalKvp) {
      scatter = Math.min(0.6, (kvp - optimalKvp) / 100);
    }

    let status = 'CALIDAD ÓPTIMA';
    let color = 'text-emerald-400';

    if (noise > 0.3) {
      if (sensorNoise > 30) {
        status = 'RUIDO DEL SENSOR';
      } else {
        status = 'RUIDO CUÁNTICO (mAs BAJO)';
      }
      color = 'text-amber-400';
    } else if (scatter > 0.3) {
      status = 'RADIACIÓN DISPERSA (kVp ALTO)';
      color = 'text-amber-400';
    } else if (brightness < 50) {
      status = 'SOBREEXPUESTA (OSCURA)';
      color = 'text-red-400';
    } else if (brightness > 150) {
      status = 'SUBEXPUESTA (CLARA)';
      color = 'text-red-400';
    } else if (contrast < 60) {
      status = 'BAJO CONTRASTE';
      color = 'text-amber-400';
    } else if (contrast > 140) {
      status = 'ALTO CONTRASTE';
      color = 'text-amber-400';
    }

    return {
      filter: `brightness(${brightness}%) contrast(${contrast}%)`,
      brightness,
      contrast,
      noise,
      scatter,
      status,
      color
    };
  };

  const quality = calculateImageQuality();

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-black">
      {/* Main Image View */}
      <div className="flex-1 relative w-full h-full flex items-center justify-center">
        {simState === 'idle' && (
          <div className="text-center space-y-3">
            <div className="size-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto shadow-lg border border-slate-700">
              <Play className="text-slate-500" size={24} />
            </div>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">Seleccione un caso para iniciar</p>
          </div>
        )}

        {simState === 'configuring' && (
          <div className="text-center space-y-3">
            <div className="size-32 mx-auto border-4 border-primary/20 border-t-primary rounded-full animate-spin shadow-[0_0_30px_rgba(17,82,212,0.2)]" />
            <p className="text-slate-400 text-xs font-bold uppercase animate-pulse tracking-widest">Listo para adquisición</p>
          </div>
        )}

        {simState === 'capturing' && (
          <div className="w-full max-w-md space-y-3 px-6">
            <div className="flex justify-between text-xs font-bold text-primary uppercase tracking-widest">
              <span>Adquiriendo...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                className="h-full bg-primary shadow-[0_0_10px_rgba(17,82,212,0.8)]" 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {simState === 'digitizing' && (
          <div className="w-full h-full relative overflow-hidden">
            {/* The image being revealed */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                key={`${selectedCase?.img}-${imageRetryKey}`}
                src={selectedCase?.img} 
                alt="Digitizing"
                className={`w-full h-full object-contain grayscale ${imageError ? 'opacity-0' : 'opacity-100'}`}
                style={{
                  clipPath: `inset(0 0 ${100 - digitizationProgress}% 0)`,
                  filter: `brightness(${imgTransform.brightness}%) contrast(${imgTransform.contrast}%) ${quality.filter}`,
                  transform: `rotate(${imgTransform.rotation}deg) scale(${imgTransform.scale}) scaleX(${imgTransform.flipX ? -1 : 1}) scaleY(${imgTransform.flipY ? -1 : 1})`,
                  transition: 'transform 0.3s ease, filter 0.3s ease'
                }}
                onError={(e) => {
                  setImageError(true);
                }}
              />
            </div>

            {/* Noise Overlay */}
            {quality.noise > 0 && (
              <div 
                className="absolute inset-0 pointer-events-none mix-blend-overlay" 
                style={{ 
                  opacity: quality.noise,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  clipPath: `inset(0 0 ${100 - digitizationProgress}% 0)`
                }} 
              />
            )}

            {/* Scatter Overlay */}
            {quality.scatter > 0 && (
              <div 
                className="absolute inset-0 pointer-events-none bg-white mix-blend-screen" 
                style={{ 
                  opacity: quality.scatter,
                  clipPath: `inset(0 0 ${100 - digitizationProgress}% 0)`
                }} 
              />
            )}

            {/* Scanning line (Photocopier style - Vertical) */}
            <motion.div 
              className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_30px_rgba(0,255,255,1)] z-30"
              style={{ top: `${digitizationProgress}%` }}
            />

            {/* Overlay info */}
            <div className="absolute top-6 left-6 z-40 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-2xl">
              <p className="text-cyan-400 text-[11px] font-bold uppercase tracking-widest mb-1">Digitalizando: {selectedCase?.title}</p>
              <p className="text-white/80 text-[9px] uppercase font-mono">{digitizationProgress}% completado</p>
            </div>
          </div>
        )}

        {simState === 'result' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full relative overflow-hidden"
          >
            <img 
              key={`${selectedCase?.img}-${imageRetryKey}`}
              src={selectedCase?.img} 
              alt="Resultado" 
              className={`w-full h-full object-contain grayscale ${imageError ? 'opacity-0' : 'opacity-100'}`}
              style={{ 
                filter: `brightness(${imgTransform.brightness}%) contrast(${imgTransform.contrast}%) ${quality.filter}`,
                transform: `rotate(${imgTransform.rotation}deg) scale(${imgTransform.scale}) scaleX(${imgTransform.flipX ? -1 : 1}) scaleY(${imgTransform.flipY ? -1 : 1})`,
                transition: 'transform 0.3s ease, filter 0.3s ease'
              }}
              onError={(e) => {
                setImageError(true);
              }}
            />
            
            {/* Noise Overlay */}
            {quality.noise > 0 && (
              <div 
                className="absolute inset-0 pointer-events-none mix-blend-overlay" 
                style={{ 
                  opacity: quality.noise,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }} 
              />
            )}

            {/* Scatter Overlay */}
            {quality.scatter > 0 && (
              <div 
                className="absolute inset-0 pointer-events-none bg-white mix-blend-screen" 
                style={{ opacity: quality.scatter }} 
              />
            )}

            <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl w-full md:w-auto">
                <h4 className="text-white font-bold text-sm mb-2">{selectedCase?.title}</h4>
                <div className="flex flex-wrap gap-4 text-slate-400 text-[11px] font-mono">
                  <span className="bg-slate-800 px-2 py-1 rounded">{kvp} kVp</span>
                  <span className="bg-slate-800 px-2 py-1 rounded">{mas} mAs</span>
                  <span className="bg-slate-800 px-2 py-1 rounded">Ruido: {sensorNoise}%</span>
                  <span className={`px-2 py-1 rounded font-bold bg-slate-800 ${quality.color}`}>{quality.status}</span>
                </div>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                <Button onClick={reset} variant="secondary" className="flex-1 md:flex-none text-xs py-3 px-6" icon={RefreshCw}>Reintentar</Button>
                <Button 
                  onClick={() => onAccept(selectedCase.id, selectedCase.img)} 
                  className="flex-1 md:flex-none text-xs py-3 px-8 bg-emerald-600 hover:bg-emerald-500 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]" 
                  icon={Check}
                >
                  Aceptar
                </Button>
              </div>
            </div>

            {/* Image Processing Toolbar */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 bg-slate-900/80 backdrop-blur-md p-2 rounded-xl border border-slate-700/50 shadow-2xl z-40">
              <button 
                onClick={() => setImgTransform(prev => ({ ...prev, brightness: prev.brightness + 10 }))}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Aumentar Brillo"
              >
                <Sun size={18} />
              </button>
              <button 
                onClick={() => setImgTransform(prev => ({ ...prev, contrast: prev.contrast + 10 }))}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Aumentar Contraste"
              >
                <Contrast size={18} />
              </button>
              <div className="h-px w-full bg-slate-700/50 my-1" />
              <button 
                onClick={() => setImgTransform(prev => ({ ...prev, scale: prev.scale + 0.1 }))}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Acercar"
              >
                <ZoomIn size={18} />
              </button>
              <button 
                onClick={() => setImgTransform(prev => ({ ...prev, scale: Math.max(0.1, prev.scale - 0.1) }))}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Alejar"
              >
                <ZoomOut size={18} />
              </button>
              <div className="h-px w-full bg-slate-700/50 my-1" />
              <button 
                onClick={() => setImgTransform(prev => ({ ...prev, rotation: prev.rotation - 90 }))}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Rotar Izquierda"
              >
                <RotateCcw size={18} />
              </button>
              <button 
                onClick={() => setImgTransform(prev => ({ ...prev, rotation: prev.rotation + 90 }))}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Rotar Derecha"
              >
                <RotateCw size={18} />
              </button>
              <div className="h-px w-full bg-slate-700/50 my-1" />
              <button 
                onClick={() => setImgTransform(prev => ({ ...prev, flipX: !prev.flipX }))}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Voltear Horizontal"
              >
                <FlipHorizontal size={18} />
              </button>
              <button 
                onClick={() => setImgTransform(prev => ({ ...prev, flipY: !prev.flipY }))}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Voltear Vertical"
              >
                <FlipVertical size={18} />
              </button>
              <div className="h-px w-full bg-slate-700/50 my-1" />
              <button 
                onClick={() => setImgTransform({ brightness: 100, contrast: 100, rotation: 0, scale: 1, flipX: false, flipY: false })}
                className="p-2 text-amber-500 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
                title="Restablecer"
              >
                <Sliders size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Error Overlay */}
        {imageError && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md p-6 text-center">
            <div className="size-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 border border-red-500/30">
              <AlertTriangle className="text-red-500" size={32} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Error al Cargar Imagen</h3>
            <p className="text-slate-400 text-sm mb-6 max-w-md">
              No se pudo cargar la imagen de la simulación para <strong>{selectedCase?.title}</strong>. Por favor, reintente la carga o verifique que el archivo de imagen exista en la carpeta de assets.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="secondary"
                icon={RefreshCw}
                onClick={() => {
                  setImageError(false);
                  setImageRetryKey(k => k + 1);
                }}
              >
                Reintentar
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Configuration Panel */}
      <div className={`absolute top-3 left-3 z-40 w-64 max-h-[calc(100%-1.5rem)] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isConfigOpen ? 'translate-x-0' : '-translate-x-[120%]'}`}>
        <div className="bg-slate-900/95 backdrop-blur-xl p-3 rounded-2xl border border-slate-700/50 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col gap-3 overflow-y-auto hide-scrollbar">
          <div className="flex items-center justify-between mb-0.5">
            <h3 className="text-[9px] font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
              <Settings size={12} />
              Configuración
            </h3>
            <button onClick={() => setIsConfigOpen(false)} className="text-slate-400 hover:text-white transition-colors p-0.5 bg-slate-800 rounded-full">
              <X size={12} />
            </button>
          </div>

          {simState === 'idle' && !initialCase ? (
            <div className="space-y-2">
              <h4 className="text-[8px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Casos Disponibles</h4>
              <div className="space-y-1.5">
                {cases.map(c => (
                  <button
                    key={c.id}
                    onClick={() => startSimulation(c)}
                    className="w-full text-left p-2 rounded-lg border border-slate-700 hover:border-primary hover:bg-primary/10 transition-all group bg-slate-800/50"
                  >
                    <p className="text-[10px] font-bold text-slate-200 group-hover:text-primary transition-colors">{c.title}</p>
                    <p className="text-[8px] text-slate-500 uppercase mt-0.5">{c.region}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="space-y-2.5">
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-bold">
                    <span className="text-slate-300">kVp</span>
                    <span className="text-primary bg-primary/10 px-1.5 py-0.5 rounded font-mono">{kvp}</span>
                  </div>
                  <input
                    type="range" min="20" max="120" value={kvp}
                    onChange={(e) => setKvp(parseInt(e.target.value))}
                    disabled={simState !== 'configuring'}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-bold">
                    <span className="text-slate-300">mAs</span>
                    <span className="text-primary bg-primary/10 px-1.5 py-0.5 rounded font-mono">{mas}</span>
                  </div>
                  <input
                    type="range" min="1" max="200" value={mas}
                    onChange={(e) => setMas(parseInt(e.target.value))}
                    disabled={simState !== 'configuring'}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-bold">
                    <span className="text-slate-300">Ruido</span>
                    <span className="text-primary bg-primary/10 px-1.5 py-0.5 rounded font-mono">{sensorNoise}%</span>
                  </div>
                  <input
                    type="range" min="0" max="100" value={sensorNoise}
                    onChange={(e) => setSensorNoise(parseInt(e.target.value))}
                    disabled={simState !== 'configuring'}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>

              {/* Quality Indicators */}
              <div className="space-y-2 pt-2 border-t border-slate-700/50">
                <h4 className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Calidad</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-[7px] font-bold uppercase text-slate-400">
                      <span>Contraste</span>
                      <span className="font-mono">{Math.round(quality.contrast)}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 transition-all duration-300" style={{ width: `${Math.min(100, quality.contrast / 2)}%` }} />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-[7px] font-bold uppercase text-slate-400">
                      <span>Brillo</span>
                      <span className="font-mono">{Math.round(quality.brightness)}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 transition-all duration-300" style={{ width: `${Math.min(100, quality.brightness / 2.5)}%` }} />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-[7px] font-bold uppercase text-slate-400">
                      <span>Ruido</span>
                      <span className="font-mono">{Math.round(quality.noise * 100)}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 transition-all duration-300" style={{ width: `${Math.min(100, quality.noise * 100)}%` }} />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-[7px] font-bold uppercase text-slate-400">
                      <span>Disp</span>
                      <span className="font-mono">{Math.round(quality.scatter * 100)}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-red-400 transition-all duration-300" style={{ width: `${Math.min(100, quality.scatter * 100)}%` }} />
                    </div>
                  </div>
                </div>
                <div className={`text-[9px] font-bold text-center py-1 rounded bg-slate-800/50 ${quality.color}`}>
                  {quality.status}
                </div>
              </div>

              <Button
                className="w-full py-2 text-[10px] shadow-lg"
                icon={Activity}
                onClick={() => {
                  setIsConfigOpen(false);
                  handleCapture();
                }}
                disabled={simState !== 'configuring'}
              >
                Disparar Rayos X
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button for Config Panel */}
      <button 
        onClick={() => setIsConfigOpen(true)}
        className={`absolute top-4 left-4 z-30 size-12 bg-slate-800/90 backdrop-blur-sm text-white rounded-2xl flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.5)] border border-slate-700 transition-all duration-500 ${isConfigOpen ? 'opacity-0 pointer-events-none scale-75 -translate-x-10' : 'opacity-100 scale-100 translate-x-0 hover:bg-slate-700 hover:scale-105'}`}
        title="Abrir Configuración"
      >
        <Settings size={20} />
      </button>

      {/* Close button for the whole simulator */}
      <button 
        onClick={onCancel}
        className="absolute top-4 right-4 z-30 size-12 bg-slate-800/80 hover:bg-red-500/90 text-white rounded-2xl flex items-center justify-center shadow-lg border border-slate-700 transition-colors backdrop-blur-sm"
        title="Cerrar Simulador"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export { XRaySimulator };
