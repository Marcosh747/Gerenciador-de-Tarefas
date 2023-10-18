// Função para cadastrar o usuário e salvar no LocalStorage
function cadastrarUsuario() {
    // Pega os valores inseridos nos campos de entrada
    const nomeUsuario = document.getElementById("nomeUsuario").value;
    const senha = document.getElementById("senha").value;
    const senhaConfirmar = document.getElementById("senha-confirmar").value;

    // Verifica se as senhas coincidem
    if (senha !== senhaConfirmar) {
        alert("As senhas não coincidem. Por favor, verifique.");
        return;
    }

    // Cria um objeto de usuário com os dados
    const usuario = {
        nome: nomeUsuario,
        senha: senha
    };

    // Verifica se o LocalStorage já possui dados de usuários
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Adiciona o novo usuário à lista
    usuarios.push(usuario);

    // Salva a lista atualizada no LocalStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Limpa os campos de entrada
    document.getElementById("nomeUsuario").value = "";
    document.getElementById("senha").value = "";
    document.getElementById("senha-confirmar").value = "";

    // Exibe uma mensagem de sucesso
    alert("Usuário cadastrado com sucesso!");

    // Redireciona para a página "index.html"
    window.location.href = '/index.html';
}
