
// Função para verificar o login e redirecionar
function verificarEredirecionar() {
    // Pega os valores inseridos nos campos de entrada
    const nomeUsuario = document.getElementById("nomeUsuario").value;
    const senha = document.getElementById("senha").value;

    // Verifica se o LocalStorage já possui dados de usuários
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Procura o usuário com o nome de usuário inserido
    const usuarioEncontrado = usuarios.find(function (usuario) {
        return usuario.nome === nomeUsuario;
    });

    // Verifica se o usuário foi encontrado e se a senha está correta
    if (usuarioEncontrado && usuarioEncontrado.senha === senha) {
        // Define a sessão do usuário como logado (pode ser feito de outras formas mais seguras)
        sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

        // Redireciona o usuário para a página principal
        window.location.href = '/website/pagina_Inicial.html';
    } else {
        alert("Nome de usuário ou senha incorretos. Por favor, verifique.");
    }
}

