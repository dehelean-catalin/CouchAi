package com.example.couchai.dto;

import lombok.Data;

import java.util.List;

@Data
public class WorkoutDayCLI {
    private String id;
    private String name;
    private int position;
    private boolean premium;
    private boolean single;
    private List<WorkoutExerciseFile> exerciseList;
}
