package com.unitekndt.mqnavigator.controller;

import com.unitekndt.mqnavigator.dto.IUser;
import com.unitekndt.mqnavigator.entity.User;
import com.unitekndt.mqnavigator.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // 현재 로그인된 사용자 정보 조회
    @GetMapping("/users")
    public ResponseEntity<Object> getCurrentUser(@AuthenticationPrincipal User currentUser) {
        // 사용자가 로그인되어 있으면 사용자 정보를 반환하고, 그렇지 않으면 false 반환
        if (currentUser != null) {
            return ResponseEntity.ok(new IUser(currentUser.getId(), currentUser.getNickname(), currentUser.getEmail(), new ArrayList<>()));
        } else {
            return ResponseEntity.ok(false);
        }
    }



//    @PostMapping
//    public ResponseEntity<User> createUser(@RequestBody User user) {
//        User newUser = userService.createUser(user);
//        return ResponseEntity.ok(newUser);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<User> getUserById(@PathVariable Long id) {
//        Optional<User> user = userService.getUserById(id);
//        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//    }
//
//    @GetMapping("/email")
//    public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
//        Optional<User> user = userService.getUserByEmail(email);
//        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//    }
//
//    @GetMapping
//    public ResponseEntity<List<User>> getAllUsers() {
//        List<User> users = userService.getAllUsers();
//        return ResponseEntity.ok(users);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
//        userService.deleteUser(id);
//        return ResponseEntity.noContent().build();
//    }
}
