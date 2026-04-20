# Mission 1 - Automatización de APIs (Homebanking)

## 🎯 Objetivo

Validar el funcionamiento del sistema de homebanking mediante:

* Diseño de casos de prueba en Gherkin
* Exploración de endpoints con Postman
* Definición de un flujo crítico (Smoke Test)

---

## 🧪 Casos de Prueba

### 🔹 HU1 - Resumen de cuentas y perfil

1. Visualización del perfil del usuario
2. Validación de estructura del perfil
3. Visualización de cuentas
4. Validación de saldo y moneda
5. Usuario sin cuentas
6. Visualización de transacciones
7. Validación de estructura de transacciones
8. Validación de formato de fecha
9. Usuario sin transacciones
10. Mensaje de bienvenida

---

### 🔹 HU2 - Transferencias y pagos

11. Transferencia exitosa
12. Validación de comprobante
13. Validación de descuento de saldo
14. Transferencia con fondos insuficientes
15. Validación de error por fondos insuficientes
16. Pago de servicio exitoso
17. Validación de confirmación de pago
18. Validación de descuento tras pago
19. Transferencia con monto inválido
20. Pago con monto inválido

---

### 🔹 HU3 - Productos financieros

21. Solicitud de préstamo válida
22. Solicitud de préstamo inválida
23. Creación de plazo fijo
24. Creación de plazo fijo inválida
25. Cancelación de préstamo
26. Cancelación de plazo fijo
27. Listado de tarjetas
28. Creación de tarjeta
29. Eliminación de tarjeta
30. Eliminación de tarjeta inexistente

---

### 🔹 HU4 - Administración del sistema

31. Reset de datos del sistema

---

## 🔥 Smoke Test (Flujo Crítico)

1. Reset del sistema
2. Registro de usuario
3. Inicio de sesión
4. Consulta de dashboard
5. Obtención de cuentas
6. Transferencia de dinero
7. Validación de transacciones
8. Pago de servicio
9. Validación de transacciones

---

## 🛠️ Herramientas utilizadas

* Postman
* Playwright
* Gherkin

---

## 📌 Notas QA

* Cobertura de reglas de negocio
* Casos positivos y negativos
* Flujo crítico validado con Smoke Test
