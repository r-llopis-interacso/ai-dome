#!/usr/bin/env node

import { program } from 'commander';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para validar URL
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Función para mostrar estadísticas
function mostrarEstadisticas(stats) {
  if (!stats) return;
  
  console.log(chalk.blue('\n📊 Estadísticas:'));
  console.log(chalk.gray(`  • Dependencias analizadas: ${stats.dependenciasAnalizadas || 0}`));
  console.log(chalk.gray(`  • Etiquetas encontradas: ${stats.etiquetasEncontradas || 0}`));
  console.log(chalk.gray(`  • Directrices relacionadas: ${stats.directricesRelacionadas || 0}`));
  console.log(chalk.gray(`  • Áreas de desarrollo: ${stats.areasDesarrollo || 0}`));
}

// Función para mostrar debug info
function mostrarDebugInfo(debug, verbose) {
  if (!debug || !verbose) return;
  
  console.log(chalk.magenta('\n🔍 Información de debug:'));
  if (debug.dependenciasExtraidas?.length > 0) {
    console.log(chalk.gray(`  • Dependencias extraídas: ${debug.dependenciasExtraidas.join(', ')}`));
  }
  if (debug.etiquetasEncontradas?.length > 0) {
    console.log(chalk.gray(`  • Etiquetas encontradas: ${debug.etiquetasEncontradas.map(e => e.nombre).join(', ')}`));
  }
  if (debug.areasAgrupacion?.length > 0) {
    console.log(chalk.gray(`  • Áreas de agrupación: ${debug.areasAgrupacion.join(', ')}`));
  }
}

// Función para ejecutar repomix y obtener el contexto
async function ejecutarRepomix(verbose = false) {
  return new Promise((resolve, reject) => {
    if (verbose) {
      console.log(chalk.blue('🔍 Ejecutando repomix para analizar el proyecto...'));
    }

    // Get the path to the CLI directory's repomix config
    const configPath = path.join(__dirname, '..', 'repomix.config.json');
    
    const repomixProcess = spawn('npx', ['repomix', '--stdout', '--config', configPath], {
      stdio: ['inherit', 'pipe', 'pipe'],
      shell: false // Changed from true to false to avoid deprecation warning
    });

    let output = '';
    let errorOutput = '';

    repomixProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    repomixProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
      if (verbose) {
        console.log(chalk.gray(data.toString()));
      }
    });

    repomixProcess.on('close', (code) => {
      if (code === 0) {
        if (verbose) {
          console.log(chalk.green('✅ Repomix ejecutado exitosamente'));
        }
        resolve(output);
      } else {
        reject(new Error(`Repomix falló con código ${code}: ${errorOutput}`));
      }
    });

    repomixProcess.on('error', (error) => {
      reject(new Error(`Error ejecutando repomix: ${error.message}`));
    });
  });
}

