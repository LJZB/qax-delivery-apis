## Descripción
Se automatizaron los casos de prueba del Challenge 1 utilizando Playwright, cubriendo el flujo completo de autenticación y seguridad del usuario.

## Alcance
Se implementaron pruebas para los siguientes endpoints:
- GET /users/profile
- POST /users/change-password
- POST /users/forgot-password
- POST /users/verify-reset-password-token
- POST /users/reset-password

## Estrategia
- Se utilizó `beforeAll` para registrar un usuario y obtener un token válido.
- Se reutilizó el token en los endpoints que requieren autenticación.
- Para los endpoints de recuperación de contraseña, se utilizaron datos simulados (mock) debido a la limitación de acceso al correo.

## Validaciones realizadas
- Códigos de estado HTTP (200, 400, 401)
- Estructura y contenido de las respuestas JSON
- Flujo completo de autenticación y recuperación de contraseña

## Archivos incluidos
- tests/perfil-seguridad.spec.js
- playwright.config.js
- package.json
- README.md

## Resultado
Todos los tests fueron ejecutados correctamente y pasan en el reporte de Playwright.

## Notas
- No se automatizó la obtención del token por correo, ya que el entorno no lo permite.
- Se utilizaron valores mock para validar los endpoints de verificación y reset de contraseña.