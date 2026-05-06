# Mission 2 - E2E API Testing Platzi Fake Store

## Objetivo

Automatizar un flujo E2E API usando Playwright + JavaScript sobre la API pública de Platzi Fake Store.

API base:

```txt
https://api.escuelajs.co/api/v1
```

Documentación Swagger:

```txt
https://api.escuelajs.co/docs
```

## Stack utilizado

- Playwright
- JavaScript / CommonJS
- Node.js
- Faker
- dotenv

## Estructura del proyecto

```txt
Stage_2/Mission/
├── fixtures/
│   └── test-image.png
├── services/
│   ├── AuthService.js
│   ├── UserService.js
│   ├── FileService.js
│   ├── CategoryService.js
│   └── ProductService.js
├── tests/
│   └── mission2_e2e.spec.js
├── utils/
│   └── dataGenerator.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```

## Flujo automatizado

El flujo principal implementado valida:

```txt
1. Login para obtener token.
2. Crear usuario dinámico.
3. Subir imagen usando Files upload.
4. Crear categoría dinámica usando la imagen subida.
5. Crear producto asociado a la categoría creada usando la imagen subida.
6. Consultar el producto creado.
```

## Criterios cubiertos

### Auth

- Se consume `POST /auth/login`.
- Se valida status `200` o `201`.
- Se valida que la respuesta contenga `access_token`.
- El token obtenido se reutiliza en el flujo para crear producto.

### Users

- Se consume `POST /users`.
- Se crea un usuario dinámico con Faker.
- Se valida que el response retorne un `id`.
- Se valida que el email retornado coincida con el enviado.

### Files

- Se consume `POST /files/upload`.
- Se sube una imagen local desde `fixtures/test-image.png`.
- Se valida que el response retorne `location`.
- La URL retornada se reutiliza como imagen de la categoría y del producto.

### Categories

- Se consume `POST /categories`.
- Se crea una categoría dinámica.
- Se valida que el response retorne un `id`.
- Se valida que el nombre retornado coincida con el enviado.
- Se usa la URL retornada por Files como imagen de la categoría.

### Products

- Se consume `POST /products`.
- Se consume `GET /products/{id}`.
- Se crea un producto asociado a la categoría creada.
- Se envía token Bearer en la creación del producto.
- Se usa la URL retornada por Files como imagen del producto.
- Se valida que el response tenga `id`, `title`, `price` y `category.id`.
- Se consulta el producto creado por ID.
- Se valida que los datos consultados coincidan con los datos creados.

## Arquitectura usada

### Services

Los services encapsulan la lógica HTTP.  
El test no llama directamente `request.get()` ni `request.post()`.

Servicios implementados:

```txt
AuthService      -> login y perfil
UserService      -> creación y consulta de usuarios
FileService      -> carga de archivos
CategoryService  -> creación y consulta de categorías
ProductService   -> creación y consulta de productos
```

### Utils

El archivo `utils/dataGenerator.js` centraliza la generación de datos dinámicos usando Faker.

Funciones implementadas:

```txt
generarUsuario()
generarCategoria()
generarProducto(categoryId)
```

### Fixtures

La carpeta `fixtures/` contiene archivos locales usados durante la ejecución del test.

Archivo incluido:

```txt
fixtures/test-image.png
```

Este archivo se utiliza para validar el endpoint de carga de archivos y reutilizar la URL generada en categorías y productos.

### Test

El archivo `tests/mission2_e2e.spec.js` contiene el flujo E2E principal usando `test.step` para documentar cada fase del flujo en el reporte de Playwright.

## Variables de entorno

El proyecto usa `.env` para evitar hardcodear datos de ambiente.

Ejemplo:

```env
BASE_URL=https://api.escuelajs.co/api/v1/
USER_EMAIL=correo_demo
USER_PASSWORD=password_demo
```

El archivo `.env` no debe subirse al repositorio.

## Configuración de Playwright

La configuración usa `baseURL` desde `.env`.

No se define `Content-Type` globalmente porque el flujo incluye `multipart/form-data` para Files upload.  
Playwright asigna automáticamente el header correcto según el tipo de request:

- `data` para JSON.
- `multipart` para subida de archivos.

## Archivos ignorados por Git

El `.gitignore` incluye:

```txt
node_modules/
.env
playwright-report/
test-results/
```

## Instalación

Desde la carpeta `Stage_2/Mission`, ejecutar:

```bash
npm install
```

## Ejecución

Para ejecutar la misión:

```bash
npx playwright test tests/mission2_e2e.spec.js --reporter=list
```

Para abrir el reporte HTML:

```bash
npx playwright show-report
```

## Resultado

El flujo E2E fue ejecutado correctamente, validando el encadenamiento de datos dinámicos entre Auth, Users, Files, Categories y Products.
