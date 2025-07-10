#!/usr/bin/env node

/**
 * Script para probar el endpoint generar-contexto
 * Uso: node test-endpoint.js
 */

const packageJsonTest = {
  "name": "test-project",
  "dependencies": {
    "react": "^18.0.0",
    "typescript": "^5.0.0",
    "express": "^4.18.0"
  },
  "devDependencies": {
    "vite": "^4.0.0",
    "eslint": "^8.0.0"
  }
}

async function testEndpoint() {
  try {
    console.log('🧪 Iniciando prueba del endpoint...')
    console.log('📦 Package.json de prueba:', JSON.stringify(packageJsonTest, null, 2))
    
    const response = await fetch('http://localhost:3000/api/generar-contexto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        packageJson: packageJsonTest
      })
    })

    const contentType = response.headers.get('content-type')
    console.log('📋 Status:', response.status)
    console.log('📋 Content-Type:', contentType)

    if (contentType && contentType.includes('application/json')) {
      const data = await response.json()
      console.log('✅ Respuesta JSON:')
      console.log(JSON.stringify(data, null, 2))
      
      if (data.markdown) {
        console.log('\n📄 Markdown generado (primeros 500 caracteres):')
        console.log(data.markdown.substring(0, 500) + '...')
      }
    } else {
      const text = await response.text()
      console.log('📄 Respuesta texto:', text)
    }

  } catch (error) {
    console.error('❌ Error en la prueba:', error.message)
    console.error('💡 Asegúrate de que el servidor esté corriendo en http://localhost:3000')
  }
}

testEndpoint()
