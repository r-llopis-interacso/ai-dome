# Sistema Centralizado de Directrices para Asistentes de IA (Versión 3.0)

## 1. Concepto Evolucionado

# Sistema Centralizado de Directrices para Asistentes de IA (Versión 4.0)

## 1. Concepto

Este sistema centraliza la gestión y distribución de directrices de desarrollo para asistentes de IA. Esta versión refina la arquitectura hacia un **monorepo**, donde tanto el Hub de gestión como la herramienta cliente conviven en un único repositorio, y formaliza el proceso de "seeding" para la base de datos inicial.

## 2. Arquitectura del Repositorio (Monorepo)

Para simplificar la gestión y asegurar la sincronización entre el servidor y el cliente, el proyecto se estructurará como un **monorepo** utilizando **pnpm workspaces** (o npm/yarn workspaces).

**¿Puede el paquete NPM convivir con el proyecto de Payload?**
Sí, es una práctica recomendada para proyectos internos como este. El Hub de Payload y el paquete NPM cliente serán dos paquetes distintos dentro del mismo repositorio.

**Estructura de Carpetas:**
/ai-dome/
├── package.json # Raíz del monorepo, gestiona los workspaces
├── pnpm-workspace.yaml # Fichero de configuración de pnpm
└── /apps
├── /hub # El proyecto Payload CMS (servidor, API)
└── /cli # El script de sincronización (@tuempresa/guideline-sync)
Generated code
*   **`apps/hub`**: Es tu aplicación Payload. Se despliega como un servicio de larga duración.
*   **`apps/cli`**: Es el paquete de línea de comandos. Se publica en un registro de NPM (privado o público).

> **Nota:** La base de datos utilizada será **relacional (PostgreSQL)**, aprovechando el soporte nativo de Payload para Postgres. Se recomienda definir la variable de entorno `DATABASE_URI` con la cadena de conexión correspondiente.

### Componente 1: El Hub de Directrices (Payload CMS)

La instancia de Payload donde se gestiona todo el conocimiento.

#### Modelos de Datos (Colecciones):

**A. Colección `Directrices`:**
*   **`titulo` (Texto):** Nombre de la directriz.
*   **`contenido` (Rich Text):** El cuerpo de la directriz. El editor de Rich Text de Payload es ideal para esto, permitiendo formato y bloques de código.
*   **`activa` (Checkbox):** Para activar/desactivar la directriz.
*   **`etiquetas` (Relación):** Un campo de relación `hasMany` que lo vincula a la colección `Etiquetas`.

**B. Colección `Etiquetas` (La Clave de la Inteligencia):**
Este modelo es crucial y se redefine para soportar la herencia.

*   **`nombre` (Texto):** Nombre legible de la etiqueta (Ej: "React", "Pautas Transversales", "Agentes de IA").
*   **`aliasDePaquete` (Texto, opcional):** El nombre del paquete NPM (`react`, `next`, `prisma`) que se buscará en el `package.json`. No todas las etiquetas lo tendrán.
*   **`tipo` (Selección):** Un campo para categorizar la etiqueta. Opciones:
    *   `Tecnologia`: Una librería o framework específico (React, NestJS).
    *   `Conceptual`: Una pauta general (Transversal, Seguridad, Git).
    *   `Area`: Un dominio amplio (Frontend, Backend, IA).
*   **`dependeDe` (Relación `hasMany` a 'self'):** Este es el campo que implementa la herencia. Una etiqueta puede depender de otras.
    *   La etiqueta "Next.js" `dependeDe` la etiqueta "React".
    *   La etiqueta "React" `dependeDe` la etiqueta "TypeScript" y "Frontend Genérico".
    *   La etiqueta "Frontend Genérico" `dependeDe` la etiqueta "Transversal".

### Componente 2: La API de Contexto Inteligente

Un **Endpoint Personalizado** en Payload, definido en el archivo de configuración.

**Endpoint:** `POST /api/generar-contexto`

**Lógica de Herencia y Restricción:**

1.  **Entrada:** La API recibe el `package.json` del proyecto.
2.  **Coincidencia Inicial:** Busca todas las `Etiquetas` de tipo `Tecnologia` cuyo `aliasDePaquete` exista en las dependencias del `package.json`. Esto forma el conjunto inicial de etiquetas.
3.  **Resolución de Dependencias (El "Paso Mágico"):** La API recorre recursivamente el campo `dependeDe` de cada etiqueta del conjunto inicial, añadiendo todas las etiquetas padre al conjunto hasta que no haya más dependencias.
4.  **Recopilación Final:** El conjunto final contiene las etiquetas específicas de la tecnología y toda su cadena de "herencia" (ej: `Next.js`, `React`, `Frontend Genérico`, `TypeScript`, `Transversal`). Adicionalmente, siempre se incluyen etiquetas `Conceptuales` que no tengan dependencias, como "General".
5.  **Filtrado de Directrices:** Se buscan todas las `Directrices` activas que estén relacionadas con **cualquiera** de las etiquetas del conjunto final.
6.  **Generación y Salida:** Se compila el contenido de todas las directrices encontradas en un único archivo Markdown y se devuelve.

### Componente 3: El Script de Sincronización (Cliente NPM)

Sin cambios significativos. Es un paquete (`@tuempresa/guideline-sync`) que lee el `package.json` local, lo envía a la API y guarda la respuesta en un archivo.

## 3. Área de Desarrollo "IA"

Se crea una nueva `Etiqueta` de tipo `Area` llamada "Inteligencia Artificial". Dentro de esta, se pueden crear otras etiquetas conceptuales como "Agentes-Planificadores" o "Tailoring-Copilot". Las directrices asociadas se obtendrían cuando un desarrollador solicite explícitamente el contexto para esa área.

## 4. Visión a Futuro

La arquitectura actual es extensible. En el futuro, el `contenido` de una `Directriz` podría ampliarse con un campo `file` de Payload para adjuntar documentación completa, que el script cliente podría descargar.