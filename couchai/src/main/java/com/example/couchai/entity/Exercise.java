package com.example.couchai.entity;

import com.example.couchai.utils.ExerciseCategoryEnum;
import com.example.couchai.utils.MainBodyPartEnum;
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
@Table(name="exercise")
public class Exercise {
    @Id
    private String id;

    @Column(nullable = false, name = "name")
    private String name;

    @Column(length = 1000)
    private String instructions;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ExerciseCategoryEnum category;

    @Column(name = "compound_movement",nullable = false)
    private boolean compoundMovement;

    @Enumerated(EnumType.STRING)
    @Column(name = "main_body_part", nullable = false)
    private MainBodyPartEnum mainBodyPart;

    @ManyToMany
    @JoinTable(
            name = "exercise_equipment",
            joinColumns = { @JoinColumn(name = "exercise_id") },
            inverseJoinColumns = { @JoinColumn(name = "equipment_id") }
    )
    private Set<Equipment> equipments = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "exercise_primary_muscle",
            joinColumns = { @JoinColumn(name = "exercise_id") },
            inverseJoinColumns = { @JoinColumn(name = "muscle_id") }
    )
    private Set<Muscle> primaryMuscleGroup = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "exercise_secondary_muscle",
            joinColumns = { @JoinColumn(name = "exercise_id") },
            inverseJoinColumns = { @JoinColumn(name = "muscle_id") }
    )
    private Set<Muscle> secondaryMuscleGroup = new HashSet<>();

    private Boolean custom;

    private Boolean deleted;

    @Column(name="standard_resolution_url")
    private String standardResolutionUrl;

    @Column(name="thumbnail_url")
    private String thumbnailUrl;

    public Exercise(String id, String name, String instructions, ExerciseCategoryEnum category, boolean compoundMovement, MainBodyPartEnum mainBodyPart, Boolean custom, Boolean deleted, String standardResolutionUrl, String thumbnailUrl) {
        this.id = id;
        this.name = name;
        this.instructions = instructions;
        this.category = category;
        this.compoundMovement = compoundMovement;
        this.mainBodyPart = mainBodyPart;
        this.custom = custom;
        this.deleted = deleted;
        this.standardResolutionUrl = standardResolutionUrl;
        this.thumbnailUrl = thumbnailUrl;
    }
}
