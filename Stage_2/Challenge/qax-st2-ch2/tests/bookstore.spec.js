const { test, expect } = require('@playwright/test');
const { generarUsuario } = require('../utils/dataGenerator');

// Suite serial porque los tests dependen entre sí:
// primero se crea usuario, luego token, luego se usa userId/token/isbn.
test.describe.serial('Challenge 2 - BookStore API', () => {
  // Variables compartidas entre los pasos del flujo.
  let user;
  let userId;
  let token;
  let isbn;

  // Antes de ejecutar los tests, se genera un usuario dinámico.
  test.beforeAll(() => {
    user = generarUsuario();
  });

  // Crea un usuario válido en la API y guarda el userId retornado.
  test('1. Crear usuario válido', async ({ request }) => {
    const res = await request.post('/Account/v1/User', {
      data: user
    });

    expect(res.status()).toBe(201);

    const body = await res.json();
    userId = body.userID;
  });

  // Genera un token JWT usando las credenciales del usuario creado.
  test('2. Generar token válido', async ({ request }) => {
    const res = await request.post('/Account/v1/GenerateToken', {
      data: user
    });

    expect(res.status()).toBe(200);

    const body = await res.json();
    token = body.token;

    expect(token).toBeTruthy();
  });

  // Consulta el perfil del usuario usando Authorization Bearer.
  test('3. Obtener usuario con token', async ({ request }) => {
    const res = await request.get(`/Account/v1/User/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    expect(res.status()).toBe(200);
  });

  // Obtiene la lista de libros y extrae el ISBN del primer libro.
  test('4. Obtener libros y extraer ISBN', async ({ request }) => {
    const res = await request.get('/BookStore/v1/Books');

    expect(res.status()).toBe(200);

    const body = await res.json();
    isbn = body.books[0].isbn;

    expect(isbn).toBeTruthy();
  });

  // Agrega el libro extraído al usuario creado, usando token válido.
  test('5. Agregar libro al usuario', async ({ request }) => {
    const res = await request.post('/BookStore/v1/Books', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        userId: userId,
        collectionOfIsbns: [
          {
            isbn: isbn
          }
        ]
      }
    });

    expect(res.status()).toBe(201);
  });

  // Valida que la API rechace la creación de usuario con datos inválidos.
  test('6. Crear usuario inválido', async ({ request }) => {
    const res = await request.post('/Account/v1/User', {
      data: {
        userName: '',
        password: '123'
      }
    });

    expect(res.status()).toBe(400);
  });

  // Valida que no se genere token válido con credenciales incorrectas.
  test('7. Token inválido', async ({ request }) => {
    const res = await request.post('/Account/v1/GenerateToken', {
      data: {
        userName: 'fakeUser',
        password: 'fakePass'
      }
    });

    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.status).toContain('Failed');
  });

  // Valida que un endpoint protegido rechace solicitudes sin token.
  test('8. Acceso sin token', async ({ request }) => {
    const res = await request.get(`/Account/v1/User/${userId}`);

    expect(res.status()).toBe(401);
  });
});