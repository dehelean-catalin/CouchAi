package com.example.couchai.entity;

import com.example.couchai.utils.EquipmentCategoryEnum;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="equipment")
public class Equipment {
    @Id
    private String id;

    @Column(unique = true, nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private EquipmentCategoryEnum category;

    @Column(name = "thumbnail_url")
    private String thumbnailUrl;

}
