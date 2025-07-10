# Implantación de pruebas unitarias

<aside>
💡 Las pruebas unitarias son la primera línea de defensa para aumentar confiabilidad de cualquier sistema

</aside>

<aside>
👉 Aplicar un plan de implantación progresiva

</aside>

# Premisas

Éste documento trata sobre la implantación de pruebas unitarias en proyectos que no fueron concebidos originalmente para incluirlas, lo que significa que su código no está optimizado para incorporarlas fácilmente. Esto implica que introducir este tipo de pruebas representará un desafío significativo para el equipo.

Por esta razón, la implantación debería ser progresiva, que permita compaginarlas con la evolución continua del desarrollo de los proyectos. Para lograrlo, se recomienda seguir las estrategias descritas en el presente documento.

# **Incorporación de pruebas unitarias en nuevos módulos**

Iniciaremos la introducción de pruebas unitarias en los módulos creados para implementar nuevas funcionalidades. De esta manera, podemos diseñarlos de forma óptima desde el principio, facilitando la realización de las pruebas.

Por lo tanto, todos los nuevos módulos desarrollados para respaldar nuevas funcionalidades deberán incluir un conjunto mínimo de pruebas unitarias que cubran las partes más significativas de la implementación.

# Adaptación de m**ódulos existentes para la incorporación de pruebas unitarias**

Cuando sea necesario modificar módulos existentes para mejorar funcionalidades, inicialmente no se crearán pruebas unitarias para cubrir dichos módulos. Esto se debe a que estos módulos no estarán optimizados para la realización de pruebas y el costo de introducirlas sería considerablemente mayor.

En su lugar, seguiremos una estrategia que consiste en evaluar si es posible extraer parte de la implementación actual relacionada con los cambios o si se puede introducir de forma indirecta desde un módulo externo. En ambos casos, al introducir nuevos módulos, seguiremos la directriz de incluir pruebas unitarias descrita en el apartado anterior.

Sin embargo, para aquellos módulos existentes cuya complejidad sea asumible o que estén optimizados para ser probados unitariamente, se deberán incorporar pruebas unitarias en el momento de su modificación.

# Introducción de pruebas unitarias durante la corrección de errores

Al efectuar cambios relacionados con la corrección de errores, seguiremos la misma estrategia que se mencionó en el apartado anterior. Es decir, se intentará extraer la funcionalidad afectada hacia nuevos módulos con el propósito de validarla mediante pruebas unitarias.

En el caso de que los errores afecten a módulos que ya cuenten con pruebas unitarias, se deberá incluir al menos un test unitario que simule el error original, con el objetivo de evitar que vuelva a reproducirse en el futuro.

# Aumento en los requisitos de calidad

Con el fin de garantizar la implementación adecuada de las pruebas unitarias, se establecerán nuevos requisitos para considerar que las solicitudes de cambios en el código estén listas para ser mezcladas en cualquier rama principal. En consecuencia, no se permitirá la mezcla de cambios que presenten alguno de los siguientes problemas:

1. **Inclusión de nuevos módulos sin pruebas unitarias**: se requerirá que cualquier nuevo módulo introducido venga acompañado de un conjunto de pruebas unitarias que cubran las partes más significativas de la implementación.
2. **Generación de errores en pruebas unitarias existentes o recién creadas**: cualquier cambio que provoque errores en las pruebas unitarias, ya sean las que se encontraban previamente o las que se implementaron para los nuevos módulos, deberá ser corregido antes de aceptar los cambios.

Por otro lado, se reconocen ciertos tipos de módulos que estarán exentos de la necesidad de contar con pruebas unitarias, tales como:

- Configuración
- Hojas de estilos
- Estructuras de datos puras
- Otros que no implementen ninguna lógica

Estos módulos estarán exceptuados de la obligación de tener pruebas unitarias debido a su naturaleza particular y su menor impacto en el comportamiento lógico y funcional del sistema.

# Aplicación el mínimo para cobertura de pruebas

Inicialmente, no estableceremos una cobertura mínima obligatoria para las pruebas unitarias, con el objetivo de mitigar el impacto negativo en el rendimiento del equipo durante su implementación. Evaluaremos periódicamente el estado de la implantación para determinar el progreso alcanzado.

De esta manera, podremos identificar el momento óptimo para introducir un primer porcentaje de cobertura, el cual será bajo y se incrementará de manera gradual a lo largo de los próximos meses.

Para asegurar el cumplimiento de este objetivo de aumentar progresivamente la cobertura, destinaremos tiempo en cada sprint para ampliar de manera sucesiva las pruebas unitarias o crear nuevas pruebas para funcionalidades existentes que no se encuentren siguiendo la segunda pauta. Esto permitirá mejorar la calidad del código y fortalecer la robustez del sistema en general.

# Configuración del entorno de pruebas

Antes de comenzar a implementar las directrices descritas en este documento, es necesario dedicar al menos un sprint a las configuraciones del entorno de pruebas. Esto nos permitirá asegurar que estamos preparados para llevar a cabo la introducción de las pruebas unitarias de manera eficiente y efectiva.

# Coordinación con el equipo de QA

Todas las directrices descritas en este documento se aplicarán exclusivamente al equipo de desarrollo, lo que significa que pueden ser implementadas de manera paralela a otras iniciativas propuestas por el equipo de QA.

Además, el equipo de desarrollo puede coordinarse con el equipo de QA para generar reportes de cobertura que puedan ser incluidos en sus informes. Esto permitirá una colaboración más estrecha y un mejor seguimiento de la calidad del software en todas las etapas del proceso de desarrollo y pruebas.

# Plan de implantación

Las directrices descritas en este documento pueden comenzar a implementarse en la siguiente iteración, una vez que se considere necesario. Para ello, se propone el siguiente plan de acción:

1. **Configuración del entorno de pruebas**: dedicar una iteración para preparar el entorno de pruebas y asegurarse de que esté listo para la introducción de las pruebas unitarias.
2. **Introducción de los nuevos requisitos de calidad**: una vez que el entorno de pruebas esté configurado, se procederá a implementar los nuevos requisitos de calidad, asegurándose de que los cambios propuestos cumplan con las pautas establecidas.
3. **Implantación de las nuevas pautas**: se llevará a cabo durante algunas iteraciones, abordando primero la introducción de nuevos módulos, luego la optimización de módulos existentes y la corrección de errores.
4. **Evaluación del estado de la implantación**: se realizará una revisión periódica del progreso de la implantación cada pocas iteraciones para asegurar que se están cumpliendo los objetivos establecidos.
5. **Introducción del primer mínimo para la cobertura de pruebas**: pasadas las suficientes iteraciones, se establecerá un primer porcentaje mínimo para la cobertura de pruebas que se debe cumplir en los nuevos módulos y en aquellos que se modifiquen.
6. **Aumento progresivo del mínimo para la cobertura de pruebas**: se incrementará gradualmente el porcentaje mínimo de cobertura a lo largo de las siguientes iteraciones.
7. **Alcance del mínimo deseado para la cobertura de pruebas**: se continuará trabajando hasta alcanzar el nivel de cobertura de pruebas deseado, garantizando que los módulos cruciales estén debidamente probados.

Con este plan de acción, el equipo de desarrollo podrá implementar las pautas de forma progresiva, asegurando la calidad del código y la incorporación efectiva de las pruebas unitarias en el proceso de desarrollo.