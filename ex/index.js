function c(a){console.log(a)};a="Fizz";b="Buzz";for(var i=1;i<=100;i++){if(i%15==0)c(a+b);else if(i%3==0)c(a);else if(i%5==0)c(b);else c(i);}