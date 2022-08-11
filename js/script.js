function seleccionarMascota() {
  let botonMascota = document.getElementById("boton-mascota");
  botonMascota.addEventListener("click", saludar);
}

function saludar(){
    alert("hola")
}

window.addEventListener("load", seleccionarMascota);
