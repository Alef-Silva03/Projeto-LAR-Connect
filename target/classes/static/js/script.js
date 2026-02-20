document.addEventListener("DOMContentLoaded", () => {

	// ===== DETECTAR QUAL PÁGINA ESTÁ ABERTA =====
	const loginForm = document.getElementById("loginForm");
	const cadastroForm = document.getElementById("cadastroForm");
	const dashboardPage = document.getElementById("dashboardPage");

	// ================= LOGIN =================
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
					throw new Error();
				} else {
					const usuario = await res.json();
					localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

					localStorage.setItem("perfil", usuario.perfil);
					localStorage.setItem("nome", usuario.nome);
					localStorage.setItem("email", usuario.email);
					localStorage.setItem("cpf", usuario.cpf);
					localStorage.setItem("telefone", usuario.telefone);
					localStorage.setItem("condominio", usuario.condominio);

					const perfil = usuario.perfil;
					const nome = usuario.nome;
					const email = usuario.email;
					const cpf = usuario.cpf;

					if (usuario.condominio == null) {
						window.location.href = "/chat";
					} else {
						const usuario = await res.json();
						localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

						localStorage.setItem("perfil", usuario.perfil);
						localStorage.setItem("nome", usuario.nome);
						localStorage.setItem("email", usuario.email);
						localStorage.setItem("cpf", usuario.cpf);
						localStorage.setItem("telefone", usuario.telefone);
						localStorage.setItem("condominio", usuario.condominio);

						const perfil = usuario.perfil;
						const nome = usuario.nome;
						const email = usuario.email;
						const cpf = usuario.cpf;

						if (usuario.condominio == null) {
							window.location.href = "/chat";
						} else {
							window.location.href = "/cadastro";
						}

						console.log("User Data:");
						console.log("Perfil:", perfil);
						console.log("Nome:", nome);
						console.log("Email:", email);
						console.log("CPF:", cpf);
					}
			} 
			}		catch {
						alert("Login inválido");
		}
		}
	}

	
	// ================= CADASTRO =================
	
	// Função para esconder o campo Apartamento caso queira simplificar o cadastro de FUNCIONARIO
	
	// Máscara para CPF
	const aplicarMascaraCPF = (value) => {
	    return value
	        .replace(/\D/g, '') 
	        .replace(/(\d{3})(\d)/, '$1.$2')
	        .replace(/(\d{3})(\d)/, '$1.$2')
	        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
	        .replace(/(-\d{2})\d+?$/, '$1');
	};

	// Ouvintes de eventos para os campos
	document.addEventListener('DOMContentLoaded', () => {
	    const cpfInput = document.querySelector('input[name="cpf"]');

	    if (cpfInput) {
	        cpfInput.addEventListener('input', (e) => {
	            e.target.value = aplicarMascaraCPF(e.target.value);
	        });
	    }
	
	});

	// ================= DASHBOARD =================
	if (dashboardPage) {

		const PERFIL = localStorage.getItem("perfil");
		const NOME = localStorage.getItem("nomeUsuario");

		if (!PERFIL) {
			window.location.href = "login.html";
			return;
		}

		configurarInterface(PERFIL, NOME);
		carregarDadosServidor();
	}

	document.getElementById('nomeDoUsuario').innerText = NOME;
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