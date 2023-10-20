package com.example.couchai.dto;

import com.example.couchai.entity.Equipment;
import com.example.couchai.entity.Muscle;
import com.example.couchai.utils.ExerciseCategoryEnum;
import com.example.couchai.utils.MainBodyPartEnum;
import lombok.Data;

import java.util.List;

@Data
public class ExerciseFileDTO {
    private ExerciseCategoryEnum category;
    private Boolean custom;
    private Boolean deleted;
    private List<Muscle> emphasizedRegions;
    private String equipment;
    private List<Equipment> equipmentRequired;
    private int experienceLevel;
    private String id;
    private String instructions;
    private MainBodyPartEnum mainBodyPart;
    private String mainMuscleWorked;
    private String mechanicsType;
    private String name;
    private List<Muscle> primaryMuscleGroups;
    private int rating;
    private List<Muscle> secondaryMuscleGroups;
    private String standardResolutionUrl;
    private String thumbnailUrl;

}
