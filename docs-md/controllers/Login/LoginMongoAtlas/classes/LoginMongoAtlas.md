[**frontapp**](../../../../README.md)

***

[frontapp](../../../../README.md) / [controllers/Login/LoginMongoAtlas](../README.md) / LoginMongoAtlas

# Class: LoginMongoAtlas

Defined in: controllers/Login/LoginMongoAtlas.ts:14

☁️ LoginMongoAtlas

Adaptador de autenticación que implementa `LoginInterface<AppUser>`, diseñado para interactuar
con una API REST alojada en la nube con MongoDB Atlas como backend.

Permite realizar login, logout, registrar nuevos usuarios y restaurar sesiones en el cliente.
No realiza verificación activa con el servidor al cargar el estado inicial, sino que utiliza `localStorage`.

## Implements

- [`LoginInterface`](../../LoginInterface/interfaces/LoginInterface.md)\<[`AppUser`](../../../../types/User/interfaces/AppUser.md)\>

## Constructors

### Constructor

> **new LoginMongoAtlas**(): `LoginMongoAtlas`

#### Returns

`LoginMongoAtlas`

## Methods

### login()

> **login**(`email`, `password`): `Promise`\<[`AppUser`](../../../../types/User/interfaces/AppUser.md)\>

Defined in: controllers/Login/LoginMongoAtlas.ts:29

🔐 login

Realiza autenticación contra el backend remoto usando correo y contraseña.
En caso de éxito, devuelve un objeto `AppUser`.

#### Parameters

##### email

`string`

Correo electrónico del usuario.

##### password

`string`

Contraseña asociada.

#### Returns

`Promise`\<[`AppUser`](../../../../types/User/interfaces/AppUser.md)\>

Promesa con el usuario autenticado.

#### Throws

Si las credenciales son inválidas o hay un error en la conexión.

#### Example

```ts
const user = await authAdapter.login("email@ejemplo.com", "123456");
```

#### Implementation of

[`LoginInterface`](../../LoginInterface/interfaces/LoginInterface.md).[`login`](../../LoginInterface/interfaces/LoginInterface.md#login)

***

### logout()

> **logout**(): `Promise`\<`void`\>

Defined in: controllers/Login/LoginMongoAtlas.ts:59

🚪 logout

Notifica al backend para cerrar la sesión del usuario autenticado.

#### Returns

`Promise`\<`void`\>

Una promesa que se resuelve cuando finaliza la solicitud.

#### Example

```ts
await authAdapter.logout();
```

#### Implementation of

[`LoginInterface`](../../LoginInterface/interfaces/LoginInterface.md).[`logout`](../../LoginInterface/interfaces/LoginInterface.md#logout)

***

### onAuthStateChanged()

> **onAuthStateChanged**(`callback`): () => `void`

Defined in: controllers/Login/LoginMongoAtlas.ts:79

👁️ onAuthStateChanged

Simula la observación del estado de autenticación leyendo el usuario desde `localStorage`.
No se conecta con el servidor. Útil para restaurar sesión tras recarga.

#### Parameters

##### callback

(`user`) => `void`

Función que se ejecuta con el usuario activo (`AppUser`) o `null`.

#### Returns

Función de limpieza vacía (para cumplir la interfaz).

> (): `void`

##### Returns

`void`

#### Example

```ts
authAdapter.onAuthStateChanged((user) => {
  if (user) console.log("Sesión activa");
});
```

#### Implementation of

[`LoginInterface`](../../LoginInterface/interfaces/LoginInterface.md).[`onAuthStateChanged`](../../LoginInterface/interfaces/LoginInterface.md#onauthstatechanged)

***

### register()

> **register**(`email`, `password`, `nombre?`): `Promise`\<[`AppUser`](../../../../types/User/interfaces/AppUser.md)\>

Defined in: controllers/Login/LoginMongoAtlas.ts:110

📝 register

Registra un nuevo usuario en la base de datos alojada en MongoDB Atlas mediante
una solicitud POST al endpoint `/register`.

#### Parameters

##### email

`string`

Correo electrónico del nuevo usuario.

##### password

`string`

Contraseña del nuevo usuario.

##### nombre?

`string`

(Opcional) Nombre visible del usuario.

#### Returns

`Promise`\<[`AppUser`](../../../../types/User/interfaces/AppUser.md)\>

Promesa con el usuario recién registrado.

#### Throws

Si el registro falla por email en uso o error de red.

#### Example

```ts
const nuevo = await authAdapter.register("nuevo@ejemplo.com", "clave123", "Leonella");
```

#### Implementation of

[`LoginInterface`](../../LoginInterface/interfaces/LoginInterface.md).[`register`](../../LoginInterface/interfaces/LoginInterface.md#register)
