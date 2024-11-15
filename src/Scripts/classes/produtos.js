class Produto {
    constructor() {
        // Variaveis 
        this.acaoProduto = 'cadastrar';
        this.keyProduto = null;
        this.quantidadeAtualProduto;

        // Metodos
        this.botoes();
        this.listarProduto();
    }

    botoes(){
        let cadastrar = document.querySelector(".btn-submit");
        cadastrar.addEventListener("click", event=>{
            event.preventDefault();

            if(this.acaoProduto == 'editar'){

                this.editarProduto(this.keyProduto,this.obterDadosForm());
                this.acaoProduto = 'cadastrar';

            } else if(this.acaoProduto == 'adicionar'){
                let produto = this.obterDadosForm()

                let quantidadeA = parseInt(this.quantidadeAtualProduto);
                let quantidadeB = parseInt(produto.quantidade)
                
                let novaQuantidade = quantidadeA + quantidadeB;

                produto.quantidade = novaQuantidade

                console.log(produto);

                this.editarProduto(this.keyProduto,produto);
                this.acaoProduto = 'cadastrar';
                

            }else if(this.acaoProduto == 'excluir'){

            }
            else if(this.acaoProduto == 'cadastrar'){
                this.cadastrarProduto(this.obterDadosForm());
            }
        });
    }

    obterDadosForm(){
        let nome = document.querySelector("#product-name").value;
        let quantidade = document.querySelector("#product-quantity").value;
        let valor = document.querySelector("#product-price").value;
        let descricao = document.querySelector("#product-description").value;

        var produto = {
            nome,
            quantidade,
            valor,
            descricao
        }
        return produto;
    }

    retornarDadosForm(produto){
        document.querySelector("#product-name").value = produto.nome;
        document.querySelector("#product-quantity").value = produto.quantidade;
        document.querySelector("#product-price").value = produto.valor;
        document.querySelector("#product-description").value = produto.descricao;
    }

    limparForm(){
        document.querySelector("#product-name").value = '';
        document.querySelector("#product-quantity").value ='';
        document.querySelector("#product-price").value ='';
        document.querySelector("#product-description").value ='';
    }

    cadastrarProduto(produto) {
        const produtoRef = firebase.database().ref('Produtos'); // Chave específica
        produtoRef.push(produto)
            .then(() => {
                console.log("Produto adicionado com sucesso!");
                this.limparForm();
                this.listarProduto();
            })
            .catch((error) => {
                console.error("Erro ao adicionar produto:", error);
            });
    }

    listarProduto() {
        const produtoRef = firebase.database().ref('Produtos'); // Referência à chave Produtos
        produtoRef.once('value', snapshot => {
    
            // Obtém o corpo da tabela
            const corpoTabela = document.querySelector('#corpo-tabela');
            corpoTabela.innerHTML = ''; // Limpa a tabela antes de inserir novos dados
    
            snapshot.forEach(item => {
                const key = item.key; // Chave do produto
                const produto = item.val(); // Dados do produto
    
                // Cria uma nova linha para a tabela
                const novaLinha = document.createElement('tr');
    
                // Adiciona células (colunas) com os dados do produto
                novaLinha.innerHTML = `
                    <td>${produto.nome || 'N/A'}</td>
                    <td>${produto.quantidade || '0'}</td>
                    <td>${`R$ ${produto.valor}`}</td>
                    <td>${produto.descricao || 'Sem descrição'}</td>
                    <td>
                        <button class="btn-add">Adicionar</button>
                        <button class="btn-edit">Editar</button>
                        <button class="btn-delete">Excluir</button>
                    </td>
                `;
    
                const btnAdd = novaLinha.querySelector('.btn-add');
                const btnEdit = novaLinha.querySelector('.btn-edit');
                const btnDelete = novaLinha.querySelector('.btn-delete');

                // Adicionar produtos existentes , soma a quantidade.
                btnAdd.addEventListener('click', () => {
                    console.log(`Adicionar produto: ${key}`);

                    document.querySelector("#label-qtd").innerText ='Quantidade a somar(Adicionar) na Atual'
                        
                    document.querySelector("#product-price").disabled = true;
                    document.querySelector("#product-description").disabled = true;
                    document.querySelector("#product-name").disabled = true;

                    document.querySelector(".btn-submit").style.backgroundColor = '#47db34';
                    document.querySelector(".btn-submit").innerHTML = 'Adicionar Quantidade';
                    document.querySelector(".btn-submit").style.color = '#000';
                    
                    this.retornarDadosForm(produto);
                    this.quantidadeAtualProduto = produto.quantidade;
                    this.acaoProduto = 'adicionar';
                    this.keyProduto = key
                });

                // editar todos os dados do produto
                btnEdit.addEventListener('click', () => {
                    this.acaoProduto = 'editar';
                    this.retornarDadosForm(produto)
                    this.keyProduto = key

                    document.querySelector(".btn-submit").style.backgroundColor = '#47db34';
                    document.querySelector(".btn-submit").style.color = '#000';
                    document.querySelector(".btn-submit").innerHTML = 'Editar Produto';
                });

                //excluir produto
                btnDelete.addEventListener('click', () => {
                    this.excluirProduto(key)
                });

                corpoTabela.appendChild(novaLinha);
            });
        });
    }

    editarProduto(key, produto){
        console.log(key, produto);

        const produtoRef = firebase.database().ref('Produtos').child(key); // Chave específica
        produtoRef.set(produto)
            .then(() => {
                console.log("Produto EDITADO com sucesso!");
                this.acaoProduto = 'cadastrar';
                this.limparForm();
                this.listarProduto();

                document.querySelector(".btn-submit").style.backgroundColor = '#007bff';
                document.querySelector(".btn-submit").innerHTML = 'Cadastrar Produto';
                document.querySelector(".btn-submit").style.color = '#fff';
                document.querySelector("#label-qtd").innerText ='Quantidade em Estoque:';

            })
            .catch((error) => {
                console.error("Erro ao adicionar produto:", error);
            });
    }
    
    async excluirProduto(key) {
        try {
            // Referência ao produto pelo caminho da key
            const produtoRef = firebase.database().ref(`Produtos/${key}`);
            
            // Remove o produto
            await produtoRef.remove();
            console.log(`Produto com a key ${key} foi excluído com sucesso.`);
            alert("Produto excluído com sucesso!");
    
            // Atualiza a tabela ou qualquer interface
            this.listarProduto(); // Chama o método para atualizar a lista
        } catch (error) {
            console.error("Erro ao excluir o produto:", error);
            alert("Não foi possível excluir o produto. Tente novamente.");
        }
    }
    
}

var prod = new Produto();