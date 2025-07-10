# Publicación por versiones

<aside>
💡 Usar versionado en los proyectos nos permite tener un histórico de los cambios que facilita entre otras cosas su consulta, referencia o reversión, además de permitir la integración efectiva con múltiples desarrollos

</aside>

<aside>
👉 Versionar las publicaciones usando versionado semántico

</aside>

# Versionado semántico

Por lo general usamos como convención el versionado semántico ([semver.org](http://semver.org/)) en la publicación de las distintas versiones de nuestros desarrollos. Es decir que usamos una numeración compuesta por tres números separados por puntos en el que cada uno de ellos indica un grado de cambios (`MAJOR.MENOR.PARCHE`):

- El número mayor (`MAJOR`) se incrementa cuando se realizan cambios grandes que afectan a la casi totalidad de la aplicación o que hacen incompatible el API
- El número menor (`MENOR`) se incrementa cuando se añaden nuevas funcionalidades
- El número de parche (`PARCHE`) se incrementa cuando se corrigen errores

# Primera versión

No es necesario aplicar ninguna pauta de versionado durante el desarrollo inicial de los proyectos hasta que surge la necesidad de publicar la primera versión.

Para proyectos con hitos intermedios antes de la publicación de la primera versión final, solemos usar la convención de la versión 0 para versionar esas entregas no finales, por ejemplo: `0.8.3`

# Rama para la versión candidata

En proyectos con equipo y flujo de calidad es necesario usar ramas temporales para estabilizar las versiones candidatas antes de su publicación. Para éste tipo de ramas, seguimos la convención de GitFlow, por ejemplo: `release/1.2.3`

En otros proyectos más pequeños sin equipo de calidad, se puede valorar usar éstas tipo ramas si se considera que aportan beneficios durante el desarrollo.

# Pruebas sobre la versión candidata

El uso de ramas para versionas candidatas nos permite aislar el código de la versión a publicar, de forma que mientras el equipo de calidad la valida, el equipo de desarrollo puede seguir trabajando en la siguiente versión.

Los errores detectados en la versión candidata se podrán corregir usando esas ramas como rama principal temporal hasta la publicación de la misma.

# Cierre de versión

Una vez validada la calidad de la versión candidata, su rama será mezclada en la [rama estable principal](Estructura%20para%20las%20ramas%2064543a3710824313bc6d10ff8ce31cd5.md), para ésta mezcla **no seguimos** la [estrategia de fusión de ramas](Estrategia%20al%20fusionar%20ramas%20d6aa5b246d2d4cd78bf128fff3f513ce.md) general para no perder detalle en el histórico de cambios de cada versión.

Por otro lado una vez realizada la fusión en la rama principal, la rama temporal de la versión candidata será eliminada.

Finalmente etiquetaremos la versión en el historial de Git e incluiremos las etiquetas al subir los cambios al repositorio, por ejemplo:

```bash
git tag 1.2.3
git push origin master --tags
```