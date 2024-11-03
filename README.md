# Prueba tecnica de Reserva de Vuelos - Frontend y Backend

## Requisitos Previos
Para configurar y ejecutar el proyecto de reservas de vuelos, necesitarás tener las siguientes herramientas instaladas en tu máquina:

- [Node.js](https://nodejs.org/) (incluye npm)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- [PHP](https://www.php.net/) >= 8.0
- [Composer](https://getcomposer.org/)
- [MySQL](https://www.mysql.com/)

## Instalación del Frontend
Sigue estos pasos para instalar y configurar el entorno del frontend:

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Corosso/Prueba-tecnica.git
   cd "Prueba tecnica/prueba-tecnica"
   ```

2. **Instalar dependencias**
   Una vez que estés dentro del directorio del proyecto, instala todas las dependencias necesarias:
   ```bash
   npm install
   ```
   O si prefieres usar `yarn`:
   ```bash
   yarn install
   ```

## Dependencias Principales del Frontend
El proyecto usa varias dependencias esenciales que necesitarás instalar para desarrollar y ejecutar la aplicación.

- **React**: La biblioteca principal para construir la interfaz de usuario.
  ```bash
  npm install react react-dom
  ```

- **Axios**: Para manejar las solicitudes HTTP hacia la API del backend.
  ```bash
  npm install axios
  ```

## Ejecución del Proyecto Frontend
Una vez que hayas instalado todas las dependencias, puedes ejecutar el proyecto en modo desarrollo con el siguiente comando:
```bash
npm start
```
O si prefieres usar `yarn`:
```bash
yarn start
```

Esto abrirá la aplicación en el navegador por defecto en `http://localhost:3000/`.

## Estructura del Proyecto Frontend
- **src/components**: Contiene los componentes individuales como `Buscar`, `Resultados`, `Reserva`.
- **public**: Archivos públicos, como `index.html`.
- **src**: Código fuente de la aplicación, incluyendo el punto de entrada `index.js` y los componentes de la interfaz de usuario.

## Instalación del Backend
El backend del proyecto está desarrollado en Laravel. Sigue estos pasos para configurarlo:

1. **Clonar el repositorio** (si no lo has hecho ya).
   ```bash
   git clone https://github.com/Corosso/Prueba-tecnica.git
   cd "Prueba tecnica/vuelos-reserva"
   ```

2. **Instalar dependencias de Laravel**
   Utiliza Composer para instalar todas las dependencias de Laravel:
   ```bash
   composer install
   ```

3. **Configurar el archivo `.env`**
   Copia el archivo `.env.example` y renómbralo como `.env`:
   ```bash
   cp .env.example .env
   ```
   Edita el archivo `.env` para configurar la conexión a la base de datos. Asegúrate de modificar los siguientes valores:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=vuelos_reserva
   DB_USERNAME='tu_usuario'
   DB_PASSWORD='tu_contraseña_mysql'
   ```

4. **Generar la clave de la aplicación**
   ```bash
   php artisan key:generate
   ```

5. **Crear la base de datos**
   Crea una base de datos MySQL llamada `vuelos_reserva`. Puedes hacerlo mediante una herramienta como phpMyAdmin o desde la línea de comandos de MySQL:
   ```sql
   CREATE DATABASE vuelos_reserva;
   ```

6. **Ejecutar las migraciones**
   Laravel utiliza migraciones para crear y actualizar las tablas de la base de datos. Ejecuta el siguiente comando para crear las tablas necesarias:
   ```bash
   php artisan migrate
   ```
   Esto incluirá la migración `2024_11_02_233003_create_reservas_table.php` para crear la tabla `reservas`.

7. **Ejecutar el servidor de desarrollo de Laravel**
   ```bash
   php artisan serve
   ```
   Esto iniciará el servidor en `http://localhost:8000/`.

## Dependencias Principales del Backend
- **Laravel**: El framework principal para construir la API del backend.
- **MySQL**: Base de datos relacional para almacenar la información de las reservas.

## Estructura del Proyecto Backend
- **app/Models**: Contiene los modelos como `Reserva.php`, que representa las tablas de la base de datos.
- **database/migrations**: Contiene los archivos de migración, incluyendo `2024_11_02_233003_create_reservas_table.php`.
- **routes/api.php**: Archivo donde se definen las rutas de la API.

## Ejecución Completa del Proyecto
Para ejecutar todo el proyecto:
1. Asegúrate de tener ambos servidores en ejecución:
   - **Frontend**: Ejecuta `npm start` o `yarn start` en el directorio `Prueba tecnica/prueba-tecnica`.
   - **Backend**: Ejecuta `php artisan serve` en el directorio `Prueba tecnica/prueba-tecnica/vuelos-reserva`.
2. Accede a `http://localhost:3000/` para ver la interfaz del proyecto y realizar las reservas.


