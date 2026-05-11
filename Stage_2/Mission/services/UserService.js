// Servicio encargado de manejar los endpoints de usuarios.
class UserService {
  // Recibe el contexto request de Playwright para ejecutar peticiones HTTP.
  constructor(request) {
    this.request = request;

    // Endpoint base para usuarios.
    this.endpoint = "users";
  }

  // Crea un usuario nuevo y retorna status + body.
  async createUser(userData) {
    const response = await this.request.post(this.endpoint, {
      data: userData,
    });

    const body = await response.json();

    return {
      status: response.status(),
      body,
    };
  }

  // Consulta un usuario por ID y retorna status + body.
  async getUserById(userId) {
    const response = await this.request.get(`${this.endpoint}/${userId}`);

    const body = await response.json();

    return {
      status: response.status(),
      body,
    };
  }

  // Consulta la lista de usuarios y retorna status + body.
  async getUsers() {
    const response = await this.request.get(this.endpoint);

    const body = await response.json();

    return {
      status: response.status(),
      body,
    };
  }
}

// Exportamos la clase para usarla en los tests.
module.exports = { UserService };
