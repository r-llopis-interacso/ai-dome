# @ai-dome/guideline-sync

🚀 **CLI inteligente para generar directrices de desarrollo personalizadas basadas en las dependencias de tu proyecto.**

## ⚡ Inicio Rápido

```bash
# Instalar dependencias
pnpm install

# Generar directrices para tu proyecto
node bin/guideline-sync.js --verbose

# Verificar conectividad con el Hub
node bin/guideline-sync.js test
```

## 🎯 Características

- ✅ **Análisis Automático**: Extrae dependencias del package.json
- ✅ **Directrices Personalizadas**: Genera contexto específico para tu stack tecnológico
- ✅ **Filtros Avanzados**: Incluye/excluye áreas o tecnologías específicas
- ✅ **Modo Verbose**: Información detallada del proceso
- ✅ **Test de Conectividad**: Verifica acceso al Hub
- ✅ **Colores en Terminal**: Interface moderna y clara

## 📖 Uso

### Comandos Básicos

```bash
# Análisis completo
node bin/guideline-sync.js

# Con información detallada
node bin/guideline-sync.js --verbose

# Archivo personalizado
node bin/guideline-sync.js -o mi-guia.md
```

### Filtros Inteligentes

```bash
# Solo tecnologías específicas
node bin/guideline-sync.js --incluir-etiquetas "React,TypeScript"

# Excluir áreas completas
node bin/guideline-sync.js --excluir-areas "Frontend"

# Combinación de filtros
node bin/guideline-sync.js \
  --incluir-areas "Backend" \
  --excluir-etiquetas "Legacy"
```

## 🔧 Opciones

| Opción | Descripción | Ejemplo |
|--------|-------------|---------|
| `-o, --output <file>` | Archivo de salida | `-o directrices.md` |
| `-p, --package-path <path>` | Ruta al package.json | `-p ./package.json` |
| `-u, --url <url>` | URL del Hub | `-u http://localhost:3000/api/generar-contexto` |
| `-v, --verbose` | Información detallada | `--verbose` |
| `--incluir-areas <areas>` | Filtrar por áreas | `--incluir-areas "Frontend,Backend"` |
| `--excluir-areas <areas>` | Excluir áreas | `--excluir-areas "Legacy"` |
| `--incluir-etiquetas <tags>` | Filtrar por etiquetas | `--incluir-etiquetas "React,Vue"` |
| `--excluir-etiquetas <tags>` | Excluir etiquetas | `--excluir-etiquetas "jQuery"` |

## 📊 Ejemplo de Salida

```
🔍 Buscando package.json en: /mi-proyecto/package.json
📦 Proyecto: mi-app v1.0.0
📋 Total de dependencias: 12
🚀 Conectando con el Hub...
✅ Respuesta recibida en 234ms
✅ Documentación generada exitosamente:
   - ai-readme.md (12 KB)
   - copilot-instructions.md (8 KB)

📊 Estadísticas:
  • Dependencias analizadas: 12
  • Etiquetas encontradas: 8
  • Directrices relacionadas: 15
  • Áreas de desarrollo: 2

🔍 Información de debug:
  • Dependencias extraídas: react, typescript, express, next, tailwindcss
  • Etiquetas encontradas: React, TypeScript, Next.js, Tailwind CSS, Node.js
  • Áreas de agrupación: Frontend Genérico
⏱️  Tiempo total: 235ms
```

## 🎨 Casos de Uso

### 🏗️ Desarrollo Full-Stack
```bash
# Análisis completo
node bin/guideline-sync.js --verbose

# Solo backend
node bin/guideline-sync.js --excluir-areas "Frontend"

# Solo frontend  
node bin/guideline-sync.js --incluir-areas "Frontend"
```

### 🔍 Code Review
```bash
# Directrices de seguridad y performance
node bin/guideline-sync.js --incluir-etiquetas "Security,Performance"
```

### 👨‍💼 Onboarding
```bash
# Sin directrices avanzadas
node bin/guideline-sync.js --excluir-etiquetas "Advanced,Expert"
```

### 🏛️ Proyectos Legacy
```bash
# Sin tecnologías modernas
node bin/guideline-sync.js --excluir-etiquetas "Modern,ES6"
```
```

## ⚙️ Configuración

### Variables de Entorno

```bash
# URL por defecto del Hub (opcional)
export GUIDELINE_SYNC_URL=http://mi-hub.com/api/generar-contexto

# Nivel de logging (opcional)
export GUIDELINE_SYNC_VERBOSE=true
```

### Configuración en package.json

```json
{
  "scripts": {
    "guidelines": "guideline-sync --verbose",
    "guidelines:backend": "guideline-sync --excluir-areas Frontend",
    "guidelines:frontend": "guideline-sync --incluir-areas Frontend"
  }
}
```

## 🐛 Troubleshooting

### Problemas Comunes

**❌ No se pudo conectar al Hub**
```bash
# Verificar conectividad
node bin/guideline-sync.js test

# Usar URL específica
node bin/guideline-sync.js -u http://localhost:3000/api/generar-contexto
```

**❌ Package.json no encontrado**
```bash
# Especificar ruta
node bin/guideline-sync.js -p /ruta/al/package.json

