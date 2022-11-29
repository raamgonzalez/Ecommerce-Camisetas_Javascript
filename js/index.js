
//-----------------------------------Tienda de camisetas-------------------------------------------//

//Clave de administrador
let claveAdmin = 1234;

//Class constructora de Objetos
class Camiseta{
    constructor(id, anio, marca, equipo, talla, color, precio, imagen){
        this.id = id;
        this.anio = anio;
        this.equipo = equipo;
        this.marca = marca;
        this.talla = talla;
        this.color = color;
        this.precio = precio;
        this.imagen = imagen;
    }
    //Metodos
    mostrarCamiseta(){
        alert(`La camiseta es de ${this.equipo}, del año ${this.anio}, de la marca ${this.marca}, de talla ${this.talla}, y cuesta $ ${this.precio}. Su id es ${this.id}`);
    }
}


//Array de objetos
let lote2022 = []

const cargarLote = async() => {
    const res = await fetch("camisetas.json")
    const data = await res.json()
    console.log(data)
    for(let camiseta of data){
        let camisetaCreada = new Camiseta(camiseta.id, camiseta.anio, camiseta.marca, camiseta.equipo, camiseta.talla, camiseta.color, camiseta.precio, camiseta.imagen)
        lote2022.push(camisetaCreada)
    }
    localStorage.setItem("lote", JSON.stringify(lote2022))
    console.log(lote2022)
}


if(localStorage.getItem("lote")){
    lote2022 = JSON.parse(localStorage.getItem("lote"));
}else{
    cargarLote()
    console.log("Este es lote")
    console.log(lote2022)
}

let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [];


//Luxon
const DateTime = luxon.DateTime
const fechaHoy = DateTime.now()
let divFechaHoy = document.getElementById("fechaHoy")
let fecha = fechaHoy.toLocaleString(DateTime.DATE_FULL)
divFechaHoy.innerHTML = `${fecha}`


//Capturas DOM
let products = document.getElementById("products");
let btnGuardarCamiseta = document.getElementById("btnGuardarCamisetas");
let btnCargarCamiseta = document.getElementById("btnCargarCamiseta");
let buscarCamiseta = document.getElementById("buscarCamiseta");
let btnSalir = document.getElementById("salir");
let displayForm = document.getElementById("display__form");
let modalBody = document.getElementById("modal-body");
let botonCarrito = document.getElementById("botonCarrito");
let coincidencia = document.getElementById("coincidencia");
let selectOrden = document.getElementById("selectOrden");
let divCompra = document.getElementById("precioTotal")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra");
let loaderTexto = document.getElementById("loaderTexto");
let loader = document.getElementById("loader");
let cClave = document.getElementById("cClave");
let btnCargarContrasenia = document.getElementById("btnCargarContrasenia");
let idModalAgregarCamiseta = document.getElementById("idModalAgregarCamiseta");


//Eventos DOM
btnGuardarCamiseta.addEventListener("click",() => {nuevaCamiseta(lote2022)})
buscarCamiseta.addEventListener("input",() => {buscarInfo(buscarCamiseta.value, lote2022)})
btnSalir.addEventListener("click",() => {salir(true)})
botonCarrito.addEventListener("click", () => {cargarProductosCarrito(productosEnCarrito)});
selectOrden.addEventListener("change", () => {
    if(selectOrden.value == 1){
        ordenarMayorMenor(lote2022);
    }else if(selectOrden.value == 2){
        ordenarMenorMayor(lote2022);
    }else if(selectOrden.value == 3){
        ordenarAlfabeticamente(lote2022);
    }else{
        mostrarCatalogo(lote2022);
    }
})
botonFinalizarCompra.addEventListener("click", () => {
    finalizarCompra();
})
btnCargarContrasenia.addEventListener("click", () => {ingresoAdmin()});