// Función para inicializar documentación completa
async function inicializarDocumentacion(opciones) {
  const { output, url, verbose } = opciones;
  const startTime = Date.now();
  
  try {
    console.log(chalk.blue('🚀 Iniciando generación de documentación completa...'));
    console.log(chalk.gray(`📍 Directorio actual: ${process.cwd()}`));
    console.log(chalk.gray(`🎯 Archivo de salida: ${output}`));
    console.log(chalk.gray(`🔗 URL del Hub: ${url}`));
    
    // Paso 1: Ejecutar repomix
    console.log(chalk.yellow('\n📦 Paso 1: Analizando proyecto con repomix...'));
    const repomixStartTime = Date.now();
    const repomixContext = await ejecutarRepomix(true); // Always verbose for this step
    const repomixTime = Date.now() - repomixStartTime;
    
    console.log(chalk.green(`✅ Repomix completado en ${repomixTime}ms`));
    console.log(chalk.blue(`📄 Contexto generado: ${repomixContext.length} caracteres (${Math.round(repomixContext.length / 1024)} KB)`));
    
    // Paso 2: Llamar al endpoint del Hub
    console.log(chalk.yellow('\n🤖 Paso 2: Enviando contexto a IA para generar documentación...'));
    const endpointUrl = `${url}/api/generar-documentacion-completa`;
    console.log(chalk.blue(`🔗 Enviando contexto a: ${endpointUrl}`));
    
    const apiStartTime = Date.now();
    const response = await axios.post(endpointUrl, {
      repomixContext: repomixContext
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 120000 // 2 minutos de timeout para la IA
    });
    const apiTime = Date.now() - apiStartTime;
    
    console.log(chalk.green(`✅ Respuesta de IA recibida en ${apiTime}ms`));
    
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    
    // Paso 3: Escribir ambos archivos generados (ai-readme.md y copilot-instructions.md)
    console.log(chalk.yellow('\n📝 Paso 3: Escribiendo archivos de documentación...'));
    const { readme, agent } = response.data;
    if (!readme || !agent) throw new Error('Respuesta inválida del servidor: faltan archivos.');
    // Escribir ai-readme.md
    fs.writeFileSync(readme.filename, readme.content, 'utf8');
    // Escribir copilot-instructions.md
    fs.writeFileSync(agent.filename, agent.content, 'utf8');
    const totalTime = Date.now() - startTime;
    console.log(chalk.green(`\n✅ Documentación generada exitosamente:`));
    console.log(chalk.blue(`   - ${readme.filename} (${Math.round(readme.content.length / 1024)} KB)`));
    console.log(chalk.blue(`   - ${agent.filename} (${Math.round(agent.content.length / 1024)} KB)`));
    console.log(chalk.blue(`📝 Tamaño del archivo: ${Math.round(finalContent.length / 1024)} KB`));
    console.log(chalk.blue(`⏱️  Tiempo total: ${totalTime}ms`));
    
    // Show detailed timing breakdown
    if (verbose) {
      console.log(chalk.gray(`\n⏱️  Desglose de tiempos:`));
      console.log(chalk.gray(`   • Análisis con repomix: ${repomixTime}ms`));
      console.log(chalk.gray(`   • Generación con IA: ${apiTime}ms`));
      console.log(chalk.gray(`   • Otros procesos: ${totalTime - repomixTime - apiTime}ms`));
    }
    
  } catch (error) {
    console.log(chalk.red('❌ Error generando documentación:'));
    
    // More detailed error logging
    if (error.response) {
      console.log(chalk.red(`   🌐 Error de respuesta HTTP:`));
      console.log(chalk.red(`   Status: ${error.response.status} (${error.response.statusText || 'Sin descripción'})`));
      console.log(chalk.red(`   URL: ${error.config?.url || 'URL no disponible'}`));
      console.log(chalk.red(`   Error: ${error.response.data?.error || 'Error desconocido'}`));
      
      if (error.response.data?.details) {
        console.log(chalk.red(`   Detalles del servidor: ${error.response.data.details}`));
      }
      
      if (error.response.data?.timestamp) {
        console.log(chalk.red(`   Timestamp del error: ${error.response.data.timestamp}`));
      }
      
      if (error.response.data?.executionTimeMs) {
        console.log(chalk.red(`   Tiempo de ejecución: ${error.response.data.executionTimeMs}ms`));
      }
      
      if (verbose && error.response.headers) {
        console.log(chalk.red(`   Headers de respuesta:`));
        Object.entries(error.response.headers).forEach(([key, value]) => {
          console.log(chalk.gray(`     ${key}: ${value}`));
        });
      }
      
    } else if (error.request) {
      console.log(chalk.red(`   🔌 Error de conexión:`));
      console.log(chalk.red(`   No se pudo conectar al Hub en: ${url}`));
      console.log(chalk.red(`   Verifica que el Hub esté ejecutándose y accesible`));
      console.log(chalk.red(`   Método: ${error.config?.method?.toUpperCase() || 'N/A'}`));
      console.log(chalk.red(`   Timeout: ${error.config?.timeout || 'default'}ms`));
      
      if (error.code) {
        console.log(chalk.red(`   Código de error: ${error.code}`));
      }
      
    } else {
      console.log(chalk.red(`   ⚡ Error interno:`));
      console.log(chalk.red(`   ${error.message}`));
      
      if (error.name && error.name !== 'Error') {
        console.log(chalk.red(`   Tipo de error: ${error.name}`));
      }
    }
    
    if (verbose && error.stack) {
      console.log(chalk.red(`   📚 Stack trace completo:`));
      console.log(chalk.gray(error.stack));
    }
    
    // Additional context
    console.log(chalk.yellow(`   💡 Contexto adicional:`));
    // Muevo el log del tamaño del contexto aquí, donde repomixContext está definido
    console.log(chalk.yellow(`   - Tamaño del contexto enviado: ${Math.round(repomixContext.length / 1024)} KB`));
    console.log(chalk.yellow(`   - Timestamp: ${new Date().toISOString()}`));
    console.log(chalk.yellow(`   - Archivo de salida esperado: ${output}`));
    
    process.exit(1);
  }
}

