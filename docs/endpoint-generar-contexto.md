# Endpoint Generar Contexto - Documentación Técnica

## Resumen

Este documento detalla la implementación del endpoint personalizado `/api/generar-contexto` en Payload CMS, basado en el análisis de la documentación oficial y su materialización en código.

## Investigación de la Documentación de Payload CMS

### Hallazgos Clave de la Documentación

#### 1. Estructura de Endpoints Personalizados
- **Ubicación**: Los endpoints personalizados se definen en el nivel raíz de la configuración de Payload
- **Sintaxis**: Array de objetos con `path`, `method` y `handler`
- **Montaje**: Se montan automáticamente bajo el prefijo `/api` (configurable)

#### 2. Formato del Handler
```typescript
{
  path: '/ruta-personalizada',
  method: 'post', // lowercase HTTP verb
  handler: async (req: PayloadRequest) => {
    // Lógica del endpoint
    return Response.json(data, { status: 200 })
  }
}
```

#### 3. Objeto PayloadRequest
- **Propiedades clave**:
  - `req.payload`: Instancia del Local API de Payload
  - `req.method`: Método HTTP
  - `req.data`: Datos del cuerpo (requiere helper)
  - `req.user`: Usuario autenticado (si aplica)

#### 4. Manejo del Body de la Request
- **No automático**: El body no se adjunta automáticamente
- **Helper requerido**: `addDataAndFileToRequest(req)` para leer el body
- **Alternativa**: `await req.json()` (puede ser undefined)

#### 5. Response Format
- **Web API**: Usar `Response.json()` en lugar de `res.json()`
- **Status codes**: Especificar en el segundo parámetro
- **Headers**: Opcional, usar `headersWithCors` si se necesita CORS

## Implementación del Endpoint

### Archivo: `src/endpoints/generar-contexto.ts`

#### Funcionalidades Implementadas

1. **Validación de Método HTTP**
   ```typescript
   if (req.method !== 'POST') {
     return Response.json({ error: 'Método no permitido' }, { status: 405 })
   }
   ```

2. **Lectura del Body**
   ```typescript
   await addDataAndFileToRequest(req)
   const { packageJson } = req.data || {}
   ```

3. **Procesamiento de package.json**
   - Extracción de dependencias y devDependencies
   - Conversión de string JSON si es necesario
   - Validación de presencia de dependencias

4. **Búsqueda de Etiquetas**
   ```typescript
   const etiquetasEncontradas = await req.payload.find({
     collection: 'etiquetas',
     where: {
       or: [
         { nombre: { in: nombresDependencias } },
         { aliasDePaquete: { in: nombresDependencias } }
       ]
     },
     depth: 3
   })
   ```

5. **Resolución Recursiva de Dependencias**
   - Función `resolverDependenciasEtiquetas`
   - Evita ciclos infinitos con Set de visitadas
   - Filtra objetos poblados vs IDs

6. **Búsqueda de Directrices**
   ```typescript
   const directricesEncontradas = await req.payload.find({
     collection: 'directrices',
     where: {
       etiquetas: { in: idsEtiquetas }
     },
     depth: 2
   })
   ```

7. **Conversión de Contenido Lexical**
   - Función `lexicalToText` para convertir JSON de Lexical a texto plano
   - Extracción recursiva de nodos de texto
   - Manejo de estructura jerárquica

### Archivo: `src/payload.config.ts`

#### Configuración del Endpoint
```typescript
export default buildConfig({
  // ...configuración existente
  endpoints: [
    {
      path: '/generar-contexto',
      method: 'post',
      handler: generarContextoHandler,
    },
  ],
  // ...resto de configuración
})
```

## Tipos TypeScript Utilizados

### Tipos de Payload Generados
- `PayloadRequest`: Tipo de request de Payload
- `Directrice`: Interfaz generada para directrices
- `Etiqueta`: Interfaz generada para etiquetas

### Tipos Personalizados
```typescript
interface PackageJsonData {
  dependencies?: PackageJsonDependencies
  devDependencies?: PackageJsonDependencies
  [key: string]: any
}
```

## Flujo de Datos

1. **Input**: POST a `/api/generar-contexto` con `{ packageJson: {...} }`
2. **Procesamiento**:
   - Extrae nombres de paquetes
   - Busca etiquetas que coincidan
   - Resuelve dependencias de etiquetas
   - Busca directrices relacionadas
   - Convierte contenido Lexical a texto
3. **Output**: JSON con markdown generado y metadatos

## Manejo de Errores

- **405**: Método no permitido
- **400**: packageJson faltante
- **500**: Error interno del servidor con detalles

## Casos Edge Considerados

1. **Sin dependencias**: Retorna markdown vacío con mensaje
2. **Sin etiquetas coincidentes**: Retorna markdown vacío con mensaje
3. **Dependencias circulares**: Evitadas con Set de visitadas
4. **Contenido Lexical vacío**: Manejo seguro de estructura undefined
5. **Etiquetas como IDs vs objetos**: Filtrado y casting apropiado

## Consideraciones de Seguridad

- **No autenticado por defecto**: El endpoint es público
- **Validación de entrada**: Verificación de estructura de packageJson
- **Logging de errores**: Para debugging y monitoreo
- **Rate limiting**: No implementado (considerar para producción)

## Próximos Pasos

1. **Testing**: Crear pruebas unitarias e integración
2. **Autenticación**: Evaluar si requiere autenticación
3. **Caché**: Implementar caché para respuestas frecuentes
4. **Validación**: Esquemas JSON más estrictos
5. **Métricas**: Logging y métricas de uso
