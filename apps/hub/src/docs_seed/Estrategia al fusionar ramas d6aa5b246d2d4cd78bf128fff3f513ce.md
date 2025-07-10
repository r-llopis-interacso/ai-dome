# Estrategia al fusionar ramas

<aside>
💡 Seguir la misma estrategia de fusión de ramas mantiene el historial de cambios consistente y facilita su lectura y navegación al mantenerlo lineal.

</aside>

<aside>
👉 Mezclar los cambios de distintos commits siguiendo la estrategia squash

</aside>

# Historial de cambios lineal

Usando esta estrategia se aplican todos los cambios de la rama origen en la rama destino en un sólo nuevo commit, de esa forma el historial de cambios se mantiene lineal en las ramas principales.

# Estrategia de fusión

Es recomendable usar **squash** como estrategia para la fusión de ramas secundarias en las principales.

## Un commit por tarea

Deberíamos aspirar a tener un historial de cambios en Git lo más limpio posible.

Idealmente cada tarea debería tener un sólo commit, de esa forma es trivial consultar los cambios específicos de cada tarea.

Obviamente puede ser habitual tener varios commits para una misma tarea si por ejemplo se detectar errores o cosas que faltan al probar la tarea una vez fusionada con la rama principal. Si esto ocurre con demasiada frecuencia, puede ser un indicativo que las tareas necesitan ser divididas en otras más pequeñas.

## Commits temporales

Usando ésta estrategia, los commits de la rama de trabajo puede considerarse temporales ya que antes de fusionarse con la rama principal acabarían combinados todos en uno.

Esta situación nos permite crear tantos commits como consideremos necesarios sin que ello vaya a suponer un detrimento en la legibilidad del historial de cambios, mientras nos aporta algunas ventajas:

- Desglosar la tarea en pequeños cambios claramente definidos, lo cual nos ayudará a detallar el mensaje del commit definitivo al fusionarlos todos
- Experimentar con distintas opciones y saltar entre ellas fácilmente mientras buscamos la mejor solución

## Mensaje del commit al fusionar

En lugar de dejar el típico mensaje auto generado, el mensaje del commit definitivo al fusionar con la rama principal debería seguir las mismas pautas que el resto de [mensajes para los commits](development/git/merges).

## Sincronizar ramas temporales con la principal

Al sincronizar las ramas temporales con la la principal para probar integraciones o corregir conflictos, podemos mezclar los cambios de varias formas:

- Si estamos trabajando solos la rama temporal, podemos hacer un `git rebase`
- Si hay varias personas trabajando en la rama temporal, hay que hacer un `git merge`

En cualquier caso, al seguir la estrategia **squash** las referencias a los merges realizados desaparecerán una vez fusionada la rama temporal.

Por normal general, al actualizarse la rama se deberían respetar los cambios de la rama principal en los conflictos y luego adaptar los cambios deseados en otro/s commit/s.

# Pull requests

Mediante un pull request, para aplicar esta estrategia sólo hay que seleccionar la opción indicada en la modal para mezclar:

![bitbucket-pull-request-merge-squash.png](Estrategia%20al%20fusionar%20ramas%20d6aa5b246d2d4cd78bf128fff3f513ce/bitbucket-pull-request-merge-squash.png)

Sólo hay que tener cuidado con modificar el mensaje de commit auto generado por Bitbucket antes de fusionarlo.

# Estrategia por defecto en Bitbucket

Es posible y recomendable configurar la estrategia por defecto en las opciones de Bitbucket de cada repositorio, en la sección **Workflow** > **Merge strategies**:

![bitbucket-settings-merge-strategies.png](Estrategia%20al%20fusionar%20ramas%20d6aa5b246d2d4cd78bf128fff3f513ce/bitbucket-settings-merge-strategies.png)

Realizar un merge usando la estrategia **squash** manualmente es también sencillo y en condiciones normales sólo debería requerir tres pasos desde la línea de comandos:

# Squash manual

Realizar un merge usando la estrategia **squash** manualmente es también sencillo y en condiciones normales sólo debería requerir tres pasos desde la línea de comandos:

```bash
# Ir a la rama destino, por ejemplo develop
git checkout develop
# Aplicar los cambios de la rama origen, por ejemplo feature/PROJ-16
git merge --squash feature/PROJ-16
# Guardar los cambios en un commit
git commit
```