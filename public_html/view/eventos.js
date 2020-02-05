//import {Evento} from '../model/Evento';
class Evento {
    constructor(descricao, horaInicio, horaTermino){
        this.descricao = descricao;
        this.horaInicio = horaInicio;
        this.horaTermino = horaTermino;
    }
}

//import  from control/evento
function criarEvento(evento){
    //verifica requisitos e envia para DAO

    //simula DAO CREATE
    let id = localStorage.length;
    //TODO: DAO.CREATE->Manda para salvar no banco
    localStorage.setItem(id.toString(), JSON.stringify(evento));
    
}


function exibir(e){
    //verifica requisitos e envia para DAO
    console.log("Exibir: " + e.target.name);

    //simula mostrar
    console.log(localStorage.getItem(e.target.name));
}

function atualizar(evento){
    //verifica requisitos e envia para DAO
    console("atualizar: " + evento);

    //simula atualizar
    console.log(localStorage.setItem(e.target.name, evento));
    
}

function deletar(e){
    //verifica requisitos e envia para DAO
    console.log("deletar: " + e.target.name);
    console.log(localStorage.removeItem(e.target.name));
}






//Classe responsavel por criar HTMLObjects


function criarObjetoEvento(){
    let id = localStorage.length + 1;
    const descricao = document.getElementById("descricao").value;
    const horaInicio = document.getElementById("horaInicio").value;
    const horaTermino = document.getElementById("horaTermino").value;
    const e = new Evento(descricao, horaInicio, horaTermino);
    console.log(e);
    criarEvento(e);
}


function criarLista(){

    //TODO: RECEBE A LISTA DO METODO DAO LISTAR

    //simula lista vinda do banco
    // listaEvento = [];
    // let quant = localStorage.length;
    // for(let i = 0; i < quant; i++){
        
    //     if (localStorage.getItem(i.toString()) != null){
    //         const conteudo = JSON.parse(localStorage.getItem(i.toString()));
    //         listaEvento.push({i, conteudo});
    //     }
    // }


    // let container, btnDeletar, btnExibir;

    // for(let evento of listaEvento){

    //     console.log(evento);
    //     btnDeletar = document.createElement("button");
    //     btnExibir = document.createElement("button");

    //     btnDeletar.setAttribute("name", evento.i.toString());
    //     btnExibir.setAttribute("name", evento.i.toString());

    //     btnDeletar.textContent = "D";
    //     btnExibir.textContent = "V";

    //     btnDeletar.addEventListener("click", deletar);
    //     btnExibir.addEventListener("click", exibir);

    //     let conteudo = document.createTextNode(evento.conteudo.descricao);
    //     container = document.createElement("div");        
        
    //     container.appendChild(btnDeletar);
    //     container.appendChild(conteudo);
    //     container.appendChild(btnExibir);
        

    //     document.getElementById("mostrar").appendChild(container);


    //}
    fetch('https://calendario-evento.000webhostapp.com/teste.php')
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
    console.log(data)
  })
  .catch(err => {
    // Do something for an error here
  })
}