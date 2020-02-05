function Buscar() {
    limparCampo("tabela");
    fetch("https://calendario-evento.000webhostapp.com/php/evento/listar.php")
        .then(function (response) {
            response.json().then(function (data) {
                criarTabela(data);
            });
        })
        .catch(function (err) {
            console.error('Failed retrieving information', err);
        });
}

function salvar() {
    limparCampo("tabela");
    let descricao = document.getElementById("descricao").value;
    let horaInicio = document.getElementById("horaInicio").value;
    let horaTermino = document.getElementById("horaTermino").value;
    let emailUsuario = localStorage.getItem("token");
    let evento = new Evento(descricao, horaInicio, horaTermino, emailUsuario);
    
    if(descricao === null || descricao === ""){
        alert("Campo descrição está vazia");
        return;
    }else if(horaInicio === null || horaInicio === ""){
        alert("Campo inicio está vazia");
        return;
    }else if(horaTermino === null || horaTermino === ""){
        alert("Campo hora término está vazia");
        return;
    }else if(emailUsuario === null || emailUsuario === ""){
        alert("Não está logado");
        return;
    }
    
    
    evento = JSON.stringify(evento);
    console.log(evento);
    fetch("https://calendario-evento.000webhostapp.com/php/evento/salvar.php", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: evento

    }).then(function (response) {
        console.log(response.status);
        templatePadraoLogado();
    })
}

function deletar() {
    let apagar = {
        id: document.getElementById("btnDeletar").getAttribute("data"),
        email: localStorage.getItem("id")
    }

    fetch("https://calendario-evento.000webhostapp.com/php/evento/deletar.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apagar)
    }).then(function (response) {
        console.log(response);
        limparCampo("evento");
        templatePadraoLogado();
    })
}

function editar() {
    let evento = {
        id: document.getElementById("btnAtualizar").getAttribute("data"),
        descricao: document.getElementById("descricao").value,
        horaInicio: document.getElementById("horaInicio").value,
        horaTermino: document.getElementById("horaTermino").value,
        email: localStorage.getItem("id")
    }
    console.log("id: " + evento.id);
    evento = JSON.stringify(evento);
    fetch("https://calendario-evento.000webhostapp.com/php/evento/editar.php", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: evento
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        limparCampo("evento");
        limparCampo("menu");
        alert("Atualizado");
        Buscar();
        templateMenu("logado");
    })
}

function buscarPor() {
    limparCampo("tabela");
    let id = this.id;
    fetch("https://calendario-evento.000webhostapp.com/php/evento/buscar.php", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: id
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        templateEvento(data);
        setIdToButton("btnAtualizar", id);
        setIdToButton("btnDeletar", id);
    })
}

function criarUsuario(){
    let user = {
        name: document.getElementById("user").value,
        password: document.getElementById("password").value,
        email: document.getElementById("email").value
    }
    console.log(user);
    
    fetch("https://calendario-evento.000webhostapp.com/php/usuario/salvar.php", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(user)
    }).then(function(response){
        return response.json();
    }).then(function(response){
        if(response.status == "ok"){
            alert("Usuario criado");
        }else{
            alert("Problema ao salvar usuario");
        }
    })
}

function login(){
    
    let login = {
        name: document.getElementById("user").value,
        password: document.getElementById("password").value
    }
    console.log(login);
    fetch("https://calendario-evento.000webhostapp.com/php/usuario/logar.php",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(login)
    }).then(function(response){
        return response.json();
    }).then(function(data){
        localStorage.clear();
        localStorage.setItem("token", data);
        
         if(localStorage.getItem("token").length > 0){
           templatePadraoLogado();   
         }
    })
}