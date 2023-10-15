// Crie o objeto do usuário
const user = {
    username: "marcos",
    password: "1234"
};

// Armazene o objeto do usuário no localStorage
localStorage.setItem('user', JSON.stringify(user));

// Função para login
function login() {
    window.location.href = 'website/pagina_inicial.html';

}

// Login de usuário
document.getElementById('login-button').addEventListener('click', () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && username === storedUser.username && password === storedUser.password) {
        login();
    } else {
        alert('Credenciais inválidas.');
    }
});
