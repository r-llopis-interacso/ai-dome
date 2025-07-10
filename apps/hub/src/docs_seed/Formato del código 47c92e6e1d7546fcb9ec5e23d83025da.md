# Formato del código

<aside>
💡 Usar las reglas recomendadas ayuda a conseguir un formato de código unificado y por lo tanto una base de código homogénea, reduciendo la cantidad de cambios de formato innecesarios y mejorando su legibilidad

</aside>

<aside>
👉 Usar **Prettier** con la configuración de las reglas recomendadas

</aside>

# Código con el formato correcto

Todos los ficheros deben seguir las reglas definidas para el formato de código, en consecuencia, los que incluyan cualquier incumplimiento de esas reglas no podrán considerarse correctos.

# Reglas recomendadas

Cada proyecto puede definir sus reglas teniendo en cuenta sus necesidades, pero con el objetivo de mantener un formato cohesionado en todos los proyectos, la configuración recomendada es la siguiente:

- No usar puntos y comas al final de las instrucciones
- Usar todas las comas finales en las estructuras que ocupen varias líneas
- Usar comillas simples excepto dónde las dobles tengan significado (JSON, HTML, JSX, etc.)

# Herramientas

Dado la complejidad que supone definir y seguir todas las reglas posibles que se pueden aplicar para dar formato al código, usamos la herramienta [Prettier](https://prettier.io) para verificar su cumplimiento y aplicarlas de forma automática.

# Editores de código

La mayoría de editores tienen soporte para integrar Prettier mediante extensiones, con lo cual en esos casos podemos además de verificar que el código sea correcto, escribirlo más rápidamente de forma auto automática.

## Editores con soporte

Es extremadamente recomendable utilizar un editor que tenga integración con Prettier. Las opciones más habituales no excluyentes suelen ser:

- Aplique automáticamente las reglas al guardar cada fichero
- Usar un atajo de teclado para aplicar las reglas bajo demanda

## Editores sin soporte

Usar un editor sin soporte para Prettier no exime de seguir las reglas del formato de código establecido, por lo que será responsabilidad de la persona aplicarlas manualmente o ejecutar sus comandos de forma externa.

Prettier se puede usar desde la [línea de comandos](https://prettier.io/docs/en/cli.html) para verificar o validar ficheros o carpetas:

```docker
prettier --write .
```

# Fichero de configuración

Prettier leer automáticamente los ficheros `.editorconfig` para adaptarse a las reglas que tenga definidas. Sin embargo algunas reglas está fuera del alcance de EditorConfig y sólo se pueden indicar en la configuración específica de Prettier.

Existen distintas opciones para definir las reglas para Prettier, ya sea en algún [fichero de configuración](https://prettier.io/docs/en/configuration.html) propio o directamente en los `package.json` de los repositorios:

```json
{
    "prettier": {
        "semi": false,
				"singleQuote": true,
        "trailingComma": "all"
    }
}
```

# Verificación automática

Todos los repositorios deberían incluir la [verificación de reglas automática](Verificacio%CC%81n%20de%20reglas%2036132afc0ccf4a2384654e3f948cbb92.md) para el formato del código usando Prettier.