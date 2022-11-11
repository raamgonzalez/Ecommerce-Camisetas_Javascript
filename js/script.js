

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


// let productosEnCarrito = [];

// if(localStorage.getItem("carrito")){
//     productosEnCarrito = JSON.parse(localStorage.getItem("carrito"));
// }else{
//     localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
// }

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



//Styles del DOM
displayForm.style.display = "none";
btnGuardarCamiseta.style.display = "none";
btnSalir.style.display = "none";


//Eventos DOM
btnGuardarCamiseta.addEventListener("click",() => {nuevaCamiseta(lote2022)})
buscarCamiseta.addEventListener("input",() => {buscarInfo(buscarCamiseta.value, lote2022)})
btnSalir.addEventListener("click",() => {salir(true)})
botonCarrito.addEventListener("click", () => {cargarProductosCarrito(productosEnCarrito)});
//------------Generar switch para diferencias opciones de ordenamiento------------//
selectOrden.addEventListener("change", () => {
    console.log(selectOrden.value)
})



//Funcion para clave de administrador
function passAdmin(){
    let pass = parseInt(prompt("Ingrese clave de administrador para esta opción: "));
    return pass == 1234
}


//Función Buscar info
function buscarInfo(buscado, lote){
    console.log(buscado)
    let busqueda = lote.filter(
        (camiseta) => camiseta.equipo.toLowerCase().includes(buscado.toLowerCase()) || camiseta.marca.toLowerCase().includes(buscado.toLowerCase())
    )
    if(busqueda.length == 0){
        coincidencia.innerHTML = ""
        let nuevoDiv = document.createElement("div");
        nuevoDiv.innerHTML = `<h2>No se encontraron resultados</h2>`;
        coincidencia.appendChild(nuevoDiv);
        mostrarCatalogo(lote);
    }else{
        mostrarCatalogo(busqueda)
    }
}


//Función mostrar camisetas en el DOM
function mostrarCatalogo(lote){
    products.innerHTML = ""
    for(let camiseta of lote){
        let newCamiseta = document.createElement("div");
        newCamiseta.innerHTML = ` <article class="card" id="${camiseta.id}">
                                        <div class="container__title">
                                            <h3 class="titleCard"> ${camiseta.equipo}</h3>
                                            <img class="container__img" src="./assets/${camiseta.imagen}" alt="${camiseta.equipo} de marca ${camiseta.marca}">
                                        </div>
                                        <div class="container__product">
                                            <p class="container__product--p">${camiseta.marca}</p>
                                            <p class="container__product--p">${camiseta.anio}</p>
                                            <p class="container__product--p">${camiseta.talla}</p>
                                            <p class="container__product--p">${camiseta.precio}</p>
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
}


//Function imprimir en el modal
function cargarProductosCarrito(lote){
    modalBody.innerHTML = ""
    lote.forEach((productoCarrito) => {
        modalBody.innerHTML += `<article class="card" id="productoCarrito${productoCarrito.id}">
                                    <div class="card__title">
                                        <h3 class="titleCard"> ${productoCarrito.equipo}</h3>
                                        <img class="titleImg" src="./assets/${productoCarrito.imagen}" alt="${productoCarrito.equipo} de marca ${productoCarrito.marca}">
                                    </div>
                                        <div class="card__product">
                                            <p class="card__product--p">${productoCarrito.marca}</p>
                                            <p class="card__product--p">${productoCarrito.talla}</p>
                                            <p class="card__product--p">${productoCarrito.precio}</p>
                                            <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                                        </div>
                                </article>`
    });
    lote.forEach((productoCarrito, indice) => {
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {
            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
            cardProducto.remove();
            //Eliminamos del arra
            productosEnCarrito.splice(indice, 1);
            console.log(productosEnCarrito);
            //Eliminamos del storage
            localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
        })
    })
}


//Mostrar y oculta carga de camisetas
btnCargarCamiseta.addEventListener("click", () => {
    if(passAdmin() == true){
        if (displayForm.style.display == "none"){
            displayForm.style.display = "block";
            btnGuardarCamiseta.style.display = "block";
            btnSalir.style.display = "block";
        }else{
            document.getElementById("btnGuardarCamisetas").style.display = "none";
            document.getElementById("salir").style.display = "none";
    }
    }else{
        alert("Clave incorrecta, no se puede realizar la operación.");
    }
});


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

    Toastify({

        text: "Has guardado una camiseta",
        className: "info",
        gravity: "top", // `top` or `bottom`
        duration: 3000
        
        }).showToast();
}


//Funcion Salir
function salir(boolen){
    if(boolen == true){
        document.getElementById("display__form").style.display = "none";
        document.getElementById("btnGuardarCamisetas").style.display = "none";
        document.getElementById("salir").style.display = "none";
    }else{
        document.getElementById("display__form").style.display = "block";
    }
}







