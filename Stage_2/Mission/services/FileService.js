// Importamos fs para leer el archivo local que se enviará en el upload.
const fs = require("fs");

// Servicio encargado de manejar el endpoint de carga de archivos.
class FileService {
  // Recibe el contexto request de Playwright para ejecutar peticiones HTTP.
  constructor(request) {
    this.request = request;

    // Endpoint para subir archivos.
    this.endpoint = "files/upload";
  }

  // Sube un archivo usando multipart/form-data y retorna status + body.
  async uploadFile(filePath) {
    const response = await this.request.post(this.endpoint, {
      multipart: {
        file: fs.createReadStream(filePath),
      },
    });

    const body = await response.json();

    return {
      status: response.status(),
      body,
    };
  }
}

// Exportamos la clase para usarla en los tests.
module.exports = { FileService };
