Mission 1 - Automatización de APIs (Homebanking)
🎯 Objetivo

Diseñar e implementar una estrategia de pruebas para validar una API de Homebanking, asegurando que el flujo crítico del negocio funcione correctamente antes de una salida a producción.

🧠 Análisis y Estrategia

A partir de la documentación Swagger, el sistema fue analizado desde una perspectiva de negocio.

Hallazgos clave:

El sistema gira en torno a la autenticación y operaciones financieras
El mayor riesgo es el manejo incorrecto del dinero (transferencias y pagos)
Existen dependencias (ej: se requiere una tarjeta para poder transferir)
Estrategia de pruebas

Dado el tiempo limitado, se definió:

Diseño de casos en Gherkin para cobertura funcional
Implementación de un único Smoke Test E2E para validar el flujo crítico
🧪 Diseño de Casos de Prueba (Gherkin)

Se diseñaron más de 20 casos cubriendo:

HU1 - Perfil y Cuentas
Consulta de perfil
Validación de estructura
Listado de cuentas y saldos
Historial de transacciones
Casos sin datos
HU2 - Transferencias y Pagos
Transferencias exitosas
Fondos insuficientes
Pagos de servicios
Validaciones de entrada
HU3 - Productos Financieros
Préstamos
Plazos fijos
Tarjetas (crear, listar, eliminar)
HU4 - Administración
Reset del sistema
🔥 Smoke Test (Flujo Crítico)

Se implementó un único test End-to-End que valida el comportamiento mínimo del sistema:

Registro de usuario
Login
Consulta de dashboard
Creación de tarjeta
Transferencia de dinero
Validación de transacción generada
Pago de servicio
Validación de nuevas transacciones
🤖 Automatización (Playwright)

Se implementó un solo test E2E que cubre el flujo crítico completo.

Características:

Datos dinámicos (usuarios con timestamp)
Sin uso de IDs hardcodeados
Autenticación mediante token
Validación de respuestas y comportamiento del sistema
📬 Pruebas Manuales (Postman)
Importación de colección desde OpenAPI
Validación de endpoints
Uso de variables (baseUrl, token)
Guardado de ejemplos de respuesta
⚙️ Ejecución del Proyecto
Instalar dependencias

npm install

Ejecutar el test

npx playwright test

📁 Estructura del Proyecto

/tests → Test de Playwright (Smoke E2E)
/features → Casos en Gherkin
/playwright.config → Configuración

🧹 .gitignore

Se excluyen:

node_modules
test-results
archivos temporales
🚀 Notas Finales
Se priorizó la confiabilidad del flujo crítico
El Smoke Test valida la operatividad mínima del sistema
La base permite extender a pruebas de regresión
