[**frontapp**](../../../README.md)

***

[frontapp](../../../README.md) / [utils/Utils](../README.md) / Utils

# Class: Utils

Defined in: utils/Utils.ts:6

Clase estática de utilidades generales para procesamiento de strings, colores y nombres.

Todos los métodos son estáticos, por lo que se usan directamente como `Utils.metodo()`.

## Constructors

### Constructor

> **new Utils**(): `Utils`

#### Returns

`Utils`

## Methods

### isColorClaro()

> `static` **isColorClaro**(`colorName`): `boolean`

Defined in: utils/Utils.ts:31

Determina si un color CSS es visualmente claro, utilizando el modelo de luminosidad.

#### Parameters

##### colorName

`string`

Nombre del color (por ejemplo: "white", "#f1f1f1", "rgb(200,200,200)").

#### Returns

`boolean`

`true` si el color es claro, `false` si es oscuro.

#### Example

```ts
Utils.isColorClaro('white') // true
Utils.isColorClaro('#000000') // false
```

***

### obtenerIniciales()

> `static` **obtenerIniciales**(`nombre`): `string`

Defined in: utils/Utils.ts:58

Devuelve las iniciales de un nombre completo.

#### Parameters

##### nombre

`string`

El nombre completo (por ejemplo: "Leonella Canepa").

#### Returns

`string`

Un string con las iniciales en mayúscula (por ejemplo: "LC").

#### Example

```ts
Utils.obtenerIniciales('Juan Pérez') // "JP"
Utils.obtenerIniciales('ana maria lopez') // "AML"
```

***

### primeraLetraEnMayuscula()

> `static` **primeraLetraEnMayuscula**(`str`): `string`

Defined in: utils/Utils.ts:17

Devuelve un string con la primera letra en mayúscula y el resto en minúscula.

#### Parameters

##### str

`string`

El string de entrada.

#### Returns

`string`

El string con la primera letra en mayúscula.

#### Example

```ts
Utils.primeraLetraEnMayuscula('hola') // "Hola"
Utils.primeraLetraEnMayuscula('MUNDO') // "Mundo"
```

***

### stringToColor()

> `static` **stringToColor**(`str`): `string`

Defined in: utils/Utils.ts:75

Convierte un string en un color hexadecimal consistente. Útil para generar colores de avatares.

#### Parameters

##### str

`string`

El string de entrada.

#### Returns

`string`

Un color hexadecimal generado a partir del string.

#### Example

```ts
Utils.stringToColor('Leonella') // "#a53f73" (el color depende del string)
Utils.stringToColor('Diego')    // "#6f832c"
```
