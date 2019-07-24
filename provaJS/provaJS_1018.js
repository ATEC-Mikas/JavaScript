    // Teste JavaScript - 24/07/2019

// Objectos iniciais:
let jogadores = [];
let idJogador = 0;

// Resolução do teste:
let formInserirJogador;
let formEliminarJogador;
let btnEmparelhar;
let jogos;

class Jogador {
    constructor(id,nome,email,codpostal) {
        this.id = id;
        this.nome = nome; 
        this.email = email; 
        this.codpostal = codpostal; 
    }
}

class Jogo {
    constructor(jogador1,jogador2) {
        this.jogador1 = jogador1;
        this.jogador2 = jogador2;
    }
}



window.onload = function() {
    formInserirJogador = document.getElementById('formInserirJogador');
    btnEmparelhar = document.getElementById('btnEmparelhar');
    formEliminarJogador = document.getElementById('formEliminarJogador');
    formInserirJogador.addEventListener("submit", InserirJogador);
    btnEmparelhar.addEventListener('click', EmparelharJogos);
    formEliminarJogador.addEventListener('submit', EliminarJogador);
}

function InserirJogador(event) {
    event.preventDefault();

    let errors = document.getElementById('erroFormulario');
    let nome = formInserirJogador.elements["txtNomeJogador"].value;
    let email = formInserirJogador.elements["txtEmailJogador"].value;
    let codpostal = formInserirJogador.elements["txtCodPostalJogador"].value;
    errors.innerText='';

    if(!(/^[\w ]+$/gm).test(nome) || nome=='') {
        errors.innerHTML += 'Nome não é valido <br>';
    }
    if(!(/^[\w\.]+@[\w\.]+\.\w+$/gm).test(email) || email=='') {
        errors.innerHTML += 'Email não é valido <br>';
    }
    if(!(/^\d{4} ?- ?\d{3}$/gm).test(codpostal) || codpostal=='') {
        errors.innerHTML += 'Código Postal não é valido <br>';
    }

    if(errors.innerHTML=='') {
        let jogador = new Jogador(idJogador,nome,email,codpostal);
        idJogador++;
        jogadores.push(jogador);
        ResetForm();
        AtualizarJogadores();
    }
}

function AtualizarJogadores() {
    let listaJogadores = document.getElementById('listaJogadores');
    listaJogadores.innerHTML = '';
    let length = jogadores.length;
    for(let i = 0; i < length; i++) {
        jogador = jogadores[i];
        listaJogadores.innerHTML += 
        `<p>
            <strong>Id: </strong>${jogador.id}<br />
            <strong>Nome: </strong>${jogador.nome}<br />
            <strong>Código Postal: </strong>${jogador.codpostal}<br />
            <strong>Email: </strong>${jogador.email}<br />
        </p>`;
    }
}

function AtualizarJogos() {
    let listaJogadores = document.getElementById('listaJogos');
    listaJogadores.innerHTML = '';
    let length = jogos.length;
    for(let i = 0; i < length; i++) {
        jogador1 = jogos[i].jogador1;
        jogador2 = jogos[i].jogador2;
        listaJogadores.innerHTML += `<p><strong>${jogador1.nome}</strong> vai jogar contra <strong>${jogador2.nome}</strong></p>`;
    }   
}

function ResetForm() {
    formInserirJogador.elements["txtNomeJogador"].value = '';
    formInserirJogador.elements["txtEmailJogador"].value = '';
    formInserirJogador.elements["txtCodPostalJogador"].value = '';
}

function EmparelharJogos() {
    let length = jogadores.length;
    let jogadorExcluido = document.getElementById('jogadorExcluido');
    let emparelhados = [];
    jogos = [];

    jogadorExcluido.innerHTML='';

    if(length>=2) {
        let ijogador1;
        let ijogador2;
        
        for(let i=0;i<Math.floor(length/2);i++) {
            do {
                ijogador1 = Math.floor(Math.random() * length); 
                ijogador2 = Math.floor(Math.random() * length);
            } while(emparelhados.includes(ijogador1) || emparelhados.includes(ijogador2) || ijogador1==ijogador2);
            let jogador1 = jogadores[ijogador1];
            let jogador2 = jogadores[ijogador2];
            let jogo = new Jogo(jogador1,jogador2);
            jogos.push(jogo);
            emparelhados.push(ijogador1);
            emparelhados.push(ijogador2);
        }
        AtualizarJogos();
    }
    if(length != jogos.length*2) {
        let ijogadorExcluido = 0;
        while(emparelhados.includes(ijogadorExcluido)) {
            ijogadorExcluido++;
        }
        let excluido = jogadores[ijogadorExcluido];

        jogadorExcluido.innerHTML = `O jogador ${excluido.nome} não tem par.`;
    }
}

function EliminarJogador(event) {
    event.preventDefault();
    let id = formEliminarJogador.elements['idParaEliminar'].value;
    let index = SearchPlayer(id);
    let errors = document.getElementById('erroEliminar');
    errors.innerHTML='';

    if(index!=null) {
        jogadores.splice(index,1);
        formEliminarJogador.elements['idParaEliminar'].value='';
        AtualizarJogadores();
    } else {
        errors.innerHTML+='Id não encontrado.';
    }
}

function SearchPlayer(id) {
    let length = jogadores.length;
    for(let i=0;i<length;i++) {
        if(jogadores[i].id==id) {
            return i;
        }
    }
    return null;
} 