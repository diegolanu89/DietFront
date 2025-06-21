[**frontapp**](../../../../README.md)

***

[frontapp](../../../../README.md) / [components/FuncionalComponents/ProtectedRoute](../README.md) / default

# Function: default()

> **default**(): `Element`

Defined in: components/FuncionalComponents/ProtectedRoute.tsx:21

`ProtectedRoute` es un componente de protección de rutas que verifica si el usuario está autenticado.
Si el usuario está autenticado, permite el acceso a la ruta anidada mediante `<Outlet />`.
Si no lo está, redirige automáticamente a la página de login.

Este componente debe usarse dentro de las rutas que requieren autenticación.

## Returns

`Element`

Componente que protege las rutas según el estado de autenticación.

## Example

```ts
<Route path="/dashboard" element={<ProtectedRoute />}>
  <Route index element={<Dashboard />} />
</Route>
```
