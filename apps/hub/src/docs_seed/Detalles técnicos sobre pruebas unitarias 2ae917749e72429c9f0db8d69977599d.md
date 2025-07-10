# Detalles técnicos sobre pruebas unitarias

<aside>
💡 Dado que pruebas unitarias forman parte del código de los proyectos deben ser tratadas como tal y usar las pautas de calidad transversales aplicables

</aside>

<aside>
👉 Seguir una estructura coherente

</aside>

# Framework para las pruebas

El framework habitual que usamos para ejecutar las pruebas unitarias es **Jest**. Aunque en algunos proyectos estamos valorando la posibilidad de migrar a **Vitest** por su mejor rendimiento en la ejecución de los mismos.

Por otro lado la librería de apoyo que usamos escribir los tests para componentes de **React** es **Testing Library**.

# Nomenclatura de los ficheros

Nuestro objetivo es que los tests estén al mismo nivel que la implementación que validan, por ello vamos a seguir la siguiente pauta en al introducir éste tipo de ficheros:

- Los módulos a validar pasan a ser carpetas con su nombre usando `kebab-case`
- La implementación estará en un fichero `index.{js,jsx,ts,tsx}` dentro de esa carpeta
- Los tests estarán en un fichero `specs.{js,jsx,ts,tsx}` dentro de esa carpeta

# Estructura de las pruebas

La estructura de las pruebas unitarias seguirá la siguiente pauta en la medida de lo posible:

- Configuración general para las pruebas
- Descripción de cada bloque funcional
- Configuración específica para cada bloque funcional
- Descripción de cada caso de prueba
- Configuración específica para cada caso de prueba
- Ejecución del caso de prueba
- Validación del caso de prueba

# Directivas para las pruebas

En el momento de escribir las pruebas unitarias seguiremos las siguientes directivas:

- Las pruebas unitarias serán independientes unas de otras
- Cada fichero de pruebas sólo validará un módulo al mismo tiempo
- Cada test unitario sólo validará una caso de prueba
- Los tests unitarios incluirán tanto casos de éxito como de error
- Un fichero de pruebas estará completo cuando cubre todos los casos de prueba posibles del módulo que pretende validar
- Priorizaremos la validación de los módulos de la forma más aislada posible
- Priorizaremos la simplicidad y legibilidad al escribir los tests unitarios
- Crearemos herramientas de utilidad para facilitar y mejorar la escritura de los tests unitarios
- Evitaremos pruebas que impliquen condiciones temporales y ralenticen la ejecución
- Escribiremos descripciones claras y directas para los casos de prueba
- Escribiremos las descripciones de los casos de prueba siempre en el mismo idioma
- Mantendremos siempre actualizados las pruebas unitarias con respecto a los cambios que se realicen en sus respectivos módulos
- Cuando un fichero de pruebas alcance una complejidad significativa lo consideraremos una señal de que el módulo debe ser simplificado o dividido
- Consideraremos las pruebas unitarias una prioridad con lo que se tomarán decisiones de diseño en los módulos para facilitar su implantación