//Capturamos la lista
const lista = document.getElementById("lista");

//Agregar tarea
function addTask(task, complete){
    const contenedor = document.createElement('li');
    contenedor.classList.add('item-tarea');

    const botonCompletar = document.createElement('button');
    botonCompletar.classList.add('boton-completar')
    botonCompletar.textContent = "v";

    //Se debe agregar el evento aqui, ya que despues no lo reconocera
    botonCompletar.addEventListener('click', () => {  
        if (texto){
            //Agrega o quita un clase con toggle
            texto.classList.toggle('tarea-incompleta');
            completeTask(task);
        }
    });

    const texto = document.createElement('p');
    texto.classList.add('tarea');
    texto.textContent = task;

    const botonEliminar = document.createElement('button');
    botonEliminar.classList.add('btn-eliminar')
    botonEliminar.textContent = 'Eliminar';

    //Se debe agregar el evento aqui, ya que despues no lo reconocera
    botonEliminar.addEventListener('click', () => { 
        lista.removeChild(contenedor);
        removeStorage(task)
    })

    contenedor.appendChild(botonCompletar);
    contenedor.appendChild(texto);
    contenedor.appendChild(botonEliminar);
    lista.appendChild(contenedor)
    
    //La crea en el storage
    crearTarea(task);
};

//Event Listener

//Elementos
const botonAgregar = document.getElementById("agregar-tarea");
const tareaNueva = document.getElementById("escribir-tarea");

//Evento
botonAgregar.addEventListener('click', () => {
    event.preventDefault();
    let mensaje = tareaNueva.value.trim();
    
    if (!mensaje){
        alert("Escribe una tarea!")
    } else {
        const existe = tareas.some(tarea => tarea.nombre === mensaje); // Some es un metodo que recorre el array y retorna true o false si se encuentra un elemento que cumpla la condición
        if (existe) {
            alert("Esa tarea ya existe.");
            //Detener la función
            return;
        }
        
        addTask(mensaje);
        tareaNueva.value = '';
    }
});

//Local Storage

//Lista de tareas
let tareas = [];

//Actualiza la lista de tareas
function crearTarea(texto){
    const nuevoItem = {nombre: `${texto}`, completa: "no"};
    tareas.push(nuevoItem);
    guardarLista();
}

//Guarda la lista en localStorage
function guardarLista(){
    localStorage.setItem("tarea", JSON.stringify(tareas))
}

//Remover una tarea del localStorage
function removeStorage(texto){
    for (let i in tareas){
        if (texto === tareas[i].nombre){
            tareas.splice(i, 1);
        };
    };
    console.log(tareas)
    guardarLista();
}

//Completar una tarea en localStorage
function completeTask(texto){
    for (let i in tareas){
        if (texto === tareas[i].nombre && tareas[i].completa === "no"){
            tareas[i].completa = "si";
        } else if(texto === tareas[i].nombre && tareas[i].completa === "si"){
            tareas[i].completa = "no";
        }
    };
    guardarLista();
}

//Leer Lista
function leerListaStorage(){
    let objeto = JSON.parse(localStorage.getItem("tarea") || []);
    tareas.push(...objeto)
}

//Eliminar Lista
const botonBorrar = document.getElementById("borrar-todo");
botonBorrar.addEventListener('click', borrarTodo);

function borrarTodo(){
    let cero = [];
    tareas = cero;
    guardarLista();
    renderizarLista();
}

//Crear lista existente en localstorage
function crearTareasStorage(task, complete){
    const contenedor = document.createElement('li');
    contenedor.classList.add('item-tarea');

    const botonCompletar = document.createElement('button');
    botonCompletar.classList.add('boton-completar')
    botonCompletar.textContent = "v";

    //Se debe agregar el evento aqui, ya que despues no lo reconocera
    botonCompletar.addEventListener('click', () => {  
        if (texto){
            //Agrega o quita un clase con toggle
            texto.classList.toggle('tarea-incompleta');
            completeTask(task);
        }
    });

    const texto = document.createElement('p');
    if (complete == "si") {
        texto.classList.add('tarea-incompleta');
    } else{
        texto.classList.add('tarea');
    }
    texto.textContent = task;

    const botonEliminar = document.createElement('button');
    botonEliminar.classList.add('btn-eliminar')
    botonEliminar.textContent = 'Eliminar';

    //Se debe agregar el evento aqui, ya que despues no lo reconocera
    botonEliminar.addEventListener('click', () => { 
        lista.removeChild(contenedor);
        removeStorage(task)
    })

    contenedor.appendChild(botonCompletar);
    contenedor.appendChild(texto);
    contenedor.appendChild(botonEliminar);
    lista.appendChild(contenedor)
}

//Renderizar lista
function renderizarLista(){
    //Deja en blanco la pagina
    while(lista.firstChild){
        lista.removeChild(lista.firstChild)
    }
    //Crea las tareas desde storage
    for (let i in tareas){
        crearTareasStorage(tareas[i].nombre, tareas[i].completa)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    leerListaStorage();
    renderizarLista();
})