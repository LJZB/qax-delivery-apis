const { test, expect } = require("@playwright/test");

const { generarUsuario } = require("../utils/dataGenerator.js");

// Test para validar el registro de un usuario nuevo en la API
test("debe registrar un usuario correctamente", async ({ request }) => {
  const user = generarUsuario();

  const response = await request.post("users/register", {
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
    },
  });

  expect(response.status()).toBe(201);

  const body = await response.json();
  //console.log(body);

  expect(body.message).toBe("User account created successfully");
  expect(body.data.email).toBe(user.email);
  expect(body.data.name).toBe(user.name);
  expect(body.data.id).toBeDefined();
});
