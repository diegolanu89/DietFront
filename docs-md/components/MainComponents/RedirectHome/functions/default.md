[**frontapp**](../../../../README.md)

***

[frontapp](../../../../README.md) / [components/MainComponents/RedirectHome](../README.md) / default

# Function: default()

> **default**(): `null` \| `Element`

Defined in: components/MainComponents/RedirectHome.tsx:23

Componente que redirige automáticamente al usuario según su estado de autenticación.

- Si el usuario está autenticado, lo redirige a `PATHS.HOME`.
- Si no está autenticado, lo redirige a `PATHS.LOGIN`.

Se utiliza un pequeño retraso (100ms) con `setTimeout` para permitir que el estado de autenticación
se resuelva adecuadamente antes de realizar la redirección. Esto previene redirecciones incorrectas
mientras se inicializa el contexto de autenticación.

📌 Ejemplo de uso:
```tsx
<Route path="*" element={<RedirectHome />} />
```

## Returns

`null` \| `Element`
