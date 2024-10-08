package com.unitekndt.mqnavigator.service;

import com.unitekndt.mqnavigator.dto.IUser;
import com.unitekndt.mqnavigator.dto.IUserWithOnline;
import com.unitekndt.mqnavigator.dto.IWorkspace;
import com.unitekndt.mqnavigator.entity.User;
import com.unitekndt.mqnavigator.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public IUser entityToDto(User user) {
        List<IWorkspace> workspaces = user.getWorkspaces().stream()
                .map(workspace -> new IWorkspace(
                        workspace.getId(),
                        workspace.getName(),
                        workspace.getUrl(),
                        workspace.getOwner().getId()
                )).collect(Collectors.toList());

        return new IUser(
                user.getId(),
                user.getNickname(),
                user.getEmail(),
                workspaces
        );
    }

    public IUserWithOnline entityToDtoWithOnline(User user, boolean online) {
        IUser basicUser = entityToDto(user);
        return new IUserWithOnline(
                basicUser.getId(),
                basicUser.getNickname(),
                basicUser.getEmail(),
                basicUser.getWorkspaces(),
                online
        );
    }

//    public User createUser(User user) {
//        return userRepository.save(user);
//    }
//
//    public Optional<User> getUserById(Long id) {
//        return userRepository.findById(id);
//    }
//
//    public Optional<User> getUserByEmail(String email) {
//        return userRepository.findByEmail(email);
//    }
//
//    public List<User> getAllUsers() {
//        return userRepository.findAll();
//    }
//
//    public void deleteUser(Long id) {
//        userRepository.deleteById(id);
//    }
}