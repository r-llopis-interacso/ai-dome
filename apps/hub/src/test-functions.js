/**
 * Test unitario simple para las funciones del endpoint
 * Ejecutar con: node apps/hub/src/test-functions.js
 */

// Simulamos las interfaces necesarias
const mockDirectrices = [
  {
    id: 1,
    titulo: "Uso de React Hooks",
    contenido: "Utiliza hooks de React para el manejo de estado...",
    etiquetas: [
      { id: 1, nombre: "React", tipo: "Tecnologia" },
      { id: 2, nombre: "Frontend", tipo: "Area" }
    ]
  },
  {
    id: 2, 
    titulo: "APIs REST con Express",
    contenido: "Implementa APIs REST siguiendo las mejores prácticas...",
    etiquetas: [
      { id: 3, nombre: "Express", tipo: "Tecnologia" },
      { id: 4, nombre: "Backend", tipo: "Area" }
    ]
  },
  {
    id: 3,
    titulo: "Tipado con TypeScript", 
    contenido: "Usa TypeScript para mejor desarrollo...",
    etiquetas: [
      { id: 5, nombre: "TypeScript", tipo: "Tecnologia" }
    ]
  }
];

// Función para generar markdown (simplificada para test)
function generarMarkdown(directrices) {
  let markdown = '# Contexto de Directrices de IA\n\n';
  markdown += `Generado el: ${new Date().toLocaleString('es-ES')}\n\n`;
  
  if (directrices.length === 0) {
    markdown += 'No se encontraron directrices relacionadas con las dependencias del proyecto.\n';
    return markdown;
  }
  
  // Agrupar por área
  const grupos = {};
  
  directrices.forEach(directriz => {
    const etiquetasArea = directriz.etiquetas
      .filter(etiqueta => etiqueta.tipo === 'Area')
      .map(etiqueta => etiqueta.nombre);
    
    if (etiquetasArea.length > 0) {
      etiquetasArea.forEach(area => {
        if (!grupos[area]) grupos[area] = [];
        grupos[area].push(directriz);
      });
    } else {
      if (!grupos['General']) grupos['General'] = [];
      grupos['General'].push(directriz);
    }
  });
  
  markdown += `## Resumen\n\n`;
  markdown += `**Total de directrices aplicables:** ${directrices.length}\n`;
  markdown += `**Áreas de desarrollo identificadas:** ${Object.keys(grupos).length}\n\n`;
  
  // Generar contenido por área
  Object.entries(grupos).forEach(([area, directricesDelArea]) => {
    markdown += `## ${area}\n\n`;
    markdown += `*${directricesDelArea.length} directrices aplicables*\n\n`;
    
    directricesDelArea.forEach((directriz, index) => {
      markdown += `### ${index + 1}. ${directriz.titulo}\n\n`;
      markdown += `${directriz.contenido}\n\n`;
      
      const nombresEtiquetas = directriz.etiquetas.map(e => e.nombre);
      if (nombresEtiquetas.length > 0) {
        markdown += `**Etiquetas relacionadas:** ${nombresEtiquetas.join(', ')}\n\n`;
      }
      
      markdown += '---\n\n';
    });
  });
  
  return markdown;
}

// Ejecutar test
console.log('🧪 Ejecutando test de función generarMarkdown...\n');

const markdown = generarMarkdown(mockDirectrices);

console.log('📄 Markdown generado:');
console.log(markdown);

console.log('\n📊 Estadísticas:');
console.log(`- Directrices procesadas: ${mockDirectrices.length}`);
console.log(`- Longitud del markdown: ${markdown.length} caracteres`);
console.log(`- Contiene "Frontend": ${markdown.includes('Frontend')}`);
console.log(`- Contiene "Backend": ${markdown.includes('Backend')}`);
console.log(`- Contiene "General": ${markdown.includes('General')}`);

console.log('\n✅ Test completado');
