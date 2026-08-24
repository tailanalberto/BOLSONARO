/* =========================================================
   REALIMENTA - PAINEL ADMINISTRATIVO
   ========================================================= */


/* =========================================================
   DADOS INICIAIS
   ========================================================= */

const dadosIniciais = {

    empresas: [
        {
            id: 1,
            nome: "Coimbra Importação e Exportação",
            responsavel: "Administrador",
            cadastro: "20/08/2026",
            status: "Pendente",
            cidade: "Guajará-Mirim"
        },
        {
            id: 2,
            nome: "Mercado São José",
            responsavel: "Carlos Silva",
            cadastro: "21/08/2026",
            status: "Pendente",
            cidade: "Guajará-Mirim"
        },
        {
            id: 3,
            nome: "Supermercado Central",
            responsavel: "Marcos Oliveira",
            cadastro: "22/08/2026",
            status: "Aprovada",
            cidade: "Guajará-Mirim"
        }
    ],

    usuarios: [
        {
            id: 1,
            nome: "João da Silva",
            familia: "4 pessoas",
            cadastro: "18/08/2026",
            status: "Ativo"
        },
        {
            id: 2,
            nome: "Maria Santos",
            familia: "3 pessoas",
            cadastro: "19/08/2026",
            status: "Ativo"
        },
        {
            id: 3,
            nome: "Pedro Souza",
            familia: "5 pessoas",
            cadastro: "20/08/2026",
            status: "Ativo"
        }
    ],

    alimentos: [
        {
            id: 1,
            nome: "Arroz",
            categoria: "Grãos",
            quantidade: 85,
            validade: "15/09/2026"
        },
        {
            id: 2,
            nome: "Feijão",
            categoria: "Grãos",
            quantidade: 64,
            validade: "20/09/2026"
        },
        {
            id: 3,
            nome: "Leite",
            categoria: "Laticínios",
            quantidade: 42,
            validade: "05/09/2026"
        },
        {
            id: 4,
            nome: "Banana",
            categoria: "Hortifruti",
            quantidade: 35,
            validade: "28/08/2026"
        },
        {
            id: 5,
            nome: "Suco",
            categoria: "Bebidas",
            quantidade: 28,
            validade: "10/10/2026"
        }
    ],

    denuncias: [
        {
            id: 1,
            titulo: "Produto com validade incorreta",
            descricao: "Usuário informou que a validade apresentada não corresponde ao produto.",
            status: "Pendente"
        },
        {
            id: 2,
            titulo: "Empresa não entregou o alimento",
            descricao: "Pedido reservado não foi disponibilizado para retirada.",
            status: "Pendente"
        }
    ],

    auditoria: [],

    movimentacao: [
        42,
        67,
        51,
        84,
        73,
        96,
        78
    ]

};


/* =========================================================
   LOCAL STORAGE
   ========================================================= */

function carregarDados() {

    const dadosSalvos = localStorage.getItem("realimentaDados");

    if (dadosSalvos) {

        return JSON.parse(dadosSalvos);

    }

    localStorage.setItem(
        "realimentaDados",
        JSON.stringify(dadosIniciais)
    );

    return JSON.parse(
        JSON.stringify(dadosIniciais)
    );
}


let dados = carregarDados();


function salvarDados() {

    localStorage.setItem(
        "realimentaDados",
        JSON.stringify(dados)
    );

}


/* =========================================================
   NAVEGAÇÃO
   ========================================================= */

const menus = document.querySelectorAll(".menu[data-tela]");
const telas = document.querySelectorAll(".tela");

menus.forEach(menu => {

    menu.addEventListener("click", function () {

        const telaSelecionada =
            this.dataset.tela;

        menus.forEach(item => {
            item.classList.remove("ativo");
        });

        this.classList.add("ativo");

        telas.forEach(tela => {
            tela.classList.remove("ativa");
        });

        const tela =
            document.getElementById(telaSelecionada);

        if (tela) {
            tela.classList.add("ativa");
        }

        atualizarCabecalho(telaSelecionada);

    });

});


