package com.devquiz.config.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "ai.gemini")
public class GeminiProperties {
    private String apiKey;
    private String apiUrl;
    private String model;
}