[**frontapp**](../../../../README.md)

***

[frontapp](../../../../README.md) / [controllers/Login/LoginMongo](../README.md) / LoginMongo

# Class: LoginMongo

Defined in: controllers/Login/LoginMongo.ts:15

💾 LoginMongo

Adaptador que implementa la interfaz `LoginInterface` para conectar con un backend
basado en MongoDB. Permite realizar operaciones de autenticación como login, logout,
observación de sesión activa y registro de nuevos usuarios.

Este adaptador sigue el patrón de diseño Adapter para ser intercambiable por otras
implementaciones (Firebase, Mock, etc.) sin modificar la lógica del contexto de autenticación.

## Implements

- [`LoginInterface`](../../LoginInterface/interfaces/LoginInterface.md)\<[`AppUser`](../../../../types/User/interfaces/AppUser.md)\>

## Constructors

### Constructor

> **new LoginMongo**(): `LoginMongo`

#### Returns

`LoginMongo`

## Methods

### login()

> **login**(`email`, `password`): `Promise`\<[`AppUser`](../../../../types/User/interfaces/AppUser.md)\>

Defined in: controllers/Login/LoginMongo.ts:31

🔐 login

Inicia sesión enviando las credenciales al backend MongoDB.
Si la autenticación es exitosa, retorna un objeto `AppUser` con la información del usuario.

#### Parameters

##### email

`string`

Correo electrónico del usuario.

##### password

`string`

Contraseña correspondiente.

#### Returns

`Promise`\<[`AppUser`](../../../../types/User/interfaces/AppUser.md)\>

Una promesa que se resuelve con el usuario autenticado (`AppUser`).

#### Throws

Si las credenciales son inválidas o hay un error de red.

#### Example

```ts
const user = await authAdapter.login("usuario@ejemplo.com", "1234");
console.log(user.nombre); // "Usuario Demo"
```

#### Implementation of

[`LoginInterface`](../../LoginInterface/interfaces/LoginInterface.md).[`login`](../../LoginInterface/interfaces/LoginInterface.md#login)

***

### logout()

> **logout**(): `Promise`\<`void`\>

Defined in: controllers/Login/LoginMongo.ts:65

🚪 logout

Finaliza la sesión del usuario autenticado enviando una solicitud POST
al endpoint correspondiente del backend MongoDB.

#### Returns

`Promise`\<`void`\>

Una promesa que se resuelve una vez que el backend haya cerrado la sesión.

#### Example

```ts
await authAdapter.logout();
```

#### Implementation of

[`LoginInterface`](../../LoginInterface/interfaces/LoginInterface.md).[`logout`](../../LoginInterface/interfaces/LoginInterface.md#logout)

***

### onAuthStateChanged()

> **onAuthStateChanged**(`callback`): () => `void`

Defined in: controllers/Login/LoginMongo.ts:90

👁️ onAuthStateChanged

Simula la observación del estado de sesión leyendo desde `localStorage`.
Este método es útil para restaurar sesiones al recargar la aplicación,
aunque no mantiene una conexión activa con el backend.

#### Parameters

##### callback

(`user`) => `void`

Función que se ejecuta con el usuario activo (`AppUser`)
                  o `null` si no hay sesión.

#### Returns

Una función vacía para cumplir con el contrato de `LoginInterface`.

> (): `void`

##### Returns

`void`

#### Example

```ts
authAdapter.onAuthStateChanged((user) => {
  if (user) console.log("Usuario activo:", user.email);
});
```

#### Implementation of

[`LoginInterface`](../../LoginInterface/interfaces/LoginInterface.md).[`onAuthStateChanged`](../../LoginInterface/interfaces/LoginInterface.md#onauthstatechanged)

***

### register()

> **register**(`email`, `password`, `nombre?`): `Promise`\<[`AppUser`](../../../../types/User/interfaces/AppUser.md)\>

Defined in: controllers/Login/LoginMongo.ts:124

📝 register

Registra un nuevo usuario en el sistema MongoDB. Envia los datos
al backend mediante POST y retorna el usuario recién creado.

El nombre es opcional y puede ser gestionado por el backend
en caso de no ser proporcionado.

#### Parameters

##### email

`string`

Correo electrónico del nuevo usuario.

##### password

`string`

Contraseña segura para acceso.

##### nombre?

`string`

(Opcional) Nombre visible del usuario.

#### Returns

`Promise`\<[`AppUser`](../../../../types/User/interfaces/AppUser.md)\>

Una promesa con el usuario creado.

#### Throws

Si la operación de registro falla o el email ya está en uso.

#### Example

```ts
const nuevo = await authAdapter.register("nuevo@ejemplo.com", "abcd1234", "Leonella");
```

#### Implementation of

[`LoginInterface`](../../LoginInterface/interfaces/LoginInterface.md).[`register`](../../LoginInterface/interfaces/LoginInterface.md#register)
