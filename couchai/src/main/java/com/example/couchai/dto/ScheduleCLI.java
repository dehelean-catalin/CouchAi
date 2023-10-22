package com.example.couchai.dto;

import lombok.Data;

import java.util.List;

@Data
public class ScheduleDTO {

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
