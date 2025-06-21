[**frontapp**](../../../../README.md)

***

[frontapp](../../../../README.md) / [controllers/Login/LoginInterface](../README.md) / LoginInterface

# Interface: LoginInterface\<TUser\>

Defined in: controllers/Login/LoginInterface.ts:12

🔄 LoginInterface

Interfaz genérica que define el contrato que deben cumplir todos los adaptadores
de autenticación. Permite abstraer la lógica de login/logout y observar cambios
de sesión, independientemente del proveedor (Firebase, MongoDB, mock, etc.).

Esta interfaz asegura consistencia en el uso del contexto de autenticación en toda la aplicación.

## Type Parameters

### TUser

`TUser`

Tipo del objeto usuario que será retornado al loguear y observar sesión.

## Methods

### login()

> **login**(`email`, `password`): `Promise`\<`TUser`\>

Defined in: controllers/Login/LoginInterface.ts:24

🔐 login
Inicia sesión autenticando con email y contraseña.

#### Parameters

##### email

`string`

Dirección de correo electrónico del usuario.

##### password

`string`

Contraseña del usuario.

#### Returns

`Promise`\<`TUser`\>

Una promesa que se resuelve con el usuario autenticado (tipo `TUser`).

#### Example

```ts
const user = await adapter.login('usuario@example.com', '123456');
```

***

### logout()

> **logout**(): `Promise`\<`void`\>

Defined in: controllers/Login/LoginInterface.ts:35

🚪 logout
Cierra la sesión del usuario autenticado.

#### Returns

`Promise`\<`void`\>

Una promesa que se resuelve una vez finalizado el cierre de sesión.

#### Example

```ts
await adapter.logout();
```

***

### onAuthStateChanged()

> **onAuthStateChanged**(`callback`): () => `void`

Defined in: controllers/Login/LoginInterface.ts:50

👁️ onAuthStateChanged
Observa los cambios de estado de sesión del usuario.

#### Parameters

##### callback

(`user`) => `void`

Función que se ejecuta cuando el usuario inicia o cierra sesión.

#### Returns

Una función para desuscribirse del observador.

> (): `void`

##### Returns

`void`

#### Example

```ts
const unsubscribe = adapter.onAuthStateChanged((user) => {
  if (user) console.log('Usuario activo:', user.email);
  else console.log('No hay sesión');
});
```

***

### register()

> **register**(`email`, `password`, `nombre?`): `Promise`\<`TUser`\>

Defined in: controllers/Login/LoginInterface.ts:61

📝 register
Registra un nuevo usuario con email, contraseña y nombre visible opcional.

#### Parameters

##### email

`string`

Correo electrónico del nuevo usuario

##### password

`string`

Contraseña segura

##### nombre?

`string`

Nombre visible (opcional)

#### Returns

`Promise`\<`TUser`\>

Promesa con el usuario registrado
