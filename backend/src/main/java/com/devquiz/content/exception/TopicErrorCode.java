package com.devquiz.content.exception;

import com.devquiz.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TopicErrorCode implements ErrorCode {
    TOPIC_NOT_FOUND("토픽을 찾을 수 없습니다.", "TOPIC_001", 404),
    NO_AVAILABLE_TOPIC("사용 가능한 토픽이 없습니다.", "TOPIC_002", 404);

    private final String message;
    private final String code;
    private final int status;
}