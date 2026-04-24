const { faker } = require('@faker-js/faker');

/**
 * Genera un usuario dinámico para pruebas.
 *
 * ¿Para qué sirve?
 * - Evita usar datos estáticos (que pueden fallar por duplicados).
 * - Permite que cada ejecución del test sea independiente.
 *
 * ¿Qué retorna?
 * Un objeto con:
 * - name: nombre completo aleatorio
 * - email: correo único en minúsculas (evita conflictos con la API)
 * - password: contraseña aleatoria + sufijo para cumplir reglas de seguridad
 */
function generarUsuario() {
  return {
    // Nombre realista (ej: "Juan Pérez")
    name: faker.person.fullName(),

    // Email aleatorio (ej: "abc123@test.com")
    // toLowerCase() evita problemas si la API es case-sensitive
    email: faker.internet.email().toLowerCase(),

    // Password aleatoria + patrón fijo para cumplir validaciones (mayúscula, número, símbolo)
    password: faker.internet.password() + 'A1!'
  };
}

module.exports = { generarUsuario };