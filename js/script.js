const seleccionarAtaque = document.getElementById("seleccionar-ataque");
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
const spanGolpesJugador = document.getElementById("golpes-jugador");
const spanGolpesEnemigo = document.getElementById("golpes-enemigo");
const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");


let lienzo = mapa.getContext("2d");
let mokemap = new Image();
mokemap.src = '../img/mokemap.png';

let ataqueJugador = [],
  secuenciaCombate = [],
  ataqueEnemigo = [],
  mokepones = [],
  mokeponesEnemigos = [],
  estadoCombate,
  interval,
  golpesJugador = 0,
  golpesEnemigo = 0,
  mascotaEnemigo,
  numAleatorio,
  mascota,
  opcionMokepon;

class Mokepon {
  constructor(nombre, foto, vida, ataques,fotoMapa,x=10,y=10) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = ataques;
    this.x = x;
    this.y = y;
    this.ancho = 40;
    this.alto = 40;
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
  }
  pintarMokepon() {
    lienzo.drawImage(this.mapaFoto,this.x,this.y,this.ancho,this.alto);
  }
}


let ataquesHipodoge = [
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-tierra" },
];
let ataquesCapipepo = [
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "💧", id: "boton-agua" },
];
let ataquesRatigueya = [
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🌱", id: "boton-tierra" },
];

let hipodoge = new Mokepon("hipodoge", "img/hipodoge_img.png", 3, ataquesHipodoge,"../img/hipodoge.png");
let capipepo = new Mokepon("capipepo", "img/capipepo_img.png", 3, ataquesCapipepo,"../img/capipepo.png");
let ratigueya = new Mokepon("ratigueya", "img/ratigueya_img.png", 3, ataquesRatigueya,"../img/ratigueya.png");

let hipodogeEnemigo = new Mokepon("hipodoge", "img/hipodoge_img.png", 3, ataquesHipodoge,"../img/hipodoge.png",150,100);
let capipepoEnemigo = new Mokepon("capipepo", "img/capipepo_img.png", 3, ataquesCapipepo,"../img/capipepo.png",150,100);
let ratigueyaEnemigo = new Mokepon("ratigueya", "img/ratigueya_img.png", 3, ataquesRatigueya,"../img/ratigueya.png",150,100);


mokepones.push(hipodoge, capipepo, ratigueya);
mokeponesEnemigos.push(hipodogeEnemigo, capipepoEnemigo, ratigueyaEnemigo);

function seleccionarMascota() {
  sectionVerMapa.style.display = 'none';
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

  botonMascota.addEventListener("click", mascotaSeleccionada);
  botonReiniciar.addEventListener("click", () => {
    location.reload();
  });
}

function mascotaSeleccionada() {
  let opcion = document.querySelector("input[name=mascota]:checked");
  if (opcion != null) {
    mascota = mokepones[opcion.value];
    mascota.ataques.forEach((ataque, index) => {
      seccionBotonesAtaque.innerHTML += `
        <button id="${ataque.id}${index}" class="boton-ataque ${ataque.id} ${ataque.id}-hover" onclick=ataqueSeleccionado('${ataque.nombre}','${ataque.id}','${index}')>${ataque.nombre}</button>
      `;
    });
    spanMascota.innerText = mascota.nombre;
    numAleatorio = Math.ceil(Math.random() * mokepones.length) - 1;
    mascotaEnemigo = mokeponesEnemigos[numAleatorio];
    
    spanMascotaEnemigo.innerText = mascotaEnemigo.nombre;
    seleccionaMascota.style.display = "none";

    sectionVerMapa.style.display = "flex";
    moverTeclado();
    pintarCanvas();
    //seleccionarAtaque.style.display = "flex";
  } else console.log("Selecciona una mascota");
}

function ataqueSeleccionado(elemento, id, index) {
  let button = document.getElementById(id + index);
  ataqueJugador.push(elemento);
  button.style.background = "#002B5B";
  button.setAttribute("class", "boton-ataque " + id);
  button.disabled = true;
  if (ataqueJugador.length == 5) botonPelear.style.display = "flex";
}

