# Estructura de los hooks

<aside>
💡 Los hooks React son otro tipo de módulo por lo que siguen reglas similares

</aside>

<aside>
👉 Seguir la estructura modular

</aside>

# Parámetros de entrada

Los parámetros de entrada no es necesario que sigan un patrón fijo, es decir que deben afrontarse como en otras funciones y pueden plantearse cómo se considere que resultan más legibles o expresivos.

Por ejemplo, se recomienda no limitarse a usar siempre un sólo parámetro de tipo objeto que contenga el resto de parámetros.

# Parámetros de salida

Los parámetros de salida no es necesario que sigan un patrón fijo, es decir que deben afrontarse como en otras funciones y pueden plantearse cómo se considere que resultan más legibles o expresivos.

Por lo tanto los hooks pueden devolver casi cualquier cosa: objetos, arrays, tuplas, funciones, etc.

# Estructura de la carpeta

Del mismo modo que el resto de módulos, agrupamos todos los ficheros del hook en una carpeta. No todos necesitarán la misma cantidad de ficheros, pero suponiendo. un hook `usePosts`, ésta sería la estructura típica de su carpeta:

- `use-posts`
    - `index.mdx`: documentación del hook si fuera necesaria
    - `index.ts`: implementación del hook `usePosts`
    - `specs.tsx`: especificaciones del hook en forma de pruebas unitarias
    - `types.ts`: tipos usados por el hook y sus módulos relacionados
    - `use-posts-filters`: se puede delegar parte de la lógica a otros hooks internos si esto ayuda a simplificar el hook principal