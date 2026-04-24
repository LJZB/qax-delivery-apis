# Challenge 2 - Automatización API BookStore con Playwright

## Objetivo / Historia de usuario

Como QA automatizador, se requiere validar el flujo completo de registro, autenticación y consumo de endpoints protegidos en la BookStore API, asegurando que el sistema permita agregar libros a un usuario autenticado correctamente.

---

## Criterios de aceptación

- Crear usuario correctamente (HTTP 201)
- Generar token válido (HTTP 200)
- Acceder a endpoint protegido con token (HTTP 200)
- Obtener listado de libros
- Extraer ISBN dinámicamente
- Agregar libro al usuario (HTTP 201)
- Validar errores:
  - Usuario inválido → 400
  - Token inválido → respuesta de fallo
  - Sin token → 401

---

## Estrategia de prueba

### Casos

- Flujo positivo completo E2E
- Creación de usuario inválido
- Generación de token inválido
- Acceso sin autenticación

### Datos

- Usuario dinámico generado con Faker
- Password válido según reglas de la API
- ISBN obtenido dinámicamente desde la API

### Precondiciones

- API disponible en https://demoqa.com
- Proyecto Playwright configurado

---

## Ejecución

Ejecutar desde la raíz del proyecto:

npx playwright test

---

## Resultados

- 8 tests ejecutados
- 8 tests exitosos
- Flujo completo validado correctamente

Se evidencia:

- Integración entre endpoints
- Uso correcto de token JWT
- Manejo de errores en escenarios negativos

---

## Estructura del proyecto

tests/
bookstore.spec.js

utils/
dataGenerator.js

playwright.config.js

---

## Evidencias

Se recomienda adjuntar:

- Captura de ejecución en consola
- Reporte HTML de Playwright

Ruta sugerida:
evidencias/
