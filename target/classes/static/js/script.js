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

    // ===== LOGIN =====
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
                    body: JSON.stringify(payload),
                });

                if (!res.ok) {
                    throw new Error("Erro no login");
                }

                const usuario = await res.json();

                localStorage.setItem('usuario', JSON.stringify(usuario));
                localStorage.setItem("perfil", usuario.perfil);
                localStorage.setItem("nome", usuario.nome);
                localStorage.setItem("email", usuario.email);
                localStorage.setItem("cpf", usuario.cpf);
                localStorage.setItem("telefone", usuario.telefone);
                localStorage.setItem("condominio", usuario.condominio || "");
                localStorage.setItem("apartamento", usuario.apartamento || "");
                localStorage.setItem("cargo", usuario.cargo || "");

                console.log("User Data:", usuario);
                console.log("Perfil:", usuario.perfil);

                if (usuario.perfil == "SINDICO" && !usuario.condominio) {
                    window.location.href = "/sindico/criar_condominio";
                } else if (usuario.perfil == "PROPRIETARIO" && !usuario.condominio || 
                           usuario.perfil == "INQUILINO" && !usuario.condominio || 
                           usuario.perfil == "FUNCIONARIO" && !usuario.condominio) {
                    window.location.href = "/aguardar_condominio";
                } else if (usuario.perfil == "SINDICO") {
                    window.location.href = "/sindico/dashboard-sindico";
                } else if (usuario.perfil == "PROPRIETARIO") {
                    window.location.href = "/proprietario/dashboard-proprietario";
                } else if (usuario.perfil == "INQUILINO") {
                    window.location.href = "/inquilino/dashboard-inquilino";
                } else if (usuario.perfil == "FUNCIONARIO") {
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
	                console.error("Erro na criação do condomínio:", res.status, errorText);
	                throw new Error("Erro ao criar condomínio");
	            }

	            const condominioCriado = await res.json();

	            const email = localStorage.getItem("email");
	            
	            const payload2 = {
	                idCondominio: condominioCriado.id
	            };

				const res2 = await fetch(`/api/usuarios/${email}`, {
				    method: "PATCH",
				    headers: { 
				        "Content-Type": "application/json",
				    },
				    credentials: 'include',
				    body: JSON.stringify(payload2),
				});

	            if (!res2.ok) {
	                const errorText = await res2.text();
	                console.error("Erro na atualização do usuário:", res2.status, errorText);
	            }

	            const usuarioAtualizado = await res2.json();
	            console.log("Usuário atualizado:", usuarioAtualizado);
	            
	            // Atualizar o localStorage com os novos dados
	            localStorage.setItem("condominio", condominioCriado.nomeCondominio);
	            
	            alert("Condomínio criado com sucesso!");
	            window.location.href = "/sindico/dashboard-sindico";
	            
	        } catch (error) {
	            console.error("Erro detalhado:", error);
	            alert(error.message || "Erro ao criar condomínio. Tente novamente.");
	        }
	    };
	}
    
    // ================= DASHBOARD =================
    const dashboardPage = document.getElementById("dashboard");
	const aguardarPage = document.getElementById("aguardar_condominio");
    if (dashboardPage || aguardarPage) {
        const nome = localStorage.getItem("nome");
        const nomeElement = document.getElementById('nomeDoUsuario');
		
        if (nomeElement) {
            nomeElement.innerText = nome;
        }
    }

