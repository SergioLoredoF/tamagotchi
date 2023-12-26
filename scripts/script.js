import { EstatusHandler, estados } from './estados.js'
import { EscenasHandler, ESCENAS_COLLECTION } from './escenas.js'
import { barrasEstatus, acciones_botones, cambio_escenas } from './donElement.js'

//definimos el nombre de la mascota
localStorage.setItem('nombre_tamagochi', prompt("Cual es mi nombre?"))
localStorage.setItem('escena_actual', 'hogar')

class InitProgram 
{
    //Propiedades
    estatus = new EstatusHandler()
    escenas = new EscenasHandler()

    constructor() 
    {
        // DEFINE INCREMENTO DE ESTATUS
        setTimeout(this.estatus.defineIncremento, 500);
        // INCREMENTO ESTATUS
        setInterval(this.estatus.estatusIncremento, 7000);
        this.pintarInterfaz();
    }

    pintarInterfaz = () => 
    {
        estados.forEach(element => 
            {
                acciones_botones.innerHTML += `<a href="#" class="boton"  onclick="initProgram.aliviarEstado('${element.nombre}')">${element.nombre_boton}</a>`;   
                barrasEstatus.innerHTML += `<canvas id="barrasEstatus${element.nombre}" width="200" height="30"></canvas>`
            })
        ESCENAS_COLLECTION.forEach(element =>
            {
                cambio_escenas.innerHTML += `<a href="#" class="boton" onclick="initProgram.cambiarEscena('${element.imagen_path}')">${element.nombre_boton}</a>`;
            })
            
    }

    aliviarEstado = (nombre) => 
    {
        this.estatus.aliviarEstado(nombre)
    }
    
    cambiarEscena = ( imagen_path ) =>
    {
        this.escenas.cambiarEscena( imagen_path )
    }

    escenaAccion = ( nombre, indice ) =>
    {
        for ( let i = 0; i < ESCENAS_COLLECTION.length; i++ )
        {
            if ( nombre === ESCENAS_COLLECTION[i].nombre )
            {
                ESCENAS_COLLECTION[i].acciones[indice].fn()
            }
        }
    }
}
// Crear una instancia de InitProgram en el ámbito global
window.initProgram = new InitProgram();