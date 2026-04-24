// Pausa simple para reintentos (los correos tardan en llegar)
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

// Obtiene un dominio válido de Mail.tm
async function obtenerDominio() {
  const res = await fetch("https://api.mail.tm/domains");
  const data = await res.json();
  return data["hydra:member"][0].domain;
}

// Crea una cuenta temporal y devuelve { email, token }
async function crearCuentaCorreo(nombreUsuario, password) {
  const dominio = await obtenerDominio();
  const address = `${nombreUsuario}@${dominio}`;

  // Crear cuenta
  await fetch("https://api.mail.tm/accounts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address, password }),
  });

  // Login para obtener token (JWT de Mail.tm)
  const tokenRes = await fetch("https://api.mail.tm/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address, password }),
  });

  const tokenData = await tokenRes.json();
  return { email: address, token: tokenData.token };
}

// Busca el último correo (reintenta hasta 5 veces)
async function obtenerUltimoCorreo(token) {
  let intentos = 0;

  while (intentos < 5) {
    // Lista de mensajes
    const res = await fetch("https://api.mail.tm/messages", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    const correos = data["hydra:member"];

    if (correos.length > 0) {
      // Detalle del correo más reciente
      const id = correos[0].id;
      const detalle = await fetch(`https://api.mail.tm/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const contenido = await detalle.json();

      return contenido.text; // body en texto plano
    }

    await esperar(4000); // espera antes de reintentar
    intentos++;
  }

  throw new Error("No se recibió ningún correo");
}

// Extrae el token del link de reset password
function extraerTokenDesdeCorreo(textoCorreo) {
  // Captura todo lo que viene después de "reset-password/"
  const match = textoCorreo.match(/reset-password\/(.+)/);
  return match ? match[1] : null;
}
module.exports = {
  crearCuentaCorreo,
  obtenerUltimoCorreo,
  extraerTokenDesdeCorreo,
};
