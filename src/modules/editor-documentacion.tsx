import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Save,
  Eye,
  Pencil,
  Check,
  AlertCircle,
  ArrowLeft,
  FileText,
  Activity,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface ContenidoDocumento {
  pasosClave: string[];
  anatomiaVisualizada: string[];
  utilidadClinica: string[];
  criteriosCalidad: string[];
  erroresComunes: string[];
}

interface Documento {
  id: string;
  titulo: string;
  tituloCompleto: string;
  categoria: string;
  contenido: ContenidoDocumento;
  metadata: {
    autor: string;
    fechaCreacion: string;
    ultimaRevision: string;
    version: string;
    esEdicionLocal?: boolean;
  };
}

interface EditorDocumentoProps {
  documento: Documento;
  onSave: (contenido: Partial<Documento>) => void;
  onCancel: () => void;
}

interface CampoEditableProps {
  titulo: string;
  icono: React.ReactNode;
  colorClass: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}

const CampoEditable: React.FC<CampoEditableProps> = ({
  titulo,
  icono,
  colorClass,
  items,
  onChange,
  placeholder = 'Agregar item...'
}) => {
  const [nuevoItem, setNuevoItem] = useState('');

  const handleAgregarItem = useCallback(() => {
    if (nuevoItem.trim()) {
      onChange([...items, nuevoItem.trim()]);
      setNuevoItem('');
    }
  }, [nuevoItem, items, onChange]);

  const handleEliminarItem = useCallback((index: number) => {
    onChange(items.filter((_, i) => i !== index));
  }, [items, onChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAgregarItem();
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-xl p-5 border border-white/10">
      <h4 className={`text-[11px] font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${colorClass}`}>
        {icono}
        {titulo}
      </h4>

      {/* Lista de items existentes */}
      <div className="space-y-2 mb-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="flex items-start gap-3 group"
          >
            <span className="shrink-0 w-2 h-2 bg-slate-500 rounded-full mt-1.5" />
            <span className="flex-1 text-sm text-slate-200 leading-relaxed">{item}</span>
            <button
              onClick={() => handleEliminarItem(index)}
              className="shrink-0 p-1 text-slate-500 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all"
              title="Eliminar"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Input para agregar nuevo item */}
      <div className="flex gap-2">
        <input
          type="text"
          value={nuevoItem}
          onChange={(e) => setNuevoItem(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition-all"
        />
        <button
          onClick={handleAgregarItem}
          disabled={!nuevoItem.trim()}
          className="px-3 py-2 bg-primary/20 border border-primary/30 rounded-lg text-primary hover:bg-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          title="Agregar (Enter)"
        >
          <Check size={16} />
        </button>
      </div>
    </div>
  );
};

export const EditorDocumento: React.FC<EditorDocumentoProps> = ({
  documento,
  onSave,
  onCancel
}) => {
  const [vista, setVista] = useState<'editar' | 'preview'>('editar');
  const [contenidoEditado, setContenidoEditado] = useState<ContenidoDocumento>({
    ...documento.contenido
  });
  const [guardado, setGuardado] = useState(false);

  const handleGuardar = useCallback(() => {
    onSave({
      contenido: contenidoEditado,
      metadata: {
        ...documento.metadata,
        ultimaRevision: new Date().toISOString().split('T')[0],
        esEdicionLocal: true
      }
    });
    setGuardado(true);
    setTimeout(() => {
      onCancel();
    }, 1500);
  }, [contenidoEditado, documento.metadata, onSave, onCancel]);

  const handleCancel = useCallback(() => {
    if (window.confirm('¿Descartar los cambios no guardados?')) {
      onCancel();
    }
  }, [onCancel]);

  const handleKeyDown = (e: React.KeyboardEvent, field: keyof ContenidoDocumento) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      if (target.value.trim()) {
        setContenidoEditado(prev => ({
          ...prev,
          [field]: [...prev[field], target.value.trim()]
        }));
        target.value = '';
      }
    }
  };

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
            onClick={handleCancel}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Cancelar</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Toggle Vista/Editor */}
            <div className="flex bg-slate-800/50 rounded-lg p-1 border border-white/10">
              <button
                onClick={() => setVista('editar')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                  vista === 'editar'
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Pencil size={14} />
                Editar
              </button>
              <button
                onClick={() => setVista('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                  vista === 'preview'
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye size={14} />
                Vista Previa
              </button>
            </div>

            {/* Botón Guardar */}
            <button
              onClick={handleGuardar}
              disabled={guardado}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-emerald-600/20"
            >
              {guardado ? (
                <>
                  <Check size={16} />
                  Guardado
                </>
              ) : (
                <>
                  <Save size={16} />
                  Guardar
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white uppercase tracking-wide mb-2">
              Editar: {documento.titulo}
            </h1>
            <p className="text-sm text-slate-400">
              {documento.tituloCompleto}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-12 bg-amber-500/20 rounded-xl flex items-center justify-center border border-amber-500/30">
              <Pencil size={24} className="text-amber-400" />
            </div>
          </div>
        </div>

        {guardado && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-center gap-3"
          >
            <CheckCircle2 size={20} className="text-emerald-400" />
            <div>
              <p className="text-sm font-bold text-emerald-400">¡Cambios guardados exitosamente!</p>
              <p className="text-xs text-emerald-300">Redirigiendo...</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Contenido */}
      {vista === 'editar' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Columna Izquierda */}
          <div className="space-y-6">
            <CampoEditable
              titulo="Pasos Clave del Posicionamiento"
              icono={<Activity size={14} />}
              colorClass="text-amber-400"
              items={contenidoEditado.pasosClave}
              onChange={(items) => setContenidoEditado(prev => ({ ...prev, pasosClave: items }))}
              placeholder="Ej: Colocar paciente frente al mamógrafo..."
            />

            <CampoEditable
              titulo="Anatomía Visualizada"
              icono={<Activity size={14} />}
              colorClass="text-amber-400"
              items={contenidoEditado.anatomiaVisualizada}
              onChange={(items) => setContenidoEditado(prev => ({ ...prev, anatomiaVisualizada: items }))}
              placeholder="Ej: Cuadrante superior externo..."
            />
          </div>

          {/* Columna Derecha */}
          <div className="space-y-6">
            <CampoEditable
              titulo="Utilidad Clínica"
              icono={<Activity size={14} />}
              colorClass="text-amber-400"
              items={contenidoEditado.utilidadClinica}
              onChange={(items) => setContenidoEditado(prev => ({ ...prev, utilidadClinica: items }))}
              placeholder="Ej: Detectar lesiones en..."
            />

            <CampoEditable
              titulo="Criterios de Calidad"
              icono={<CheckCircle2 size={14} />}
              colorClass="text-emerald-400"
              items={contenidoEditado.criteriosCalidad}
              onChange={(items) => setContenidoEditado(prev => ({ ...prev, criteriosCalidad: items }))}
              placeholder="Ej: Pezón visualizado de perfil..."
            />

            <CampoEditable
              titulo="Errores Comunes"
              icono={<AlertTriangle size={14} />}
              colorClass="text-red-400"
              items={contenidoEditado.erroresComunes}
              onChange={(items) => setContenidoEditado(prev => ({ ...prev, erroresComunes: items }))}
              placeholder="Ej: Movimiento durante la exposición..."
            />
          </div>
        </div>
      ) : (
        /* Vista Previa */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <section className="bg-slate-800/50 rounded-xl p-5 border border-amber-500/20">
              <h4 className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <div className="size-6 bg-amber-500/20 rounded-md flex items-center justify-center">
                  <Activity size={14} />
                </div>
                Pasos Clave del Posicionamiento
              </h4>
              <ol className="space-y-3">
                {contenidoEditado.pasosClave.map((paso, idx) => (
                  <li key={idx} className="text-sm text-slate-200 flex gap-3 leading-relaxed">
                    <span className="shrink-0 w-6 h-6 bg-amber-500/30 rounded-full flex items-center justify-center text-[11px] font-bold text-amber-400">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5">{paso}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="bg-slate-800/50 rounded-xl p-5 border border-white/10">
              <h4 className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <div className="size-6 bg-amber-500/20 rounded-md flex items-center justify-center">
                  <Activity size={14} />
                </div>
                Anatomía Visualizada
              </h4>
              <ul className="space-y-2">
                {contenidoEditado.anatomiaVisualizada.map((item, idx) => (
                  <li key={idx} className="text-sm text-slate-200 flex gap-3 leading-relaxed">
                    <span className="shrink-0 w-2 h-2 bg-amber-500 rounded-full mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="space-y-6">
            <section className="bg-slate-800/50 rounded-xl p-5 border border-white/10">
              <h4 className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <div className="size-6 bg-amber-500/20 rounded-md flex items-center justify-center">
                  <Activity size={14} />
                </div>
                Utilidad Clínica
              </h4>
              <ul className="space-y-2">
                {contenidoEditado.utilidadClinica.map((item, idx) => (
                  <li key={idx} className="text-sm text-slate-200 flex gap-3 leading-relaxed">
                    <span className="shrink-0 w-2 h-2 bg-amber-500 rounded-full mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-emerald-900/20 rounded-xl p-5 border border-emerald-500/30">
              <h4 className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <div className="size-6 bg-emerald-500/20 rounded-md flex items-center justify-center">
                  <CheckCircle2 size={14} />
                </div>
                Criterios de Calidad
              </h4>
              <ul className="space-y-2">
                {contenidoEditado.criteriosCalidad.map((item, idx) => (
                  <li key={idx} className="text-sm text-slate-200 flex gap-3 leading-relaxed">
                    <span className="shrink-0 text-emerald-500 mt-0.5">✅</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-red-900/20 rounded-xl p-5 border border-red-500/30">
              <h4 className="text-[11px] font-bold text-red-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <div className="size-6 bg-red-500/20 rounded-md flex items-center justify-center">
                  <AlertTriangle size={14} />
                </div>
                Errores Comunes
              </h4>
              <ul className="space-y-2">
                {contenidoEditado.erroresComunes.map((item, idx) => (
                  <li key={idx} className="text-sm text-slate-200 flex gap-3 leading-relaxed">
                    <span className="shrink-0 text-red-500 mt-0.5">❌</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      )}

      {/* Footer informativo */}
      <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3">
        <AlertCircle size={18} className="text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs text-amber-300 font-bold uppercase mb-1">
            Edición Local
          </p>
          <p className="text-[10px] text-amber-200/80 leading-relaxed">
            Los cambios se guardarán únicamente en este dispositivo (localStorage). 
            Para compartir las modificaciones, usa la función "Exportar" en la Biblioteca.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
