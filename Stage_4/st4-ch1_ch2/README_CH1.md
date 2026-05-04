# Challenge 01 - Extender proyecto utilizando servicios privados

## Objetivo

Extender el proyecto base del Stage 4 implementando pruebas sobre el servicio privado de Collections de `restful-api.dev`, usando TypeScript, Service Layer y Data Builders.

## Alcance

Se automatizó el flujo de creación de un objeto dentro de una collection privada:

- Servicio: `https://api.restful-api.dev`
- Endpoint usado: `POST /collections/{collectionName}/objects`
- Header requerido: `x-api-key`
- Collection usada: `products`

## Estructura implementada

```text
src/
├── helpers/
│   └── dataBuilder.ts
├── services/
│   └── CollectionService.ts
└── types/
    └── modelos.ts

tests/
└── collections/
    └── collections.spec.ts
```

## Archivos principales

### `src/types/modelos.ts`

Define las interfaces:

- `CollectionRequest`
- `CollectionResponse`

Estas interfaces permiten tipar el payload enviado y la respuesta recibida por la API.

### `src/helpers/dataBuilder.ts`

Contiene la función:

- `buildCollectionPayload()`

Esta función genera datos dinámicos para crear objetos de prueba reutilizables.

### `src/services/CollectionService.ts`

Contiene la clase:

- `CollectionService`

Y el método:

- `createCollectionObject(collectionName, payload)`

Este service encapsula la lógica HTTP para que los tests no llamen directamente a `request.post`.

### `tests/collections/collections.spec.ts`

Contiene el test automatizado que valida la creación de un objeto en una collection usando:

- Service Layer
- Data Builder
- Variables de entorno
- Assertions con Playwright

## Variables de entorno

El proyecto usa un archivo `.env` local con la siguiente estructura:

```env
BASE_URL=https://api.restful-api.dev
API_KEY=your_api_key
```

El archivo `.env` no se sube al repositorio porque contiene información sensible.

## Ejecución

Para ejecutar el challenge:

```bash
npx playwright test tests/collections/collections.spec.ts --reporter=list
```

## Resultado esperado

El test debe finalizar correctamente con:

```text
1 passed
```

## Aprendizaje

En este challenge se reforzó la separación de responsabilidades:

- Los tests contienen la lógica de validación.
- El Service Layer contiene la lógica HTTP.
- El Data Builder genera los datos dinámicos.
- Las variables sensibles se manejan desde `.env`.
