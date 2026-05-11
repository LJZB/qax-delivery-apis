# Challenge 02 - Implementación de Logs

## Objetivo

Implementar un mecanismo reutilizable de logs para pruebas API con Playwright, capturando la información principal de cada petición HTTP y adjuntándola al reporte HTML.

## Alcance

Se extendió el proyecto del Challenge 01 para registrar evidencia técnica de las peticiones realizadas contra el servicio privado de Collections de `restful-api.dev`.

Los logs capturan:

- URL completa.
- Método HTTP.
- Body enviado en el request, cuando aplica.
- Status code devuelto por el servidor.
- Body de la respuesta.

## Estrategia implementada

Se implementó la opción avanzada recomendada por el reto: usar `test.info().attach()` para adjuntar logs en formato JSON al reporte HTML de Playwright.

Esto permite revisar la evidencia directamente desde el reporte sin depender de `console.log` en terminal.

## Estructura implementada

```text
src/
├── helpers/
│   ├── apiLogger.ts
│   └── dataBuilder.ts
├── services/
│   └── CollectionService.ts
└── types/
    └── modelos.ts

tests/
└── collections/
    └── collections.spec.ts
```

## Archivos modificados o agregados

### `src/helpers/apiLogger.ts`

Helper reutilizable encargado de construir y adjuntar logs al reporte HTML.

Funciones principales:

- `buildApiLogData()`
- `attachApiLog()`

`buildApiLogData()` construye el objeto de log con método, URL, body enviado, status y response body.

`attachApiLog()` adjunta el log como archivo JSON usando `test.info().attach()`.

### `src/services/CollectionService.ts`

Se extendió el service para integrar logs en las peticiones HTTP.

Métodos principales:

- `createCollectionObject(collectionName, payload, testInfo)`
- `getCollectionObject(collectionName, objectId, testInfo)`

El parámetro `testInfo` es opcional para no romper el uso previo del service.

### `tests/collections/collections.spec.ts`

Se actualizó el test para:

- Crear un objeto en una collection privada.
- Consultar el objeto creado.
- Pasar `test.info()` al service.
- Generar attachments JSON en el reporte HTML.

## Attachments generados

Al ejecutar el test y abrir el reporte HTML, se generan los siguientes archivos adjuntos:

```text
POST-create-collection-object.json
GET-collection-object.json
```

Estos archivos contienen el detalle del request y response de cada operación.

## Variables de entorno

El proyecto usa `.env` para manejar valores sensibles:

```env
BASE_URL=https://api.restful-api.dev
API_KEY=your_api_key
```

El archivo `.env` está incluido en `.gitignore` y no debe subirse al repositorio.

## Ejecución

Para ejecutar el test y generar reporte HTML:

```bash
npx playwright test tests/collections/collections.spec.ts
```

Para abrir el reporte:

```bash
npx playwright show-report
```

## Resultado esperado

El test debe ejecutarse correctamente:

```text
1 passed
```

En el reporte HTML deben visualizarse los attachments JSON generados para el POST y el GET.

## Aprendizaje

En este challenge se reforzó la trazabilidad de pruebas API:

- Los logs permiten ver qué se envió y qué respondió la API.
- El mecanismo quedó centralizado en un helper reutilizable.
- El service mantiene la lógica HTTP y de logging.
- El test conserva foco en el flujo y las validaciones.
