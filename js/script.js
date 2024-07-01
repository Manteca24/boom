// Creo las variables con los números 
let numeroAleatorio;
let userInput = document.getElementById("userInput");
let numeroUsuario; 

// Eventos de enter y de click fuera del input para crear numeroUsuario
userInput.addEventListener('keypress', (event) =>{
    if(event.key === 'Enter'){
        numeroUsuario = userInput.value;
        console.log(`Número elegido por el usuario: ${numeroUsuario}`);
        userInput.disabled = true; // para no poder cambiar el número después de darle 
    }    
})  

document.addEventListener('click', (event) =>{
    if(event.target !== userInput){                                                                                                 
        numeroUsuario = userInput.value;
        console.log(`Número elegido por el usuario: ${numeroUsuario}`);
        userInput.disabled = true; // para no poder cambiar el número después de darle 
    }
})

// Promesa para crear numeroAleatorio
const promesa1 = new Promise((resolve)=>{
    setTimeout(()=>{
        numeroAleatorio = (Math.floor(Math.random() * 3) + 1);
        resolve(numeroAleatorio);
    }, 5000);
});

// Resolve promesa con condicional incluida
let result = document.getElementById("result");
        // Creo las variables necesarias para los gifs
        let successModal = document.getElementById("successModal");
        let failModal = document.getElementById("failModal");
        let closeSuccess = document.getElementById("closeSuccess");
        let closeFail = document.getElementById("closeFail");
        let failGif = document.getElementById("failGif");

promesa1
.then((numero)=>{
    console.log(`Este es el valor numeroAleatorio: ${numero}`);
    if(numeroAleatorio==numeroUsuario){  
        // console.log(`${typeof numeroAleatorio}, ${typeof numeroUsuario}`) // numeroUsuario es un string 
        console.log('Has salvado el mundo');
        result.innerHTML=
        `   <h3>El número que desactivaba la bomba era el... <span>${numeroAleatorio}</span></h3>
            <h2 class="exito">¡Has salvado el mundo!</h2>`;
        successModal.style.display = "block"; // para mostrar un elemento que estaba oculto (en CSS display none)
    } else {
        console.log('La bomba explotó')
        result.innerHTML=            
        `   <h3>El número que desactivaba la bomba era el... <span>${numeroAleatorio}</span></h3>
            <h2 class="fracaso">La bomba explotó.</h2>`;
            fetchRandomFailGif().then(url => {
        failGif.src = url;
        failModal.style.display = "block";
            })
}});


// Contador 5 segundos con setInterval()
let countdown;
let contenedor = document.getElementById("countdown");
let tiempoRestante = 5; 

const repetirCadaSegundo = () => {
    countdown = setInterval(mandarMensaje, 1000);
}

const mandarMensaje = () => {
    if (tiempoRestante>=0){
        console.log(`Quedan ${tiempoRestante} segundos`);
        let contador = document.createElement('h2');
        contenedor.innerHTML='';
        contador.innerHTML = tiempoRestante;
        contenedor.appendChild(contador);
        tiempoRestante--;
    } else {
        console.log('El tiempo ha terminado');
        btnReiniciar.style.display = "block"; // aparece el botón reiniciar
        clearInterval(countdown);
    }
}

repetirCadaSegundo();

// Botón reiniciar juego
const btnReiniciar = document.getElementById("restart");

btnReiniciar.addEventListener("click", () =>{
location.reload() // para reiniciar la página 
});



// Cerrar modales
closeSuccess.onclick = () => {
successModal.style.display = "none";
}

closeFail.onclick = () => {
failModal.style.display = "none";
}

 
window.onclick = (event) => {
if (event.target == successModal) { // Jerarquía del DOM: el código verifica si el clic ocurrió en el successModal directamente,
    successModal.style.display = "none";    // no en sus hijos (successModal es el contenedor grande, la ventana es hijo).
}
if (event.target == failModal) {
    failModal.style.display = "none";
}
}

// Función para obtener un GIF aleatorio de categoría fail
const fetchRandomFailGif = async () => {
const apiKey = 'MZMU6EVWCFCLwY9HhcZaxhL6nq9WR7Cu'; // la obtuve registrándome en la página (giphy for developers)
const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=fail&rating=g`);
const data = await response.json();
return data.data.images.original.url;
}
