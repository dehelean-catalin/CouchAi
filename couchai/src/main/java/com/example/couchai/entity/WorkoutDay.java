package com.example.couchai.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "workout_days")
public class WorkoutDay {
    @Id
    private String id;

    private String name;

    private int position;

    @OneToMany
    private List<WorkoutExercise> workoutExercises = new ArrayList<>();

    public WorkoutDay(String id, String name, int position) {
        this.id = id;
        this.name = name;
        this.position = position;
    }
}