function ingresoAdmin(){
    let clave = cClave.value;
    if(clave == claveAdmin){
        Toastify({
            text: "Has ingresado como administrador",
            duration: 2000,
            newWindow: true,
            style: {
                background: "#BB86FC",
                borderRadius: "5px",
            }
        }).showToast();
        console.log("Ingreso correcto")
        displayForm.style.display = "block";
        return true
    }else{
        displayForm.style.display = "none";
        console.log("Ingreso incorrecto")
        Toastify({
            text: "Clave incorrecta, no podras cargar camisetas",
            duration: 2000,
            newWindow: true,
            style: {
                background: "#F78E69",
                borderRadius: "5px",
            }
        }).showToast();
        return false
    }
}

function compraTotal(lote){
    let acumulador = 0
    acumulador = lote.reduce((acc, productoCarrito) => acc + productoCarrito.precio,0)
    console.log(acumulador)
    acumulador == 0 ? divCompra.innerHTML = `No hay productos en el carrito`: divCompra.innerHTML = `EL total de su carrito es ${acumulador}`
    return acumulador
}

//Nuevas camisetas
function nuevaCamiseta(lote){
    if(ingresoAdmin()){
        let inputAnio = document.getElementById("cAnio");
        let inputMarca = document.getElementById("cMarca");
        let inputEquipo = document.getElementById("cEquipo");
        let inputTalle = document.getElementById("cTalle");
        let inputColor = document.getElementById("cColor");
        let inputPrecio = document.getElementById("cPrecio");
        let camisetaCreada = new Camiseta(lote.length+1, inputAnio.value, inputMarca.value, inputEquipo.value, inputTalle.value, inputColor.value, parseInt(inputPrecio.value), "camisetaTest.jpg");

        lote.push(camisetaCreada);

        //Se modifica array del storage
        localStorage.setItem("lote", JSON.stringify(lote));
        mostrarCatalogo(lote);
        console.log(lote);

        inputAnio.value = ""
        inputMarca.value = ""
        inputEquipo.value = ""
        inputTalle.value = ""
        inputColor.value = ""
        inputPrecio.value = ""

        Swal.fire({
            position: 'center',
            icon: 'success',
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#BB86FC',
            title: 'Has guardado una camiseta nueva',
            text: '¡Gracias por tu aporte!',
            showConfirmButton: true,
            timer: 2000
        })
        }else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                confirmButtonText: 'Continuar',
                confirmButtonColor: '#BB86FC',
                title: 'No se ha podido guardar la camiseta',
                text: '¡Clave incorrecta!',
                showConfirmButton: true,
                timer: 2000
            })
        }
}


//Funcion agregar a carrito - DOM y LocalStorage
function agregarAlCarrito(camiseta){
    let libroAgregado = productosEnCarrito.find((element) => element.id == camiseta.id);
    if(libroAgregado == undefined){
        productosEnCarrito.push(camiseta);
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));

        Toastify({
            text: "Se agregó al carrito",
            duration: 2000,
            newWindow: true,
            style: {
                background: "#BB86FC",
                borderRadius: "5px",
            }
        }).showToast();
    }else{
        Toastify({
            text: "La camiseta ya existe en el carrito",
            duration: 2000,
            newWindow: true,
            style: {
                background: "#F78E69",
                borderRadius: "5px",
            }
        }).showToast();
    }
    
}


//Function imprimir en el modal
function cargarProductosCarrito(lote){
    modalBody.innerHTML = ""
    lote.forEach((productoCarrito) => {
        modalBody.innerHTML += `<article class="card" id="productoCarrito${productoCarrito.id}">
                                    <div class="card__title">
                                        <h3 class="titleCard"> ${productoCarrito.equipo}</h3>
                                        <hr>
                                        <img class="titleImg" src="./assets/${productoCarrito.imagen}" alt="${productoCarrito.equipo} de marca ${productoCarrito.marca}">
                                    </div>
                                        <div class="card__product">
                                            <p class="card__product--p">Marca: ${productoCarrito.marca}</p>
                                            <p class="card__product--p">Talle: ${productoCarrito.talla}</p>
                                            <p class="card__product--p">Precio: ${productoCarrito.precio}</p>
                                        </div>
                                    <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                                </article>`
    });
    lote.forEach((productoCarrito, indice) => {
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {
            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
            cardProducto.remove();
            //Eliminamos del array
            let productoEliminar = lote.find(camiseta => camiseta.id == productoCarrito.id);
            let posicion = lote.indexOf(productoEliminar)
            lote.splice(posicion, 1);

            console.log(productosEnCarrito);
            //Eliminamos del storage
            localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
            compraTotal(lote);
        })
    })
    compraTotal(lote);
}