/* =========================================================
   CABEÇALHO
   ========================================================= */

const titulos = {

    dashboard: [
        "Dashboard",
        "Visão geral da plataforma REalimenta"
    ],

    aprovacoes: [
        "Aprovações",
        "Analise os pedidos das empresas"
    ],

    usuarios: [
        "Usuários",
        "Controle de usuários e famílias atendidas"
    ],

    empresas: [
        "Empresas",
        "Empresas parceiras da REalimenta"
    ],

    alimentos: [
        "Alimentos",
        "Controle de estoque e validade"
    ],

    auditoria: [
        "Auditoria",
        "Histórico das movimentações"
    ],

    relatorios: [
        "Relatórios",
        "Exporte os dados da plataforma"
    ],

    suporte: [
        "Suporte",
        "Denúncias e solicitações de suporte"
    ]

};


function atualizarCabecalho(tela) {

    if (!titulos[tela]) return;

    document.getElementById("titulo").textContent =
        titulos[tela][0];

    document.getElementById("subtitulo").textContent =
        titulos[tela][1];

    document.getElementById("breadcrumbAtual").textContent =
        titulos[tela][0];

}


/* =========================================================
   DASHBOARD
   ========================================================= */

function atualizarDashboard() {

    const doacoes =
        dados.alimentos.reduce(
            (total, alimento) =>
                total + alimento.quantidade,
            0
        );

    document.querySelectorAll(".numero")[0].textContent =
        String(doacoes).padStart(4, "0");

    document.querySelectorAll(".numero")[1].textContent =
        String(dados.usuarios.length).padStart(4, "0");

    const familias =
        dados.usuarios.reduce(
            (total, usuario) => {

                const numero =
                    parseInt(usuario.familia);

                return total +
                    (isNaN(numero) ? 0 : numero);

            },
            0
        );

    document.querySelectorAll(".numero")[2].textContent =
        String(familias).padStart(4, "0");

    const empresasAprovadas =
        dados.empresas.filter(
            empresa =>
                empresa.status === "Aprovada"
        ).length;

    document.querySelectorAll(".numero")[3].textContent =
        String(empresasAprovadas).padStart(4, "0");

}


/* =========================================================
   APROVAÇÕES
   ========================================================= */

