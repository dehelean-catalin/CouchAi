package com.example.couchai.dto;

import com.example.couchai.entity.Exercise;
import com.example.couchai.entity.WorkoutSet;
import lombok.Data;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
public class WorkoutExerciseFile {
    private String id;
    private int position;
    private Exercise exercise;
    private String type;
    private List<WorkoutSet> supersetExercises;
    private List<WorkoutSet> workoutExerciseSets;
}
