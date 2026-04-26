// src/services/ProductService.js

const { ProductResponse } = require("../models/ProductResponse.js");

class ProductService {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    this.request = request;
    this.endpoint = "/objects";
  }

  /**
   * Obtiene un producto por su ID.
   * @param {string} id
   * @returns {Promise<{ status: number, body: ProductResponse }>}
   */
  //Get
  async getProduct(id) {
    const response = await this.request.get(`${this.endpoint}/${id}`);
    const body = await response.json();
    return {
      status: response.status(),
      body: new ProductResponse(body),
    };
  }

  /**
   * Crea un nuevo producto.
   * @param {import('../models/ProductRequest').ProductRequest} productRequest
   * @returns {Promise<{ status: number, body: ProductResponse }>}
   */

  //Post
  async createProduct(productRequest) {
    const response = await this.request.post(this.endpoint, {
      data: productRequest.toJSON(),
    });
    const body = await response.json();
    return {
      status: response.status(),
      body: new ProductResponse(body),
    };
  }

  //Put
  async updateProduct(productRequest) {
    const response = await this.request.put(this.endpoint, {
      data: productRequest.toJSON(),
    });
    const body = await response.json();
    return {
      status: response.status(),
      body: new ProductResponse(body),
    };
  }

  //Patch
  async patchProduct(id) {
    const response = await this.request.patch(this.endpoint, {
      data: productRequest.toJSON(),
    });
    const body = await response.json();
    return {
      status: response.status(),
      body: new ProductResponse(body),
    };
  }
}

module.exports = { ProductService };
