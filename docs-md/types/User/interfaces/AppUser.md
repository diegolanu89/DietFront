[**frontapp**](../../../README.md)

***

[frontapp](../../../README.md) / [types/User](../README.md) / AppUser

# Interface: AppUser

Defined in: types/User.ts:7

Representa el tipo de usuario autenticado que se almacena en localStorage
y se utiliza en el sistema de autenticación de la aplicación.

## Properties

### email

> **email**: `string`

Defined in: types/User.ts:24

Dirección de correo electrónico del usuario.
Utilizada tanto para autenticación como para mostrar en el perfil.

***

### id

> **id**: `string`

Defined in: types/User.ts:12

Identificador único del usuario.
En el caso de Firebase, suele ser el UID. En MongoDB, el _id.

***

### nombre

> **nombre**: `string`

Defined in: types/User.ts:18

Nombre completo o visible del usuario.
Puede provenir de un campo `displayName`, `nombre` o ser derivado del email.
