// Importamos faker para generar datos dinámicos en cada ejecución.
const { faker } = require("@faker-js/faker");

// Genera un usuario válido para el endpoint POST /users.
function generarUsuario() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: "Password123",
    avatar: faker.image.avatar(),
  };
}

// Genera una categoría válida para el endpoint POST /categories.
function generarCategoria() {
  return {
    name: `Category ${faker.string.alphanumeric(8)}`,
    image: faker.image.url(),
  };
}

// Genera un producto válido asociado a una categoría existente.
function generarProducto(categoryId) {
  return {
    title: `Product ${faker.commerce.productName()} ${faker.string.alphanumeric(5)}`,
    price: Number(faker.commerce.price({ min: 10, max: 500, dec: 0 })),
    description: faker.commerce.productDescription(),
    categoryId,
    images: [faker.image.url()],
  };
}

// Exportamos las funciones para usarlas en los tests.
module.exports = {
  generarUsuario,
  generarCategoria,
  generarProducto,
};
