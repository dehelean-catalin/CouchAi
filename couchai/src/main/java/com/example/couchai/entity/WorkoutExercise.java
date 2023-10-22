package com.example.couchai.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "workout_exercise")
public class WorkoutExercise {
    @Id
    private String id;

    private int position;

    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable=false)
    private Exercise exercise;

    @OneToMany
    private List<WorkoutSet> workoutSets = new ArrayList<>();

    @OneToMany
    private List<WorkoutSet> workoutSuperSets = new ArrayList<>();
}