# Verificar que estás en la raíz del proyecto
pwd && ls package.json
```

**❌ No se encontraron directrices**
```bash
# Probar sin filtros
node bin/guideline-sync.js --verbose

# Verificar dependencias reconocidas
cat package.json | jq '.dependencies, .devDependencies'
```

## 🚀 Desarrollo

### Setup Local

```bash
# Clonar repositorio
git clone <repo-url>
cd ai-dome-hub/apps/cli

# Instalar dependencias
pnpm install

# Probar CLI
node bin/guideline-sync.js --help
```

### Uso Global (Recomendado para Desarrollo)

Para probar el comando `guideline-sync` en cualquier otro proyecto de tu máquina sin necesidad de publicarlo en un registro como npm, puedes crear un enlace simbólico global.

1.  **Asegúrate de estar en el directorio del CLI:**
    ```bash
    cd apps/cli
    ```

2.  **Crea el enlace global:**
    ```bash
    pnpm link --global
    ```

Ahora puedes ir a cualquier otro directorio en tu terminal y ejecutar `guideline-sync init` (o cualquier otro comando) como si fuera una herramienta instalada globalmente. Cualquier cambio que hagas en el código de `apps/cli` se reflejará inmediatamente.

#### Desvincular el comando

Cuando ya no necesites el enlace global, puedes eliminarlo ejecutando el siguiente comando desde el mismo directorio `apps/cli`:

```bash
pnpm unlink --global
```

### Estructura del Proyecto

```
apps/cli/
├── bin/
│   └── guideline-sync.js    # Script principal del CLI
├── package.json             # Configuración y dependencias
├── README.md               # Esta documentación
└── test-package.json       # Package.json de prueba
```

### Dependencias

- **commander**: CLI framework
- **axios**: HTTP client para comunicación con el Hub
- **chalk**: Colores en terminal para mejor UX
- **fs/path**: Manipulación de archivos nativos de Node.js

## 📚 Documentación Adicional

- 📖 **[Guía Completa de Uso](../docs/cli-usage-guide.md)**: Documentación detallada con ejemplos
- 🔧 **[Documentación del Endpoint](../docs/endpoint-generar-contexto.md)**: API del Hub
- 🐛 **[Guía de Debugging](../docs/debugging-guide.md)**: Troubleshooting avanzado
- ✅ **[Estado del Proyecto](../IMPLEMENTACION-COMPLETADA.md)**: Funcionalidades implementadas

## 🤝 Contribución

1. Fork el repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

MIT © AI Dome Hub

---

**💡 Tip**: Usa `--verbose` para obtener información detallada del proceso y facilitar el debugging.
❌ Error al sincronizar directrices:
   Error al leer package.json: Unexpected token
```

**Solución**: Revisa la sintaxis de tu `package.json`.

## Debugging

### Modo verbose

Usa `--verbose` para obtener información detallada:

```bash
guideline-sync --verbose
```

Esto mostrará:

- Ruta del package.json utilizado
- Información del proyecto (nombre, versión, dependencias)
- Tiempo de respuesta del Hub
- Estadísticas de directrices encontradas
- Información de debug del servidor

### Test de conectividad

```bash
guideline-sync test --url http://localhost:3000/api/generar-contexto
```

## Desarrollo y Testing

### Ejecutar tests

```bash
# Tests del CLI
node test-cli.js

# Test manual con output verbose
node bin/guideline-sync.js --verbose --output test-output.md
```

### Estructura del proyecto

```
apps/cli/
├── package.json          # Configuración y dependencias
├── bin/
│   └── guideline-sync.js  # Ejecutable principal
├── test-cli.js           # Suite de tests
└── README.md             # Esta documentación
```

## Dependencias

- **axios**: Cliente HTTP para comunicación con el Hub
- **commander**: Framework CLI para argumentos y comandos
- **chalk**: Colores y formato para terminal

## Configuración avanzada

### Variables de entorno

```bash
# URL por defecto del Hub
export GUIDELINE_SYNC_HUB_URL=https://hub.ai-dome.com/api/generar-contexto

# Timeout por defecto (ms)
export GUIDELINE_SYNC_TIMEOUT=30000
```

### Archivo de configuración

Puedes crear un `.guideline-syncrc.json` en tu proyecto:

```json
{
  "hubUrl": "https://hub.ai-dome.com/api/generar-contexto",
  "outputFile": "./docs/guidelines.md",
  "verbose": true
}
```

## Contribución

1. Fork el repositorio
2. Crea una rama para tu feature
3. Añade tests para nuevas funcionalidades
4. Ejecuta `node test-cli.js` para verificar
5. Crea un Pull Request

## Roadmap

- [ ] Soporte para archivos de configuración
- [ ] Cache local de directrices
- [ ] Integración con CI/CD
- [ ] Modo watch para auto-sincronización
- [ ] Plugin para VS Code
- [ ] Soporte para múltiples formatos de salida (HTML, PDF)

## Licencia

MIT
