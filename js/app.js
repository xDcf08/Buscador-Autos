//variables
const marca = document.querySelector('#marca')
const year = document.querySelector('#year')
const minimo = document.querySelector('#minimo')
const maximo = document.querySelector('#maximo')
const puertas = document.querySelector('#puertas')
const transmision = document.querySelector('#transmision')
const color = document.querySelector('#color')

//contenedor para los resultados
const resultado = document.querySelector('#resultado')

const max = new Date().getFullYear();
const min = max-12;

//Generar un objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

//eventos
document.addEventListener('DOMContentLoaded', () => {
    //llena las opciones de autos
    mostrarAutos(autos);

    //llena las opciones de años
    llenarSelect();
})

//EventListener para los formularios de busqueda

marca.addEventListener('change', evt =>{
    datosBusqueda.marca = evt.target.value;
    
    filtrarAuto();
})
year.addEventListener('change', evt =>{
    datosBusqueda.year = parseInt(evt.target.value);

    filtrarAuto();
})
minimo.addEventListener('change', evt =>{
    datosBusqueda.minimo = evt.target.value;

    filtrarAuto();
})
maximo.addEventListener('change', evt =>{
    datosBusqueda.maximo = evt.target.value;

    filtrarAuto();
})
puertas.addEventListener('change', evt =>{
    datosBusqueda.puertas = parseInt(evt.target.value);

    filtrarAuto();
})
transmision.addEventListener('change', evt =>{
    datosBusqueda.transmision = evt.target.value;

    filtrarAuto();
})
color.addEventListener('change', evt =>{
    datosBusqueda.color = evt.target.value;

    filtrarAuto();
})


//funciones
function mostrarAutos(autos) {

    LimpiarHTML(); //Elimina el HTML previo

    autos.forEach(autos => {

        const {marca,modelo,year,precio, puertas,transmision,color} = autos;
        const autoHTML = document.createElement('p')

        autoHTML.textContent = `
            ${marca}  ${modelo} -${year} - 
            ${puertas} Puertas - 
            Transmisión: ${transmision} - Precio: $${precio} - Color: ${color}
        
        `

        //insertar en el html
        resultado.appendChild(autoHTML);
    });
}

//LimpiarHTML

function LimpiarHTML () {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

//Generar los años del select
function llenarSelect() {
    for( let i =max; i>=min; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);//Agregar las opciones de año al select
    }
}

//Funcion que filtra en base a la búsqueda

function filtrarAuto() {
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMin ).filter( filtrarMayor).filter( filtrarPuerta).filter( filtrarTrans ).filter( filtrarColor );
    if(resultado.length ){
        mostrarAutos(resultado);
    }else{
        noResultado();
    }

}

function noResultado() {

    LimpiarHTML();

    const noResultado = document.createElement('div')
    noResultado.classList.add('alerta', 'error')
    noResultado.textContent = 'NO HAY RESULTADOS'
    resultado.appendChild(noResultado)
}

function filtrarMarca(autos) {
    const { marca } = datosBusqueda;

    if( marca ){
        return autos.marca === marca;
    }
    return autos;
}

function filtrarYear(autos) {
    const { year } = datosBusqueda;

    if( year ){
        return autos.year === year;
    }
    return autos;
}

function filtrarMin (autos) {
    const { minimo } = datosBusqueda;

    if( minimo ){
        return autos.precio >= minimo;
    }
    return autos;
}

function filtrarMayor (autos) {
    const { maximo } = datosBusqueda;

    if( maximo ){
        return autos.precio <= maximo;
    }
    return autos;
}

function filtrarPuerta (autos) {
    const { puertas } = datosBusqueda;

    if( puertas ){
        return autos.puertas === puertas;
    }
    return autos;
}

function filtrarTrans (autos) {
    const { transmision } = datosBusqueda;

    if( transmision ){
        return autos.transmision === transmision;
    }
    return autos;
}

function filtrarColor (autos) {
    const { color } = datosBusqueda;

    if( color ){
        return autos.color === color;
    }
    return autos;
}

