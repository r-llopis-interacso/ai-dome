# Estructura del directorio

<aside>
💡 Mantener una estructura de carpetas coherente y común ayudará a organizar y moverse por el código de forma ágil y previsible, además de facilitar el cambio de contexto al saltar entre proyectos

</aside>

# Directorio del código fuente

- `src/`
    - `components`: componentes independientes y aislados
    - `containers`: componentes construidos a partir de otros componentes
    - `hooks`: hooks con lógica reutilizable
    - `layouts`: componentes que determinan la estructura visual de las páginas
    - `pages`: componentes de páginas completas asignadas a una ruta concreta
    - `services`: funciones para conectar con APIs de servicios internos o externos
    - `utils`: funciones de utilidad que no entran dentro de los otros tipos
    - `views`: componentes contienen secciones funcionales

Tenemos una explicación más detallada sobre los distintos [tipos de componentes](Tipos%20de%20componentes%20ec4e503fe001413097bafc69ccee22f4.md).

# Grupos de categorías

En proyectos medianos o grandes, las carpetas de tipos se suelen llenar con demasiados recursos. En esos casos conviene añadir un nivel más de organización y agrupar los recursos relacionados en carpetas de categorías.

Cómo las categorías representan clasificaciones semánticas los nombres de sus carpetas pueden ser en singular.

Ejemplo de una estructura de contenedores por categorías:

- `src`
    - `containers`
        - **** **`form`
            - `form-field`
            - `radio-group`
            - `select`
            - …
        - `heading`
            - `page-header`
            - `section-header`
            - …
        - `navigation`
            - `breadcrumbs`
            - `pagination`
            - `tab-menu`
            - …
        - `overlay`
            - `modal`
            - `notification`
            - `slide-over`
            - …
        - …