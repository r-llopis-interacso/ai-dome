# Configuración de Git

<aside>
💡 Identificar fácilmente a los autores de los cambios en Git facilita la interpretación del historial de cambios, la consulta de dudas y la integración con otros servicios

</aside>

<aside>
👉

Firmar los cambios en Git con el nombre completo y el email corporativo

</aside>

# Configuración del autor

Todos los commits realizados en repositorios de proyectos de Interacso deben ir firmados con los siguientes datos:

- El nombre completo
- El email corporativo (@interacso.com)

Lo más sencillo es incluir esos parámetros en la configuración global de Git, por ejemplo ejecutando los siguientes comandos:

```bash
git config --global user.name [Nombre completo]
git config --global user.email [Email corporativo]
```

Si necesitamos tener unos datos distintos en otros proyectos, podemos configurarlos a nivel de repositorio usando los mismos comandos anteriores sin la opción `--global`.

Es posible que en algunos casos se usen emails específicos para esos proyectos, en esos casos en lugar de firmar con el email de Interacso, firmaríamos con el del proyecto.

# Ficheros ignorados

Los ficheros ignorados el del `.gitignore` de cada repositorio deberían ser sólo los necesarios para ese repositorio.

El resto de ficheros a ignorar cómo los generados automáticamente por el sistema operativo, de configuración de un editor concreto o cualquier otro específico del entorno de trabajo de cada persona, deben ser ignorados en el fichero global de Git personal.

Para saber la ubicación del ese fichero se puede usar el siguiente comando:

```bash
git config --global core.excludesfile
```

## Ejemplo de configuración para ficheros ignorados

Ejemplo de posible `.gitgnore` global:

```
# OS files
.AppleDouble
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
desktop.ini

# Temporary files
*.bak
*.swp
*.swo
*~
*#

# Editor files
.vscode
.idea
.iml
.tm_properties
*.sublime-project
*.sublime-workspace
```

# Plantillas para mensajes de commits

Para poder usar las plantillas para mensajes de commits, debemos configurarlas en cada copia local de los repositorios o de forma global, obviamente es más recomendable esto último:

```
git config --global commit.template .gitmessage
```

De esa forma lo configuramos una vez y podemos olvidarnos, salvo que un proyecto tenga una plantilla diferente, la se podrá configurar individualmente reemplazando la configuración global.