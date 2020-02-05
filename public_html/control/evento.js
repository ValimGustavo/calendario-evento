class Evento {
    constructor(descricao, horaInicio, horaTermino){
        this.descricao = descricao;
        this.horaInicio = horaInicio;
        this.horaTermino = horaTermino;
    }
}

//Responsavel pro fazer manipulações necessarias nos dados do evento
function criarEvento(evento){
    let id = localStorage.length + 1;
    //TODO: DAO.CREATE->Manda para salvar no banco
    localStorage.setItem(id.toString(), JSON.stringify(e));
}

function listarTodosEventos(){
    //TODO: DAO.READALL() -> retorna o array com todos eventos 
    //Simulado dados vindo deo banco
    // arrayComEventosVindoDoBanco = [];
    // let quant = localStorage.length;
    // for(let i = 0; i < quant; i++){
        
    //     if (localStorage.getItem(i.toString()) != null){
    //         const conteudo = JSON.parse(localStorage.getItem(i.toString()));
    //         arrayComEventosVindoDoBanco.push({i, conteudo});
    //     }
    // }

    // for(let evento of arrayComEventosVindoDoBanco){
    //     console.log(`id: ${evento.i} -- ${evento.conteudo.descricao} -- ${evento.conteudo.horaInicio} -- ${evento.conteudo.horaTermino}`);
    // }

    // return arrayComEventosVindoDoBanco;
    
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


function atualizar(evento){
    //verifica alguns propriedades e evnia para DAO update
    console("atualizar: " + evento);
}

function deletar(evento){
    //verifica alguns propriedades e deleta para DAO update
    console("deletar: " + evento);

}


function exibir(evento){
    console.log("Exibir: " + evento);
}
