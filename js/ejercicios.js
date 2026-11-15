const vocales = ['a', 'e', 'i', 'o', 'u'];
const sinTilde = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ü': 'u' };

function limpiarTexto(texto) {
  let limpio = '';
  for (let letra of texto.toLowerCase()) {
    if (sinTilde[letra]) {
      letra = sinTilde[letra];
    }
    const esLetra = letra >= 'a' && letra <= 'z';
    const esNumero = letra >= '0' && letra <= '9';
    if (esLetra || esNumero || letra === 'ñ') {
      limpio += letra;
    }
  }
  return limpio;
}

function esPalindromo(texto) {
  const limpio = limpiarTexto(texto);
  if (limpio === '') {
    return false;
  }
  for (let i = 0; i < limpio.length / 2; i++) {
    if (limpio[i] !== limpio[limpio.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

function vocalesQueAparecen(frase) {
  const limpio = limpiarTexto(frase);
  const encontradas = [];
  for (const vocal of vocales) {
    if (limpio.includes(vocal)) {
      encontradas.push(vocal);
    }
  }
  return encontradas;
}

function contarVocales(frase) {
  const contador = { a: 0, e: 0, i: 0, o: 0, u: 0 };
  for (const letra of limpiarTexto(frase)) {
    if (vocales.includes(letra)) {
      contador[letra]++;
    }
  }
  return contador;
}

document.getElementById('boton-palindromo').addEventListener('click', function () {
  const texto = document.getElementById('texto-palindromo').value.trim();
  const resultado = document.getElementById('resultado-palindromo');
  if (texto === '') {
    resultado.textContent = 'Primero escribe una palabra o una frase.';
  } else if (esPalindromo(texto)) {
    resultado.textContent = '"' + texto + '" sí es un palíndromo.';
  } else {
    resultado.textContent = '"' + texto + '" no es un palíndromo.';
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
  const frase = document.getElementById('frase-vocales').value;
  const resultado = document.getElementById('resultado-vocales');
  const encontradas = vocalesQueAparecen(frase);
  if (frase.trim() === '') {
    resultado.textContent = 'Primero escribe una frase.';
  } else if (encontradas.length === 0) {
    resultado.textContent = 'La frase no tiene vocales.';
  } else {
    resultado.textContent = 'Las vocales que aparecen son: ' + encontradas.join(', ') + '.';
  }
});

document.getElementById('boton-contar').addEventListener('click', function () {
  const frase = document.getElementById('frase-contar').value;
  const resultado = document.getElementById('resultado-contar');
  resultado.innerHTML = '';
  if (frase.trim() === '') {
    resultado.textContent = 'Primero escribe una frase.';
    return;
  }
  const contador = contarVocales(frase);
  for (const vocal of vocales) {
    const item = document.createElement('li');
    const palabra = contador[vocal] === 1 ? 'vez' : 'veces';
    item.textContent = vocal + ': ' + contador[vocal] + ' ' + palabra;
    resultado.appendChild(item);
  }
});
