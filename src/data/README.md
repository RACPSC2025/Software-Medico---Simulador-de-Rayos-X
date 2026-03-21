# 📚 Sistema de Documentación - Guía de Uso

## 🔄 Exportar e Importar Documentación

El sistema de documentación incluye funciones para **exportar** tu documentación editada y **importar** documentación desde otros dispositivos.

---

## 📤 Exportar Documentación

### **¿Cuándo usar?**
- Quieres compartir tus ediciones con otros usuarios
- Quieres hacer un backup de tus cambios
- Vas a formatear el dispositivo y no quieres perder tus ediciones

### **¿Cómo usar?**
1. Ve a la **Biblioteca** desde el menú principal
2. Click en el botón **"Exportar"** (verde, arriba a la derecha)
3. El navegador descargará un archivo JSON con este nombre:
   ```
   documentacion-v1.0.0-2026-03-21.json
   ```
4. Guarda el archivo en un lugar seguro

### **¿Qué se exporta?**
- ✅ Todos los documentos (12 proyecciones)
- ✅ Tus ediciones locales (si las hay)
- ✅ Metadata actualizada (autor, fechas, versión)
- ✅ Estructura completa de la documentación

---

## 📥 Importar Documentación

### **¿Cuándo usar?**
- Recibiste un archivo JSON de otro usuario
- Quieres cargar documentación actualizada
- Quieres restaurar un backup que hiciste anteriormente

### **¿Cómo usar?**
1. Ve a la **Biblioteca** desde el menú principal
2. Click en el botón **"Importar"** (azul, arriba a la derecha)
3. Selecciona el archivo `.json` que quieres cargar
4. El sistema validará el archivo automáticamente
5. Si es válido, verás un mensaje de éxito
6. ¡Listo! La documentación se actualiza inmediatamente

### **Validación del Archivo**
El sistema verifica que el archivo:
- ✅ Sea un JSON válido
- ✅ Tenga la estructura correcta
- ✅ Contenga el campo `documentos`
- ✅ Cada documento tenga `id`, `titulo`, `contenido`, `metadata`

Si el archivo no pasa la validación, verás un mensaje de error.

---

## 🔄 Resetear Ediciones

### **¿Cuándo usar?**
- Quieres descartar TODUS tus ediciones locales
- Quieres volver a la documentación original (JSON base)
- Importaste un archivo pero quieres empezar de cero

### **¿Cómo usar?**
1. Ve a la **Biblioteca**
2. Click en el botón **"Resetear"** (rojo, solo visible si hay ediciones locales)
3. Confirma la acción en el diálogo
4. La página se recargará con la documentación original

### **⚠️ Advertencia**
- Esta acción **NO se puede deshacer**
- Se pierden TODAS las ediciones locales
- El JSON base (desde GitHub) no se ve afectado

---

## 🎯 Flujo de Trabajo Recomendado

### **Para un Solo Dispositivo**
```
1. Editar documentos en Biblioteca
2. Los cambios se guardan automáticamente (localStorage)
3. Opcional: Exportar backup periódico
```

### **Para Múltiples Dispositivos**
```
Dispositivo Principal (Radiólogo):
1. Editar documentación
2. Exportar a JSON
3. Compartir archivo (email/USB)

Dispositivos Secundarios:
1. Recibir archivo JSON
2. Importar en Biblioteca
3. ¡Listo! Documentación actualizada
```

### **Para Actualización desde GitHub**
```
1. Radiólogo actualiza JSON en GitHub
2. Deploy automático a Firebase
3. Usuarios recargan página
4. Reciben JSON base actualizado
5. Sus ediciones locales se mantienen (merge automático)
```

---

## 📁 Estructura del Archivo JSON

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
        "version": "1.0.0",
        "esEdicionLocal": true
      }
    }
  }
}
```

---

## 🛠️ Solución de Problemas

### **Error: "JSON inválido"**
- El archivo está corrupto o no es JSON
- Solución: Verifica que el archivo termine en `.json`
- Intenta exportar nuevamente

### **Error: "Estructura inválida"**
- El archivo no tiene la estructura esperada
- Solución: Asegúrate de que fue exportado desde el sistema
- No edites el JSON manualmente a menos que conozcas la estructura

### **No aparece el botón "Resetear"**
- Solo aparece si hay ediciones locales
- Si no hay overrides, el botón se oculta
- Es normal, no hay nada que resetear

### **Perdí mis ediciones después de limpiar caché**
- localStorage se borra al limpiar caché del navegador
- Solución: Importa el último backup que exportaste
- Recomendación: Exporta regularmente

---

## 💡 Mejores Prácticas

1. **Exporta semanalmente** o después de ediciones importantes
2. **Nombra los archivos** con fecha: `documentacion-2026-03-21.json`
3. **Comparte por canal seguro** (email institucional, USB)
4. **Valida antes de importar** en producción
5. **Mantén backups** en múltiples ubicaciones

---

## 📞 Soporte

Para problemas o sugerencias, contacta al equipo de desarrollo.
