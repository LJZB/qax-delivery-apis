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
  let cuentaCorreo;

  const newPassword = "NewPassword123!";
  const passwordBuzon = "Password123!";

  test.beforeAll(async ({ request }) => {
    const usuarioBuzon = `qa_${Date.now()}`;
    cuentaCorreo = await crearCuentaCorreo(usuarioBuzon, passwordBuzon);

    const baseUser = generarUsuario();

    user = {
      name: baseUser.name,
      email: cuentaCorreo.email,
      password: baseUser.password,
    };

    const response = await request.post("users/register", {
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    expect(response.status()).toBe(201);
  });

  test("debe recuperar contraseña y permitir login con la nueva contraseña", async ({
    request,
  }) => {
    // Solicita recuperación de contraseña
    const forgotResponse = await request.post("users/forgot-password", {
      data: {
        email: user.email,
      },
    });

    expect(forgotResponse.status()).toBe(200);

    // Lee el correo real y extrae el token del link
    const textoCorreo = await obtenerUltimoCorreo(cuentaCorreo.token);
    const resetToken = extraerTokenDesdeCorreo(textoCorreo);

    expect(resetToken).not.toBeNull();

    // Verifica que el token sea válido
    const verifyResponse = await request.post(
      "users/verify-reset-password-token",
      {
        form: {
          token: resetToken,
        },
      },
    );

    expect(verifyResponse.status()).toBe(200);

    // Restablece la contraseña
    const resetResponse = await request.post("users/reset-password", {
      form: {
        token: resetToken,
        newPassword,
      },
    });

    expect(resetResponse.status()).toBe(200);

    // Valida login con la nueva contraseña
    const loginResponse = await request.post("users/login", {
      data: {
        email: user.email,
        password: newPassword,
      },
    });

    expect(loginResponse.status()).toBe(200);
  });
});