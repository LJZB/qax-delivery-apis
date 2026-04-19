Feature: HU1 - Resumen de cuentas y perfil

        Scenario: Visualizar perfil correctamente
            Given el usuario está autenticado
             When consulta su perfil
             Then el sistema responde con estado 200
              And el perfil del usuario es retornado correctamente

        Scenario: Validar estructura del perfil
            Given el usuario está autenticado
             When consulta su perfil
             Then el sistema responde con estado 200
              And la respuesta contiene los campos "id", "nombre", "email"

        Scenario: El usuario recibe un saludo de bienvenida en su perfil
            Given el usuario está autenticado
             When consulta su perfil
             Then el sistema responde con estado 200
              And la respuesta contiene un mensaje de bienvenida

        Scenario: El usuario visualiza el listado de sus cuentas
            Given el usuario está autenticado
             When consulta su listado de cuentas
             Then el sistema responde con estado 200
              And la respuesta contiene una lista de cuentas

        Scenario:El usuario visualiza el listado de sus cuentas
            Given el usuario está autenticado
             When consulta el listado de cuentas asociadas a él
             Then el sistema responde con estado 200
              And las cuentas listadas muestran los campos 'saldo' y 'moneda'.

        Scenario: El usuario no tiene cuentas
            Given el usuario está autenticado y no tiene cuentas registradas
             When consulta el listado de cuentas
             Then el sistema responde con estado 200
              And la respuesta contiene una lista vacía de cuentas

        Scenario: El usuario visualiza su historial de transacciones
            Given el usuario está autenticado
             When consulta su historial de transacciones
             Then el sistema responde con estado 200
              And la respuesta contiene una lista de transacciones

        Scenario: Validar estructura de las transacciones
            Given el usuario está autenticado
             When consulta su historial de transacciones
             Then cada transacción contiene los campos "fecha", "monto", "concepto"

        Scenario: Validar formato de fecha en transacciones
            Given el usuario está autenticado
             When consulta su historial de transacciones
             Then el campo "fecha" tiene un formato válido

        Scenario: El usuario no tiene transacciones
            Given el usuario está autenticado y no tiene transacciones registradas
             When consulta su historial de transacciones
             Then el sistema responde con estado 200
              And la respuesta contiene una lista vacía de transacciones