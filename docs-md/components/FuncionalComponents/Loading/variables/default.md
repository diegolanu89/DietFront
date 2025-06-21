[**frontapp**](../../../../README.md)

***

[frontapp](../../../../README.md) / [components/FuncionalComponents/Loading](../README.md) / default

# Variable: default

> `const` **default**: `React.FC`\<`LoadingProps`\>

Defined in: components/FuncionalComponents/Loading.tsx:22

Componente `Loading` que muestra una barra de progreso o un spinner animado.

## Param

Si es `true`, se muestra una barra de progreso. Si es `false` o no se especifica, se muestra un spinner.

## Param

El valor porcentual de carga (ej. "70%"), usado solo si `carga` es `true`.

## Param

Texto que se muestra debajo del indicador de carga.

## Returns

El componente visual de carga.

## Example

```ts
<Loading carga={true} nivel="70%" text="Cargando datos..." />
<Loading carga={false} text="Procesando..." />
```
