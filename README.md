
Proyecto Gestión Tareas FRONT

Este proyecto es un FRONT para la gestión de tareas desarrollada con Angular.

---

Requisitos previos

- Node.js v22.16.0
- Angular CLI 20.0.1

---

Instrucciones de instalación y configuración

1. Clonar el repositorio

   git clone https://github.com/jacximir96/proyecto_gestion_tareas_front.git

   Ubícate en la carpeta donde clonaste el proyecto.

2. Instalar Node.js

   Instala la versión v22.16.0 de Node.js.

3. Instalar Angular

    npm install -g @angular/cli

4. Instalar dependencias del proyecto

   Ubícate en la carpeta de tu proyecto clonado y ejecuta:

   npm install

5. Cambiar variable en los environments para apuntar al backend correspondiente

   export const environment = {
    production: true, (En este apartado se deja en producción para levantar sin ningún inconveniente)
    apiBaseUrl: "http://{IP}:{PUERTO}/proyecto-gestion-tareas/us-central1/api", (En este apartado la URL del backend para consumo de las APIS)
    authLoginPath: "/auth/login",
    authRegisterPath: "/auth/register",
    tasksPath: "/tasks",
  };

6. Construir el proyecto

   ng build --configuration production

7. Iniciar el servidor con: 

   HTTP-SERVER:

   - cd dist/tu-nombre-de-app/browser
   - http-server -p 4200 (Puedes poner el puerto que requieras que esté levantado)

   SERVE:

   - cd dist/tu-nombre-de-app/browser
   - serve -s . -l 4200 (Puedes poner el puerto que requieras que esté levantado)

8. Visualizar aplicativo en la web

    http://localhost:4200 (Puede ser el puerto que pusiste hace un momento)
