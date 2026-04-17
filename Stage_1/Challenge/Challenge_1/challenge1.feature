Feature: Perfil de usuario
	Scenario: Obtener perfil con Token válido
		Given el usuario tiene un token de autenticación válido
		When el usuario envía una petición GET a /users/profile con el token
		Then el código de respuesta debe ser 200
		And la respuesta contiene lso campos id, name y email
	Scenario: Enviar la petición con token inválido
		Given el usuario tiene un token de autenticación inválido
		When el usuario envía una petición GET a /users/profile con con el header x-auth-token
		Then el código de respuesta debe ser 401
	Scenario: Cambiar contraseña con datos válidos
		Given el usuario tiene un token de autenticación válido
		And el usuario conoce su contraseña actual correcta
		When el usuario envía una petición POST a /users/change-password con currentPassword y newPassword válidos
		Then el código de respuesta debe ser 200
		And la contraseña se actualiza correctamente
	Scenario: Cambiar contraseña con password actual incorrecta
		Given el usuario tiene un token de autenticación válido
		And el usuario ingresa una contraseña actual incorrecta
		When el usuario envía una petición POST a /users/change-password
		Then el código de respuesta debe ser 400 
	Scenario: Cambiar contraseña con nueva contraseña inválida
		Given el usuario tiene un token de autenticación válido
		And el usuario ingresa una nueva contraseña inválida
		When el usuario envía una petición POST a /users/change-password
		Then el código de respuesta debe ser 400
	Scenario: Solicitar recuperación de contraseña con email válido
		Given el usuario tiene un email registrado
		When el usuario envía una petición POST a /users/forgot-password con el email
		Then el código de respuesta debe ser 200
		And se envía un token de recuperación al correo
	Scenario: Restablecer contraseña con token válido
		Given el usuario tiene un token de recuperación válido
		When el usuario envía una petición POST a /users/reset-password con el token y una nueva contraseña válida
		Then el código de respuesta debe ser 200
		And la contraseña se actualiza correctamente
	Scenario: Iniciar sesión con la nueva contraseña
		Given el usuario ha restablecido su contraseña correctamente
		When el usuario envía una petición POST a /users/login con la nueva contraseña
		Then el código de respuesta debe ser 200
	Scenario: Intentar iniciar sesión con la contraseña antigua
		Given el usuario ha cambiado su contraseña
		When el usuario envía una petición POST a /users/login con la contraseña anterior
		Then el código de respuesta debe ser 401