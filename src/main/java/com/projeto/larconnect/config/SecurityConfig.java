package com.projeto.larconnect.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CustomLoginSuccessHandler successHandler;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf
                .ignoringRequestMatchers("/h2-console/**", "/usuarios/salvar")
            )
            .authorizeHttpRequests(auth -> auth
                // 1. RECURSOS ESTÁTICOS
                .requestMatchers("/css/**", "/js/**", "/img/**", "/webjars/**").permitAll()

                // USUARIOS QUE NÃO SÃO PROPRIETÁRIOS SÃO PROIBIDOS EM PÁGINAS DE PROPRIETÁRIO
                // Usamos o acesso exclusivo para CLIENTE ou Usuário não logado
                .requestMatchers("/proprietario/**").hasAuthority("PROPRIETARIO") 
                
                // USUARIOS QUE NÃO SÃO SÍNDICOS SÃO PROIBIDOS EM PÁGINAS DE SÍNDICO
                .requestMatchers("/sindico/**").hasAuthority("SINDICO")
                
                // USUARIOS QUE NÃO SÃO INQUILINOS SÃO PROIBIDOS EM PÁGINAS DE INQUILINOS
                .requestMatchers("/inquilino/**").hasAuthority("INQUILINO")
                
                // USUARIOS QUE NÃO SÃO FUNCIONARIOS SÃO PROIBIDOS EM PÁGINAS DE FUNCIONARIOS
                .requestMatchers("/funcionario/**").hasAuthority("FUNCIONARIO")
                
                // 4. ROTAS PÚBLICAS (Apenas Login e Cadastro básico)
                .requestMatchers("/", "/login", "/cadastro", "/usuarios/salvar", "/nova_senha").permitAll()
                
                // 5. QUALQUER OUTRA ROTA (Exige estar logado)
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .usernameParameter("username")
                .passwordParameter("password")
                .successHandler(successHandler)
                .failureUrl("/login?error=true")
                .permitAll()
            )
            .logout(logout -> logout
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/login?logout=true") // Volta para o login após sair
                .deleteCookies("JSESSIONID")
                .invalidateHttpSession(true)
                .permitAll()
            )
            .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()));
        
        return http.build();
    }
}