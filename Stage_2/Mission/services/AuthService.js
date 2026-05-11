// Servicio encargado de manejar los endpoints de autenticación.
class AuthService {
  // Recibe el contexto request de Playwright para ejecutar peticiones HTTP.
  constructor(request) {
    this.request = request;

    // Endpoint base para autenticación.
    this.endpoint = "auth";
  }

  // Realiza login y retorna status + body.
  async login(email, password) {
    const response = await this.request.post(`${this.endpoint}/login`, {
      data: {
        email,
        password,
      },
    });

    const body = await response.json();

    return {
      status: response.status(),
      body,
    };
  }

  // Consulta el perfil usando token Bearer.
  async getProfile(token) {
    const response = await this.request.get(`${this.endpoint}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
module.exports = { AuthService };
