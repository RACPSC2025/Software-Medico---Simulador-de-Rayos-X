/**
 * Documentación de proyecciones cargada automáticamente desde JSON
 * 
 * USO:
 * - NO hace falta importar nada
 * - Los datos se cargan solos al iniciar
 * - Disponibles globalmente en toda la app
 * 
 * EJEMPLO en componentes:
 * const doc = window.PROJECTION_DOCS['mama-cc-d'];
 * console.log(doc.contenido.pasosClave);
 */

// Se llena automáticamente al cargar la app
(window as any).PROJECTION_DOCS = {};

// Función para cargar (se llama desde main.tsx al iniciar)
export const loadProjectionDocsToGlobal = async () => {
  try {
    const response = await fetch('/data/documentacion.json');
    const data = await response.json();
    
    // Mapear a estructura simple por título
    const docs: Record<string, any> = {};
    Object.values(data.documentos).forEach((doc: any) => {
      docs[doc.titulo] = doc;
    });
    
    // Guardar en window para acceso global
    (window as any).PROJECTION_DOCS = docs;
    
    console.log('✅ Documentación cargada:', Object.keys(docs).length, 'documentos');
    return docs;
  } catch (error) {
    console.error('❌ Error al cargar documentación:', error);
    return {};
  }
};

// Helper para obtener documento por título (desde cualquier lado)
export const getProjectionDoc = (titulo: string) => {
  return (window as any).PROJECTION_DOCS[titulo];
};
