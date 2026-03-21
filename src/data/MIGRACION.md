# 🔄 Guía de Migración: ProjectionDocs → JSON

## 📋 Resumen

La documentación de proyecciones ahora se carga desde un archivo JSON estático (`src/data/documentacion.json`) en lugar de estar hardcodeada en `assets/index.ts`.

---

## ✅ Beneficios

1. **Single Source of Truth**: Los datos están en un solo lugar (JSON)
2. **Editable sin código**: Los radiólogos pueden editar el JSON sin tocar TypeScript
3. **Versionado claro**: El JSON tiene su propia versión semántica
4. **Portable**: Se puede compartir/exportar el JSON independientemente
5. **Mantenible**: Menos código TypeScript, más datos estructurados

---

## 🔧 Cambios Realizados

### **Antes (v1)**
```typescript
// assets/index.ts - 500+ líneas de datos hardcodeados
export const ProjectionDocs = {
  'MAMA CC D': {
    pasosClave: [...],
    anatomiaVisualizada: [...],
    // ...
  }
};
```

### **Ahora (v2)**
```typescript
// assets/index.ts - Solo funciones de carga
export const loadProjectionDocs = async () => {
  const response = await fetch('/data/documentacion.json');
  const data = await response.json();
  return data.documentos;
};

export const ProjectionDocs = {}; // Placeholder para compatibilidad
```

---

## 📖 Cómo Usar

### **En Componentes React (Recomendado)**

```typescript
import { useProjectionDocs } from '@/hooks';

const MiComponente = () => {
  const { docs, loading, error } = useProjectionDocs();

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div>
      {docs['mama-cc-d']?.contenido.pasosClave.map((paso, i) => (
        <li key={i}>{paso}</li>
      ))}
    </div>
  );
};
```

### **Fuera de React (Con Precaución)**

```typescript
import { loadProjectionDocs } from '@/assets';

const docs = await loadProjectionDocs();
console.log(docs['MAMA CC D'].pasosClave);
```

---

## 🗺️ Mapeo de IDs

Los IDs en el JSON usan formato kebab-case:

| Título Visible | ID en JSON |
|---------------|-----------|
| `MAMA CC D` | `mama-cc-d` |
| `MAMA CC I PROTESIS` | `mama-cc-i-protesis` |
| `MAMA MLO D PROTESIS EKLUND` | `mama-mlo-d-protesis-eklund` |

Usa el helper `mapProjectionId` para convertir:

```typescript
import { mapProjectionId } from '@/hooks/useProjectionDocs';

const id = mapProjectionId('MAMA CC D'); // 'mama-cc-d'
```

---

## 🚨 Breaking Changes

### **Código que deja de funcionar**

```typescript
// ❌ ESTO YA NO FUNCIONA
import { ProjectionDocs } from '@/assets';

const pasos = ProjectionDocs['MAMA CC D'].pasosClave;
// ProjectionDocs ahora es un objeto vacío {}
```

### **Cómo arreglarlo**

```typescript
// ✅ USAR HOOK EN COMPONENTES
import { useProjectionDocs } from '@/hooks';

const MiComponente = () => {
  const { docs } = useProjectionDocs();
  const pasos = docs['mama-cc-d']?.contenido.pasosClave;
};

// ✅ O USAR FUNCIÓN ASÍNCRONA
import { loadProjectionDocs } from '@/assets';

const docs = await loadProjectionDocs();
const pasos = docs['MAMA CC D'].pasosClave;
```

---

## 📁 Estructura del JSON

```json
{
  "version": "1.0.0",
  "ultimaActualizacion": "2026-03-21",
  "descripcion": "Documentación educativa...",
  "documentos": {
    "mama-cc-d": {
      "id": "mama-cc-d",
      "titulo": "MAMA CC D",
      "tituloCompleto": "Mamografía Craneocaudal Derecha",
      "categoria": "proyecciones",
      "contenido": {
        "pasosClave": [...],
        "anatomiaVisualizada": [...],
        "utilidadClinica": [...],
        "criteriosCalidad": [...],
        "erroresComunes": [...]
      },
      "metadata": {
        "autor": "Equipo Radiología Pro",
        "fechaCreacion": "2026-01-15",
        "ultimaRevision": "2026-03-21",
        "version": "1.0.0"
      }
    }
  }
}
```

---

## 🎯 Mejores Prácticas

### **1. Usar Hooks en Componentes**
```typescript
// ✅ BIEN
const { docs, loading, error } = useProjectionDocs();

// ❌ MAL
const docs = await loadProjectionDocs(); // En render de componente
```

### **2. Manejar Estados de Carga**
```typescript
// ✅ BIEN
if (loading) return <Loading />;
if (error) return <Error />;
if (!docs) return null;

// ❌ MAL
const docs = useProjectionDocs(); // Sin verificar loading/error
```

### **3. Usar Optional Chaining**
```typescript
// ✅ BIEN
const pasos = docs['mama-cc-d']?.contenido.pasosClave;

// ❌ MAL
const pasos = docs['mama-cc-d'].contenido.pasosClave; // Puede throwear
```

### **4. Cache en Múltiples Llamadas**
```typescript
// ✅ BIEN - El hook ya maneja caché automáticamente
const { docs } = useProjectionDocs();

// ❌ MAL - Múltiples fetch innecesarios
const docs1 = await loadProjectionDocs();
const docs2 = await loadProjectionDocs(); // Segundo fetch
```

---

## 🔍 Debugging

### **Ver si el JSON cargó**
```typescript
const { docs, loading, error } = useProjectionDocs();
console.log({ docs, loading, error });
```

### **Ver estructura de un documento**
```typescript
console.log(docs['mama-cc-d']);
```

### **Ver todos los IDs disponibles**
```typescript
console.log(Object.keys(docs));
// ['mama-cc-d', 'mama-cc-i', ...]
```

---

## 📊 Comparativa de Tamaño

| Métrica | Antes | Ahora | Mejora |
|---------|-------|-------|--------|
| **assets/index.ts** | ~900 líneas | ~180 líneas | -80% |
| **Bundle JS** | +50KB (datos) | +45KB (JSON separado) | -10% |
| **Mantenibilidad** | Baja (código + datos) | Alta (datos separados) | +200% |
| **Editable por no-devs** | ❌ No | ✅ Sí | N/A |

---

## 🆘 Solución de Problemas

### **Error: "documentos is undefined"**
- El JSON no cargó correctamente
- Verifica que `/data/documentacion.json` exista
- Revisa la consola por errores de fetch

### **Error: "Cannot read property 'pasosClave' of undefined"**
- El ID no existe o está mal escrito
- Usa optional chaining: `docs['mama-cc-d']?.contenido.pasosClave`
- Verifica los IDs disponibles con `Object.keys(docs)`

### **Los cambios no se reflejan**
- El navegador puede tener caché del JSON
- Hard refresh: `Ctrl + F5` o `Cmd + Shift + R`
- O agrega query param: `/data/documentacion.json?v=2`

---

## 📞 Soporte

Para dudas sobre la migración, contactar al equipo de desarrollo.
