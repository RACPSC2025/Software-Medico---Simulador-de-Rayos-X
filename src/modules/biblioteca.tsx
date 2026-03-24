import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  FileText,
  ChevronRight,
  X,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Pencil,
  Download,
  Upload,
  RotateCcw,
  AlertCircle,
  Eye
} from 'lucide-react';
import { useDocumentacion } from '../hooks/useDocumentacion';
import { EditorDocumento } from './editor-documentacion';
import { OtherImages } from '../assets';

// Helper para obtener docs desde window (inyectados en main.tsx)
const getDocsFromWindow = () => {
  return (window as any).PROJECTION_DOCS || {};
};

interface DocumentoCardProps {
  documento: {
    id: string;
    titulo: string;
    tituloCompleto: string;
    categoria: string;
    metadata: {
      ultimaRevision: string;
      esEdicionLocal?: boolean;
    };
  };
  onClick: () => void;
}

const DocumentoCard: React.FC<DocumentoCardProps> = ({ documento, onClick }) => {
  const categoriaColors: Record<string, string> = {
    'proyecciones': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'proyecciones-protesis': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'proyecciones-protesis-eklund': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'proyecciones-especiales': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'proyecciones-diagnosticas': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  };

  const colorClass = categoriaColors[documento.categoria] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, x: 4 }}
      onClick={onClick}
      className="bg-slate-800/50 rounded-xl p-4 border border-white/10 cursor-pointer hover:border-primary/50 hover:bg-slate-800/80 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${colorClass}`}>
              {documento.categoria.replace(/-/g, ' ')}
            </span>
            {documento.metadata.esEdicionLocal && (
              <span className="text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Editado Localmente
              </span>
            )}
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-1 truncate">
            {documento.titulo}
          </h3>
          <p className="text-[10px] text-slate-400 truncate">
            {documento.tituloCompleto}
          </p>
          <div className="flex items-center gap-2 mt-2 text-[9px] text-slate-500">
            <span>Actualizado: {documento.metadata.ultimaRevision}</span>
          </div>
        </div>
        <ChevronRight 
          size={20} 
          className="text-slate-500 group-hover:text-primary transition-colors shrink-0" 
        />
      </div>
    </motion.div>
  );
};

interface DocumentoDetalleProps {
  documento: {
    id: string;
    titulo: string;
    tituloCompleto: string;
    categoria: string;
    contenido: {
      pasosClave: string[];
      anatomiaVisualizada: string[];
      utilidadClinica: string[];
      criteriosCalidad: string[];
      erroresComunes: string[];
    };
    metadata: {
      autor: string;
      ultimaRevision: string;
      version: string;
      esEdicionLocal?: boolean;
    };
  };
  onBack: () => void;
  onEdit?: () => void;
}

