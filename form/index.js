window.addEventListener("load", function(){

    // ^Dia (\d{2})\s?-\s?(.+), de (.+)\n\(\w+, (\d{4}), .+\)$
    // Regex de filme

    var formprincipal = document.getElementById("formprincipal");
    var resposta = document.getElementById("resposta");
    var fname = document.getElementById("fname");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var postcode = document.getElementById("postcode");

    formprincipal.addEventListener("submit", event => {
        event.preventDefault();
        if(validarDados()) {
            resposta.innerText = "Email: "+email.value
                               + "\nFirst Name: " +fname.value 
                               + "\nPassword: "+password.value
                               ;
        }   
    })

    function validarDados() {
        let error=[];

        if(email.value=="") {
            error[email.id]="Email can't be empty";
        }
        else if( !(/\w+@\w+.\w+/g).test(email.value)) {
            error[email.id]="Email is invalid";
        }
        if(fname.value==""){
            error[fname.id]="First Name can't be empty"
        }
        if(password.value==""){
            error[password.id]="Password can't be empty"
        }
        if(postcode.value=="") {
            error[postcode.id]="Post Code can't be empty";
        }
        else if( !(/\d{4}-\d{3} \w+/g).test(postcode.value) ) {
            error[postcode.id]="Post Code is not valid";
        }  

        escreverErros(error);
        return Object.keys(error).length==0;
    }

    function escreverErros(error) {
        Array.prototype.forEach.call(document.getElementsByClassName("error"), element => {element.innerHTML="";});
        Object.keys(error).forEach(key => {
            document.getElementById("err"+key.capitalize()).innerText=error[key];
        });
    }

    // Regex

    var formRegex=document.getElementById("formRegex");
    var respostaRegex=document.getElementById("respostaRegex");
    var regex=document.getElementById("regex");
    var regexText=document.getElementById("regexText");

    formRegex.addEventListener("submit", event => {
        event.preventDefault();
        let regexExp = new RegExp("^"+regex.value+"$","gm");
        respostaRegex.innerText = 
        ( regexExp.test(regexText.value) ? "Validated" : "Failed validation" );
    });








});

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