function carregarAprovacoes() {

    const tabela =
        document.getElementById("tabelaAprovacoes");

    if (!tabela) return;

    tabela.innerHTML = "";

    const pendentes =
        dados.empresas.filter(
            empresa =>
                empresa.status === "Pendente"
        );

    if (pendentes.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="5"
                    style="text-align:center;padding:30px;">
                    Nenhum pedido aguardando aprovação.
                </td>
            </tr>
        `;

        return;
    }


    pendentes.forEach(empresa => {

        const tr =
            document.createElement("tr");

        tr.innerHTML = `

            <td>
                <strong>${empresa.nome}</strong>
            </td>

            <td>
                ${empresa.responsavel}
            </td>

            <td>
                ${empresa.cadastro}
            </td>

            <td>
                <span class="status-pendente">
                    ${empresa.status}
                </span>
            </td>

            <td>

                <button
                    class="botao aprovar"
                    onclick="aprovarEmpresa(${empresa.id})"
                >
                    Aprovar
                </button>

                <button
                    class="botao rejeitar"
                    onclick="rejeitarEmpresa(${empresa.id})"
                >
                    Rejeitar
                </button>

            </td>
        `;

        tabela.appendChild(tr);

    });

}


/* =========================================================
   APROVAR EMPRESA
   ========================================================= */

function aprovarEmpresa(id) {

    const empresa =
        dados.empresas.find(
            item => item.id === id
        );

    if (!empresa) return;

    empresa.status = "Aprovada";

    dados.auditoria.unshift({

        data: new Date().toLocaleDateString("pt-BR"),

        horario: new Date().toLocaleTimeString(
            "pt-BR",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        ),

        usuario: "Administrador",

        produto: empresa.nome,

        acao: "Empresa aprovada"

    });

    salvarDados();

    carregarAprovacoes();

    carregarEmpresas();

    carregarAuditoria();

    atualizarDashboard();

    atualizarResumoAprovacoes();

}


/* =========================================================
   REJEITAR EMPRESA
   ========================================================= */

function rejeitarEmpresa(id) {

    const empresa =
        dados.empresas.find(
            item => item.id === id
        );

    if (!empresa) return;

    empresa.status = "Rejeitada";

    dados.auditoria.unshift({

        data: new Date().toLocaleDateString("pt-BR"),

        horario: new Date().toLocaleTimeString(
            "pt-BR",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        ),

        usuario: "Administrador",

        produto: empresa.nome,

        acao: "Empresa rejeitada"

    });

    salvarDados();

    carregarAprovacoes();

    carregarEmpresas();

    carregarAuditoria();

    atualizarDashboard();

    atualizarResumoAprovacoes();

}


/* =========================================================
   USUÁRIOS
   ========================================================= */

function carregarUsuarios() {

    const tabela =
        document.getElementById("tabelaUsuarios");

    if (!tabela) return;

    tabela.innerHTML = "";

    dados.usuarios.forEach(usuario => {

        const tr =
            document.createElement("tr");

        tr.innerHTML = `

            <td>
                <strong>${usuario.nome}</strong>
            </td>

            <td>
                ${usuario.familia}
            </td>

            <td>
                ${usuario.cadastro}
            </td>

            <td>
                ${usuario.status}
            </td>

            <td>

                <button
                    class="botao bloquear"
                    onclick="alternarUsuario(${usuario.id})"
                >
                    ${
                        usuario.status === "Ativo"
                        ? "Bloquear"
                        : "Ativar"
                    }
                </button>

            </td>

        `;

        tabela.appendChild(tr);

    });

}


function alternarUsuario(id) {

    const usuario =
        dados.usuarios.find(
            item => item.id === id
        );

    if (!usuario) return;

    usuario.status =
        usuario.status === "Ativo"
        ? "Bloqueado"
        : "Ativo";

    salvarDados();

    carregarUsuarios();

    atualizarDashboard();

}


/* =========================================================
   EMPRESAS
   ========================================================= */

function carregarEmpresas() {

    const lista =
        document.getElementById("listaEmpresas");

    if (!lista) return;

    lista.innerHTML = "";

    dados.empresas.forEach(empresa => {

        let classe = "";

        if (empresa.status === "Pendente") {
            classe = "pendente";
        }

        lista.innerHTML += `

            <div class="empresa-card">

                <span class="empresa-status ${classe}">
                    ${empresa.status}
                </span>

                <h3>
                    ${empresa.nome}
                </h3>

                <p>
                    Responsável: ${empresa.responsavel}
                </p>

                <p>
                    ${empresa.cidade}
                </p>

                ${
                    empresa.status === "Pendente"
                    ? `
                        <button
                            class="botao aprovar"
                            onclick="aprovarEmpresa(${empresa.id})"
                        >
                            Aprovar empresa
                        </button>

                        <button
                            class="botao rejeitar"
                            onclick="rejeitarEmpresa(${empresa.id})"
                        >
                            Rejeitar
                        </button>
                    `
                    : ""
                }

            </div>
        `;

    });

}


/* =========================================================
   ALIMENTOS
   ========================================================= */

function carregarAlimentos() {

    const lista =
        document.getElementById("listaAlimentos");

    if (!lista) return;

    const pesquisa =
        document.getElementById("buscarAlimento").value
            .toLowerCase();

    const categoria =
        document.getElementById("filtroCategoria").value;

    lista.innerHTML = "";

    const filtrados =
        dados.alimentos.filter(alimento => {

            const correspondeNome =
                alimento.nome
                    .toLowerCase()
                    .includes(pesquisa);

            const correspondeCategoria =
                categoria === "todos" ||
                alimento.categoria === categoria;

            return correspondeNome &&
                correspondeCategoria;

        });


    filtrados.forEach(alimento => {

        lista.innerHTML += `

            <div
                class="alimento-card"
                onclick="abrirProduto(${alimento.id})"
            >

                <span class="alimento-categoria">
                    ${alimento.categoria}
                </span>

                <h3>
                    ${alimento.nome}
                </h3>

                <p>
                    Quantidade disponível:
                    <strong>${alimento.quantidade}</strong>
                </p>

                <div class="validade">
                    Validade:
                    ${alimento.validade}
                </div>

            </div>

        `;

    });

}


document
    .getElementById("buscarAlimento")
    ?.addEventListener(
        "input",
        carregarAlimentos
    );


document
    .getElementById("filtroCategoria")
    ?.addEventListener(
        "change",
        carregarAlimentos
    );


/* =========================================================
   GRÁFICO
   ========================================================= */

function carregarGrafico() {

    const barras =
        document.getElementById("barrasGrafico");

    const dias =
        document.getElementById("diasGrafico");

    if (!barras || !dias) return;

    barras.innerHTML = "";

    dias.innerHTML = "";

    const nomesDias = [
        "Seg",
        "Ter",
        "Qua",
        "Qui",
        "Sex",
        "Sáb",
        "Dom"
    ];

    const valores =
        dados.movimentacao;

    const maior =
        Math.max(...valores);


    valores.forEach((valor, index) => {

        const altura =
            (valor / maior) * 100;

        const barra =
            document.createElement("div");

        barra.className = "barra";

        barra.style.height =
            `${altura}%`;

        barra.title =
            `${valor} alimentos`;

        barra.dataset.valor =
            valor;

        barra.dataset.dia =
            nomesDias[index];

        barra.addEventListener(
            "click",
            function () {

                mostrarDia(
                    nomesDias[index],
                    valor
                );

            }
        );

        barras.appendChild(barra);


        const dia =
            document.createElement("button");

        dia.className = "dia";

        dia.textContent =
            nomesDias[index];

        dia.addEventListener(
            "click",
            function () {

                mostrarDia(
                    nomesDias[index],
                    valor
                );

            }
        );

        dias.appendChild(dia);

    });


    const valoresY = [
        maior,
        Math.round(maior * .75),
        Math.round(maior * .5),
        Math.round(maior * .25),
        0
    ];

    document
        .querySelectorAll(".grafico-y span")
        .forEach((span, index) => {

            span.textContent =
                valoresY[index];

        });

}


/* =========================================================
   DETALHE DO DIA
   ========================================================= */

function mostrarDia(dia, quantidade) {

    const resultado =
        document.getElementById("resultadoDia");

    resultado.innerHTML = `

        <div class="resultado-vazio">

            <strong>
                ${dia}
            </strong>

            <span>
                Foram movimentados
                <strong>${quantidade}</strong>
                alimentos neste dia.
            </span>

        </div>

    `;

}


/* =========================================================
   TOP PRODUTOS
   ========================================================= */

function carregarTopProdutos() {

    const lista =
        document.getElementById("topProdutos");

    if (!lista) return;

    lista.innerHTML = "";

    const produtos =
        [...dados.alimentos]
            .sort(
                (a, b) =>
                    b.quantidade - a.quantidade
            );


    produtos.forEach((produto, index) => {

        const percentual =
            Math.min(
                100,
                (produto.quantidade / 100) * 100
            );

        lista.innerHTML += `

            <div
                class="produto-item"
                onclick="abrirProduto(${produto.id})"
            >

                <div class="produto-item-topo">

                    <strong>
                        ${index + 1}. ${produto.nome}
                    </strong>

                    <span>
                        ${produto.quantidade} unidades
                    </span>

                </div>

                <div class="produto-progresso">

                    <span
                        style="width:${percentual}%"
                    ></span>

                </div>

            </div>

        `;

    });

}


/* =========================================================
   MODAL PRODUTO
   ========================================================= */

function abrirProduto(id) {

    const produto =
        dados.alimentos.find(
            item => item.id === id
        );

    if (!produto) return;

    const modal =
        document.getElementById("modalProduto");

    const detalhes =
        document.getElementById("detalhesProduto");

    detalhes.innerHTML = `

        <div class="detalhe-header">

            <h2>
                ${produto.nome}
            </h2>

            <p>
                Informações do alimento
            </p>

        </div>

        <div class="detalhe-grid">

            <div class="detalhe-item">
                <span>Categoria</span>
                <strong>${produto.categoria}</strong>
            </div>

            <div class="detalhe-item">
                <span>Quantidade</span>
                <strong>${produto.quantidade}</strong>
            </div>

            <div class="detalhe-item">
                <span>Validade</span>
                <strong>${produto.validade}</strong>
            </div>

        </div>

    `;

    modal.classList.add("aberto");

}


document
    .getElementById("fecharModal")
    ?.addEventListener(
        "click",
        function () {

            document
                .getElementById("modalProduto")
                .classList.remove("aberto");

        }
    );


/* =========================================================
   ALERTAS DE VALIDADE
   ========================================================= */

function carregarAlertasValidade() {

    const container =
        document.getElementById("alertasValidade");

    if (!container) return;

    container.innerHTML = "";

    dados.alimentos.forEach(alimento => {

        container.innerHTML += `

            <div class="alerta">

                <strong>
                    ${alimento.nome}
                </strong>

                <span>
                    Validade:
                    ${alimento.validade}
                </span>

            </div>

        `;

    });

}


/* =========================================================
   RESUMO APROVAÇÕES
   ========================================================= */

function atualizarResumoAprovacoes() {

    const container =
        document.getElementById("resumoAprovacoes");

    if (!container) return;

    const pendentes =
        dados.empresas.filter(
            empresa =>
                empresa.status === "Pendente"
        ).length;

    const aprovadas =
        dados.empresas.filter(
            empresa =>
                empresa.status === "Aprovada"
        ).length;

    container.innerHTML = `

        <div class="resumo-item">

            <span>
                Pedidos pendentes
            </span>

            <strong>
                ${pendentes}
            </strong>

        </div>

        <div class="resumo-item">

            <span>
                Empresas aprovadas
            </span>

            <strong>
                ${aprovadas}
            </strong>

        </div>

    `;

}


/* =========================================================
   SUPORTE
   ========================================================= */

function carregarSuporte() {

    const lista =
        document.getElementById("listaDenuncias");

    if (!lista) return;

    lista.innerHTML = "";

    if (dados.denuncias.length === 0) {

        lista.innerHTML = `

            <div class="painel">

                <strong>
                    Nenhuma denúncia pendente.
                </strong>

                <p>
                    O suporte está em dia.
                </p>

            </div>

        `;

        return;

    }


    dados.denuncias.forEach(denuncia => {

        lista.innerHTML += `

            <div class="denuncia">

                <div>

                    <h3>
                        ${denuncia.titulo}
                    </h3>

                    <p>
                        ${denuncia.descricao}
                    </p>

                </div>

                <button
                    class="botao principal"
                    onclick="resolverDenuncia(${denuncia.id})"
                >
                    Resolver
                </button>

            </div>

        `;

    });

}


function resolverDenuncia(id) {

    dados.denuncias =
        dados.denuncias.filter(
            denuncia =>
                denuncia.id !== id
        );

    salvarDados();

    carregarSuporte();

    atualizarResumoSuporte();

}


function atualizarResumoSuporte() {

    const resumo =
        document.getElementById("resumoSuporte");

    if (!resumo) return;

    resumo.innerHTML = `

        <div class="resumo-item">

            <span>
                Denúncias pendentes
            </span>

            <strong>
                ${dados.denuncias.length}
            </strong>

        </div>

    `;

}


/* =========================================================
   AUDITORIA
   ========================================================= */

function carregarAuditoria() {

    const tabela =
        document.getElementById("tabelaAuditoria");

    if (!tabela) return;

    tabela.innerHTML = "";

    dados.auditoria.forEach(item => {

        tabela.innerHTML += `

            <tr>

                <td>${item.data}</td>

                <td>${item.horario}</td>

                <td>${item.usuario}</td>

                <td>${item.produto}</td>

                <td>${item.acao}</td>

            </tr>

        `;

    });

}


/* =========================================================
   BOTÃO NOVO ALIMENTO
   ========================================================= */

document
    .getElementById("novoAlimento")
    ?.addEventListener(
        "click",
        function () {

            const nome =
                prompt("Nome do alimento:");

            if (!nome) return;

            const categoria =
                prompt(
                    "Categoria: Grãos, Laticínios, Hortifruti ou Bebidas"
                );

            if (!categoria) return;

            const quantidade =
                Number(
                    prompt("Quantidade:")
                );

            const validade =
                prompt("Validade:");

            dados.alimentos.push({

                id:
                    Date.now(),

                nome:
                    nome,

                categoria:
                    categoria,

                quantidade:
                    quantidade || 0,

                validade:
                    validade || "Não informada"

            });

            salvarDados();

            carregarAlimentos();

            carregarTopProdutos();

            atualizarDashboard();

        }
    );


/* =========================================================
   SAIR
   ========================================================= */

document
    .getElementById("sair")
    ?.addEventListener(
        "click",
        function () {

            const confirmar =
                confirm(
                    "Deseja sair do painel administrativo?"
                );

            if (confirmar) {

                window.location.href =
                    "../login/login.html";

            }

        }
    );


/* =========================================================
   EXPORTAR CSV
   ========================================================= */

document
    .getElementById("exportarCSV")
    ?.addEventListener(
        "click",
        function () {

            let csv =
                "Alimento,Categoria,Quantidade,Validade\n";

            dados.alimentos.forEach(alimento => {

                csv +=
                    `"${alimento.nome}","${alimento.categoria}","${alimento.quantidade}","${alimento.validade}"\n`;

            });

            const blob =
                new Blob(
                    [csv],
                    {
                        type: "text/csv;charset=utf-8;"
                    }
                );

            const url =
                URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                "relatorio-realimenta.csv";

            link.click();

            URL.revokeObjectURL(url);

        }
    );


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

function iniciarPainel() {

    carregarAprovacoes();

    carregarUsuarios();

    carregarEmpresas();

    carregarAlimentos();

    carregarGrafico();

    carregarTopProdutos();

    carregarAlertasValidade();

    atualizarResumoAprovacoes();

    carregarSuporte();

    atualizarResumoSuporte();

    carregarAuditoria();

    atualizarDashboard();


// ===============================
// SAIR DO PAINEL ADMINISTRATIVO
// ===============================

function sairDoPainel() {
    // Remove a sessão do administrador
    sessionStorage.removeItem("adminLogado");
    localStorage.removeItem("adminLogado");

    // Volta para a tela de login
    window.location.href = "login.html";
}


// Botão Sair do menu lateral
const btnSair = document.getElementById("btnSair");

if (btnSair) {
    btnSair.addEventListener("click", function () {
        sairDoPainel();
    });
}


// Perfil do administrador no canto superior direito
const perfilAdministrador = document.getElementById("perfilAdministrador");

if (perfilAdministrador) {
    perfilAdministrador.addEventListener("click", function () {
        sairDoPainel();
    });
}





}


iniciarPainel();