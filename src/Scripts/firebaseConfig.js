const config = {
    apiKey: "AIzaSyBnfhryMwR1I8dAmdCr-SD5n7UReG0U6No",
    authDomain: "sistema-vendas-e-estoque.firebaseapp.com",
    databaseURL: "https://sistema-vendas-e-estoque-default-rtdb.firebaseio.com",
    projectId: "sistema-vendas-e-estoque",
    storageBucket: "sistema-vendas-e-estoque.firebasestorage.app",
    messagingSenderId: "173295760053",
    appId: "1:173295760053:web:79aca90435cfac06c884fc"
};

// Inicializar o Firebase usando a configuração global
const app = firebase.initializeApp(config);

const auth = firebase.auth();

// Agora você pode usar 'auth' para autenticação em outros arquivos