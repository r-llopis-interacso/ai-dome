# Cierre de pull requests

<aside>
💡 Seguir siempre los mismos criterios antes de cerrar PRs ayuda a mantener la coherencia en el proceso de revisión, la prevención de errores, la colaboración del equipo y apoyar las buenas prácticas

</aside>

<aside>
👉 Cumplir los criterios y verificar los detalles antes de integrar los cambios

</aside>

# Criterios de aceptación

Antes de poder mezclar un PR te tienen que cumplir una serie de criterios:

- Debe contar al menos un aprobado del responsable técnico de cada parte modificada
- Debe contar al menos con un aprobado del resto de revisores
- Si no es urgente, idealmente deberíamos esperar al aprobado de todos los revisores
- Debe cumplir todas las reglas de formato establecidas en el proyecto
- Debe cumplir todas las reglas de estilo establecidas en el proyecto
- Deben pasar todos los tests automáticos del repositorio
- Debe poder compilarse el código sin errores
- Apunta a la rama dónde que quieren integrar los cambios

Por las características del proyecto, alguno de los criterios anteriores no pueden cumplirse, evidentemente no deberían bloquear el PR para su integración.

# Integrar los cambios

Una vez se han cumplido los criterios de aceptación, se puede proceder a integrar los cambios del PR en la rama esperada. Antes de proceder a la integración, habría que hacer las siguientes comprobaciones:

- Verificar que el PR apunta a la rama esperada y no a una temporal
- Asegurarse que el [mensaje del commit](../Git%203d6086412d4b45409e0c51d5a10f28be/Mensajes%20para%20los%20commits%20f8db559ca576456ebcdf55e72a3f7e60.md) de la integración tiene el formato correcto
- Asegurarse que la [estrategia de fusión](../Git%203d6086412d4b45409e0c51d5a10f28be/Estrategia%20al%20fusionar%20ramas%20d6aa5b246d2d4cd78bf128fff3f513ce.md) es la esperada
- Aprovechar para indicar el nuevo estado para la tarea
- Marcar la opción para eliminar la rama una vez integrada

# Declinar los cambios

Los PRs que no se vayan a mezclar por cualquier motivo deben ser declinados indicando el motivo, algunos ejemplos por los cuales podría ocurrir estos serían los siguientes:

- Se ha creado por error
- Contiene cambios mayoritariamente erróneos
- Pertenece a una tarea que no se va a realizar
- Son los cambios de una opción rechazada entre varias alternativas