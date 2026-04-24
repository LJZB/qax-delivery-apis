const { test, expect } = require('@playwright/test');

test.describe('Perfil y Seguridad', () => {

  const baseURL = 'https://practice.expandtesting.com/notes/api/users';
  let token;
  let userEmail;
  let userPassword = 'Lucho1234';

  test.beforeAll(async ({ request }) => {
    userEmail = `user_${Date.now()}@test.com`;

    // Register
    await request.post(`${baseURL}/register`, {
      data: {
        name: 'Luis',
        email: userEmail,
        password: userPassword
      }
    });

    // Login
    const loginResponse = await request.post(`${baseURL}/login`, {
      data: {
        email: userEmail,
        password: userPassword
      }
    });

    const body = await loginResponse.json();
    token = body.data.token;
  });

  //TC01
  test('CP01 - Obtener perfil con token válido', async ({ request }) => {
    const response = await request.get(`${baseURL}/profile`,{
        headers: {
            'x-auth-token': token
        }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.email).toBe(userEmail);
    
  }),
  //Fin del test01
  //TC02
  test('CP02 - Cambiar contraseña con datos válidos', async ({ request }) => {
    const response = await request.post(`${baseURL}/change-password`,
    {
        headers:  {
            'accept': 'application/json',
            'x-auth-token': token
        },
        data: {
                currentPassword: userPassword,
                newPassword: 'Nueva1234'
            }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.message).toBe('The password was successfully updated');
  }),
  //Fin de test02
  //Iniciio de test03
  test('CP03 - Solicitar recuperación de contraseña con email válido', async ({ request }) => {
    const response = await request.post(`${baseURL}/forgot-password`,
    {
        headers:  {
            'accept': 'application/json',
        },
        data: {
                email: userEmail,
            }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.message).toBeDefined();

  }),
  //Fin de test03
  //Inicio de Test04
  test('CP04 - Verificar token de recuperación válido', async ({ request }) => {
    const resetToken = 'fake-token';
    const response = await request.post(`${baseURL}/verify-reset-password-token`, {
    data: {
      token: resetToken
    }
  });
  expect(response.status()).toBe(401);//No se puede obtener el token ya que llega al correo
  const body = await response.json();
  expect(body.message).toBeDefined();
}),
//Fin de Test04
//Inicio de Test05
test('CP05 - Restablecer contraseña con token de recuperación', async ({ request }) => {
    const resetToken = 'fake-token';
    const response = await request.post(`${baseURL}/reset-password`, {
        headers:  {
            'accept': 'application/json',
        },
        data: {
            token: resetToken,
            newPassword:`Lucho456`
        }
    });
    expect(response.status()).toBe(400);//Petiión inválida porque no se tiene el token.
    const body = await response.json();
    expect(body.message).toBeDefined();
})
  
});