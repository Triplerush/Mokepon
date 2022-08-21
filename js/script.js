let ataques = ['FUEGO','AGUA','TIERRA'];
let ataqueJugador,ataqueEnemigo, estadoCombate,botonFuego,botonAgua,botonTierra;
let vidasJugador;
let vidasEnemigo;


function seleccionarMascota() {
  let seleccionarAtaque = document.getElementById('seleccionar-ataque');
  seleccionarAtaque.style.display = 'none';

  let seccionReiniciar = document.getElementById('reiniciar');
  seccionReiniciar.style.display = 'none';

  let botonMascota = document.getElementById("boton-mascota");
  vidasJugador = document.getElementById('vidas-jugador');
  vidasEnemigo = document.getElementById('vidas-enemigo');  

  botonMascota.addEventListener("click", mascotaSeleccionada);

  botonFuego = document.getElementById("boton-fuego");
  botonFuego.addEventListener("click", ()=>{
    ataqueSeleccionado('FUEGO');
  });

  botonAgua = document.getElementById("boton-agua");
  botonAgua.addEventListener("click",  ()=>{
    ataqueSeleccionado('AGUA');
  });

  botonTierra = document.getElementById("boton-tierra");
  botonTierra.addEventListener("click",  ()=>{
    ataqueSeleccionado('TIERRA');
  });

  let reiniciar = document.getElementById("boton-reiniciar");
  reiniciar.addEventListener("click", ()=>{
    location.reload();
  });

}

function mascotaSeleccionada(){
  let mascotas = ["Hypodoge","Catipepo","Ratigueya","Langostelvis","Tucapalma","Pydos"];
  let opcion = document.querySelector('input[name=mascota]:checked');
  let spanMascota = document.getElementById('mascota-jugador');
  let spanMascotaEnemigo = document.getElementById('mascota-enemigo');

  if(opcion != null){
    spanMascota.innerText = mascotas[opcion.value];
    let numAleatorio = Math.ceil(Math.random()*(mascotas.length)) -1;
    spanMascotaEnemigo.innerText = mascotas[numAleatorio];
    vidasJugador.innerText = 3;
    vidasEnemigo.innerText = 3;
  }else
    console.log('Selecciona una mascota');

  let seleccionarMascota = document.getElementById('seleccionar-mascota');
  seleccionarMascota.style.display = 'none';

  let seleccionarAtaque = document.getElementById('seleccionar-ataque');
  seleccionarAtaque.style.display = 'flex';
}

function ataqueSeleccionado(elemento){
  let numAleatorio = Math.ceil(Math.random()*(ataques.length)) -1;

  ataqueJugador = elemento;
  ataqueEnemigo = ataques[numAleatorio];
  determinarGanador();
}

function determinarGanador(){
  
  if(ataqueJugador == ataqueEnemigo){
    estadoCombate = 'EMPATE 😄';
  }else if(ataqueJugador == 'FUEGO' &&  ataqueEnemigo =='AGUA'){
    estadoCombate = 'GANASTE 🎉';
    vidasEnemigo.innerText--;
  }else if(ataqueJugador == 'AGUA' &&  ataqueEnemigo =='TIERRA'){
    estadoCombate = 'GANASTE 🎉';
    vidasEnemigo.innerText--;
  }else if(ataqueJugador == 'TIERRA' &&  ataqueEnemigo =='FUEGO'){
    estadoCombate = 'GANASTE 🎉';
    vidasEnemigo.innerText--;
  }else{
    estadoCombate = 'PERDISTE 😦';
    vidasJugador.innerText--;
  }
  mostrarMensaje();
}

function mostrarMensaje(){
  let resultado = document.getElementById('mensaje-resultado');
  let mensajeAtaqueJugador = document.getElementById('mensaje-ataque-jugador');
  let mensajeAtaqueEnemigo = document.getElementById('mensaje-ataque-enemigo');
  

  let mensajeJugador = document.createElement('p');
  let mensajeEnemigo = document.createElement('p');

  resultado.innerText = estadoCombate;
  mensajeJugador.innerText = ataqueJugador;
  mensajeEnemigo.innerText = ataqueEnemigo;

  mensajeAtaqueJugador.appendChild(mensajeJugador);
  mensajeAtaqueEnemigo.appendChild(mensajeEnemigo);

  if(vidasJugador.innerText <= 0){
    resultado.innerText = 'PERDISTE, estas sin vidas'; 
    reiniciar();
  }else if(vidasEnemigo.innerText <= 0){
    resultado.innerText = 'GANASTE, enemigo derrotado'; 
    reiniciar();
  }

}

function reiniciar(){
  let seccionReiniciar = document.getElementById('reiniciar');
  seccionReiniciar.style.display = 'flex';

  botonFuego.disabled = true;
  botonAgua.disabled = true;
  botonTierra.disabled = true;
}

window.addEventListener("load", seleccionarMascota);
