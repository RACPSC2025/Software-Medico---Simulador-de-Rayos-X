// Mamografías Básicas - Versiones PNG
import mama_cc_d from './MAMA CC D.png';
import mama_cc_i from './MAMA CC I.png';
import mama_mlo_d from './MAMA MLO D.png';
import mama_mlo_i from './MAMA MLO I.png';

// Mamografías con Prótesis
import mama_cc_d_protesis from './MAMA CC D PROTESIS.png';
import mama_cc_i_protesis from './MAMA CC I PROTESIS.png';
import mama_mlo_d_protesis from './MAMA MLO D PROTESIS.jpg';
import mama_mlo_i_protesis from './MAMA MLO I PROTESIS.jpg';

// Mamografías con Prótesis - Técnica Eklund
import mama_cc_d_protesis_eklund from './MAMA CC D PROTESIS EKLUND.png';
import mama_cc_i_protesis_eklund from './MAMA CC I PROTESIS EKLUND.png';
import mama_mlo_d_protesis_eklund from './MAMA MLO D PROTESIS EKLUND.png';
import mama_mlo_i_protesis_eklund from './MAMA MLO I PROTESIS EKLUND.png';

// Proyecciones - Guías de Posicionamiento
import mama_cc_1 from './Proyecciones/MAMA CC 1.png';
import mama_cc_2 from './Proyecciones/MAMA CC 2.png';
import mama_cv_pos from './Proyecciones/MAMA CV.png';
import mama_eklund_tecnica from './Proyecciones/MAMA EKLUND TECNICA.webp';
import mama_lm from './Proyecciones/MAMA LM.png';
import mama_ml_1 from './Proyecciones/MAMA ML 1.png';
import mama_mlo_1 from './Proyecciones/MAMA MLO 1.png';
import mama_mx_mag_axilar from './Proyecciones/MAMA MX MAG Axilar Proyeccion.png';
import mamografo from './Proyecciones/Mamografo.jpg';
import maquina_mamografia from './Proyecciones/Maquina de Mamografia.webp';
import partes_mamografo from './Proyecciones/partes-mamografo.webp';
import proyeccion_magnificacion from './Proyecciones/Proyeccion de Magnificacion - Posicionamiento.jpg';

// Mamografías Especiales
import mama_cc_mag from './CC MAG Proyeccion de Magnificacion - Radiografia.jpg';
import mama_cv from './MAMA CV.jpeg';
import mama_cc_protesis_unidas from './MAMA CC PROTESIS UNIDAS.png';
import mama_completa_protesis from './MAMA COMPLETA PROTESIS.png';
import mama_completa_protesis_eklund from './MAMA COMPLETA PROTESIS EKLUND.png';

// Otras imágenes
import avatar from './AVATAR.png';
import mama_completa_basico from './MAMA COMPLETA BASICO.jpeg';
import axilar_derecha_izquierda from './Axilar Derecha e Izquierda.jpeg';

export const MammographyImages: { [key: string]: string } = {
  // Básicas
  'MAMA CC D': mama_cc_d,
  'MAMA CC I': mama_cc_i,
  'MAMA MLO D': mama_mlo_d,
  'MAMA MLO I': mama_mlo_i,
  // Con Prótesis
  'MAMA CC D PROTESIS': mama_cc_d_protesis,
  'MAMA CC I PROTESIS': mama_cc_i_protesis,
  'MAMA MLO D PROTESIS': mama_mlo_d_protesis,
  'MAMA MLO I PROTESIS': mama_mlo_i_protesis,
  // Con Prótesis - Técnica Eklund
  'MAMA CC D PROTESIS EKLUND': mama_cc_d_protesis_eklund,
  'MAMA CC I PROTESIS EKLUND': mama_cc_i_protesis_eklund,
  'MAMA MLO D PROTESIS EKLUND': mama_mlo_d_protesis_eklund,
  'MAMA MLO I PROTESIS EKLUND': mama_mlo_i_protesis_eklund,
  // Especiales
  'MAMA CC MAG': mama_cc_mag,
  'MAMA CV': mama_cv,
  'MAMA CC PROTESIS UNIDAS': mama_cc_protesis_unidas,
  'MAMA COMPLETA PROTESIS': mama_completa_protesis,
  'MAMA COMPLETA PROTESIS EKLUND': mama_completa_protesis_eklund,
};

