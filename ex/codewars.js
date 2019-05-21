//https://www.codewars.com/kata/total-amount-of-points/train/javascript

function points(games) {
    var r=0;
    games.forEach(function(e) {
      var x = e.split(":");
      if(x[0]>x[1])
        r+=3;
      else if(x[0]==x[1])
        r+=1;
    });
    return r;
  }