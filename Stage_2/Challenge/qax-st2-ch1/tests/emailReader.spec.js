const { test, expect } = require("@playwright/test");
// Importa funciones para crear tests y validar resultados

const {
  crearCuentaCorreo,
  obtenerUltimoCorreo,
  extraerTokenDesdeCorreo,
} = require("../utils/emailReader.js");
// Importa función para crear correo temporal

//-----------------------------------------
test("debe leer correo y extraer token desde el link", async () => {
  const usuarioBuzon = `qa_${Date.now()}`;
  // Usuario único para el correo

  const passwordBuzon = "Password123!";
  // Password del buzón

  const cuenta = await crearCuentaCorreo(usuarioBuzon, passwordBuzon);
  // Crea buzón temporal

  console.log(`Correo creado: ${cuenta.email}`);

  // ⚠️ Aquí todavía NO llega ningún correo real
  // En el siguiente paso lo vamos a integrar con forgot-password

  // Simulamos contenido del correo con link real
  const textoSimulado = `
    Hola,
    Haz clic aquí para restablecer tu contraseña:
    https://practice.expandtesting.com/notes/reset-password/abc123tokenfake456
  `;

  const token = extraerTokenDesdeCorreo(textoSimulado);
  // Extrae el token desde el texto

  expect(token).toBeDefined();
  // Valida que encontró el token

  console.log(`Token extraído: ${token}`);
});
