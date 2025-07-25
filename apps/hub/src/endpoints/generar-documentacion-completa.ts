import type { PayloadRequest } from 'payload';
import type { Directrice } from '../payload-types';
import { addDataAndFileToRequest } from 'payload';
import { geminiService } from '../services/geminiService';
import { lexicalToText } from '../utilities/lexicalToText';

// Prompt para README (humano)
function getReadmePrompt(repomixContext: string, tags: any[]): string {
  let tagsSection = '## Tags disponibles en el proyecto\n';
  if (tags.length === 0) {
    tagsSection += '\n(No se encontraron etiquetas en la base de datos)\n';
  } else {
    tags.forEach(tag => {
      tagsSection += `- ${tag.nombre}${tag.aliasDePaquete ? ` (alias: ${tag.aliasDePaquete})` : ''} [tipo: ${tag.tipo}]\n`;
    });
  }
  return `You are an AI assistant tasked with generating a comprehensive README for a software project. Use the following information to create the README:

<repomix_context>
{{${repomixContext}}}
</repomix_context>

<all_tags>
{{${tagsSection}}}
</all_tags>

Follow these steps to generate the README:

1. Extract all technologies detected in the monorepo, using both package.json blocks and relevant configuration files and folder names.
2. For each detected technology, indicate which available tag matches and what guidelines might apply (based on the tag's type and alias).
3. Summarize the repository structure, highlighting cross-cutting areas and grouping by apps/packages if applicable.
4. Generate the document following the standard structure: Welcome, Project Technologies, General Architecture (with Mermaid diagram), Repository Structure, Workflow, Naming Conventions, Testing, Linting and Formatting, Contributions.
5. The document must be 100% faithful to the information from the context and tags provided. Do not invent technologies or areas.

IMPORTANT:
The "Project Technologies" section must contain a Markdown table with the following exact format:

| Technology | Available Tag | Alias | Guideline |
|------------|---------------|-------|-----------|
| Example    | ExampleTag    | example| ...       |

Do not change the order or names of the columns. If a technology has no tag or guideline, leave the cell empty.

At the END of the README, after all other content, add a single line with the following format, listing all detected technologies AND their aliases (if available), deduplicated and comma-separated, no spaces:
<tags>tech1,tech2,alias1,alias2,...</tags>

Your output should be the complete README in Markdown format, without any introductory or closing text.`;
  // 'Eres un arquitecto de software senior y un experto en documentación técnica. Tu misión es generar el fichero ai-readme.md, un documento de bienvenida y guía para un nuevo desarrollador que se une a un proyecto monorepo.\n\n' +
  // 'Has recibido un análisis automático del repositorio proporcionado por la herramienta repomix. Úsalo como la única fuente de verdad para entender la estructura y tecnología del proyecto.\n\n' +
  // '**Contexto del Repositorio (salida de repomix):**\n---\n' +
  // repomixContext +
  // '\n---\n\n' +
  // tagsSection +
  // '\n**Instrucciones:**\n' +
  // '1. Extrae y lista todas las tecnologías detectadas en el monorepo, usando tanto los bloques package.json como los archivos de configuración y nombres de carpetas relevantes (por ejemplo, next.config.js, tailwind.config.ts, cypress.config.ts, etc.).\n' +
  // '2. Para cada tecnología detectada, indica qué tag disponible coincide y qué directrices podrían aplicar (según el tipo y alias del tag).\n' +
  // '3. Resume la estructura del repositorio, destacando áreas transversales (por ejemplo, shared, common, utils) y agrupando por apps/packages si corresponde.\n' +
  // '4. Genera el documento siguiendo la estructura estándar: Bienvenida, Tecnologías del Proyecto, Arquitectura General (con diagrama Mermaid), Estructura del Repositorio, Flujo de Trabajo, Convenciones de nombrado, Pruebas, Linting y Formato, Contribuciones.\n' +
  // '5. Si se incluyen directrices internas, resume brevemente sus ideas principales en una sección de resumen, sin copiar el texto completo.\n' +
  // '6. El documento debe ser 100% fiel a la información del contexto y los tags proporcionados. No inventes tecnologías ni áreas.\n' +
  // '7. El resultado debe ser únicamente el documento Markdown, sin texto introductorio o de cierre.\n\n' +
  // '**IMPORTANTE:**\nLa sección "Tecnologías del Proyecto" debe contener una tabla Markdown con el siguiente formato exacto:\n\n' +
  // '| Tecnología | Tag Disponible | Alias | Directriz |\n|------------|---------------|-------|-----------|\n| Ejemplo    | EjemploTag    | ejemplo| ...       |\n\nNo cambies el orden ni los nombres de las columnas. Si una tecnología no tiene tag o directriz, deja la celda vacía.'
}

