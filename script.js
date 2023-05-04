let cantidadTarjetas = 24

let iconos = []
let selecciones = []

generarTablero()

function cargarIconos() {
    iconos = [
        '<i class="bi bi-pc-display-horizontal"></i>',
        '<i class="bi bi-airplane-engines-fill"></i>',
        '<i class="bi bi-heart-pulse-fill"></i>',
        '<i class="bi bi-briefcase-fill"></i>',
        '<i class="bi bi-bus-front"></i>',
        '<i class="bi bi-camera-reels-fill"></i>',
        '<i class="bi bi-buildings"></i>',
        '<i class="bi bi-train-freight-front"></i>',
        '<i class="bi bi-scissors"></i>',
        '<i class="bi bi-shield-lock-fill"></i>',
        '<i class="bi bi-shop"></i>',
        '<i class="bi bi-wrench-adjustable"></i>',
    ]
}

function generarTablero() {
    cargarIconos()
    selecciones = []
    let tablero = document.getElementById("tablero")
    let tarjetas = []
    for (let i = 0; i < cantidadTarjetas; i++) {
        tarjetas.push(`
        <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
            <div class="tarjeta" id="tarjeta${i}">
                <div class="cara trasera" id="trasera${i}">
                    ${iconos[0]}
                </div>
                <div class="cara superior">
                <i class="bi bi-bug-fill"></i>
                </div>
            </div>
        </div>        
        `)
        if (i % 2 == 1) {
            iconos.splice(0, 1)
        }
    }
    tarjetas.sort(() => Math.random() - 0.5)
    tablero.innerHTML = tarjetas.join(" ")
}

function seleccionarTarjeta(i) {
    let tarjeta = document.getElementById("tarjeta" + i)
    if (tarjeta.style.transform != "rotateY(180deg)") {
        tarjeta.style.transform = "rotateY(180deg)"
        selecciones.push(i)
    }
    if (selecciones.length == 2) {
        deseleccionar(selecciones)
        selecciones = []
    }
}

function deseleccionar(selecciones) {
    setTimeout(() => {
        let trasera1 = document.getElementById("trasera" + selecciones[0])
        let trasera2 = document.getElementById("trasera" + selecciones[1])
        if (trasera1.innerHTML != trasera2.innerHTML) {
            let tarjeta1 = document.getElementById("tarjeta" + selecciones[0])
            let tarjeta2 = document.getElementById("tarjeta" + selecciones[1])
            tarjeta1.style.transform = "rotateY(0deg)"
            tarjeta2.style.transform = "rotateY(0deg)"
        }else{
            trasera1.style.background = "plum"
            trasera2.style.background = "plum"
        }
        if (verificarFin()) {
           /* swal.fire({
                title: `EL JUEGO HA FINALIZADO`,
                text: `FELICITACIONES`,
                icon: `success`
            })*/
            swal.fire({
                title: `EL JUEGO HA FINALIZADO`,
                text: `FELICITACIONES`,
                imageUrl: './img/Gatook.svg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
              })
        }
    }, 1000);
}





function verificarFin(){
    for (let i = 0; i < cantidadTarjetas; i++) {
        let trasera = document.getElementById("trasera" + i)
        if (trasera.style.background != "plum") {
            return false
        }
    }
    return true  
}