//Storage Dark Mode
let btnDarkMode = document.getElementById("btnDarkMode");
let btnLightMode = document.getElementById("btnLightMode");
let wrapper = document.getElementById("wrapper");
let modoOscuro 


//Condicional para saber si existe algo en el Storage --Primera vez
if(localStorage.getItem("modoOscuro")){
    modoOscuro = localStorage.getItem("modoOscuro");
}else{
    console.log("Entro por primera vez")
    localStorage.setItem("modoOscuro", true);
    modoOscuro = "true";
}
console.log(modoOscuro);

//Funcion para cambiar de modo
if(modoOscuro == "true"){
    wrapper.classList.add("darkMode");
}else{
    wrapper.classList.remove("darkMode");
}


//Evento
btnDarkMode.addEventListener("click",() => {
    wrapper.classList.add("darkMode");
    localStorage.setItem("modoOscuro", true)
})

btnLightMode.addEventListener("click",() => {
    wrapper.classList.remove("darkMode");
    localStorage.setItem("modoOscuro", false)
})