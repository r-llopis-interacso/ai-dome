# Uso de pull requests

<aside>
💡 Revisar los cambios de una rama antes de mezclarla sirve para detectar problemas, inconsistencias u otros detalles que pueden ayudar a mejorar considerablemente la calidad del código

</aside>

<aside>
👉 Usar PRs para aplicar todos los cambios en los repositorios

</aside>

# Solicitudes de integración

Salvo excepciones, todos los cambios necesarios para realizar tareas en los proyectos deben ir mediante en ramas temporales y solicitudes de integración (PRs).

Incluso aunque para una tarea no sea posible tener revisores, es recomendable seguir usando los PRs ya que ayudan a revisar los cambios antes de su integración, permiten añadir más contexto y ayudan a su posterior consulta.

# Procedimiento

## Subir los cambios

Para subir los cambios que desean incluir en un PR basta con hacer un `git push` de la rama temporal dónde se encuentren los cambios.

Al hacerlo, Bitbucket nos devuelve una URL para facilitar la creación de los PRs, aunque también se pueden crear fácilmente desde la pantalla para el listado de ramas del repositorio.

## Revisión preliminar

Antes de crear los PRs hay hacer una revisión rápida de los cambios en la rama temporal para comprobar que sólo no incluya cambios inesperados, como por ejemplo de pruebas o de otras tareas.

Ésta revisión se puede hacer en tanto en local como desde la pantalla de creación de PRs en Bitbucket que te muestra todos los cambios que se quieren integrar.

## Configuración

Antes de crear el PR hay que asegurarse que tanto la rama origen como la destino son las deseadas. En caso de que el repositorio sea un fork, también hay que asegurarse que se apunta al repositorio deseado.

Además al crear el PR es un buen momento para marcar la opción para borrar la rama automáticamente una vez mezclado el PR.

## Formato

En el **título** y la **descripción** del los PRs hay que seguir el mismo formato para el [mensaje de los commits](../Git%203d6086412d4b45409e0c51d5a10f28be/Mensajes%20para%20los%20commits%20f8db559ca576456ebcdf55e72a3f7e60.md) como si fueran el **resumen** y los **detalles** respectivamente. Aunque sin los metadatos del final que se incluirán en el momento de mezclar el PR.

Si la rama tiene un sólo commit se deberían completar automáticamente ambos campos con el formato esperado. Si tiene varios, habrá que rellenarlos manualmente ya que en ese caso el autocompletado es muy poco útil o legible.

## Revisores

Se pueden crear PRs provisionales que no requieren revisión inmediata sin incluir revisores.

Ya sea antes o después de su creación, el en momento que un PR necesita revisión, se deben [añadir los revisores](Revisores%20de%20pull%20requests%2030e43062144042e2b767b65bb3b1d6d7.md) según lo indicado en su respectiva pauta.

## Revisión

Durante el proceso de [revisión del código](Revisio%CC%81n%20de%20co%CC%81digo%20ed8853ae39ce4ba7869cf476ad1fd8dd.md) en los PRs se deben seguir las indicaciones documentadas en su respectiva pauta.

## Correcciones y cambios

Por lo general, Las correcciones y cambios que se apliquen a partir de las sugerencias realizadas durante la revisión deberán ser subidas en el mismo PR, salvo que por un motivo de peso se decida afrontarlos en otra tarea o PR.

Para facilitar la revisión posterior de los nuevos cambios, es recomendable responder los comentarios originales dónde se piden con el hash corto del commit dónde se aplicaron. De esa forma los revisores saben que los cambios se han realizado y Bitbucket genera un enlace a ellos para revisarlos de forma aislada.

## Cierre

Para [cerrar un PR](Cierre%20de%20pull%20requests%20c091a91e96d24664992a171f3defaa3f.md) se deben las indicaciones documentadas en su respectiva pauta.

# Conflictos

En caso de conflictos en un PR, su rama debe actualizarse con la rama principal siguiendo las pautas de sincronización de [Estrategia al fusionar ramas](development/git/merge).

En caso de duda sobre como resolver algún conflicto, antes de borrar código existente, habría que consultarlo con el autor del mismo o buscar