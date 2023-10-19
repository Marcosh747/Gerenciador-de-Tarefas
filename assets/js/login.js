
// Função para verificar o login e redirecionar
function verificarEredirecionar() {
    // Pega os valores inseridos nos campos de entrada
    const nomeUsuario = document.getElementById("nomeUsuario").value;
    const senha = document.getElementById("senha").value;

   
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


    const usuarioEncontrado = usuarios.find(function (usuario) {
        return usuario.nome === nomeUsuario;
    });


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

