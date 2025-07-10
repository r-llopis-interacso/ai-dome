# Fundamentos y arquitectura

Como todo framework, `NestJS` nos ofrece una serie de utilidades básicas que merece la pena mencionar y dar una pequeña introducción a su uso. Para emplear la mayoría la librería nos provee de una serie de decoradores que facilitan mucho su utilización, partiendo de la base de que los objetos en los que se emplean se tratan de clases, por lo que podemos decir que se trata de un framework que sigue el **paradigma de la orientación a objetos**.

# Controllers

A la hora de definir un controlador emplearemos el decorador `@Controler`, que permite recibir un parámetro para indicar la ruta del controlador, por ejemplo, `@Controller('/rest')` recibirá las peticiones que se realicen a `URL_BACKEND/rest`. 

Dentro de la clase, podremos definir diferentes métodos para resolver la petición empleando también decoradores, como `Get`, `Post`, `Put` y demás métodos HTTP. También tendremos acceso a otros para emplear determinada información de la petición, como por ejemplo `@Req` para acceder al objeto `Request`, `@Body` para el cuerpo, etc.

Para una información más detallada podremos revisar el siguiente [enlace](https://docs.nestjs.com/controllers).

[Enlace a la documentación oficial](https://docs.nestjs.com/controllers).

# Providers

Los `Providers` son clases que reúnen algún tipo de lógica o funcionalidad y que la proveen a otra clase, como pueden ser los controladores (servicios), a otros proveedores (repositorios, por ejemplo) o cualquier otra clase que requiera aligerar lógica y hacerla más mantenible, sin ir más lejos.

Su principal característica dentro de este framework, y donde entra en juego el patrón IoC, es que son inyectables, para lo cual tendremos que definirlos como tal empleando el decorador `@Injectable()` justo antes de la definición de la clase, para posteriormente inyectarlo como dependencia en otro lugar bien por medio del constructor o bien empleando el decorador `@Inject()`, siendo esta última la más limpia y recomendable ya que nos ahorra tener que definir el constructor de la clase. Un ejemplo:

```tsx
@Injectable()
export class SomeService {
  @Inject()
  private readonly otherProvider: OtherInjectableProvider;
}

export class SomeController {
  @Inject()
  private readonly myService: SomeService;
  
  foo() {
	  return this.myService.doSomething()
  }
}
```

[Enlace a la documentación oficial](https://docs.nestjs.com/providers).

# Módulos

Podemos decir que un módulo es la parte más importante de este framework, el medio por el cual es capaz de reconocer la estructura de nuestro proyecto, proveer a las clases de `Providers` y en definitiva construir la aplicación en su conjunto. Nos permite así organizar nuestra aplicación en módulos totalmente independientes cada uno con sus proveedores y controladores (recordemos que es la base de este framework), pero esto no nos exime de aplicar otro tipo de arquitecturas que se centralicen en el uso de un solo módulo con proveedores y controladores compartidos entre todos ellos.

Creando módulos estamos dejando que el framework sea el que haga todo el trabajo de inyección de dependencias e instanciación de clases, donde cada uno de ellos a su vez sigue el patrón `Singleton`. Esto facilita mucho su organización y flexibilidad de aplicaciones.

Así, un módulo se trata de una clase etiquetada con el decorador `@Module()`, el cual recibe un objeto con cuatro parámetros que vemos a continuación:

- `providers`: los proveedores que serán empleados e instanciados en el módulo actual.
- `controllers`: los controladores definidos en el módulo actual.
- `imports`: lista de módulos que exponen determinados proveedores que son necesarios en el módulo actual.
- `exports`: lista de proveedores que el módulo exporta para ser empleados en otros módulos, lo cual requiere de añadir el módulo actual en la lista de `imports` en aquel lugar en el cual sea necesario.

Así, los módulos nos permiten por tanto encapsular una serie de lógica que comparten en el mismo dominio, y a su vez permite exponer y compartir los proveedores que contiene para que puedan ser empleados en otros lugares. 

Una vez definimos un módulo, este debe de ser importado (lista `imports`) en el módulo principal de la aplicación, lo que `NestJS` por defecto llama `app.module.ts` y que se encontraría en la raíz de la carpeta `src`.

[Enlace a la documentación oficial](https://docs.nestjs.com/modules).

# Middleware

Un middleware en `NestJS` tiene el mismo fundamento que en el resto de frameworks o librerías backend, que es interceptar una petición para así poder aplicar algún tipo de lógica, como autenticación o validación de información.

En el caso del framework que nos ocupa se define como una clase que implementa la interfaz `NestMiddleware` etiquetada con el decorador `@Injectable()`, aunque también puede ser una función. Para aplicar el middleware debemos de hacerlo en una clase módulo, la cual tiene que implementar la interfaz `NestModule`, empleando el método `configure()`. Para poder aplicarlo para determinadas rutas emplearemos el método `forRoutes()`.

[Enlace a la documentación oficial](https://docs.nestjs.com/middleware).

# Exception Filters

Existe una [capa de excepciones](https://docs.nestjs.com/exception-filters#custom-exceptions) que permite capturar y customizar los errores que puedan surgir en el servidor de manera controlada, dando la información necesaria al cliente para conocer cuál ha sido el motivo.

Más allá de estos casos básicos, `NestJS` nos provee de los [Exception Filters](https://docs.nestjs.com/exception-filters#exception-filters-1), que básicamente son clases que implementar la interfaz `ExceptionFilter` y que permiten agrupar una serie de casos de error en un solo lugar, permitiendo aplicar una serie de lógica (logger, transformación de la respuesta del error, etc) de manera sencilla y centralizada. Para ello se etiqueta la clase con el decorador `@Catch` con el tipo de excepciones a capturar, por ejemplo `@Catch(HttpException)` solo capturaría excepciones del tipo `HttpException`. A la hora de emplearlo, usaremos el decorador `@UseFilters`.

[Enlace a la documentación oficial](https://docs.nestjs.com/exception-filters).

# Pipes

Son clases empleadas para la transformación y validación de información entrante, tanto de esquemas, como de objetos o clases de manera sencilla y muy bien integrada con librerías externas que facilitan enormemente el trabajo. 

También permite la creación de clases customizadas que deben de implementar la interfaz `PipeTransform`.

[Enlace a la documentación oficial](https://docs.nestjs.com/pipes).

# Guards

Como da a entender su nombre, se tratan de clases que tienen por objetivo proteger las rutas de nuestra aplicación a través de autenticación de cualquier tipo y demás comprobaciones que se deseen hacer antes de resolver la petición.

Son muy similares a los `Middlewares`, con la gran diferencia de que un `Guard` tiene acceso al `ExecutionContext`, por lo que podrá acceder a más información y será más completo. En `NestJS`, una clase de este tipo debe de implementar la interfaz `CanActive` e implementar el método `canActivate()`, la cual recibe el `ExecutionContext` y debe de devolver un resultado booleano, de modo que si `true` podremos resolver la petición y si `false` se bloqueará el acceso.

Este tipo de clases se pueden emplear en conjunto con lo que se conoce como [*custom metadata*](https://docs.nestjs.com/fundamentals/execution-context#reflection-and-metadata), que no es más que otorgar a una ruta de una determinada información que nos interese. En conjunto, conforman una utilidad muy flexible para implementar determinada lógica de autenticación, como puede ser una [autenticación por roles](https://docs.nestjs.com/guards#putting-it-all-together).

[Enlace a la documentación oficial](https://docs.nestjs.com/guards).

# Interceptors

Son clases que permiten interceptar peticiones y ejecutar cierta lógica que sea necesaria previa resolución de la misma, como logging o cacheo de información.

Deben de ser `@Injectable()` e implementar la interfaz `NestInterceptor`.

[Enlace a la documentación oficial](https://docs.nestjs.com/interceptors).

# Custom decorators

`NestJS` provee de una funcionalidad muy interesante para construir decoradores ajustados a nuestras necesidades, además de los ya existentes dentro de la propia librería, empleando para ello la función `createParamDecorator`. Del mismo modo, con la función `applyDecorators` podremos agrupar varios en uno solo, lo que aporta mucha mantenibilidad a nuestro proyecto.

[Enlace a la documentación oficial](https://docs.nestjs.com/custom-decorators).