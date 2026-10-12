# Análisis Suno v2.0 · guía de despliegue

## Archivos (todos van en la raíz del repositorio, sin carpetas)
index.html · sw.js · manifest.webmanifest · icon-192.png · icon-512.png · icon-maskable-512.png

## Cómo actualizar tu app en GitHub Pages (desde el navegador del teléfono)
1. En tu repositorio: Add file → Upload files.
2. Selecciona los 6 archivos. `index.html` y `sw.js` reemplazan a los actuales; los otros 4 son nuevos.
3. Commit changes. GitHub Pages tarda ~1 minuto en publicar.
4. Abre la app. Verás el aviso «La app se actualizó» → toca Recargar. Si sigue la versión vieja, ciérrala por completo y ábrela de nuevo.
5. Si la tienes instalada y el icono no cambia, desinstálala y vuelve a instalarla (el manifest ahora es un archivo real, más confiable que el generado en código).

## Qué cambió respecto a v1
- Público objetivo de opción múltiple (público en general, bandas o grupos, empresas tradicionales de música, artistas indie, creadores de contenido, agencias de sincronización, pymes, productoras audiovisuales y videojuegos).
- Veredicto por archivo: Hit comercial Sí/No, Comercial Sí/No, Unicornio sónico Sí/No, con el nombre del archivo, y una lectura del par (¿las dos son Hit? ¿cuál no es Hit pero sí comercial? ¿alguna es unicornio?).
- Motor de análisis nuevo (sonoridad LUFS, tempo, tonalidad, estructura por similitud, balance espectral) en un proceso aparte para no congelar la pantalla.
- Validación robusta: formato real MP3, tamaño, duración, duplicados por huella SHA-256, emparejamiento.
- Los audios se guardan en el dispositivo (IndexedDB) para escucharlos y reanalizarlos; puedes borrarlos cuando quieras.
- Ficha completa: firma sónica A/B, reproductor que mantiene la posición al cambiar de versión, estructura detectada, datos técnicos, mejor fragmento de 15 s para redes, ajuste por público, recomendaciones concretas y valor en MXN por comprador.
- Tu escucha (voz, letra y factor diferencial) pesa 50% en esas dos dimensiones.
- Cuadro comparativo, ranking, resumen ejecutivo, exportación a PDF, CSV y JSON, importación de JSON.
- Criterios de clasificación editables. Tabla de precios editable con fecha de revisión y aviso a los 90 días.
- Service worker nuevo: HTML con red primero (las actualizaciones llegan de inmediato) y respaldo sin conexión.

## Límites a tener presentes
- Los umbrales y perfiles por género son heurísticos y no están calibrados con un corpus real. Ajusta los criterios en Resumen cuando compares contra canciones que ya conoces.
- Voz, letra y factor diferencial no se pueden medir del todo con el espectro: por eso la app pide tu escucha.
- Los precios iniciales son los de tu v1, sin verificar. Actualízalos con cotizaciones reales.
- Las advertencias legales y de mercado del brief aparecen en la app y en el PDF.

## Registro PASEF v1.0 STABLE (sin modificar el marco)
Ciclo aplicado: Comprender (v1 + brief + captura) → Analizar → Modelar (veredicto en tres pruebas independientes) → Diseñar → Arquitectar (archivo único + worker + IndexedDB + SW) → Evaluar → Optimizar → Construir → Auditar (pruebas en Chromium móvil: carga, duplicados, archivo falso, audios degradados, análisis, reproducción, exportación, recarga y modo sin conexión) → Entregar.
Hallazgo de auditoría corregido: el primer criterio clasificaba todo como Hit y Unicornio; se agregaron compuertas de calidad (sonoridad, recorte, estructura, gancho) y se verificó que audio silencioso, recortado, ruido y tono puro quedan por debajo del umbral.
