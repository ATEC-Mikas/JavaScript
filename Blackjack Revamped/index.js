class Card {
        constructor(value,suit,image) {
            this.value=value;
            this.suit=suit;
            this.image=image;
        }
}

let valueDictionary = {
    "ACE":11,
    "2":2,
    "3":3,
    "4":4,
    "5":5,
    "6":6,
    "7":7,
    "8":8,
    "9":9,
    "10":10,
    "JACK":10,
    "QUEEN":10,
    "KING":10,
}


var Settings = {};
Settings.APIURL= "https://deckofcardsapi.com/api/deck/";
var API = {}
API.GenerateDeck = function () {
    return new Promise(
        function(resolve, reject) {       
            let xhr = new XMLHttpRequest();
            let finalUrl = `${Settings.APIURL}new/shuffle/?deck_count=1`
            xhr.open("GET",finalUrl);
            xhr.onload = function() {
                resolve(JSON.parse(xhr.responseText).deck_id);
            }
            xhr.onerror = function() {
                reject("ERROR "+xhr.response.code+" : "+xhr.responseText);
            }
            xhr.send();
        });
}
API.DrawDeck = function (numCards,DeckID) {
    return new Promise(
        function(resolve, reject) {       
            let xhr = new XMLHttpRequest();
            let finalUrl = `${Settings.APIURL+DeckID}/draw/?count=${numCards}`;
            xhr.open("GET", finalUrl);
            xhr.onload = function() {
                let jsonCards = JSON.parse(xhr.responseText);
                let resultCards = []
                jsonCards.cards.forEach(element => {
                    resultCards.push(new Card(element.value,element.suit,element.image)); 
                });
                resolve(resultCards);
            }
            xhr.onerror = function() {
                reject("ERROR "+xhr.response.code+" : "+xhr.responseText);
            }
            xhr.send();
        });
}



var Game = {};

async function StartPlay() {
    Game.DeckId = null;
    Game.PlayerDeck = [];
    Game.DealerDeck = [];
    Game.DeckId = await API.GenerateDeck();
    (await API.DrawDeck(2,Game.DeckId)).forEach(element => {
        Game.PlayerDeck.push(element);
    });
    (await API.DrawDeck(2,Game.DeckId)).forEach(element => {
        Game.DealerDeck.push(element);
    });
    Check();
    EnableButtons();
    document.getElementById("Reset").innerText="Reset";
}

function ShowHand() {
    document.getElementById("playerScore").innerText=GetScore(Game.PlayerDeck);
    document.getElementById("dealerScore").innerText=GetScore(Game.DealerDeck);
    document.getElementById("playerHand").innerHTML="";
    document.getElementById("dealerHand").innerHTML="";
    let playerHand = document.createElement("p");
    playerHand.className="hand";
    Game.PlayerDeck.forEach(element => {
        playerHand.innerHTML+=`<img src="${element.image}" class="card"/>`
    });
    let dealerHand = document.createElement("p");
    dealerHand.className="hand";
    Game.DealerDeck.forEach(element => {
        dealerHand.innerHTML+=`<img src="${element.image}" class="card"/>`
    });
    document.getElementById("playerHand").appendChild(playerHand);
    document.getElementById("dealerHand").appendChild(dealerHand);
}

function GetScore(Deck) {
    var score=0;
    let isAce=false;
    Deck.forEach(function(e){
        score+=valueDictionary[e.value];
        if(valueDictionary[e.value]==11)
            isAce=true;
    });
    if(isAce && score>21)
        score-=10;

    return score;
}

window.onload = function() {
    document.getElementById("Hit").disabled=true;
    document.getElementById("Stand").disabled=true;
    StartPlay();
    document.getElementById("Hit").addEventListener("click", Hit);
    document.getElementById("Stand").addEventListener("click", Stand);
    document.getElementById("Reset").addEventListener("click", Reset);

}

function Check() {
    ShowHand();
    if(GetScore(Game.PlayerDeck)>=21 && GetScore(Game.DealerDeck)>=21)
        Draw();
    else if(GetScore(Game.PlayerDeck)>21 || GetScore(Game.DealerDeck)==21)
        Bust();
    else if(GetScore(Game.PlayerDeck)==21 || GetScore(Game.DealerDeck)>21)
        Win();
}

async function Dealer() {
    (await API.DrawDeck(1,Game.DeckId)).forEach(element => {
        Game.DealerDeck.push(element);
    });
    ShowHand();
    Check();
}

function DisableButtons() {
    document.getElementById("Hit").disabled=true;
    document.getElementById("Stand").disabled=true;
}

function EnableButtons() {
    document.getElementById("Hit").disabled=false;
    document.getElementById("Stand").disabled=false;
}

function Bust() {
    Message("Perdeu!");
    End();
}

function Win() {
    Message("Ganhou!");
    End();
}

function Draw() {
    Message("Empatou!");
    End();
}

async function Hit() {
    (await API.DrawDeck(1,Game.DeckId)).forEach(element => {
        Game.PlayerDeck.push(element);
    });
    Dealer();
}

function Stand() {
    Dealer();
}

function Message(msg) {
    if(msg!="") {
        document.getElementById("message").innerHTML=`<div class="alert alert-info alert-dismissible fade show" role="alert" style="margin-top:10px;">
                                    <strong>${msg}</strong>
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                    </div>`;
    } else {
        document.getElementById("message").innerHTML="";
    }
}

function End() {
    DisableButtons();
}

function Reset() {
    if(document.getElementById("Reset").innerText=="Reset") {
        Message("");
        Game.DeckId = null;
        Game.PlayerDeck = [];
        Game.DealerDeck = [];
        ShowHand();
        document.getElementById("playerHand").innerHTML = '<span class="text-muted placehold">None</span>';
        document.getElementById("dealerHand").innerHTML = '<span class="text-muted placehold">None</span>';
        DisableButtons();
        document.getElementById("Reset").innerText="Start";
    } else {
        StartPlay();
    }
}
