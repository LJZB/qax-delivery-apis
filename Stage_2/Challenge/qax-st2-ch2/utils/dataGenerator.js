const { faker } = require("@faker-js/faker");

function generarUsuario() {
  return {
    userName: faker.internet.username().toLowerCase(),
    // IMPORTANTE: esta API exige password con:
    // 1 mayúscula, 1 minúscula, 1 número, 1 caracter especial y mínimo 8 chars
    password: "Qa123456!",
  };
}

module.exports = { generarUsuario };
