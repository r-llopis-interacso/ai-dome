import { CollectionConfig } from 'payload';

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
