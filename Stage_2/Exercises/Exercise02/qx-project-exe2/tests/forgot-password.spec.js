import { test, expect } from '@playwright/test';
import { generarUsuario } from '../utils/dataGenerator';

// .serial obliga a ejecutar los tests en orden. Si falla el registro, no intenta hacer login.
test.describe.serial('Flujo End-to-End: Perfil y Cambio de Contraseña', () => {
    
    // 1. Variables compartidas para todo el flujo
    let tokenAuth;
    let usuarioDinamico;
    let nuevaPassword = 'NewPassword123!';

    // Antes de todos los tests, generamos la data
    test.beforeAll(() => {
        usuarioDinamico = generarUsuario();
        const userRegister = request.post('users/register', {
            data: {
                name: usuarioDinamico.name,
                email: usuarioDinamico.email,
                password: usuarioDinamico.password
            }
        });

    test('Flujo de Recuperación de Contraseña', async ({ request }) => {
        const response = await request.post('users/change-password', {
            headers: {
                'x-auth-token': tokenAuth
            },
            data: {
                currentPassword: usuarioDinamico.password,
                newPassword: nuevaPassword
            }
        });
        
    })
    

});