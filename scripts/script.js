import { EstatusHandler, estados } from './estados.js';
import { barrasEstatus, acciones_botones } from './donElement.js';

//definimos el nombre de la mascota
localStorage.setItem('nombre_tamagochi', prompt("Cual es mi nombre?"))

class InitProgram 
{
    //Propiedades
    estatus = new EstatusHandler();

    constructor() 
    {
        // DEFINE INCREMENTO DE ESTATUS
        setTimeout(this.estatus.defineIncremento, 500);
        // INCREMENTO ESTATUS
        setInterval(this.estatus.estatusIncremento, 7000);
        this.iniciar();
    }

    iniciar = () => 
    {
        estados.forEach(element => 
            {
                acciones_botones.innerHTML += `<div class="boton" onclick="initProgram.aliviarEstado('${element.nombre}')">${element.nombre}</div>`;
                barrasEstatus.innerHTML += `<canvas id="barrasEstatus${element.nombre}" width="200" height="30"></canvas>`
            });
    }

    aliviarEstado = (nombre) => 
    {
        this.estatus.aliviarEstado(nombre);
    }
}
// Crear una instancia de InitProgram en el ámbito global
window.initProgram = new InitProgram();