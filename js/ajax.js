const estados = [
  'No iniciada', 'Cargando', 'Cargada', 'Interactiva', 'Completada'
];
const textosCodigo = { 200: 'OK', 404: 'Not Found' };

window.onload = function () {
  document.getElementById('recurso').value = location.href;
  document.getElementById('enviar').onclick = mostrarContenidos;
};

function anotarEstado(numero) {
  const zona = document.getElementById('estados');
  zona.textContent += numero + ' - ' + estados[numero] + '\n';
}

function mostrarContenidos() {
  const url = document.getElementById('recurso').value;
  const peticion = new XMLHttpRequest();
  document.getElementById('estados').textContent = '';
  anotarEstado(peticion.readyState);

  peticion.onreadystatechange = function () {
    anotarEstado(peticion.readyState);
    if (peticion.readyState === 4) {
      const texto = peticion.statusText || textosCodigo[peticion.status] || '';
      const cabeceras = peticion.getAllResponseHeaders();
      const codigo = peticion.status + ' ' + texto;
      document.getElementById('contenidos').textContent = peticion.responseText;
      document.getElementById('cabeceras').textContent = cabeceras;
      document.getElementById('codigo').textContent = codigo;
    }
  };

  peticion.open('GET', url, true);
  peticion.send(null);
}
