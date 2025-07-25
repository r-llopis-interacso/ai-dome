/**
 * @file Servicio de validación de directrices
 * @description Este servicio se encarga de validar nuevas directrices contra las existentes para evitar conflictos.
 */

import { Payload } from 'payload';
import { geminiService } from './geminiService';
import { lexicalToText } from '../utilities/lexicalToText';

/**
 * Valida una nueva directriz contra las existentes en la base de datos.
 */
export const validateGuideline = async (newGuidelineData: any, payload: Payload): Promise<any> => {
  console.log('Servicio de validación invocado.');

  if (!newGuidelineData.etiquetas || newGuidelineData.etiquetas.length === 0) {
    console.log('La directriz no tiene etiquetas. Se omite la validación.');
    return { conflicto: false };
  }

  // Normalizar etiquetas a strings y filtrar valores válidos
  const validTagIds = newGuidelineData.etiquetas
    .map((tag: any) => {
      if (typeof tag === 'string') return tag;
      if (typeof tag === 'object' && tag !== null && 'id' in tag) return String(tag.id);
      return String(tag);
    })
    .filter((id: string) => id != null && id !== '' && id !== 'undefined');

  if (validTagIds.length === 0) {
    console.log('No se encontraron etiquetas válidas. Se omite la validación.');
    return { conflicto: false };
  }

  console.log(`Validando directriz con etiquetas: ${validTagIds.join(', ')}`);

  const existingGuidelines = await getExistingGuidelines(validTagIds, payload, newGuidelineData.id);

  if (existingGuidelines.length === 0) {
    console.log('No hay directrices existentes para las etiquetas seleccionadas. No se requiere validación.');
    return { conflicto: false };
  }

  const validationResult = await callGeminiForValidation(newGuidelineData, existingGuidelines);

  return validationResult;
};

/**
 * Recursivamente obtiene todos los IDs de las etiquetas padre.
 */
const getAllParentTagIds = async (tagIds: string[], payload: Payload, allIds: Set<string> = new Set()): Promise<Set<string>> => {
  if (tagIds.length === 0) {
    return allIds;
  }

  // Filtrar IDs válidos y convertir a strings
  const validTagIds = tagIds.filter(id => id != null && id !== '').map(id => String(id));
  
  if (validTagIds.length === 0) {
    return allIds;
  }

  const newIds = validTagIds.filter(id => !allIds.has(id));
  newIds.forEach(id => allIds.add(id));

  console.log(`Buscando etiquetas padre para IDs: ${newIds.join(', ')}`);

  const tags = await payload.find({
    collection: 'etiquetas',
    where: {
      id: { in: newIds },
    },
    depth: 1,
  });

  let parentTagIds: string[] = [];
  for (const tag of tags.docs) {
    if (tag.dependeDe && tag.dependeDe.length > 0) {
      const ids = tag.dependeDe.map(t => {
        // Si es un objeto con id, extraer el id. Si es un string o number, convertirlo a string
        if (typeof t === 'object' && t !== null && 'id' in t) {
          return String(t.id);
        }
        return String(t);
      }).filter(id => id != null && id !== '');
      
      console.log(`Etiqueta '${tag.nombre}' depende de: ${ids.join(', ')}`);
      parentTagIds.push(...ids);
    }
  }

  if (parentTagIds.length > 0) {
    await getAllParentTagIds(parentTagIds, payload, allIds);
  }

  return allIds;
};

/**
 * Recupera las directrices existentes basadas en un conjunto de etiquetas y sus padres.
 */
