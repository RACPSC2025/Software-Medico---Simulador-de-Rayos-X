# 🏥 Simulador de Mamografía - Radiología Pro

<div align="center">

![Estado del Proyecto](https://img.shields.io/badge/estado-activo-success)
![Versión](https://img.shields.io/badge/versión-1.0.0-blue)
![React](https://img.shields.io/badge/React-19.0.0-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178c6)
![Vite](https://img.shields.io/badge/Vite-6.2.0-646cff)

**Sistema Integral de Gestión Radiológica y Simulación Educativa para Profesionales de la Salud**

[Características](#-características-principales) • [Tecnologías](#-stack-tecnológico) • [Instalación](#-instalación-y-ejecución) • [Uso](#-guía-de-uso) • [Arquitectura](#-arquitectura) • [Contribuir](#-contribuir)

</div>

---

Sites for project simulador-de-rayos-x-mamogra

┌──────────────────────────────┬──────────────────────────────────────────────┬─────────────────┐
│ Site ID                      │ Default URL                                  │ App ID (if set) │
├──────────────────────────────┼──────────────────────────────────────────────┼─────────────────┤
│ simulador-de-rayos-x-mamogra │ https://simulador-de-rayos-x-mamogra.web.app │ --              │
└──────────────────────────────┴──────────────────────────────────────────────┴─────────────────┘
## 📋 Descripción

**Simulador de Mamografía - Radiología Pro** es una aplicación web educativa diseñada para la formación de estudiantes de medicina, radiología y profesionales afines en el campo de la diagnóstico por imagen. 

Esta herramienta permite simular el proceso completo de adquisición de imágenes radiológicas, con énfasis en mamografías, brindando una experiencia interactiva que replica los parámetros técnicos reales de un equipo de Rayos X.

### 🎯 Propósito Educativo

El sistema tiene como fundamento principal la **educación médica**, permitiendo a los estudiantes:

- Comprender la relación entre los parámetros técnicos (kVp, mAs) y la calidad de imagen resultante
- Practicar sin riesgos la selección de configuraciones adecuadas para diferentes tipos de estudios
- Visualizar en tiempo real los efectos de sobreexposición, subexposición, ruido cuántico y radiación dispersa
- Familiarizarse con las proyecciones radiológicas estándar (CC, MLO, etc.)

---

## ✨ Características Principales

### 🔐 Sistema de Autenticación
- Login de usuarios con persistencia de sesión
- Registro de profesionales de la salud
- Recuperación de contraseña
- Gestión de múltiples usuarios por sesión

### 👤 Registro de Pacientes
- Formulario con validación en tiempo real
- Datos demográficos completos (ID, nombre, edad, sexo)
- Advertencias de seguridad radiológica
- Historial de estudios por paciente

### 🫁 Workspace Educativo Interactivo
- **Mapa Corporal SVG**: Selección intuitiva de región anatómica
- **Visor Multi-vista**: Cuadrícula configurable (1, 2, 4, 6 vistas)
- **Lista de Proyecciones**: Navegación paginada con vistas previas
- **Validación de Imágenes**: Sistema de aprobación con indicadores visuales
- **Zoom y Panorámica**: Herramientas de análisis detallado

### 📸 Simulador de Rayos X
- **Configuración Técnica Realista**:
  - kVp (Kilovoltaje pico): 20-120 kV
  - mAs (Miliamperaje-segundo): 1-200 mAs
  - Ruido del sensor: 0-100%
  
- **Efectos Físicos Simulados**:
  - Contraste afectado por kVp
  - Brillo/Densidad afectado por mAs
  - Ruido cuántico (mAs bajo)
  - Radiación dispersa (kVp alto)
  
- **Animaciones Inmersivas**:
  - Adquisición: 5 segundos con barra de progreso
  - Digitalización: 15 segundos con efecto de escáner
  - Línea de escaneo luminosa estilo fotocopiadora

- **Procesamiento de Imagen**:
  - Ajuste de brillo y contraste
  - Zoom in/out
  - Rotación (90°, 180°, 270°)
  - Flip horizontal/vertical
  - Reset de parámetros

### 📤 Exportación de Resultados
- Resumen completo del paciente
- Galería de imágenes capturadas
- Composición radiográfica final
- Notificaciones animadas de éxito
- Reinicio de flujo para nuevo estudio

### 📁 Directorio Profesional
- Listado de profesionales con búsqueda
- Filtros por especialidad
- Estados de disponibilidad
- Exportación de datos

---

## 🛠 Stack Tecnológico

| Categoría | Tecnología | Versión |
|-----------|-----------|---------|
| **Frontend Framework** | React | 19.0.0 |
| **Lenguaje** | TypeScript | 5.8.2 |
| **Build Tool** | Vite | 6.2.0 |
| **Estilos** | Tailwind CSS | 4.1.14 |
| **Animaciones** | Motion | 12.23.24 |
| **Iconos** | Lucide React | 0.546.0 |
| **Estado** | React Hooks | - |

### Características Técnicas

- ✅ **TypeScript**: Tipado estático para mayor seguridad y mantenibilidad
- ✅ **Componentes Modulares**: Arquitectura basada en módulos reutilizables
- ✅ **Responsive Design**: Compatible con desktop, tablet y móvil
- ✅ **Tema Claro/Oscuro**: Soporte completo para preferencias del usuario
- ✅ **Sin Dependencias Externas**: Todas las imágenes son locales (sin APIs de terceros)
- ✅ **Build Optimizado**: Compilación rápida y bundles minimizados

---

## 📦 Instalación y Ejecución

### Requisitos Previos

- **Node.js** versión 18.x o superior
- **npm** versión 9.x o superior

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/simulador-mamografia.git
   cd simulador-mamografia
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno (opcional)**
   ```bash
   cp .env.example .env.local
   # Editar .env.local con tus configuraciones
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:3000`

5. **Compilar para producción**
   ```bash
   npm run build
   ```

6. **Vista previa del build**
   ```bash
   npm run preview
   ```

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo (puerto 3000) |
| `npm run build` | Compila para producción en `/dist` |
| `npm run preview` | Vista previa del build de producción |
| `npm run lint` | Verificación de tipos TypeScript |
| `npm run clean` | Elimina carpeta `dist` |

---

## 📖 Guía de Uso

### Flujo Completo de Simulación

#### Paso 1: Inicio de Sesión
```
1. Ingresar correo electrónico (o dejar vacío para modo invitado)
2. Ingresar contraseña (simulada)
3. Click en "Iniciar Sesión"
```

#### Paso 2: Registro del Paciente
```
1. Completar ID del paciente (mínimo 4 caracteres)
2. Ingresar nombre completo (mínimo 3 caracteres)
3. Especificar edad (1-120 años)
4. Seleccionar sexo (Masculino/Femenino)
5. Click en "Iniciar Examen"
```

> ⚠️ **Nota de Seguridad**: El sistema muestra una advertencia sobre confirmación de embarazo para pacientes en edad reproductiva.

#### Paso 3: Selección de Proyección
```
1. En el mapa corporal, seleccionar región anatómica (Tórax, Cráneo, Abdomen, etc.)
2. En la lista de proyecciones, seleccionar el estudio deseado
   - MAMA CC D: Cráneo-Caudal Derecha
   - MAMA CC I: Cráneo-Caudal Izquierda
   - MAMA MLO D: Mediolateral Oblicua Derecha
   - MAMA MLO I: Mediolateral Oblicua Izquierda
   - TORAX PA: Tórax Posteroanterior
   - etc.
3. Click en botón "RX" para iniciar simulación
```

#### Paso 4: Configuración del Equipo
```
1. Ajustar kVp (recomendado: 28-30 para mamografía, 110 para tórax)
2. Ajustar mAs (recomendado: 80-100 para mamografía, 5 para tórax)
3. Opcional: Ajustar ruido del sensor para simular condiciones adversas
4. Click en "Capturar" para iniciar adquisición
```

#### Paso 5: Adquisición y Digitalización
```
1. Esperar 5 segundos durante la adquisición (barra de progreso)
2. Observar 15 segundos de digitalización (efecto escáner)
3. La línea cyan revela progresivamente la imagen
```

#### Paso 6: Evaluación de Calidad
```
El sistema muestra automáticamente:
- Estado de la imagen (ÓPTIMA, RUIDO CUÁNTICO, SOBREEXPUESTA, etc.)
- Indicadores de calidad con código de colores:
  - 🟢 Verde: Calidad óptima
  - 🟡 Ámbar: Calidad aceptable con advertencias
  - 🔴 Rojo: Calidad deficiente, requiere reintentar
```

#### Paso 7: Procesamiento (Opcional)
```
Usar la toolbar lateral para:
- ☀️ Ajustar brillo
- ◐ Ajustar contraste
- 🔍 Zoom in/out
- 🔄 Rotar imagen
- ↔️ Flip horizontal/vertical
- ↺ Resetear parámetros
```

#### Paso 8: Aceptar o Reintentar
```
- Click en "Aceptar" → Guarda la imagen y regresa al workspace
- Click en "Reintentar" → Reinicia la simulación con mismos parámetros
```

#### Paso 9: Validación en Workspace
```
1. La imagen capturada aparece en la cuadrícula
2. Click en "VALIDAR" para aprobar la imagen
3. Las imágenes validadas muestran check verde ✓
```

#### Paso 10: Exportar Resultados
```
1. Navegar a "Exportar" en el menú superior
2. Revisar resumen del paciente e imágenes capturadas
3. Click en "Guardar y Exportar"
4. Esperar animación de procesamiento
5. El sistema retorna automáticamente al registro de pacientes
```

---

## 🏗 Arquitectura

### Estructura del Proyecto

```
src/
├── App.tsx                 # Componente raíz y enrutamiento
├── main.tsx                # Punto de entrada
├── index.css               # Estilos globales + Tailwind
├── types/
│   └── index.ts            # Tipos TypeScript compartidos
├── components/
│   └── ui.tsx              # Componentes UI reutilizables
├── modules/
│   ├── auth.tsx            # Login, Registro, Recuperación
│   ├── layout.tsx          # Dashboard y Navbar
│   ├── registration.tsx    # Registro de pacientes
│   ├── studies.tsx         # Workspace educativo
│   ├── simulator.tsx       # Simulador de Rayos X
│   ├── export.tsx          # Exportación de resultados
│   └── directory.tsx       # Directorio de profesionales
├── utils/
│   └── helpers.ts          # Funciones auxiliares
└── assets/
    ├── index.ts            # Exportación de imágenes
    ├── *.png               # Imágenes de mamografías
    └── *.jpeg              # Otras imágenes médicas
```

### Flujo de Datos

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│   Login     │────▶│  Registro    │────▶│   Workspace     │
│   Screen    │     │  Paciente    │     │   Educativo     │
└─────────────┘     └──────────────┘     └────────┬────────┘
                                                   │
                    ┌──────────────────────────────┘
                    │
                    ▼
           ┌────────────────┐
           │   Simulador    │
           │   Rayos X      │
           └────────┬───────┘
                    │
                    ▼
           ┌────────────────┐
           │   Validación   │
           │   en Grid      │
           └────────┬───────┘
                    │
                    ▼
           ┌────────────────┐
           │   Exportar     │
           │   Resultados   │
           └────────────────┘
```

### Gestión de Estado

La aplicación utiliza **estado elevado** en `App.tsx` para compartir datos entre módulos:

- `screen`: Pantalla activa actual
- `selectedStudy`: Estudio seleccionado
- `currentPatient`: Datos del paciente en sesión
- `capturedImages`: Imágenes adquiridas por proyección
- `activeSimulation`: Datos de simulación en curso
- `workspaceState`: Estado completo del workspace (zoom, pan, validaciones, etc.)

---

## 🎓 Consideraciones Educativas

### Para Estudiantes

1. **Experimentación Segura**: Permite cometer errores sin consecuencias reales
2. **Retroalimentación Inmediata**: El sistema indica calidad de imagen en tiempo real
3. **Repetición Ilimitada**: Practicar tantas veces como sea necesario
4. **Progresión Autónoma**: Avanzar a propio ritmo de aprendizaje

### Para Instructores

1. **Demostraciones en Clase**: Proyectar la aplicación para explicaciones
2. **Evaluación Práctica**: Solicitar capturas de pantalla de resultados
3. **Casos Personalizados**: Enfocarse en proyecciones específicas
4. **Discusión de Parámetros**: Analizar por qué ciertas configuraciones fallan

### Parámetros de Referencia

| Estudio | kVp Óptimo | mAs Óptimo | Calidad Esperada |
|---------|-----------|-----------|------------------|
| Mamografía CC | 28 | 80 | Óptima |
| Mamografía MLO | 30 | 100 | Óptima |
| Tórax PA | 110 | 5 | Óptima |
| Cráneo AP | 80 | 20 | Óptima |
| Abdomen AP | 90 | 30 | Óptima |

---

## 🚀 Escalabilidad

### Arquitectura Escalable

La aplicación está diseñada con principios que facilitan su crecimiento:

#### 1. **Componentes Modulares**
Cada módulo es independiente y puede ser extendido sin afectar otros:
- Añadir nuevas proyecciones → Solo modificar `assets/index.ts`
- Nuevas regiones anatómicas → Actualizar `XRayImages` en helpers
- Nuevos tipos de simulación → Crear módulo en `src/modules/`

#### 2. **Sistema de Imágenes Flexible**
```typescript
// Agregar nueva imagen:
// 1. Colocar archivo en src/assets/
// 2. Importar en assets/index.ts
// 3. Mapear en XRayImages o MammographyImages
import nuevaImagen from './NUEVA_IMAGEN.png';

export const XRayImages = {
  chest: {
    'NUEVA_PROYECCION': nuevaImagen,
    // ...
  }
};
```

#### 3. **Configuración Externa de Casos**
Los casos del simulador están definidos como arrays de objetos, facilitando:
- Carga desde JSON externo
- Integración con API backend
- Base de datos de casos clínicos

#### 4. **Tipado TypeScript**
- Interfaces claras para cada tipo de dato
- Facilita incorporación de nuevos desarrolladores
- Previene errores en expansión de funcionalidades

### Posibles Extensiones Futuras

- [ ] **Backend Real**: Autenticación con base de datos
- [ ] **API REST**: Persistencia de pacientes y estudios
- [ ] **Multilenguaje**: i18n para inglés/portugués
- [ ] **Más Especialidades**: TC, RM, Ultrasonido
- [ ] **Casos Patológicos**: Imágenes con hallazgos anormales
- [ ] **Sistema de Puntuación**: Evaluación automática de configuraciones
- [ ] **Modo Examen**: Limitar intentos y cronometrar
- [ ] **Historial Clínico**: Antecedentes y estudios previos
- [ ] **Exportación DICOM**: Formato estándar médico
- [ ] **Colaboración**: Multiusuario en tiempo real

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el repositorio
2. Crear rama de feature (`git checkout -b feature/NuevaFuncionalidad`)
3. Commit cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/NuevaFuncionalidad`)
5. Abrir Pull Request

### Estándares de Código

- Usar TypeScript estricto
- Seguir convenciones de nombres existentes
- Componentes como funciones con camelCase
- Interfaces para tipos complejos
- Comentarios solo para lógica compleja

---

## 📄 Licencia

Este proyecto es de carácter **educativo**. El uso comercial requiere autorización previa.

---

## 👥 Autores

- **Equipo de Desarrollo** - *Simulador de Mamografía*

---

## 🙏 Agradecimientos

- Imágenes médicas proporcionadas con fines educativos
- Frameworks de código abierto que hacen posible este proyecto

---

## 📞 Soporte

Para reportar errores o solicitar funcionalidades, abrir un issue en el repositorio.

---

<div align="center">

**Hecho con ❤️ para la educación médica**

[⬆ Volver al inicio](#-simulador-de-mamografía---radiología-pro)

</div>
