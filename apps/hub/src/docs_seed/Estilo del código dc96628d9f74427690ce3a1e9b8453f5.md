# Estilo del código

<aside>
💡 Usar las reglas recomendadas ayuda a conseguir un estilo de código unificado y por lo tanto una base de código homogénea, reduciendo la cantidad de cambios de formato innecesarios y mejorando su legibilidad del mismo

</aside>

<aside>
👉 Usar **ESLint** y **Stylelint** con la configuración de las reglas recomendadas

</aside>

# Código con el estilo correcto

Todos los ficheros deben seguir las reglas definidas para el estilo de código, en consecuencia, los que incluyan cualquier incumplimiento de esas reglas no podrán considerarse correctos.

# Reglas recomendadas

Cada proyecto puede definir sus reglas teniendo en cuenta sus necesidades, pero con el objetivo de mantener un estilo cohesionado en todos los proyectos, se insta a usar las colecciones de reglas recomendadas según el tipo de proyecto en combinación con otras más estrictas para aumentar la uniformidad del código:

- [Reglas recomendadas por ESLint](https://eslint.org/docs/latest/rules/)
- [Reglas para mejorar compatibilidad con Prettier](https://github.com/prettier/eslint-plugin-prettier)
- [Reglas para TypeScript](https://typescript-eslint.io/rules/)
- [Reglas para la importación de módulos](https://github.com/import-js/eslint-plugin-import)
- [Reglas para React](https://github.com/jsx-eslint/eslint-plugin-react)
- [Reglas para seguir las normas de los hooks en React](https://legacy.reactjs.org/docs/hooks-rules.html)
- [Reglas para mejorar la accesibilidad en React](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)
- [Reglas para mejorar la calidad de la experiencia de usuario](https://web.dev/vitals/)
- [Reglas recomendadas por Next](https://nextjs.org/docs/basic-features/eslint#eslint-plugin)
- [Reglas adicionales recomendadas de Unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)

# Herramientas

Dado la complejidad que supone definir y seguir todas las reglas posibles que se pueden aplicar para dar estilo al código, usamos las herramientas [ESLint](https://eslint.org) y [Stylelint](https://stylelint.io) para verificar su cumplimiento y en algunos casos aplicarlas automáticamente.

Pese a usar TypeScipt, no usamos la herramienta [TSLint](https://palantir.github.io/tslint/) dado que lleva obsoleta desde 2019 en favor a [extensiones para ESLint](https://typescript-eslint.io).

# Editores de código

Es extremadamente recomendable utilizar un editor que tenga integración con esas herramientas y su omisión no exime de seguir las reglas de estilo establecidas.

# Grado de cumplimiento

La violación de algunas reglas indican distinto grado de advertencias o errores. No hacemos distinciones entre advertencias o errores, por lo que el incumplimiento de cualquier reglas definida independientemente de su grado no podrá considerarse código correcto.

Dada la gran cantidad de colecciones de reglas que nos gustaría aplicar, es posible que algunas reglas concretas entre en conflicto entre si mismas o con el tipo del proyecto. En esos casos podemos desactivar algunas de ellas en el usando el atributo `rules` en la configuración de `eslint`.

# Fichero de configuración

Dada la gran cantidad de colecciones de reglas que nos gustaría aplicar, se quiere buscar una configuración estándar que se pueda aplicar fácilmente a nuevos proyectos. Se ha montado un [grupo de trabajo](https://www.notion.so/028587c06fe74fb38ee914dff7816d0c?pvs=21) con ese objetivo.