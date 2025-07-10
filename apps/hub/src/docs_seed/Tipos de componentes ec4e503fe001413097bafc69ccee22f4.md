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