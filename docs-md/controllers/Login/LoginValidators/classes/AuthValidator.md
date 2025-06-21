[**frontapp**](../../../../README.md)

***

[frontapp](../../../../README.md) / [controllers/Login/LoginValidators](../README.md) / AuthValidator

# Class: AuthValidator

Defined in: controllers/Login/LoginValidators.ts:7

📦 AuthValidator

Clase utilitaria para validar y sanitizar entradas de usuario relacionadas con autenticación.
Provee métodos estáticos seguros y reutilizables para sanitización básica y validaciones comunes.

## Constructors

### Constructor

> **new AuthValidator**(): `AuthValidator`

#### Returns

`AuthValidator`

## Methods

### isValidEmail()

> `static` **isValidEmail**(`email`): `boolean`

Defined in: controllers/Login/LoginValidators.ts:25

Valida si un email tiene un formato básico correcto.

#### Parameters

##### email

`string`

Email a validar.

#### Returns

`boolean`

`true` si es válido, `false` si no.

***

### isValidName()

> `static` **isValidName**(`name`): `boolean`

Defined in: controllers/Login/LoginValidators.ts:46

Verifica que el nombre contenga solo letras y espacios, y tenga una longitud razonable.

#### Parameters

##### name

`string`

Nombre ingresado.

#### Returns

`boolean`

`true` si es válido, `false` si no.

***

### isValidPassword()

> `static` **isValidPassword**(`password`, `minLength`): `boolean`

Defined in: controllers/Login/LoginValidators.ts:36

Valida si la contraseña tiene la longitud mínima esperada.

#### Parameters

##### password

`string`

Contraseña ingresada.

##### minLength

`number`

Longitud mínima permitida.

#### Returns

`boolean`

`true` si es válida, `false` si no.

***

### sanitize()

> `static` **sanitize**(`str`): `string`

Defined in: controllers/Login/LoginValidators.ts:15

Elimina etiquetas HTML y espacios extremos.
Previene ataques XSS simples mediante expresiones regulares.

#### Parameters

##### str

`string`

Cadena a sanitizar.

#### Returns

`string`

Cadena limpia.
