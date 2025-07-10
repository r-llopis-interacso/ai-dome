# Revisores de pull requests

<aside>
💡 Un equilibro entre la cantidad de revisores ayudará a que tengamos suficiente feedback y que no haya demasiada carga de trabajo en las revisiones

</aside>

<aside>
👉 Añadir tres revisores a los PRs de los cuales idealmente uno sea responsable

</aside>

# Añadir revisores

En momento de añadir revisores a un PR es necesario seguir las siguientes pautas:

- Sólo se deberían añadir revisores cuando esté listo para ser revisando
- Si existe, incluir como revisor al menos a un responsables técnico de las partes que se quieran modificar
- Incluir revisores adicionales (sin contar los responsables)
- No incluir más de tres revisores salvo que sean cambios transversales, críticos o que requieran una revisión más amplia
- En equipos suficientemente grandes se deberían intercalar los revisores para que todos tengan una cantidad similar de PRs sin tener que estar en todos

## Responsables

Si se tienen dudas sobre los quien es el responsable técnico de cada parte, éstos deberían estar documentados en el `readme.md` de cada repositorio o en fichero `CODEOWNERS` si el proyecto tiene muchos responsables.

# Rechazar la revisión

Si un revisor considera que ha sido añadido por error, no va a tener tiempo u otro motivo justificado por el cual no va a poder revisar el PR debería rechazar la revisión del mismo.

Para ello se suficiente con quitarse como revisor del PR y añadir un comentario indicando el motivo para rechazar la revisión.