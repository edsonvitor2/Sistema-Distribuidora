class Usuarios {
    constructor() {
        //this.botoes();
        this.monitorarAuthState();
    }

    botoes(){
        let logar = document.querySelector("");
        logar.addEventListener("click", event=>{
            event.preventDefault();

        });
    }

    monitorarAuthState() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // Obtém o e-mail do usuário
                let email = user.email;
                // Divide o e-mail na parte antes do '@'
                let username = email.split('@')[0];
                console.log("Usuário logado:", username); // Exibe a parte antes do '@'
                document.querySelector("#usuario").innerHTML = `Usuario : ${username}`;
            } else {
                console.log("Nenhum usuário logado.");
            }
        });
    }
    
}

var iniciarBotoes = new Usuarios();