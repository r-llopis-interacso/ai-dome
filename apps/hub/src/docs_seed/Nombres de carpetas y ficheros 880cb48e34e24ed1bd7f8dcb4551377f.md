# Nombres de carpetas y ficheros

<aside>
💡 Mantener una nomenclatura clara y coherente para las carpetas y ficheros ayudará a entender y organizar mejor el código, además de evitar conflictos y facilitar la definición de esos nombres

</aside>

<aside>
👉 Usar el estilo de nomenclatura **kebab-case**

</aside>

# Minúsculas y guiones medios

Con el fin de mantener una nomenclatura de ficheros coherente, además de evitar confusiones o conflictos con sistemas operativos de diferencian entre mayúsculas y minúsculas, todos los nombres de carpetas y ficheros deberán seguir el estilo de nomenclatura `kebab-case`:

- Todos los caracteres en minúsculas: `components`, `button`, `index.ts`, etc.
- Separar palabras o claves con guiones medios: `form-fields`, `use-cart.ts`, etc.
- Separar sub-tipos con sufijos usando puntos: `styles.module.css`, etc.

# Nombres descriptivos

Los nombres deberían ser lo suficientemente descriptivos sin que sean demasiado largos para dificultar la navegación por el directorio del repositorio. Eso es particularmente aplicable a las carpetas, ya que en el caso de ficheros usaremos varios patrones comunes para nombrarlos según su tipo de contenido.

## Abreviaturas limitadas

Deberíamos intentar limitar las abreviaturas que usamos y las que usemos que sean por necesidad o por convención fuertemente arraigada históricamente.

## Directorio como contexto

A la hora de poner nombres, podemos apoyarnos en la posición que ocupa el recurso en el directorio del repositorio para dar más contexto y poder simplificar su nombre sin tener que recurrir a repetir prefijos o sufijos.

Por ejemplo un módulo llamado `header-component` se podría llamar simplemente `header` si estuviera dentro de una carpeta `components`.

# Plurales y singulares coherentes

Deberíamos intentar los plurales y singulares de forma consistente, especialmente en los nombres de las carpetas. De esa forma, además de tener una estructura de carpetas más coherente, evitaremos la típica duda si una carpeta estaba en plural o singular.

Por lo general, en el primer nivel de organización por tipologías, las carpetas deberían tener un nombre en plural para reforzar la idea de que contienen múltiples recursos de ese tipo: `images`, `components`, etc.

Por otro lado, en el segundo nivel de organización por categorías, las carpetas pueden tener nombres en plural o singular según ayuda a reforzar el la función o la utilidad de su contenido que representan.