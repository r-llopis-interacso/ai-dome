#!/usr/bin/env node

import { program } from 'commander';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

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
