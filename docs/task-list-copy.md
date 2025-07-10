# Lista de Tareas del Proyecto de Directrices de IA (Copia para seguimiento)

### Fase 1: Configuración del Hub de Directrices (Monorepo)

-   [x] **1.1: Configurar el Monorepo.**
    *   Iniciar un proyecto con `pnpm` (`pnpm init`).
    *   Crear la estructura de carpetas `apps/hub` y `apps/cli`.
    *   Configurar el `pnpm-workspace.yaml` para que reconozca los dos paquetes.
    *   [x] Estructura y archivos base creados automáticamente.

-   [x] **1.2: Iniciar el proyecto Payload CMS en `apps/hub`.**
    *   Navegar a `apps/hub` y ejecutar `pnpm create payload-app .`.
    *   Seguir los pasos de instalación.

-   [x] **1.3: Definir las Colecciones en `payload.config.ts`.**
    *   Definir las colecciones `Directrices` y `Etiquetas` con sus respectivos campos y relaciones (`relationship` a 'self' en Etiquetas).

-   [x] **1.4: Crear el Script de Seeding (`seed.ts`).**
    *   Crear el archivo `apps/hub/src/seed.ts` (como el del Documento 2).
    *   Crear una carpeta `apps/hub/src/docs_seed/` y colocar ahí los archivos `.md` de origen.
    *   Añadir un script en el `package.json` de `apps/hub`: `"seed": "cross-env PAYLOAD_CONFIG_PATH=src/payload.config.ts ts-node src/seed.ts"`.

-   [x] **1.5: Ejecutar el Seeding y verificar los datos.**
    *   Asegurarse de que la base de datos esté corriendo.
    *   Ejecutar `pnpm seed` desde la carpeta `apps/hub`.
    *   Abrir el panel de administración de Payload y verificar que las directrices y etiquetas se han creado correctamente con sus relaciones.

-   [ ] **1.6: Desplegar una versión inicial del Hub.**
    *   Configurar el despliegue de la aplicación `apps/hub` a un servicio de hosting (Vercel, Railway, etc.).

### Fase 2: Desarrollo de la API de Contexto Inteligente

-   [x] **2.1: Crear el Endpoint Personalizado en `payload.config.ts`.**
    *   Añadir un endpoint `POST /api/generar-contexto`.

-   [x] **2.2: Implementar la lógica del handler del endpoint.**
    *   Escribir el código que recibe el `package.json`, resuelve las dependencias de etiquetas de forma recursiva y devuelve el Markdown.

### Fase 3: Creación del Cliente NPM (`apps/cli`)

-   [x] **3.1: Configurar el proyecto `apps/cli` como un paquete de línea de comandos.**
    *   Configurar su propio `package.json` con un campo `bin` para que sea ejecutable.
    *   [x] Añadir dependencias útiles: `axios`, `commander`, `chalk` (opcional para CLI amigable).

-   [x] **3.2: Implementar la lógica del script CLI.**
    *   Leer el `package.json` local, llamar a la API del Hub y guardar la respuesta.
    *   [x] Considerar manejo de errores y mensajes claros para el usuario.

-   [ ] **3.3: Publicar el paquete en un registro privado (ej. GitHub Packages).**
    *   Configurar la autenticación con NPM y publicar la primera versión.

### Fase 4: Pruebas y Documentación

-   [ ] **4.1: Realizar pruebas End-to-End.**
    *   Crear un proyecto de prueba externo al monorepo.
    *   Instalar el paquete `@tuempresa/guideline-sync` desde el registro privado.
    *   Ejecutarlo y verificar que el archivo de contexto se genera correctamente.

-   [ ] **4.2: Documentar el uso del sistema.**
    *   Crear un `README.md` detallado en `apps/cli` explicando el proceso de instalación y uso para los desarrolladores.

---

## Detalles y Buenas Prácticas para el Futuro

-   Mantener la documentación de las colecciones y relaciones en el monorepo.
-   Documentar el proceso de seeding y cómo agregar nuevas directrices/etiquetas.
-   Añadir tests unitarios y de integración para la API y el CLI.
-   Considerar la seguridad del endpoint (autenticación, rate limiting) antes de exponerlo públicamente.
-   Añadir scripts de utilidad para backup/restore de la base de datos.
-   Mantener actualizado el `pnpm-lock.yaml` y revisar dependencias periódicamente.
-   Documentar el flujo de despliegue y CI/CD si se automatiza.
-   Añadir ejemplos de uso y troubleshooting en la documentación del CLI.
