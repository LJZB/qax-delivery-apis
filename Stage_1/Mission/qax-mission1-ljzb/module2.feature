Feature: HU2 - Transferencias y pago de servicios

        Scenario: Transferencia exitosa con saldo suficiente
            Given el usuario está autenticado y tiene saldo suficiente
             When realiza una transferencia a otra cuenta
             Then el sistema responde con estado 200
              And la transferencia se realiza exitosamente

        Scenario: Validar comprobante de transferencia
            Given el usuario está autenticado y realiza una transferencia
             When la operación es exitosa
             Then la respuesta contiene un comprobante o identificador de la operación

        Scenario: Validar descuento de saldo tras transferencia
            Given el usuario está autenticado con saldo inicial conocido
             When realiza una transferencia
             Then el saldo de la cuenta se reduce correctamente

        Scenario: Transferencia con fondos insuficientes
            Given el usuario está autenticado sin saldo suficiente
             When intenta transferir un monto mayor a su saldo
             Then el sistema responde con estado 400
              And la respuesta contiene un mensaje de error

        Scenario: Validar mensaje de error por fondos insuficientes
            Given el usuario está autenticado sin saldo suficiente
             When intenta realizar una transferencia
             Then la respuesta contiene un mensaje indicando fondos insuficientes
  
        Scenario: Pago de servicio exitoso
            Given el usuario está autenticado y tiene saldo suficiente
             When realiza el pago de un servicio
             Then el sistema responde con estado 200
              And el pago se registra correctamente

        Scenario: Validar confirmación de pago de servicio
            Given el usuario está autenticado y realiza un pago
             When la operación es exitosa
             Then la respuesta contiene confirmación del pago

        Scenario: Validar descuento de saldo tras pago de servicio
            Given el usuario está autenticado con saldo inicial conocido
             When realiza un pago de servicio
             Then el saldo de la cuenta se reduce correctamente

        Scenario: Transferencia con monto inválido
            Given el usuario está autenticado
             When intenta transferir un monto igual o menor a cero
             Then el sistema responde con estado 400
              And la respuesta contiene un mensaje de error

        Scenario: Pago de servicio con monto inválido
            Given el usuario está autenticado
             When intenta pagar un servicio con un monto inválido
             Then el sistema responde con estado 400
              And la respuesta contiene un mensaje de error