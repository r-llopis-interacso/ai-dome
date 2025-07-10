# Contexto de Directrices de IA

Generado el: 10/7/2025, 13:57:00

## Resumen

**Total de directrices aplicables:** 10
**Áreas de desarrollo identificadas:** 1

## Índice de Áreas

- [General](#general) (10 directrices)

## General

*10 directrices aplicables*

### 1. Clases CSS con Tailwind

# Clases CSS

<aside>
💡 Con PostCSS para evitar colisiones de clases, podemos simplificar los nombres de las clases

</aside>

<aside>
👉 Usar clases descriptivas, sencillas y breves

</aside>

# Clases descriptivas

Priorizamos los nombres de clases descriptivos que aporten información adicional para interpretar los elementos donde se aplican.

# Clases sencillas y breves

Evitamos usar metodologías como [BEM](https://getbem.com), ya que PostCSS usa CSS Modules para añadirles identificadores únicos que evitan las colisiones.

Por lo tanto en lugar de clases como:

```html
<div class="card">
		<div class="card__description card__description--active">...<div>
</div>
```

Podemos usar simplificar y acortar las clases aprovechando los selectores de CSS:

```html
<div class="card">
		<div class="description active">...<div>
</div>
```

```css
.description.active {
		...
}
```

## Nombres de clase en camelCase

Dado que los estilos los aplicamos desde hojas de estilo importadas en un objeto `styles` cuyas propiedades se usan en los componentes, los nombres de clases seguimos el mismo estilo de escritura que para el código, es decir las escribimos en `camelCase`.

# Evitar prefijos de navegador

Evitamos usar prefijos de navegador como `-ms` o `-webkit` dado que PostCSS ya se encarga de añadirlos automáticamente.

**Etiquetas relacionadas:** Tailwind CSS

---

### 2. Pautas para Tailwind CSS

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

**Etiquetas relacionadas:** Tailwind CSS

---

### 3. Patrón de Estado Distribuido (Context API)

# Estado distribuido

<aside>
💡 Los componentes deberían ser relativamente agnósticos a si el estado compartido está distribuído o heredado

</aside>

<aside>
👉 Limitar el estado distribuido a lo estrictamente necesario

</aside>

# Cuando usarlo

Las opciones habituales para usar un estado distribuido suelen ser las siguientes:

- Estado que debe persistir entre rutas
- Estado entre ramas distintas del árbol de componentes
- Estado entre componentes muy alejados en una misma rama del árbol de componentes

# Sólo cuando sea necesario

Usar éste tipo de estado aumenta la complejidad de la aplicación y conecta partes

Por lo tanto, antes de usar éste tipo de estado debemos preguntarnos si se puede plantear la solución con un estado más sencillo y sólo optar por distribuirlo cuando sea realmente necesario o aporte valor suficiente.

# Encapsular en hooks

Los componentes que usen estado no tienen porque saber cuál es su alcance ni cómo está implementado. Por ello la gestión de ese estado la encapsulamos en hooks que ocultan su implementación a los componentes.

De esa forma podemos cambiar la implementación, el origen del estado o incluso la librería usada sin que los componentes que lo usen se vean afectados.

# Usar contextos y proveedores

La opción por defecto que usamos para implementar estados distribuidos es el API de React Context.

Para aplicar la pauta anterior, tanto el contexto como el proveedor los incluimos dentro del módulo de su hook.

# Estructura para este tipo de hooks

La estructura es similar a la del resto de los hooks añadiendo dos tipos de ficheros, para el contexto y el proveedor.

Suponiendo un hook `useSession`, ésta sería la estructura típica de su carpeta:

- `use-session`
    - `context.ts`: creación del contexto con sus estado inicial
    - `index.mdx`: documentación del hook si fuera necesaria
    - `index.ts`: implementación del hook que usarán los componentes
    - `provider.tsx`: proveedor del contexto que permitirá distribuir el estado
    - `specs.tsx`: especificaciones del hook en forma de pruebas unitarias
    - `types.ts`: tipos usados por el contexto, componente, etc.

# Ejemplo de hook

```tsx
import { createContext } from 'react'

import type { UseSession } from './types'

const SessionContext = createContext<UseSession>({
		session: undefined,
		setSession: () => undefined,
})

export default SessionContext
```

```tsx
import { useContext, useEffect } from 'react'

import type { UseSession } from './types'
import { SessionContext } from './context'

export default function useSession(): UseSession {
		const { session, setSession } = useContext(SessionContext)

		// ...
	
		useEffect(() => {
				// ...
		}, [session])
	
		return { session, setSession, /* ... */ }
}
```

```tsx
import { PropsWithChildren, useState } from 'react'

import type { Session } from 'src/types'

import { SessionContext } from './context'

export default function SessionProvider({	children }: PropsWithChildren) {
	const [session, setSession] = useState<Session | undefined>()

	return (
			<SessionContext.Provider value={{ session, setSession }}>
					{children}
			</SessionContext.Provider>
	)
}
```

**Etiquetas relacionadas:** React

---

### 4. Estructura de los Hooks React

# Estructura de los hooks

<aside>
💡 Los hooks React son otro tipo de módulo por lo que siguen reglas similares

</aside>

<aside>
👉 Seguir la estructura modular

</aside>

# Parámetros de entrada

Los parámetros de entrada no es necesario que sigan un patrón fijo, es decir que deben afrontarse como en otras funciones y pueden plantearse cómo se considere que resultan más legibles o expresivos.

Por ejemplo, se recomienda no limitarse a usar siempre un sólo parámetro de tipo objeto que contenga el resto de parámetros.

# Parámetros de salida

Los parámetros de salida no es necesario que sigan un patrón fijo, es decir que deben afrontarse como en otras funciones y pueden plantearse cómo se considere que resultan más legibles o expresivos.

Por lo tanto los hooks pueden devolver casi cualquier cosa: objetos, arrays, tuplas, funciones, etc.

# Estructura de la carpeta

Del mismo modo que el resto de módulos, agrupamos todos los ficheros del hook en una carpeta. No todos necesitarán la misma cantidad de ficheros, pero suponiendo. un hook `usePosts`, ésta sería la estructura típica de su carpeta:

- `use-posts`
    - `index.mdx`: documentación del hook si fuera necesaria
    - `index.ts`: implementación del hook `usePosts`
    - `specs.tsx`: especificaciones del hook en forma de pruebas unitarias
    - `types.ts`: tipos usados por el hook y sus módulos relacionados
    - `use-posts-filters`: se puede delegar parte de la lógica a otros hooks internos si esto ayuda a simplificar el hook principal

**Etiquetas relacionadas:** React

---

### 5. Estructura de los Componentes React

# Estructura de los componentes

<aside>
💡 Los componentes de React son otro tipo de módulo por lo que siguen reglas similares

</aside>

<aside>
👉 Seguir la estructura modular

</aside>

# Separación en ficheros

Salvo que se trate de un micro componente en el que todo su código puede ir en un sólo fichero manteniendo una gran legibilidad, no normal sería separar los distintos aspectos del componente en diferentes ficheros: **estructura, estilos, tipos, pruebas, historias, documentación**…

El fichero principal llamado `index.tsx` exportaría por defecto el componente de React, estaría contenido junto con el resto de ficheros que comparta el componente en una misma carpeta cuyo nombre identifique al componente.

## Componentes hijos

En caso de componentes complejos cuyas partes sean suficientemente específicas por lo que no se puedan abstraer, podemos dividirlo en varios componentes hijos o internos que sólo podrán ser usados por su padre.

Los componentes hijos se crearán en la propia carpeta del componente padre siguiendo las misma estructura definida en ésta pauta, pero **sin** seguir las reglas de clasificación por [tipo de componentes](Tipos%20de%20componentes%20ec4e503fe001413097bafc69ccee22f4.md).

## Otros módulos internos

Como cualquier tipo de módulo, los componentes pueden tener módulos internos para mejorar la estructura del mismo. Los dos casos más habituales es que los componentes tengan funciones de utilidad o hooks propios.

## Ejemplo de estructura

No todos componentes necesitan los mismos tipos ficheros o carpetas, pero suponiendo un componente de nombre `search-input`, ésta podría ser la estructura de su carpeta:

- `search-input/`
    - `index.mdx`: documentación del componente si fuera necesaria
    - `index.tsx`: estructura visual del componente en forma de componente de React
    - `specs.tsx`: especificaciones del componente en forma de pruebas unitarias
    - `stories.tsx`: ejemplos de uso del componente al usar [Storybook](https://storybook.js.org)
    - `styles.module.css`: estilos del componente al usar [CSS Modules](https://github.com/css-modules/css-modules)
    - `types.ts`: tipos usados por el componente y sus módulos relacionados
    - `use-search-input/`: lógica del componente en forma de hook de React
        - `index.ts`: hook con la lógica del componente
        - `specs.ts`: pruebas unitarias del hook

Algunos ficheros podrían variar de nombre según las herramientas usadas en cada proyecto, por ejemplo `tests.tsx` para las pruebas unitarias o `styles.ts` para los estilos cuando no se use CSS.

**Etiquetas relacionadas:** React

---

### 6. Tipos de Componentes (Jerarquía)

# Tipos de componentes

<aside>
💡

Organizar los tipos de componentes siguiendo una clasificación específica ayudará a entender mejor sus diferencias y como usarlos, además si el equipo de diseño usa una metodología similar será más sencillo implementar sus diseños

</aside>

<aside>
👉 Respetar la jerarquía al crear componentes

</aside>

# Niveles jerárquicos

A la hora de organizar los componentes diferenciamos entre varios tipos de ellos, según su naturaleza y el uso que se les vaya a dar. Los tipos de componentes también determinan cinco niveles de jerarquía entre ellos:

1. [Primitivos](Tipos%20de%20componentes%20ec4e503fe001413097bafc69ccee22f4.md)
2. [Componentes](Tipos%20de%20componentes%20ec4e503fe001413097bafc69ccee22f4.md)
3. [Contenedores](Tipos%20de%20componentes%20ec4e503fe001413097bafc69ccee22f4.md)
4. [Vistas](Tipos%20de%20componentes%20ec4e503fe001413097bafc69ccee22f4.md)
5. [Planos](Tipos%20de%20componentes%20ec4e503fe001413097bafc69ccee22f4.md)
6. [Pantallas](Tipos%20de%20componentes%20ec4e503fe001413097bafc69ccee22f4.md)

La regla principal en ésta organización es que **los componentes sólo pueden contener otros del mismo nivel o inferior**, excepto el primer nivel que no pueden contener ninguno.

Esta forma de clasificar y organizar los componentes está inspirada en la metodología [Atomic design](https://bradfrost.com/blog/post/atomic-web-design/), pero no la sigue de forma estricta.

## Primitivos `primitives`

Son la unidad mínima de elementos visuales. Son componentes **independientes**, es decir que no dependan de otros. Están **aislados** de conexiones con otras partes del sistema, como por ejemplo contextos compartidos o llamadas a servicios.

## Componentes `components`

Representan las piezas más habituales que usamos para construir la interfaz y son la parte esencial que definen los sistemas de diseño. Normalmente se apoyan en los componentes primitivos para resultar más expresivos y evitar duplicar código.

## Contenedores `containers`

Son componente de mayor nivel que representan partes reutilizables de interfaz más complejas que se forman combinando varios componentes básicos. En general se recomienda **aislarlos** de conexiones con otras partes del sistema, salvo contenedores de elementos a nivel de aplicación.

## Vistas `views`

Los componentes que empiezan aportar a aportar un valor funcional más específico para las necesidades del cliente están en éste nivel. Deberían ser el punto de entrada habitual a las conexiones con otras partes del sistema, como por ejemplo contextos compartidos o llamadas a servicios.

## Planos `layouts`

Se encargan de planificar la organización de los elementos comunes a nivel **estructural** y dejar los huecos necesarios para colocar las vistas concretas que se necesiten en cada pantalla.

## Pantallas `pages` o `screens`

Están directamente relacionados con **rutas** a pantallas o páginas concretas. Deberían ser componentes relativamente sencillos que normalmente sólo definirían una composición de planos y vistas.

# Componentes de terceros

Por lo general, un componente de primer nivel se puede seguir considerando como tal al usar algún componente de librerías de terceros para crear otro similar personalizado o cómo utilidad de apoyo para animaciones, traducciones, comportamiento básico, etc.

**Etiquetas relacionadas:** React

---

### 7. Uso de Componentes en React

# Uso de componentes

<aside>
💡 La responsabilidad de los componentes de React es construir las interfaces de usuario

</aside>

<aside>
👉 Priorizar componentes de presentación pequeños

</aside>

# Componentes funcionales

A la hora de crear componentes, usamos funciones en lugar de clases ya que resultan más sencillos y claros, de esa forma podemos hacer [uso de hooks](https://www.notion.so/062aaa41f5fc4ee987865ef60183d76b?pvs=21). Además usar ese tipo de funciones fomentan la separación de la estructura visual de la lógica del componente.

Sólo usamos clases en casos excepcionales cuando no se pueden usar funciones, por ejemplo si necesitamos un componente para capturar errores: [React error boundaries](https://reactjs.org/docs/error-boundaries.html).

# Componentes pequeños

Los componentes que creemos deberían aspirar a ser pequeños para intentar mejorar:

- Para que el árbol de componentes sea más **modular**, por lo que se puedan reutilizar en distintas partes de la aplicación
- Para que los componentes tengan una **responsabilidad** **limitada** y así poder evitar que su complejidad no aumente de forma indeseada
- Para que los components sean más **legibles**, por lo que sea más eficiente trabajar con ellos al comprenderlos más rápidamente
- Para que su **mantenimiento** sea más sencillo dado que podremos depurarlos y modificarlos de forma más eficiente
- Para conseguir un mejor **rendimiento** de la aplicación sacando más partido de React que sólo actualiza los componentes que necesiten cambiar
- Para sacar más partido de la **composición** de componentes, combinando varios componentes para obtener otros más completos y flexibles

# Componentes de presentación

Al diseñar componentes, nos enfocamos en que contengan la mínima lógica necesaria, limitándose principalmente a aspectos relacionados con la presentación y visualización de sus diferentes variantes o elementos.

En la mayoría de los casos, es recomendable trasladar cualquier lógica adicional a otros módulos especializados, como hooks, funciones de utilidad o entidades, para mantener los componentes lo más simples y enfocados posible.

**Etiquetas relacionadas:** React

---

### 8. Manejo de Librerías de Terceros en React

# Librerías de terceros

<aside>
💡 Reduciendo el acoplamiento con librerías de terceros reducimos la nuestra dependencia a ellas, con lo cual estamos más protegidos a cambios inesperados y ganamos una mayor la flexibilidad al por ejemplo poder reemplazarlas de forma transparente

</aside>

<aside>
👉 Sacar partido de las librerías de terceros mientras controlamos nuestra dependencia

</aside>

# Reducir la dependencia

En el caso de librerías cuyos módulos se usan en distintos puntos de nuestro código, por un lado necesitamos aprovechar el impresionante trabajo realizado por la comunidad de código abierto para reducir costes, pero al mismo tiempo queremos mantener cierta libertad al intentar reducir nuestra dependencia a ellas.

## Enmascarar su uso

El primer paso para reducir la dependencia éstos módulos sería en lugar de importarlos directamente en cada fichero donde se vayan a usar, centralizar un único `import` en un fichero índice del tipo y categoría al que corresponda.

Por ejemplo, podemos exportar un hook de una librería de terceros:

```tsx
export { useForm } from 'react-hook-form'
```

De esa forma lo podemos importarlo como si fuera código nuestro:

```tsx
import { useForm } from 'src/hooks'
```

## Extender su funcionalidad

Una vez tengamos un módulo de terceros importado de la forma anterior en varios puntos, podemos extender su funcionalidad sin necesidad de actualizar el resto de ficheros al mantener el mismo API y ruta para importar. 

Por ejemplo, si queremos añadir una pequeñas funciones o estados adicionales:

```tsx
import { useRouter } from 'next/router'

import { isPrivateRoute } from 'src/utils/route'

export default function useRouter() {
		const router = useRouter()

	return {
			...router,
			isPrivate: isPrivateRoute(router.pathname),
	}
}
```

## Predefinir opciones comunes

Es frecuente que en un proyecto se use algún módulo de una librería siempre con las mismas opciones. Similar a añadir funcionalidad, podemos extender su uso con un módulo propio y aplicar ahí las opciones comunes, de manera que no tendríamos que repetirlas en varios ficheros.

## Personalizar su funcionalidad

Además de añadir funcionalidad o predefinir opciones, también podemos aprovechar los éstos módulos propios para personalizar cierta funcionalidad o comportamientos que necesitemos ajustar para integrarlo mejor con nuestro código.

Esto es especialmente útil al cambiar entre dos librerías similares, pero que difieren en algunos detalles y queremos sustituirlas sin tener que actualizar todo el código que las usan.

**Etiquetas relacionadas:** React

---

### 9. Estructura del Directorio en Proyectos React

# Estructura del directorio

<aside>
💡 Mantener una estructura de carpetas coherente y común ayudará a organizar y moverse por el código de forma ágil y previsible, además de facilitar el cambio de contexto al saltar entre proyectos

</aside>

# Directorio del código fuente

- `src/`
    - `components`: componentes independientes y aislados
    - `containers`: componentes construidos a partir de otros componentes
    - `hooks`: hooks con lógica reutilizable
    - `layouts`: componentes que determinan la estructura visual de las páginas
    - `pages`: componentes de páginas completas asignadas a una ruta concreta
    - `services`: funciones para conectar con APIs de servicios internos o externos
    - `utils`: funciones de utilidad que no entran dentro de los otros tipos
    - `views`: componentes contienen secciones funcionales

Tenemos una explicación más detallada sobre los distintos [tipos de componentes](Tipos%20de%20componentes%20ec4e503fe001413097bafc69ccee22f4.md).

# Grupos de categorías

En proyectos medianos o grandes, las carpetas de tipos se suelen llenar con demasiados recursos. En esos casos conviene añadir un nivel más de organización y agrupar los recursos relacionados en carpetas de categorías.

Cómo las categorías representan clasificaciones semánticas los nombres de sus carpetas pueden ser en singular.

Ejemplo de una estructura de contenedores por categorías:

- `src`
    - `containers`
        - **** **`form`
            - `form-field`
            - `radio-group`
            - `select`
            - …
        - `heading`
            - `page-header`
            - `section-header`
            - …
        - `navigation`
            - `breadcrumbs`
            - `pagination`
            - `tab-menu`
            - …
        - `overlay`
            - `modal`
            - `notification`
            - `slide-over`
            - …
        - …

**Etiquetas relacionadas:** React

---

### 10. Motivación para usar React

# Motivación

<aside>
💡 Mantener un stack similar en todos los proyectos nos permite montar equipos con gran flexibilidad y acometerlos con una mayor eficiencia

</aside>

El ecosistema de **React** es actualmente la primera opción en todos los nuevos proyectos **frontend**.

- Su simplicidad y parecido con HTML puro hace que tenga una curva de **aprendizaje** muy sencilla, lo cual permite a cualquier programador web aprenderlo y ser productivo rápidamente
- Su estructura basada en **componentes** reutilizables hace que sea fácil estructurar las aplicaciones y trivial compartir código entre proyectos, lo cual permite navegar con comodidad por el código y ahorrar costes en el desarrollo de nuevos proyectos
- Su organización de lógica mediante **hooks** permite encapsular comportamiento en pequeñas unidades de código, lo cual hace posible reutilizar lógica de forma eficiente entre componentes y proyectos
- Su sistema basado en flujos unidireccionales de propiedades inmutables permite que tenga una **consistencia** predecible en su ejecución, lo cual hace que sea sencillo y eficiente comprobar y corregir errores
- Aunque existen alternativas mejores en éste aspecto, sigue siendo una librería eficiente con un buen **rendimiento**, lo cual permite crear aplicaciones ágiles sin tener que optimizarlas desde el principio
- Al tener un alcance limitado y no imponer ninguna arquitectura, resulta extremadamente **flexible** para ser usado en distintos tipos de aplicaciones o entornos y combinarlo con otras librerías sin apenas restricciones
- El equipo detrás de su desarrollo y mantenimiento está comprometido con la **estabilidad** de la librería, lo cual nos da la garantía y seguridad de poder seguir usándola durante años y que el código de los proyectos tardará en quedarse obsoleto
- Mantiene una gran **comunidad** implicada durante muchos años, con lo cual tenemos a nuestra disposición cantidad inmensa de recursos y librerías de terceros
- Sigue teniendo un **popularidad** muy alta, lo cual facilita mucho encontrar talento especializado o con interés en introducirse en el ecosistema

**Etiquetas relacionadas:** React

---

