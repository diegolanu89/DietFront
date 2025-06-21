[**frontapp**](../../../README.md)

***

[frontapp](../../../README.md) / [services/ApiService](../README.md) / ApiService

# Class: ApiService

Defined in: services/ApiService.ts:16

Clase que encapsula la lógica de autenticación, utilizando ya sea un servicio simulado
o el backend real, dependiendo del entorno configurado.

## Implements

- `AuthService`

## Constructors

### Constructor

> **new ApiService**(): `ApiService`

Defined in: services/ApiService.ts:21

#### Returns

`ApiService`

## Methods

### startSession()

> **startSession**(`token`): `Promise`\<\{ `message?`: `string`; `success`: `boolean`; `token?`: `number`; \}\>

Defined in: services/ApiService.ts:34

Inicia una sesión con el token proporcionado.
Elige automáticamente entre el servicio simulado o el real.

#### Parameters

##### token

`number`

Token numérico ingresado por el usuario.

#### Returns

`Promise`\<\{ `message?`: `string`; `success`: `boolean`; `token?`: `number`; \}\>

Resultado de la operación (éxito o fallo con mensaje).

#### Implementation of

`AuthService.startSession`
