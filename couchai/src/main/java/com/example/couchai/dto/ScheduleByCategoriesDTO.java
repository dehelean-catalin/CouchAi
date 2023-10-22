package com.example.couchai.dto;

import com.example.couchai.entity.Schedule;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class ScheduleByCategoriesDTO {
    private List<Schedule> gainStrength = new ArrayList<>();
    private List<Schedule> buildMuscle = new ArrayList<>();
    private List<Schedule> loseFat = new ArrayList<>();
    private List<Schedule> homeWorkouts = new ArrayList<>();
    private List<Schedule> singleWorkouts = new ArrayList<>();

}
