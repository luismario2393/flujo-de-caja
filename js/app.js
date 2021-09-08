const btnIngreso = document.querySelector('#btn-ingreso');
const btnGasto = document.querySelector('#btn-gasto');
const containerForm = document.querySelector('#container-form');
const form = document.querySelector('#form');
const btnFrom = document.querySelector('#btn-form');
const btnFormCan = document.querySelector('#btn-form-can');
const title = document.querySelector('#title-form');
const titleSpan = document.querySelector('#title-form span');
const pFromE = document.querySelector('#p-form-e');
const pFromC = document.querySelector('#p-form-c');
const inputTipo = document.querySelector('#tipo');
const inputValor = document.querySelector('#valor');
let ingreso = [];
let gasto = [];


document.addEventListener('DOMContentLoaded', () => {

  btnIngreso.addEventListener('click', mostrarVentanaIngreso);
  btnGasto.addEventListener('click', mostrarVentanaGasto);

  btnFormCan.addEventListener('click', e => {
    e.preventDefault();
    containerForm.classList.remove('active');
    form.classList.remove('active')
    form.reset();
  });

  inputTipo.addEventListener('blur', validarForm);
  inputValor.addEventListener('blur', validarForm);
  
  form.addEventListener('submit', leerInfo)
  

});

// Funciones

function leerInfo(e) {
  e.preventDefault();
  
  
  if(titleSpan.textContent === 'Ingreso') {

    infoIngreso = {
      tipo: inputTipo.value,
      valor: Number(inputValor.value),
      id: Date.now()
    }
  
    ingreso = [...ingreso, infoIngreso];
    
    console.log(ingreso)
    ingresoHTML()
    form.reset();
    containerForm.classList.remove('active');
    
  } else if(titleSpan.textContent === 'Gasto'){

    infoGasto = {
      tipo: inputTipo.value,
      valor: Number(inputValor.value),
      id: Date.now()
    }

    gasto = [...gasto, infoGasto];


    gastoHTML();
    form.reset();
    containerForm.classList.remove('active');
    
  }

  
  const ingresoReducer = ingreso.reduce((total, ingreso) => total + ingreso.valor, 0);
  const gastoReducer = gasto.reduce((total, gasto) => total + gasto.valor, 0);
  const balance = ingresoReducer - gastoReducer;
  
  if(balance < 0) {
    alertaBalance('Debes estar más pendiente a tus cifras estas en negativo', 'error');
  } else if (balance === 0) {
    alertaBalance('Estamos en cero', 'neutro');
  } else {
    alertaBalance('Tus finanzas estan sanas', 'positivo')
  }

  const valor = document.querySelector('#balance');

  while(valor.firstChild) {
    valor.removeChild(valor.firstChild)
  }
  const span = document.createElement('span');
  span.textContent = balance;

  valor.appendChild(span);
  
}

function alertaBalance(msg, tipo) {
  
  const divMensaje = document.querySelector('#mensajito');
  const mensaje = document.createElement('p');

  
  if(tipo === 'error') {
    mensaje.remove()
    mensaje.classList.remove('neutro', 'positivo' );
    mensaje.classList.add('mensajito', 'error' );
    mensaje.textContent = msg;
  } else if(tipo === 'neutro') {
    mensaje.remove()
    mensaje.classList.remove('error', 'positivo' );
    mensaje.classList.add('mensajito', 'neutro' );
    mensaje.textContent = msg;
  } else {
    mensaje.remove()
    mensaje.classList.add('mensajito', 'positivo' );
    mensaje.classList.add('error', 'neutro' );
    mensaje.textContent = msg;
  }

  while(divMensaje.firstChild) {
    divMensaje.removeChild(divMensaje.firstChild)
  }
  
    
  
  divMensaje.appendChild(mensaje);
    
  
}


function gastoHTML() {
  const listaGasto = document.querySelector('#lista-gasto');
  const lista = document.createElement('li');
  lista.classList.add('item');

  gasto.forEach(g => {
    const { tipo, valor } = g;
    lista.innerHTML = `
      <p>${tipo}</p>
      <p>$-${valor}</p>
    `;
    listaGasto.appendChild(lista);
  });

  const totalGasto = document.querySelector('#total-gasto');
  const totalGastoSpan = document.createElement('span');
  
  while(totalGasto.firstChild) {
    totalGasto.removeChild(totalGasto.firstChild)
  }
  const gastoReducer = gasto.reduce((total, gasto) => total + gasto.valor, 0);
  totalGastoSpan.textContent = `$-${gastoReducer}`;
  totalGasto.appendChild(totalGastoSpan);
  
}

function ingresoHTML() {
  const listaIngreso = document.querySelector('#lista-ingreso');
  const lista = document.createElement('li');
  lista.classList.add('item')

  ingreso.forEach(i => {
    const { tipo, valor } = i
    lista.innerHTML = `
        <p>${tipo}</p>
        <p>$${valor}</p>
    `;
    listaIngreso.appendChild(lista);

  });

  const totalIngreso = document.querySelector('#total-ingreso');
  const totalIngresoSpan = document.createElement('span');

  while(totalIngreso.firstChild) {
    totalIngreso.removeChild(totalIngreso.firstChild)
  }
  const ingresoReducer = ingreso.reduce((total, ingreso) => total + ingreso.valor, 0);
  totalIngresoSpan.textContent = `$ ${ingresoReducer}`;
  totalIngreso.appendChild(totalIngresoSpan);

  
}

 
function validarForm(e) {
  e.preventDefault();
  
  
  if(inputTipo.value === '' || inputValor.value === '') {
    mostrarMensaje('Todos los campos son obligatorios')
  }
  
}

function mostrarMensaje(msg) {

  const alerta = document.querySelector('.alerta');
  const mensaje = document.createElement('p');

  if(!alerta) {

    mensaje.classList.add('alerta');
    mensaje.textContent = msg;
  
    form.appendChild(mensaje);
  }

  setTimeout(() => {
    mensaje.remove()
  }, 2000);

}


function mostrarVentanaIngreso() {
  const btnFromSpan = document.querySelector('#btn-form span');

  containerForm.classList.add('active');
  form.classList.add('active')

  title.classList.remove('color-red');
  title.classList.add('color-green');
  titleSpan.textContent= 'Ingreso';

  pFromE.textContent='¿De dónde viene el ingreso?';
  pFromC.textContent='¿Cuanto es el ingreso?';

  btnFrom.classList.remove('bg-red');
  btnFrom.classList.add('bg-green');
  btnFromSpan.textContent='Ingreso'
}

function mostrarVentanaGasto() {
  const btnFromSpan = document.querySelector('#btn-form span');

  containerForm.classList.add('active');
  form.classList.add('active')

  title.classList.remove('color-green');
  title.classList.add('color-red');
  titleSpan.textContent= 'Gasto';

  pFromE.textContent='¿Cual fue el gasto?';
  pFromC.textContent='¿Cuanto fue el gasto?';

  btnFrom.classList.remove('bg-green');
  btnFrom.classList.add('bg-red');
  btnFromSpan.textContent='Gasto'
}