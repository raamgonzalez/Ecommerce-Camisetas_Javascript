

//---------CLASES, FUNCTIONS Y CONDICIONALES----------//


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
        let camisetaCreada = new Camiseta(camiseta.id, camiseta.anio, camiseta.equipo, camiseta.marca, camiseta.talla, camiseta.color, camiseta.precio, camiseta.imagen)
        lote2022.push(camisetaCreada)
    }
    localStorage.setItem("lote", JSON.stringify(lote2022))
}


if(localStorage.getItem("lote")){
    lote2022 = JSON.parse(localStorage.getItem("lote"));
}else{
    cargarLote()
    console.log("Este es lote")
    console.log(lote2022)
}

let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [];


//---------DOM----------//

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
    FinalizarCompra();
})


//Nuevas camisetas
function nuevaCamiseta(lote){
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
}

//Funcion agregar a carrito - DOM y LocalStorage
function agregarAlCarrito(camiseta){
    let libroAgregado = productosEnCarrito.find((element) => element.id == camiseta.id);
    if(libroAgregado == undefined){
        productosEnCarrito.push(camiseta);
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));

        Toastify({
            text: "Se agregó al carrito",
            duration: 3000,
            newWindow: true,
            style: {
                background: "#BB86FC",
                borderRadius: "5px",
            }
        }).showToast();
    }else{
        Toastify({
            text: "La camiseta ya existe en el carrito",
            duration: 3000,
            newWindow: true,
            style: {
                background: "#F78E69",
                borderRadius: "5px",
            }
        }).showToast();
    }
    
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
                                            <p class="container__product--p">Precio: ${camiseta.precio}</p>
                                            <button class="container__btn-primary" id="btnAgregarCarrito${camiseta.id}">Agregar al carrito</button>
                                        </div>
                                    </article>`
        products.appendChild(newCamiseta);
        let btnAgregarCarrito = document.getElementById(`btnAgregarCarrito${camiseta.id}`);
        btnAgregarCarrito.addEventListener("click",() => {agregarAlCarrito(camiseta)});
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


//Function calcular total 
function compraTotal(lote){
    let acumulador = 0
    acumulador = lote.reduce((acumulador, productoCarrito) => acumulador + productoCarrito.precio,0);
    console.log(acumulador)
    acumulador == 0 ? divCompra.innerHTML = `No hay productos en el carrito`: divCompra.innerHTML = `EL total de su carrito es ${acumulador}`
    // return acumulador
}


//Finalizar compra
function FinalizarCompra(lote){
    Swal.fire({
        title: '¿Está seguro de finalizar la compra?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    }).then((result) => {
        if (result.isConfirmed) {
            // let totalFinal = compraTotal()
            Swal.fire({
                title: 'Compra realizada con éxito',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                text: `Gracias por su compra. El total de su compra es "FALTA AGREGAR PRECIO TOTAL" y se ha realizado el dia ${fecha}`
            })
            localStorage.removeItem("carrito");
            productosEnCarrito = [];
            }else{
                Swal.fire({
                    title: 'Compra cancelada',
                    icon: 'info',
                    confirmButtonColor: '#3085d6',
                    text: 'Sus productos siguen en el carrito',
                    timer: 3000,
                })
            }
        })
}


//Funcion para clave de administrador
function passAdmin(){
    let pass = parseInt(prompt("Ingrese clave de administrador para esta opción: "));
    return pass == 1234
}


//Inicio
setTimeout(()=>{
    loader.remove();
    loaderTexto.remove();
    mostrarCatalogo(lote2022)

}, 3000)


//Mostrar y oculta carga de camisetas
//------------Necesito que no aparezca el modal si la clave es incorrecta--------------------------
// btnCargarCamiseta.addEventListener("click", () => {
//     passAdmin() == true ? alert("Bienvenido administrador") : alert("Clave incorrecta, no se puede realizar la operación.")
// });



//AGREGAR SPINNER CON setTimeOut
//CORREGIR QUE MUESTRE VALOR DE COMPRA TOTAL
//AGREGAR MODIFICADOR DE CLASSNAME para cambiar color al precio de los productos







