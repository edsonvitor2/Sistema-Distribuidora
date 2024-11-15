class Usuarios {
    constructor() {
        this.botoes();
        this.monitorarAuthState();
    }

    botoes(){
        let logar = document.querySelector("#logar");
        logar.addEventListener("click", event=>{
            event.preventDefault();

            let usuario = document.querySelector("#username").value;
            let senha = document.querySelector("#password").value;

            this.logar(usuario,senha);

            console.log('Logar');
        });

        let cadastrar = document.querySelector("#cadastrar");
        cadastrar.addEventListener("click", event=>{
            event.preventDefault();

            let usuario = document.querySelector("#username").value;
            let senha = document.querySelector("#password").value;

            this.cadastrar(usuario,senha);

            console.log('Cadastrar');
        });
    }

    async cadastrar(usuario, senha) {
        try {
            // Tente criar o usuário com o e-mail e a senha fornecidos
            await firebase.auth().createUserWithEmailAndPassword(usuario, senha);
            
            // Exibe mensagem de sucesso após o cadastro
            alert("Cadastro realizado com sucesso!");
            
            window.location.href = "./src/html/inicio.html"; // Redirecionar para o inicio
        } catch (error) {
            // Exibe erros, como se o e-mail já estiver em uso ou se a senha for muito fraca
            alert("Erro ao criar o usuário: " + error.message);
        }
    }

    async logar(usuario,senha) {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(usuario, senha);
            alert("Login realizado com sucesso!");
            window.location.href = "./src/html/inicio.html"; // Redirecionar para o inicio
        } catch (error) {
            alert("Erro ao fazer login: " + error.message);
        }
    }

    monitorarAuthState() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("Usuário logado:", user.email); // Exibe e-mail do usuário logado
            } else {
                console.log("Nenhum usuário logado.");
            }
        });
    }
}

var iniciarBotoes = new Usuarios();