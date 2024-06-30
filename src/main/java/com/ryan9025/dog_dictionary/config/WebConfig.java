package com.ryan9025.dog_dictionary.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Value("${file.path}")
    private String uploadFolder;
    /* 1. WebConfig 클래스는 WebMvcConfigurer 인터페이스를 구현
     * 2. 이를 통해 Spring MVC 의 웹 구성을 사용자 정의
     * 3. 최종 수정일 : 2024.06.06 */

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // WebMvcConfigurer 인터페이스의 addResourceHandlers 메서드를 오버라이드합니다.
        // 이 메서드는 애플리케이션의 정적 리소스를 처리하기 위한 리소스 핸들러를 등록하는 데 사용됩니다.

        registry.addResourceHandler("/upload/**")
                .addResourceLocations("file:///" + uploadFolder);
        /* 실제 리소스가 위치하는 디렉토리를 지정합니다.
         * 여기서는 @Value 어노테이션으로 application.yml 에 지정해놓은 경로를 사용합니다.
         * file:/// 프리픽스는 파일 시스템의 절대 경로를 나타냅니다. */

    }
    /* 등록된 리소스 핸들러는 '/upload/**' 패턴에 매칭되는 URL 요청이 들어왔을 때, 해당 요청을 처리하기 위한 정적 리소스 위치를 지정
     * 애플리케이션 외부에 위치한 파일에 접근할 수 있도록 한다.
     * Spring MVC 애플리케이션에서는 classpath 내의 리소스나, 특정 내장 디렉토리 아래의 리소스에 대해서만 접근을 허용함 */
}
