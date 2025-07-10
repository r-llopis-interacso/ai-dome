# Tailwind CSS

<aside>
💡 La librería Tailwind CSS nos permite aplicar estilos de forma más productiva e implementar sistemas de diseño de forma sencilla y robusta

</aside>

<aside>
👉 Usar hojas de estilo y seguir los sistema de diseño

</aside>

# Hojas de estilo

En lugar del [método oficial recomendado](https://tailwindcss.com/docs/reusing-styles) que propone usar las clases de utilidad directamente en línea junto con los elementos:

```html
<div class="py-8 px-8 bg-white rounded-xl shadow-lg"></div>
```

Usamos [clases con nombre descriptivo y breve](Clases%20CSS%20faea16965c45479d9f4f78bf26a6ecb6.md), suyos estilos son aplicados de forma externa en hoja de estilo mediante la directiva `@apply`:

```html
<div class="card"></div>
```

```css
.card {
		@apply py-8 px-8 bg-white rounded-xl shadow-lg
}
```

## Ventajas

Esta aproximación pese que pueda resultar en más trabajo a la hora de tener que estar pensando en nombre de clases o cambiando de ficheros, consideramos que tiene una serie de ventajas desequilibran la balanza su favor:

- Creamos una separación clara de la estructura de los componentes y su aspecto concreto
- Facilitamos la reutilización de código para componentes con la misma estructura o similar
- Añadimos la posibilidad de aplicar múltiples hojas de estilo a un mismo componente
- Añadimos la posibilidad de modificar el estilo de elementos concretos de forma externa
- Abstraemos a los componentes de aplicar los estilos directamente ocultando su complejidad
- Mejoramos considerablemente la legibilidad de los componentes al liberarlos de los estilos
- Aportamos más contexto sobre los elementos al asignarles un nombre
- Reforzamos la reflexión sobre la estructura al tener que darle nombre a sus elementos
- Documentamos los elementos de forma natural
- Ayudamos a navegar por el árbol de DOM para detectar elementos
- Reducimos la duplicación es estilos

## Excepciones

La aplicación de ésta estrategia también puede ser llevada demasiado lejos. Podemos encontrarnos en una situación en la que las ventajas antes mencionadas no tienen suficiente peso, actualmente tenemos detectados los siguientes casos excepcionales en los que quizás sea interesante seguir otra estrategia:

- En componentes con variantes complejas, estamos empezando a usar [CVA](http://cva.style)
- En componentes poco visuales muy pequeños con uno o apenas elementos
- En experimentos o pruebas de concepto dónde prima la velocidad sobre la calidad

# Sistemas de diseño

Todos los detalles del sistema de diseño que puedan se deben configurar en Tailwind, por ejemplo: colores, fuentes, espaciados…

Debemos trabajar con el equipo de diseño para que definan todo éstos detalles de forma explícita en lugar que el equipo técnico los tenga que inferir del diseño.

## Extender la configuración

Salvo que el sistema de diseño esté extremadamente definido, en lugar de reemplazar la configuración por defecto de Tailwind:

```css
module.exports = {
		theme: {
				colors: {
						primary: '#1fb6ff',
						secondary: '#7e5bef',
				}
		}
}
```

Se recomienda **extender** la configuración por defecto de Tailwind:

```css
module.exports = {
		theme: {
				extend: {
						colors: {
								primary: '#1fb6ff',
								secondary: '#7e5bef',
						}
				},
		}
}
```

## Evitar excepciones

Al implementar los detalles de los diseños, debemos evitar las excepciones al sistema de diseño. Si detectamos una excepción, primero habría que analizarla y proceder según el caso:

- Si está contemplado en el sistema pero no está previsto o está mal configurado en Tailwind, debemos ampliar o corregir la configuración
- Si no está contemplado en el sistema, debemos hablar con el equipo de diseño para que en caso de ser un error lo corrijan

Puede ocurrir que en lugar de un error, sea una excepción contemplada por el equipo de diseño. En esos casos debemos implementarla sin que afecte al sistema de diseño.