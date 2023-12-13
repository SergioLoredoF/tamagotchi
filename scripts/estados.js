import { consola, imagen } from './donElement.js'
export const estados = 
[
    {
        nombre: 'hambre',
        incremento: 0,
        total: 0,
        imagen_path: './img/hambre.png',
        imagen_path_alivia: './img/comiendo.png',
        rango_max: 10,
        causa_muerte: 'this.murio de inanicion',
        peticion: 'dame de comer',
        nombre_boton: 'Comer',
    },
    {
        nombre: 'suciedad',
        incremento: 0,
        total: 0,
        imagen_path: './img/sucio.png',
        imagen_path_alivia: './img/bano.png',
        rango_max: 5,
        causa_muerte: 'this.murio de puerco',
        peticion: 'ando muy sucio pa!',
        nombre_boton: 'Bañar',
    },
    {
        nombre: 'sueno',
        incremento: 0,
        total: 0,
        imagen_path: './img/sueno.png',
        imagen_path_alivia: './img/duerme.png',
        rango_max: 10,
        causa_muerte: 'this.murio de sueño',
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
            estados[i].incremento = Math.floor(Math.random() * estados[i].rango_max) + 1;
            this.textoConsola += '\n'+ estados[i].nombre +' = ' + estados[i].incremento
        }
        consola.innerHTML = this.textoConsola
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
        this.textoConsola += '\n---Funcion de estatus de incremento---'
        /* 
            Iteramos antes todos los estados para que ya al final se decida por cual imagen
            y que estado será el que muestre nuestro personaje, guardamos esto en estatus_mas_alto
        */
        for( let i = 0; i < estados.length; i++ )
        {
            //Al total le sumamos el incremento
            estados[i].total = estados[i].total + estados[i].incremento;
            //pintamos barra de estatus
            this.pintarBarraEstatus(estados[i].total, estados[i].nombre)

            //Guardamos el estatus con el numero mas alto
            if(estados[i].total > estatus_mas_alto.total)
            {
                estatus_mas_alto.index = i
                estatus_mas_alto.total = estados[i].total
            }        
        }

        if(estatus_mas_alto.total >= 50 && estatus_mas_alto.total <=99 ){
            this.textoConsola += '\n'+ estados[estatus_mas_alto.index].nombre +'  = ' + estados[estatus_mas_alto.index].total +' %'
            this.textoConsola += '\n-'+ this.nombre_tamagochi + ' ' + estados[estatus_mas_alto.index].peticion
            if(this.estadoOcupado == 0){
                this.estadoOcupado = 1
                imagen.src = estados[estatus_mas_alto.index].imagen_path
            }
        }
        if(estados[estatus_mas_alto.index].total >= 100 ){
            this.textoConsola += '\n'+ estados[estatus_mas_alto.index].nombre +' = ' + estados[estatus_mas_alto.index].total +' %'
            this.textoConsola += '\n-'+ this.nombre_tamagochi + ' ' + estados[estatus_mas_alto.index].causa_muerte
            consola.innerHTML = this.textoConsola
            imagen.src = "./img/morido.png"
            this.murio = true
        }

        consola.innerHTML = this.textoConsola
    }

    aliviarEstado = (accion) =>
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
                accion == estados[i].nombre ? estados[i].total = 0 : null;
            }

            this.defineIncremento()
            imagen.src = "./img/caquita normal.png"
            this.estadoOcupado = 0;
        }, 2000)
    }

    pintarBarraEstatus = (valor,id) =>
    {
        let canvas = document.getElementById(`barrasEstatus${id}`);
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Dibujar la barra
        const anchoBarra = (valor / 100) * canvas.width;
        ctx.fillStyle = "#4CAF50"; // Color verde
        ctx.fillRect(0, 0, anchoBarra, canvas.height);

        // Dibujar el texto
        ctx.fillStyle = "#000"; // Color negro
        ctx.font = "14px Arial";
        ctx.fillText(`${id}: ${valor}%`, 10, 20);
    }
}


