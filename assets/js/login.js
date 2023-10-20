// Função para verificar o login e redirecionar
function verificarEredirecionar() {
    const nomeUsuario = document.getElementById("nomeUsuario").value;
    const senha = document.getElementById("senha").value;

   
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


    const usuarioEncontrado = usuarios.find(function (usuario) {
        return usuario.nome === nomeUsuario;
    });

<<<<<<< Updated upstream

    if (usuarioEncontrado && usuarioEncontrado.senha === senha) {
  
        usuarioEncontrado.situacao = true;
        
       
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id === usuarioEncontrado.id) {
                usuarios[i] = usuarioEncontrado;
                break;
            }
        }
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    
       
        sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
    
     
        window.location.href = 'website/pagina_inicial.html';
    } else {
        alert("Nome de usuário ou senha incorretos. Por favor, verifique.");
    }
    
}
=======
    if (usuarioEncontrado) {
        // Verifica se a senha está correta
        if (senha === usuarioEncontrado.senha) {
            // Simulação de um token de autenticação
            const token = Math.random().toString(36).substring(7);
>>>>>>> Stashed changes

            // Salva o token no LocalStorage
            localStorage.setItem("token", token);

            // Redireciona o usuário para a página principal
            window.location.href = 'website/pagina_inicial.html';
        } else {
            alert("Senha incorreta. Por favor, verifique.");
        }
    } else {
        alert("Nome de usuário não encontrado. Por favor, verifique.");
    }
}