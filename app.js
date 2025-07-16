let hitos = [];
let hitoActual = 0;

function cargarDatos() {
  fetch('datos.json')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      hitos = data.hitos || [];
      console.log('Datos cargados:', hitos);
      mostrarHito(0);
    })
    .catch(error => {
      console.error('Error cargando datos:', error);
      hitos = []; // Fallback seguro
    });
}

function mostrarHito(id) {
  if (!hitos[id]) {
    console.error('Hito no encontrado con ID:', id);
    return;
  }

  const hito = hitos[id];
  hitoActual = id;
  
  // Actualizar UI
  document.getElementById('titulo').textContent = hito.titulo || 'Sin título';
  document.getElementById('descripcion').textContent = hito.descripcion || '';
  document.getElementById('testimonio').textContent = hito.testimonio ? `"${hito.testimonio}"` : 'Sin testimonio';
  
  // Botones de opciones
  const opcionesDiv = document.getElementById('opciones');
  opcionesDiv.innerHTML = '';
  
  hito.opciones.forEach(opcion => {
    const boton = document.createElement('button');
    boton.textContent = opcion.texto;
    boton.onclick = () => {
      const siguienteHito = hitos.find(h => h.id === opcion.siguiente);
      if (siguienteHito) {
        mostrarHito(hitos.indexOf(siguienteHito));
      } else {
        console.error('Hito siguiente no existe:', opcion.siguiente);
      }
    };
    opcionesDiv.appendChild(boton);
  });
}

// Iniciar
document.addEventListener('DOMContentLoaded', cargarDatos);