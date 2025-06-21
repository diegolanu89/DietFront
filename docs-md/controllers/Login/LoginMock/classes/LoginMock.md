[**frontapp**](../../../../README.md)

***

[frontapp](../../../../README.md) / [controllers/Login/LoginMock](../README.md) / LoginMock

# Class: LoginMock

Defined in: controllers/Login/LoginMock.ts:25

🧪 LoginMock

Implementación de `LoginInterface<MockUser>` para simular autenticación
en entornos de desarrollo o testing sin conexión a una base de datos real.
Utiliza valores predefinidos desde `AUTH_CONFIG_MOCK`.

Se puede utilizar como fallback o mock durante pruebas unitarias.

## Implements

- [`LoginInterface`](../../LoginInterface/interfaces/LoginInterface.md)\<`MockUser`\>

## Constructors

### Constructor

> **new LoginMock**(): `LoginMock`

#### Returns

`LoginMock`

## Methods

### login()

> **login**(`email`, `password`): `Promise`\<`MockUser`\>

Defined in: controllers/Login/LoginMock.ts:49

🔐 login

Valida las credenciales proporcionadas contra las almacenadas en `AUTH_CONFIG_MOCK`.
Si coinciden, simula autenticación exitosa y retorna el usuario ficticio.

#### Parameters

##### email

`string`

Correo electrónico ingresado.

##### password

`string`

Contraseña ingresada.

#### Returns

`Promise`\<`MockUser`\>

Promesa con el usuario simulado.

#### Throws

Error si las credenciales no coinciden.

#### Example

```ts
const user = await authAdapter.login("demo@mock.com", "1234");
```

#### Implementation of

[`LoginInterface`](../../LoginInterface/interfaces/LoginInterface.md).[`login`](../../LoginInterface/interfaces/LoginInterface.md#login)

***

### logout()

> **logout**(): `Promise`\<`void`\>

Defined in: controllers/Login/LoginMock.ts:68

🚪 logout

No realiza ninguna acción efectiva ya que no hay backend real.
Cumple con el contrato de la interfaz para mantener coherencia.

#### Returns

`Promise`\<`void`\>

#### Example

```ts
await authAdapter.logout();
```

#### Implementation of

[`LoginInterface`](../../LoginInterface/interfaces/LoginInterface.md).[`logout`](../../LoginInterface/interfaces/LoginInterface.md#logout)

***

### onAuthStateChanged()

> **onAuthStateChanged**(`callback`): () => `void`

Defined in: controllers/Login/LoginMock.ts:86

👁️ onAuthStateChanged

Simula restauración del usuario autenticado leyendo el estado desde `localStorage`.
El valor se guarda bajo la clave `AUTH_CONFIG_MOCK.STORAGE_KEY`.

#### Parameters

##### callback

(`user`) => `void`

Función invocada con el usuario activo o `null`.

#### Returns

Función vacía para cumplir con el patrón de suscripción.

> (): `void`

##### Returns

`void`

#### Example

```ts
authAdapter.onAuthStateChanged((user) => {
  if (user) console.log("Usuario mock activo");
});
```

#### Implementation of

[`LoginInterface`](../../LoginInterface/interfaces/LoginInterface.md).[`onAuthStateChanged`](../../LoginInterface/interfaces/LoginInterface.md#onauthstatechanged)

***

### register()

> **register**(`email`, `password`, `nombre?`): `Promise`\<`MockUser`\>

Defined in: controllers/Login/LoginMock.ts:115

📝 register

Simula el registro de un nuevo usuario. En este entorno ficticio,
siempre devuelve el `fakeUser` como si el registro hubiera sido exitoso.

#### Parameters

##### email

`string`

Email (ignorado en mock).

##### password

`string`

Contraseña (ignorada en mock).

##### nombre?

`string`

Nombre opcional (ignorado en mock).

#### Returns

`Promise`\<`MockUser`\>

Promesa con el mismo usuario simulado.

#### Example

```ts
const nuevo = await authAdapter.register("demo@mock.com", "1234");
```

#### Implementation of

[`LoginInterface`](../../LoginInterface/interfaces/LoginInterface.md).[`register`](../../LoginInterface/interfaces/LoginInterface.md#register)
