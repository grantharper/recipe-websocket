package org.grantharper.example.websocket;


import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.Arrays;
import java.util.List;

@Controller
public class RecipeController {


    private Recipe recipe;

    public RecipeController() {
        this.recipe = new Recipe();
        this.recipe.setTitle("Grilled Asparagus");
        List<String> steps = Arrays.asList("Wash and chop asparagus", "Heat pan over medium heat", "When pan is hot, add 2 tablespoons olive oil",
                "Add the asparagus", "Add salt and pepper and cook until tender and slightly charred");
        this.recipe.setCurrentStepIndex(0);
        this.recipe.setSteps(steps);
    }

    @MessageMapping("/update")
    @SendTo("/recipe/websocket")
    public Recipe updateStep(StepUpdate stepUpdate) throws Exception {
        Thread.sleep(1000); // simulated delay
        recipe.setCurrentStepIndex(stepUpdate.getCurrentStepIndex());
        return this.recipe;
    }

}
