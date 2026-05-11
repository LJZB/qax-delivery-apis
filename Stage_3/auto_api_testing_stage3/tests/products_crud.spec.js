// tests/products_crud.spec.js
const { test, expect } = require("@playwright/test");
const { ProductService } = require("../src/services/ProductService.js");
const { ProductRequest } = require("../src/models/ProductRequest.js");

test.describe("Products API — CRUD @regression", () => {
  //Inicio de test
  test("Creación de producto", async ({ request }) => {
    //Se crea un instancia del servicio ProductService
    const productService = new ProductService(request);

    //Se crea una instancia del request para hacer un POST
    const newProduct = new ProductRequest("ASUS ROG Strix G16", {
      year: 2024,
      price: 1699.99,
      "CPU model": "AMD Ryzen 7 7840HS",
      "GPU model": "NVIDIA RTX 4060",
      RAM: "16 GB",
      "Hard disk size": "1 TB",
    });

    let productId;

    await test.step("POST: crear producto", async () => {
      const { status, body } = await productService.createProduct(newProduct);

      expect(status).toBe(200);
      expect(body.hasValidId()).toBeTruthy();

      productId = body.id;
    });

    await test.step("GET: verificar producto creado", async () => {
      const { status: getStatus, body: getBody } = await productService.getProduct(productId);
      expect(getStatus).toBe(200);
      expect(getBody.id).toBe(productId);
      expect(getBody.name).toBe("ASUS ROG Strix G16");
    });

    //Se crea una instancia del request para hacer un PUT
    const changedProduct = new ProductRequest("HP Omen 16", {
      year: 2025,
      price: 1300,
      "CPU model": "AMD Ryzen 7 7840HS",
      "GPU model": "NVIDIA RTX 4060",
      RAM: "16 GB",
      "Hard disk size": "512 GB",
    });

    await test.step("PUT: reemplazar producto completo", async () => {
      const { status: putStatus, body: putBody } = await productService.updateProduct(productId, changedProduct);
      expect(putStatus).toBe(200);
      expect(putBody.name).toBe("HP Omen 16");
    });

    await test.step("GET: verificar reemplazo completo", async () => {
      const { status: finalStatus, body: finalBody } = await productService.getProduct(productId);
      expect(finalStatus).toBe(200);
      expect(finalBody.id).toBe(productId);
      expect(finalBody.name).toBe("HP Omen 16");
      expect(finalBody.getPrice()).toBe(1300);
      expect(finalBody.data.year).toBe(2025);
      expect(finalBody.data["CPU model"]).toBe("AMD Ryzen 7 7840HS");
    });
    const patchFields = {
      name: "HP Omen 16 Updated",
    };
    // Se define el body parcial para PATCH
    test.step("PATCH: actualizar solo el nombre", async () => {
      const { status: patchStatus, body: patchBody } = await productService.patchProduct(productId, patchFields);
      expect(patchStatus).toBe(200);
      expect(patchBody.name).toBe("HP Omen 16 Updated");
    });
    await test.step("GET: verificar la actualización del nombre", async () => {
      const { status: patchGetStatus, body: patchGetBody } = await productService.getProduct(productId);
      expect(patchGetStatus).toBe(200);
      expect(patchGetBody.name).toBe("HP Omen 16 Updated");
      expect(patchGetBody.getPrice()).toBe(1300);
    });
  });

  //Fin de test
});
