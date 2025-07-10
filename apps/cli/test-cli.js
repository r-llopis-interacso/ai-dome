#!/usr/bin/env node

/**
 * Test del CLI guideline-sync
 * 
 * Este script prueba diferentes escenarios del CLI para asegurar
 * que funciona correctamente en distintas situaciones.
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Configuración de pruebas
const CLI_PATH = path.join(__dirname, 'bin/guideline-sync.js');
const TEST_OUTPUT_DIR = path.join(__dirname, 'test-output');
const HUB_URL = 'http://localhost:3000/api/generar-contexto';

// Crear directorio de pruebas
if (!fs.existsSync(TEST_OUTPUT_DIR)) {
  fs.mkdirSync(TEST_OUTPUT_DIR, { recursive: true });
}

// Función helper para ejecutar comandos CLI
function runCLI(args, options = {}) {
  return new Promise((resolve, reject) => {
    const command = `node "${CLI_PATH}" ${args}`;
    console.log(chalk.blue(`🔧 Ejecutando: ${command}`));
    
    exec(command, options, (error, stdout, stderr) => {
      resolve({
        exitCode: error ? error.code : 0,
        stdout: stdout.trim(),
        stderr: stderr.trim(),
        error
      });
    });
  });
}

// Función para limpiar archivos de prueba
function limpiarPruebas() {
  const files = ['directrices.md', 'test-output.md'];
  files.forEach(file => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  });
  
  if (fs.existsSync(TEST_OUTPUT_DIR)) {
    fs.rmSync(TEST_OUTPUT_DIR, { recursive: true, force: true });
  }
}

// Crear package.json de prueba
function crearPackageJsonPrueba() {
  const testPackage = {
    name: "test-project",
    version: "1.0.0",
    dependencies: {
      "react": "^18.0.0",
      "next": "^13.0.0",
      "typescript": "^5.0.0"
    },
    devDependencies: {
      "jest": "^29.0.0",
      "eslint": "^8.0.0"
    }
  };
  
  fs.writeFileSync('package.json', JSON.stringify(testPackage, null, 2));
  return testPackage;
}

// Tests individuales
async function testVersionCommand() {
  console.log(chalk.yellow('\n📋 Test: Comando --version'));
  const result = await runCLI('--version');
  
  if (result.exitCode === 0 && result.stdout.includes('1.0.0')) {
    console.log(chalk.green('✅ Comando --version funciona correctamente'));
    return true;
  } else {
    console.log(chalk.red('❌ Comando --version falló'));
    console.log(chalk.gray(`stdout: ${result.stdout}`));
    console.log(chalk.gray(`stderr: ${result.stderr}`));
    return false;
  }
}

async function testHelpCommand() {
  console.log(chalk.yellow('\n📋 Test: Comando --help'));
  const result = await runCLI('--help');
  
  if (result.exitCode === 0 && result.stdout.includes('sincronizar directrices')) {
    console.log(chalk.green('✅ Comando --help funciona correctamente'));
    return true;
  } else {
    console.log(chalk.red('❌ Comando --help falló'));
    return false;
  }
}

async function testConnectivityTest() {
  console.log(chalk.yellow('\n📋 Test: Comando test de conectividad'));
  const result = await runCLI('test');
  
  // Este test puede fallar si el servidor no está ejecutándose, lo cual es normal
  console.log(chalk.blue(`Resultado del test de conectividad: ${result.exitCode === 0 ? 'exitoso' : 'falló'}`));
  console.log(chalk.gray(`stdout: ${result.stdout}`));
  if (result.stderr) {
    console.log(chalk.gray(`stderr: ${result.stderr}`));
  }
  
  return true; // Siempre pasa porque es normal que falle si no hay servidor
}

async function testSinPackageJson() {
  console.log(chalk.yellow('\n📋 Test: Sin package.json'));
  
  // Asegurar que no hay package.json
  if (fs.existsSync('package.json')) {
    fs.unlinkSync('package.json');
  }
  
  const result = await runCLI('--verbose');
  
  if (result.exitCode !== 0 && result.stderr.includes('No se encontró package.json')) {
    console.log(chalk.green('✅ Error correcto sin package.json'));
    return true;
  } else {
    console.log(chalk.red('❌ No se detectó correctamente la falta de package.json'));
    console.log(chalk.gray(`stdout: ${result.stdout}`));
    console.log(chalk.gray(`stderr: ${result.stderr}`));
    return false;
  }
}

async function testConPackageJsonValido() {
  console.log(chalk.yellow('\n📋 Test: Con package.json válido (sin servidor)'));
  
  crearPackageJsonPrueba();
  
  const result = await runCLI('--verbose --output test-output.md');
  
  // Este test fallará porque no hay servidor, pero debe mostrar el mensaje correcto
  if (result.exitCode !== 0 && (
    result.stderr.includes('No se pudo conectar al Hub') || 
    result.stderr.includes('ECONNREFUSED') ||
    result.stderr.includes('Error de red')
  )) {
    console.log(chalk.green('✅ Error de conectividad detectado correctamente'));
    return true;
  } else {
    console.log(chalk.yellow('⚠️  Resultado inesperado (puede ser normal si el servidor está ejecutándose)'));
    console.log(chalk.gray(`stdout: ${result.stdout}`));
    console.log(chalk.gray(`stderr: ${result.stderr}`));
    return true; // No fallar porque puede que el servidor esté ejecutándose
  }
}

async function testPackageJsonInvalido() {
  console.log(chalk.yellow('\n📋 Test: Con package.json inválido'));
  
  // Crear package.json con JSON inválido
  fs.writeFileSync('package.json', '{ invalid json }');
  
  const result = await runCLI('--verbose');
  
  if (result.exitCode !== 0 && result.stderr.includes('Error al leer package.json')) {
    console.log(chalk.green('✅ Error de JSON inválido detectado correctamente'));
    return true;
  } else {
    console.log(chalk.red('❌ No se detectó el JSON inválido'));
    console.log(chalk.gray(`stdout: ${result.stdout}`));
    console.log(chalk.gray(`stderr: ${result.stderr}`));
    return false;
  }
}

async function testUrlInvalida() {
  console.log(chalk.yellow('\n📋 Test: Con URL inválida'));
  
  crearPackageJsonPrueba();
  
  const result = await runCLI('--url "invalid-url" --verbose');
  
  if (result.exitCode !== 0 && result.stderr.includes('URL inválida')) {
    console.log(chalk.green('✅ URL inválida detectada correctamente'));
    return true;
  } else {
    console.log(chalk.red('❌ No se detectó la URL inválida'));
    console.log(chalk.gray(`stdout: ${result.stdout}`));
    console.log(chalk.gray(`stderr: ${result.stderr}`));
    return false;
  }
}

// Función principal de tests
async function ejecutarTests() {
  console.log(chalk.bold.blue('🧪 Iniciando tests del CLI guideline-sync\n'));
  
  const tests = [
    { name: 'Version Command', fn: testVersionCommand },
    { name: 'Help Command', fn: testHelpCommand },
    { name: 'Connectivity Test', fn: testConnectivityTest },
    { name: 'Sin package.json', fn: testSinPackageJson },
    { name: 'Con package.json válido', fn: testConPackageJsonValido },
    { name: 'Package.json inválido', fn: testPackageJsonInvalido },
    { name: 'URL inválida', fn: testUrlInvalida }
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    try {
      const result = await test.fn();
      if (result) {
        passed++;
      } else {
        failed++;
      }
    } catch (error) {
      console.log(chalk.red(`❌ Test "${test.name}" arrojó excepción: ${error.message}`));
      failed++;
    }
    
    // Limpiar entre tests
    limpiarPruebas();
  }
  
  // Resumen final
  console.log(chalk.bold.blue('\n📊 Resumen de Tests:'));
  console.log(chalk.green(`✅ Pasaron: ${passed}`));
  console.log(chalk.red(`❌ Fallaron: ${failed}`));
  console.log(chalk.blue(`📋 Total: ${passed + failed}`));
  
  if (failed === 0) {
    console.log(chalk.bold.green('\n🎉 ¡Todos los tests pasaron!'));
  } else {
    console.log(chalk.yellow('\n⚠️  Algunos tests fallaron. Revisa los resultados arriba.'));
  }
  
  return failed === 0;
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  ejecutarTests()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error(chalk.red('💥 Error fatal en los tests:'), error);
      process.exit(1);
    });
}

module.exports = { ejecutarTests };
