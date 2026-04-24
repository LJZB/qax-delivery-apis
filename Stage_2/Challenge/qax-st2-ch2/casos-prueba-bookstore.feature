# Casos de prueba - Challenge 2 BookStore API

Feature: Registro y acceso seguro a BookStore API
    Como QA automatizador
    Quiero validar el registro, autenticación y consumo de endpoints protegidos
    Para asegurar que la API permita agregar libros a un usuario autenticado correctamente

        Scenario: Crear usuario con datos inválidos
            Given se envía una petición POST al endpoint /Account/v1/User
              And el userName se envía vacío
              And el password no cumple las reglas requeridas
             When se ejecuta la solicitud de creación de usuario
             Then la API debe responder con HTTP 400
              And el cuerpo de la respuesta debe contener información del error

        Scenario: Generar token con credenciales inválidas
            Given se tienen credenciales incorrectas
             When se envía una petición POST al endpoint /Account/v1/GenerateToken
             Then la API debe responder con HTTP 200
              And el cuerpo de la respuesta debe indicar "User authorization failed"

        Scenario: Acceder a endpoint protegido sin token
            Given existe un userId válido
              And no se envía el header Authorization
             When se envía una petición GET al endpoint /Account/v1/User/{userId}
             Then la API debe responder con HTTP 401
              And el cuerpo de la respuesta debe contener el mensaje "User not authorized"
              And el código de error debe ser 1200

        Scenario: Flujo completo de usuario
            Given se genera un usuario dinámico válido
              And se crea el usuario mediante POST /Account/v1/User
              And se obtiene un token mediante POST /Account/v1/GenerateToken
              And se consulta el usuario mediante GET /Account/v1/User/{userId} usando Authorization Bearer
              And se obtiene la lista de libros mediante GET /BookStore/v1/Books
              And se extrae el ISBN del primer libro
             When se envía una petición POST a /BookStore/v1/Books con el userId y el ISBN
             Then la API debe responder con HTTP 201
              And el libro debe quedar asociado al usuario autenticado