// Prompt para Agent (copilot-instructions.md)
function getAgentPrompt(readmeDraft: string, tags: any[], agenticGuidelines?: string): string {
  let tagsSection = '## Tags disponibles en el proyecto\n';
  if (tags.length === 0) {
    tagsSection += '\n(No se encontraron etiquetas en la base de datos)\n';
  } else {
    tags.forEach(tag => {
      tagsSection += `- ${tag.nombre}${tag.aliasDePaquete ? ` (alias: ${tag.aliasDePaquete})` : ''} [tipo: ${tag.tipo}]\n`;
    });
  }
  let guidelinesSection = '';
  if (agenticGuidelines && agenticGuidelines.trim().length > 0) {
    guidelinesSection = '\n\n## Acciones y recomendaciones para agentes\n\n' + agenticGuidelines.trim();
  }
  return (
    `You are an AI assistant tasked with generating technical documentation for an agent. Use the following information to create the documentation:

<readme_draft>
{{${readmeDraft}}}
</readme_draft>

<summarized_guidelines>
{{${guidelinesSection}}}
</summarized_guidelines>

<all_tags>
{{${tagsSection}}}
</all_tags>

Follow these steps to generate the agent documentation:

1. Extract all technologies from the README draft's technology table.
2. Create a new technology table, including any additional relevant tags from the ALL_TAGS list.
3. Incorporate the summarized guidelines into a section titled "Instructions for Automation Agents".
4. Add sections for "Automation of Styles", "Frontend Development Automation", "Dependency Management Automation", "Workflow Automation", and "Testing Automation" based on the technologies and guidelines.
5. Include any additional recommendations or instructions that would be relevant for an automated agent working with this project.

Your output should be the complete agent documentation in Markdown format, without any introductory or closing text. The final document should be structured and formatted for easy parsing by an automated system.`
    // 'Eres un agente de inteligencia artificial encargado de asistir en la gestión y automatización de proyectos monorepo.\n' +
    // 'Debes generar el fichero copilot-instructions.md, que contendrá instrucciones técnicas explícitas para otros agentes o sistemas automáticos.\n\n' +
    // 'Siempre debes incluir las etiquetas "transversal" y "git" en el análisis, aunque no estén presentes en el contexto.\n' +
    // 'El contexto del repositorio ha sido extraído automáticamente por la herramienta repomix.\n\n' +
    // '**Contexto del Repositorio (salida de repomix):**\n---\n' +
    // repomixContext +
    // '\n---\n\n' +
    // tagsSection +
    // guidelinesSection +
    // '\n**Instrucciones para el agente:**\n' +
    // '1. Extrae todas las tecnologías y herramientas detectadas en el monorepo, usando tanto los bloques package.json como los archivos de configuración y nombres de carpetas relevantes.\n' +
    // '2. Para cada tecnología, indica el tag disponible, el alias y la directriz asociada (si existe).\n' +
    // '3. Genera una tabla Markdown con la información anterior, usando el formato exacto especificado.\n' +
    // '4. Sintetiza las directrices internas proporcionadas y conviértelas en instrucciones breves, claras y orientadas a la automatización, evitando copiar el texto literal. Extrae solo acciones y recomendaciones relevantes para agentes.\n' +
    // '5. Incluye instrucciones técnicas claras para la automatización de flujos, integración continua, pruebas, despliegue y gestión de dependencias.\n' +
    // '6. El resultado debe ser únicamente el documento Markdown, sin texto introductorio o de cierre.\n\n' +
    // '**IMPORTANTE:**\nLa sección "Tecnologías del Proyecto" debe contener una tabla Markdown con el siguiente formato exacto:\n\n' +
    // '| Tecnología | Tag Disponible | Alias | Directriz |\n|------------|---------------|-------|-----------|\n| Ejemplo    | EjemploTag    | ejemplo| ...       |\n\nNo cambies el orden ni los nombres de las columnas. Si una tecnología no tiene tag o directriz, deja la celda vacía.'
  );
}



