[**frontapp**](../../../../README.md)

***

[frontapp](../../../../README.md) / [controllers/Login/HandlerSubmit](../README.md) / useAuthSubmit

# Function: useAuthSubmit()

> **useAuthSubmit**(`__namedParameters`): `object`

Defined in: controllers/Login/HandlerSubmit.tsx:59

🔐 useAuthSubmit

Hook personalizado que encapsula la lógica de envío del formulario de login/registro,
incluyendo validaciones, sanitización, control de errores y protección por cooldown.

Funcionalidades clave:
- Valida y sanitiza los inputs.
- Maneja intentos fallidos y aplica un cooldown tras varios errores.
- Abstrae el manejo de `login` y `register`.
- Permite desacoplar la lógica del formulario de la vista.

## Parameters

### \_\_namedParameters

`UseAuthSubmitParams`

## Returns

### error

> **error**: `string`

### loading

> **loading**: `boolean`

### submit()

> **submit**: (`__namedParameters`) => `Promise`\<`void`\>

Envia los datos del formulario y ejecuta login o registro.
Realiza validaciones, aplica cooldown si se excede el límite de intentos,
y maneja errores y redirección.

#### Parameters

##### \_\_namedParameters

`SubmitParams`

#### Returns

`Promise`\<`void`\>
