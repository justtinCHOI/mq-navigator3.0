package com.unitekndt.mqnavigator.security.filter;

import com.google.gson.Gson;
import com.unitekndt.mqnavigator.security.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import com.unitekndt.mqnavigator.util.JWTUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

//@Component
@Log4j2
//public class JWTCheckFilter extends OncePerRequestFilter {
public class JWTCheckFilter {

//    private final CustomUserDetailsService userDetailsService;
//
//    @Autowired
//    public JWTCheckFilter(CustomUserDetailsService userDetailsService) {
//        this.userDetailsService = userDetailsService;
//    }
//
//    @Override
//    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
//        String path = request.getRequestURI();
//
//        return path.startsWith("/api/member/signup") || path.startsWith("/api/member/login") || path.startsWith("/api/member/refresh") || request.getMethod().equals("OPTIONS");
//    }
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//
//        String authHeaderStr = request.getHeader("Authorization");
//
//        if (authHeaderStr == null || !authHeaderStr.startsWith("Bearer ")) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        try {
//            String accessToken = authHeaderStr.substring(7); // 7개 문자 잘라내기
//            Map<String, Object> claims = JWTUtil.validateToken(accessToken); //유효한지 검사
//
//            String email = (String) claims.get("email");
//
//            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
//            UsernamePasswordAuthenticationToken authenticationToken =
//                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//
//            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//
//            filterChain.doFilter(request, response);
//
//        } catch (Exception e) {
////            log.error("JWT Check Error..............");
////            log.error(e.getMessage());
////
////            Gson gson = new Gson();
////            String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));
////
////            response.setContentType("application/json");
////            PrintWriter printWriter = response.getWriter();
////            printWriter.println(msg);
////            printWriter.close();
//            handleException(response, e.getMessage());
//        }
//    }
//
//    private void handleException(HttpServletResponse response, String errorMsg) throws IOException {
//        log.error("JWT Check Error: {}", errorMsg);
//
//        Gson gson = new Gson();
//        String msg = gson.toJson(Map.of("error", errorMsg));
//
//        response.setContentType("application/json");
//        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);  // 401 Unauthorized
//        PrintWriter printWriter = response.getWriter();
//        printWriter.println(msg);
//        printWriter.close();
//    }
}
