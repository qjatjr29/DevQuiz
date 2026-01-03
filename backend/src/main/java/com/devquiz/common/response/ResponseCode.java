package com.devquiz.common.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ResponseCode {

    SUCCESS("SUCCESS", 200, "요청이 성공적으로 처리되었습니다.");

    private final String code;
    private final int statusCode;
    private final String message;
}