document.addEventListener("DOMContentLoaded", () => {

    // ================= CADASTRO =================
    const cadastroForm = document.getElementById("cadastroForm");
    if (cadastroForm) {
        const aplicarMascaraCPF = (value) => {
            return value
                .replace(/\D/g, '') 
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})/, '$1-$2')
                .replace(/(-\d{2})\d+?$/, '$1');
        };

        const cpfInput = document.querySelector('input[name="cpf"]');
        if (cpfInput) {
            cpfInput.addEventListener('input', (e) => {
                e.target.value = aplicarMascaraCPF(e.target.value);
            });
        }
    }

    // ================= LOGIN =================
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.onsubmit = async (e) => {
            e.preventDefault();
            try {
                const payload = {
                    email: document.getElementById("email").value,
                    senha: document.getElementById("senha").value
                };

                const res = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(payload),
                });

                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(errorText);
                }

                const usuario = await res.json();

                // Salva dados no localStorage
                localStorage.setItem('usuario', JSON.stringify(usuario));
                localStorage.setItem("perfil", usuario.perfil);
                localStorage.setItem("nome", usuario.nome);
                localStorage.setItem("email", usuario.email);
                localStorage.setItem("cpf", usuario.cpf);
                localStorage.setItem("telefone", usuario.telefone);
                localStorage.setItem("condominio", usuario.condominio || "");
                localStorage.setItem("apartamento", usuario.apartamento || "");
                localStorage.setItem("cargo", usuario.cargo || "");

                // Redirecionamento por perfil
                if (usuario.perfil === "SINDICO" && !usuario.condominio) {
                    window.location.href = "/sindico/criar_condominio";
                } else if (["PROPRIETARIO", "INQUILINO", "FUNCIONARIO"].includes(usuario.perfil) && !usuario.condominio) {
                    window.location.href = "/aguardar_condominio";
                } else if (usuario.perfil === "SINDICO") {
                    window.location.href = "/sindico/dashboard-sindico";
                } else if (usuario.perfil === "PROPRIETARIO") {
                    window.location.href = "/proprietario/dashboard-proprietario";
                } else if (usuario.perfil === "INQUILINO") {
                    window.location.href = "/inquilino/dashboard-inquilino";
                } else if (usuario.perfil === "FUNCIONARIO") {
                    window.location.href = "/funcionario/dashboard-funcionario";
                } else {
                    window.location.href = "/login";
                }

            } catch (error) {
                console.error("Erro detalhado:", error);
                alert(error.message || "Erro ao fazer login. Tente novamente.");
            }
        };
    }

    // ================= CRIAR CONDOMÍNIO =================
    const condominioForm = document.getElementById("condominioForm");
    if (condominioForm) {
        condominioForm.onsubmit = async (e) => {
            e.preventDefault();
            try {
                const payload = {
                    nomeCondominio: document.getElementById("nomeCondominio").value,
                    cep: document.getElementById("cep").value,
                    pais: document.getElementById("pais").value,
                    estado: document.getElementById("estado").value,
                    cidade: document.getElementById("cidade").value,
                    logradouro: document.getElementById("logradouro").value,
                    numeroCondominio: parseInt(document.getElementById("numeroCondominio").value) || 0,
                    blocos: parseInt(document.getElementById("blocos").value) || 0,
                    apartamentos: parseInt(document.getElementById("apartamentos").value) || 0,
                };

                const res = await fetch("/sindico/api/condominio/create", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error("Erro ao criar condomínio: " + errorText);
                }

                const condominioCriado = await res.json();
                const email = localStorage.getItem("email");

                const payload2 = { idCondominio: condominioCriado.id };

                const res2 = await fetch(`/api/usuarios/${email}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include',
                    body: JSON.stringify(payload2),
                });

                if (!res2.ok) {
                    const errorText = await res2.text();
                    console.error("Erro na atualização do usuário:", errorText);
                }

                localStorage.setItem("condominio", condominioCriado.nomeCondominio);
                alert("Condomínio criado com sucesso!");
                window.location.href = "/sindico/dashboard-sindico";

            } catch (error) {
                console.error(error);
                alert(error.message || "Erro ao criar condomínio. Tente novamente.");
            }
        };
    }

    // ================= NOVA SENHA =================
    const novaSenhaForm = document.getElementById("novaSenhaForm");
    if (novaSenhaForm) {
        novaSenhaForm.addEventListener('submit', e => {
            const senha = document.getElementById('novaSenha').value;
            const confirmar = document.getElementById('confirmarSenha').value;

            if (senha !== confirmar) {
                e.preventDefault();
                alert("As senhas não coincidem!");
            }
        });

        // Preenche token do URL
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const tokenInput = document.querySelector("input[name='token']");
        if (tokenInput) tokenInput.value = token;
    }

    // ================= DASHBOARD =================
    const nomeElement = document.getElementById('nomeDoUsuario');
    if (nomeElement) {
        const nome = localStorage.getItem("nome");
        nomeElement.innerText = nome || "";
    }

    // ================= PAINEL DE MORADORES =================
    const adicionarMoradorForm = document.getElementById("adicionarMoradorForm");
    if (adicionarMoradorForm) {
        adicionarMoradorForm.onsubmit = async (e) => {
            e.preventDefault();
            try {
                const usuario = JSON.parse(localStorage.getItem("usuario"));
                const emailMorador = document.getElementById("emailMorador").value;
                const apartamento = document.getElementById("apartamentoMorador").value;

                const payload = {
                    idCondominio: usuario.condominio.id,
                    apartamento: apartamento
                };

                const res = await fetch(`/api/usuarios/${emailMorador}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include',
                    body: JSON.stringify(payload),
                });

                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(errorText);
                }

                carregarMoradores(); // Atualiza tabela
            } catch (error) {
                alert(error.message || "Erro ao adicionar morador.");
            }
        };
    }

    async function carregarMoradores() {
        try {
            const response = await fetch('/api/moradores/condominio', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            if (!response.ok) throw new Error("Erro ao carregar moradores");
            const moradores = await response.json();
            const tabelaBody = document.querySelector('#tabela tbody');
            if (tabelaBody) {
                tabelaBody.innerHTML = '';
                moradores.forEach(m => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${m.nome}</td>
                        <td>${m.apartamento || 'Não definido'}</td>
                        <td>${m.email}</td>
                        <td>${m.perfil}</td>
                        <td>${m.cargo || 'N/A'}</td>
                    `;
                    tabelaBody.appendChild(row);
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    // ================= PAINEL DE FUNCIONÁRIOS =================
    const adicionarFuncionarioForm = document.getElementById("adicionarFuncionarioForm");
    if (adicionarFuncionarioForm) {
        adicionarFuncionarioForm.onsubmit = async (e) => {
            e.preventDefault();
            try {
                const usuario = JSON.parse(localStorage.getItem("usuario"));
                const emailFuncionario = document.getElementById("emailFuncionario").value;
                const cargo = document.getElementById("cargoFuncionario").value;

                const payload = {
                    idCondominio: usuario.condominio.id,
                    cargo: cargo
                };

                const res = await fetch(`/api/usuarios/${emailFuncionario}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include',
                    body: JSON.stringify(payload),
                });

                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(errorText);
                }

                carregarFuncionarios();
            } catch (error) {
                alert(error.message || "Erro ao adicionar funcionário.");
            }
        };
    }

    async function carregarFuncionarios() {
        try {
            const response = await fetch('/api/funcionarios/condominio', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            if (!response.ok) throw new Error("Erro ao carregar funcionários");
            const funcionarios = await response.json();
            const tabelaBody = document.querySelector('#tabela tbody');
            if (tabelaBody) {
                tabelaBody.innerHTML = '';
                funcionarios.forEach(f => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${f.nome}</td>
                        <td>${f.cargo || 'Não definido'}</td>
                        <td>${f.email}</td>
                    `;
                    tabelaBody.appendChild(row);
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

}); // Fim DOMContentLoaded

// ================= LOGOUT =================
async function logout() {
    await fetch("/api/auth/logout", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    });
    localStorage.clear();
    window.location.href = "/login";
}