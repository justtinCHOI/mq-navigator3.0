package com.unitekndt.mqnavigator.dto;

import java.util.List;

public class IMember {
    private Long id;
    private String email;
    private String name;
    private String nickname;
    private String password;
    private List<IWorkspace> workspaces;
}
