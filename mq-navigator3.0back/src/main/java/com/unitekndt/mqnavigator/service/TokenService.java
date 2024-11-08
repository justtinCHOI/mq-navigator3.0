package com.unitekndt.mqnavigator.service;

import com.unitekndt.mqnavigator.entity.Member;

public interface TokenService {
    Member getUserFromToken(String token);
}
