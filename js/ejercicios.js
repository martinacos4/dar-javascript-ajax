const vocales = ['a', 'e', 'i', 'o', 'u'];
const sinTilde = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ü': 'u' };

function limpiarTexto(texto) {
  let limpio = '';
  for (let letra of texto.toLowerCase()) {
    if (sinTilde[letra]) {
      letra = sinTilde[letra];
    }
    const esLetra = (letra >= 'a' && letra <= 'z') || letra === 'ñ';
    const esNumero = letra >= '0' && letra <= '9';
    if (esLetra || esNumero) {
      limpio += letra;
    }
  }
  return limpio;
}

function esPalindromo(texto) {
  const limpio = limpiarTexto(texto);
  let alReves = '';
  for (let i = limpio.length - 1; i >= 0; i--) {
    alReves += limpio[i];
  }
  return limpio !== '' && limpio === alReves;
}

document.getElementById('boton-palindromo').addEventListener('click', function () {
  const texto = document.getElementById('texto-palindromo').value;
  const resultado = document.getElementById('resultado-palindromo');
  if (esPalindromo(texto)) {
    resultado.textContent = 'Sí es un palíndromo.';
  } else {
    resultado.textContent = 'No es un palíndromo.';
  }
});

document.getElementById('boton-mayor').addEventListener('click', function () {
  const primero = parseFloat(document.getElementById('numero-1').value);
  const segundo = parseFloat(document.getElementById('numero-2').value);
  const resultado = document.getElementById('resultado-mayor');
  if (isNaN(primero) || isNaN(segundo)) {
    resultado.textContent = 'Escribe los dos números.';
  } else if (primero > segundo) {
    resultado.textContent = 'El mayor es ' + primero + '.';
  } else if (segundo > primero) {
    resultado.textContent = 'El mayor es ' + segundo + '.';
  } else {
    resultado.textContent = 'Los dos números son iguales.';
  }
});

document.getElementById('boton-vocales').addEventListener('click', function () {
  const frase = limpiarTexto(document.getElementById('frase-vocales').value);
  const resultado = document.getElementById('resultado-vocales');
  const encontradas = [];
  for (const vocal of vocales) {
    if (frase.includes(vocal)) {
      encontradas.push(vocal);
    }
  }
  if (encontradas.length === 0) {
    resultado.textContent = 'La frase no tiene vocales.';
  } else {
    resultado.textContent = 'Vocales que aparecen: ' + encontradas.join(', ');
  }
});

document.getElementById('boton-contar').addEventListener('click', function () {
  const frase = limpiarTexto(document.getElementById('frase-contar').value);
  const contador = { a: 0, e: 0, i: 0, o: 0, u: 0 };
  for (const letra of frase) {
    if (vocales.includes(letra)) {
      contador[letra]++;
    }
  }
  const partes = [];
  for (const vocal of vocales) {
    partes.push(vocal + ': ' + contador[vocal]);
  }
  document.getElementById('resultado-contar').textContent = partes.join(', ');
});
