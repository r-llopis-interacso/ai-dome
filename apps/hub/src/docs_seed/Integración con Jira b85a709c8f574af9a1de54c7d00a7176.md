# Integración con Jira

<aside>
💡 La integración con Jira permite relacionar de forma directa el código con tareas concretas y ampliar el contexto de los cambios

</aside>

<aside>
👉 Usar códigos de tareas de Jira en los commits y ramas

</aside>

# Códigos de Jira en Git

Los nombres de ramas y los mensajes de commits deberían llevar el código de Jira de la tarjetas con las que estén vinculadas. De esa forma los cambios en el código en Bitbucket serán relacionados automáticamente con las tarjetas en Jira y viceversa, permitiendo navegar entre ambos servicios de forma cómoda y rápida.

# Nombres de las ramas

Para los nombres de las ramas, usaremos los prefijos mencionados en la [organización de las ramas](development/git/branches.md) junto con los códigos de Jira:

```
[Prefijo]/[Código de Jira][Sufijo opcional]
```

El sufijo opcional se puede usar para dar más contexto a la rama o para trabajar varias al mismo tiempo relacionadas con la misma tarjeta de Jira.

## Ejemplos para nombres de ramas

Suponiendo un código de proyecto `PROJ`:

```
epic/PROJ-1
epic/PROJ-2
feature/PROJ-3
feature/PROJ-3-alternative
feature/PROJ-4
bugfix/PROJ-32
hotfix/PROJ-64
```

# Mensajes para los commit

Para los commits, seguiremos los el formato mencionado en [mensajes para los commits](Mensajes%20para%20los%20commits%20f8db559ca576456ebcdf55e72a3f7e60.md) usando  los códigos de Jira como prefijos en el resumen del mensaje: 

```
[Código de Jira]: [Resumen de mensaje]

...
```

Lo más importante es no olvidar incluir el código en los mensajes de los commits definitivos que van a mezclar en las ramas principales

## Ejemplos para mensajes de commits

Suponiendo un código de proyecto `PROJ`:

```
PROJ-9: Añadir vista para tablero principal
PROJ-8: Añadir menu de navegación
PROJ-7: Crear estructura inicial para las vistas
PROJ-6: Crear comando para sincronizar usuarios
PROJ-5: Crear comando para añadir datos iniciales
PROJ-4: Definir estructuras de datos comunes
PROJ-3: Montar arquitectura inicial
```

## Códigos de otras tareas

Sólo deberíamos usar los códigos de Jira de las tarjetas relacionadas con los cambios del commit, para evitar que éstos queden conectados con tarjetas con las que no tengan relación.

Hay que prestar especial atención tras sincronizar los cambios de las ramas principales, dado que es probable que mezclemos referencias de commits con otros códigos de Jira.

# Resumen de Jira

Cuando el proyecto está bien organizado en Jira, resulta conveniente usar los títulos de las tarjetas como resumen en los mensajes de commits que incluyan todos los cambios necesarios para completarlas.

# Tareas sin JIRA

En caso de ponerse a trabajar en alguna tarea que no tenga tarjeta en Jira, es recomendable crear una nueva en el proyecto. De esa forma dispondremos de un código para relacionar los cambios y será más fácil hacer seguimiento del trabajo realizado.