function determinarGanador() {
  mascotaEnemigo.ataques.forEach((ataque)=>{
    ataqueEnemigo.push(ataque.nombre);
  })
  ataqueEnemigo = ataqueEnemigo.sort(() => Math.random() - 0.5);
  console.log(ataqueEnemigo)

  for (let i = 0; i < ataqueJugador.length; i++) {
    if (ataqueEnemigo[i] == ataqueJugador[i]) {
      secuenciaCombate.push("Empate");
    } else if (ataqueJugador[i] == "🔥" && ataqueEnemigo[i] == "🌱") {
      secuenciaCombate.push("Ganaste");
      golpesJugador++;
    } else if (ataqueJugador[i] == "💧" && ataqueEnemigo[i] == "🔥") {
      secuenciaCombate.push("Ganaste");
      golpesJugador++;
    } else if (ataqueJugador[i] == "🌱" && ataqueEnemigo[i] == "💧") {
      secuenciaCombate.push("Ganaste");
      golpesJugador++;
    } else {
      secuenciaCombate.push("Perdiste");
      golpesEnemigo++;
    }
  }
  mostrarMensaje();
}

function mostrarMensaje() {
  for (let i = 0; i < ataqueJugador.length; i++) {
    let mensajeJugador = document.createElement("p");
    let mensajeEnemigo = document.createElement("p");
    mensajeJugador.innerText = ataqueJugador[i];
    mensajeEnemigo.innerText = ataqueEnemigo[i];

    mensajeAtaqueJugador.appendChild(mensajeJugador);
    mensajeAtaqueEnemigo.appendChild(mensajeEnemigo);
  }
  spanGolpesJugador.innerText = golpesJugador;
  spanGolpesEnemigo.innerText = golpesEnemigo;


  definirGanador();
}

function pintarCanvas(){
  mapa.width = 320;
  mapa.height = 240;

  lienzo.clearRect(0,0,mapa.width, mapa.height)
  lienzo.drawImage(mokemap,0,0,mapa.width,mapa.height);
  mascota.pintarMokepon();
  mascotaEnemigo.pintarMokepon();
}

function moverArriba(){
  interval = setInterval(()=>{
    mascota.y -= 5;
    pintarCanvas();
  },50)
}

function moverAbajo(){
  interval = setInterval(()=>{
    mascota.y += 5;
    pintarCanvas();
  },50)

}

function moverDerecha(){
  interval = setInterval(()=>{
    mascota.x += 5;
    pintarCanvas();
  },50)

}

function moverIzquierda(){
  interval = setInterval(()=>{
    mascota.x -= 5;
    pintarCanvas();
  },50)
}

function pararMovimiento(){
  clearInterval(interval);
}

function definirGanador() {
  if (golpesJugador < golpesEnemigo) {
    resultado.innerText = "PERDISTE, recibiste más golpes";
  } else if (golpesJugador > golpesEnemigo) {
    resultado.innerText = "GANASTE, enemigo derrotado";
  } else {
    resultado.innerText = "Empate, mismo número de golpes";
  }

  seccionReiniciar.style.display = "flex";
  botonPelear.style.display = "none";
}

function moverTeclado() {
  window.addEventListener('keydown', e=> {
      if (e.key==='ArrowUp') {
        mascota.y -= 5;
        pintarCanvas();
      } else if (e.key==='ArrowDown') {
        mascota.y += 5;
        pintarCanvas();
      } else if (e.key==='ArrowLeft') {
        mascota.x -= 5;
        pintarCanvas();
      } else if (e.key==='ArrowRight') {
        mascota.x += 5;
        pintarCanvas();
      }
  })

  window.addEventListener('keyup',e=>{
    pararMovimiento();
  })
}

window.addEventListener("load", seleccionarMascota);
