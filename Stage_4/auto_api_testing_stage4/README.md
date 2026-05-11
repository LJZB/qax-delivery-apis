# Warmup 4 - Playwright con TypeScript

## Objetivo

Implementar un proyecto base de automatización API usando Playwright con TypeScript, aplicando interfaces, Service Layer, variables de entorno y tags para organizar la ejecución de pruebas.

## API utilizada

JSONPlaceholder

Base URL configurada mediante variable de entorno:

```bash
BASE_URL=https://jsonplaceholder.typicode.com
```

## Estructura del proyecto

```text
auto_api_testing_stage4/
├── src/
│   ├── types/
│   │   └── post.types.ts
│   └── services/
│       └── PostService.ts
├── tests/
│   └── posts.spec.ts
├── .env
├── tsconfig.json
├── package.json
└── playwright.config.ts
```

## Implementación

Se crearon interfaces en `src/types/post.types.ts` para tipar el request y response del recurso posts.

Se creó `PostService` en `src/services/PostService.ts` para centralizar las llamadas HTTP:

- `getPost(id: number)`
- `createPost(post)`

Los tests usan el Service Layer, por lo que no llaman directamente a `request.get` o `request.post`.

## Casos automatizados

- `GET /posts/:id` valida que un post se obtiene correctamente y retorna status `200`.
- `POST /posts` valida que un post se crea correctamente y retorna status `201`.

## Tags utilizados

- `@smoke`
- `@get`
- `@post`
- `@regresion`

## Comandos de ejecución

Ejecutar todos los tests del warmup:

```bash
npx playwright test tests/posts.spec.ts --reporter=list
```

Validar TypeScript sin generar archivos compilados:

```bash
npx tsc --noEmit
```

## Resultado

Los tests fueron ejecutados correctamente:

```text
2 passed
```

## Entrega

Rama utilizada:

```text
feature/st4-wu
```
