# Formato de los ficheros

<aside>
💡 Usar las reglas recomendadas ayuda a conseguir un formato unificado y por lo tanto una base de código homogénea, reduciendo la cantidad de cambios de formato innecesarios

</aside>

<aside>
👉 Usar **EditorConfig** con la configuración de las reglas recomendadas

</aside>

# Ficheros con el formato correcto

Todos los ficheros deben seguir el formato según las reglas definidas para el proyecto, por lo tanto los ficheros que incluyan cualquier incumplimiento de las reglas no podrán considerarse correctos.

# Reglas recomendadas

Cada proyecto puede definir sus reglas teniendo en cuenta sus necesidades, pero con el objetivo de mantener un formato cohesionado en todos los proyectos, la configuración recomendada es la siguiente:

- Codificación de los ficheros en UTF-8
- Saltos de línea tipo UNIX (LF)
- Insertar un salto de línea al final del fichero
- Indentar usando tabs
- Tamaño de los tabs a cuatro espacios
- Comillas simples para cadenas de texto o rutas a ficheros

# Herramientas

Para facilitar la configuración y aplicación de las reglas, usamos la herramienta [EditorConfig](https://editorconfig.org/) que nos permite definir las opciones del formato que deben seguir los ficheros en un repositorio según su extensión.

# Editores de código

La mayoría de editores tienen soporte de forma nativa o mediante extensiones para EditorConfig, con lo cual en esos casos la configuración se debería aplicar de forma automática al trabajar en el proyecto.

## Editores con soporte

Para no tener que estar configurando manualmente el editor, es muy recomendable usar un [editor compatible](https://editorconfig.org/#pre-installed) con EditorConfig o que tenga [soporte vía plugin](https://editorconfig.org/#download).

## Editores sin soporte

Usar un editor sin soporte para EditorConfig no exime de seguir las reglas del formato establecido, por lo que será responsabilidad de la persona configurarlo o aplicarlo manualmente cuando trabaje en el proyecto.

# Fichero de configuración

Para facilitar la aplicación de la configuración del repositorio en los editores basta con añadir el fichero `.editorconfig` en la raíz de los repositorios:

```
root = true

[*]
indent_style = tab
indent_size = 4
tab_width = 4
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[*.js,*.jsx,*.ts,*.tsx]
quote_type = single
```