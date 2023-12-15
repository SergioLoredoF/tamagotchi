import { consola, imagen } from './donElement.js'
export const estados = 
[
    {
        nombre: 'hambre',
        incremento: 0,
        total: 0,
        imagen_path: '../img/estados/hambre.png',
        imagen_path_alivia: '../img/estados/comiendo.png',
        rango_max: 10,
        causa_muerte: 'this.murio de inanicion',
        peticion: 'dame de comer',
        nombre_boton: 'Comer',
    },
    {
        nombre: 'suciedad',
        incremento: 0,
        total: 0,
        imagen_path: '../img/estados/sucio.png',
        imagen_path_alivia: '../img/estados/bano.png',
        rango_max: 5,
        causa_muerte: 'this.murio de puerco',
        peticion: 'ando muy sucio pa!',
        nombre_boton: 'Bañar',
    },
    {
        nombre: 'sueno',
        incremento: 0,
        total: 0,
        imagen_path: '../img/estados/sueno.png',
        imagen_path_alivia: '../img/estados/duerme.png',
        rango_max: 10,
        causa_muerte: 'murio de sueño',
        peticion: 'que sueño!!',
        nombre_boton: 'Dormir',
    },
]

export class EstatusHandler {
    textoConsola = ''
    estadoOcupado = 0
    murio = false
    nombre_tamagochi = localStorage.getItem('nombre_tamagochi')
  
    constructor()
    {
        if ( typeof EstatusHandler.instance === "object")
        {
            return EstatusHandler.instance
        }
        EstatusHandler.instance = this
        return this
    }


    defineIncremento = () => 
    {
        this.textoConsola += '\n---Funcion define incremento---'
        for ( let i = 0; i < estados.length; i++ ) 
        {
            estados[i].incremento = Math.floor( Math.random() * estados[i].rango_max ) + 1;
            this.textoConsola += '\n'+ estados[i].nombre +' = ' + estados[i].incremento
        }
        this.escribeConsola()
        //consola.innerHTML = this.textoConsola
    }

    //Arreglar un arreglo
    estatusIncremento = () =>
    {
        //Si murio es true entonces detenemos el programa
        if ( this.murio ) return

        //Guardar el indice del estatus mas alto
        let estatus_mas_alto = 
        {
            total: 0,
            index: 0    
        }
        this.textoConsola += '\nEl tiempo pasa...'
        /* 
            Iteramos antes todos los estados para que ya al final se decida por cual imagen
            y que estado será el que muestre nuestro personaje, guardamos esto en estatus_mas_alto
        */
        for( let i = 0; i < estados.length; i++ )
        {
            //Al total le sumamos el incremento
            estados[i].total = estados[i].total + estados[i].incremento;

            //pintamos barra de estatus
            if ( estados[i].total > 100 )
            {
                this.pintarBarraEstatus( 100, estados[i].nombre )
            }
            else
            {
                this.pintarBarraEstatus( estados[i].total, estados[i].nombre )
            }
            

            //Guardamos el estatus con el numero mas alto
            if( estados[i].total > estatus_mas_alto.total )
            {
                estatus_mas_alto.index = i
                estatus_mas_alto.total = estados[i].total
            }        
        }

        if( estatus_mas_alto.total >= 50 && estatus_mas_alto.total <=99 )
        {
            this.textoConsola += '\n'+ estados[estatus_mas_alto.index].nombre +'  = ' + estados[estatus_mas_alto.index].total +' %'
            this.textoConsola += '\n-'+ this.nombre_tamagochi + ' ' + estados[estatus_mas_alto.index].peticion
            if( this.estadoOcupado == 0) {
                this.estadoOcupado = 1
                imagen.src = estados[estatus_mas_alto.index].imagen_path
            }
        }
        if( estados[estatus_mas_alto.index].total >= 100 )
        {
            this.textoConsola += '\n'+ estados[estatus_mas_alto.index].nombre +' = ' + estados[estatus_mas_alto.index].total +' %'
            this.textoConsola += '\n-'+ this.nombre_tamagochi + ' ' + estados[estatus_mas_alto.index].causa_muerte
            this.escribeConsola()
            //consola.innerHTML = this.textoConsola
            imagen.src = "../img/estados/morido.png"
            this.murio = true
        }

        this.escribeConsola()
    }

    aliviarEstado = ( accion ) =>
    {
        //Si murio es true entonces ya no puede aliviar estados
        if ( this.murio ) return

        //pinta la imagen
        for( let i = 0; i < estados.length; i++ )
        {
            accion == estados[i].nombre ? imagen.src = estados[i].imagen_path_alivia : null;
        }

        setTimeout(()=>
        {
            //Setea el estado a 0 por que fue aliviado
            for( let i = 0; i < estados.length; i++ )
            {
                if ( accion === estados[i].nombre )
                {
                    estados[i].total = 0
                    this.pintarBarraEstatus(estados[i].total, estados[i].nombre )
                }
            }

            this.defineIncremento()
            imagen.src = "../img/estados/caquita_normal.png"
            this.estadoOcupado = 0;
        }, 2000)
    }

    pintarBarraEstatus = ( total, nombre ) =>
    {
        let canvas = document.getElementById( `barrasEstatus${nombre}` );
        let ctx = canvas.getContext("2d");
        ctx.clearRect( 0, 0, canvas.width, canvas.height );
        // Dibujar la barra
        const anchoBarra = ( total / 100 ) * canvas.width;
        ctx.fillStyle = "#4CAF50"; // Color verde
        ctx.fillRect( 0, 0, anchoBarra, canvas.height );

        // Dibujar el texto
        ctx.fillStyle = "#000"; // Color negro
        ctx.font = "14px Arial";
        ctx.fillText( `${nombre}: ${total}%`, 10, 20 );
    }

    escribeConsola = () =>
    {
        consola.innerHTML = this.textoConsola
        consola.scrollTop = consola.scrollHeight;
    }
}


