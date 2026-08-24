const loginForm = document.getElementById("loginForm");

const senha = document.getElementById("senha");

const mostrarSenha = document.getElementById("mostrarSenha");

const mensagem = document.getElementById("mensagem");


// MOSTRAR E ESCONDER SENHA

mostrarSenha.addEventListener("click", function () {

    if (senha.type === "password") {

        senha.type = "text";

        mostrarSenha.textContent = "🙈";

    } else {

        senha.type = "password";

        mostrarSenha.textContent = "👁";

    }

});


// LOGIN

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value;

    const senhaDigitada = senha.value;


    // DADOS PARA TESTE

    const emailCorreto = "admin@realimenta.com";

    const senhaCorreta = "123456";


    // VERIFICAR LOGIN

    if (
        email === emailCorreto &&
        senhaDigitada === senhaCorreta
    ) {

        mensagem.style.color = "#238636";

        mensagem.textContent =
            "Login realizado! Entrando no painel...";


        // DIRECIONAR PARA PAINEL.HTML

        setTimeout(function () {

            window.location.href = "admin.html";

        }, 1000);


    } else {

        mensagem.style.color = "#d32f2f";

        mensagem.textContent =
            "E-mail ou senha incorretos.";

    }

});