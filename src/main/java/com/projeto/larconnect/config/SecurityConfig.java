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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);

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
        authProvider.setHideUserNotFoundExceptions(false);
        return authProvider;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authenticationProvider(authenticationProvider())
            .csrf(csrf -> csrf
                .ignoringRequestMatchers("/h2-console/**", "/usuarios/salvar", "/api/auth/**", "/sindico/api/**", "/api/**")
            )
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/css/**", "/js/**", "/img/**", "/webjars/**").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/", "/login", "/cadastro", "/usuarios/salvar", "/nova_senha", "/minha_conta").permitAll()
                
                // PERMITIR ACESSO AOS ENDPOINTS DE USUÁRIO PARA USUÁRIOS AUTENTICADOS
                .requestMatchers("/api/usuarios/**").authenticated()
                
                // Usando hasRole (que já espera o prefixo ROLE_)
                .requestMatchers("/proprietario/**").hasRole("PROPRIETARIO")
                .requestMatchers("/sindico/**").hasRole("SINDICO")
                .requestMatchers("/api/condominio/**").hasRole("SINDICO")
                .requestMatchers("/sindico/api/**").hasRole("SINDICO")
                .requestMatchers("/inquilino/**").hasRole("INQUILINO")
                .requestMatchers("/funcionario/**").hasRole("FUNCIONARIO")
                .anyRequest().authenticated()
            )
            .exceptionHandling(exception -> exception
                .accessDeniedHandler((request, response, accessDeniedException) -> {
                    logger.error("Acesso negado: {}", accessDeniedException.getMessage());
                    response.sendError(HttpServletResponse.SC_FORBIDDEN, "Acesso negado: " + accessDeniedException.getMessage());
                })
            )
                .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()));
            
            return http.build();
        }
    }