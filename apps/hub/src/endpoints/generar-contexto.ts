import type { PayloadRequest } from 'payload'
import type { Directrice, Etiqueta } from '../payload-types'
import { addDataAndFileToRequest } from 'payload'

export interface PackageJsonDependencies {
  [key: string]: string
}

export interface PackageJsonData {
  dependencies?: PackageJsonDependencies
  devDependencies?: PackageJsonDependencies
  [key: string]: any
}

export interface GenerarContextoRequest {
  packageJson: PackageJsonData | string
  filtros?: {
    incluirAreas?: string[]      // Solo incluir estas áreas
    excluirAreas?: string[]      // Excluir estas áreas
    incluirEtiquetas?: string[]  // Solo incluir estas etiquetas
    excluirEtiquetas?: string[]  // Excluir estas etiquetas
  }
}

// Función para convertir el contenido de Lexical a texto plano
function lexicalToText(lexicalContent: any): string {
  if (!lexicalContent?.root?.children) {
    return ''
  }

  function extractText(node: any): string {
    if (node.type === 'text') {
      return node.text || ''
    }

    if (node.children && Array.isArray(node.children)) {
      return node.children.map(extractText).join('')
    }

    return ''
  }

  return lexicalContent.root.children.map(extractText).join('\n')
}

// Función para resolver dependencias de etiquetas recursivamente
async function resolverDependenciasEtiquetas(
  etiquetas: Etiqueta[],
  visitadas: Set<string | number> = new Set()
): Promise<Etiqueta[]> {
  const todasLasEtiquetas: Etiqueta[] = [...etiquetas]

  for (const etiqueta of etiquetas) {
    if (visitadas.has(etiqueta.id)) continue
    visitadas.add(etiqueta.id)

    if (etiqueta.dependeDe && etiqueta.dependeDe.length > 0) {
      // Filtrar solo las etiquetas que ya están pobladas (objetos, no IDs)
      const dependenciasEtiquetas = etiqueta.dependeDe.filter(dep => typeof dep === 'object') as Etiqueta[]

      if (dependenciasEtiquetas.length > 0) {
        const dependenciasResueltas = await resolverDependenciasEtiquetas(
          dependenciasEtiquetas,
          visitadas
        )
        todasLasEtiquetas.push(...dependenciasResueltas)
      }
    }
  }

  // Eliminar duplicados basándose en el ID
  const etiquetasUnicas = todasLasEtiquetas.filter(
    (etiqueta, index, array) =>
      array.findIndex(e => e.id === etiqueta.id) === index
  )

  return etiquetasUnicas
}

// Función para generar el markdown final agrupado por áreas
function generarMarkdown(directrices: Directrice[]): string {
  let markdown = '# Contexto de Directrizs de IA\n\n'
  markdown += `Generado el: ${new Date().toLocaleString('es-ES')}\n\n`

  if (directrices.length === 0) {
    markdown += 'No se encontraron directrices relacionadas con las dependencias del proyecto.\n'
    return markdown
  }

  // Agrupar directrices por área de desarrollo
  const directricesPorArea = agruparPorArea(directrices)
  const totalDirectrizs = directrices.length

  markdown += `## Resumen\n\n`
  markdown += `**Total de directrices aplicables:** ${totalDirectrizs}\n`
  markdown += `**Áreas de desarrollo identificadas:** ${Object.keys(directricesPorArea).length}\n\n`

  // Generar tabla de contenidos
  markdown += `## Índice de Áreas\n\n`
  Object.keys(directricesPorArea).forEach(area => {
    const count = directricesPorArea[area].length
    markdown += `- [${area}](#${area.toLowerCase().replace(/\s+/g, '-')}) (${count} directrices)\n`
  })
  markdown += '\n'

  // Generar contenido por área
  Object.entries(directricesPorArea).forEach(([area, directricesDelArea]) => {
    markdown += `## ${area}\n\n`
    markdown += `*${directricesDelArea.length} directrices aplicables*\n\n`

    directricesDelArea.forEach((directriz, index) => {
      markdown += `### ${index + 1}. ${directriz.titulo}\n\n`

      // Convertir el contenido Lexical a texto plano
      const contenidoTexto = lexicalToText(directriz.contenido)
      markdown += `${contenidoTexto}\n\n`

      // Obtener nombres de etiquetas (pueden ser objetos o IDs)
      const nombresEtiquetas = directriz.etiquetas
        .map(etiqueta => typeof etiqueta === 'object' ? etiqueta.nombre : `ID:${etiqueta}`)
        .filter(Boolean)

      if (nombresEtiquetas.length > 0) {
        markdown += `**Etiquetas relacionadas:** ${nombresEtiquetas.join(', ')}\n\n`
      }

      markdown += '---\n\n'
    })
  })

  return markdown
}

