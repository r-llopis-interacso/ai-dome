# Guideline Sync CLI - Documentación de Uso

## 📖 Descripción

`guideline-sync` es una herramienta de línea de comandos que analiza las dependencias de tu proyecto y genera automáticamente directrices de desarrollo personalizadas desde el Hub centralizado de AI Dome.

## 🚀 Instalación

### Instalación Local (Desarrollo)

```bash
# Clonar el repositorio
git clone <repository-url>
cd ai-dome-hub/apps/cli

# Instalar dependencias
pnpm install

# Usar directamente
node bin/guideline-sync.js --help
```

### Instalación Global (Futuro)

```bash
# Cuando esté publicado en npm
npm install -g @ai-dome/guideline-sync
guideline-sync --help
```

## 🎯 Uso Básico

### Comando Principal

```bash
# Análisis básico del proyecto actual
node bin/guideline-sync.js

# Con información detallada
node bin/guideline-sync.js --verbose

# Especificar package.json personalizado
node bin/guideline-sync.js -p /ruta/al/package.json

# Guardar en archivo específico
node bin/guideline-sync.js -o mi-directrices.md
```

### Test de Conectividad

```bash
# Verificar que el Hub está accesible
node bin/guideline-sync.js test

# Test con URL personalizada
node bin/guideline-sync.js test -u http://mi-hub.com/api/generar-contexto
```

## 🔧 Opciones Disponibles

### Opciones Básicas

| Opción | Descripción | Valor por defecto |
|--------|-------------|-------------------|
| `-o, --output <file>` | Archivo de salida para las directrices | `directrices.md` |
| `-u, --url <url>` | URL del endpoint del Hub | `http://localhost:3000/api/generar-contexto` |
| `-p, --package-path <path>` | Ruta específica al package.json a analizar | `./package.json` |
| `-v, --verbose` | Mostrar información detallada del proceso | `false` |

### Opciones de Filtrado

| Opción | Descripción | Ejemplo |
|--------|-------------|---------|
| `--incluir-areas <areas>` | Solo incluir etiquetas de áreas específicas | `--incluir-areas "Frontend,Backend"` |
| `--excluir-areas <areas>` | Excluir etiquetas de áreas específicas | `--excluir-areas "Frontend"` |
| `--incluir-etiquetas <etiquetas>` | Solo incluir etiquetas específicas | `--incluir-etiquetas "React,TypeScript"` |
| `--excluir-etiquetas <etiquetas>` | Excluir etiquetas específicas | `--excluir-etiquetas "jQuery,PHP"` |

**Nota**: Los filtros se separan por comas y son case-insensitive.

## 📝 Ejemplos de Uso

### 1. Análisis Completo

```bash
# Generar directrices completas del proyecto
node bin/guideline-sync.js --verbose
```

**Salida típica:**
```
🔍 Buscando package.json en: /proyecto/package.json
📦 Proyecto: mi-app v1.0.0
📋 Total de dependencias: 15
🚀 Conectando con el Hub...
✅ Respuesta recibida en 245ms
✅ Directrices sincronizadas exitosamente!
📄 Archivo guardado: directrices.md (8524 bytes)

📊 Estadísticas:
  • Dependencias analizadas: 15
  • Etiquetas encontradas: 8
  • Directrices relacionadas: 12
  • Áreas de desarrollo: 2
```

### 2. Enfoque en Backend

```bash
# Excluir directrices de frontend para proyectos backend
node bin/guideline-sync.js --excluir-areas "Frontend" --verbose
```

### 3. Solo Tecnologías Específicas

```bash
# Solo directrices para React y TypeScript
node bin/guideline-sync.js --incluir-etiquetas "React,TypeScript" -o react-ts-guidelines.md
```

### 4. Workflow de CI/CD

```bash
# Verificar conectividad en pipeline
node bin/guideline-sync.js test
if [ $? -eq 0 ]; then
  echo "Hub accesible, generando directrices..."
  node bin/guideline-sync.js -o guidelines-$(date +%Y%m%d).md
fi
```

### 5. Análisis de Proyecto Externo

```bash
# Analizar otro proyecto
node bin/guideline-sync.js \
  -p /otro/proyecto/package.json \
  -o analisis-proyecto-externo.md \
  --verbose
```

## 🎨 Salida y Formatos

### Información en Consola (Modo Verbose)

- 🔍 **Búsqueda**: Ubicación del package.json
- 📦 **Proyecto**: Nombre y versión del proyecto
- 📋 **Dependencias**: Número total de dependencias
- 🔧 **Filtros**: Filtros aplicados (si los hay)
- 🚀 **Conexión**: Estado de la conexión al Hub
- ✅ **Resultado**: Información del archivo generado
- 📊 **Estadísticas**: Métricas del análisis
- 🔍 **Debug**: Información detallada (en modo verbose)

