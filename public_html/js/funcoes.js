let BOTAO = {
    ATUALIZAR: {
            text: "Atualizar",
            id: "btnAtualizar",
            func: editar
    },
    DELETAR: {
                text: "Deletar",
                id: "btnDeletar",
                func: deletar 
                },
    SALVAR: {
                text: "Salvar",
                id: "btn",
                func: salvar
    },
    LOGIN: {
                text: "Login",
                id: "btnLogin",
                func: function(){
                }
    },
    DESLOGAR: {
                text: "Deslogar",
                id: "btnDeslogar",
                func: function(){
                    deslogar();
                }
    },
    SALVAR_EVENTO: {
                text: "Salvar evento",
                id: "btnSalvar",
                func: function(){
                  limparCampo("tabela");
                  templateEvento();
                }
    },
    TEMPLATE_LOGIN:{
                text: "Logar",
                id: "btnLogar",
                func: function(){
                    //alert("Procura no banco, se der verdadeiro, cria cookie e muda a tela para principal");
                    login();
                    //TODO> Procura no banco, se der verdadeiro, cria cookie e muda a tela para principal
                }
    },
    CRIAR_CONTA:{
                text: "Criar Conta",
                id: "btnCriarConta",
                func: function(){
                    
                    let email = document.createElement("input");
                    email.setAttribute("id","email");
                    email.setAttribute("type", "email");                
                    email.setAttribute("placeholder", "Digite email");
                    document.getElementById("login").appendChild(email);
                    document.getElementById("login").removeChild(document.getElementById("btnLogar"));
                    this.addEventListener("click", function(){
                        criarUsuario();
                        limparCampo("login");
                        templateLogin();
                    });
                }
    }
}


function criarBotao(elemento) {
    for (let i = 0; i < elemento.elemento.length; i++) {
        button = document.createElement("button");
        button.setAttribute("id", elemento.elemento[i].id);
        let node = document.createTextNode(elemento.elemento[i].text);
        button.appendChild(node);
        button.addEventListener("click", elemento.elemento[i].func);
        document.getElementById(elemento.parent).appendChild(button);
    }
}

function templateEvento(dados = null) {
    limparCampo("menu");
    let descricao = document.createElement("textarea");
    let horaInicio = document.createElement("input");
    let horaTermino = document.createElement("input");
    descricao.setAttribute("id", "descricao");
    descricao.setAttribute("placeholder", "Digite a descrição do evento");

    horaInicio.setAttribute("id", "horaInicio");
    horaInicio.setAttribute("type", "time");

    horaTermino.setAttribute("id", "horaTermino");
    horaTermino.setAttribute("type", "time");

    let evento = document.getElementById("evento");
    evento.appendChild(descricao);
    evento.appendChild(horaInicio);
    evento.appendChild(horaTermino);
    let button;

    if (dados !== null) {
        setarDados(dados);
        button = criarBotao({
        parent: "evento",
        elemento: [BOTAO.ATUALIZAR, BOTAO.DELETAR]
    });
    } else {
         button = criarBotao({
            parent: "evento",
            elemento:  [BOTAO.SALVAR]
        });
    }
}

function criarTabela(anotacao){
    limparCampo("evento");
    console.log("criando tabela");
    let tabela = document.createElement("table");
    let caption = document.createElement("caption");
    let node = document.createTextNode(anotacao.titulo);
    caption.appendChild(node);
    tabela.appendChild(caption);
    const quantColuna = anotacao.coluna.length - 1;
    
    let thead = document.createElement("thead");
    let colunaTh = document.createElement("tr");
    
    for(let i = 1; i < anotacao.coluna.length - 1; i++){
      let th = document.createElement("th");
      let node = document.createTextNode(anotacao.coluna[i]);
      th.appendChild(node);
      colunaTh.appendChild(th);
    }
    
    thead.appendChild(colunaTh);
    tabela.appendChild(thead);
    
    let tbody = document.createElement("tbody");
    for(let i = 0; i < anotacao.linhas.length; i++){
      let tr = document.createElement("tr");
      tr.addEventListener("click", buscarPor);
      
      for(let j = 1; j < anotacao.linhas[i].length - 1; j++){
        tr.setAttribute("id", anotacao.linhas[i][0]);
        let td = document.createElement("td");
        let node = document.createTextNode(anotacao.linhas[i][j]);
        td.appendChild(node);
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }  
    tabela.appendChild(tbody);
    
    let adicionar = document.getElementById(anotacao.pai);
    adicionar.appendChild(tabela);
}
  
function setarDados(evento){
  document.getElementById("descricao").value = evento.descricao;
  document.getElementById("horaInicio").value = evento.horaInicio;
  document.getElementById("horaTermino").value = evento.horaTermino;
  
  //TODO: hidden
}  
  
function setIdToButton(idButton, idEvent){
    let button = document.getElementById(idButton);
    button.setAttribute("data", idEvent);
}

function limparCampo(campo){
    document.getElementById(campo).innerHTML = "";
}

function templateMenu(tipo){
    limparCampo("menu");
    if(tipo == "logar"){
        let btnLogar = {
            parent: "menu",
            elemento: [BOTAO.LOGIN]
                    
        };
        criarBotao(btnLogar);
    }else if(tipo == "logado"){
        let btn = {
            parent: "menu",
            elemento: [
                BOTAO.SALVAR_EVENTO,
                BOTAO.DESLOGAR
            ]
        };
        criarBotao(btn);
        
    }
    
}

function templateLogin(){
    let user = document.createElement("input");
    let password = document.createElement("input");

    user.setAttribute("id", "user");
    password.setAttribute("id", "password");
    
    password.setAttribute("type", "password");
    
    user.setAttribute("placeholder", "Nome de usuário");
    password.setAttribute("placeholder", "Senha");
    
    document.getElementById("login").appendChild(user);
    
    document.getElementById("login").appendChild(password);

    btns = {
            parent: "login",
            elemento: [
                BOTAO.TEMPLATE_LOGIN,
                BOTAO.CRIAR_CONTA        
            ]
    }
        
    criarBotao(btns);
}

function templateEditar(){
    limparCampo("menu");
    limparCampo("tabela");
}

function templatePadraoLogado(){
    limparCampo("login");
    templateMenu("logado");
    criarTabela(Buscar());
}
function deslogar(){
    localStorage.clear();
    limparCampo("tabela");
    limparCampo("menu");
    templateLogin();
}