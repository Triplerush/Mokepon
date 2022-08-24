const seleccionarAtaque = document.getElementById("seleccionar-ataque");
const botonFuego = document.getElementById("boton-fuego");
const botonAgua = document.getElementById("boton-agua");
const botonTierra = document.getElementById("boton-tierra");
const botonMascota = document.getElementById("boton-mascota");
const spanMascota = document.getElementById("mascota-jugador");
const spanMascotaEnemigo = document.getElementById("mascota-enemigo");
const seleccionaMascota = document.getElementById("seleccionar-mascota");
const botonReiniciar = document.getElementById("boton-reiniciar");
const botonPelear = document.getElementById("boton-pelear");
const resultado = document.getElementById("mensaje-resultado");
const mensajeAtaqueJugador = document.getElementById("mensaje-ataque-jugador");
const mensajeAtaqueEnemigo = document.getElementById("mensaje-ataque-enemigo");
const seccionReiniciar = document.getElementById("reiniciar");
const seccionTarjetas = document.querySelector(".tarjetas");
const seccionBotonesAtaque = document.querySelector(".botones-ataque");
let ataqueJugador = [],
  secuenciaCombate = [],
  ataqueEnemigo,
  estadoCombate,
  golpesJugador = 0,
  golpesEnemigo = 0,
  mascotaEnemigo,
  numAleatorio,
  opcionMokepon;

class Mokepon {
  constructor(nombre, foto, vida, ataques) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = ataques;
  }
}

let mokepones = [];

let imgTemp =
  "https://static.platzi.com/media/tmp/class-files/github/curso-programacion-basica/curso-programacion-basica-35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_hipodoge_attack.png";
let ataquesHipodoge = [
  {nombre: '💧', id: 'boton-agua'},
  {nombre: '💧', id: 'boton-agua'},
  {nombre: '💧', id: 'boton-agua'},
  {nombre: '🔥', id: 'boton-fuego'},
  {nombre: '🌱', id: 'boton-tierra'},
];
let hipodoge = new Mokepon("hipodoge", imgTemp, 3, ataquesHipodoge);

let imgTemp2 =
  "https://static.platzi.com/media/tmp/class-files/github/curso-programacion-basica/curso-programacion-basica-35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_capipepo_attack.png";
let ataquesCatipepo = [
  {nombre: '🌱', id: 'boton-tierra'},
  {nombre: '🌱', id: 'boton-tierra'},
  {nombre: '🌱', id: 'boton-tierra'},
  {nombre: '🔥', id: 'boton-fuego'},
  {nombre: '💧', id: 'boton-agua'},
];
let catipepo = new Mokepon("catipepo", imgTemp2, 3, ataquesCatipepo);

let imgTemp3 =
  "https://static.platzi.com/media/tmp/class-files/github/curso-programacion-basica/curso-programacion-basica-35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_ratigueya_attack.png";
let ataquesRatigueya = [
  {nombre: '🔥', id: 'boton-fuego'},
  {nombre: '🔥', id: 'boton-fuego'},
  {nombre: '🔥', id: 'boton-fuego'},
  {nombre: '💧', id: 'boton-agua'},
  {nombre: '🌱', id: 'boton-tierra'},
];
let ratigueya = new Mokepon("ratigueya", imgTemp3, 3, ataquesRatigueya);

mokepones.push(hipodoge, catipepo, ratigueya);

function seleccionarMascota() {
  seleccionarAtaque.style.display = "none";
  seccionReiniciar.style.display = "none";
  botonPelear.style.display = "none";

  mokepones.forEach((mokepon, key) => {
    opcionMokepon = `
    <input type="radio" name="mascota" id="${mokepon.nombre}" value="${key}">
    <label class="tarjeta-de-mokepon" for="${mokepon.nombre}">
        <p>${mokepon.nombre}</p>
        <img src=${mokepon.foto} alt=${mokepon.nombre}>
    </label>
    `;
    seccionTarjetas.innerHTML += opcionMokepon;
  });

  //golpesJugador = document.getElementById("vidas-jugador");
  //golpesEnemigo = document.getElementById("vidas-enemigo");

  botonMascota.addEventListener("click", mascotaSeleccionada);

  botonReiniciar.addEventListener("click", () => {
    location.reload();
  });
}

function mascotaSeleccionada() {
  let opcion = document.querySelector("input[name=mascota]:checked");
  if (opcion != null) {
    let mascota = mokepones[opcion.value];
    mascota.ataques.forEach((ataque,index) => {
      seccionBotonesAtaque.innerHTML += `
        <button id="${ataque.id}${index}" class="boton-ataque ${ataque.id} ${ataque.id}-hover" onclick=ataqueSeleccionado('${ataque.nombre}','${ataque.id}','${index}')>${ataque.nombre}</button>
      `;
    });
    spanMascota.innerText = mascota.nombre;
    numAleatorio = Math.ceil(Math.random() * mokepones.length) - 1;
    mascotaEnemigo = mokepones[numAleatorio];
    spanMascotaEnemigo.innerText = mascotaEnemigo.nombre;
    seleccionaMascota.style.display = "none";
    seleccionarAtaque.style.display = "flex";
  } else console.log("Selecciona una mascota");
}

function ataqueSeleccionado(elemento, id,index) {
  let button = document.getElementById(id+index);
  ataqueJugador.push(elemento);
  button.style.background = "#002B5B";
  button.setAttribute('class',"boton-ataque " + id);
  button.disabled = true;
  if(ataqueJugador.length == 5)
    botonPelear.style.display = 'flex';
}

function determinarGanador() {
  ataqueEnemigo = mascotaEnemigo.ataques.sort(
    () => Math.random() - 0.5
  );

  for (let i = 0; i < ataqueJugador.length; i++) {
    if (ataqueEnemigo[i].nombre == ataqueJugador[i]) {
      secuenciaCombate.push('Empate');
    } else if (ataqueJugador[i] == "🔥" && ataqueEnemigo[i].nombre == "🌱") {
      secuenciaCombate.push('Ganaste');
      golpesJugador++;
    } else if (ataqueJugador[i] == "💧" && ataqueEnemigo[i].nombre == "🔥") {
      secuenciaCombate.push('Ganaste');
      golpesJugador++;
    } else if (ataqueJugador[i] == "🌱" && ataqueEnemigo[i].nombre == "💧") {
      secuenciaCombate.push('Ganaste');
      golpesJugador++;
    } else {
      secuenciaCombate.push('Perdiste');
      golpesEnemigo++;
    }
  }
  mostrarMensaje();
}

function mostrarMensaje() {
  let mensajeJugador = document.createElement("p");
  let mensajeEnemigo = document.createElement("p");

  resultado.innerText = estadoCombate;
  mensajeJugador.innerText = ataqueJugador;
  mensajeEnemigo.innerText = ataqueEnemigo;

  mensajeAtaqueJugador.appendChild(mensajeJugador);
  mensajeAtaqueEnemigo.appendChild(mensajeEnemigo);

  if (vidasJugador.innerText <= 0) {
    resultado.innerText = "PERDISTE, estas sin vidas";
    reiniciar();
  } else if (vidasEnemigo.innerText <= 0) {
    resultado.innerText = "GANASTE, enemigo derrotado";
    reiniciar();
  }
}

function reiniciar() {
  seccionReiniciar.style.display = "flex";

  botonFuego.disabled = true;
  botonAgua.disabled = true;
  botonTierra.disabled = true;
}

window.addEventListener("load", seleccionarMascota);
