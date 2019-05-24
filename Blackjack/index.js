var baralho=[];
var mao=[];
var maoDealer=[];

function GetBaralho() {
    let simbolo =
    [
        "Paus",
        "Copas",
        "Espadas",
        "Ouros"
    ]

    let valores = 
    [
        ["Ás",11],
        ["2",2],
        ["3",3],
        ["4",4],
        ["5",5],
        ["6",6],
        ["7",7],
        ["8",8],
        ["9",9],
        ["10",10],
        ["Valete",10],
        ["Dama",10],
        ["Rei",10]
    ]

    let baralho = [];

    simbolo.forEach(function(s){
        valores.forEach(function(v){
            baralho.push(
            {
                carta: v[0]+" de "+s,
                valor: v[1]
            }
            );
        });        
    });
    return baralho;
}

function BaralharoBaralhov1(baralho,n) {
    if(n<0) {
        return baralho;
    }
    else {
        let newBaralho=[];
        let x = Math.floor(Math.random() * baralho.length-2) + 1;
        for(let j = x;j<baralho.length;j++) {
            newBaralho.push(baralho[j]);
        }
        for(let j = 0;j<x;j++) {
            newBaralho.push(baralho[j]);
        }
        return BaralharoBaralhov1(newBaralho,n-1);
    }
}

function BaralharoBaralhov2(baralho,n) { 
    while(n>0) {
        let x = Math.floor(Math.random() * baralho.length-1) + 1;
        let y = Math.floor(Math.random() * baralho.length-1) + 1;
        let aux=baralho[x];
        baralho[x]=baralho[y];
        baralho[y]=aux;
        n--;
    }
    return baralho;
}

function TirarCartav1(baralho,n) {
    let escolhido=[];
    while(n>0) {
        let x = Math.floor(Math.random() * baralho.length-1);
        if(baralho[x]!=undefined) {
            escolhido.push(baralho[x]);
            baralho.splice(x,1);
            n--;
        }
    }
    return escolhido;
}

function TirarCartav2(baralho,n) {
    let escolhido=[];
    while(n>0) {
        if(baralho[0]!=undefined) {
            escolhido.push(baralho.pop());
            // baralho.splice(0,1);
            n--;
        }
    }
    return escolhido;
}

function Jogar() {
    baralho=BaralharoBaralhov2(GetBaralho(),21500);
    Hit();
}

function Reset() {
    baralho=[];
    mao=[];
    maoDealer=[];
}

function MostrarMao() {
    console.log("Score "+GetScore(mao)+" | Tem na sua mão:");
    mao.forEach(function(e){
        console.log(e.carta);
    });
    console.log("Score "+GetScore(maoDealer)+" | Dealer: ");
    maoDealer.forEach(function(e){
        console.log(e.carta);
    });
    console.log("x - Hit\nx - Stand")
}

function GetScore(x) {
    var score=0;
    x.forEach(function(e){
        score+=e.valor;
    });
    return score;
}

function Hit() {
    mao.push(TirarCartav2(baralho,1)[0]);
    Dealer();
    Check();
}

function Stand() {
    Dealer();
    Check();
}


function Check() {
    if(GetScore(mao)>21 || GetScore(maoDealer)==21)
        Bust();
    else if(GetScore(mao)==21 || GetScore(maoDealer)>21)
        Win();
    else 
        MostrarMao();    
}

function Bust() {
    console.log("Perdeu!\nSeu Score: "+GetScore(mao)+"\nScore Dealer: "+GetScore(maoDealer));
    Reset();
}

function Win() {
    console.log("Ganhou! Score: "+GetScore(mao));
}

function Debug() {
    console.log(baralho,mao);
}

function Dealer() {
    maoDealer.push(TirarCartav2(baralho,1)[0]);
}


// console.log(GetBaralho());

// console.log(TirarCarta(BaralharoBaralhov2(GetBaralho(),21500),2));

