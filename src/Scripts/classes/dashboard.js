class Usuarios {
    constructor() {
        this.listarProduto();
        this.monitorarAuthState();
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

    listarProduto() {
        var totalProdutos = 0;
        const produtoRef = firebase.database().ref('Produtos'); // Referência à chave Produtos
        produtoRef.once('value', snapshot => {
    
            snapshot.forEach(item => {
                const key = item.key; // Chave do produto
                const produto = item.val(); // Dados do produto

                totalProdutos++;

                document.querySelector("#total-produtos").innerHTML = `${totalProdutos} Produtos`
            });
            console.log(totalProdutos);
        });
    }
    
}

var iniciarBotoes = new Usuarios();