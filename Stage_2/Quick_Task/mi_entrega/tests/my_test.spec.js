const { test, expect } = require('@playwright/test');
// Importamos nuestra función al inicio del archivo
const { generarEmailAleatorio } = require('../utils/utils');

test('Crear usuario con email dinámico', async ({ request }) => {
    const emailDinamico = generarEmailAleatorio(); 
    
    const response = await request.post('https://jsonplaceholder.typicode.com/users', {
        data: { 
            name: "Lucho",
            email: emailDinamico 
        }
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    console.log('ID:', body.id);
});