// function getPrompt(repomixContext: string, tags: any[]): string {
//   // Construir la sección de tags disponibles
//   let tagsSection = '## Tags disponibles en el proyecto\n';
//   if (tags.length === 0) {
//     tagsSection += '\n(No se encontraron etiquetas en la base de datos)\n';
//   } else {
//     tags.forEach(tag => {
//       tagsSection += `- ${tag.nombre}${tag.aliasDePaquete ? ` (alias: ${tag.aliasDePaquete})` : ''} [tipo: ${tag.tipo}]\n`;
//     });
//   }

//   return `
// Eres un arquitecto de software senior y un experto en documentación técnica. Tu misión es generar el fichero ai-readme.md, un documento de bienvenida y guía para un nuevo desarrollador que se une a un proyecto monorepo.

// Has recibido un análisis automático del repositorio proporcionado por la herramienta \\`repomix\`. Úsalo como la única fuente de verdad para entender la estructura y tecnología del proyecto.

// **Contexto del Repositorio (salida de \\`repomix\`):**
// ---
// ${repomixContext}
// ---

// ${tagsSection}

// **Instrucciones:**
// 1. Extrae y lista todas las tecnologías detectadas en el monorepo, usando tanto los bloques package.json como los archivos de configuración y nombres de carpetas relevantes (por ejemplo, next.config.js, tailwind.config.ts, cypress.config.ts, etc.).
// 2. Para cada tecnología detectada, indica qué tag disponible coincide y qué directrices podrían aplicar (según el tipo y alias del tag).
// 3. Resume la estructura del repositorio, destacando áreas transversales (por ejemplo, shared, common, utils) y agrupando por apps/packages si corresponde.
// 4. Genera el documento siguiendo la estructura estándar: Bienvenida, Tecnologías del Proyecto, Arquitectura General (con diagrama Mermaid), Estructura del Repositorio, Flujo de Trabajo, Convenciones de nombrado, Pruebas, Linting y Formato, Contribuciones.
// 5. El documento debe ser 100% fiel a la información del contexto y los tags proporcionados. No inventes tecnologías ni áreas.
// 6. El resultado debe ser únicamente el documento Markdown, sin texto introductorio o de cierre.

// **IMPORTANTE:**
// La sección "Tecnologías del Proyecto" debe contener una tabla Markdown con el siguiente formato exacto:

// | Tecnología | Tag Disponible | Alias | Directriz |
// |------------|---------------|-------|-----------|
// | Ejemplo    | EjemploTag    | ejemplo| ...       |

// No cambies el orden ni los nombres de las columnas. Si una tecnología no tiene tag o directriz, deja la celda vacía.
// `;
// }


async function generateReadmeDraft(repomixContext: string, tags: any[]): Promise<string> {
  console.log('🤖 [generateReadmeDraft] Iniciando generación de README con Gemini AI...');
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ [generateReadmeDraft] GEMINI_API_KEY no está configurada');
    throw new Error('GEMINI_API_KEY environment variable is required');
  }
  try {
    const prompt = getReadmePrompt(repomixContext, tags);
    console.log(`📝 [generateReadmeDraft] Prompt generado: ${prompt.length} caracteres`);
    const text = await geminiService.generateText(prompt);
    console.log(`✅ [generateReadmeDraft] Respuesta de Gemini AI recibida: ${text.length} caracteres`);
    return text;
  } catch (error) {
    console.error('❌ [generateReadmeDraft] Error en la llamada a Gemini AI:', error);
    if (error instanceof Error) {
      console.error(`❌ [generateReadmeDraft] Error details: ${error.message}`);
    }
    throw error;
  }
}