// Función auxiliar para agrupar directrices por área de desarrollo
function agruparPorArea(directrices: Directrice[]): Record<string, Directrice[]> {
  const grupos: Record<string, Directrice[]> = {}

  directrices.forEach(directriz => {
    // Buscar etiquetas de tipo "Area" en la directriz
    const etiquetasArea = directriz.etiquetas
      .filter((etiqueta) => typeof etiqueta === 'object' && etiqueta.tipo === 'Area')
      .map((etiqueta) => typeof etiqueta === 'object' ? etiqueta.nombre : '')
      .filter(Boolean)

    if (etiquetasArea.length > 0) {
      // Si tiene etiquetas de área, agregar a cada área
      etiquetasArea.forEach((area: string | number) => {
        if (!grupos[area]) {
          grupos[area] = []
        }
        grupos[area].push(directriz)
      })
    } else {
      // Si no tiene etiquetas de área, colocar en "General"
      if (!grupos['General']) {
        grupos['General'] = []
      }
      grupos['General'].push(directriz)
    }
  })

  // Ordenar las áreas alfabéticamente, pero "General" al final
  const areasOrdenadas: Record<string, Directrice[]> = {}
  const areasNombres = Object.keys(grupos).sort()

  areasNombres.forEach(area => {
    if (area !== 'General') {
      areasOrdenadas[area] = grupos[area]
    }
  })

  // Agregar "General" al final si existe
  if (grupos['General']) {
    areasOrdenadas['General'] = grupos['General']
  }

  return areasOrdenadas
}

// Función para aplicar filtros a las etiquetas
function aplicarFiltros(
  etiquetas: Etiqueta[],
  filtros?: GenerarContextoRequest['filtros']
): Etiqueta[] {
  if (!filtros) return etiquetas

  let etiquetasFiltradas = [...etiquetas]

  // Filtrar por áreas
  if (filtros.incluirAreas && filtros.incluirAreas.length > 0) {
    etiquetasFiltradas = etiquetasFiltradas.filter(etiqueta => {
      // Si es una etiqueta de área, verificar si está en la lista de incluir
      if (etiqueta.tipo === 'Area') {
        return filtros.incluirAreas!.some(area =>
          etiqueta.nombre.toLowerCase().includes(area.toLowerCase()) ||
          (etiqueta.aliasDePaquete && etiqueta.aliasDePaquete.toLowerCase().includes(area.toLowerCase()))
        )
      }
      // Para etiquetas que no son de área, verificar si pertenecen a áreas incluidas
      // a través de sus dependencias o relaciones
      return true // Por ahora incluir todas las no-áreas si hay filtro de áreas
    })
  }

  if (filtros.excluirAreas && filtros.excluirAreas.length > 0) {
    etiquetasFiltradas = etiquetasFiltradas.filter(etiqueta => {
      if (etiqueta.tipo === 'Area') {
        return !filtros.excluirAreas!.some(area =>
          etiqueta.nombre.toLowerCase().includes(area.toLowerCase()) ||
          (etiqueta.aliasDePaquete && etiqueta.aliasDePaquete.toLowerCase().includes(area.toLowerCase()))
        )
      }
      return true
    })
  }

  // Filtrar por etiquetas específicas
  if (filtros.incluirEtiquetas && filtros.incluirEtiquetas.length > 0) {
    etiquetasFiltradas = etiquetasFiltradas.filter(etiqueta => {
      return filtros.incluirEtiquetas!.some(nombreEtiqueta =>
        etiqueta.nombre.toLowerCase().includes(nombreEtiqueta.toLowerCase()) ||
        (etiqueta.aliasDePaquete && etiqueta.aliasDePaquete.toLowerCase().includes(nombreEtiqueta.toLowerCase()))
      )
    })
  }

  if (filtros.excluirEtiquetas && filtros.excluirEtiquetas.length > 0) {
    etiquetasFiltradas = etiquetasFiltradas.filter(etiqueta => {
      return !filtros.excluirEtiquetas!.some(nombreEtiqueta =>
        etiqueta.nombre.toLowerCase().includes(nombreEtiqueta.toLowerCase()) ||
        (etiqueta.aliasDePaquete && etiqueta.aliasDePaquete.toLowerCase().includes(nombreEtiqueta.toLowerCase()))
      )
    })
  }

  return etiquetasFiltradas
}

