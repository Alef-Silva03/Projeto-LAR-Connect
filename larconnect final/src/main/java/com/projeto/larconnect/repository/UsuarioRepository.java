//Este arquivo busca e armazena dados do usuário salvos no banco de dados com base no e-mail informado na página de login. Isso será usado pelo Service para checar se os dados informados na página de login estão corretos.

package com.projeto.larconnect.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.projeto.larconnect.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {		//Cria a classe UsuarioRepository, que herda métodos da classe JpaRepository, como findByEmail.

	Optional<Usuario> findByEmailIgnoreCase(String email);						//Busca o e-mail informado no banco de dados. Se encontrar, o valor desse atributo é o email encontrado.

	Optional<Usuario> findByResetToken(String resetToken);						//Busca o token informado pelo usuário. Se encontrar, o valor desse atributo é o email encontrado.

	boolean existsByEmailIgnoreCase(String email);								//Se o e-mail informado não for encontrado no banco de dados, esse atributo assume o valor False para informar que o e-mail informado no login está incorreto.

}
