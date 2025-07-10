# Verificación de reglas

<aside>
💡 Las reglas que se establezcan en los proyectos sólo tienen utilidad si se implantan y se hace un seguimiento de su aplicación

</aside>

<aside>
👉

</aside>

# Aplicación

Las reglas de formato, estilo o estructura deberían aplicarse de forma estricta por todos los  desarrolladores del equipo, dado que es imposible que se implanten si algunos de ellos no las siguen.

# Automatización

Las reglas para las que se puedan verificar su aplicación de forma automática deberían validarse en algún punto del flujo de trabajo. Normalmente antes de guardar los cambios o de subir al repositorio de Git.

Para ello lo normal sería incluir algún hook de Git, por ejemplo el `pre-commit` o el `pre-push`.

# Herramientas

La herramienta que solemos usar para automatizar las verificaciones es [husky](https://typicode.github.io/husky) que permite instalar y configurar los hooks de forma muy sencilla.

Adicionalmente, se pueden usar herramientas como [lint-staged](https://github.com/okonet/lint-staged) para optimizar la verificación en sólo los ficheros modificados. Aunque hay que tener en cuenta que algunas verificaciones requieren validar todos los ficheros del repositorio.

# Configuración

La lista de verificaciones puede variar entre proyectos o repositorios, pero las verificaciones mínimas más habituales son las siguientes:

- Verificar el formato del código con `prettier --check` o similar
- Verificar el estilo del código `eslint`, `next lint` o similar
- Verificar la estructura la nomenclatura de carpetas y ficheros algún plugin para eslint

<aside>
👉

Añadir verificaciones automáticas de las reglas en los flujos de trabajo

</aside>