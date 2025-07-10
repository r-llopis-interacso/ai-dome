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