const getExistingGuidelines = async (tagIds: string[], payload: Payload, currentGuidelineId?: string): Promise<any[]> => {
  try {
    const allTagIdsSet = await getAllParentTagIds(tagIds, payload);
    const allTagIds = Array.from(allTagIdsSet);

    console.log(`Buscando directrices con el conjunto completo de etiquetas: ${allTagIds.join(', ')}`);

    const guidelines = await payload.find({
      collection: 'directrices',
      where: {
        and: [
          { etiquetas: { in: allTagIds } },
          { activa: { equals: true } },
          // Excluir la directriz actual si estamos actualizando
          ...(currentGuidelineId ? [{ id: { not_equals: currentGuidelineId } }] : []),
        ],
      },
      limit: 100, // Evitar sobrecargar a la IA
    });

    // Mapear el resultado para devolver solo lo necesario y convertir richText a plano
    return guidelines.docs.map(doc => ({
      id: doc.id,
      titulo: doc.titulo,
      contenido: lexicalToText(doc.contenido),
    }));
  } catch (error) {
    console.error('Error al buscar directrices existentes:', error);
    // Si hay error en la búsqueda, devolver array vacío para permitir continuar sin validación
    return [];
  }
};


/**
 * Llama a la API de Gemini para validar la directriz.
 */
const callGeminiForValidation = async (newGuideline: any, existingGuidelines: any[]): Promise<any> => {
  console.log('Construyendo prompt y llamando a Gemini API...');

  const newGuidelineContent = lexicalToText(newGuideline.contenido);

  const promptTemplate = `
**Rol:** Eres un experto en arquitectura de software y documentación técnica, encargado de mantener la coherencia y calidad de una base de conocimiento para desarrolladores.

**Contexto:** Te proporcionaré dos bloques de información:
1.  \`NUEVA_DIRECTRIZ\`: El contenido de una nueva directriz que un usuario quiere añadir.
2.  \`DIRECTRICES_EXISTENTES\`: Un conjunto de directrices que ya existen en nuestra base de conocimiento para las mismas categorías tecnológicas.

**Tarea:** Tu tarea es analizar si la \`NUEVA_DIRECTRIZ\` entra en conflicto con las \`DIRECTRICES_EXISTENTES\`. Debes evaluar los siguientes tipos de conflicto:
- **Contradicción Directa:** La nueva directriz afirma algo opuesto a una existente (p. ej., "usar tabs" vs. "usar espacios").
- **Redundancia o Solapamiento:** La nueva directriz repite información que ya está cubierta de forma sustancial por una o más directrices existentes.
- **Obsolescencia:** La nueva directriz introduce una práctica que vuelve obsoleta o desaconseja una práctica mencionada en una directriz existente (p. ej., recomienda una nueva versión de una librería que cambia la API respecto a la versión anterior).

**Instrucción Adicional:** Si lo consideras necesario para tener un contexto más profundo sobre las tecnologías mencionadas (ej. versiones de librerías, prácticas recomendadas actuales), puedes usar tu conocimiento externo y realizar búsquedas en internet.

**Formato de Respuesta:** Responde SIEMPRE en formato JSON.
- Si no hay conflictos, devuelve: \`{"conflicto": false}\`.
- Si detectas uno o más conflictos, devuelve un objeto con la siguiente estructura:
  {
    "conflicto": true,
    "detalles": [
      {
        "directrizConflictiva": {
          "titulo": "Título de la directriz con la que hay conflicto",
          "id": "ID de la directriz conflictiva"
        },
        "explicacion": "Una descripción clara y concisa de por qué existe un conflicto, explicando si es una contradicción, redundancia u obsolescencia."
      }
    ]
  }

---

**NUEVA_DIRECTRIZ (Título: ${newGuideline.titulo}):**
\`\`\`
${newGuidelineContent}
\`\`\`

**DIRECTRICES_EXISTENTES:**
\`\`\`json
${JSON.stringify(existingGuidelines, null, 2)}
\`\`\`
`;

  try {
    const parsedResult = await geminiService.generateJson<any>(promptTemplate);
    
    console.log('Respuesta de Gemini (parsed):', parsedResult);
    
    return parsedResult;

  } catch (error) {
    console.error('Error al llamar a la API de Gemini o al parsear la respuesta:', error);
    // Si falla la IA, por seguridad, no bloqueamos la creación de la directriz.
    // Podríamos optar por lanzar un error si la validación es crítica.
    return { conflicto: false, error: 'La validación con IA falló.' };
  }
};