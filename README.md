# DietFront

## 🛠️ Tecnologías Utilizadas

| Tecnología                                                                                                  | Uso Principal                                   |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| ![React](https://img.shields.io/badge/-React-20232A?logo=react&logoColor=61DAFB)                            | Librería principal de UI                        |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=FFD62E)                               | Bundler ultrarrápido para desarrollo            |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=fff)                | Tipado fuerte en el frontend                    |
| ![Material UI](https://img.shields.io/badge/-MUI-007FFF?logo=mui&logoColor=white)                           | Componentes UI modernos                         |
| ![Firebase](https://img.shields.io/badge/-Firebase-FFCA28?logo=firebase&logoColor=black)                    | Backend alternativo (Auth, DB, Hosting)         |
| ![MongoDB Atlas](https://img.shields.io/badge/-MongoDB%20Atlas-47A248?logo=mongodb&logoColor=white)         | Base de datos remota para autenticación vía API |
| ![GitHub Actions](https://img.shields.io/badge/-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white) | CI/CD Pipeline                                  |
| ![Vitest](https://img.shields.io/badge/-Vitest-6E9F18?logo=vitest&logoColor=white)                          | Pruebas unitarias                               |
| ![Cypress](https://img.shields.io/badge/-Cypress-17202C?logo=cypress&logoColor=white)                       | Pruebas E2E                                     |
| ![Sass](https://img.shields.io/badge/-Sass-CC6699?logo=sass&logoColor=white)                                | Preprocesador CSS                               |

---

## 🔁 Alternancia entre Backends (Firebase / MongoDB)

Este proyecto permite alternar el proveedor de autenticación mediante una variable de entorno:

````env
VITE_AUTH_PROVIDER=firebase  # o mongo

---

## 🚀 Instalación Local

```bash

# 1. Instalar dependencias
yarn install

# 2. Compilar Sass
yarn sass:build

# 3. Correr en desarrollo
yarn dev

# Pruebas unitarias
yarn test:coverage

# Pruebas end-to-end con Cypress
yarn preview & yarn cypress:run

````
