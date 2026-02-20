document.addEventListener("DOMContentLoaded", () => {

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
			        body: JSON.stringify(payload)
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

				// Depois de salvar no localStorage
				console.log("User Data:", usuario);
				console.log("Perfil:", usuario.perfil);

	            if (usuario.perfil == "SINDICO" && !usuario.condominio) {
	                window.location.href = "/sindico/criar_condominio";
				} else if (usuario.perfil == "PROPRIETARIO" && !usuario.condominio || usuario.perfil == "INQUILINO" && !usuario.condominio || usuario.perfil == "FUNCIONARIO" && !usuario.condominio) {
					window.location.href = "/inserir_condominio"
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

	        }	catch (error) {
			    console.error("Erro detalhado:", error);
			    alert(error.message || "Erro ao fazer login. Tente novamente.");
			}
	    }
	}

	
	// ================= CADASTRO =================
	
	// Função para esconder o campo Apartamento caso queira simplificar o cadastro de FUNCIONARIO
	
	// Máscara para CPF
	const cadastroForm = document.getElementById("cadastroForm");
	if (cadastroForm){
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
	};

	// ================= DASHBOARD =================
	    const dashboardPage = document.getElementById("dashboard");
	    if (dashboardPage) {
	        const nome = localStorage.getItem("nome");
	        const perfil = localStorage.getItem("perfil");
	        
	        if (!nome || !perfil) {
	            window.location.href = "/login";
	            return;
	        }
	        
	        // Update the welcome message
	        const nomeElement = document.getElementById('nomeDoUsuario');
	        if (nomeElement) {
	            nomeElement.innerText = nome;
	        }
	    }
	});


// ================= INTERFACE =================
function configurarInterface(PERFIL, NOME) {

	const userName = document.getElementById("userName");
	if (userName) userName.textContent = NOME;

	if (PERFIL === "ADMIN") {
		document.querySelectorAll(".admin-only")
			.forEach(el => el.style.display = "block");

		const perfilLabel = document.getElementById("perfilLabel");
		if (perfilLabel)
			perfilLabel.innerHTML = '<span class="admin-badge">ADMINISTRADOR</span>';

	} else {
		const banner = document.getElementById("moradorBanner");
		if (banner) banner.style.display = "block";

		const perfilLabel = document.getElementById("perfilLabel");
		if (perfilLabel)
			perfilLabel.innerHTML = '<span class="client-badge">CLIENTE</span>';
	}
}


// ================= DADOS DO SERVIDOR =================
async function carregarDadosServidor() {
	try {

		const res = await fetch("/api/dashboard/perfil");

		if (res.status === 401 || res.status === 403) {
			window.location.href = "login.html";
			return;
		}

		if (!res.ok) throw new Error();

		const user = await res.json();

		setText("infoNome", user.nome);
		setText("infoEmail", user.email);
		setText("infoTelefone", user.telefone);
		setText("infoApartamento", user.apartamento);
		setText("infoPerfil", user.perfil);
		setText("infoID", user.id);

	} catch {
		console.error("Erro ao carregar dados");
	}
}

function setText(id, value) {
	const el = document.getElementById(id);
	if (el) el.textContent = value || "-";
}


// ================= LOGOUT =================
async function logout() {
	if (confirm("Deseja encerrar sua sessão segura?")) {
		await fetch("/api/auth/logout", { method: "POST" });
		localStorage.clear();
		window.location.href = "login.html";
	}
}


// ================= TOGGLE PERFIL =================
function toggleCampos() {
	console.log("Perfil alterado");
}