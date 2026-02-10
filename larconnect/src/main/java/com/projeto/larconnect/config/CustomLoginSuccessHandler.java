// Este arquivo diz para que página o usuário será redirecionado após fazer login.

package com.projeto.larconnect.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Set;

@Component
public class CustomLoginSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        
        Set<String> roles = AuthorityUtils.authorityListToSet(authentication.getAuthorities());

        if (roles.contains("SINDICO")) {
            response.sendRedirect("/sindico/dashboard-sindico");
        } else if (roles.contains("PROPRIETARIO")) {
            response.sendRedirect("/proprietario/dashboard-proprietario");
        } else if (roles.contains("FUNCIONARIO")) {
            response.sendRedirect("/funcionario/dashboard-funcionario");
        } else if (roles.contains("INQUILINO")) {
            response.sendRedirect("/inquilino/dashboard-inquilino");
        } else {
            response.sendRedirect("/login");
        }
    }
}