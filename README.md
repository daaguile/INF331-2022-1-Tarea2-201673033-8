# INF331-2022-1-Tarea3-201673033-8
## Instalación
### Front-End

### Requisitos

* Se recomienda usar Linux o Windows Subsystem for Linux
* `node` v16.x.x && `npm` v8.x.x (Se recomienda la herramienta [NVM](https://github.com/nvm-sh/nvm))

### Instalar módulos/paquetes

Dentro de la carpeta `front_end`:
```bash
npm install
```

### Back-End

### Requisitos

* Se recomienda usar Linux o Windows Subsystem for Linux
* `python` >= 3.8.10

### Instalar módulos/paquetes

Dentro de la carpeta `back_end`:
```bash
# Crear un entorno virtual
python -m venv .venv

# Activar entorno virtual
source .venv/bin/activate

# Actualizar pip
python -m pip install --upgrade pip

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar migraciones
python manage.py migrate
```
## Uso aplicación web

### Back-End

Dentro de la carpeta `back_end` con entorno virutal activado:
```bash
# Ejecutar el servidor de la api
python manage.py runserver
```

### Front-End
Dentro de la carpeta `front_end`:
```bash
# Ejecutar el servidor web
npm run start
```

Se podrá acceder a través del navegador con la url [http://localhost:3000](http://localhost:3000)

## Pruebas

Dentro de la carpeta `back_end` con entorno virutal activado:
```bash
# Ejecutar el servidor de la api
python manage.py runserver
```
Dentro de la carpeta `front_end`:
```bash
# Ejecutar las pruebas
npm run test
```
* En caso de que luego de utilizar el comando `npm run test` aparezca el mensaje:

        No tests found related to files changed since last commit.
        Press `a` to run all tests, or run Jest with `--watchAll`.

  Seleccionar la terminal y persionar la tecla 'a' ejecutarán las pruebas
