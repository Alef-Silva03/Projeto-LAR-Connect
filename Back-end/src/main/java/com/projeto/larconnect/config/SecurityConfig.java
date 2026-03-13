package com.projeto.larconnect.config;

import com.projeto.larconnect.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	private CustomUserDetailsService userDetailsService;

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
		return authConfig.getAuthenticationManager();
	}

	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userDetailsService);
		authProvider.setPasswordEncoder(passwordEncoder());
		return authProvider;
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOriginPatterns(
				Arrays.asList("http://localhost:*", "http://127.0.0.1:*", "http://0.0.0.0:*", "http://192.168.*:*",
						"http://10.*:*", "http://172.16.*:*", "http://172.17.*:*", "http://172.18.*:*",
						"http://172.19.*:*", "http://172.2*.*:*", "http://172.30.*:*", "http://172.31.*:*"));
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		configuration.setAllowCredentials(true); // essencial para enviar/receber cookies

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.authenticationProvider(authenticationProvider())
				// Desabilita CSRF completamente para APIs
				.csrf(csrf -> csrf.disable())
				// Usa a configuração CORS unificada
				.cors(cors -> cors.configurationSource(corsConfigurationSource()))

				.authorizeHttpRequests(auth -> auth
						// Rotas públicas
						.requestMatchers("/api/auth/**").permitAll().requestMatchers("/api/**").permitAll()
						.requestMatchers("/usuarios/salvar").permitAll()
						.requestMatchers("/css/**", "/js/**", "/img/**", "/webjars/**").permitAll()
						.requestMatchers("/", "/login", "/cadastro", "/nova-senha", "/redefinir-senha",
								"/criar-condominio")
						.permitAll()

						// Rotas protegidas por perfil
						.requestMatchers("/sindico/**").hasRole("SINDICO").requestMatchers("/api/condominio/**")
						.hasRole("SINDICO").requestMatchers("/sindico/api/**").hasRole("SINDICO")
						.requestMatchers("/proprietario/**").hasRole("PROPRIETARIO").requestMatchers("/inquilino/**")
						.hasRole("INQUILINO").requestMatchers("/funcionario/**").hasRole("FUNCIONARIO")

						// Qualquer outra rota precisa de autenticação
						.anyRequest().authenticated())

				// Remove formLogin e httpBasic para API
				.formLogin(form -> form.disable()).httpBasic(basic -> basic.disable())

				// Configuração de sessão - importante para APIs
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED));

		return http.build();
	}
}