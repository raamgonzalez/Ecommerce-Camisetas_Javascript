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