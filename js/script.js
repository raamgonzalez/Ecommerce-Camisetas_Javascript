
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

const lote2022 = [camiseta01, camiseta02, camiseta03, camiseta04, camiseta05, camiseta06, camiseta07, camiseta08];


//FUNCIONES

//Función Opciones
function preguntarOpcion(){
    let opcion = parseInt(prompt("Ingrese una opción: \n 1.  Mostrar camisetas \n 2.  Buscar por equipo \n 3.  Buscar por año  \n 4.  Agregar nueva camiseta  \n 5.  Actualizar precio \n 6.  Eliminar camiseta \n 7.  Valor total del lote \n 0.  Salir" ));
    menu(opcion);
}

//Función Mostrar Lote
function mostrarLote(lote){
    lote.forEach((camiseta) => {
        camiseta.mostrarCamiseta()
    });
}

//Función Buscar por equipo
let camisetasEncontradasPorEquipo = [];

function buscarPorEquipo(lote){
    let equipoBuscado = prompt("Ingrese el equipo de la camiseta que desea buscar: ");
    camisetasEncontradasPorEquipo = lote.filter(
        (camiseta)=> camiseta.equipo.toLowerCase() == equipoBuscado.toLowerCase()
    )
    while(camisetasEncontradasPorEquipo.length == 0){
        alert("No se encontró ninguna camiseta de este equipo")
        console.log("No se encontró ninguna camiseta de este equipo");
        let confirm = prompt("¿Desea realizar otra busqueda? S/N");
        if(confirm.toUpperCase() == "S"){
            let equipoBuscado = prompt("Ingrese el equipo de la camiseta que desea buscar: ");
            camisetasEncontradasPorEquipo = lote.filter(
                (camiseta)=> camiseta.equipo.toLowerCase() == equipoBuscado.toLowerCase()
            )}else{
                alert("Gracias por utilizar el sistema, seras direccionado al menu principal");
                preguntarOpcion()  
            }
    }
    console.log(camisetasEncontradasPorEquipo);
    mostrarLote(camisetasEncontradasPorEquipo);
}

//Función Buscar por año
let camisetasEncontradasPorAnio = [];

function buscarPorAnio(lote){
    let equipoBuscado = parseInt(prompt("Ingrese el año de la camiseta que desea buscar: "));
    camisetasEncontradasPorAnio = lote.filter(
        (periodo)=> periodo.anio == equipoBuscado
    )
    while(camisetasEncontradasPorAnio.length == 0){
        alert("No se encontró ninguna camiseta en ese año")
        console.log("No se encontró ninguna camiseta en ese año");
        let confirm = prompt("¿Desea realizar otra busqueda? S/N");
        if(confirm.toUpperCase() == "S"){
            let equipoBuscado = parseInt(prompt("Ingrese el año de la camiseta que desea buscar: "));
            camisetasEncontradasPorAnio = lote.filter(
                (periodo)=> periodo.anio == equipoBuscado
            )}else{
                alert("Gracias por utilizar el sistema, seras direccionado al menu principal");
                preguntarOpcion()  
            }
    }
    console.log(camisetasEncontradasPorAnio);
    mostrarLote(camisetasEncontradasPorAnio);
}

//Función para buscar para crear Camiseta
function nuevaCamiseta(lote){
    let claveIngresada = parseInt(prompt("Ingrese clave de administrador para esta opción: "));
    if(claveIngresada == claveAdmin ){
        let anioIngresado = parseInt(prompt("Ingrese el año de la camiseta: "));
        let marcaIngresada = prompt("Ingrese la marca de la camiseta: ");
        let equipoIngresado = prompt("Ingrese el equipo al que pertenece la camiseta: ");
        let talleIngresado = prompt("Ingrese talle de la camiseta: ");
        let colorIngresado = prompt("Ingrese color de la camiseta: ")
        let precioIngresado = parseInt(prompt("Ingrese precio de la camiseta: "));
    
        const camisetaCreada = new Camiseta(lote.length+1, anioIngresado, marcaIngresada, equipoIngresado, talleIngresado, colorIngresado, precioIngresado);
    
        lote.push(camisetaCreada);
        console.log(lote)
    }else{
        alert("Clave incorrecta, no se puede realizar la operación. Seras redirigido al menu principal");
        preguntarOpcion();
    }
}

