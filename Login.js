const prompt = require("prompt-sync")();

function cadastro() {
    var usuario = window.document.getElementById("usuario").value;
    var senha = window.document.getElementById("senha").value;
    do {
        if (senha == usuario) {
            alert("Erro : a senha não pode ser igual ao nome de usuário. tente novamente!");
            return;
        }
        if (senha.length < 8) {
            alert("Erro : a senha deve ter no mínimo 8 caracteres. tente novamente!");
            return;
        }
    } while (senha.length < 8)
    alert("Cadastro realizado com sucesso!");
}

