# Challenge 1 - API Testing

## Título de la entrega

Pruebas de API para gestión de usuario

## Objetivo / Historia de usuario

Como usuario del sistema, quiero poder consultar mi perfil, cambiar mi contraseña y recuperarla en caso de olvido, para gestionar mi acceso de forma segura.

## Criterios de aceptación

* GET /users/profile debe retornar 200 con token válido
* GET /users/profile debe retornar 401 sin token
* POST /users/change-password debe permitir cambiar la contraseña con datos válidos
* Flujo de recuperación de contraseña (forgot/reset) debe completarse correctamente

## Estrategia de prueba

Se diseñaron casos de prueba positivos y negativos basados en los criterios de aceptación, validando:

* Autenticación mediante token
* Validación de datos de entrada
* Comportamiento del sistema ante errores

## Ejecución

Las pruebas se ejecutaron usando Postman:

1. Registro e inicio de sesión para obtener token
2. Consulta de perfil
3. Cambio de contraseña
4. Flujo de recuperación (forgot → reset → login)

## Resultados

* Se validó correctamente el flujo completo de autenticación
* Se evidenció que la contraseña antigua deja de ser válida tras el cambio
* Todas las respuestas cumplen con los códigos HTTP esperados

## Evidencias

* Colección de Postman exportada (.json)
* Archivo de escenarios en Gherkin (.feature)
