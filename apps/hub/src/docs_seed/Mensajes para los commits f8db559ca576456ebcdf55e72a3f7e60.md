# Mensajes para los commits

<aside>
💡 Escribir mensajes consistentes que expliquen claramente los cambios hará que el historial sea más legible y comprensible, permitiendo entender las modificaciones anteriores y ayudando a tomar decisiones sobre las nuevas

</aside>

<aside>
👉 Escribir mensajes claros y descriptivos siguiendo el formato habitual

</aside>

# Consistencia

Independientemente del formato y estilo seguido, siempre deberíamos seguir uno concreto en todos los mensajes de los commits de un proyecto.

# Códigos de Jira

Tal como se indica en [Integración con Jira](notion://www.notion.so/interacso/development/git/jira), es muy importante incluir el código de Jira en los commits de las tarjetas a la que estén vinculados.

# Formato habitual

El formato habitual que usamos en la mayoría de los proyectos se puede dividir en tres bloques separados por saltos de líneas: resumen, detalles opcionales y referencias.

## Resumen

La primera línea del mensaje debería estar reservada para un resumen conciso de los cambios, teniendo en cuenta los siguientes puntos:

- Usar el código de Jira como prefijo, separado por dos puntos y un espacio
- Empezar el resumen con una letra mayúscula
- Empezar el resumen con un verbo en tiempo verbal imperativo
- Terminar el resumen sin puntos u otros símbolos de puntuación
- Separar el resumen de los detalles una línea en blanco

## Detalles opcionales

En commits sencillos o pequeños, es habitual que con el resumen de la primera línea sea suficiente para describir los cambios de forma clara.

Para commits más grandes, complejos o significativos, es recomendable incluir un bloque adicional con más detalles, que puede ocupar varias líneas. Estos son algunos ejemplos de que tipo de información podríamos incluir en los detalles:

- Explicar la motivación de los cambios
- Explicar a alto nivel la solución aplicada
- Listar que cambios se han realizados para que sea más fácil revisarlos
- Documentar cambios adicionales no directamente relacionados
- Describir errores que se producían

Por lo general, la información incluida en los detalles debería complementar la que exista en la tarjeta de Jira en lugar de duplicarla.

## Referencias

En el final del mensaje se pueden incluir referencias necesarias en cada caso:

- Referencia a la rama original
- Referencia al pull request
- Lista de revisores que aprobaron el pull request

# Ejemplos de mensajes

Ejemplos de mensajes completos para proyectos imaginados `PROJ`, `APPL` y `RGBA`:

```
PROJ-16: Añadir vista para visualizar las métricas de acceso

- Añadir tema para el componente de los gráficos lineales
- Incluir icono para botones de exportar
- Añadir petición para obtener los datos
- Crear componente para la vista
- Crear componentes hijos para la vista:
	- Filtro por país
	- Botón para exportar los datos
	- Leyenda para el gráfico

Fusionado en feature/PROJ-16 (solicitud de integración #12)
Aprobado por: Jon Snow
```

```
APPL-32: Elimina peticiones innecesarias al actualizar un documento

Se producían 4 peticiones adicionales al actualizar un documento,
con el cambio se pasa sólo a una.

Merged in feature/APPL-32 (pull request #24)
Approved by: Steve Cook
```

```
RGBA-64: Corrige borrado no deseado de registros

El problema era que las condiciones a la BBDD se estaban usando algunos
parámetros como cadenas cuando eran de tipo enterno, lo que filtraba
muchos más registros de los deseados.

Merged in feature/RGBA-64 (pull request #48)
Approved by: Max Power
```

# Plantilla para mensajes

Para facilitar la aplicación del formato habitual y a modo de recordatorio, es recomendable incluir una plantilla de mensaje en los repositorios.

Como convención vamos a llamar al fichero que contiene la plantilla `.gitmessage` y lo incluiremos en la raíz de los repositorios:

```
# JIRA-123: Resumen imperativo empezando en mayúscula, terminando sin puntuación

# Detalles opcionales que expliquen los cambios, su motivación o la solución,
# también se pueden incluir otros que ayuden a la revisión posterior,
# por ejemplo documentar los cambios adicionales no directamente relacionados
#
# No olvidar elimintar mensajes de commits intermedios que sólo aportan ruido,
# o posibles códigos de Jira de otras tarjetas no relacionadas
#
# Más información sobre los mensajes de commits en el manual:
# https://www.notion.so/interacso/Mensajes-para-los-commits-f8db559ca576456ebcdf55e72a3f7e60?pvs=4

# Incluir al final las referencias a las ramas, pull requests o revisores
# que los hayan aprobado, que genera se automáticamente en Bitbucket
```

Como se indica en la [configuración de Git](Configuracio%CC%81n%20de%20Git%2031d7d878796049c8b72a83043d1dcbc9.md), para poder usar esos ficheros, antes debemos configurar los repositorios o Git globalmente.