export const OtherImages = {
  AVATAR: avatar,
  RADIO_FINAL_BASICO: mama_completa_basico,
  RADIO_FINAL_PROTESIS: mama_completa_protesis,
  RADIO_FINAL_PROTESIS_EKLUND: mama_completa_protesis_eklund,
  AXILAR: axilar_derecha_izquierda,
};

// Guías de Posicionamiento por tipo de proyección
export const PositioningGuides: { [key: string]: string[] } = {
  // MAMA CC (tanto D como I, con/sin prótesis) - usan las mismas guías
  'MAMA CC D': [mama_cc_1, mama_cc_2],
  'MAMA CC I': [mama_cc_1, mama_cc_2],
  'MAMA CC D PROTESIS': [mama_cc_1, mama_cc_2],
  'MAMA CC I PROTESIS': [mama_cc_1, mama_cc_2],
  'MAMA CC D PROTESIS EKLUND': [mama_cc_1, mama_cc_2],
  'MAMA CC I PROTESIS EKLUND': [mama_cc_1, mama_cc_2],
  // MAMA MLO
  'MAMA MLO D': [mama_mlo_1],
  'MAMA MLO I': [mama_mlo_1],
  'MAMA MLO D PROTESIS': [mama_mlo_1],
  'MAMA MLO I PROTESIS': [mama_mlo_1],
  'MAMA MLO D PROTESIS EKLUND': [mama_mlo_1, mama_eklund_tecnica],
  'MAMA MLO I PROTESIS EKLUND': [mama_mlo_1, mama_eklund_tecnica],
  // MAMA CV
  'MAMA CV': [mama_cv_pos],
  // MAMA CC MAG
  'MAMA CC MAG': [proyeccion_magnificacion],
  // Axilar
  'MAMA MX MAG AXILAR': [mama_mx_mag_axilar],
};

/**
 * ProjectionDocs cargado desde JSON
 * 
 * NOTA: Esta función asíncrona carga los datos desde el JSON estático.
 * Para usar en componentes React, preferir el hook useProjectionDocs.
 * 
 * @example
 * // En componente React:
 * const { docs, loading } = useProjectionDocs();
 * 
 * // Fuera de React (con cuidado):
 * const docs = await loadProjectionDocs();
 */
export const loadProjectionDocs = async (): Promise<Record<string, {
  pasosClave: string[];
  anatomiaVisualizada: string[];
  utilidadClinica: string[];
  criteriosCalidad: string[];
  erroresComunes: string[];
}>> => {
  const response = await fetch('/data/documentacion.json');
  const data = await response.json();
  
  // Mapear a la estructura antigua para compatibilidad
  const projectionDocs: Record<string, any> = {};
  
  Object.values(data.documentos).forEach((doc: any) => {
    // Convertir ID del JSON al formato antiguo (ej: 'mama-cc-d' → 'MAMA CC D')
    const tituloOriginal = doc.titulo;
    projectionDocs[tituloOriginal] = doc.contenido;
  });
  
  return projectionDocs;
};

// Placeholder vacío para compatibilidad
// El código existente que usa ProjectionDocs directamente debería migrar a useProjectionDocs
export const ProjectionDocs: Record<string, {
  pasosClave: string[];
  anatomiaVisualizada: string[];
  utilidadClinica: string[];
  criteriosCalidad: string[];
  erroresComunes: string[];
}> = {};

// Imágenes de Rayos X por región (placeholders - agregar archivos a la carpeta assets)
// Por ahora usan las mismas imágenes de mamografía como placeholder
export const XRayImages: { [key: string]: { [key: string]: string } } = {
  chest: {
    'TORAX PA': mama_cc_d,
    'TORAX RF': mama_cc_i,
    'TORAX LRT': mama_mlo_d,
    'TORAX PA INU': mama_mlo_i,
    'COSTILLAS': mama_cc_d,
    'EXTERNON': mama_cc_i,
    'D - COLUMNA': mama_mlo_d,
  },
  head: {
    'Cráneo AP': mama_cc_d,
    'Cráneo Lateral': mama_cc_i,
    'Senos Paranasales': mama_mlo_d,
  },
  abdomen: {
    'Abdomen AP': mama_cc_d,
    'Abdomen Lateral': mama_cc_i,
  },
  arms: {
    'Vista General AP': mama_cc_d,
  },
  legs: {
    'Vista General AP': mama_cc_d,
  },
  pelvis: {
    'Vista General AP': mama_cc_d,
  },
};
