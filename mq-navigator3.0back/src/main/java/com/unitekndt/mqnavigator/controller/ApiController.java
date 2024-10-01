package com.unitekndt.mqnavigator.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/test")
    public ResponseEntity<String> testApi() {
        return ResponseEntity.ok("API 테스트 성공!");
    }

    // 여기서 Node.js에서 처리하던 각종 API를 구현합니다.
}