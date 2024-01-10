import { escena, consola, acciones_escenas } from './donElement.js'

//El primer espacio del arrelo esta reservado para la casa, es especial
export const ESCENAS_COLLECTION = [
    {
        nombre: 'hogar',
        nombre_boton: 'Ir a casa',
        imagen_path: '../img/escenas/escena_casa.png',
    },
    {
        nombre: 'trabajo',
        nombre_boton: 'Ir al trabajo',
        imagen_path: '../img/escenas/escena_trabajo.jpg',
        acciones:
        [
            {
                nombre_boton: 'Trabajar',
                fn: () =>
                {
                    consola.innerHTML += '\nGANANDOSE EL PAN...'
                }
            }
        ]
    },
    {
        nombre: 'parque',
        nombre_boton: 'Ir al parque',
        imagen_path: '../img/escenas/escena_parque.jpg',
        acciones:
        [
            {
                nombre_boton: 'Divertirse',
                fn: () =>
                {
                    consola.innerHTML += '\nDIVIRTIENDOSE DE MANERA EXTREMA...'
                }
            }
        ]
    }
]

export class EscenasHandler
{
    cambiarEscena = ( imagen_path ) =>
    {
        escena.style.backgroundImage = `url(${imagen_path})`;
        consola.innerHTML += '\nLlendo...'

        ESCENAS_COLLECTION.forEach( (element, index) =>
            {
                //Tenemos que ver que el indice sea mayor a 0 para pintar botones pues 0 es el indice del hogar
                //Tambien vemos que la escena cambiada sea la que tiene el elemento del forEach (el imagen_path)
                if ( index > 0 && element.imagen_path === imagen_path ) 
                {
                    //Limpiamos los botones, pintamos un boton por aca elemento del arrelo de acciones que tiene la escena
                    acciones_escenas.innerHTML = ''
                    for (let i = 0; i < element.acciones.length; i++)
                    {
                        acciones_escenas.innerHTML += `<a href="#" class="boton" onclick="initProgram.escenaAccion('${element.nombre}',${i})">${element.acciones[i].nombre_boton}</a>`
                    }
                }
                else if ( imagen_path ===  '../img/escenas/escena_casa.png') 
                {
                    acciones_escenas.innerHTML = ''
                }
            })
    }

}