async function generateAgentDraft(readmeDraft: string, agenticGuidelines: string, tags: any[]): Promise<string> {
  console.log('🤖 [generateAgentDraft] Iniciando generación de instrucciones para agente con Gemini AI...');
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ [generateAgentDraft] GEMINI_API_KEY no está configurada');
    throw new Error('GEMINI_API_KEY environment variable is required');
  }
  try {
    // Concatenar el contexto: README, resumen agentico y tags
    let context = '';
    context += readmeDraft.trim();
    if (agenticGuidelines && agenticGuidelines.trim().length > 0) {
      context += '\n\n## Acciones y recomendaciones para agentes\n\n' + agenticGuidelines.trim();
    }
    // También incluir los tags como lista
    if (tags && tags.length > 0) {
      context += '\n\n## Tags disponibles en el proyecto\n';
      tags.forEach(tag => {
        context += `\n- ${tag.nombre}${tag.aliasDePaquete ? ` (alias: ${tag.aliasDePaquete})` : ''} [tipo: ${tag.tipo}]`;
      });
    }
    const prompt = getAgentPrompt(context, tags, undefined); // El contexto ya lleva todo
    console.log(`📝 [generateAgentDraft] Prompt generado: ${prompt.length} caracteres`);
    const text = await geminiService.generateText(prompt);
    console.log(`✅ [generateAgentDraft] Respuesta de Gemini AI recibida: ${text.length} caracteres`);
    return text;
  } catch (error) {
    console.error('❌ [generateAgentDraft] Error en la llamada a Gemini AI:', error);
    if (error instanceof Error) {
      console.error(`❌ [generateAgentDraft] Error details: ${error.message}`);
    }
    throw error;
  }
}

// Llama a la IA para sintetizar directrices en formato agentico (acciones/recomendaciones)
async function summarizeGuidelinesForAgent(guidelinesMarkdown: string): Promise<string> {
  const prompt =
    `You are an AI agent expert in automation and software engineering best practices. You will receive a series of internal guidelines in Markdown format. Your task is to analyze them and return only a list of actions and recommendations relevant to an automatic agent, in Markdown list format, without copying or literally summarizing the original text.

Strict output format:
- Only a Markdown list, each action/recommendation should be a bullet starting with '- ' (hyphen and space).
- Each bullet should be self-contained, clear, and oriented towards automation.
- Do not include introductory text, closing text, or any code blocks or headers.
- Do not use numbering, only bullets '- '.

Example output:
- Configure CI to run tests on each push.
- Use dependabot to keep dependencies updated.
- ...

Guidelines to synthesize:
<guidelines>
{{${guidelinesMarkdown}}}
</guidelines>

Your output should be only the list of synthesized guidelines, without any additional text.`
  // `Eres un agente de inteligencia artificial experto en automatización y buenas prácticas de ingeniería.
  // Recibes una serie de directrices internas en formato Markdown. Tu tarea es analizarlas y devolver únicamente una lista de acciones y recomendaciones relevantes para un agente automático, en formato Markdown de lista, sin copiar ni resumir literalmente el texto original.

  // Formato de salida ESTRICTO:
  // - Solo una lista Markdown, cada acción/recomendación debe ser un bullet que empiece por '- ' (guion y espacio).
  // - Cada bullet debe ser autocontenida, clara y orientada a la automatización.
  // - No incluyas texto introductorio, de cierre, ni ningún bloque de código ni encabezados.
  // - No uses numeración, solo bullets '- '.

  // Ejemplo de salida:
  // - Configura CI para ejecutar tests en cada push.
  // - Usa dependabot para mantener dependencias actualizadas.
  // - ...

  // Directrices a sintetizar:
  // ---
  // ${guidelinesMarkdown}
  // ---
  // `;
  const resumen = await geminiService.generateText(prompt);
  return resumen.trim();
}

