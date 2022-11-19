//Captura DOM
let divProductos = document.getElementById("productos");

//Peticion
fetch("https://hp-api.herokuapp.com/api/characters/students")
.then((res) => res.json())
.then((data) => {
    console.log(data)
    for( let personaje of data){
        divProductos.innerHTML += `<div class="card">
                                        <img src="${personaje.image}" alt="Imagen de ${personaje.name} no disponible por ahora." class="card-img-top" alt="...">
                                        <div class="card-body">
                                            <h5 class="card-title">${personaje.name}</h5>
                                            <p class="card-text">${personaje.house}</p>
                                            <a href="#" class="btn btn-primary">Go somewhere</a>
                                        </div>
                                    </div>`
    }
});


