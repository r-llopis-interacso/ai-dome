# Revisión de código

<aside>
💡 Revisar los cambios de una rama antes de mezclarla sirve para detectar problemas, inconsistencias u otros detalles que pueden ayudar a mejorar considerablemente la calidad del código

</aside>

<aside>
👉 Todos los revisores son responsables la revisión técnica del código en los PRs

</aside>

# Responsabilidad

La revisión de PRs es responsabilidad de todos revisores, no sólo de los responsables técnicos de las partes modificadas. Revisar un PR debe ser considerado como una tarea más y por lo tanto hay que reservarse tiempo de calidad para la revisión de PRs.

En Harvest deberíamos tener una categoría de trabajo para indicar el tiempo dedicado en las revisiones de código (si no es así, debemos pedirla a los gestores del proyecto), de forma que sea posible analizar cuanto tiempo se está invirtiendo ello.

# Límite de tiempo

Para que los PRs no se queden esperando la revisión demasiado tiempo y poder priorizar mejor su revisión, es recomendable definir un límite de tiempo para revisarlos (por ejemplo en días) según la metodología de trabajo del proyecto.

Ese límite de tiempo no debería implicar necesariamente que una vez superado se puedan mezclar los PRs libremente. El objetivo sería que los revisores puedan organizar mejor las revisiones y priorizar los PRs que estén más cerca del límite o lo hayan sobrepasado.

# Alcance de la revisión

El principal objetivo de los PRs es revisar el código a nivel técnico sin entrar necesariamente en la funcionalidad de los cambios. De esa forma, los revisores no tienen la necesidad de conocer los detalles funcionales o probar los cambios.

Eso no quiere decir que si un revisor conoce la funcionalidad que se pretenda añadir, no aproveche ese conocimiento para detectar o intuir problemas potenciales a nivel funcional. En esos casos, los PRs también se pueden aprovechar para reportar esos problemas y evitar que lleguen a la fase de validación.

# Comentarios

Los revisores deberán usar los comentarios para dar feedback durante su revisión del código. Éste puede ser de cualquier tipo, como por ejemplo:

- Reportar errores
- Reportar potenciales problemas
- Indicar inconsistencias en el estilo
- Realizar sugerencias o recomendaciones
- Preguntar dudas
- Reconocer partes significativas

# Solicitud de cambios

Cuando un revisor detecte problemas o cualquier otro motivo de cambio, además de incluir los correspondientes comentarios, deberá solicitar esos cambios como tareas dentro del PR usando la esa característica en Bitbucket.

De esa forma el autor del PR podrá marcar los cambios que haya actualizado o eliminar los que se consideres innecesarios.