function verificarEredirecionar() {
    const nomeUsuario = document.getElementById("nomeUsuario").value;
    const senha = document.getElementById("senha").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(function (usuario) {
        return usuario.nome === nomeUsuario;
    });

    if (usuarioEncontrado) {
        // verifica se a senha está correta
        if (senha === usuarioEncontrado.senha) {
            // simulação de um token de autenticação
            const token = Math.random().toString(36).substring(7);
            localStorage.setItem("token", token);

            // altera a situação do usuário para true
            usuarioEncontrado.situacao = true;

            // atualiza os dados do usuário no LocalStorage
            const usuarioIndex = usuarios.indexOf(usuarioEncontrado);
            usuarios[usuarioIndex] = usuarioEncontrado;
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            // redireciona o usuario para a página principal
            window.location.href = 'website/pagina_inicial.html';
        } else {
            alert("Senha incorreta. Por favor, verifique.");
        }
    } else {
        alert("Nome de usuário não encontrado. Por favor, verifique.");
    }
}
