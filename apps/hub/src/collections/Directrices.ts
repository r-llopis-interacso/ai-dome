import { CollectionConfig, APIError } from 'payload';
import { validateGuideline } from '../services/validationService';

const DEBUG_PREFIX = '훅 [Directrices]';

export const Directrices: CollectionConfig = {
  slug: 'directrices',
  labels: {
    singular: 'Directriz',
    plural: 'Directrices',
  },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'etiquetas', 'activa'],
    listSearchableFields: ['titulo'],
  },
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === 'create') {
          console.log(`${DEBUG_PREFIX} Hook 'beforeChange' para CREAR directriz activado.`);
          
          const validationResult = await validateGuideline(data, req.payload);

          if (validationResult.conflicto && validationResult.detalles) {
            const conflictos = validationResult.detalles.map((detalle: any) => 
              `'${detalle.directrizConflictiva.titulo}': ${detalle.explicacion}`
            ).join('; ');

            const errorMessage = `La directriz presenta conflictos. Por favor, revísala. Detalles: ${conflictos}`;
            console.error(`${DEBUG_PREFIX} Conflicto detectado. Lanzando APIError: ${errorMessage}`);
            
            throw new APIError(
              errorMessage,
              400, // Bad Request
            );
          } else if (validationResult.error) {
            console.warn(`${DEBUG_PREFIX} La validación con IA falló y no pudo verificar conflictos. Se permite la creación. Error: ${validationResult.error}`);
          } else {
            console.log(`${DEBUG_PREFIX} No se encontraron conflictos. La directriz se guardará.`);
          }
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      required: true,
      admin: {
        description: 'Título descriptivo de la directriz',
      },
    },
    {
      name: 'contenido',
      type: 'richText',
      required: true,
      admin: {
        description: 'Contenido completo de la directriz en formato markdown',
      },
    },
    {
      name: 'activa',
      type: 'checkbox',
      required: true,
      defaultValue: true,
      admin: {
        description: 'Indica si la directriz está activa y se incluye en las respuestas',
      },
    },
    {
      name: 'etiquetas',
      type: 'relationship',
      relationTo: 'etiquetas',
      hasMany: true,
      required: true,
      admin: {
        description: 'Etiquetas asociadas a esta directriz',
      },
    },
  ],
};