const DocumentoDetalle: React.FC<DocumentoDetalleProps> = ({ documento, onBack, onEdit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="max-w-5xl mx-auto"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Volver a la lista</span>
          </button>
          
          {onEdit && (
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-amber-600/20"
            >
              <Pencil size={16} />
              Editar
            </button>
          )}
        </div>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white uppercase tracking-wide mb-2">
              {documento.titulo}
            </h1>
            <p className="text-sm text-slate-400">
              {documento.tituloCompleto}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-12 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
              <FileText size={24} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">
            Autor: {documento.metadata.autor}
          </span>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">
            Versión: {documento.metadata.version}
          </span>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">
            Última revisión: {documento.metadata.ultimaRevision}
          </span>
          {documento.metadata.esEdicionLocal && (
            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Editado Localmente
            </span>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna Izquierda */}
        <div className="space-y-6">
          {/* Pasos Clave */}
          <section className="bg-slate-800/50 rounded-xl p-5 border border-amber-500/20">
            <h4 className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <div className="size-6 bg-amber-500/20 rounded-md flex items-center justify-center">
                <Activity size={14} />
              </div>
              Pasos Clave del Posicionamiento
            </h4>
            <ol className="space-y-3">
              {documento.contenido.pasosClave.map((paso, idx) => (
                <li key={idx} className="text-sm text-slate-200 flex gap-3 leading-relaxed">
                  <span className="shrink-0 w-6 h-6 bg-amber-500/30 rounded-full flex items-center justify-center text-[11px] font-bold text-amber-400">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5">{paso}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Anatomía Visualizada */}
          <section className="bg-slate-800/50 rounded-xl p-5 border border-white/10">
            <h4 className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <div className="size-6 bg-amber-500/20 rounded-md flex items-center justify-center">
                <Activity size={14} />
              </div>
              Anatomía Visualizada
            </h4>
            <ul className="space-y-2">
              {documento.contenido.anatomiaVisualizada.map((item, idx) => (
                <li key={idx} className="text-sm text-slate-200 flex gap-3 leading-relaxed">
                  <span className="shrink-0 w-2 h-2 bg-amber-500 rounded-full mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Columna Derecha */}
        <div className="space-y-6">
          {/* Utilidad Clínica */}
          <section className="bg-slate-800/50 rounded-xl p-5 border border-white/10">
            <h4 className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <div className="size-6 bg-amber-500/20 rounded-md flex items-center justify-center">
                <Activity size={14} />
              </div>
              Utilidad Clínica
            </h4>
            <ul className="space-y-2">
              {documento.contenido.utilidadClinica.map((item, idx) => (
                <li key={idx} className="text-sm text-slate-200 flex gap-3 leading-relaxed">
                  <span className="shrink-0 w-2 h-2 bg-amber-500 rounded-full mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Criterios de Calidad */}
          <section className="bg-emerald-900/20 rounded-xl p-5 border border-emerald-500/30">
            <h4 className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <div className="size-6 bg-emerald-500/20 rounded-md flex items-center justify-center">
                <CheckCircle2 size={14} />
              </div>
              Criterios de Calidad
            </h4>
            <ul className="space-y-2">
              {documento.contenido.criteriosCalidad.map((item, idx) => (
                <li key={idx} className="text-sm text-slate-200 flex gap-3 leading-relaxed">
                  <span className="shrink-0 text-emerald-500 mt-0.5">✅</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Errores Comunes */}
          <section className="bg-red-900/20 rounded-xl p-5 border border-red-500/30">
            <h4 className="text-[11px] font-bold text-red-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <div className="size-6 bg-red-500/20 rounded-md flex items-center justify-center">
                <AlertTriangle size={14} />
              </div>
              Errores Comunes
            </h4>
            <ul className="space-y-2">
              {documento.contenido.erroresComunes.map((item, idx) => (
                <li key={idx} className="text-sm text-slate-200 flex gap-3 leading-relaxed">
                  <span className="shrink-0 text-red-500 mt-0.5">❌</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

const MamografoVisualGuide = ({ onPreview }: { onPreview: (img: string, title: string) => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-primary/20 p-8 overflow-hidden relative"
  >
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
          <BookOpen className="text-primary" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight">Conociendo el Mamógrafo</h2>
          <p className="text-xs text-slate-400">Guía visual de los componentes externos y partes del equipo técnico</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Parte 1: El Equipo */}
        <div className="space-y-4">
          <div 
            onClick={() => onPreview(OtherImages.MAMOGRAFO_1, "Máquina de Mamografía - Componentes Generales")}
            className="relative aspect-video rounded-xl overflow-hidden border border-white/5 bg-black/40 group cursor-zoom-in"
          >
            <img 
              src={OtherImages.MAMOGRAFO_1} 
              alt="Maquina de Mamografía" 
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="size-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary backdrop-blur-sm">
                <Eye size={24} />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:opacity-0 transition-opacity" />
            <div className="absolute bottom-4 left-4">
              <span className="text-[10px] font-black text-primary uppercase bg-primary/10 px-2 py-1 rounded-md border border-primary/20">Componentes Generales</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed italic border-l-2 border-primary/30 pl-4">
            Visualización frontal del estativo y brazo en C, permitiendo una amplia gama de movimientos para el posicionamiento óptimo del paciente.
          </p>
        </div>

        {/* Parte 2: El Tablero / Partes */}
        <div className="space-y-4">
          <div 
            onClick={() => onPreview(OtherImages.MAMOGRAFO_2, "Partes del Mamógrafo - Identificación Técnica")}
            className="relative aspect-video rounded-xl overflow-hidden border border-white/5 bg-black/40 group cursor-zoom-in"
          >
            <img 
              src={OtherImages.MAMOGRAFO_2} 
              alt="Partes del Mamógrafo" 
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="size-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 backdrop-blur-sm">
                <Eye size={24} />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:opacity-0 transition-opacity" />
            <div className="absolute bottom-4 left-4">
              <span className="text-[10px] font-black text-emerald-400 uppercase bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">Identificación de Partes</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed italic border-l-2 border-emerald-500/30 pl-4">
            Detalle técnico de los controles de compresión, colimadores y sistemas de visualización directa del equipo.
          </p>
        </div>
      </div>
    </div>

    {/* Decoración fondo */}
    <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[100px] pointer-events-none" />
  </motion.div>
);

export const Biblioteca: React.FC = () => {
  const { guardarOverride, exportarDocumentacion, importarDocumentacion, resetOverrides, hasOverrides } = useDocumentacion();
  const [vista, setVista] = useState<'lista' | 'detalle' | 'editar'>('lista');
  const [docSeleccionado, setDocSeleccionado] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('todas');
  const [mensajeImportacion, setMensajeImportacion] = useState<{ tipo: 'success' | 'error', texto: string } | null>(null);
  const [previewImage, setPreviewImage] = useState<{ url: string, title: string } | null>(null);

  // Obtener documentos desde window (inyectados en main.tsx)
  const docsFromWindow = getDocsFromWindow();
  const documentosArray = Object.values(docsFromWindow);

  // Filtrar documentos por búsqueda y categoría
  const documentosFiltrados = useMemo(() => {
    return documentosArray.filter((doc: any) => {
      const coincideBusqueda =
        doc.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        doc.tituloCompleto.toLowerCase().includes(busqueda.toLowerCase());

      const coincideCategoria =
        categoriaFiltro === 'todas' || doc.categoria === categoriaFiltro;

      return coincideBusqueda && coincideCategoria;
    });
  }, [documentosArray, busqueda, categoriaFiltro]);

  // Obtener categorías únicas
  const categorias = useMemo(() => {
    return Array.from(new Set(documentosArray.map((d: any) => d.categoria)));
  }, [documentosArray]);

  const handleVerDetalle = (docId: string) => {
    setDocSeleccionado(docId);
    setVista('detalle');
  };

  const handleEditar = () => {
    setVista('editar');
  };

  const handleGuardarEdicion = (contenidoEditado: any) => {
    if (docSeleccionado) {
      guardarOverride(docSeleccionado, contenidoEditado);
    }
  };

  const handleExportar = () => {
    exportarDocumentacion();
  };

  const handleImportarClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const resultado = await importarDocumentacion(file);
        if (resultado.success) {
          setMensajeImportacion({
            tipo: 'success',
            texto: 'Documentación importada exitosamente'
          });
        } else {
          setMensajeImportacion({
            tipo: 'error',
            texto: resultado.error || 'Error al importar'
          });
        }
        setTimeout(() => setMensajeImportacion(null), 5000);
      }
    };
    input.click();
  };

  const handleReset = () => {
    if (window.confirm('¿Estás seguro de descartar todas las ediciones locales y volver a la documentación original? Esta acción no se puede deshacer.')) {
      resetOverrides();
    }
  };

  const handleVolver = () => {
    setVista('lista');
    setDocSeleccionado(null);
  };

  return (
    <div className="h-full overflow-y-auto bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="size-12 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
                <BookOpen size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white uppercase tracking-wide">
                  Biblioteca de Documentación
                </h1>
                <p className="text-sm text-slate-400">
                  Material educativo para formación de profesionales en mamografía
                </p>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportar}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-emerald-600/20"
              >
                <Download size={16} />
                Exportar
              </button>
              <button
                onClick={handleImportarClick}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-blue-600/20"
              >
                <Upload size={16} />
                Importar
              </button>
              {hasOverrides && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-red-600/20"
                >
                  <RotateCcw size={16} />
                  Resetear
                </button>
              )}
            </div>
          </div>

          {mensajeImportacion && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-4 p-3 rounded-lg flex items-center gap-3 ${
                mensajeImportacion.tipo === 'success'
                  ? 'bg-emerald-500/20 border border-emerald-500/30'
                  : 'bg-red-500/20 border border-red-500/30'
              }`}
            >
              {mensajeImportacion.tipo === 'success' ? (
                <CheckCircle2 size={20} className="text-emerald-400" />
              ) : (
                <AlertCircle size={20} className="text-red-400" />
              )}
              <p className={`text-sm font-bold ${
                mensajeImportacion.tipo === 'success' ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {mensajeImportacion.texto}
              </p>
            </motion.div>
          )}

          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <div className="flex-1 relative">
              <Search 
                size={18} 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" 
              />
              <input
                type="text"
                placeholder="Buscar por título o nombre..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary/50"
              />
            </div>

            <select
              value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value)}
              className="px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-sm text-white focus:outline-none border-transparent focus:border-primary/50"
            >
              <option value="todas">Todas las categorías</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 text-[10px] text-slate-500 uppercase tracking-wider mb-6">
            {documentosFiltrados.length} de {documentosArray.length} documentos
          </div>

          {vista === 'lista' && <MamografoVisualGuide onPreview={(img, title) => setPreviewImage({ url: img, title })} />}
        </div>

        <AnimatePresence mode="wait">
          {vista === 'lista' ? (
            <motion.div key="lista" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documentosFiltrados.map((doc) => (
                  <DocumentoCard key={doc.id} documento={doc} onClick={() => handleVerDetalle(doc.id)} />
                ))}
              </div>
            </motion.div>
          ) : vista === 'editar' ? (
            <motion.div key="editar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {docSeleccionado && docsFromWindow[docSeleccionado] && (
                <EditorDocumento documento={docsFromWindow[docSeleccionado]} onSave={handleGuardarEdicion} onCancel={handleVolver} />
              )}
            </motion.div>
          ) : (
            <motion.div key="detalle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {docSeleccionado && docsFromWindow[docSeleccionado] && (
                <DocumentoDetalle documento={docsFromWindow[docSeleccionado]} onBack={handleVolver} onEdit={handleEditar} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal de Previsualización */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 lg:p-10"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <div className="p-4 bg-slate-800 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{previewImage.title}</h3>
                <button
                  onClick={() => setPreviewImage(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
              <div className="p-2 bg-black flex items-center justify-center min-h-[50vh] max-h-[70vh]">
                <img 
                  src={previewImage.url} 
                  alt={previewImage.title} 
                  className="max-w-full max-h-full object-contain shadow-2xl"
                />
              </div>
              <div className="p-4 bg-slate-800 border-t border-white/10 text-center text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] cursor-pointer" onClick={() => setPreviewImage(null)}>
                Click para cerrar previsualización
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
