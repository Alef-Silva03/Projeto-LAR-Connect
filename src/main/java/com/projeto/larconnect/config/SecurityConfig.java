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
                .ignoringRequestMatchers("/h2-console/**", "/usuarios/salvar", "/api/auth/**")
            )
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/css/**", "/js/**", "/img/**", "/webjars/**").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/", "/login", "/cadastro", "/usuarios/salvar", "/nova_senha", "/minha_conta").permitAll()
                // Usando hasRole (que já espera o prefixo ROLE_)
                .requestMatchers("/proprietario/**").hasRole("PROPRIETARIO")
                .requestMatchers("/sindico/**").hasRole("SINDICO")
                .requestMatchers("/inquilino/**").hasRole("INQUILINO")
                .requestMatchers("/funcionario/**").hasRole("FUNCIONARIO")
                .anyRequest().authenticated()
            )
            .exceptionHandling(exception -> exception
                .accessDeniedHandler((request, response, accessDeniedException) -> {
                    logger.error("Acesso negado: {}", accessDeniedException.getMessage());
                    response.sendRedirect("/login?error=acesso-negado");
                })
                .authenticationEntryPoint((request, response, authException) -> {
                    logger.error("Erro de autenticação: {}", authException.getMessage());
                    response.sendRedirect("/login?error=nao-autenticado");
                })
            )
            
            // Trocamos o sistema de formulário de login por uma API REST, então o código abaixo não é mais necessário e causaria conflito
            /*
            .formLogin(form -> form
                .loginPage("/login")
                .usernameParameter("username")
                .passwordParameter("password")
                .successHandler(successHandler)
                .failureUrl("/login?error=true")
                .permitAll()
            )
            */
            
            .logout(logout -> logout
                    .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                    .logoutSuccessUrl("/login?logout=true")
                    .deleteCookies("JSESSIONID")
                    .invalidateHttpSession(true)
                    .clearAuthentication(true)
                    .permitAll()
                )
                .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()));
            
            return http.build();
        }
    }