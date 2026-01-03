package com.devquiz.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CommonErrorCode implements ErrorCode {
    INTERNAL_SERVER_ERROR("서버 내부 오류가 발생했습니다.", "COMMON_001", 500),
    INVALID_INPUT_VALUE("잘못된 입력값입니다.", "COMMON_002", 400),
    METHOD_NOT_ALLOWED("허용되지 않은 HTTP 메서드입니다.", "COMMON_003", 405);

    private final String message;
    private final String code;
    private final int status;
}
