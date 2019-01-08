package org.grantharper.example.websocket;

import lombok.Data;

import java.util.List;

@Data
public class Recipe {

    private String title;
    private int currentStepIndex;
    private List<String> steps;

}
