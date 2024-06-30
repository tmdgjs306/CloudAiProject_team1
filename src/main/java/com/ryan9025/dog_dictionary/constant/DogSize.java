package com.ryan9025.dog_dictionary.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DogSize {
    SMALL("SMALL"), // 소형견
    MEDIUM("MEDIUM"), // 중형견
    LARGE("LARGE"); // 대형견

    private final String dogSize;
}
