[**frontapp**](../../../../README.md)

***

[frontapp](../../../../README.md) / [components/FuncionalComponents/ThemedLinearProgress](../README.md) / default

# Function: default()

> **default**(`props`): `Element`

Defined in: components/FuncionalComponents/ThemedLinearProgress.tsx:20

Componente personalizado de barra de progreso lineal con estilo temático.
Utiliza un degradado suave en tonos beige y bordes redondeados.

Este componente extiende las propiedades estándar de `LinearProgress` y
permite agregar estilos adicionales mediante la prop `sx`.

📌 Ejemplo de uso:
```tsx
<ThemedLinearProgress variant="determinate" value={70} />
```

## Parameters

### props

`LinearProgressProps`

Props de `LinearProgress` incluyendo `variant`, `value`, etc.

## Returns

`Element`

JSX.Element - Barra de progreso estilizada.
