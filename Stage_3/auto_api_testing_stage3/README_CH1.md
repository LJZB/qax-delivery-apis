# Stage 3 - Challenge 1: Extendiendo el Service Layer con PUT y PATCH

## Objetivo

Implementar pruebas automatizadas para validar operaciones CRUD sobre la API de productos, extendiendo el ProductService con soporte para PUT y PATCH.

## Alcance

Se automatizó el siguiente flujo:

- POST /objects: crear un producto.
- GET /objects/{id}: verificar que el producto fue creado.
- PUT /objects/{id}: reemplazar completamente el producto.
- GET /objects/{id}: validar que el reemplazo se guardó correctamente.
- PATCH /objects/{id}: actualizar parcialmente el producto.
- GET /objects/{id}: validar que el cambio parcial no afectó otros campos.

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

- ProductRequest.js: modelo para construir el body enviado en POST y PUT.
- ProductResponse.js: modelo para leer y validar la respuesta de la API.
- ProductService.js: capa de servicio que centraliza las llamadas HTTP.
- products_crud.spec.js: archivo de pruebas del Challenge 1.

## Archivo principal

```text
tests/products_crud.spec.js
```

## Ejecución

Desde la carpeta del proyecto:

```bash
npx playwright test tests/products_crud.spec.js
```

## Ejecución con reporte en consola

```bash
npx playwright test tests/products_crud.spec.js --reporter=list
```

## Ver reporte HTML

```bash
npx playwright show-report
```

## Validaciones principales

- El producto se crea correctamente y retorna un id.
- El producto creado puede consultarse por id.
- El PUT reemplaza completamente los datos del producto.
- El PATCH actualiza solo el campo enviado.
- Los valores no modificados se mantienen después del PATCH.
- El flujo reutiliza dinámicamente el productId generado por el POST.

## Resultado esperado

La prueba debe finalizar correctamente con estado passed, validando el flujo completo de creación, consulta, reemplazo y actualización parcial del producto.