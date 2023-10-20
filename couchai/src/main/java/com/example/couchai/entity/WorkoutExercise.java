package com.example.couchai.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
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
    @JoinColumn(name = "exercise_id")
    private Exercise exercise = new Exercise();

    @OneToMany
    private Set<WorkoutSet> workoutSets = new HashSet<>();

    @OneToMany
    private Set<WorkoutSet> workoutSuperSets = new HashSet<>();
}
