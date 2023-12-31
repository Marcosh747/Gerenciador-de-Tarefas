// função para gerar um ID único
function generateUniqueID() {
    return Date.now().toString();
}

document.addEventListener("DOMContentLoaded", function () {
    const categoriaSelect = document.getElementById("categoria");
    const dataInput = document.getElementById("data");
    const descricaoInput = document.getElementById("descricao-criar");
    const enviarButton = document.getElementById("enviar-post");


    enviarButton.addEventListener("click", function () {
        const categoria = categoriaSelect.value;
        const data = dataInput.value;
        const descricao = descricaoInput.value;

        // verificar se já existem tarefas no localStorage
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

        // gerar um ID único para a nova tarefa
        const novaTarefa = {
            id: generateUniqueID(),
            categoria,
            data,
            descricao
        };

        // adiciona nova tarefa ao array de tarefas
        tarefas.push(novaTarefa);

        // atualiza o localStorage com as tarefas
        localStorage.setItem("tarefas", JSON.stringify(tarefas));

        // limpa os campos do formulário
        categoriaSelect.value = "padrao";
        dataInput.value = "";
        descricaoInput.value = "";

        alert("Tarefa adicionada com sucesso!");
        exibirTarefas();
    });
});




// exibir tarefas nos feeds
function exibirTarefas() {
    exibirTarefasPorCategoria('pessoal', "#conteudo_feed1");
    exibirTarefasPorCategoria('trabalho', "#conteudo_feed2");
    exibirTarefasPorCategoria('estudo', "#conteudo_feed3");
}



// exibir tarefas por categoria em um feed
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
        BtnEditar.setAttribute("tarefa-id", tarefa.id);
        BtnEditar.className = "botoes botao-selecionado editar-tarefa";
        BtnEditar.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path fill="#45483D" d="M200-200h57l391-391-57-57-391 391v57Zm-40 80q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12-11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm600-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
        </svg>
        `;
        BtnEditar.onclick = editar;

        const BtnApagar = document.createElement("button");
        BtnApagar.className = "botoes botao-selecionado apagar";
        BtnApagar.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="#45483D" d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        `;

        // apagar tarefa
        BtnApagar.addEventListener("click", function () {
            const tarefaId = tarefa.id;
            removerTarefa(tarefaId);
        });





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

exibirTarefas();

// CONTEINER CENTRAL 
const modal = document.querySelector(".modal-false");

function conteinerCentral() {
    if (!modal.classList.contains("modal-expand")) {
        modal.classList.add("modal-expand");
    } else {
        modal.classList.remove("modal-expand");
    }
}



// apagar tarefa
function removerTarefa(tarefaId) {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas = tarefas.filter(tarefa => tarefa.id !== tarefaId);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    exibirTarefas();
}






// pegar o nome do usuário logado
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
        const userKey = localStorage.key(i);
        const informationsKey = localStorage.getItem(userKey);

        try {
            // Tente analisar o JSON armazenado
            let informationsKeyJson = JSON.parse(informationsKey);

            // Faça as alterações necessárias no objeto JSON
            informationsKeyJson.situacao = false;

            // Converta de volta para JSON e atualize no localStorage
            localStorage.setItem(userKey, JSON.stringify(informationsKeyJson));
        } catch (error) {
            // Lida com erros de análise JSON, se houver algum
            console.error("Erro ao analisar o JSON: " + error);
        }
    }
}



// Evento de deslogar usuário
const sair = document.querySelector('.sair')
const loginPage = '/'
sair.addEventListener('click', () => {
    pegaUsuarioAtivo()
    window.location.href = loginPage;

})





function editar() {
    const categoriaSelectEditar = document.getElementById("categoria-editar");
    const dataInputEditar = document.getElementById("data-editar");
    const descricaoInputEditar = document.getElementById("descricao-editar");
    const enviarButtonEditar = document.getElementById("enviar-edicao");
    const containerEditarTarefa = document.querySelector(".conteiner_editar_tarefa");



  
    const abrirEditar = document.querySelectorAll(".editar-tarefa");
    abrirEditar.forEach(botaoEditar => {
        botaoEditar.addEventListener("click", function () {

            tarefaIDEmEdicao = this.getAttribute("tarefa-id");

            // busca a tarefa no localStorage com base no ID
            const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
            const tarefaEditar = tarefas.find(tarefa => tarefa.id);

            if (tarefaEditar) {
               
                categoriaSelectEditar.value = tarefaEditar.categoria;
                dataInputEditar.value = tarefaEditar.data;
                descricaoInputEditar.value = tarefaEditar.descricao;

                // adiciona a class .abrir
                containerEditarTarefa.classList.add('abrir');
            }
        });
    });

    // (para editar)
    enviarButtonEditar.addEventListener("click", function () {
        if (tarefaIDEmEdicao) {
            // busca no localStorage com base no ID
            const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
            const tarefaEditar = tarefas.find(tarefa => tarefa.id);

            if (tarefaEditar) {
                // novas informações do formulário de edição
                tarefaEditar.categoria = categoriaSelectEditar.value;
                tarefaEditar.data = dataInputEditar.value;
                tarefaEditar.descricao = descricaoInputEditar.value;

                // atualiza o localStorage com a tarefa editada
                localStorage.setItem("tarefas", JSON.stringify(tarefas));

                // remove a classe .abrir para esconder o formulário de edição
                containerEditarTarefa.classList.remove('abrir');

                // atualiza
                exibirTarefas();
            }
        }
    });

    const fecharJanelaButton = document.querySelector(".fechar-janela");

    fecharJanelaButton.addEventListener("click", function () {
        containerEditarTarefa.classList.remove('abrir');
    });


};