//Selector para ordenamiento de camisetas
function ordenarMayorMenor(lote){
    let mayorMenor = lote.slice();
    mayorMenor.sort((a, b) => (b.precio - a.precio));
    mostrarCatalogo(mayorMenor);
}

function ordenarMenorMayor(lote){
    let menorMayor = lote.slice();
    menorMayor.sort((a, b) => (a.precio - b.precio));
    mostrarCatalogo(menorMayor);
}

function ordenarAlfabeticamente(lote){
    let alfabeticamente = lote.slice();
    alfabeticamente.sort((a, b) => {
    if(a.equipo < b.equipo) return -1;
    if(a.equipo > b.equipo) return 1;
    return 0    
})
    mostrarCatalogo(alfabeticamente);};


//Función de busqueda
function buscarInfo(buscado, lote){
    let busqueda = lote.filter(
        (camiseta) => camiseta?.equipo.toLowerCase().includes(buscado.toLowerCase()) || camiseta?.marca.toLowerCase().includes(buscado.toLowerCase()))
        busqueda.length == 0 ?
        (coincidencia.innerHTML = `<h2 class="h2__result">No se encontraron resultados.</h2>`, mostrarCatalogo(lote))
        : (coincidencia.innerHTML = "", mostrarCatalogo(busqueda))
}


//Función mostrar camisetas en el DOM
function mostrarCatalogo(lote){
    products.innerHTML = ""
    for(let camiseta of lote){
        let newCamiseta = document.createElement("div");
        newCamiseta.innerHTML = ` <article class="card" id="${camiseta.id}">
                                        <div class="container__title">
                                            <h3 class="titleCard"> ${camiseta.equipo}</h3>
                                            <hr>
                                            <img class="container__img" src="./assets/${camiseta.imagen}" alt="${camiseta.equipo} de marca ${camiseta.marca}">
                                        </div>
                                        <div class="container__product">
                                            <p class="container__product--p">Marca:  ${camiseta.marca}</p>
                                            <p class="container__product--p">Año:  ${camiseta.anio}</p>
                                            <p class="container__product--p">Talle:  ${camiseta.talla}</p>
                                            <p class="container__product--p ${camiseta.precio <= 5000 ? "ofertaColor" : "precioBase"}">Precio: ${camiseta.precio} ${camiseta.precio <= 5000 ? "OFERTA!" : ""}</p>
                                            <button class="container__btn-primary" id="btnAgregarCarrito${camiseta.id}">Agregar al carrito</button>
                                        </div>
                                    </article>`
        products.appendChild(newCamiseta);
        let btnAgregarCarrito = document.getElementById(`btnAgregarCarrito${camiseta.id}`);
        btnAgregarCarrito.addEventListener("click",() => {agregarAlCarrito(camiseta)});
    }
}


//Finalizar compra
function finalizarCompra(lote){
    Swal.fire({
        title: '¿Está seguro de finalizar la compra?',
        icon: 'info',
        iconColor: '#f7b500',   
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        confirmButtonColor: '#BB86FC',
        cancelButtonColor: '#F78E69',
    }).then((result)=>{
        if(result.isConfirmed){
            Swal.fire({
                title: 'Compra realizada con éxito',
                icon: 'success',
                confirmButtonColor: '#BB86FC',
                text: `Gracias por su compra. La misma se ha realizado el dia ${fecha}`
            })
            productosEnCarrito = [];
            localStorage.removeItem("carrito");
            }else{
                Swal.fire({
                    title: 'Compra cancelada',
                    icon: 'info',
                    confirmButtonColor: '#f7b500',
                    text: 'Sus productos siguen en el carrito',
                    timer: 3000,
                })
            }
        })
}


//Inicio
setTimeout(()=>{
    loader.remove();
    loaderTexto.remove();
    mostrarCatalogo(lote2022)

}, 1000)









