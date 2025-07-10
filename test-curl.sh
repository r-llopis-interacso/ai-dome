#!/bin/bash

# Script para probar el endpoint con cURL
# Uso: ./test-curl.sh

echo "🧪 Probando endpoint con cURL..."

# Datos de prueba
PACKAGE_JSON='{
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
}'

echo "📦 Enviando package.json:"
echo "$PACKAGE_JSON" | jq .

echo -e "\n🚀 Haciendo petición..."

curl -X POST \
  -H "Content-Type: application/json" \
  -d "{\"packageJson\": $PACKAGE_JSON}" \
  http://localhost:3000/api/generar-contexto \
  | jq .

echo -e "\n✅ Prueba completada"