async function getInternalGuidelines(techs: string[], payload: PayloadRequest['payload']): Promise<string> {
  console.log(`📚 [getInternalGuidelines] Buscando directrices para tecnologías: ${techs.join(', ')}`);

  // Unificar pool de etiquetas: techs + transversal + git
  const tagNamesOrAliases = Array.from(new Set([
    ...techs,
    'transversal',
    'git',
  ]));
  if (tagNamesOrAliases.length === 0) {
    console.warn('⚠️ [getInternalGuidelines] No hay tecnologías ni etiquetas para buscar directrices');
    return '';
  }
  try {
    // Buscar todas las etiquetas cuyo nombre o aliasDePaquete coincida con techs, transversal o git
    console.log('🔍 [getInternalGuidelines] Buscando etiquetas por nombre o alias...');
    const tagsResult = await payload.find({
      collection: 'etiquetas',
      where: {
        or: [
          { nombre: { in: tagNamesOrAliases } },
          { aliasDePaquete: { in: tagNamesOrAliases } },
        ],
      },
      depth: 0,
      limit: 100,
    });
    // Log de etiquetas encontradas
    if (tagsResult.docs.length > 0) {
      console.log('🏷️ [getInternalGuidelines] Etiquetas encontradas:');
      tagsResult.docs.forEach((tag: any) => {
        console.log(`  - id: ${tag.id}, nombre: ${tag.nombre}, alias: ${tag.aliasDePaquete}`);
      });
    }
    const tagIDs = Array.from(new Set(tagsResult.docs.map((tag: any) => tag.id)));
    console.log(`🔗 [getInternalGuidelines] IDs de etiquetas a buscar:`, tagIDs);
    if (tagIDs.length === 0) {
      console.warn('⚠️ [getInternalGuidelines] No se encontraron etiquetas coincidentes');
      return '## Directrizs Internas\n\nNo se encontraron directrices internas para las tecnologías de este proyecto.';
    }
    // Buscar directrices vinculadas a esas etiquetas
    console.log('📖 [getInternalGuidelines] Buscando directrices vinculadas...');
    const guidelines = await payload.find({
      collection: 'directrices',
      where: {
        etiquetas: {
          in: tagIDs,
        },
      },
      limit: 100,
    });
    console.log(`📄 [getInternalGuidelines] ${guidelines.docs.length} directrices encontradas`);
    if (guidelines.docs.length > 0) {
      console.log('🆔 [getInternalGuidelines] IDs y títulos de directrices encontradas:');
      guidelines.docs.forEach((doc: Directrice) => {
        console.log(`  - id: ${doc.id}, titulo: ${doc.titulo}`);
      });
    }
    if (guidelines.docs.length === 0) {
      console.warn('⚠️ [getInternalGuidelines] No se encontraron directrices para las etiquetas');
      return '## Directrizs Internas\n\nNo se encontraron directrices internas para las tecnologías de este proyecto.';
    }
    // Formatear las directrices en markdown, deduplicando por id
    const seen = new Set();
    const guidelinesMarkdown = guidelines.docs
      .filter((doc: Directrice) => {
        if (seen.has(doc.id)) return false;
        seen.add(doc.id);
        return true;
      })
      .map((doc: Directrice) => {
        const content = lexicalToText(doc.contenido);
        console.log(`📝 [getInternalGuidelines] Procesando directriz: "${doc.titulo}" (${content.length} caracteres)`);
        return `### ${doc.titulo}\n\n${content}`;
      })
      .join('\n\n---\n\n');
    const result = `## Directrizs Internas\n\n${guidelinesMarkdown}`;
    console.log(`✅ [getInternalGuidelines] Directrizs internas generadas: ${result.length} caracteres`);
    return result;
  } catch (error) {
    console.error('❌ [getInternalGuidelines] Error obteniendo directrices internas:', error);
    if (error instanceof Error) {
      console.error(`❌ [getInternalGuidelines] Error details: ${error.message}`);
    }
    throw error;
  }
}



