const { test, expect } = require('@playwright/test');
// Importa funciones de testing

const { generarUsuario } = require('../utils/dataGenerator.js');
// Importa generador de usuario dinámico

// Test para validar login y captura de token
test('debe loguear usuario y retornar token', async ({ request }) => {

  const user = generarUsuario();
  // Genera usuario nuevo

  // Registro previo (necesario para poder hacer login)
  const registerResponse = await request.post('users/register', {
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
    },
  });

  expect(registerResponse.status()).toBe(201);
  // Valida que el usuario se creó correctamente

  // Login con el usuario recién creado
  const loginResponse = await request.post('users/login', {
    data: {
      email: user.email,
      password: user.password,
    },
  });

  expect(loginResponse.status()).toBe(200);
  // Valida login exitoso

  const body = await loginResponse.json();
  // Convierte respuesta a JSON

  expect(body.data.token).toBeDefined();
  // Valida que venga el token

});