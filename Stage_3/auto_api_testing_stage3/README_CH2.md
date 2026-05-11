# Stage 3 - Challenge 2: Flujo E2E profesional con Playwright

## Objetivo

Implementar un flujo end-to-end completo para validar el ciclo de vida de un producto en la API, usando Playwright, modelos, Service Layer y pasos documentados con `test.step`.

## Alcance

Se automatizó el siguiente flujo:

- `POST /objects`: crear un producto inicial.
- `GET /objects/{id}`: verificar que el producto fue creado correctamente.
- `PUT /objects/{id}`: reemplazar completamente el producto.
- `GET /objects/{id}`: validar que el reemplazo quedó persistido.
- `PATCH /objects/{id}`: actualizar parcialmente el producto.
- `GET /objects/{id}`: validar que solo cambió el campo enviado y que el resto de datos se mantiene.

## API utilizada

```text
https://api.restful-api.dev
```

## Tecnologías usadas

- Playwright
- JavaScript
- Node.js
- dotenv

## Arquitectura aplicada

El proyecto usa una separación por capas:

- `ProductRequest.js`: modelo para construir el body enviado en `POST` y `PUT`.
- `ProductResponse.js`: modelo para leer y validar la respuesta de la API.
- `ProductService.js`: capa de servicio que centraliza las llamadas HTTP.
- `products_flow.spec.js`: archivo de pruebas del Challenge 2.

## Archivo principal

```text
tests/products_flow.spec.js
```

## Flujo validado

```text
POST → GET → PUT → GET → PATCH → GET
```

## Ejecución

Desde la carpeta del proyecto:

```bash
npx playwright test tests/products_flow.spec.js
```

## Ejecución con reporte en consola

```bash
npx playwright test tests/products_flow.spec.js --reporter=list
```

## Ver reporte HTML

```bash
npx playwright show-report
```

## Validaciones principales

- El producto inicial se crea correctamente y retorna un `id`.
- El producto creado puede consultarse usando el `productId` generado.
- El `PUT` reemplaza completamente los datos del producto.
- El `GET` posterior al `PUT` confirma la persistencia del reemplazo.
- El `PATCH` actualiza únicamente el campo enviado.
- El `GET` final confirma que el cambio parcial se aplicó sin afectar otros datos.
- El flujo reutiliza dinámicamente el `productId` generado en el `POST`.

## Resultado esperado

La prueba debe finalizar correctamente con estado `passed`, validando el ciclo de vida completo del producto desde su creación hasta su actualización parcial.
