package com.example.couchai.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "workout_set")
public class WorkoutSet {
    @Id
    private String id;

    private int set;

    @Column(name = "min_reps")
    private String minReps;

    @Column(name = "max_reps")
    private String maxReps;

    @Column(name="rest_time")
    private int restTime;

    @Column(name = "until_failure")
    private Boolean untilFailure;

    @Column(name = "warm_up")
    private Boolean warmUp;

}
