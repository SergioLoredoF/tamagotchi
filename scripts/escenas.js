import { escena, consola } from './donElement.js'

export const ESCENAS_COLLECTION = [
    {
        nombre_boton: 'Ir a casa',
        imagen_path: '../img/escenas/escena_casa.png',
    },
    {
        nombre_boton: 'Ir al trabajo',
        imagen_path: '../img/escenas/escena_trabajo.jpg',
    },
    {
        nombre_boton: 'Ir al parque',
        imagen_path: '../img/escenas/escena_parque.jpg',
    }
]

export class EscenasHandler
{
    cambiarEscena = ( imagen_path ) =>
    {
        escena.style.backgroundImage = `url(${imagen_path})`;
        consola.innerHTML += '\nLlendo...'
    }
}