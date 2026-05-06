// Importamos las herramientas de Playwright.
const { test, expect } = require("@playwright/test");

// Importamos los services.
const { AuthService } = require("../services/AuthService");
const { UserService } = require("../services/UserService");
const { CategoryService } = require("../services/CategoryService");
const { ProductService } = require("../services/ProductService");

// Importamos los generadores de datos dinámicos.
const { generarUsuario, generarCategoria, generarProducto } = require("../utils/dataGenerator");

// Agrupamos el flujo E2E principal de la misión.
test.describe("Mission 2 - E2E API Testing Platzi Fake Store", () => {
  test("flujo principal: login, usuario, categoría, producto y consulta @e2e", async ({ request }) => {
    // Instanciamos los services para no llamar request directamente desde el test.
    const authService = new AuthService(request);
    const userService = new UserService(request);
    const categoryService = new CategoryService(request);
    const productService = new ProductService(request);

    // Variables compartidas dentro del flujo.
    let token;
    let userData;
    let createdUser;
    let categoryData;
    let createdCategory;
    let productData;
    let createdProduct;

    await test.step("Login: obtener token de autenticación", async () => {
      const { status, body } = await authService.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);

      expect([200, 201]).toContain(status);
      expect(body.access_token).toBeTruthy();

      token = body.access_token;
    });

    await test.step("Users: crear usuario dinámico", async () => {
      userData = generarUsuario();

      const { status, body } = await userService.createUser(userData);

      expect([200, 201]).toContain(status);
      expect(body.id).toBeTruthy();
      expect(body.email).toBe(userData.email);

      createdUser = body;
    });

    await test.step("Categories: crear categoría dinámica", async () => {
      categoryData = generarCategoria();

      const { status, body } = await categoryService.createCategory(categoryData);

      expect([200, 201]).toContain(status);
      expect(body.id).toBeTruthy();
      expect(body.name).toBe(categoryData.name);

      createdCategory = body;
    });

    await test.step("Products: crear producto asociado a la categoría", async () => {
      productData = generarProducto(createdCategory.id);

      const { status, body } = await productService.createProduct(productData, token);

      expect([200, 201]).toContain(status);
      expect(body.id).toBeTruthy();
      expect(body.title).toBe(productData.title);
      expect(body.price).toBe(productData.price);
      expect(body.category.id).toBe(createdCategory.id);

      createdProduct = body;
    });

    await test.step("Products: consultar producto creado", async () => {
      const { status, body } = await productService.getProductById(createdProduct.id);

      expect(status).toBe(200);
      expect(body.id).toBe(createdProduct.id);
      expect(body.title).toBe(productData.title);
      expect(body.category.id).toBe(createdCategory.id);
    });
  });
});
