import { CollectionConfig } from 'payload';

export const Etiquetas: CollectionConfig = {
  slug: 'etiquetas',
  labels: {
    singular: 'Etiqueta',
    plural: 'Etiquetas',
  },
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'tipo', 'aliasDePaquete'],
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'aliasDePaquete',
      type: 'text',
      required: false,
      admin: {
        description: 'Nombre alternativo usado en package.json (ej: "react" para React)',
      },
    },
    {
      name: 'tipo',
      type: 'select',
      required: true,
      options: [
        { label: 'Tecnologia', value: 'Tecnologia' },
        { label: 'Conceptual', value: 'Conceptual' },
        { label: 'Area', value: 'Area' },
      ],
    },
    {
      name: 'dependeDe',
      type: 'relationship',
      relationTo: 'etiquetas',
      hasMany: true,
      required: false,
      admin: {
        description: 'Etiquetas de las que depende esta etiqueta',
      },
    },
    {
      name: 'directricesRelacionadas',
      type: 'join',
      collection: 'directrices',
      on: 'etiquetas',
      admin: {
        description: 'Directrices que utilizan esta etiqueta',
      },
    },
  ],
};
