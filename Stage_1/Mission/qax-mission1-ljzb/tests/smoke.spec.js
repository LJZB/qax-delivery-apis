import { test, expect, request } from "@playwright/test";

test.describe("Smoke Test - Homebanking", () => {
  const baseURL = "https://homebanking-demo.onrender.com";
  let userPassword = "mipassword123";
  let token;

  test("Flujo crítico E2E", async ({ request }) => {
    const timestamp = Date.now();
    const email = `luisqa_${timestamp}@email.com`;
    const username = `user_${timestamp}`;

    // TC-01: Registro de usuario exitoso (HU1 - Autenticación)
    const register = await request.post(`${baseURL}/auth/registro`, {
      data: {
        email,
        name: "Luis QA",
        password: userPassword,
        username,
      },
    });
    expect(register.status()).toBe(200);
    //Fin de registro

    // TC-02: Login exitoso y obtención de token (HU1 - Autenticación)
    const login = await request.post(`${baseURL}/auth/login`, {
      data: {
        password: userPassword,
        username,
      },
    });
    expect(login.status()).toBe(200);
    const loginBody = await login.json();
    token = loginBody.token; //Se obtiene el token del usuario
    // console.log(token)
    //Fin de login

    // TC-03: Consulta de dashboard y obtención de cuentas (HU1 - Perfil y cuentas)
    const dashboard = await request.get(`${baseURL}/cliente/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(dashboard.status()).toBe(200);
    const dashboardBody = await dashboard.json();
    const firstAccountId = dashboardBody.data.accounts[0].id; //Se obtiene el id de la cuenta para agregarle una tarjeta
    const secondAccountId = dashboardBody.data.accounts[1].id; //Se obtiene el id de la cuenta para agregarle una tarjeta
    // console.log(accountId);
    //Fin de dashboard

    // TC-04: Creación de tarjeta asociada a cuenta (HU3 - Tarjetas)
    const tarjeta = await request.post(`${baseURL}/tarjetas/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        id_cuenta_asociada: firstAccountId,
        marca: "Mastercard",
        tipo: "Débito",
      },
    });
    expect(tarjeta.status()).toBe(200);
    // Fin de creación de tarjeta

    // TC-05: Listado de tarjetas del usuario (HU3 - Tarjetas)
    const listarT = await request.get(`${baseURL}/tarjetas/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(listarT.status()).toBe(200);
    // Fin listar tarjetas

    // TC-06: Transferencia exitosa entre cuentas propias (HU2 - Transferencias)
    const transferencia = await request.post(`${baseURL}/transferencias/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        cuenta_destino: secondAccountId,
        cuenta_origen: firstAccountId,
        monto: 100,
        motivo: "Varios",
        tipo: "propia",
      },
    });
    const transferenciaBody = await transferencia.json();
    expect(transferenciaBody.transaccion).toBeTruthy();
    const transferenciaMensaje = transferenciaBody.transaccion.id;

    // TC-07: Validación de transacción generada tras transferencia (HU2 - Transferencias)
    const transacciones = await request.get(`${baseURL}/transacciones/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(transacciones.status()).toBe(200);

    const transaccionesBody = await transacciones.json();
    // console.log(transaccionesBody);
    expect(transaccionesBody.transactions.length).toBeGreaterThan(0);
    // Fin de transferencia

    // TC-08: Pago de servicio exitoso (HU2 - Pagos)
    const pago = await request.post(`${baseURL}/pagos/servicios`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        id_servicio: "SRV001",
        monto: 50,
        id_cuenta: firstAccountId,
      },
    });

    expect(pago.status()).toBe(200);

    const pagoBody = await pago.json();
    expect(pagoBody).toBeTruthy();
    // Fin pago de servicio

    // TC-09: Validación de nuevas transacciones tras pago (HU2 - Pagos)
    const transacciones2 = await request.get(`${baseURL}/transacciones/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(transacciones2.status()).toBe(200);

    const transaccionesBody2 = await transacciones2.json();

    const existeNuevaTransaccion =
      transaccionesBody2.transactions.length >
      transaccionesBody.transactions.length;

    expect(existeNuevaTransaccion).toBeTruthy();
  });
});
