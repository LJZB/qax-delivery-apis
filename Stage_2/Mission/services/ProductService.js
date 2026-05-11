// Servicio encargado de manejar los endpoints de productos.
class ProductService {
  // Recibe el contexto request de Playwright para ejecutar peticiones HTTP.
  constructor(request) {
    this.request = request;

    // Endpoint base para productos.
    this.endpoint = "products";
  }

  // Crea un producto nuevo y retorna status + body.
  async createProduct(productData, token) {
    const response = await this.request.post(this.endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: productData,
    });

    const body = await response.json();

    return {
      status: response.status(),
      body,
    };
  }

  // Consulta un producto por ID y retorna status + body.
  async getProductById(productId) {
    const response = await this.request.get(`${this.endpoint}/${productId}`);

    const body = await response.json();

    return {
      status: response.status(),
      body,
    };
  }

  // Consulta la lista de productos.
  async getProducts() {
    const response = await this.request.get(this.endpoint);

    const body = await response.json();

    return {
      status: response.status(),
      body,
    };
  }
}

// Exportamos la clase para usarla en los tests.
module.exports = { ProductService };
