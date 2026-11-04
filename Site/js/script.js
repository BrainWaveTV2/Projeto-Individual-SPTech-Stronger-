let usuarioLogado = JSON.parse(sessionStorage.getItem("USUARIO")); // guarda quem está logado (vem da sessão)
let novo = {};            // guarda a parte 1 do cadastro

// Treino
// 0 = domingo, 1 = segunda, 2 = terça,... 6 = sábado
let levantamentoDoDia = ["", "agachamento", "supino", "", "overhead", "deadlift", ""];

let semanas = [
    { nome: "3x5", aquec: [50, 60, 70], trab: [65, 75, 85], min: 5, amrap: true },
    { nome: "3x3", aquec: [50, 60, 70], trab: [70, 80, 90], min: 3, amrap: true },
    { nome: "3x5/3/1", aquec: [50, 60, 70], trab: [75, 85, 95], min: 1, amrap: true },
    { nome: "5x5", aquec: [50, 60, 70], trab: [40, 50, 60], min: 5, amrap: false }
];

let assistencia = {
    overhead: {
        "Big and dumb": ["Overhead", "Barra fixa", "Hanging Leg Raises"],
        "Big Muscle": ["Overhead com Halteres", "Elevação lateral", "Rosca com Barra", "Rosca Scott"]
    },
    supino: {
        "Big and dumb": ["Supino", "Supino com Halter"],
        "Big Muscle": ["Dips (se possível com peso)", "DB Flyes", "Tríceps Pushdown", "Flexões (o máximo que conseguir)"]
    },
    agachamento: {
        "Big and dumb": ["Agachamento", "Leg Curl"],
        "Big Muscle": ["Leg Press", "Leg Curl", "Leg Extensions", "Toes to Bar"]
    },
    deadlift: {
        "Big and dumb": ["DeadLift", "Hanging Leg Raises"],
        "Big Muscle": ["Remada Curvada", "Abdominal", "Barra Fixa (se possível com peso)", "Hanging Leg Raises"]
    }
};

// termos de academia
let termos = [
    { nome: "1RM", nivel: "todos", home: true, texto: "Uma repetição máxima: a maior carga que você levanta uma única vez com boa técnica. As cargas do treino são porcentagens dele." },
    { nome: "AMRAP", nivel: "todos", home: true, texto: "As Many Reps As Possible. Na última série você faz o máximo de repetições que conseguir, sempre com no mínimo o número indicado." },
    { nome: "5/3/1", nivel: "todos", home: true, texto: "Método de força em ciclos de 4 semanas: 3x5, 3x3, 3x5/3/1 e 5x5 (semana de recuperação)." },
    { nome: "Assistência", nivel: "todos", home: true, texto: "Exercícios extras feitos depois do levantamento principal, para ganhar volume e fortalecer os músculos de apoio." },
    { nome: "Big and dumb", nivel: "todos", home: false, texto: "Assistência 5x10: o levantamento principal com 50% do 1RM e um exercício complementar. Evolui junto com o levantamento." },
    { nome: "Big Muscle", nivel: "todos", home: false, texto: "Assistência 3x8-10-12: ao fazer 3 séries de 8 você passa para 10; ao chegar em 3 séries de 12, aumenta a carga e recomeça em 8." },
    { nome: "Ciclo", nivel: "todos", home: false, texto: "Bloco de 4 semanas. Ao terminar, a carga sobe: +2,5 kg nos levantamentos superiores e +5 kg nos inferiores." },
    { nome: "Relação de força", nivel: "todos", home: false, texto: "O seu 1RM dividido pelo seu peso corporal. Mostra quantas vezes o seu peso você levanta." },
    { nome: "Aquecimento", nivel: "iniciante", home: false, texto: "Séries leves (50%, 60% e 70% do 1RM) feitas antes das séries de trabalho, para preparar o corpo." },
    { nome: "Série e repetição", nivel: "iniciante", home: false, texto: "Repetição é cada vez que você levanta o peso. Série é um conjunto de repetições. Exemplo: 3x5 = 3 séries de 5 repetições." },
    { nome: "Série de trabalho", nivel: "iniciante", home: false, texto: "As séries principais do treino, com as cargas mais pesadas. Descanse de 3 a 5 minutos entre elas." },
    { nome: "Overhead", nivel: "iniciante", home: false, texto: "Desenvolvimento: empurrar a barra do ombro até acima da cabeça." },
    { nome: "Deadlift", nivel: "iniciante", home: false, texto: "Levantamento terra: tirar a barra do chão até ficar em pé." }
];

