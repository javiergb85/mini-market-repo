# VIBES DEVELOPMENT TEAM - Prueba Técnica

Este repositorio contiene la solución a la prueba técnica para el rol de desarrollador fullstack, siguiendo los requisitos del "MINI-MARKET".

## Tecnologías Utilizadas

- **Backend:** Node.js, Express.js, TypeScript
- **Frontend:** Next.js (App Router), React, TypeScript
- **Gestión de Estado:** Zustand
- **Estilos:** Tailwind CSS (integrado en Next.js)

## Arquitectura y Decisiones de Diseño

He optado por una **arquitectura de proyecto monorepo** simple con las carpetas `api`, `web` y `shared` para mantener una clara separación de responsabilidades entre el backend, el frontend y los tipos de datos compartidos.

### API (Backend)

- Se utilizó **Express.js** por su simplicidad y bajo peso, ideal para una prueba de este tipo.
- La data se consume directamente de un archivo `products.json` para cumplir el requerimiento base sin la necesidad de una base de datos.
- Los endpoints `/api/products` y `/api/products/:id` están implementados con soporte completo para filtros, paginación y ordenamiento.

### WEB (Frontend)

- Se utilizó **Next.js 14** con el **App Router** para aprovechar la renderización en el servidor y la simplicidad de la estructura de archivos de la página.
- **Zustand** fue seleccionado como gestor de estado. Es una biblioteca minimalista, rápida y fácil de usar, ideal para manejar el estado global de la lista de productos de manera eficiente sin la sobrecarga de Redux.
- El algoritmo utilitario `getTopCheapestAvailable` se colocó en la carpeta `utils` para mantener la lógica de negocio separada de los componentes de UI.
- Los componentes de UI (`ProductCard`, `ProductList`, `ProductDetail`) están bien definidos y reutilizables.

## Cómo ejecutar el proyecto

1.  **Clonar el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_REPOSITORIO>
    ```

2.  **Configurar el Backend:**
    ```bash
    cd api
    npm install
    npm run dev
    ```
    El servidor de la API se ejecutará en `http://localhost:3001`.

3.  **Configurar el Frontend:**
    Abre una nueva terminal.
    ```bash
    cd web
    npm install
    # Asegúrate de que tu .env.local tenga la variable:
    # NEXT_PUBLIC_API_BASE=http://localhost:3001
    npm run dev
    ```
    La aplicación Next.js se ejecutará en `http://localhost:3000`.

## Puntos Pendientes / Mejoras Futuras

- **Manejo de errores mejorado:** Implementar middleware de Express para un manejo de errores más robusto.
- **Validación de entradas:** Usar una biblioteca como `Joi` o `Zod` para validar los parámetros de la API.
- **Persistencia en MongoDB:** Implementar la lógica para conectar y consultar la base de datos de MongoDB.
- **Tests Unitarios:** Añadir tests para el algoritmo utilitario y los endpoints de la API.
- **Mejoras de UI/UX:** Añadir estados de carga (`skeleton loading`) y un diseño más pulido con Tailwind CSS.

## Git-flow (Historia de Commits)

He seguido el flujo solicitado, con commits atómicos y claros.

- `feat(api): implemented products list and detail endpoints`
- `feat(web): created products page with list and filters`
- `feat(web): added product detail page`
- `feat(web): integrated zustand for state management`
- `chore: updated readme with project details and pending tasks`