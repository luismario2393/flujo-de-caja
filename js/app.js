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

document.addEventListener('DOMContentLoaded', () => {

  btnIngreso.addEventListener('click', mostrarVentanaIngreso);
  btnGasto.addEventListener('click', mostrarVentanaGasto);

  btnFormCan.addEventListener('click', e => {
    e.preventDefault();

    containerForm.classList.remove('active');
    form.classList.remove('active')
  })

});

// Funciones

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