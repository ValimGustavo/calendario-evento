function create(evento){
    let id = localStorage.length + 1;
    //TODO: DAO.CREATE->Manda para salvar no banco
    localStorage.setItem(id.toString(), JSON.stringify(evento));
}

function update(){

}

function delet(){

}

function read(){

}