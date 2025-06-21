[**frontapp**](../../../../README.md)

***

[frontapp](../../../../README.md) / [controllers/Login/LoginFirebase](../README.md) / LoginFirebase

# Class: LoginFirebase

Defined in: controllers/Login/LoginFirebase.ts:21

🔐 LoginFirebase

Implementación concreta del patrón Adapter que utiliza Firebase Authentication
para gestionar el inicio de sesión, cierre de sesión y observación del estado del usuario.

Esta clase implementa la interfaz `LoginInterface<AppUser>`, lo cual permite
que sea intercambiable por otras implementaciones como Mongo o Mock.

## Implements

- [`LoginInterface`](../../LoginInterface/interfaces/LoginInterface.md)\<[`AppUser`](../../../../types/User/interfaces/AppUser.md)\>

## Constructors

### Constructor

> **new LoginFirebase**(): `LoginFirebase`

#### Returns

`LoginFirebase`

## Methods

### login()

> **login**(`email`, `password`): `Promise`\<[`AppUser`](../../../../types/User/interfaces/AppUser.md)\>

Defined in: controllers/Login/LoginFirebase.ts:35

🔓 login
Autentica un usuario mediante Firebase Authentication con email y contraseña.

#### Parameters

##### email

`string`

Correo electrónico del usuario

##### password

`string`

Contraseña del usuario

#### Returns

`Promise`\<[`AppUser`](../../../../types/User/interfaces/AppUser.md)\>

Un objeto `AppUser` con la información básica del usuario autenticado

#### Throws

Error si las credenciales son incorrectas o si hay un problema de conexión

#### Example

```ts
const user = await login("usuario@example.com", "123456");
console.log(user.nombre); // "Juan"
```

#### Implementation of

[`LoginInterface`](../../LoginInterface/interfaces/LoginInterface.md).[`login`](../../LoginInterface/interfaces/LoginInterface.md#login)

***

### logout()

> **logout**(): `Promise`\<`void`\>

Defined in: controllers/Login/LoginFirebase.ts:59

🚪 logout
Finaliza la sesión del usuario actual en Firebase.

#### Returns

`Promise`\<`void`\>

Una promesa que se resuelve cuando la sesión se ha cerrado exitosamente

#### Example

```ts
await logout();
```

#### Implementation of

[`LoginInterface`](../../LoginInterface/interfaces/LoginInterface.md).[`logout`](../../LoginInterface/interfaces/LoginInterface.md#logout)

***

### onAuthStateChanged()

> **onAuthStateChanged**(`callback`): () => `void`

Defined in: controllers/Login/LoginFirebase.ts:80

👁️ onAuthStateChanged
Registra un listener para detectar cambios en el estado de autenticación del usuario.
Este método es clave para restaurar la sesión al refrescar la página.

#### Parameters

##### callback

(`user`) => `void`

Función que se ejecuta cuando cambia el estado de autenticación

#### Returns

Función para desuscribirse del listener

> (): `void`

##### Returns

`void`

#### Example

```ts
const unsubscribe = onAuthStateChanged((user) => {
  if (user) {
    console.log("Usuario logueado:", user.email);
  } else {
    console.log("Sesión cerrada");
  }
});
```

#### Implementation of

[`LoginInterface`](../../LoginInterface/interfaces/LoginInterface.md).[`onAuthStateChanged`](../../LoginInterface/interfaces/LoginInterface.md#onauthstatechanged)

***

### register()

> **register**(`email`, `password`, `nombre?`): `Promise`\<[`AppUser`](../../../../types/User/interfaces/AppUser.md)\>

Defined in: controllers/Login/LoginFirebase.ts:102

📝 register
Registra un nuevo usuario con email, password y nombre opcional.

#### Parameters

##### email

`string`

Correo electrónico

##### password

`string`

Contraseña

##### nombre?

`string`

Nombre visible del usuario (opcional)

#### Returns

`Promise`\<[`AppUser`](../../../../types/User/interfaces/AppUser.md)\>

#### Implementation of

[`LoginInterface`](../../LoginInterface/interfaces/LoginInterface.md).[`register`](../../LoginInterface/interfaces/LoginInterface.md#register)
