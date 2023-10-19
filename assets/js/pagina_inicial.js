 // Função para criar uma nova tarefa
 function criarTarefa() {
    const categoriaSelecionada = document.getElementById("categoria").value;
    const data = document.getElementById("data").value;
    const descricao = document.getElementById("descricao-criar").value;

    if (categoriaSelecionada === 'padrao' || !descricao) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const novaTarefa = new Tarefa(categoriaSelecionada, data, descricao);
    novaTarefa.salvar();
    limparCampos();
    exibirTarefas();
}

// Classe para representar uma tarefa
class Tarefa {
    constructor(categoria, data, descricao) {
        this.categoria = categoria;
        this.data = data;
        this.descricao = descricao;
    }

    salvar() {
        const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        tarefas.push(this);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }
}

// Função para limpar campos após criar uma tarefa
function limparCampos() {
    document.getElementById("categoria").value = 'padrao';
    document.getElementById("data").value = '';
    document.getElementById("descricao-criar").value = '';
}

// Função para exibir tarefas nos feeds
function exibirTarefas() {
    exibirTarefasPorCategoria('pessoal', "#feed1");
    exibirTarefasPorCategoria('trabalho', "#feed2");
    exibirTarefasPorCategoria('estudo', "#feed3");
}

// Função para exibir tarefas por categoria em um feed
function exibirTarefasPorCategoria(categoria, feedId) {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    const feedContent = document.querySelector(feedId);
    feedContent.innerHTML = '';

    const tarefasCategoria = tarefas.filter(tarefa => tarefa.categoria === categoria);

    tarefasCategoria.forEach(tarefa => {
        const cardAviso = document.createElement("div");
        cardAviso.className = "card-state-layer-outlined estilo-conteiner-secundario";

        const headerAviso = document.createElement("p");
        headerAviso.className = "header-aviso";

        const descricao = document.createElement("div");
        descricao.className = "header2";
        descricao.textContent = tarefa.descricao;

        const divData = document.createElement("div");
        divData.className = "divDataCategoria";

        const divinfo = document.createElement("div");
        divinfo.className = "divinfo";

        const divAcoes = document.createElement("div");
        divAcoes.className = "acoesTarefas";

        const BtnEditar = document.createElement("button");
        BtnEditar.className = "botoes botao-selecionado";
        BtnEditar.innerHTML = `
            <svg 
                xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960" width="24">
                <path fill="#45483D" d="M200-200h57l391-391-57-57-391 391v57Zm-40 80q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12-11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm600-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
            </svg>
        `;

        const BtnApagar = document.createElement("button");
        BtnApagar.className = "botoes botao-selecionado";
        BtnApagar.innerHTML = `
            <svg 
                xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960" width="24">
                <path fill="#45483D" d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        `;

        const dataSpan = document.createElement("span");
        dataSpan.id = "data";
        dataSpan.textContent = tarefa.data;

        const categoriaSpan = document.createElement("span");
        categoriaSpan.id = "categoria";
        categoriaSpan.textContent = tarefa.categoria;

        cardAviso.appendChild(headerAviso);
        headerAviso.appendChild(descricao);
        headerAviso.appendChild(divinfo);

        divinfo.appendChild(divData);
        divData.appendChild(dataSpan);
        divData.appendChild(categoriaSpan);

        divinfo.appendChild(divAcoes);
        divAcoes.appendChild(BtnEditar);
        divAcoes.appendChild(BtnApagar);

        feedContent.appendChild(cardAviso);
    });
}

// Chame exibirTarefas inicialmente
exibirTarefas();

// CONTEINER CENTRAL 
const modal = document.querySelector(".modal-false");

function toggleModalExpand() {
    if (!modal.classList.contains("modal-expand")) {
        modal.classList.add("modal-expand");
    } else {
        modal.classList.remove("modal-expand");
    }
}






// Função para pegar o nome do usuário logado
function pegaUsuario() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    for (let i = 0; i < usuarios.length; i++) {
        const usuario = usuarios[i];
        if (usuario.situacao === true) {
            return usuario.nome;
        }
    }
    return "Usuário não encontrado";
}

// exibir o nome do usuário
const h2 = document.querySelector('.ola-usuario');

h2.textContent = "Olá, " + pegaUsuario();







// Pega o Usuário logado e altera ele para ativo
function pegaUsuarioAtivo() {
    for (let i = 0; i < localStorage.length; i++) {
        const userKey = localStorage.key(i)
        const informationsKey = localStorage.getItem(userKey)
        let informationsKeyJson = JSON.parse(informationsKey)
        informationsKeyJson.situacao = false
        informationsKeyJson = JSON.stringify(informationsKeyJson)
        localStorage.setItem(userKey, informationsKeyJson);
    }

}



// Evento de deslogar usuário
const sair = document.querySelector('.sair')
const loginPage = '../../index.html'
sair.addEventListener('click', () => {
    pegaUsuarioAtivo()
    window.location.href = loginPage;

})