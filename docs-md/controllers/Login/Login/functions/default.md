[**frontapp**](../../../../README.md)

***

[frontapp](../../../../README.md) / [controllers/Login/Login](../README.md) / default

# Function: default()

> **default**(): `Element`

Defined in: controllers/Login/Login.tsx:35

🧩 Login

Componente visual de autenticación que permite a los usuarios:
- Iniciar sesión si ya están registrados.
- Registrarse si no poseen cuenta.

Este componente desacopla la lógica de validación y autenticación mediante el uso
de un hook personalizado (`useAuthSubmit`), y aplica medidas básicas de seguridad como:
- Sanitización de inputs para prevenir XSS
- Validaciones de email, contraseña y nombre
- Control de intentos fallidos
- Advertencia si no se usa HTTPS en producción

## Returns

`Element`
