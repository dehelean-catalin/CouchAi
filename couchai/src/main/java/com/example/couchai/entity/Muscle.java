package com.example.couchai.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "muscles")
public class Muscle {
    @Id
    private String id;
    @Column(nullable = false, unique = true)
    private String name;
}
