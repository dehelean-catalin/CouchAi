package com.example.couchai.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "schedules")
public class Schedule {
    @Id
    private String id;

    private String name;
    @Column(name = "thumbnailURL")

    private String thumbnailURL;

    private boolean custom;

    @Column(name = "days_per_week")
    private int daysPerWeek;

    @Column(length = 1000)
    private String description;

    @Column(name = "main_goal")
    private String mainGoal;

    private boolean premium;

    @Column(name = "training_level")
    private String trainingLevel;

    @OneToMany
    Map<String,WorkoutDay> workoutDays = new HashMap<>();

    public Schedule(String id, String name, String thumbnailURL, boolean custom, int daysPerWeek, String description, String mainGoal, boolean premium, String trainingLevel) {
        this.id = id;
        this.name = name;
        this.thumbnailURL = thumbnailURL;
        this.custom = custom;
        this.daysPerWeek = daysPerWeek;
        this.description = description;
        this.mainGoal = mainGoal;
        this.premium = premium;
        this.trainingLevel = trainingLevel;
    }
}
