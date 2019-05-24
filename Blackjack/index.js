var simbolo =
[
    "Paus",
    "Copas",
    "Espadas",
    "Ouros"
]

var valores = 
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

function GetBaralho() {
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

function TirarCarta(baralho,n) {
    let escolhido=[];
    while(n>0) {
        let x = Math.floor(Math.random() * baralho.length);
        if(baralho[x]!=undefined) {
            escolhido.push(baralho[x]);
            baralho.splice(x,1);
            n--;
        }
    }
    console.log(baralho);
    return escolhido;
}

console.log(GetBaralho());

console.log(TirarCarta(BaralharoBaralhov2(GetBaralho(),21500),2));