// menu superior
function montarMenu() {
    if (usuarioLogado != null) {
        menu_visitante.style.display = "none";
        menu_sistema.style.display = "flex";
        menu_usuario.style.display = "flex";
        exibir_nome.innerHTML = "Olá, " + usuarioLogado.nome;

        if (usuarioLogado.nivel == "Iniciante" || usuarioLogado.nivel == "Intermediário") {
            menu_termos.style.display = "block";
        }

        let cta = document.getElementById("cta"); // botões da home
        if (cta != null) {
            cta.style.display = "none";
        }
    }
}

// quem não está logado volta para o login
function protegerPagina() {
    if (usuarioLogado == null) {
        window.location = "login.html";
    }
}

// troca entre a parte 1 e a parte 2 do cadastro
function mostrar(tela) {
    tela_cadastro1.style.display = "none";
    tela_cadastro2.style.display = "none";

    document.getElementById(tela).style.display = "flex";
}

// cadastro
function cadastroParte1() {
    let nome = ipt_nome.value;
    let email = ipt_email.value;
    let senha = ipt_senha.value;
    let confirmar = ipt_confirmar.value;

    if (nome == "" || email == "" || senha == "" || confirmar == "") {
        exibir_cad1.innerHTML = "Preencha todos os campos.";
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        exibir_cad1.innerHTML = "Email inválido.";
        return;
    }

    if (senha.length < 6) {
        exibir_cad1.innerHTML = "A senha precisa ter no mínimo 6 caracteres.";
        return;
    }

    if (senha != confirmar) {
        exibir_cad1.innerHTML = "As senhas não são iguais.";
        return;
    }

    novo.nome = nome;
    novo.email = email;
    novo.senha = senha;

    exibir_cad1.innerHTML = "";
    mostrar("tela_cadastro2");
}

function cadastroParte2() {
    let agachamento = Number(ipt_agachamento.value);
    let supino = Number(ipt_supino.value);
    let overhead = Number(ipt_overhead.value);
    let deadlift = Number(ipt_deadlift.value);
    let peso = Number(ipt_peso.value);

    if (agachamento <= 0 || supino <= 0 || overhead <= 0 || deadlift <= 0 || peso <= 0) {
        exibir_cad2.innerHTML = "Preencha os 4 levantamentos e seu peso com valores maiores que 0.";
        return;
    }

    novo.modelo = ipt_modelo.value;
    novo.nivel = ipt_nivel.value;
    novo.unidade = ipt_unidade.value;
    novo.agachamento = agachamento;
    novo.supino = supino;
    novo.overhead = overhead;
    novo.deadlift = deadlift;
    novo.peso = peso;

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nomeServer: novo.nome,
            emailServer: novo.email,
            senhaServer: novo.senha,
            modeloServer: novo.modelo,
            nivelServer: novo.nivel,
            unidadeServer: novo.unidade,
            agachamentoServer: novo.agachamento,
            supinoServer: novo.supino,
            overheadServer: novo.overhead,
            deadliftServer: novo.deadlift,
            pesoServer: novo.peso
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            usuarioLogado = novo;
            novo = {};
            exibir_cad2.innerHTML = "";
            entrar();
        } else {
            exibir_cad2.innerHTML = "Não foi possível cadastrar. Este email já pode estar em uso.";
        }
    }).catch(function () {
        exibir_cad2.innerHTML = "Erro ao conectar com o servidor.";
    });
}

// login
function login() {
    let email = ipt_email_login.value;
    let senha = ipt_senha_login.value;

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            emailServer: email,
            senhaServer: senha
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (json) {
                usuarioLogado = json;
                exibir_login.innerHTML = "";
                entrar();
            });
        } else {
            exibir_login.innerHTML = "Email ou senha incorretos.";
        }
    }).catch(function () {
        exibir_login.innerHTML = "Erro ao conectar com o servidor.";
    });
}

function entrar() {
    sessionStorage.setItem("USUARIO", JSON.stringify(usuarioLogado));
    window.location = "treino.html";
}

function sair() {
    sessionStorage.clear();
    window.location = "stronger.html";
}

// funções que cada página chama ao abrir
function iniciarTreino() {
    protegerPagina();
    ipt_dia.value = new Date().getDay(); // já começa no dia de hoje
    mostrarTreino();
}

function iniciarCalculos() {
    protegerPagina();
    mostrarForca();
}

function iniciarAjustes() {
    protegerPagina();
    preencherAjustes();
}

