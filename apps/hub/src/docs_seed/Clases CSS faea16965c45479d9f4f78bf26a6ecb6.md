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