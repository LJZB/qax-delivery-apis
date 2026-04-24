const { test, expect } = require("@playwright/test");
const { generarUsuario } = require("../utils/dataGenerator.js");
const {
  crearCuentaCorreo,
  obtenerUltimoCorreo,
  extraerTokenDesdeCorreo,
} = require("../utils/emailReader.js");

// Flujo completo de recuperación de contraseña
test.describe("flujo de recuperación de contraseña", () => {
  let user;
  let resetToken;
  let cuentaCorreo;
  const newPassword = "NewPassword123!";
  const passwordBuzon = "Password123!";

  // Se ejecuta antes de los tests
  test.beforeAll(async ({ request }) => {
    const usuarioBuzon = `qa_${Date.now()}`;
    // Genera nombre único para el correo

    cuentaCorreo = await crearCuentaCorreo(usuarioBuzon, passwordBuzon);
    // Crea buzón temporal real

    user = {
      ...generarUsuario(), //genera un usuario nuevo con Faker, los ... son para copiar las propiedades
      email: cuentaCorreo.email, //sobreescribe el correo que se hizo con generarUsuario().
    };

    const response = await request.post("users/register", {
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    expect(response.status()).toBe(201);
    // Asegura que el usuario existe antes del flujo
  });

  //Inicio de Test
  test("flujo completo recuperación de contraseña", async ({ request }) => {
    // 1. Solicita recuperación de contraseña
    const forgotResponse = await request.post("users/forgot-password", {
      data: {
        email: user.email,
        // Usa el correo temporal creado
      },
    });

    expect(forgotResponse.status()).toBe(200);
    // Valida que la solicitud fue exitosa

    // 2. Lee el correo real desde Mail.tm
    const textoCorreo = await obtenerUltimoCorreo(cuentaCorreo.token);
    // Obtiene el contenido del último correo recibido

    // console.log("Contenido del correo:", textoCorreo);

    // 3. Extrae el token del link
    resetToken = extraerTokenDesdeCorreo(textoCorreo);

    // console.log("Token extraído:", resetToken);

    expect(resetToken).not.toBeNull();
    // Valida que se pudo extraer el token

    // 4. Verifica que el token sea válido
    const verifyResponse = await request.post(
      "users/verify-reset-password-token",
      {
        form: {
          token: resetToken,
          // Envía el token extraído del correo
        },
      },
    );
    expect(verifyResponse.status()).toBe(200);
    // Valida que el token es válido y no ha expirado

    // 5. Restablece la contraseña
    const resetResponse = await request.post("users/reset-password", {
      data: {
        form: resetToken,
        // Token válido extraído del correo

        newPassword: newPassword,
        // Nueva contraseña definida en el test
      },
    });
    expect(resetResponse.status()).toBe(200);
    // Valida que el reset fue exitoso

    // 6. Login con la nueva contraseña
    const loginResponse = await request.post("users/login", {
      data: {
        email: user.email,
        password: newPassword,
        // Usa la nueva contraseña
      },
    });

    expect(loginResponse.status()).toBe(200);
    // Valida que el login funciona con la nueva contraseña
  });
});
