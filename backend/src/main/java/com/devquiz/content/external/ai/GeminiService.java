package com.devquiz.content.external.ai;

import com.devquiz.config.properties.GeminiProperties;
import com.devquiz.content.dto.AIContentResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;
import tools.jackson.databind.ObjectMapper;

import java.net.URI;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class GeminiService {

    private final WebClient webClient;
    private final GeminiProperties geminiProperties;
    private final ObjectMapper objectMapper;

    public Mono<AIContentResponse> generateContent(String prompt) {
        log.info("Gemini API 호출 시작");

        return webClient.post()
                .uri(buildUri())
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(createRequestBody(prompt))
                .retrieve()
                .bodyToMono(GeminiResponse.class)
                .map(this::extractFromGeminiResponse)
                .map(this::parseAIResponse)
                .doOnError(e -> log.error("Gemini API 호출 중 오류 발생: {}", e.getMessage()));
    }

    private URI buildUri() {
        return UriComponentsBuilder.fromUriString(geminiProperties.getApiUrl())
                .queryParam("key", geminiProperties.getApiKey())
                .build()
                .toUri();
    }

    // Gemini 규칙
    private Map<String, Object> createRequestBody(String prompt) {
        return Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(Map.of("text", prompt)))
                ),
                "generationConfig", Map.of(
                        "response_mime_type", "application/json"
                )
        );
    }

    private String extractFromGeminiResponse(GeminiResponse response) {
        try {
            return response.candidates().getFirst()
                    .content()
                    .parts().getFirst()
                    .text();
        } catch (NullPointerException | IndexOutOfBoundsException e) {
            log.error("Gemini 응답 데이터가 비어있거나 구조가 올바르지 않습니다: {}", response);
            throw new RuntimeException("Gemini AI 응답 추출 실패", e);
        }
    }

    private AIContentResponse parseAIResponse(String jsonText) {
        log.info("AI Response JSON: {}", jsonText);
        try {
            String cleanJson = jsonText.replaceAll("```json|```", "").trim();
            return objectMapper.readValue(cleanJson, AIContentResponse.class);
        } catch (Exception e) {
            throw new RuntimeException("AI 콘텐츠를 객체로 변환하는 데 실패했습니다.", e);
        }
    }
}