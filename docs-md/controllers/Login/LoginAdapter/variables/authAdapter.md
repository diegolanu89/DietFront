[**frontapp**](../../../../README.md)

***

[frontapp](../../../../README.md) / [controllers/Login/LoginAdapter](../README.md) / authAdapter

# Variable: authAdapter

> `const` **authAdapter**: [`LoginInterface`](../../LoginInterface/interfaces/LoginInterface.md)\<[`AppUser`](../../../../types/User/interfaces/AppUser.md)\>

Defined in: controllers/Login/LoginAdapter.ts:90

✨ authAdapter

Esta constante representa el adaptador de login actual de la aplicación.
Su implementación concreta se decide en tiempo de ejecución mediante la fábrica.

Se recomienda importar esta constante en los contextos, hooks o servicios
que requieran acceso a las funciones de login/logout.

## Example

```ts
import { authAdapter } from './services/auth';
const user = await authAdapter.login({ email, password });
```