function iniciarTermos() {
    protegerPagina();

    if (usuarioLogado != null) {
        let texto = "";

        for (let i = 0; i < termos.length; i++) {
            if (usuarioLogado.nivel == "Iniciante" || termos[i].nivel == "todos") {
                texto += "<div class='bloco'><b>" + termos[i].nome + "</b><br>" + termos[i].texto + "</div>";
            }
        }

        exibir_nivel.innerHTML = "Nível: " + usuarioLogado.nivel;
        exibir_termos.innerHTML = texto;
    }
}

function mostrarTermosHome() {
    let texto = "";

    for (let i = 0; i < termos.length; i++) {
        if (termos[i].home) {
            texto += "<p><b>" + termos[i].nome + ":</b> " + termos[i].texto + "</p>";
        }
    }

    exibir_termos_home.innerHTML = texto;
}

function textoTermo(nome) {
    for (let i = 0; i < termos.length; i++) {
        if (termos[i].nome == nome) {
            return termos[i].texto;
        }
    }
}

// treino de hoje
function arredondar(valor) {
    return Math.round(valor / 2.5) * 2.5;
}

// assistencia
function passoCarga() {
    if (usuarioLogado.unidade == "lb") {
        return 5;
    }
    return 2.5;
}

function chaveAssist(i) {
    let levantamento = levantamentoDoDia[ipt_dia.value];
    return levantamento + "-" + ipt_assist.value + "-" + assistencia[levantamento][ipt_assist.value][i];
}

function lerEstado(i) {
    let todos = JSON.parse(sessionStorage.getItem("ASSISTENCIA")) || {};
    let estado = todos[chaveAssist(i)];

    if (estado == undefined) {
        estado = { reps: 8, carga: 0 };

        if (ipt_assist.value == "Big and dumb") {
            estado.reps = 10;

            if (i == 0) {
                estado.carga = arredondar(usuarioLogado[levantamentoDoDia[ipt_dia.value]] * 0.5);
            }
        }
    }

    return estado;
}

function salvarEstado(i, estado) {
    let todos = JSON.parse(sessionStorage.getItem("ASSISTENCIA")) || {};
    todos[chaveAssist(i)] = estado;
    sessionStorage.setItem("ASSISTENCIA", JSON.stringify(todos));
}

function aumentarRepeticao(i) {
    let estado = lerEstado(i);

    if (ipt_assist.value == "Big and dumb") {
        estado.carga += passoCarga();
    } else if (estado.reps == 8) {
        estado.reps = 10;
    } else if (estado.reps == 10) {
        estado.reps = 12;
    } else {
        estado.reps = 8;
        estado.carga += passoCarga();
    }

    salvarEstado(i, estado);
    mostrarTreino();
}

function mudarCarga(i) {
    let estado = lerEstado(i);
    let carga = Number(document.getElementById("carga_" + i).value);

    if (carga < 0) {
        carga = 0;
    }

    estado.carga = carga;
    salvarEstado(i, estado);
    mostrarTreino();
}

function mostrarTreino() {
    let dia = ipt_dia.value;
    let levantamento = levantamentoDoDia[dia];
    let semana = semanas[ipt_semana.value - 1];
    let tipo = ipt_assist.value;
    let un = usuarioLogado.unidade;

    if (levantamento == "") {
        exibir_treino.innerHTML = "<div class='bloco'>Hoje é dia de descanso!</div>";
        return;
    }

    let umRM = usuarioLogado[levantamento];
    let texto = "<div class='bloco'><b>Levantamento principal: " + levantamento + " (" + semana.nome + ")</b><br>Cargas em % do 1RM*<br><br>";

    for (let i = 0; i < semana.aquec.length; i++) {
        texto += "Aquecimento* (" + semana.aquec[i] + "%): " + arredondar(umRM * semana.aquec[i] / 100) + " " + un + "<br>";
    }

    texto += "Descanso de 3 a 5 min<br>";

    for (let i = 0; i < semana.trab.length; i++) {
        texto += "Trabalho (" + semana.trab[i] + "%): " + arredondar(umRM * semana.trab[i] / 100) + " " + un;

        if (semana.amrap && i == 2) {
            texto += " - AMRAP* (no mínimo " + semana.min + ")";
        }

        texto += "<br>";

        if (i < 2) {
            texto += "Descanso de 3 a 5 min<br>";
        }
    }

    texto += "</div>";

    // assistencia
    let lista = assistencia[levantamento][tipo];
    texto += "<div class='bloco'><b>Assistência*: " + tipo + "*</b><br><br>";

    for (let i = 0; i < lista.length; i++) {
        if (lista[i].includes("máximo")) {
            texto += "<div class='exercicio'>3x " + lista[i] + "</div>";
            continue;
        }

        let estado = lerEstado(i);
        let series = "3x" + estado.reps;
        let textoBotao = "";
        let carga = estado.carga;

        if (carga == 0) {
            carga = "";
        }

        if (tipo == "Big and dumb") {
            series = "5x10";
            textoBotao = "Aumentar carga (+" + passoCarga() + " " + un + ")";
        } else if (estado.reps == 8) {
            textoBotao = "Subir para 10 repetições";
        } else if (estado.reps == 10) {
            textoBotao = "Subir para 12 repetições";
        } else {
            textoBotao = "Aumentar carga e voltar para 8";
        }

        texto += "<div class='exercicio'>" + series + " " + lista[i] + "<br>";
        texto += "Carga: <input id='carga_" + i + "' type='number' placeholder='0' value='" + carga + "' onchange='mudarCarga(" + i + ")'> " + un;
        texto += " <button onclick='aumentarRepeticao(" + i + ")'>" + textoBotao + "</button></div>";
    }

    texto += "</div>";

    // termos marcados com *
    let marcados = ["1RM", "Aquecimento", "Assistência", tipo];

    if (semana.amrap) {
        marcados.push("AMRAP");
    }

    texto += "<div class='nota'>";

    for (let i = 0; i < marcados.length; i++) {
        texto += "<p>* <b>" + marcados[i] + ":</b> " + textoTermo(marcados[i]) + "</p>";
    }

    texto += "</div>";

    exibir_treino.innerHTML = texto;
}

