// Servicio encargado de manejar los endpoints de categorías.
class CategoryService {
  // Recibe el contexto request de Playwright para ejecutar peticiones HTTP.
  constructor(request) {
    this.request = request;

    // Endpoint base para categorías.
    this.endpoint = "categories";
  }

  // Crea una categoría nueva y retorna status + body.
  async createCategory(categoryData) {
    const response = await this.request.post(this.endpoint, {
      data: categoryData,
    });

    const body = await response.json();

    return {
      status: response.status(),
      body,
    };
  }

  // Consulta una categoría por ID y retorna status + body.
  async getCategoryById(categoryId) {
    const response = await this.request.get(`${this.endpoint}/${categoryId}`);

    const body = await response.json();

    return {
      status: response.status(),
      body,
    };
  }

  // Consulta los productos asociados a una categoría.
  async getProductsByCategory(categoryId) {
    const response = await this.request.get(`${this.endpoint}/${categoryId}/products`);

    const body = await response.json();

    return {
      status: response.status(),
      body,
    };
  }
}

// Exportamos la clase para usarla en los tests.
module.exports = { CategoryService };
