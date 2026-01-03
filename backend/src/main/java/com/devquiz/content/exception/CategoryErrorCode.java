package com.devquiz.content.exception;

import com.devquiz.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CategoryErrorCode implements ErrorCode {
    CATEGORY_NOT_FOUND("카테고리를 찾을 수 없습니다.", "CATEGORY_001", 404);

    private final String message;
    private final String code;
    private final int status;
}