// calculos
function calcular1RM() {
    let carga = Number(ipt_carga.value);
    let reps = Number(ipt_reps.value);
    let un = usuarioLogado.unidade;

    if (carga <= 0 || reps <= 0) {
        exibir_1rm.innerHTML = "Digite a carga e as repetições.";
        return;
    }

    let umRM = carga * (1 + reps / 30); // Epley
    let texto = "<div class='bloco'><b>1RM estimado: " + umRM.toFixed(1) + " " + un + "</b><br><br>";

    for (let n = 1; n <= 10; n++) {
        let percentual = 100 / (1 + n / 30);
        let cargaN = umRM / (1 + n / 30);
        texto += n + "RM: " + cargaN.toFixed(1) + " " + un + " (" + percentual.toFixed(0) + "% do 1RM)<br>";
    }

    texto += "</div>";
    exibir_1rm.innerHTML = texto;
}

function mostrarForca() {
    let u = usuarioLogado;

    exibir_forca.innerHTML = "<div class='bloco'>" +
        "Agachamento: " + (u.agachamento / u.peso).toFixed(2) + "x seu peso<br>" +
        "Supino: " + (u.supino / u.peso).toFixed(2) + "x seu peso<br>" +
        "Overhead: " + (u.overhead / u.peso).toFixed(2) + "x seu peso<br>" +
        "Deadlift: " + (u.deadlift / u.peso).toFixed(2) + "x seu peso" +
        "</div>";
}

// ajuste de peso
function preencherAjustes() {
    ipt_novo_agachamento.value = usuarioLogado.agachamento;
    ipt_novo_supino.value = usuarioLogado.supino;
    ipt_novo_overhead.value = usuarioLogado.overhead;
    ipt_novo_deadlift.value = usuarioLogado.deadlift;
    exibir_ajustes.innerHTML = "";
}

function salvarAjustes() {
    let agachamento = Number(ipt_novo_agachamento.value);
    let supino = Number(ipt_novo_supino.value);
    let overhead = Number(ipt_novo_overhead.value);
    let deadlift = Number(ipt_novo_deadlift.value);

    if (agachamento <= 0 || supino <= 0 || overhead <= 0 || deadlift <= 0) {
        exibir_ajustes.innerHTML = "Os valores precisam ser maiores que 0.";
        return;
    }

    usuarioLogado.agachamento = agachamento;
    usuarioLogado.supino = supino;
    usuarioLogado.overhead = overhead;
    usuarioLogado.deadlift = deadlift;

    sessionStorage.setItem("USUARIO", JSON.stringify(usuarioLogado));
    exibir_ajustes.innerHTML = "Pesos salvos!";
}

function novoCiclo() {
    let superior = 2.5;
    let inferior = 5;

    if (usuarioLogado.unidade == "lb") {
        superior = 5;
        inferior = 10;
    }

    usuarioLogado.agachamento += inferior;
    usuarioLogado.deadlift += inferior;
    usuarioLogado.supino += superior;
    usuarioLogado.overhead += superior;

    sessionStorage.setItem("USUARIO", JSON.stringify(usuarioLogado));
    preencherAjustes();
    exibir_ajustes.innerHTML = "Ciclo finalizado! Cargas aumentadas.";
}

// Mostra o menu em todas as paginas
montarMenu();