// Función principal
async function sincronizarDirectrices(opciones) {
  const { 
    output, 
    url, 
    verbose, 
    packagePath,
    incluirAreas,
    excluirAreas,
    incluirEtiquetas,
    excluirEtiquetas
  } = opciones;
  
  try {
    // Construir filtros si se proporcionaron
    const filtros = {};
    
    if (incluirAreas) {
      filtros.incluirAreas = incluirAreas.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (excluirAreas) {
      filtros.excluirAreas = excluirAreas.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (incluirEtiquetas) {
      filtros.incluirEtiquetas = incluirEtiquetas.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (excluirEtiquetas) {
      filtros.excluirEtiquetas = excluirEtiquetas.split(',').map(s => s.trim()).filter(Boolean);
    }
    
    const tieneAgenFiltros = Object.keys(filtros).length > 0;
    
    if (verbose && tieneAgenFiltros) {
      console.log(chalk.magenta('🔧 Filtros aplicados:'));
      Object.entries(filtros).forEach(([key, value]) => {
        console.log(chalk.gray(`  • ${key}: ${value.join(', ')}`));
      });
    }
    
    // Validar URL
    if (!isValidUrl(url)) {
      throw new Error(`URL inválida: ${url}`);
    }
    
    // Buscar package.json
    const pkgPath = packagePath || path.resolve(process.cwd(), 'package.json');
    
    if (verbose) {
      console.log(chalk.blue(`🔍 Buscando package.json en: ${pkgPath}`));
    }
    
    if (!fs.existsSync(pkgPath)) {
      throw new Error(`No se encontró package.json en: ${pkgPath}`);
    }
    
    // Leer y validar package.json
    let pkg;
    try {
      const pkgContent = fs.readFileSync(pkgPath, 'utf8');
      pkg = JSON.parse(pkgContent);
    } catch (err) {
      throw new Error(`Error al leer package.json: ${err.message}`);
    }
    
    if (verbose) {
      console.log(chalk.blue(`📦 Proyecto: ${pkg.name || 'Sin nombre'} v${pkg.version || 'Sin versión'}`));
      const totalDeps = Object.keys(pkg.dependencies || {}).length + Object.keys(pkg.devDependencies || {}).length;
      console.log(chalk.blue(`📋 Total de dependencias: ${totalDeps}`));
    }
    
    // Hacer petición al endpoint
    console.log(chalk.yellow('🚀 Conectando con el Hub...'));
    
    const startTime = Date.now();
    let response;
    
    try {
      const requestBody = { packageJson: pkg };
      
      // Añadir filtros si se especificaron
      if (tieneAgenFiltros) {
        requestBody.filtros = filtros;
      }
      
      response = await axios.post(url, requestBody, {
        timeout: 30000, // 30 segundos timeout
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'guideline-sync-cli/1.0.0'
        }
      });
    } catch (err) {
      if (err.code === 'ECONNREFUSED') {
        throw new Error(`No se pudo conectar al Hub en ${url}. ¿Está ejecutándose el servidor?`);
      } else if (err.response) {
        throw new Error(`Error del servidor (${err.response.status}): ${err.response.data?.error || err.response.statusText}`);
      } else if (err.code === 'ECONNABORTED') {
        throw new Error('Timeout: La petición tardó demasiado en responder');
      } else {
        throw new Error(`Error de red: ${err.message}`);
      }
    }
    
    const requestTime = Date.now() - startTime;
    
    if (verbose) {
      console.log(chalk.green(`✅ Respuesta recibida en ${requestTime}ms`));
    }
    
    // Validar respuesta
    const data = response.data;
    if (!data || !data.markdown) {
      throw new Error('Respuesta inválida del servidor: falta el contenido markdown');
    }
    
    // Crear directorio de salida si no existe
    const outputDir = path.dirname(output);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      if (verbose) {
        console.log(chalk.blue(`📁 Creado directorio: ${outputDir}`));
      }
    }
    
    // Escribir archivo
    try {
      fs.writeFileSync(output, data.markdown, 'utf8');
    } catch (err) {
      throw new Error(`Error al escribir archivo ${output}: ${err.message}`);
    }
    
    // Mostrar resultados
    const fileSize = fs.statSync(output).size;
    console.log(chalk.green(`✅ Directrices sincronizadas exitosamente!`));
    console.log(chalk.green(`📄 Archivo guardado: ${output} (${fileSize} bytes)`));
    
    // Mostrar estadísticas
    mostrarEstadisticas(data.estadisticas);
    
    // Mostrar debug info si está habilitado
    mostrarDebugInfo(data.debug, verbose);
    
    if (verbose) {
      console.log(chalk.blue(`⏱️  Tiempo total: ${Date.now() - startTime}ms`));
    }
    
  } catch (error) {
    console.error(chalk.red('❌ Error al sincronizar directrices:'));
    console.error(chalk.red(`   ${error.message}`));
    
    if (verbose && error.stack) {
      console.error(chalk.gray('\n🔍 Stack trace:'));
      console.error(chalk.gray(error.stack));
    }
    
    process.exit(1);
  }
}

// Configurar programa CLI
program
  .name('guideline-sync')
  .description('CLI para sincronizar directrices de desarrollo desde el Hub centralizado')
  .version('1.0.0')
  .option('-o, --output <file>', 'Archivo de salida para las directrices', 'directrices.md')
  .option('-u, --url <url>', 'URL del endpoint del Hub', 'http://localhost:3000/api/generar-contexto')
  .option('-p, --package-path <path>', 'Ruta específica al package.json a analizar')
  .option('-v, --verbose', 'Mostrar información detallada del proceso')
  .option('--incluir-areas <areas>', 'Solo incluir estas áreas (separadas por comas)')
  .option('--excluir-areas <areas>', 'Excluir estas áreas (separadas por comas)')
  .option('--incluir-etiquetas <etiquetas>', 'Solo incluir estas etiquetas (separadas por comas)')
  .option('--excluir-etiquetas <etiquetas>', 'Excluir estas etiquetas (separadas por comas)')
  .action(async (options) => {
    await sincronizarDirectrices(options);
  });

// Comando init para generar documentación completa

program
  .command('init')
  .description('Inicializar documentación completa del proyecto con IA')
  .option('-u, --url <url>', 'URL del Hub', 'http://localhost:3000')
  .option('-v, --verbose', 'Mostrar información detallada del proceso')
  .action(async (options) => {
    const { url, verbose } = options;
    const endpointUrl = `${url.replace(/\/$/, '')}/api/generar-documentacion-completa`;
    const startTime = Date.now();
    try {
      console.log(chalk.blue('🚀 Iniciando generación de documentación completa (ai-readme.md y copilot-instructions.md)...'));
      // Paso 1: Ejecutar repomix
      console.log(chalk.yellow('\n📦 Paso 1: Analizando proyecto con repomix...'));
      const repomixContext = await ejecutarRepomix(true);
      console.log(chalk.green('✅ Repomix completado'));
      // Paso 2: Llamar al endpoint del Hub
      console.log(chalk.yellow('\n🤖 Paso 2: Enviando contexto a IA para generar documentación...'));
      const response = await axios.post(endpointUrl, { repomixContext }, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 120000
      });
      if (response.data.error) throw new Error(response.data.error);
      // Paso 3: Escribir ambos archivos
      const { readme, agent } = response.data;
      if (!readme || !agent) throw new Error('Respuesta inválida del servidor: faltan archivos.');
      fs.writeFileSync(readme.filename, readme.content, 'utf8');
      fs.writeFileSync(agent.filename, agent.content, 'utf8');
      console.log(chalk.green(`\n✅ Documentación generada exitosamente:`));
      console.log(chalk.blue(`   - ${readme.filename} (${Math.round(readme.content.length / 1024)} KB)`));
      console.log(chalk.blue(`   - ${agent.filename} (${Math.round(agent.content.length / 1024)} KB)`));
      if (verbose) {
        console.log(chalk.blue(`⏱️  Tiempo total: ${Date.now() - startTime}ms`));
      }
    } catch (error) {
      console.log(chalk.red('❌ Error generando documentación:'));
      if (error.response) {
        console.log(chalk.red(`   🌐 Error de respuesta HTTP:`));
        console.log(chalk.red(`   Status: ${error.response.status} (${error.response.statusText || 'Sin descripción'})`));
        if (error.response.data?.error) {
          console.log(chalk.red(`   Error: ${error.response.data.error}`));
        }
      } else {
        console.log(chalk.red(`   ${error.message}`));
      }
      if (verbose && error.stack) {
        console.log(chalk.gray('\n🔍 Stack trace:'));
        console.log(chalk.gray(error.stack));
      }
      process.exit(1);
    }
  });

// Comando adicional para verificar conectividad
program
  .command('test')
  .description('Verificar conectividad con el Hub')
  .option('-u, --url <url>', 'URL del endpoint del Hub', 'http://localhost:3000/api/generar-contexto')
  .action(async (options) => {
    try {
      console.log(chalk.yellow(`🔗 Probando conectividad con: ${options.url}`));
      
      const startTime = Date.now();
      const response = await axios.get(options.url.replace('/generar-contexto', '/health'), {
        timeout: 10000
      });
      const responseTime = Date.now() - startTime;
      
      console.log(chalk.green(`✅ Conexión exitosa (${responseTime}ms)`));
      console.log(chalk.blue(`   Status: ${response.status}`));
      
    } catch (error) {
      console.log(chalk.red(`❌ Error de conectividad:`));
      console.log(chalk.red(`   ${error.message}`));
      process.exit(1);
    }
  });

program.parse(process.argv);
