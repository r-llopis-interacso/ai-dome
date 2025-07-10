# Guía de Debugging - Endpoint Generar Contexto

## 🔧 Opciones de Testing

### 1. **Test con Logging Detallado**
Ya añadimos logs detallados al endpoint. Para usarlos:

```bash
# Iniciar el servidor
cd apps/hub && pnpm dev

# En otra terminal, hacer la petición
node test-endpoint.js
# o
./test-curl.sh
```

### 2. **Test de Funciones Individuales**
```bash
node apps/hub/src/test-functions.js
```

### 3. **Test Manual con cURL**
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"packageJson": {"dependencies": {"react": "^18.0.0"}}}' \
  http://localhost:3000/api/generar-contexto
```

### 4. **Test desde el Admin Panel de Payload**
1. Ir a `http://localhost:3000/admin`
2. Revisar las colecciones `etiquetas` y `directrices`
3. Verificar que tienes datos de ejemplo

### 5. **Test con Postman/Insomnia**
- URL: `POST http://localhost:3000/api/generar-contexto`
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "packageJson": {
    "dependencies": {
      "react": "^18.0.0",
      "typescript": "^5.0.0"
    }
  }
}
```

## 🔍 Qué Verificar en los Logs

### 1. **Flujo de Datos**
- ✅ packageJson recibido correctamente
- ✅ Dependencias extraídas
- ✅ Etiquetas encontradas en BD
- ✅ Dependencias resueltas recursivamente
- ✅ Directrices encontradas
- ✅ Markdown generado

### 2. **Datos de Entrada**
```
📦 [DEBUG] packageJson recibido: {...}
📝 [DEBUG] Dependencias extraídas: ["react", "typescript"]
```

### 3. **Consultas a BD**
```
🏷️ [DEBUG] Etiquetas encontradas: 2
🏷️ [DEBUG] Detalle etiquetas: [...]
📋 [DEBUG] Directrices encontradas: 5
```

### 4. **Resultado Final**
```
📄 [DEBUG] Markdown generado, longitud: 1500
✅ [DEBUG] Respuesta final: {...}
```

## 🚨 Problemas Comunes

### 1. **No se encuentran etiquetas**
- Verificar que las etiquetas en BD coinciden con nombres de paquetes
- Revisar el campo `aliasDePaquete`
- Comprobar que el seeding se ejecutó correctamente

### 2. **No se encuentran directrices**
- Verificar que las directrices tienen etiquetas asignadas
- Comprobar que las etiquetas están activas

### 3. **Error de tipos**
- El archivo actual usa tipos `EtiquetaData` en lugar de `Etiqueta`
- Verificar que los tipos coinciden con `payload-types.ts`

### 4. **Error de conexión**
- Verificar que la BD está corriendo
- Comprobar `DATABASE_URI` en el `.env`

### 5. **Error de parsing JSON**
- Verificar que el cuerpo de la petición es JSON válido
- Comprobar headers `Content-Type`

## 📝 Comandos Útiles

```bash
# Ver logs del servidor
cd apps/hub && pnpm dev

# Probar endpoint rápido
curl -X POST -H "Content-Type: application/json" \
  -d '{"packageJson":{"dependencies":{"react":"^18.0.0"}}}' \
  http://localhost:3000/api/generar-contexto | jq .

# Ver datos en BD (si usas PostgreSQL)
psql $DATABASE_URI -c "SELECT * FROM etiquetas LIMIT 5;"
psql $DATABASE_URI -c "SELECT * FROM directrices LIMIT 5;"

# Test de función específica
node -e "console.log('Test:', JSON.stringify({test: true}))"
```

## 🎯 Checklist de Debugging

- [ ] ¿El servidor está corriendo en puerto 3000?
- [ ] ¿La BD tiene datos de etiquetas y directrices?
- [ ] ¿Los logs muestran los datos de entrada correctamente?
- [ ] ¿Se encuentran etiquetas que coincidan?
- [ ] ¿Las dependencias se resuelven correctamente?
- [ ] ¿Se encuentran directrices relacionadas?
- [ ] ¿El markdown se genera sin errores?
- [ ] ¿La respuesta JSON es válida?
