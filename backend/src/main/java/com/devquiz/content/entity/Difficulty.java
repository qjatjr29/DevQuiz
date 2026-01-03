package com.devquiz.content.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Difficulty {
    BEGINNER("초급"),
    INTERMEDIATE("중급"),
    ADVANCED("고급");

    private final String name;
}