export const generarDocumentacionCompleta = async (req: PayloadRequest) => {
  const startTime = Date.now();
  console.log('🚀 [generar-documentacion-completa] Iniciando generación de documentación secuencial (README y Agent)');
  try {
    if (req.method !== 'POST') {
      console.error('❌ [generar-documentacion-completa] Método HTTP no permitido:', req.method);
      return Response.json({ error: 'Método no permitido' }, { status: 405 })
    }
    // Leer datos de la petición
    console.log('📖 [generar-documentacion-completa] Leyendo datos de la petición...');
    await addDataAndFileToRequest(req)
    const { repomixContext } = req.data || {};
    if (!repomixContext) {
      console.error('❌ [generar-documentacion-completa] repomixContext no proporcionado');
      return Response.json({ error: 'repomixContext is required' }, { status: 400 })
    }
    console.log(`📄 [generar-documentacion-completa] Contexto recibido: ${repomixContext.length} caracteres`);
    // Obtener todas las etiquetas disponibles
    console.log('🔍 [generar-documentacion-completa] Obteniendo todas las etiquetas disponibles...');
    const allTagsResult = await req.payload.find({
      collection: 'etiquetas',
      limit: 1000,
      depth: 0,
    });
    const allTags = allTagsResult.docs || [];
    console.log(`📋 [generar-documentacion-completa] ${allTags.length} etiquetas obtenidas para el prompt.`);


    // Extrae tecnologías y aliases del bloque <tags> del README generado
    function extractTechsAndAliasesFromDraft(draft: string, allTags: any[]): string[] {
      // Busca el bloque <tags>tech1,tech2,...</tags> al final del README
      const tagBlockRegex = /<tags>([^<]+)<\/tags>/i;
      const match = draft.match(tagBlockRegex);
      if (match && match[1]) {
        // Separar por coma y limpiar espacios
        const techs = match[1].split(',').map(t => t.trim()).filter(Boolean);
        // Buscar aliases de esos techs en allTags
        const aliases = allTags
          .filter(tag => techs.includes(tag.nombre) || techs.includes(tag.aliasDePaquete))
          .map(tag => tag.aliasDePaquete)
          .filter(Boolean);
        // Unir techs y aliases, deduplicar
        return Array.from(new Set([...techs, ...aliases]));
      }
      // Fallback: si no encuentra el bloque, retorna array vacío
      return [];
    }

    // 1. Generar README humano (con tabla de tecnologías SIEMPRE al final)
    const readmeDraft = await generateReadmeDraft(repomixContext, allTags);
    // 2. Extraer tecnologías y aliases de la tabla
    const techsAndAliases = extractTechsAndAliasesFromDraft(readmeDraft, allTags);
    console.log(`🔧 [generar-documentacion-completa] Tecnologías y aliases extraídos del draft: ${techsAndAliases.toString()} tecnologías/aliases`);
    // 3. Obtener directrices internas para esas tecnologías/aliases
    const guidelines = techsAndAliases.length > 0 ? await getInternalGuidelines(techsAndAliases, req.payload) : '';

    // 4. Llamada a la IA para sintetizar directrices en formato agentico
    let agenticGuidelines = '';
    if (guidelines && guidelines.trim().length > 0) {
      agenticGuidelines = await summarizeGuidelinesForAgent(guidelines);
    }
    console.log(`📄 [generar-documentacion-completa] Directrices sintetizadas para agentes: ${agenticGuidelines.length} caracteres`);

    // 5. Generar documentación técnica para el agente, usando SOLO el resumen agentico
    const agentPromptContext = readmeDraft + (agenticGuidelines ? `\n\n## Acciones y recomendaciones para agentes\n\n${agenticGuidelines}` : '');
    const agentDraft = await generateAgentDraft(readmeDraft, agenticGuidelines, allTags);

    // 6. Preparar respuesta con ambos documentos
    const result = {
      readme: {
        content: `${readmeDraft}`,
        contentType: 'text/markdown',
        filename: 'ai-readme.md',
      },
      agent: {
        content: agentDraft,
        contentType: 'text/markdown',
        filename: 'copilot-instructions.md',
      }
    };
    const executionTime = Date.now() - startTime;
    console.log(`✅ [generar-documentacion-completa] Documentación generada exitosamente en ${executionTime}ms`);
    return Response.json(result, {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    const executionTime = Date.now() - startTime;
    console.error(`❌ [generar-documentacion-completa] Error después de ${executionTime}ms:`, error);
    if (error instanceof Error) {
      console.error(`❌ [generar-documentacion-completa] Error message: ${error.message}`);
      console.error(`❌ [generar-documentacion-completa] Error stack: ${error.stack}`);
    }
    return Response.json({
      error: 'Failed to generate documentation',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      executionTimeMs: executionTime
    }, { status: 500 })
  }
}
