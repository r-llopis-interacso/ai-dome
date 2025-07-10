# Organización de repositorios

<aside>
💡 Usando un sólo repositorio para los proyectos simplificamos las dependencias internas, mejoramos la visibilidad de todo el código, la incorporación al proyecto y hacemos que sea más sencillo de mantener

</aside>

<aside>
👉 Usar monorepos y configuralo para limitar usos incorrectos

</aside>

# Un repositorio por proyecto

La forma habitual que usamos para organizar el código de los proyectos es tener todo el código de sus distintos frontales, servicios o librerías en un mismo repositorio o *monorepo*.

Para ello no apoyamos en el soporte para [espacios de trabajo](https://docs.npmjs.com/cli/v9/using-npm/workspaces?v=true) de npm. Esta caraterística permite temer múltiples paquetes en distintas carpetas con sus propios `package.json` y gestionarlos al mismo tiempo desde la raíz del proyecto.

Para ello basta con configurar la propiedad `workspaces` con un paquete que unifica el resto:

```json
{
		"workspaces": [
				"packages/library",
				"packages/backend",
				"packages/frontend"
		]
}
```

Además permite configurar dependencias compartidas o ejecutar comandos en los distintos paquetes del proyecto.

# Varios repositorios por proyecto

Pese a que hemos migrado a una organización del código estilo *monorepo***,** todavía tenemos muchos proyectos que usan varios repositorios. En esos casos lo más habitual es que tengan el mismo sobre y se diferencien por el sufijo:

- Un repositorio para el frontal, normalmente con el sufijo `-app` o `-frontend`
- Un repositorio para el servicio principal, normalmente con el sufijo `-api` o `-backend`
- Un repositorio para cada servicio adicional

# Configuración en Bitbucket

- Sólo dar permisos de administración a los responsables del proyecto
- Incluir las claves de los servidores para sólo lectura (access keys)
- Configurar las ramas principales de producción y desarrollo
- Configurar el modelo de ramas tipo GitFlow
- Configurar la estrategia de merge en `squash`
- Configurar los revisores por defecto
- Configurar los permisos en las ramas
    - Solo permitir hacer push en la rama master a los responsables del proyecto
    - Solo permitir hacer push en la rama develop a los responsables del proyecto
    - Sólo permitir mezclar ramas en develop vía PR para todos los desarrolladores
- Activar opción de para rechazar commits sin un código de Jira