[**frontapp**](../../../../README.md)

***

[frontapp](../../../../README.md) / [controllers/Login/LoginAdapter](../README.md) / AuthAdapterFactory

# Class: AuthAdapterFactory

Defined in: controllers/Login/LoginAdapter.ts:34

🔐 AuthAdapterFactory

Esta clase actúa como una fábrica (Factory Pattern) que decide, en tiempo de ejecución,
qué implementación concreta del sistema de login debe utilizarse en la aplicación.

La elección se realiza en base a la variable de entorno `VITE_AUTH_PROVIDER`,
que debe establecerse en el archivo `.env` del proyecto.

Esto permite intercambiar fácilmente entre distintos sistemas de autenticación
(Firebase, MongoDB, mock para testing, etc.) sin cambiar el código de la aplicación.

## Constructors

### Constructor

> **new AuthAdapterFactory**(): `AuthAdapterFactory`

#### Returns

`AuthAdapterFactory`

## Methods

### getAdapter()

> `static` **getAdapter**(): [`LoginInterface`](../../LoginInterface/interfaces/LoginInterface.md)\<[`AppUser`](../../../../types/User/interfaces/AppUser.md)\>

Defined in: controllers/Login/LoginAdapter.ts:51

Retorna una instancia del adaptador de autenticación correspondiente.

El proveedor se define mediante la variable de entorno `VITE_AUTH_PROVIDER`.
Si no se especifica o contiene un valor inválido, se usa por defecto el adaptador mock.

#### Returns

[`LoginInterface`](../../LoginInterface/interfaces/LoginInterface.md)\<[`AppUser`](../../../../types/User/interfaces/AppUser.md)\>

una instancia concreta del adaptador de autenticación.

#### Example

```ts
// .env
VITE_AUTH_PROVIDER=firebase

// En la app
const authAdapter = AuthAdapterFactory.getAdapter();
await authAdapter.login({ email: "test@example.com", password: "123456" });
```
