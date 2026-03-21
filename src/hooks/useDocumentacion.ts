import { useState, useEffect, useCallback } from 'react';

interface ContenidoDocumento {
  pasosClave: string[];
  anatomiaVisualizada: string[];
  utilidadClinica: string[];
  criteriosCalidad: string[];
  erroresComunes: string[];
}

interface MetadataDocumento {
  autor: string;
  fechaCreacion: string;
  ultimaRevision: string;
  version: string;
  esEdicionLocal?: boolean;
}

interface Documento {
  id: string;
  titulo: string;
  tituloCompleto: string;
  categoria: string;
  contenido: ContenidoDocumento;
  metadata: MetadataDocumento;
}

interface DocumentacionData {
  version: string;
  ultimaActualizacion: string;
  descripcion: string;
  documentos: Record<string, Documento>;
}

interface UseDocumentacionReturn {
  documentacion: DocumentacionData | null;
  loading: boolean;
  hasOverrides: boolean;
  guardarOverride: (docId: string, contenido: Partial<Documento>) => void;
  exportarDocumentacion: () => void;
  importarDocumentacion: (archivo: File) => Promise<{ success: boolean; error?: string }>;
  resetOverrides: () => void;
  obtenerDocumento: (docId: string) => Documento | undefined;
}

const STORAGE_KEY = 'documentacion-overrides';

export const useDocumentacion = (): UseDocumentacionReturn => {
  const [documentacion, setDocumentacion] = useState<DocumentacionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasOverrides, setHasOverrides] = useState(false);

  // Cargar documentación al inicializar
  useEffect(() => {
    const cargarDocumentacion = async () => {
      try {
        // 1. Cargar JSON base desde el archivo estático
        const response = await fetch('/data/documentacion.json');
        if (!response.ok) {
          throw new Error('Error al cargar documentacion.json');
        }
        const base: DocumentacionData = await response.json();

        // 2. Verificar si hay overrides en localStorage
        const overridesJSON = localStorage.getItem(STORAGE_KEY);
        let overrides: Partial<DocumentacionData> | null = null;
        
        if (overridesJSON) {
          try {
            overrides = JSON.parse(overridesJSON);
          } catch (e) {
            console.error('Error al parsear overrides de localStorage:', e);
            localStorage.removeItem(STORAGE_KEY);
          }
        }

        // 3. Merge inteligente: overrides tienen prioridad
        let final: DocumentacionData = base;
        
        if (overrides && overrides.documentos) {
          final = {
            ...base,
            documentos: {
              ...base.documentos,
              ...overrides.documentos,
            }
          };
          setHasOverrides(true);
        }

        setDocumentacion(final);
      } catch (error) {
        console.error('Error al cargar documentación:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarDocumentacion();
  }, []);

  // Guardar override de un documento específico
  const guardarOverride = useCallback((docId: string, contenido: Partial<Documento>) => {
    if (!documentacion) return;

    // Obtener overrides existentes
    const overridesJSON = localStorage.getItem(STORAGE_KEY);
    const overrides: Partial<DocumentacionData> = overridesJSON 
      ? JSON.parse(overridesJSON) 
      : { version: documentacion.version, documentos: {} };

    // Obtener documento original
    const documentoOriginal = documentacion.documentos[docId];
    
    // Crear documento actualizado con metadata de edición local
    const documentoActualizado: Documento = {
      ...documentoOriginal,
      ...contenido,
      metadata: {
        ...documentoOriginal.metadata,
        ultimaRevision: new Date().toISOString().split('T')[0],
        esEdicionLocal: true,
        version: contenido.metadata?.version || documentoOriginal.metadata.version
      }
    } as Documento;

    // Guardar en overrides
    if (!overrides.documentos) {
      overrides.documentos = {};
    }
    overrides.documentos[docId] = documentoActualizado;

    // Persistir en localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));

    // Actualizar estado local
    setDocumentacion(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        documentos: {
          ...prev.documentos,
          [docId]: documentoActualizado
        }
      };
    });

    setHasOverrides(true);
  }, [documentacion]);

  // Exportar documentación completa a archivo JSON
  const exportarDocumentacion = useCallback(() => {
    if (!documentacion) return;

    const dataStr = JSON.stringify(documentacion, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `documentacion-v${documentacion.version}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [documentacion]);

  // Importar documentación desde archivo JSON
  const importarDocumentacion = useCallback(async (
    archivo: File
  ): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const importado: DocumentacionData = JSON.parse(e.target?.result as string);
          
          // Validar estructura básica
          if (!importado.documentos || typeof importado.documentos !== 'object') {
            resolve({ success: false, error: 'Archivo inválido: no contiene documentos' });
            return;
          }

          // Guardar en localStorage como overrides
          localStorage.setItem(STORAGE_KEY, JSON.stringify(importado));
          
          // Actualizar estado
          setDocumentacion(importado);
          setHasOverrides(true);
          
          resolve({ success: true });
        } catch (error) {
          console.error('Error al importar documentación:', error);
          resolve({ 
            success: false, 
            error: error instanceof Error ? error.message : 'Error al parsear archivo JSON' 
          });
        }
      };

      reader.onerror = () => {
        resolve({ success: false, error: 'Error al leer el archivo' });
      };

      reader.readAsText(archivo);
    });
  }, []);

  // Resetear overrides y volver al JSON base
  const resetOverrides = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHasOverrides(false);
    // Recargar desde el JSON base
    window.location.reload();
  }, []);

  // Obtener un documento específico por ID
  const obtenerDocumento = useCallback((docId: string): Documento | undefined => {
    return documentacion?.documentos[docId];
  }, [documentacion]);

  return {
    documentacion,
    loading,
    hasOverrides,
    guardarOverride,
    exportarDocumentacion,
    importarDocumentacion,
    resetOverrides,
    obtenerDocumento
  };
};