//Función para actualizar precio
function actualizarPrecios(lote){
    let claveIngresada = parseInt(prompt("Ingrese clave de administrador para esta opción: "));
    if(claveIngresada == claveAdmin ){
        let porcentajePrecio = parseInt(prompt("Ingrese el porcentaje de aumento o disminución del precio: "));
        let modificacionPrecio = lote.map((camiseta) => {
            return{
                id: camiseta.id,
                anio: camiseta.anio,
                marca: camiseta.marca,
                equipo: camiseta.equipo,
                talle: camiseta.talle,
                color: camiseta.color,
                precio: camiseta.precio + (camiseta.precio * porcentajePrecio / 100)
            }    
            
        });
        console.log(modificacionPrecio)
    }else{
        alert("Clave incorrecta, no se puede realizar la operación. Seras redirigido al menu principal");
        preguntarOpcion();
    }
}

//Crear función eliminar camiseta
function eliminarCamiseta(lote){
    let claveIngresada = parseInt(prompt("Ingrese clave de administrador para esta opción: "));
    if(claveIngresada == claveAdmin ){
        let idIngresado = parseInt(prompt("Ingrese el id de la camiseta que desea eliminar: "));
        const loteNuevo = lote.filter((camiseta) => camiseta.id != idIngresado);
        console.log(loteNuevo)
    }else{
        alert("Clave incorrecta, no se puede realizar la operación. Seras redirigido al menu principal");
        preguntarOpcion();
    }
};


//Función para calcular costo total
function calcularCostoTotal(lote){
    const totalLote = lote.reduce((acumulador, camiseta) => acumulador + camiseta.precio, 0);
    alert(`El costo total del lote es de $${totalLote}`);
}


//Función Menu Principal
function menu(opcionSeleccionada){
    switch(opcionSeleccionada){
        case 0:
            salir = true;
            alert('Gracias por visitar nuestra tienda, hasta luego!');
        break
        case 1:
            mostrarLote(lote2022);
        break
        case 2:
            buscarPorEquipo(lote2022);
        break
        case 3:
            buscarPorAnio(lote2022);
        break
        case 4:
            nuevaCamiseta(lote2022);
        break
        case 5:
            actualizarPrecios(lote2022);
        break
        case 6:
            eliminarCamiseta(lote2022);
        break
        case 7:
            calcularCostoTotal(lote2022);
        break
        default:
            alert("Opción incorrecta, por favor ingrese una opción válida");
    }
}


//Sirve para activar menu

// let salir = false;
// while(!salir){
//     preguntarOpcion();
// }


//Inicio document



//Capturas DOM
let products = document.getElementById("products");
let btnGuardarCamiseta = document.getElementById("guardarCamisetasBtn");

//Camisetas en el DOM

function mostrarCatalogo(lote){
    products.innerHTML = ""
    for(let camiseta of lote){
        let newCamiseta = document.createElement("div");
        newCamiseta.innerHTML = ` <article class="card" id="${camiseta.id}">
                                        <h3 class="titleCard"> ${camiseta.equipo}</h3>
                                        <img class="container__img" src="assets/${camiseta.imagen}" alt="${camiseta.equipo} de marca ${camiseta.marca}">
                                        <div class="container__product">
                                            <p class="container__product--p">${camiseta.marca}</p>
                                            <p class="container__product--p">${camiseta.anio}</p>
                                            <p class="container__product--p">${camiseta.talla}</p>
                                            <p class="container__product--p">${camiseta.precio}</p>
                                            <button class="container__btn-primary" id="btnAgregarCarrito">Agregar al carrito</button>
                                        </div>
                                    </article>`
        products.appendChild(newCamiseta);
    }
}mostrarCatalogo(lote2022)



//Nuevas camisetas
function nuevaCamiseta(lote){
    let inputAnio = document.getElementById("cAnio");
    let inputMarca = document.getElementById("cMarca");
    let inputEquipo = document.getElementById("cEquipo");
    let inputTalle = document.getElementById("cTalle");
    let inputColor = document.getElementById("cColor");
    let inputPrecio = document.getElementById("cPrecio");
    const camisetaCreada = new Camiseta(lote.length+1, inputAnio.value, inputMarca.value, inputEquipo.value, inputTalle.value, inputColor.value, inputPrecio.value, "camisetaTest.jpg");

    lote.push(camisetaCreada);
    console.log(lote)
    inputAnio.value = ""
    inputMarca.value = ""
    inputEquipo.value = ""
    inputTalle.value = ""
    inputColor.value = ""
    inputPrecio.value = ""

    mostrarCatalogo(lote2022)
    // form.reset();
}

btnGuardarCamiseta.addEventListener("click",() => {nuevaCamiseta(lote2022)})






// constructor(id, anio, marca, equipo, talla, color, precio, imagen)


/*  <article class="container__card">
        <img class="container__img" name="" src="" alt="">
        <div class="container__product">
            <p></p>
            <p></p>
            <a href="" target="blank">Ver más</a>
            </div>
    </article> */