# Prueba tecnica de Reservas de Vuelos - Frontend

## Requisitos Previos
Para configurar y ejecutar el frontend del proyecto de reservas de vuelos, necesitarás tener las siguientes herramientas instaladas en tu máquina:

- [Node.js](https://nodejs.org/) (incluye npm)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

## Instalación
Sigue estos pasos para instalar y configurar el entorno del proyecto:

1. **Clonar el repositorio**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_PROYECTO>
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

## Dependencias Principales
El proyecto usa varias dependencias esenciales que necesitarás instalar para desarrollar y ejecutar la aplicación.

- **React**: La biblioteca principal para construir la interfaz de usuario.
  ```bash
  npm install react react-dom
  ```

- **Axios**: Para manejar las solicitudes HTTP hacia la API del backend.
  ```bash
  npm install axios
  ```

- **React Router (opcional)**: Si el proyecto tiene navegación entre diferentes páginas.
  ```bash
  npm install react-router-dom
  ```

## Ejecución del Proyecto
Una vez que hayas instalado todas las dependencias, puedes ejecutar el proyecto en modo desarrollo con el siguiente comando:
```bash
npm start
```
O si prefieres usar `yarn`:
```bash
yarn start
```

Esto abrirá la aplicación en el navegador por defecto en `http://localhost:3000/`.

## Estructura del Proyecto
- **src/components**: Contiene los componentes individuales como `Buscar`, `Resultados`, `Reserva`.
- **public**: Archivos públicos, como `index.html`.
- **src**: Código fuente de la aplicación, incluyendo el punto de entrada `App.js` y los componentes de la interfaz de usuario.

