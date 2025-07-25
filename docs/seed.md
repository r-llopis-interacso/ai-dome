# Guía del Script de Seeding

Este documento describe el funcionamiento y uso del script de *seeding* ubicado en `apps/hub/src/seed.ts`. El propósito de este script es poblar la base de datos del Hub con un conjunto inicial de `Etiquetas` y `Directrices` para asegurar que el sistema sea funcional desde el primer momento.

## 1. Visión General

El script realiza las siguientes acciones en orden:

1.  **Inicializa Payload:** Carga una instancia local de Payload para poder interactuar con la base de datos.
2.  **Limpia Datos Antiguos:** Elimina todas las entradas existentes en las colecciones `directrices` y `etiquetas` para evitar duplicados.
3.  **Crea Etiquetas:** Define y crea una jerarquía de `Etiquetas` con sus dependencias (`dependeDe`). Esto se hace en varios niveles, desde conceptos generales como "Transversal" hasta tecnologías específicas como "Next.js".
4.  **Crea Directrices:** Lee el contenido de varios archivos Markdown ubicados en `apps/hub/src/docs_seed/` y crea una `Directriz` por cada uno, enlazándola a las `Etiquetas` correspondientes creadas en el paso anterior.

## 2. Estructura de la Jerarquía de Etiquetas

El script establece una estructura de dependencias para que el sistema pueda inferir contextos completos. Por ejemplo:

- **Next.js** depende de **React**.
- **React** depende de **Frontend Genérico**.
- **Frontend Genérico** depende de **TypeScript** y **Node.js**.
- **TypeScript** y **Node.js** dependen de **Transversal**.

Cuando el CLI analiza un proyecto que usa `next`, el Hub recupera no solo las directrices de Next.js, sino también las de React, Frontend, TypeScript, Node.js y las transversales, proporcionando un contexto completo.

## 3. Fuente de Datos

El contenido de cada directriz se extrae de archivos `.md` individuales que se encuentran en el directorio:

```
apps/hub/src/docs_seed/
```

La función `getDocContent` dentro del script es la responsable de leer estos archivos.

## 4. Cómo Ejecutar el Script

Para poblar la base de datos, puedes usar el comando `pnpm` definido en el `package.json` del Hub.

1.  **Asegúrate de que tu base de datos (MongoDB o PostgreSQL) esté en ejecución.**
2.  **Navega al directorio del Hub:**
    ```bash
    cd apps/hub
    ```
3.  **Ejecuta el comando de seed:**
    ```bash
    pnpm seed
    ```

El script se ejecutará, mostrará el progreso en la consola y finalizará automáticamente. Después de esto, tu panel de administración de Payload debería estar poblado con todas las etiquetas y directrices.

## 5. Código del Script (`apps/hub/src/seed.ts`)

A continuación se muestra el código fuente del script como referencia.

```typescript
// En: apps/hub/src/seed.ts
import path from 'path'
import payload from 'payload'
import fs from 'fs'

const getDocContent = (fileName) => {
  try {
    const content = fs.readFileSync(path.resolve(__dirname, `./docs_seed/${fileName}`), 'utf8');
    return content;
  } catch (error) {
    console.error(`Error al leer el archivo ${fileName}:`, error);
    return '';
  }
}

export const seed = async () => {
  console.log('Inicializando Payload para el seeding...');
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'una-clave-secreta-para-desarrollo',
    mongoURL: process.env.MONGODB_URI || 'mongodb://127.0.0.1/directrices-ia-hub',
    local: true,
  });

  console.log('Limpiando datos existentes...');
  await payload.delete({ collection: 'directrices', where: {} });
  await payload.delete({ collection: 'etiquetas', where: {} });

  console.log('Seeding: Creando la estructura de Etiquetas con sus dependencias...');

  // ... (Lógica de creación de etiquetas y directrices) ...

  console.log('¡Seeding completado con éxito!');
  process.exit(0);
}
```
