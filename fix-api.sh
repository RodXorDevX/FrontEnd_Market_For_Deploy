#!/bin/bash

# Script para actualizar imports de API_BACKEND_URL a api centralizado

FILES=(
  "components/EditarProducto.jsx"
  "components/EstadoPedido.jsx"
  "components/PublicacionCard.jsx"
  "pages/Carrito.jsx"
  "pages/DetallePublicacion.jsx"
  "pages/MiPerfil.jsx"
  "pages/Pedidos.jsx"
)

for file in "${FILES[@]}"; do
  echo "Updating $file..."

  # Reemplazar imports
  sed -i '' 's/import { API_BACKEND_URL } from "\.\.\/config";/import api from "..\/api";/' "src/$file"
  sed -i '' 's/import axios from "axios";/import api from "..\/api";/' "src/$file"

  # Reemplazar llamadas axios
  sed -i '' 's/axios\.get(\`\${API_BACKEND_URL}\//api.get(/\`\/g' "src/$file"
  sed -i '' 's/axios\.post(\`\${API_BACKEND_URL}\//api.post(/\`\/g' "src/$file"
  sed -i '' 's/axios\.put(\`\${API_BACKEND_URL}\//api.put(/\`\/g' "src/$file"
  sed -i '' 's/axios\.delete(\`\${API_BACKEND_URL}\//api.delete(/\`\/g' "src/$file"

  # Reemplazar llamadas fetch
  sed -i '' 's/fetch(\`\${API_BACKEND_URL}\//api.get(/\`\/g' "src/$file"

  echo "✅ Updated $file"
done

echo "🎉 All files updated!"