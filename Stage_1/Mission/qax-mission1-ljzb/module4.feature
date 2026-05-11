Feature: HU4 - Administración del sistema
        Scenario: Resetear datos del sistema correctamente
            Given el usuario está autenticado como QA
             When ejecuta el reset del sistema
             Then el sistema responde con estado 200
              And los datos se restablecen a su estado inicial