// ================= PAINEL DE MORADORES (ADICIONAR MORADORES) =================
	const adicionarMoradorForm = document.getElementById("adicionarMoradorForm");
	if (adicionarMoradorForm) {
	    adicionarMoradorForm.onsubmit = async (e) => {
	        e.preventDefault();
	
	        try {
				const usuarioString = localStorage.getItem("usuario");
				const emailMorador = document.getElementById("emailMorador").value;
				const apartamento = document.getElementById("apartamentoMorador").value;
				const usuario = JSON.parse(usuarioString);
				const idCondominio = usuario.condominio.id;

				const payload = {
		    	    idCondominio: idCondominio,
					apartamento: apartamento
				};
				
				const res = await fetch(`/api/usuarios/${emailMorador}`, {
				    method: "PATCH",
				    headers: { 
				        "Content-Type": "application/json",
				    },
				    credentials: 'include',
				    body: JSON.stringify(payload),
				});
	            if (!res.ok) {
	                const errorText = await res.text();
	                console.error("Erro na adição do morador:", res.status, errorText);
	            } else {
				carregarMoradores(); // Atualiza a lista de moradores após a adição
	        	}
			} catch (error) {
	            alert(error.message || "Erro ao adicionar morador. Tente novamente.");
	        }
	    };
	}

// ================= PAINEL DE FUNCIONÁRIOS (ADICIONAR FUNCIONÁRIOS) =================
	const adicionarFuncionarioForm = document.getElementById("adicionarFuncionarioForm");
	if (adicionarFuncionarioForm) {
	    adicionarFuncionarioForm.onsubmit = async (e) => {
	        e.preventDefault();
	
	        try {
				const usuarioString = localStorage.getItem("usuario");
				const emailFuncionario = document.getElementById("emailMorador").value;
				const cargo = document.getElementById("cargoFuncionario").value;
				const usuario = JSON.parse(usuarioString);
				const idCondominio = usuario.condominio.id;

				const payload = {
		    	    idCondominio: idCondominio,
					cargo: cargo
				};
				
				const res = await fetch(`/api/usuarios/${emailFuncionario}`, {
				    method: "PATCH",
				    headers: { 
				        "Content-Type": "application/json",
				    },
				    credentials: 'include',
				    body: JSON.stringify(payload),
				});
	            if (!res.ok) {
	                const errorText = await res.text();
	                console.error("Erro na adição do funcionário:", res.status, errorText);
	            } else {
				carregarFuncionarios(); // Atualiza a lista de moradores após a adição
	        	}
			} catch (error) {
	            alert(error.message || "Erro ao adicionar funcionário. Tente novamente.");
	        }
	    };
	}
});

// ================= PAINEL DE MORADORES (CARREGAR MORADORES) =================
async function carregarMoradores() {
    try {
        const response = await fetch('/api/moradores/condominio', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar moradores');
        }

        const moradores = await response.json();
        const tabelaBody = document.querySelector('#tabela tbody');
        
        if (tabelaBody) {
            tabelaBody.innerHTML = '';
            
            moradores.forEach(morador => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${morador.nome}</td>
                    <td>${morador.apartamento || 'Não definido'}</td>
					<td>${morador.email}</td>
					<td>${morador.perfil}</td>
					<td>${morador.cargo || 'N/A'}</td>
                `;
                tabelaBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar moradores:', error);
    }
}

// Chama esta função quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('painel_de_moradores')) {
        carregarMoradores();
    }
});



// ================= PAINEL DE FUNCIONÁRIOS (CARREGAR FUNCIONÁRIOS) =================
async function carregarFuncionarios() {
    try {
        const response = await fetch('/api/funcionarios/condominio', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar funcionários');
        }

        const funcionarios = await response.json();
        const tabelaBody = document.querySelector('#tabela tbody');
        
        if (tabelaBody) {
            tabelaBody.innerHTML = '';
            
            funcionarios.forEach(funcionario => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${funcionario.nome}</td>
                    <td>${funcionario.cargo || 'Não definido'}</td>
					<td>${funcionario.email}</td>
                `;
                tabelaBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar funcionários:', error);
    }
}

// Chama esta função quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('painel_de_moradores')) {
        carregarMoradores();
    }
	
	if	(document.getElementById('painel_de_funcionarios')) {
	        carregarFuncionarios();
	    }
});

// ================= LOGOUT =================
async function logout() {
    const res = await fetch("/api/auth/logout", { 
        method: "POST",
        headers: { "Content-Type": "application/json" }
    });
	
    localStorage.clear();
    window.location.href = "/login";
}