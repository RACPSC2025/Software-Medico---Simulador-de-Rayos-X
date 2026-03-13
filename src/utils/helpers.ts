import { XRayImages, MammographyImages } from '../assets';

/**
 * Obtiene la URL de imagen para una proyección específica según la región
 * @param region - La región del cuerpo (chest, head, abdomen, etc.)
 * @param title - El título de la proyección
 * @returns La ruta de la imagen estática local
 */
export const getXRayImageUrl = (region: string, title: string): string => {
  // Para mamografías, usar directamente MammographyImages
  if (MammographyImages[title]) {
    return MammographyImages[title];
  }
  
  const regionImages = XRayImages[region];
  if (regionImages && regionImages[title]) {
    return regionImages[title];
  }
  
  // Fallback: buscar en todas las regiones
  for (const regionKey of Object.keys(XRayImages)) {
    const images = XRayImages[regionKey];
    if (images[title]) {
      return images[title];
    }
  }
  
  // Fallback final: retornar primera imagen disponible
  return Object.values(MammographyImages)[0] || '';
}