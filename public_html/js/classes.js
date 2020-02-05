class Evento{
    constructor(des, hrIni, hrTer, email){
        this.descricao = des;
        this.horaInicio = hrIni;
        this.horaTermino = hrTer;
        this.emailUsuario = email;
    }
    toString(){
        return `${this.descricao}\nInicio:${this.horaInicio}\nTermino:${this.horaTermino}\n${this.emailUsuario}`;
    }
}
