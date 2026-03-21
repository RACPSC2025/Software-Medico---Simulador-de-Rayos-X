/**
 * Hook para cargar documentación desde JSON estático
 * Versión ligera para usar en componentes que solo necesitan lectura
 */

import { useState, useEffect } from 'react';

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
  };
}

interface DocumentacionData {
  version: string;
  ultimaActualizacion: string;
  descripcion: string;
  documentos: Record<string, Documento>;
}

/**
 * Carga documentación desde JSON estático
 * @returns Promise con los datos de documentación
 */
const cargarDocumentacionDesdeJSON = async (): Promise<DocumentacionData> => {
  const response = await fetch('/data/documentacion.json');
  if (!response.ok) {
    throw new Error('Error al cargar documentacion.json');
  }
  return response.json();
};

/**
 * Hook para cargar ProjectionDocs desde JSON
 * 
 * @example
 * // En componente:
 * const { docs, loading, error } = useProjectionDocs();
 * 
 * // Usar:
 * if (loading) return <Loading />;
 * if (error) return <Error />;
 * return <div>{docs['mama-cc-d'].titulo}</div>;
 */
export const useProjectionDocs = () => {
  const [docs, setDocs] = useState<Record<string, Documento>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    cargarDocumentacionDesdeJSON()
      .then((data) => {
        if (mounted) {
          setDocs(data.documentos);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { docs, loading, error };
};

/**
 * Función síncrona para obtener ProjectionDocs
 * Nota: Solo usar cuando el JSON ya está cacheado en el navegador
 * 
 * @deprecated Usar useProjectionDocs hook en su lugar
 */
export const getProjectionDocsSync = (): Record<string, Documento> => {
  // Esta función asume que el navegador ya tiene el JSON en caché
  // No recomendado para uso en producción
  return {};
};

/**
 * Helper para mapear IDs antiguos a nuevos IDs del JSON
 * Útil para mantener compatibilidad con código existente
 */
export const mapProjectionId = (oldId: string): string => {
  const mapping: Record<string, string> = {
    // Mapeo directo (los IDs ya coinciden)
    'MAMA CC D': 'mama-cc-d',
    'MAMA CC I': 'mama-cc-i',
    'MAMA MLO D': 'mama-mlo-d',
    'MAMA MLO I': 'mama-mlo-i',
    'MAMA CC D PROTESIS': 'mama-cc-d-protesis',
    'MAMA CC I PROTESIS': 'mama-cc-i-protesis',
    'MAMA MLO D PROTESIS': 'mama-mlo-d-protesis',
    'MAMA MLO I PROTESIS': 'mama-mlo-i-protesis',
    'MAMA CC D PROTESIS EKLUND': 'mama-cc-d-protesis-eklund',
    'MAMA CC I PROTESIS EKLUND': 'mama-cc-i-protesis-eklund',
    'MAMA MLO D PROTESIS EKLUND': 'mama-mlo-d-protesis-eklund',
    'MAMA MLO I PROTESIS EKLUND': 'mama-mlo-i-protesis-eklund',
    'MAMA CV': 'mama-cv',
    'MAMA CC MAG': 'mama-cc-mag',
  };
  return mapping[oldId] || oldId.toLowerCase().replace(/\s+/g, '-');
};

/**
 * Helper para obtener documento por título (compatibilidad)
 * 
 * @param titulo - Título de la proyección (ej: 'MAMA CC D')
 * @param docs - Documentos cargados desde JSON
 * @returns Documento o undefined
 */
export const getDocumentoByTitulo = (
  titulo: string,
  docs: Record<string, Documento>
): Documento | undefined => {
  const id = mapProjectionId(titulo);
  return docs[id];
};