### Archivo de Directrices Generado

El archivo markdown generado incluye:

```markdown
# Contexto de Directrices de IA

Generado el: [fecha y hora]

## [Área de Desarrollo 1]

### [Directriz 1]
- **Etiquetas**: Lista de etiquetas relacionadas
- **Contenido**: Directrices específicas para esta tecnología

### [Directriz 2]
...

## [Área de Desarrollo 2]
...

## Directrices Transversales
...
```

## ⚡ Casos de Uso Comunes

### Desarrollo Full-Stack

```bash
# Análisis completo para proyecto full-stack
node bin/guideline-sync.js --verbose

# Solo backend para sprint backend
node bin/guideline-sync.js --excluir-areas "Frontend" -o backend-guidelines.md

# Solo frontend para sprint frontend
node bin/guideline-sync.js --incluir-areas "Frontend" -o frontend-guidelines.md
```

### Code Review y Auditoría

```bash
# Directrices para tecnologías específicas en review
node bin/guideline-sync.js --incluir-etiquetas "Security,Performance" -o review-guidelines.md
```

### Onboarding de Desarrolladores

```bash
# Generar guía específica para nuevos desarrolladores
node bin/guideline-sync.js \
  --excluir-etiquetas "Advanced,Expert" \
  -o onboarding-guidelines.md
```

### Proyectos Legacy

```bash
# Excluir tecnologías modernas para proyectos legacy
node bin/guideline-sync.js \
  --excluir-etiquetas "Modern,ES6,TypeScript" \
  -o legacy-guidelines.md
```

## 🐛 Troubleshooting

### Error: No se pudo conectar al Hub

```
❌ Error al sincronizar directrices:
   No se pudo conectar al Hub en http://localhost:3000/api/generar-contexto. ¿Está ejecutándose el servidor?
```

**Solución:**
1. Verificar que el Hub esté ejecutándose
2. Usar `node bin/guideline-sync.js test` para verificar conectividad
3. Verificar la URL con la opción `-u`

### Error: package.json no encontrado

```
❌ Error al sincronizar directrices:
   No se encontró package.json en: /ruta/proyecto/package.json
```

**Solución:**
1. Ejecutar desde la raíz del proyecto
2. Usar `-p` para especificar la ruta exacta
3. Verificar que el archivo existe y es legible

### Timeout

```
❌ Error al sincronizar directrices:
   Timeout: La petición tardó demasiado en responder
```

**Solución:**
1. Verificar conexión a internet
2. Verificar que el servidor del Hub responde correctamente
3. Intentar con un proyecto más pequeño

### No se encontraron directrices

```
📄 Archivo guardado: directrices.md (145 bytes)
```

**Posibles causas:**
1. El proyecto no tiene dependencias reconocidas por el Hub
2. Los filtros son demasiado restrictivos
3. Faltan etiquetas en la base de datos del Hub

**Solución:**
1. Ejecutar sin filtros para ver si hay resultados
2. Usar `--verbose` para ver qué dependencias se analizaron
3. Verificar que las etiquetas existen en el Hub

## 🔍 Información de Debug

En modo verbose (`--verbose`), el CLI muestra información adicional:

- **Dependencias extraídas**: Lista de dependencias encontradas
- **Etiquetas encontradas**: Etiquetas que coincidieron
- **Áreas de agrupación**: Áreas de desarrollo identificadas
- **Etiquetas filtradas**: Resultado después de aplicar filtros
- **Tiempo de respuesta**: Performance del endpoint

Esta información es útil para:
- Debugging de problemas
- Optimización de filtros
- Verificación de la lógica de matching

## 📚 Más Información

- **Documentación del Endpoint**: Ver `docs/endpoint-generar-contexto.md`
- **Guía de Debugging**: Ver `docs/debugging-guide.md`
- **Arquitectura del Sistema**: Ver `IMPLEMENTACION-COMPLETADA.md`

## 🤝 Contribución

Para contribuir al CLI:

1. Fork el repositorio
2. Crear una rama para tu feature
3. Añadir tests si es necesario
4. Crear un pull request

### Desarrollo Local

```bash
# Clonar y configurar
git clone <repo>
cd ai-dome-hub/apps/cli
pnpm install

# Probar cambios
node bin/guideline-sync.js --help

# Ejecutar linting
pnpm lint

# Ejecutar tests (cuando estén disponibles)
pnpm test
```
