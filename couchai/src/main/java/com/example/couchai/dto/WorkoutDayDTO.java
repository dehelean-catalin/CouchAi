package com.example.couchai.dto;

import com.example.couchai.entity.WorkoutDay;
import lombok.Data;

import java.util.List;

@Data
public class WorkoutDayDTO {
    private List<WorkoutDayCLI> workoutDays;
}
