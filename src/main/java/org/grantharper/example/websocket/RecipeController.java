package org.grantharper.example.websocket;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@Controller
public class RecipeController {

    private Logger log = LoggerFactory.getLogger(RecipeController.class);

    private SimpMessagingTemplate simpMessagingTemplate;

    private Recipe recipe;

    public RecipeController(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.recipe = new Recipe();
        this.recipe.setTitle("Grilled Asparagus");
        List<String> steps = Arrays.asList("Wash and chop asparagus", "Heat pan over medium heat", "When pan is hot, add 2 tablespoons olive oil",
                "Add the asparagus", "Add salt and pepper and cook until tender and slightly charred");
        this.recipe.setCurrentStepIndex(0);
        this.recipe.setSteps(steps);
    }

    @MessageMapping("/update")
    @SendTo("/recipe/update")
    public Recipe updateStep(StepUpdate stepUpdate) throws Exception {
        log.info("received websocket stepUpdate: " + stepUpdate);
        recipe.setCurrentStepIndex(stepUpdate.getCurrentStepIndex());
        return this.recipe;
    }

    @PostMapping("/alexa")
    public ResponseEntity<String> alexaCall(@RequestBody StepUpdate stepUpdate) {
        log.info("recieved request: " + stepUpdate);
        recipe.setCurrentStepIndex(stepUpdate.getCurrentStepIndex());
        this.simpMessagingTemplate.convertAndSend("/recipe/update", recipe);
        return ResponseEntity.ok().body("Acknowledged");
    }

    @GetMapping("/prep")
    public String prep() {
        return "prep";
    }

    @GetMapping("/external")
    public String external() {
        return "external";
    }




}
