const { test, expect } = require('@playwright/test');

// Smoke test para validar que la API responde correctamente
test('debe responder health check de la API con estado 200', async ({ request }) => {
  // Hace request al endpoint base configurado
  const response = await request.get('health-check');

  // Valida que la API esté disponible
  expect(response.status()).toBe(200);
});