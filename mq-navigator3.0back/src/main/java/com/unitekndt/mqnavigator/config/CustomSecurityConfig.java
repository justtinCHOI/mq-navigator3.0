package com.unitekndt.mqnavigator.config;

import com.unitekndt.mqnavigator.security.CustomUserDetailsService;
import com.unitekndt.mqnavigator.security.filter.JWTCheckFilter;
import com.unitekndt.mqnavigator.security.handler.APILoginFailHandler;
import com.unitekndt.mqnavigator.security.handler.APILoginSuccessHandler;
import com.unitekndt.mqnavigator.security.handler.CustomAccessDeniedHandler;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@Log4j2
@EnableMethodSecurity
public class CustomSecurityConfig {
//
//    private final CustomUserDetailsService userDetailsService;
//
//    public CustomSecurityConfig(CustomUserDetailsService userDetailsService) {
//        this.userDetailsService = userDetailsService;
//    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

//    @Bean
//    public JWTCheckFilter jwtCheckFilter() {
//        return new JWTCheckFilter(userDetailsService);
//    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable);
        http.cors(httpSecurityCorsConfigurer -> {
            httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource());
        });
        http.sessionManagement(httpSecuritySessionManagementConfigurer ->
        {
            httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.NEVER);
        });

        http.formLogin(config -> {
            config.loginPage("/api/member/login"); // 로그인 할 곳
            config.successHandler(new APILoginSuccessHandler());
            config.failureHandler(new APILoginFailHandler());
        });
//        http.addFilterBefore(jwtCheckFilter(), UsernamePasswordAuthenticationFilter.class);
        http.exceptionHandling(config -> {
            config.accessDeniedHandler(new CustomAccessDeniedHandler());
        });
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(List.of("https://localhost:3090"));
//        configuration.setAllowedOriginPatterns(List.of("*")); // 모든 출처 허용
//        configuration.setAllowedOriginPatterns(List.of("http://프론트엔드_IP:포트")); // http 프론트엔드 주소만 허용
        configuration.setAllowedOriginPatterns(List.of("https://158.247.209.136")); // https 프론트엔드 주소만 허용
        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
