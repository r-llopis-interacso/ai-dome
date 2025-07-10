# Estructura de carpetas

<aside>
💡 Mantener una estructura común de carpetas clara y coherente ayudará a organizar y moverse por el código de forma ágil y previsible, además de facilitar el cambio de contexto al saltar entre proyectos

</aside>

<aside>
👉 Separar los recursos de un repositorio por tipología y categorías

</aside>

# Estructura raíz

## Configuración aislada y accesible

Lo ideal sería que pudiéramos aislar los ficheros de configuración de las diferentes herramientas y librerías que usamos en una carpeta `config`. Pero como algunas de ellas deben estar en la raíz, de momento nos conformamos que ficheros configuración sean fácilmente accesibles y estén separados del código y los recursos estáticos.

## Separación de código y recursos estáticos

A más alto nivel, conviene separar los recursos estáticos del código fuente, moviendo éste último a una carpeta propia, que por convención llamamos `source` o `src`.

# Agrupaciones por tipología

Ya sean recursos estáticos o código, en el primer de organización queremos que todos ellos estén agrupados según su tipología, por ejemplo:

- En el caso de código algunas tipologías podrían ser: componentes, vistas, entidades, servicios, controladores, etc.
- En el caso de recursos estáticos algunas tipologías podrían ser: imágenes, traducciones, estilos globales, documentación, etc.

Cada agrupación estaría representada por una carpeta con un nombre conciso y descriptivo, generalmente en plural.

# Agrupaciones por categoría

En proyectos con una cantidad suficiente de recursos, en el segundo nivel de organización dentro de cada tipología podemos agrupar sus recursos internos por categorías.

Los nombres de esas categorías puedes hacer referencia la función o la utilidad de su contenido, de forma abstracta o ligada al dominio del proyecto.