// tests/products_flow.spec.js
const { test, expect } = require("@playwright/test");
const { ProductService } = require("../src/services/ProductService.js");
const { ProductRequest } = require("../src/models/ProductRequest.js");

test.describe("Products API — Flujo completo @regression", () => {
  test("ciclo de vida completo de un producto @regression", async ({ request }) => {
    const productService = new ProductService(request);
    let productId;

    const initialProduct = new ProductRequest("Lenovo Legion 5 Pro", {
      year: 2024,
      price: 1599.99,
      "CPU model": "AMD Ryzen 7 7745HX",
      "GPU model": "NVIDIA RTX 4060",
      RAM: "16 GB",
      "Hard disk size": "1 TB",
    });

    const replacedProduct = new ProductRequest("HP Omen 16", {
      year: 2025,
      price: 1300,
      "CPU model": "AMD Ryzen 7 7840HS",
      "GPU model": "NVIDIA RTX 4070",
      RAM: "16 GB",
      "Hard disk size": "512 GB",
    });

    const patchFields = {
      name: "HP Omen 16 Updated",
    };

    await test.step("POST: crear producto inicial", async () => {
      const { status, body } = await productService.createProduct(initialProduct);
      // console.log(initialProduct.toJSON());
      expect(status).toBe(200);
      expect(body.hasValidId()).toBeTruthy();
      expect(body.name).toBe("Lenovo Legion 5 Pro");
      expect(body.getPrice()).toBe(1599.99);

      productId = body.id;
    });

    await test.step("GET: verificar creación", async () => {
      const { status, body } = await productService.getProduct(productId);

      expect(status).toBe(200);
      expect(body.id).toBe(productId);
      expect(body.name).toBe("Lenovo Legion 5 Pro");
      expect(body.getPrice()).toBe(1599.99);
    });

    await test.step("PUT: reemplazar producto completo", async () => {
      const { status, body } = await productService.updateProduct(productId, replacedProduct);
      // console.log(status);
      // console.log(body);
      expect(status).toBe(200);
      expect(body.name).toBe("HP Omen 16");
      expect(body.getPrice()).toBe(1300);
    });

    await test.step("GET: verificar reemplazo completo", async () => {
      const { status, body } = await productService.getProduct(productId);

      expect(status).toBe(200);
      expect(body.id).toBe(productId);
      expect(body.name).toBe("HP Omen 16");
      expect(body.getPrice()).toBe(1300);
      expect(body.data.year).toBe(2025);
    });

    await test.step("PATCH: actualizar parcialmente el nombre", async () => {
      const { status, body } = await productService.patchProduct(productId, patchFields);

      expect(status).toBe(200);
      expect(body.name).toBe("HP Omen 16 Updated");
    });

    await test.step("GET: verificar actualización parcial", async () => {
      const { status, body } = await productService.getProduct(productId);

      expect(status).toBe(200);
      expect(body.id).toBe(productId);
      expect(body.name).toBe("HP Omen 16 Updated");
      expect(body.getPrice()).toBe(1300);
      expect(body.data.year).toBe(2025);
      expect(body.data["CPU model"]).toBe("AMD Ryzen 7 7840HS");
    });
  });
});
