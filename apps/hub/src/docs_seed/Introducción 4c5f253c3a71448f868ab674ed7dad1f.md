# Introducción

# ¿Qué es NestJS?

[NestJS](https://docs.nestjs.com/) es uno de los frameworks más populares en lo que a creación de servidores se refiere. Su gran versatilidad, facilidad de configuración y funcionalidades lo posicionan como una de las opciones más interesantes en el mercado actual, tanto para la creación de API REST, de las más básicas a las más complejas, como para otro tipo de servidores como pueden ser los microservicios gracias a su estructura y organización modular.

# ¿Qué lenguaje emplea?

Podemos emplear el framework mediante `JavaScript` puro, aunque su lenguaje por defecto es `TypeScript`, con el que muestra una alta compatibilidad. Esta elección nos facilitará la mantenibilidad y tipado de nuestro código,  desarrollando proyectos modernos y actuales.

# ORMs y bases de datos

Como la mayoría de los frameworks actuales en el lado backend, `NestJS` ofrece compatibilidad con alguno de los ORMs más empleados y modernos de la actualidad, entre los que se encuentra [Prisma](https://www.prisma.io/). Su configuración es bastante simple, siguiendo el siguiente [tutorial](https://docs.nestjs.com/recipes/prisma) que podemos encontrar en la página oficial del framework.

# Instalación y puesta a punto

Una de las utilidades más llamativas de este framework es su facilidad de configuración, donde a través de la siguiente secuencia de comandos arrancará un CLI que nos ayudará a configurar el proyecto a nuestro gusto, incluyendo aspectos tan importantes pero poco destacados normalmente como el formateo del código mediante `ESLint` y `Prettier`:

```bash
npm i -g @nestjs/cli
nest new project-name
```

Podemos ver más en la siguiente [página](https://docs.nestjs.com/first-steps) de su web. Así, podremos elegir el *package manager* (`npm`, `yarn` o `pnpm`) que deseamos emplear, para que posteriormente se cargue la plantilla y se instalen los paquetes oportunos.

# Estructura de carpetas

`NestJS` promueve una estructuración modular de carpetas, pero es un framework tan versátil que podremos adaptarlo a cualquier tipo de organización que mejor se ajuste a nuestros objetivos del proyecto y cultura empresarial.

# Puntos clave a destacar

`NestJS` se sitúa como uno de los frameworks más interesantes en la actualidad por muchas razones, entre las que se encuentran:

- **Facilidad de configuración:** mediante un simple comando, se construye una plantilla que nos permite empezar a crear nuestro proyecto backend, cuidando detalles tan importantes como el formateo de código o la configuración de `TypeScript` .
- **Flexibilidad y escalabilidad:** gracias a su gran cantidad de funcionalidades y facilidad de organización, nos permite crear desde los proyectos más simples hasta los más complejos, pasando por diferentes tipos como los mencionados microservicios o API REST.
- **Integración con librerías modernas:** cuenta con una gran compatibilidad con algunas de las librerías más modernas y conocidas, como el mencionado ORM `Prisma` para la comunicación con bases de datos, `passport` para la autenticación de usuarios, `swagger` para la documentación de la API o la posibilidad de utilizar `websockets` o `GraphQL`. Además, facilita mucho su configuración. Toda esta información la podremos revisar más en detalle en su [documentación](https://docs.nestjs.com/) oficial.
- **Empleo de IoC:** el patrón de diseño [IoC](https://en.wikipedia.org/wiki/Inversion_of_control) (inversión de control) es muy utilizado en la actualidad para ofrecer una mayor escalabilidad y mantenibilidad a los proyectos construidos con `TypeScript`, delegando la creación e inyección de dependencias en un contenedor de mismo nombre. `NestJS` nos permite [utilizar este patrón](https://docs.nestjs.com/fundamentals/custom-providers) de una manera muy sencilla a través de decoradores o mediante el constructor de las clases.