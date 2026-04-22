import { test, expect, request } from '@playwright/test';

test.describe('Smoke Test - Homebanking', () => {
  const baseURL = 'https://homebanking-demo.onrender.com';
  let userEmail;
  let userAccount;
  let userPassword = 'mipassword123';
  let token;

  test('Flujo crítico E2E', async ({request}) => {
    const timestamp = Date.now();
    const email = `luisqa_${timestamp}@email.com`;
    const username = `user_${timestamp}`;

    // Registro de nuevo usuario
    const register = await request.post(`${baseURL}/auth/registro`, {
    data: {
      email,
      name: 'Luis QA',
      password: userPassword,
      username
    }
    });
    expect(register.status()).toBe(200);
    //Fin de registro

    //Inicio de login
    const login = await request.post(`${baseURL}/auth/login`, {
    data: {
      password: userPassword,
      username
    }
    });
    expect(login.status()).toBe(200);
    const loginBody = await login.json();
    token = loginBody.token; //Se obtiene el token del usuario
    // console.log(token)
    //Fin de login

    //Inicio de dashboard
    const dashboard = await request.get(`${baseURL}/cliente/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
    });
    expect(dashboard.status()).toBe(200);
    const dashboardBody = await dashboard.json();
    const firstAccountId = dashboardBody.data.accounts[0].id; //Se obtiene el id de la cuenta para agregarle una tarjeta
    const secondAccountId = dashboardBody.data.accounts[1].id; //Se obtiene el id de la cuenta para agregarle una tarjeta
    // console.log(accountId);
    //Fin de dashboard

    // Inicio de creación de tarjeta
    const tarjeta = await request.post(`${baseURL}/tarjetas/`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      id_cuenta_asociada: firstAccountId,
      marca: "Mastercard",
      tipo: "Débito"
    }
    });
    expect(tarjeta.status()).toBe(200);
    // Fin de creación de tarjeta

    // Inicio listar tarjetas
    const listarT = await request.get(`${baseURL}/tarjetas/`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    });
    expect(listarT.status()).toBe(200);
    //const bodyTarjetas = await listarT.json();
    // Fin listar tarjetas

    // Inicio de transferencia
    const transferencia = await request.post(`${baseURL}/transferencias/`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      cuenta_destino: secondAccountId,
      cuenta_origen: firstAccountId,
      monto: 100,
      motivo: "Varios",
      tipo: "propia"
    }
    });
    expect(transferencia.status()).toBe(200);
    const transferenciaBody = await transferencia.json();
    const transferenciaMensaje = transferenciaBody.transaccion.id;
    console.log(transferenciaMensaje);
    // Fin de transferencia
  });
});