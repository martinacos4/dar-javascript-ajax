const nombresEstados = [
  'No iniciada', 'Cargando', 'Cargada', 'Interactiva', 'Completada'
];

const textosCodigo = {
  200: 'OK',
  304: 'Not Modified',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error'
};

window.onload = function () {
  document.getElementById('recurso').value = location.href;
  document.getElementById('enviar').onclick = mostrarContenidos;
};

function anotarEstado(numero) {
  const estados = document.getElementById('estados');
  estados.textContent += numero + ' - ' + nombresEstados[numero] + '\n';
}

function mostrarContenidos() {
  const url = document.getElementById('recurso').value;
  const contenidos = document.getElementById('contenidos');
  const cabeceras = document.getElementById('cabeceras');
  const codigo = document.getElementById('codigo');

  contenidos.textContent = '';
  cabeceras.textContent = '';
  codigo.textContent = '';
  document.getElementById('estados').textContent = '';

  const peticion = new XMLHttpRequest();
  anotarEstado(peticion.readyState);

  peticion.onreadystatechange = function () {
    anotarEstado(peticion.readyState);
    if (peticion.readyState === 4) {
      if (peticion.status === 0) {
        codigo.textContent = 'No hubo respuesta: no se pudo leer esa dirección.';
        return;
      }
      contenidos.textContent = peticion.responseText;
      cabeceras.textContent = peticion.getAllResponseHeaders();
      let texto = peticion.statusText;
      if (texto === '') {
        texto = textosCodigo[peticion.status] || '';
      }
      codigo.textContent = peticion.status + ' ' + texto;
    }
  };

  try {
    peticion.open('GET', url, true);
    peticion.send(null);
  } catch (error) {
    codigo.textContent = 'La dirección no es válida.';
  }
}
