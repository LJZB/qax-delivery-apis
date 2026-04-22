import { test, expect, request } from '@playwright/test';

test.describe('Smoke Test - Homebanking', () => {
  const baseURL = 'https://homebanking-demo.onrender.com';
  let token;
  let userEmail;
  let userAccount;
  let userPassword = 'mipassword123';


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
    const token = loginBody.token; //Se obtiene el token del usuario
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
    const accountId = dashboardBody.data.accounts[0].id; //Se obtiene el id de la cuenta para agregarle una tarjeta
    // console.log(accountId);
    //Fin de dashboard

    // Inicio de creación de tarjeta
    const tarjeta = await request.post(`${baseURL}/tarjetas`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      id_cuenta_asociada: accountId,
      marca: "Mastercard",
      tipo: "Crédito"
    }
    });
  //  Fin de creación de tarjeta

  });
});