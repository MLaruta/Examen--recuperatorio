
let listaDeContactos = [];

const nombreInput = document.getElementById('nombreInput');
const telefonoInput = document.getElementById('telefonoInput');
const btnAgregar = document.getElementById('btnAgregar');
const buscarInput = document.getElementById('buscarInput');
const listaContactos = document.getElementById('listaContactos');
const contadorTotal = document.getElementById('contadorTotal');


btnAgregar.addEventListener('click', agregarContacto);
buscarInput.addEventListener('input', buscarContacto);

function agregarContacto() {
  const nombre = nombreInput.value.trim();
  const telefono = telefonoInput.value.trim();

  if (nombre === '' || telefono === '') {
    alert('Por favor ingresa un nombre y un teléfono.');
    return;
  }

  const nuevoContacto = {
    id: Date.now(),
    nombre: nombre,
    telefono: telefono
  };

  listaDeContactos.push(nuevoContacto);

  nombreInput.value = '';
  telefonoInput.value = '';

  mostrarContactos(listaDeContactos);
  actualizarContador();
}


function eliminarContacto(id) {
    listaDeContactos = listaDeContactos.filter(c => c.id !== id);
    buscarContacto(); 
    actualizarContador();
}
function mostrarContactos(contactosAMostrar) {
    listaContactos.innerHTML = '';

    if (contactosAMostrar.length === 0) {
    const p = document.createElement('p');
    p.className = 'mensaje-vacio';
    p.textContent = 'Todavía no agregaste contactos.';
    listaContactos.appendChild(p);
    return;
}

    contactosAMostrar.forEach(contacto => {
    const li = document.createElement('li');
    li.className = 'contacto-item';

    const divInfo = document.createElement('div');
    divInfo.className = 'contacto-info';

    const spanNombre = document.createElement('span');
    spanNombre.className = 'contacto-nombre';
    spanNombre.textContent = contacto.nombre;

    const spanTelefono = document.createElement('span');
    spanTelefono.className = 'contacto-telefono';
    spanTelefono.textContent = contacto.telefono;

    divInfo.appendChild(spanNombre);
    divInfo.appendChild(spanTelefono);

    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn-eliminar';
    btnEliminar.textContent = 'Eliminar';

    btnEliminar.addEventListener('click', function() {
        eliminarContacto(contacto.id);
    });

    li.appendChild(divInfo);
    li.appendChild(btnEliminar);

    listaContactos.appendChild(li);
    });
}

function buscarContacto() {
    const texto = buscarInput.value.toLowerCase().trim();
    const filtrados = listaDeContactos.filter(contacto =>
    contacto.nombre.toLowerCase().includes(texto)
    );
mostrarContactos(filtrados);
}

function actualizarContador() {
    contadorTotal.textContent = listaDeContactos.length;
}
