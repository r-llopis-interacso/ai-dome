# Plantilla para Python

Fase: Refinamiento
Redactores: Pedro Llanos

## Modelo estándar de Python

La idea es tener una plantilla para crear un proyecto en Python rápidamente. Para ello se ha definido el siguiente repositorio:

[Repositorio](https://bitbucket.org/interacso/poc-python-template)

[Ampliar plantilla de Python](../../../Hoja%20de%20ruta%207ae550df40354b2ba7424296538c7335/Hoja%20de%20ruta%20del%20manual%205ecbfb3e97a540158fe25b77e597d269/Ampliar%20plantilla%20de%20Python%20eb760fb4762a45669135745215115326.md)

### Pasos

1. `make build` - para construir las dependencias del proyecto
2. `make run` - para ejecutar el `run.sh`
3. (opcional) `make clean` - para limpiar el directorio
4. (opcional) `make test` - para ejecutar los test

### Estructura de directorios

```
name-project/
├── .gitignore # Archivo para ignorar archivos en Git
├── README.md # Descripción del proyecto
├── requirements.txt # Dependencias del proyecto
├── Makefile # Archivo para automatizar tareas
│
├── docs/ # Documentación del proyecto
│ └── ...
│
├── data/ # Datos, como archivos de configuración, JSON, CSV, etc.
│ ├── dataset.csv
| └── ...
│
|── modules
│ ├── app.py # Código fuente del proyecto
│ ├── mod1.py
│ └── ...
│
├── scripts/ # Utilidades y herramientas
│ ├── script1.sh
│ └── ...
│
|── bin/ # Scripts adicionales, por ejemplo, para automatización
| ├── build.sh
| ├── run.sh
| ├── clean.sh
| ├── test.sh
| └── ...
│
├── libs/ # Librerías implementadas o módulos adicionales
│ ├── lib1.py
│ ├── db
│ │ ├── create.py
│ │ └── ...
│ └── ...
│
├── utils/ # Utilidades y herramientas
│ ├── util1.py
│ └── ...
│
├── tests/ # Pruebas unitarias
│ ├── init.py
│ ├── test_modulo1.py
│ └── ...
```