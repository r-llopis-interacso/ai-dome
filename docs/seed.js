// En: apps/hub/src/seed.ts
import path from 'path'
import payload from 'payload'
import type { InitOptions } from 'payload/config'
import fs from 'fs'

/**
 * ------------------------------------------------------------------------------------------
 * Utilidad para leer el contenido de los archivos Markdown
 * ------------------------------------------------------------------------------------------
 * Asegúrate de que esta ruta sea correcta y que la carpeta 'docs_seed' exista
 * en la misma ubicación que este script.
 */
const getDocContent = (fileName: string): string => {
  try {
    const content = fs.readFileSync(path.resolve(__dirname, `./docs_seed/${fileName}`), 'utf8');
    return content;
  } catch (error) {
    console.error(`Error al leer el archivo ${fileName}:`, error);
    return '';
  }
}

/**
 * ------------------------------------------------------------------------------------------
 * Script principal de Seeding para la Base de Conocimiento de IA
 * ------------------------------------------------------------------------------------------
 */
export const seed = async (): Promise<void> => {
  // 1. Inicializar Payload para usar la API Local
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

  // 2. Crear Etiquetas en orden de dependencia (de lo general a lo específico)
  // Nivel 0: Conceptos Raíz
  const transversal = await payload.create({
    collection: 'etiquetas',
    data: { nombre: 'Transversal', tipo: 'Conceptual' },
  });

  // Nivel 1: Áreas y Herramientas Base (dependen de Transversal)
  const git = await payload.create({
    collection: 'etiquetas',
    data: { nombre: 'Git', tipo: 'Tecnologia', aliasDePaquete: 'git', dependeDe: [transversal.id] },
  });

  const testing = await payload.create({
    collection: 'etiquetas',
    data: { nombre: 'Testing', tipo: 'Area', dependeDe: [transversal.id] },
  });

  const typescript = await payload.create({
    collection: 'etiquetas',
    data: { nombre: 'TypeScript', tipo: 'Tecnologia', aliasDePaquete: 'typescript', dependeDe: [transversal.id] },
  });
  
  const nodejs = await payload.create({
    collection: 'etiquetas',
    data: { nombre: 'Node.js', tipo: 'Tecnologia', aliasDePaquete: 'node', dependeDe: [transversal.id] },
  });

  const frontendGenerico = await payload.create({
    collection: 'etiquetas',
    data: { nombre: 'Frontend Genérico', tipo: 'Area', dependeDe: [transversal.id, typescript.id, nodejs.id] },
  });

  // Nivel 2: Tecnologías y Frameworks Específicos
  const bitbucket = await payload.create({
    collection: 'etiquetas',
    data: { nombre: 'Bitbucket', tipo: 'Tecnologia', aliasDePaquete: 'bitbucket', dependeDe: [git.id] },
  });
  
  const react = await payload.create({
    collection: 'etiquetas',
    data: { nombre: 'React', tipo: 'Tecnologia', aliasDePaquete: 'react', dependeDe: [frontendGenerico.id] },
  });

  const tailwind = await payload.create({
    collection: 'etiquetas',
    data: { nombre: 'Tailwind CSS', tipo: 'Tecnologia', aliasDePaquete: 'tailwindcss', dependeDe: [frontendGenerico.id] },
  });

  const nestjs = await payload.create({
    collection: 'etiquetas',
    data: { nombre: 'NestJS', tipo: 'Tecnologia', aliasDePaquete: 'nestjs', dependeDe: [typescript.id, nodejs.id] },
  });

  // Nivel 3: Tecnologías que dependen de otras tecnologías
  const nextjs = await payload.create({
    collection: 'etiquetas',
    data: { nombre: 'Next.js', tipo: 'Tecnologia', aliasDePaquete: 'next', dependeDe: [react.id] },
  });
  
  const reactNative = await payload.create({
      collection: 'etiquetas',
      data: { nombre: 'React Native', tipo: 'Tecnologia', aliasDePaquete: 'react-native', dependeDe: [react.id] }
  });

  const expo = await payload.create({
      collection: 'etiquetas',
      data: { nombre: 'Expo', tipo: 'Tecnologia', aliasDePaquete: 'expo', dependeDe: [reactNative.id] }
  });

  console.log('Estructura de Etiquetas creada.');
  console.log('Seeding: Creando las Directrices y enlazándolas a las Etiquetas...');

  // 3. Crear todas las Directrices
  const directricesData = [
    // Transversal
    { titulo: 'Formato de los Ficheros', contenido: getDocContent('Formato de los ficheros 49d85f4bd1244d9888edaba74ef96779.md'), etiquetas: [transversal.id] },
    { titulo: 'Formato del Código (Prettier)', contenido: getDocContent('Formato del código 47c92e6e1d7546fcb9ec5e23d83025da.md'), etiquetas: [transversal.id] },
    { titulo: 'Estilo del Código (ESLint)', contenido: getDocContent('Estilo del código dc96628d9f74427690ce3a1e9b8453f5.md'), etiquetas: [transversal.id] },
    { titulo: 'Estructura de Carpetas', contenido: getDocContent('Estructura de carpetas 537d5a8429034bbc8efa8ef048e343f8.md'), etiquetas: [transversal.id] },
    { titulo: 'Nombres de Carpetas y Ficheros', contenido: getDocContent('Nombres de carpetas y ficheros 880cb48e34e24ed1bd7f8dcb4551377f.md'), etiquetas: [transversal.id] },
    { titulo: 'Estructura Modular', contenido: getDocContent('Estructura modular 418489f5a992423b9014934367daa4d0.md'), etiquetas: [transversal.id] },
    { titulo: 'Verificación de Reglas (Husky)', contenido: getDocContent('Verificación de reglas 36132afc0ccf4a2384654e3f948cbb92.md'), etiquetas: [transversal.id] },

    // Git y Bitbucket
    { titulo: 'Configuración de Git', contenido: getDocContent('Configuración de Git 31d7d878796049c8b72a83043d1dcbc9.md'), etiquetas: [git.id] },
    { titulo: 'Integración con Jira', contenido: getDocContent('Integración con Jira b85a709c8f574af9a1de54c7d00a7176.md'), etiquetas: [git.id, bitbucket.id] },
    { titulo: 'Mensajes para los Commits', contenido: getDocContent('Mensajes para los commits f8db559ca576456ebcdf55e72a3f7e60.md'), etiquetas: [git.id] },
    { titulo: 'Estructura para las Ramas', contenido: getDocContent('Estructura para las ramas 64543a3710824313bc6d10ff8ce31cd5.md'), etiquetas: [git.id] },
    { titulo: 'Estrategia al Fusionar Ramas (Squash)', contenido: getDocContent('Estrategia al fusionar ramas d6aa5b246d2d4cd78bf128fff3f513ce.md'), etiquetas: [git.id] },
    { titulo: 'Uso de Pull Requests', contenido: getDocContent('Uso de pull requests 785fb8c209cb422c802fbf7db6ecb1c4.md'), etiquetas: [bitbucket.id] },
    { titulo: 'Revisión de Código', contenido: getDocContent('Revisión de código ed8853ae39ce4ba7869cf476ad1fd8dd.md'), etiquetas: [bitbucket.id] },
    { titulo: 'Cierre de Pull Requests', contenido: getDocContent('Cierre de pull requests c091a91e96d24664992a171f3defaa3f.md'), etiquetas: [bitbucket.id] },

    // Lenguajes y Runtimes
    { titulo: 'Pautas de TypeScript', contenido: getDocContent('TypeScript 68dcd0191d43474a8702fef6d8ededad.md'), etiquetas: [typescript.id] },
    { titulo: 'Uso de Versiones de Node.js', contenido: getDocContent('Node js 40d67312656c4838bb5f38659f514269.md'), etiquetas: [nodejs.id] },

    // Frontend Genérico y Tipologías
    { titulo: 'Pautas para Frontales Genéricos', contenido: getDocContent('Frontales genéricos 4017a2bb8c864bb6bdeaa48630852ac3.md'), etiquetas: [frontendGenerico.id] },
    { titulo: 'Pautas para Frontales Web', contenido: getDocContent('Frontales web 7e517111e51a4dc787456564d37953d7.md'), etiquetas: [nextjs.id, tailwind.id] },
    { titulo: 'Pautas para Frontales Nativos', contenido: getDocContent('Frontales nativos 71771efe90a9468984c5157cfc802054.md'), etiquetas: [reactNative.id, expo.id] },

    // React
    { titulo: 'Motivación para usar React', contenido: getDocContent('Motivación 592b4117da074f0cbf81928798df057a.md'), etiquetas: [react.id] },
    { titulo: 'Estructura del Directorio en Proyectos React', contenido: getDocContent('Estructura del directorio 5c4b556ae2e848339b00e66439819f41.md'), etiquetas: [react.id] },
    { titulo: 'Manejo de Librerías de Terceros en React', contenido: getDocContent('Librerías de terceros 81e1e1b40903487bb57d8b33a648cada.md'), etiquetas: [react.id] },
    { titulo: 'Uso de Componentes en React', contenido: getDocContent('Uso de componentes fdab9d7b04454fb59c70f20d2a597e21.md'), etiquetas: [react.id] },
    { titulo: 'Tipos de Componentes (Jerarquía)', contenido: getDocContent('Tipos de componentes ec4e503fe001413097bafc69ccee22f4.md'), etiquetas: [react.id] },
    { titulo: 'Estructura de los Componentes React', contenido: getDocContent('Estructura de los componentes 09be5f86243b4d2b8aa7e44c0fc654f5.md'), etiquetas: [react.id] },
    { titulo: 'Estructura de los Hooks React', contenido: getDocContent('Estructura de los hooks 38a093af70964602ba89fac3d0d5c75e.md'), etiquetas: [react.id] },
    { titulo: 'Patrón de Estado Distribuido (Context API)', contenido: getDocContent('Estado distribuido 6f5fc8dfd11741f78d70fa2f6be004e5.md'), etiquetas: [react.id] },
    
    // Tailwind
    { titulo: 'Pautas para Tailwind CSS', contenido: getDocContent('Tailwind CSS f2720a433edd4880b508b96b6e79f05f.md'), etiquetas: [tailwind.id] },
    { titulo: 'Clases CSS con Tailwind', contenido: getDocContent('Clases CSS faea16965c45479d9f4f78bf26a6ecb6.md'), etiquetas: [tailwind.id] },
    
    // NestJS
    { titulo: 'Introducción a NestJS', contenido: getDocContent('Introducción 4c5f253c3a71448f868ab674ed7dad1f.md'), etiquetas: [nestjs.id] },
    { titulo: 'Fundamentos y Arquitectura de NestJS', contenido: getDocContent('Fundamentos y arquitectura 9bf2043199434327928130757e09bc46.md'), etiquetas: [nestjs.id] },
    { titulo: 'Casos de Uso de NestJS', contenido: getDocContent('Casos de uso afa8c18441d44c60afbb7d07691563a0.md'), etiquetas: [nestjs.id] },
    
    // Testing
    { titulo: 'Implantación de Pruebas Unitarias', contenido: getDocContent('Implantación de pruebas unitarias 9a60cb08f5774eb39a3b942dc8c16189.md'), etiquetas: [testing.id] },
    { titulo: 'Detalles Técnicos sobre Pruebas Unitarias', contenido: getDocContent('Detalles técnicos sobre pruebas unitarias 2ae917749e72429c9f0db8d69977599d.md'), etiquetas: [testing.id] },
    { titulo: 'Ejemplos de Pruebas Unitarias', contenido: getDocContent('Ejemplos de pruebas unitarias b106f42243aa44be913b4f11e4793825.md'), etiquetas: [testing.id] },
  ];

  for (const directriz of directricesData) {
    await payload.create({
      collection: 'directrices',
      data: { ...directriz, activa: true },
    });
  }

  console.log('¡Seeding completado con éxito!');
  process.exit(0);
}

// Ejecutar el script (puedes llamarlo desde un comando en package.json)
// seed();