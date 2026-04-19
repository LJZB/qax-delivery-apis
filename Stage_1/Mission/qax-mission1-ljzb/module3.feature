Feature: HU3 - Gestión de Productos Financieros

        Scenario: Solicitud de préstamo válida por parte del usuario
            Given el usuario está autenticado
             When solicita un préstamo con un monto válido
             Then el sistema responde con estado 200
              And la respuesta contiene el campo "id"

        Scenario: Alta de inversiones
            Given el usuario está autenticado
             When constituye un nuevo plazo fijo
             Then el sistema responde con estado 200
              And la respuesta contiene confirmación de la creación de la inversión

        Scenario: Cancelar préstamo existente
            Given el usuario está autenticado y tiene un préstamo activo
             When cancela el préstamo
             Then el sistema responde con estado 200
              And la respuesta confirma la cancelación del préstamo

        Scenario: Dar de baja un plazo fijo
            Given el usuario está autenticado y tiene un plazo fijo activo
             When cancela el plazo fijo
             Then el sistema responde con estado 200
              And la respuesta confirma la cancelación del plazo fijo

        Scenario: Listar tarjetas del usuario
            Given el usuario está autenticado
             When consulta sus tarjetas
             Then el sistema responde con estado 200
              And la respuesta contiene una lista de tarjetas

        Scenario: Crear tarjeta correctamente
            Given el usuario está autenticado
             When solicita la creación de una tarjeta
             Then el sistema responde con estado 200
              And la respuesta contiene el identificador de la tarjeta

        Scenario: Eliminar tarjeta existente
            Given el usuario está autenticado y tiene una tarjeta activa
             When elimina la tarjeta
             Then el sistema responde con estado 200
              And la tarjeta deja de estar en el listado

        Scenario: Eliminar tarjeta inexistente
            Given el usuario está autenticado
             When intenta eliminar una tarjeta inexistente
             Then el sistema responde con estado 400
              And la respuesta contiene un mensaje de error