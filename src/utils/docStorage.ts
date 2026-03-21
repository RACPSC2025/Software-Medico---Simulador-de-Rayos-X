/**
 * Utilidades para el manejo de almacenamiento de documentación
 * Sistema híbrido: localStorage + JSON exportable
 */

const STORAGE_KEY = 'documentacion-overrides';

/**
 * Verifica si hay overrides guardados en localStorage
 */
export const hasLocalOverrides = (): boolean => {
  return localStorage.getItem(STORAGE_KEY) !== null;
};

/**
 * Obtiene los overrides actuales del localStorage
 */
export const getLocalOverrides = <T>(): T | null => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  
  try {
    return JSON.parse(data) as T;
  } catch (error) {
    console.error('Error al parsear overrides:', error);
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

/**
 * Guarda overrides en localStorage
 */
export const saveLocalOverrides = (data: unknown): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error al guardar overrides:', error);
    throw new Error('No se pudo guardar la documentación local');
  }
};

/**
 * Elimina los overrides del localStorage
 */
export const clearLocalOverrides = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

/**
 * Exporta datos a archivo JSON descargable
 */
export const exportToJsonFile = (data: unknown, filename: string): void => {
  const dataStr = JSON.stringify(data, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Importa datos desde archivo JSON
 */
export const importFromJsonFile = (
  archivo: File
): Promise<{ success: boolean; data?: unknown; error?: string }> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        resolve({ success: true, data });
      } catch (error) {
        resolve({ 
          success: false, 
          error: error instanceof Error ? error.message : 'JSON inválido' 
        });
      }
    };

    reader.onerror = () => {
      resolve({ success: false, error: 'Error al leer el archivo' });
    };

    reader.readAsText(archivo);
  });
};

/**
 * Genera nombre de archivo con timestamp
 */
export const generateFilename = (prefix: string, version: string): string => {
  const date = new Date().toISOString().split('T')[0];
  return `${prefix}-v${version}-${date}.json`;
};

/**
 * Valida la estructura básica de un documento
 */
export const validateDocumentoStructure = (doc: unknown): boolean => {
  if (!doc || typeof doc !== 'object') return false;
  
  const docAsAny = doc as Record<string, unknown>;
  
  // Campos requeridos
  const requiredFields = ['id', 'titulo', 'contenido', 'metadata'];
  for (const field of requiredFields) {
    if (!(field in docAsAny)) return false;
  }
  
  // Validar contenido
  if (!docAsAny.contenido || typeof docAsAny.contenido !== 'object') return false;
  
  const contenido = docAsAny.contenido as Record<string, unknown>;
  const contenidoFields = ['pasosClave', 'anatomiaVisualizada', 'utilidadClinica'];
  for (const field of contenidoFields) {
    if (!Array.isArray(contenido[field])) return false;
  }
  
  return true;
};

/**
 * Compara dos versiones de un documento y devuelve las diferencias
 */
export const compareDocumentVersions = (
  original: Record<string, unknown>,
  modified: Record<string, unknown>
): string[] => {
  const differences: string[] = [];
  
  const flattenObject = (obj: Record<string, unknown>, prefix = ''): Record<string, unknown> => {
    return Object.keys(obj).reduce((acc, key) => {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(acc, flattenObject(value as Record<string, unknown>, newKey));
      } else {
        acc[newKey] = value;
      }
      
      return acc;
    }, {} as Record<string, unknown>);
  };
  
  const flatOriginal = flattenObject(original);
  const flatModified = flattenObject(modified);
  
  for (const key in flatModified) {
    if (JSON.stringify(flatOriginal[key]) !== JSON.stringify(flatModified[key])) {
      differences.push(key);
    }
  }
  
  return differences;
};
