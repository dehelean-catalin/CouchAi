package com.example.couchai.dto;

import lombok.Data;

import java.util.List;

@Data
public class ScheduleCLI {

        private String id;
        private String coverPhoto;
        private boolean custom;
        private int daysPerWeek;
        private String description;
        private boolean featured;
        private String mainGoal;
        private String name;
        private boolean premium;
        private String trainingLevel;
        private List<WorkoutDayCLI> workouts;

}
