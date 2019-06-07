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
        let x = Math.floor(Math.random() * (baralho.length));
        let y = Math.floor(Math.random() * (baralho.length));
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
        escolhido.push(baralho.pop());
            n--;
    }
    return escolhido;
}

function Jogar() {
    Message("");
    Reset();
    baralho=BaralharoBaralhov2(GetBaralho(),2500);
    mao.push(TirarCartav2(baralho,1)[0]);
    maoDealer.push(TirarCartav2(baralho,1)[0]);
    ShowButtons();
    Hit();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function Reset() {
    baralho=[];
    mao=[];
    maoDealer=[];
    // ClearMessage();
    // Check();
    HideButtons();
}

async function ClearMessage() {
    await sleep(10000);
    Message("");
}

function MostrarMao() {
    document.getElementById("playerHand").innerHTML="";
    document.getElementById("dealerHand").innerHTML="";
    let playerHand = document.createElement("p");
    playerHand.innerHTML="Score "+GetScore(mao)+"<br> Tem na sua mão:<br>"
    // console.log("Score "+GetScore(mao)+" | Tem na sua mão:");
    mao.forEach(function(e){
        // console.log(e.carta);
        playerHand.innerHTML+=e.carta+"<br>";
    });
    let dealerHand = document.createElement("p");
    dealerHand.innerHTML="Score "+GetScore(maoDealer)+"<br> Mão do Dealer:<br>"
    // console.log("Score "+GetScore(maoDealer)+" | Dealer: ");
    maoDealer.forEach(function(e){
        // console.log(e.carta);
        dealerHand.innerHTML+=e.carta+"<br>";
    });
    document.getElementById("playerHand").appendChild(playerHand);
    document.getElementById("dealerHand").appendChild(dealerHand);
    // console.log("x - Hit\nx - Stand")
}

function GetScore(x) {
    var score=0;
    let isAs=false;
    x.forEach(function(e){
        score+=e.valor;
        if(e.valor==11)
            isAs=true;
    });
    if(isAs && score>21)
        score-=10;

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
    MostrarMao();    
    if(GetScore(mao)>21 &&   GetScore(maoDealer)>21)
        Draw();
    else if(GetScore(mao)>21 || GetScore(maoDealer)==21)
        Bust();
    else if(GetScore(mao)==21 || GetScore(maoDealer)>21)
        Win();
}

function Bust() {
    // console.log("Perdeu!\nSeu Score: "+GetScore(mao)+"\nScore Dealer: "+GetScore(maoDealer));
    Message("Perdeu! <br>Seu Score: "+GetScore(mao)+"<br>Score Dealer: "+GetScore(maoDealer));
    Reset();
}

function Win() {
    // console.log("Ganhou! Score: "+GetScore(mao)+"\nScore Dealer: "+GetScore(maoDealer));
    Message("Ganhou! <br>Score: "+GetScore(mao)+"<br>Score Dealer: "+GetScore(maoDealer))
    Reset();
}

function Draw() {
    // console.log("Empatou! Score: "+GetScore(mao)+"\nScore Dealer: "+GetScore(maoDealer));
    Message("Empatou! <br>Score: "+GetScore(mao)+"<br>Score Dealer: "+GetScore(maoDealer));
    Reset();
}

function Message(message) {
    document.getElementById("message").innerHTML=message;
}

function Debug() {
    console.log(baralho,mao);
}

function Dealer() {
    maoDealer.push(TirarCartav2(baralho,1)[0]);
}

function HideButtons() {
    document.getElementById("Hit").style.display = "none";
    document.getElementById("Stand").style.display = "none";
}

function ShowButtons() {
    document.getElementById("Hit").style.display = "inline-block";
    document.getElementById("Stand").style.display = "inline-block";
}

window.addEventListener("load",HideButtons);
document.getElementById("Reset").addEventListener("click",Jogar);
document.getElementById("Hit").addEventListener("click",Hit);
document.getElementById("Stand").addEventListener("click",Stand);