// Importa defineConfig para estructurar la configuración de Playwright.
const { defineConfig } = require('@playwright/test');

// Carga las variables definidas en el archivo .env.
require('dotenv').config();

// Exporta la configuración principal del proyecto.
module.exports = defineConfig({
  // Define la carpeta donde Playwright buscará los archivos de prueba.
  testDir: './tests',

  // Configura los reportes de ejecución:
  // - html: genera reporte visual.
  // - list: muestra resultados en terminal.
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    // Usa la URL base definida en .env.
    baseURL: process.env.BASE_URL,

    // Define headers globales para todas las peticiones API.
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  },
});