export const generarContextoHandler = async (req: PayloadRequest) => {
  const startTime = Date.now();
  console.log('🚀 [generar-contexto] Iniciando generación de contexto');

  try {
    if (req.method !== 'POST') {
      console.error('❌ [generar-contexto] Método HTTP no permitido:', req.method);
      return Response.json({ error: 'Método no permitido' }, { status: 405 })
    }

    // Usar el helper de Payload para leer el body
    console.log('📖 [generar-contexto] Leyendo datos de la petición...');
    await addDataAndFileToRequest(req)
    const { packageJson, filtros } = req.data || {}

    if (!packageJson) {
      console.error('❌ [generar-contexto] packageJson no proporcionado');
      return Response.json({ error: 'Se requiere el campo packageJson' }, { status: 400 })
    }

    let packageData: PackageJsonData;
    try {
      packageData = typeof packageJson === 'string'
        ? JSON.parse(packageJson)
        : packageJson
    } catch (parseError) {
      console.error('❌ [generar-contexto] Error parseando packageJson:', parseError);
      return Response.json({ error: 'packageJson inválido' }, { status: 400 })
    }

    console.log('📦 [generar-contexto] Filtros recibidos:', JSON.stringify(filtros, null, 2));

    // Extraer todas las dependencias
    const todasLasDependencias = {
      ...packageData.dependencies,
      ...packageData.devDependencies,
    }

    const nombresDependencias = Object.keys(todasLasDependencias)
    console.log(`📋 [generar-contexto] ${nombresDependencias.length} dependencias encontradas:`, nombresDependencias);

    if (nombresDependencias.length === 0) {
      console.warn('⚠️ [generar-contexto] No se encontraron dependencias en package.json');
      return Response.json({
        markdown: generarMarkdown([]),
        message: 'No se encontraron dependencias en el package.json'
      })
    }

    // Buscar etiquetas que coincidan con las dependencias
    console.log('🔍 [generar-contexto] Buscando etiquetas coincidentes...');
    const etiquetasEncontradas = await req.payload.find({
      collection: 'etiquetas',
      where: {
        or: [
          {
            nombre: {
              in: nombresDependencias,
            },
          },
          {
            aliasDePaquete: {
              in: nombresDependencias,
            },
          },
        ],
      },
      depth: 3, // Para incluir las relaciones de dependeDe
    });

    console.log(`📋 [generar-contexto] ${etiquetasEncontradas.docs?.length || 0} etiquetas encontradas en base de datos`);

    if (!etiquetasEncontradas.docs || etiquetasEncontradas.docs.length === 0) {
      console.warn('⚠️ [generar-contexto] No se encontraron etiquetas coincidentes');
      return Response.json({
        markdown: generarMarkdown([]),
        message: 'No se encontraron etiquetas que coincidan con las dependencias del proyecto'
      })
    }

    // Resolver dependencias recursivamente
    console.log('🔄 [generar-contexto] Resolviendo dependencias recursivamente...');
    const todasLasEtiquetasRelevantes = await resolverDependenciasEtiquetas(
      etiquetasEncontradas.docs as Etiqueta[]
    );

    console.log(`📊 [generar-contexto] ${todasLasEtiquetasRelevantes.length} etiquetas totales después de resolver dependencias`);

    // Aplicar filtros a las etiquetas
    console.log('🎯 [generar-contexto] Aplicando filtros...');
    const etiquetasFiltradas = aplicarFiltros(todasLasEtiquetasRelevantes, filtros)

    console.log('🔍 Etiquetas antes del filtro:', todasLasEtiquetasRelevantes.length)
    console.log('🔍 Etiquetas después del filtro:', etiquetasFiltradas.length)

    if (filtros) {
      console.log('🔧 Filtros aplicados:', JSON.stringify(filtros, null, 2))
      console.log('📊 Etiquetas filtradas:', etiquetasFiltradas.map(e => `${e.nombre} (${e.tipo})`))
    }

    const idsEtiquetas = etiquetasFiltradas.map(e => e.id)
    console.log(`🔗 [generar-contexto] Buscando directrices para ${idsEtiquetas.length} etiquetas...`);

    // Buscar directrices que tengan estas etiquetas
    const directricesEncontradas = await req.payload.find({
      collection: 'directrices',
      where: {
        etiquetas: {
          in: idsEtiquetas,
        },
      },
      depth: 2, // Para incluir las etiquetas completas
    });

    console.log(`📄 [generar-contexto] ${directricesEncontradas.docs?.length || 0} directrices encontradas`);

    console.log('📝 [generar-contexto] Generando markdown...');
    const markdown = generarMarkdown(directricesEncontradas.docs as Directrice[])

    // Extraer áreas de desarrollo identificadas (después del filtro)
    const areasIdentificadas = [...new Set(
      etiquetasFiltradas
        .filter(etiqueta => etiqueta.tipo === 'Area')
        .map(etiqueta => etiqueta.nombre)
    )]

    const executionTime = Date.now() - startTime;
    console.log(`✅ [generar-contexto] Contexto generado exitosamente en ${executionTime}ms`);
    console.log(`📊 [generar-contexto] Resumen: ${directricesEncontradas.docs.length} directrices, ${areasIdentificadas.length} áreas, markdown de ${markdown.length} caracteres`);

    return Response.json({
      markdown,
      dependenciasEncontradas: nombresDependencias,
      etiquetasEncontradas: etiquetasFiltradas.map(e => e.nombre),
      areasDeDesarrollo: areasIdentificadas,
      directricesTotales: directricesEncontradas.docs.length,
      filtrosAplicados: filtros || null,
      estadisticas: {
        dependenciasAnalizadas: nombresDependencias.length,
        etiquetasEncontradas: etiquetasFiltradas.length,
        directricesRelacionadas: directricesEncontradas.docs.length,
        areasDesarrollo: areasIdentificadas.length,
        totalEtiquetas: etiquetasFiltradas.length,
        etiquetasTecnologia: etiquetasFiltradas.filter(e => e.tipo === 'Tecnologia').length,
        etiquetasConceptual: etiquetasFiltradas.filter(e => e.tipo === 'Conceptual').length,
        etiquetasArea: etiquetasFiltradas.filter(e => e.tipo === 'Area').length,
        executionTimeMs: executionTime,
      },
      debug: {
        dependenciasExtraidas: nombresDependencias,
        etiquetasEncontradas: etiquetasFiltradas.map(e => ({ nombre: e.nombre, tipo: e.tipo })),
        areasAgrupacion: areasIdentificadas,
        etiquetasOriginalesTotales: todasLasEtiquetasRelevantes.length,
        etiquetasFiltradas: etiquetasFiltradas.length,
      }
    })

  } catch (error) {
    const executionTime = Date.now() - startTime;
    console.error(`❌ [generar-contexto] Error después de ${executionTime}ms:`, error);

    if (error instanceof Error) {
      console.error(`❌ [generar-contexto] Error message: ${error.message}`);
      console.error(`❌ [generar-contexto] Error stack: ${error.stack}`);
    }

    return Response.json({
      error: 'Error interno del servidor',
      details: error instanceof Error ? error.message : 'Error desconocido',
      timestamp: new Date().toISOString(),
      executionTimeMs: executionTime
    }, { status: 500 })
  }
}
