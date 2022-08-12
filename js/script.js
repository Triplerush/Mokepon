function seleccionarMascota() {
  let botonMascota = document.getElementById("boton-mascota");
  botonMascota.addEventListener("click", mascotaSeleccionada);
}

function mascotaSeleccionada(){
  let mascotas = ["Hypodoge","Catipepo","Ratigueya","Langostelvis","Tucapalma","Pydos"];
  let opcion = document.querySelector('input[name=mascota]:checked');
  let spanMascota = document.getElementById('mascota-jugador');
  let spanMascotaEnemigo = document.getElementById('mascota-enemigo');

  if(opcion != null){
    spanMascota.innerText = mascotas[opcion.value];
    let numAleatorio = Math.ceil(Math.random()*(mascotas.length-1));
    spanMascotaEnemigo.innerText = mascotas[numAleatorio]
  }else
    console.log('Selecciona una mascota');
}


window.addEventListener("load", seleccionarMascota);
