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

// Documentación educativa por tipo de proyección
export const ProjectionDocs: { [key: string]: {
  pasosClave: string[];
  anatomiaVisualizada: string[];
  utilidadClinica: string[];
  criteriosCalidad: string[];
  erroresComunes: string[];
}} = {
  // MAMA CC (básica y con prótesis)
  'MAMA CC D': {
    pasosClave: [
      'Paciente de pie frente al mamógrafo, pies separados al ancho de hombros',
      'Brazo del mismo lado relajado y detrás del respaldo del compresor',
      'Elevar el receptor a la altura del inframamario',
      'Colocar la mama sobre el receptor, traccionando hacia adelante',
      'Alinear el pezón en el centro del receptor',
      'Aplicar compresión gradual hasta tolerancia del paciente'
    ],
    anatomiaVisualizada: [
      'Cuadrantes: Medial, central y lateral',
      'Tejidos: Tejido glandular central, grasa retromamaria',
      'Estructuras: Pezón (de perfil), músculo pectoral (porción medial)'
    ],
    utilidadClinica: [
      'Proyección básica de tamizaje junto con MLO',
      'Visualiza casi todo el tejido mamario en plano horizontal',
      'Ideal para localizar lesiones mediales o laterales',
      'Complementa la MLO para cobertura completa del tejido'
    ],
    criteriosCalidad: [
      'Pezón visualizado de perfil (no en escorzo)',
      'Grasa retromamaria visible',
      'Músculo pectoral visible en porción medial (si es posible)',
      'Todo el tejido mamario incluido en el campo',
      'Sin pliegues en la piel'
    ],
    erroresComunes: [
      'Pezón no de perfil (indica rotación incorrecta)',
      'Pliegues cutáneos que simulan calcificaciones',
      'Tejido mamario inferior no incluido (altura incorrecta del receptor)',
      'Compresión insuficiente (movimiento durante la exposición)'
    ]
  },
  'MAMA CC I': {
    pasosClave: [
      'Paciente de pie frente al mamógrafo, pies separados al ancho de hombros',
      'Brazo del mismo lado relajado y detrás del respaldo del compresor',
      'Elevar el receptor a la altura del inframamario',
      'Colocar la mama sobre el receptor, traccionando hacia adelante',
      'Alinear el pezón en el centro del receptor',
      'Aplicar compresión gradual hasta tolerancia del paciente'
    ],
    anatomiaVisualizada: [
      'Cuadrantes: Medial, central y lateral',
      'Tejidos: Tejido glandular central, grasa retromamaria',
      'Estructuras: Pezón (de perfil), músculo pectoral (porción medial)'
    ],
    utilidadClinica: [
      'Proyección básica de tamizaje junto con MLO',
      'Visualiza casi todo el tejido mamario en plano horizontal',
      'Ideal para localizar lesiones mediales o laterales',
      'Complementa la MLO para cobertura completa del tejido'
    ],
    criteriosCalidad: [
      'Pezón visualizado de perfil (no en escorzo)',
      'Grasa retromamaria visible',
      'Músculo pectoral visible en porción medial (si es posible)',
      'Todo el tejido mamario incluido en el campo',
      'Sin pliegues en la piel'
    ],
    erroresComunes: [
      'Pezón no de perfil (indica rotación incorrecta)',
      'Pliegues cutáneos que simulan calcificaciones',
      'Tejido mamario inferior no incluido (altura incorrecta del receptor)',
      'Compresión insuficiente (movimiento durante la exposición)'
    ]
  },
  'MAMA CC D PROTESIS': {
    pasosClave: [
      'Paciente de pie frente al mamógrafo, pies separados al ancho de hombros',
      'Brazo del mismo lado relajado y detrás del respaldo del compresor',
      'Elevar el receptor a la altura del inframamario',
      'Identificar los bordes del implante por palpación',
      'Empujar el implante hacia atrás (contra la pared torácica)',
      'Traccionar el tejido mamario natural hacia adelante',
      'Aplicar compresión solo al tejido mamario, no al implante'
    ],
    anatomiaVisualizada: [
      'Tejido glandular anterior al implante',
      'Cuadrantes: Medial, central, lateral (tejido desplazado)',
      'Estructuras: Tejido mamario sin superposición del implante'
    ],
    utilidadClinica: [
      'Exclusiva para pacientes con implantes mamarios',
      'Visualiza tejido glandular sin interferencia del implante',
      'El implante es radio-opaco (oculta tejido detrás de él)',
      'Permite detectar lesiones que estarían ocultas en CC convencional'
    ],
    criteriosCalidad: [
      'Implante desplazado completamente hacia la pared torácica',
      'Máximo tejido mamario traccionado hacia adelante',
      'Compresión solo en tejido mamario (no sobre implante)',
      'Pezón de perfil',
      'Más tejido visible que en CC sin Eklund'
    ],
    erroresComunes: [
      'Implante no completamente desplazado (se superpone al tejido)',
      'Tracción insuficiente del tejido mamario',
      'Compresión sobre el implante',
      'Movimiento del implante durante la compresión'
    ]
  },
  'MAMA CC I PROTESIS': {
    pasosClave: [
      'Paciente de pie frente al mamógrafo, pies separados al ancho de hombros',
      'Brazo del mismo lado relajado y detrás del respaldo del compresor',
      'Elevar el receptor a la altura del inframamario',
      'Identificar los bordes del implante por palpación',
      'Empujar el implante hacia atrás (contra la pared torácica)',
      'Traccionar el tejido mamario natural hacia adelante',
      'Aplicar compresión solo al tejido mamario, no al implante'
    ],
    anatomiaVisualizada: [
      'Tejido glandular anterior al implante',
      'Cuadrantes: Medial, central, lateral (tejido desplazado)',
      'Estructuras: Tejido mamario sin superposición del implante'
    ],
    utilidadClinica: [
      'Exclusiva para pacientes con implantes mamarios',
      'Visualiza tejido glandular sin interferencia del implante',
      'El implante es radio-opaco (oculta tejido detrás de él)',
      'Permite detectar lesiones que estarían ocultas en CC convencional'
    ],
    criteriosCalidad: [
      'Implante desplazado completamente hacia la pared torácica',
      'Máximo tejido mamario traccionado hacia adelante',
      'Compresión solo en tejido mamario (no sobre implante)',
      'Pezón de perfil',
      'Más tejido visible que en CC sin Eklund'
    ],
    erroresComunes: [
      'Implante no completamente desplazado (se superpone al tejido)',
      'Tracción insuficiente del tejido mamario',
      'Compresión sobre el implante',
      'Movimiento del implante durante la compresión'
    ]
  },
  'MAMA CC D PROTESIS EKLUND': {
    pasosClave: [
      'Posición inicial igual que CC estándar',
      'Identificar los bordes del implante por palpación',
      'Empujar el implante hacia atrás (contra la pared torácica)',
      'Traccionar el tejido mamario natural hacia adelante',
      'Colocar el receptor bajo el tejido traccionado',
      'Aplicar compresión solo al tejido mamario, no al implante'
    ],
    anatomiaVisualizada: [
      'Tejido glandular anterior al implante',
      'Cuadrantes: Medial, central, lateral (tejido desplazado)',
      'Estructuras: Tejido mamario sin superposición del implante'
    ],
    utilidadClinica: [
      'Exclusiva para pacientes con implantes mamarios',
      'Visualiza tejido glandular sin interferencia del implante',
      'El implante es radio-opaco (oculta tejido detrás de él)',
      'Parte del protocolo estándar de 8 imágenes en pacientes con prótesis'
    ],
    criteriosCalidad: [
      'Implante desplazado completamente hacia la pared torácica',
      'Máximo tejido mamario traccionado hacia adelante',
      'Compresión solo en tejido mamario (no sobre implante)',
      'Pezón de perfil',
      'Más tejido visible que en CC sin Eklund'
    ],
    erroresComunes: [
      'Implante no completamente desplazado (se superpone al tejido)',
      'Tracción insuficiente del tejido mamario',
      'Compresión sobre el implante',
      'Movimiento del implante durante la compresión'
    ]
  },
  'MAMA CC I PROTESIS EKLUND': {
    pasosClave: [
      'Posición inicial igual que CC estándar',
      'Identificar los bordes del implante por palpación',
      'Empujar el implante hacia atrás (contra la pared torácica)',
      'Traccionar el tejido mamario natural hacia adelante',
      'Colocar el receptor bajo el tejido traccionado',
      'Aplicar compresión solo al tejido mamario, no al implante'
    ],
    anatomiaVisualizada: [
      'Tejido glandular anterior al implante',
      'Cuadrantes: Medial, central, lateral (tejido desplazado)',
      'Estructuras: Tejido mamario sin superposición del implante'
    ],
    utilidadClinica: [
      'Exclusiva para pacientes con implantes mamarios',
      'Visualiza tejido glandular sin interferencia del implante',
      'El implante es radio-opaco (oculta tejido detrás de él)',
      'Parte del protocolo estándar de 8 imágenes en pacientes con prótesis'
    ],
    criteriosCalidad: [
      'Implante desplazado completamente hacia la pared torácica',
      'Máximo tejido mamario traccionado hacia adelante',
      'Compresión solo en tejido mamario (no sobre implante)',
      'Pezón de perfil',
      'Más tejido visible que en CC sin Eklund'
    ],
    erroresComunes: [
      'Implante no completamente desplazado (se superpone al tejido)',
      'Tracción insuficiente del tejido mamario',
      'Compresión sobre el implante',
      'Movimiento del implante durante la compresión'
    ]
  },
  // MAMA MLO
  'MAMA MLO D': {
    pasosClave: [
      'Paciente rotada 30-60° respecto al mamógrafo (ángulo según biotipo)',
      'Brazo del mismo lado detrás del respaldo, hombro relajado',
      'Receptor inclinado siguiendo la dirección del músculo pectoral',
      'Traccionar la mama hacia arriba y afuera',
      'El borde superior del receptor en la axila',
      'Aplicar compresión con el músculo pectoral relajado'
    ],
    anatomiaVisualizada: [
      'Cuadrantes: Superior externo (principal), inferior externo',
      'Tejidos: Cola de Spence, tejido axilar',
      'Estructuras: Músculo pectoral mayor completo, tejido retromamario'
    ],
    utilidadClinica: [
      'Proyección más importante del tamizaje',
      'Visualiza la mayor cantidad de tejido mamario en una sola toma',
      'Única proyección que muestra la cola de Spence y prolongación axilar',
      '~50% de los cánceres se originan en el cuadrante superior externo'
    ],
    criteriosCalidad: [
      'Músculo pectoral relajado, extendiéndose hasta el nivel del pezón o inferior',
      'Forma convexa del músculo pectoral (no cóncava)',
      'Tejido axilar incluido',
      'Pezón en perfil lateral',
      'Sin pliegues infra mamarios'
    ],
    erroresComunes: [
      'Músculo pectoral tenso (se ve como línea recta, no curva)',
      'Músculo pectoral no llega al nivel del pezón (altura incorrecta)',
      'Cola de Spence no incluida (receptor muy bajo)',
      'Pliegue infra mamario visible (tracción insuficiente)'
    ]
  },
  'MAMA MLO I': {
    pasosClave: [
      'Paciente rotada 30-60° respecto al mamógrafo (ángulo según biotipo)',
      'Brazo del mismo lado detrás del respaldo, hombro relajado',
      'Receptor inclinado siguiendo la dirección del músculo pectoral',
      'Traccionar la mama hacia arriba y afuera',
      'El borde superior del receptor en la axila',
      'Aplicar compresión con el músculo pectoral relajado'
    ],
    anatomiaVisualizada: [
      'Cuadrantes: Superior externo (principal), inferior externo',
      'Tejidos: Cola de Spence, tejido axilar',
      'Estructuras: Músculo pectoral mayor completo, tejido retromamario'
    ],
    utilidadClinica: [
      'Proyección más importante del tamizaje',
      'Visualiza la mayor cantidad de tejido mamario en una sola toma',
      'Única proyección que muestra la cola de Spence y prolongación axilar',
      '~50% de los cánceres se originan en el cuadrante superior externo'
    ],
    criteriosCalidad: [
      'Músculo pectoral relajado, extendiéndose hasta el nivel del pezón o inferior',
      'Forma convexa del músculo pectoral (no cóncava)',
      'Tejido axilar incluido',
      'Pezón en perfil lateral',
      'Sin pliegues infra mamarios'
    ],
    erroresComunes: [
      'Músculo pectoral tenso (se ve como línea recta, no curva)',
      'Músculo pectoral no llega al nivel del pezón (altura incorrecta)',
      'Cola de Spence no incluida (receptor muy bajo)',
      'Pliegue infra mamario visible (tracción insuficiente)'
    ]
  },
  'MAMA MLO D PROTESIS': {
    pasosClave: [
      'Paciente rotada 30-60° respecto al mamógrafo',
      'Brazo del mismo lado detrás del respaldo, hombro relajado',
      'Identificar bordes del implante',
      'Desplazar implante hacia atrás y abajo (contra pared torácica)',
      'Traccionar tejido mamario hacia arriba y afuera',
      'Receptor inclinado siguiendo músculo pectoral',
      'Aplicar compresión con implante estabilizado'
    ],
    anatomiaVisualizada: [
      'Tejido glandular de cuadrante superior externo',
      'Cola de Spence sin interferencia del implante',
      'Tejido axilar',
      'Músculo pectoral (parcialmente)'
    ],
    utilidadClinica: [
      'Visualiza cola de Spence y tejido axilar en pacientes con implantes',
      'Complementa la CC Eklund para cobertura completa',
      'Detecta lesiones en cuadrante superior externo',
      'Esencial en protocolo de 8 imágenes para prótesis'
    ],
    criteriosCalidad: [
      'Implante desplazado hacia pared torácica',
      'Músculo pectoral relajado y visible',
      'Cola de Spence incluida',
      'Tejido mamario traccionado hacia arriba y afuera',
      'Sin superposición del implante sobre tejido glandular'
    ],
    erroresComunes: [
      'Implante visible superpuesto al tejido glandular',
      'Músculo pectoral tenso (no relajado)',
      'Cola de Spence no incluida',
      'Tracción insuficiente del tejido'
    ]
  },
  'MAMA MLO I PROTESIS': {
    pasosClave: [
      'Paciente rotada 30-60° respecto al mamógrafo',
      'Brazo del mismo lado detrás del respaldo, hombro relajado',
      'Identificar bordes del implante',
      'Desplazar implante hacia atrás y abajo (contra pared torácica)',
      'Traccionar tejido mamario hacia arriba y afuera',
      'Receptor inclinado siguiendo músculo pectoral',
      'Aplicar compresión con implante estabilizado'
    ],
    anatomiaVisualizada: [
      'Tejido glandular de cuadrante superior externo',
      'Cola de Spence sin interferencia del implante',
      'Tejido axilar',
      'Músculo pectoral (parcialmente)'
    ],
    utilidadClinica: [
      'Visualiza cola de Spence y tejido axilar en pacientes con implantes',
      'Complementa la CC Eklund para cobertura completa',
      'Detecta lesiones en cuadrante superior externo',
      'Esencial en protocolo de 8 imágenes para prótesis'
    ],
    criteriosCalidad: [
      'Implante desplazado hacia pared torácica',
      'Músculo pectoral relajado y visible',
      'Cola de Spence incluida',
      'Tejido mamario traccionado hacia arriba y afuera',
      'Sin superposición del implante sobre tejido glandular'
    ],
    erroresComunes: [
      'Implante visible superpuesto al tejido glandular',
      'Músculo pectoral tenso (no relajado)',
      'Cola de Spence no incluida',
      'Tracción insuficiente del tejido'
    ]
  },
  'MAMA MLO D PROTESIS EKLUND': {
    pasosClave: [
      'Posición inicial igual que MLO estándar (rotada 30-60°)',
      'Identificar bordes del implante',
      'Desplazar implante hacia atrás y abajo (contra pared torácica)',
      'Traccionar tejido mamario hacia arriba y afuera',
      'Receptor inclinado siguiendo músculo pectoral',
      'Aplicar compresión con implante estabilizado'
    ],
    anatomiaVisualizada: [
      'Tejido glandular de cuadrante superior externo',
      'Cola de Spence sin interferencia del implante',
      'Tejido axilar',
      'Músculo pectoral (parcialmente)'
    ],
    utilidadClinica: [
      'Visualiza cola de Spence y tejido axilar en pacientes con implantes',
      'Complementa la CC Eklund para cobertura completa',
      'Detecta lesiones en cuadrante superior externo (más frecuente de cáncer)',
      'Esencial en protocolo de 8 imágenes para prótesis'
    ],
    criteriosCalidad: [
      'Implante desplazado hacia pared torácica',
      'Músculo pectoral relajado y visible',
      'Cola de Spence incluida',
      'Tejido mamario traccionado hacia arriba y afuera',
      'Sin superposición del implante sobre tejido glandular'
    ],
    erroresComunes: [
      'Implante visible superpuesto al tejido glandular',
      'Músculo pectoral tenso (no relajado)',
      'Cola de Spence no incluida',
      'Tracción insuficiente del tejido'
    ]
  },
  'MAMA MLO I PROTESIS EKLUND': {
    pasosClave: [
      'Posición inicial igual que MLO estándar (rotada 30-60°)',
      'Identificar bordes del implante',
      'Desplazar implante hacia atrás y abajo (contra pared torácica)',
      'Traccionar tejido mamario hacia arriba y afuera',
      'Receptor inclinado siguiendo músculo pectoral',
      'Aplicar compresión con implante estabilizado'
    ],
    anatomiaVisualizada: [
      'Tejido glandular de cuadrante superior externo',
      'Cola de Spence sin interferencia del implante',
      'Tejido axilar',
      'Músculo pectoral (parcialmente)'
    ],
    utilidadClinica: [
      'Visualiza cola de Spence y tejido axilar en pacientes con implantes',
      'Complementa la CC Eklund para cobertura completa',
      'Detecta lesiones en cuadrante superior externo (más frecuente de cáncer)',
      'Esencial en protocolo de 8 imágenes para prótesis'
    ],
    criteriosCalidad: [
      'Implante desplazado hacia pared torácica',
      'Músculo pectoral relajado y visible',
      'Cola de Spence incluida',
      'Tejido mamario traccionado hacia arriba y afuera',
      'Sin superposición del implante sobre tejido glandular'
    ],
    erroresComunes: [
      'Implante visible superpuesto al tejido glandular',
      'Músculo pectoral tenso (no relajado)',
      'Cola de Spence no incluida',
      'Tracción insuficiente del tejido'
    ]
  },
  // MAMA CV
  'MAMA CV': {
    pasosClave: [
      'Paciente rotada ligeramente hacia el lado contrario',
      'Brazo elevado o detrás de la cabeza',
      'Receptor posicionado en región axilar/lateral',
      'Traccionar tejido axilar hacia el receptor',
      'Ángulo del tubo paralelo a la axila',
      'Compresión moderada (zona sensible)'
    ],
    anatomiaVisualizada: [
      'Región: Axila y cola axilar de la mama',
      'Tejidos: Cola de Spence, tejido axilar profundo',
      'Estructuras: Ganglios linfáticos axilares (si están presentes)'
    ],
    utilidadClinica: [
      'Evalúa la cola axilar y región axilar',
      'Confirma hallazgos vistos en MLO',
      'Detecta lesiones en tejido mamario profundo lateral',
      'Útil en pacientes con sospecha en cuadrante superior externo'
    ],
    criteriosCalidad: [
      'Tejido axilar completo incluido',
      'Cola de Spence visualizada',
      'Sin superposición del brazo',
      'Compresión adecuada sin dolor excesivo'
    ],
    erroresComunes: [
      'Brazo superpuesto al campo de visión',
      'Tejido axilar no completamente incluido',
      'Compresión insuficiente (movimiento)',
      'Ángulo incorrecto del tubo'
    ]
  },
  // MAMA CC MAG
  'MAMA CC MAG': {
    pasosClave: [
      'Posición inicial igual que CC estándar',
      'Colocar torre de magnificación (aleja mama del detector)',
      'Posicionar área de interés directamente sobre la abertura',
      'Ajustar colimación al área de magnificación',
      'Compresión cuidadosa (sin mover el área de interés)',
      'Inmovilización estricta (crítico por aumento geométrico)'
    ],
    anatomiaVisualizada: [
      'Área focalizada: Región específica de interés',
      'Detalle: Microcalcificaciones, bordes de nódulos',
      'Resolución: Mayor detalle de estructuras pequeñas'
    ],
    utilidadClinica: [
      'Técnica diagnóstica, NO de tamizaje',
      'Análisis detallado de microcalcificaciones',
      'Evalúa forma, número y distribución de calcificaciones',
      'Define bordes de masas o nódulos pequeños'
    ],
    criteriosCalidad: [
      'Área de interés centrada y enfocada',
      'Sin movimiento (crítico por magnificación)',
      'Microcalcificaciones nítidas si están presentes',
      'Bordes de lesiones bien definidos'
    ],
    erroresComunes: [
      'Movimiento durante la exposición (imagen borrosa)',
      'Área de interés no centrada correctamente',
      'Enfoque incorrecto (pérdida de detalle)',
      'Compresión excesiva que dispersa calcificaciones'
    ]
  }
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
