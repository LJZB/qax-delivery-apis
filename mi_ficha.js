//Definir variables
const myName = 'Luis';
let age = 35;
const studyingApis = true;
let hobbies = ['Videojuegos', 'Ir a cine', 'Leer'];

//Mostrar información básica
console.log('\nMi información:\n');

console.log('Mi nombre es', myName);
console.log('Tengo', age, 'años');
console.log('Estoy estudiando automatización de APIs:', studyingApis);
console.log('Mis hobbies son:', hobbies.join(', '));

//Separador visual
console.log('\n------------------------\n');

//Mostrar tipos de variables
console.log('Tipos de variables:\n');

console.log('Nombre:', typeof myName);
console.log('Edad:', typeof age);
console.log('Curso:', typeof studyingApis);
console.log('Hobbies:', typeof hobbies);

//Pedir hobby al usuario y agregarlo al array
//let newHobby = prompt('¿Cuál es tu hobby favorito?');
//hobbies.push(newHobby);

console.log('\nCantidad de hobbies y cumpleaños:\n');

// 6. Mostrar cantidad total de hobbies
console.log('Cantidad de hobbies:', hobbies.length);

// 7. Aumentar edad en 1 (como si cumpliera años)
age = age + 1;
console.log('Nueva edad:', age);