const { test, expect } = require('@playwright/test');
const { generarUsuario } = require('../utils/dataGenerator.js'); //causa error
// const faker = require('@faker-js/faker').faker;

test('debe generar un usuario válido', () => {
  const user = generarUsuario();

  console.log(user);

  expect(user.name).toBeTruthy();
  expect(user.email).toContain('@');
  expect(user.password.length).toBeGreaterThan(5);
});