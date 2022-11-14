

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

//Instanciación de Objetos
const camiseta01 = new Camiseta(1,2022, "Nike", "River Plate", "L", "Rojo", 7000, "camisetaRiver2022.jpg");
const camiseta02 = new Camiseta(2,2020, "Adidas", "River Plate", "M", "Rojo y blanco", 3000, "camisetaRiver2020.jpg");
const camiseta03 = new Camiseta(3,2022, "Adidas", "Boca Juniors", "L", "Azul y Oro", 8000, "camisetaBoca2022.jpg" );
const camiseta04 = new Camiseta(4,2019, "Adidas", "Boca Juniors", "S", "Azul", 3500, "camisetaBoca2019.jpg");
const camiseta05 = new Camiseta(5,2018, "Kappa", "Racing Club", "XL", "Celeste y Blanco", 4000, "camisetaRacing2018.jpg");
const camiseta06 = new Camiseta(6, 2020, "Kappa", "Racing Club", "L", "Celeste y Blanco", 5000, "camisetaRacing2020.jpg");
const camiseta07 = new Camiseta(7, 2020, "Puma", "Independiente", "XL", "Rojo", 6000, "camisetaIndependiente2020.jpg" )
const camiseta08 = new Camiseta(8, 2021, "Puma", "Independiente", "XS", "Rojo", 4320, "camisetaIndependiente2021.jpg" )

//Array de objetos
let lote2022 = []


if(localStorage.getItem("lote")){
    lote2022 = JSON.parse(localStorage.getItem("lote"));
}else{
    lote2022.push(camiseta01, camiseta02, camiseta03, camiseta04, camiseta05, camiseta06, camiseta07, camiseta08);
    localStorage.setItem("lote", JSON.stringify(lote2022));
}

let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [];


//---------DOM----------//


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



//Eventos DOM
btnGuardarCamiseta.addEventListener("click",() => {nuevaCamiseta(lote2022)})
buscarCamiseta.addEventListener("input",() => {buscarInfo(buscarCamiseta.value, lote2022)})
btnSalir.addEventListener("click",() => {salir(true)})
botonCarrito.addEventListener("click", () => {cargarProductosCarrito(productosEnCarrito)});


//Selector para ordenamiento de camisetas
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


//Funcion para clave de administrador
function passAdmin(){
    let pass = parseInt(prompt("Ingrese clave de administrador para esta opción: "));
    return pass == 1234
}


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
}mostrarCatalogo(lote2022)


//Funcion agregar a carrito - DOM y LocalStorage
function agregarAlCarrito(camiseta){
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
}

//Function calcular total 
function compraTotal(lote){
    let acumulador = 0
    acumulador = lote.reduce((acumulador, productoCarrito) => acumulador + productoCarrito.precio,0)
    console.log(acumulador)
    acumulador == 0 ? divCompra.innerHTML = `No hay productos en el casrrito`: divCompra.innerHTML = `EL total de su carrito es ${acumulador}`
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
            productosEnCarrito.splice(indice, 1);
            console.log(productosEnCarrito);
            //Eliminamos del storage
            localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
            compraTotal(lote);
        })
    })
    compraTotal(lote);
}


//Mostrar y oculta carga de camisetas
//------------Necesito que no aparezca el modal si la clave es incorrecta--------------------------
// btnCargarCamiseta.addEventListener("click", () => {
//     passAdmin() == true ? alert("Bienvenido administrador") : alert("Clave incorrecta, no se puede realizar la operación.")
// });



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

    //TANBIEN MODIFICAMOS ARRAY DEL STORAGE:
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








