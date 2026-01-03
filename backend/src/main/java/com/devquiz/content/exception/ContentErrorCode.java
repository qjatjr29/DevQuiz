package com.devquiz.content.exception;

import com.devquiz.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ContentErrorCode implements ErrorCode {
    CONTENT_NOT_FOUND("콘텐츠를 찾을 수 없습니다.", "CONTENT_001", 404),
    CONTENT_ALREADY_EXISTS("이미 해당 날짜의 콘텐츠가 존재합니다.", "CONTENT_002", 409),
    CONTENT_NOT_PUBLISHED("게시되지 않은 콘텐츠입니다.", "CONTENT_003", 400);

    private final String message;
    private final String code;
    private final int status;
}
