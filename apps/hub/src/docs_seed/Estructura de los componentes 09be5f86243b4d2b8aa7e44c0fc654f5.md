# Estructura de los componentes

<aside>
💡 Los componentes de React son otro tipo de módulo por lo que siguen reglas similares

</aside>

<aside>
👉 Seguir la estructura modular

</aside>

# Separación en ficheros

Salvo que se trate de un micro componente en el que todo su código puede ir en un sólo fichero manteniendo una gran legibilidad, no normal sería separar los distintos aspectos del componente en diferentes ficheros: **estructura, estilos, tipos, pruebas, historias, documentación**…

El fichero principal llamado `index.tsx` exportaría por defecto el componente de React, estaría contenido junto con el resto de ficheros que comparta el componente en una misma carpeta cuyo nombre identifique al componente.

## Componentes hijos

En caso de componentes complejos cuyas partes sean suficientemente específicas por lo que no se puedan abstraer, podemos dividirlo en varios componentes hijos o internos que sólo podrán ser usados por su padre.

Los componentes hijos se crearán en la propia carpeta del componente padre siguiendo las misma estructura definida en ésta pauta, pero **sin** seguir las reglas de clasificación por [tipo de componentes](Tipos%20de%20componentes%20ec4e503fe001413097bafc69ccee22f4.md).

## Otros módulos internos

Como cualquier tipo de módulo, los componentes pueden tener módulos internos para mejorar la estructura del mismo. Los dos casos más habituales es que los componentes tengan funciones de utilidad o hooks propios.

## Ejemplo de estructura

No todos componentes necesitan los mismos tipos ficheros o carpetas, pero suponiendo un componente de nombre `search-input`, ésta podría ser la estructura de su carpeta:

- `search-input/`
    - `index.mdx`: documentación del componente si fuera necesaria
    - `index.tsx`: estructura visual del componente en forma de componente de React
    - `specs.tsx`: especificaciones del componente en forma de pruebas unitarias
    - `stories.tsx`: ejemplos de uso del componente al usar [Storybook](https://storybook.js.org)
    - `styles.module.css`: estilos del componente al usar [CSS Modules](https://github.com/css-modules/css-modules)
    - `types.ts`: tipos usados por el componente y sus módulos relacionados
    - `use-search-input/`: lógica del componente en forma de hook de React
        - `index.ts`: hook con la lógica del componente
        - `specs.ts`: pruebas unitarias del hook

Algunos ficheros podrían variar de nombre según las herramientas usadas en cada proyecto, por ejemplo `tests.tsx` para las pruebas unitarias o `styles.ts` para los estilos cuando no se use CSS.