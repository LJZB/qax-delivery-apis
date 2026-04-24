# Challenge 1 - Flujo de recuperación de contraseña

## Título de la entrega
Automatización E2E del flujo de recuperación de contraseña usando Playwright (API Testing)

---

## Objetivo / Historia de usuario

**Como** usuario de la aplicación "Notes" que olvidó su contraseña,  
**Quiero** solicitar un enlace de recuperación, validar el token recibido por correo y restablecer mi contraseña,  
**Para** poder acceder nuevamente a mi cuenta de forma segura.

Este flujo se implementa como un escenario End-to-End real, integrando múltiples endpoints y el consumo de correo electrónico.

---

## Criterios de aceptación

1. Registrar un usuario dinámico antes de iniciar el flujo  
2. Ejecutar `POST /users/forgot-password` con el email del usuario  
3. Obtener el correo de recuperación y extraer el token desde el link  
4. Validar el token mediante `POST /users/verify-reset-password-token`  
5. Restablecer la contraseña mediante `POST /users/reset-password`  
6. Validar el flujo completo realizando login con la nueva contraseña  

> Nota: En la implementación real, el token no viene en el response, sino en el correo, por lo que se integró lectura de emails usando Mail.tm

---

## Estrategia de prueba

### Tipo de prueba
- Prueba End-to-End (E2E)
- Validación de flujo completo de negocio

### Datos de prueba
- Usuario generado dinámicamente con Faker (`generarUsuario`)
- Email generado mediante Mail.tm (`crearCuentaCorreo`)
- Password nueva definida en test (`newPassword`)

### Precondiciones
- La API debe estar disponible
- El usuario debe ser creado antes de ejecutar el flujo
- El buzón temporal debe estar activo

---

## Ejecución

### Comando de ejecución

```bash
npx playwright test tests/forgot-password.spec.js