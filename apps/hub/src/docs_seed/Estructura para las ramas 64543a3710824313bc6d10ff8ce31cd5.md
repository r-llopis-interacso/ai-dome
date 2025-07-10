# Estructura para las ramas

<aside>
💡 Tener unas ramas organizadas y con significado nos permite saber en todo momento el estado del proyecto, que personas están trabajando y reducir el riesgo de perder cambios

</aside>

<aside>
👉 Usar ramas siguiendo un flujo de trabajo similar a GitFlow

</aside>

# Ramas principales o permanentes

Las ramas principales son las que perviven durante gran parte de la vida del proyecto.

Los repositorios normalmente empiezan con una sola rama principal hasta que se publica la primera versión, tras lo cual deberían tener al menos dos ramas principales:

- Rama principal con la última versión **estable** publicada en producción: `master`, `main`, etc.
- Rama principal con la siguiente versión en **desarrollo** para publicar: `develop`, `dev`, etc.

Ambas ramas deben están especificas en la configuración de Bitbucket para que no de lugar a dudas su finalidad.

Es muy importante separar el código de producción del que está en desarrollo, ya que si surge algún error crítico en producción, debe ser posible corregirlo de forma asilada para publicar una nueva versión con esa corrección en el menor tiempo posible.

En caso de que un proyecto necesite más de dos ramas principales, su existencia de estar explicada en la documentación del repositorio.

# Ramas secundarias o temporales

Las ramas secundarias son las que tienen una duración limitada, dado que tras cumplir su función se eliminan del repositorio.

## Ramas de trabajo

Las ramas de trabajo se usan para aplicar los cambios necesarios durante el trabajo en una tarea concreta. Normalmente en éste tipo de ramas trabaja una sola persona al mismo tiempo, salvo que se haga pair programming.

En ésta ramas, usamos los prefijos típicos de [GitFlow](https://www.atlassian.com/es/git/tutorials/comparing-workflows/gitflow-workflow) en sus nombres, es decir:

- Usar el prefijo `feature/` para añadir mejoras o modificar funcionalidad
- Usar el prefijo `bugfix/` para corregir nuevas incidencias o relacionadas con tareas completadas y publicadas
- Usar el prefijo `hotfix/` para corregir incidencias críticas o que requieran una solución urgente en producción

Las ramas de trabajo se deben crear desde la rama que corresponda, que normalmente será la rama principal de desarrollo o la principal estable en caso de tratarse de una incidencia crítica en producción.

Una vez mezclados los cambios en la rama principal que corresponda, las ramas de trabajo deben ser borradas.

## Ramas para épicas

Si varias tareas están tan relacionadas o tienen dependencias como para necesitar ser incluidas en bloque, lo recomendable es crear otra rama secundaria para juntarlas y probarlas en conjunto sin afectar a la rama principal.

Para estar ramas deberían crearse a partir de la rama de desarrollo `develop` y es recomendable usar en su nombre el prefijo `epic/`.

Del mismo modo que las ramas de trabajo, una vez se fusionan los cambios en la rama principal correspondiente, las ramas para épicas deben ser borradas.

# Códigos de Jira

Tal como se indica en [Integración con Jira](development/git/jira), hay que usar el código de Jira en los nombres de las ramas para los cambios de las tarjetas vinculadas.