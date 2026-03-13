// Mamografías - Versiones PNG
import mama_cc_d from './MAMA CC D.png';
import mama_cc_i from './MAMA CC I.png';
import mama_mlo_d from './MAMA MLO D.png';
import mama_mlo_i from './MAMA MLO I.png';

// Otras imágenes
import avatar from './AVATAR.png';
import radio_final from './Radiografia Final.jpeg';

export const MammographyImages: { [key: string]: string } = {
  'MAMA CC D': mama_cc_d,
  'MAMA CC I': mama_cc_i,
  'MAMA MLO D': mama_mlo_d,
  'MAMA MLO I': mama_mlo_i,
};

export const OtherImages = {
  AVATAR: avatar,
  RADIO_FINAL: radio_final,
};

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
