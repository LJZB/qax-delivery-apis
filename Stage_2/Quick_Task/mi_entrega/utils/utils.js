// Creamos la función
function generarEmailAleatorio() {
    const timestamp = Date.now(); // Genera un número único basado en la hora exacta
    return `lucho_${timestamp}@gmail.com`;
}

// La exportamos para que otros archivos la puedan usar
module.exports = { generarEmailAleatorio };