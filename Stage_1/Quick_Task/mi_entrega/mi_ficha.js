//Definir variables
let myName = 'Luis';
let myAge = 35;
let myStudy = true;
let myHobbies = ['Videojuegos', 'Ir a cine', 'Leer'];

//Mostrar información básica
console.log('\nMi información:\n');

console.log('Mi nombre es', myName);
console.log('Tengo', myAge, 'años');
console.log('Estoy estudiando automatización de APIs:', myStudy);
console.log('Mis hobbies son:', myHobbies.join(', '));

//Separador visual
console.log('\n------------------------\n');

//Mostrar tipos de variables
console.log('Tipos de variables:\n');

console.log('Nombre:', typeof myName);
console.log('Edad:', typeof myAge);
console.log('Curso:', typeof myStudy);
console.log('myHobbies:', typeof myHobbies);

//Pedir hobby al usuario y agregarlo al array
//let newHobby = prompt('¿Cuál es tu hobby favorito?');
//myHobbies.push(newHobby);

console.log('\nCantidad de myHobbies y cumpleaños:\n');

// 6. Mostrar cantidad total de myHobbies
console.log('Cantidad de myHobbies:', myHobbies.length);

// 7. Aumentar edad en 1 (como si cumpliera años)
myAge = myAge + 1;
console.log('Nueva edad:', myAge);