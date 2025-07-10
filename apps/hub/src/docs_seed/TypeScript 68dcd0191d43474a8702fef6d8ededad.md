# TypeScript

<aside>
💡 Trabajar con configuraciones estrictas maximiza la calidad del código y mejora la detección temprana de errores

</aside>

<aside>
👉 Aprovechar toda la potencia de TypeScript

</aside>

# Versión estable

Como parte de una política general para usar sólo versiones estables en todas las tecnologías que sea posible, para el caso de TypeScript se aplica la misma estrategia.

Con lo cual los proyectos, deberían arrancarse con la última versión estable de TypeScript, salvo que tengan algún requisito que lo impida.

# Configuración estricta

Al trabajar con TypeScript, es importante seguir una configuración estricta para aprovechar toda la potencia del lenguaje y aumentar la calidad del código. Para lo cual activamos las siguientes opciones en el fichero de configuración `tsconfig.json`:

- La opción `strict` activa la mayoría de reglas de comprobación de tipos
- La opción `noImplicitAny` obliga a especificar un tipo explícito para cualquier variable o parámetro de función cuyo tipo no se pueda deducir automáticamente
- La opción `strictNullChecks`  detecta posibles errores en el manejo de valores nulos o indefinidos en el código
- La opción `forceConsistentCasingInFileNames` obliga a usar los nombre de ficheros exactos teniendo en cuenta las mayúsculas o minúsculas

# Inferencia de tipos

TypeScript dispone de un sistema muy potente que le permite inferir los tipos automáticamente. Intentamos sacar el mayor partido de esta característica, evitando la anotación de tipos redundantes y consiguiendo que el código sea más claro.

Por ese motivo, sólo es obligatorio anotar los tipos que sean estrictamente necesarios. También podemos anotar tipos que pese a no ser necesarios, ayuden a que el código sea más fácil de entender.

# Declaración de tipos

Mientras intentamos mantener una equilibrio entre la inferencia y explicitud, debemos evitar abusar de la duplicación de tipos o las declaraciones de tipos complejos en línea.

En su lugar, es recomendable declarar los tipos a parte usando nombres obvios y concisos, usando interfaces o definiciones de tipos.

Además, en cada módulo solemos extraer las declaraciones de tipos a ficheros independientes llamados `types.ts` y para declaración extensa de muchos tipos compartidos usamos ficheros más con nombres semánticos. También podemos usar una carpeta `types` para agrupan grandes cantidades de tipos relacionados.