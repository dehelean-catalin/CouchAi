package com.example.couchai.dto;

import com.example.couchai.entity.Equipment;
import lombok.Data;

import java.util.List;

@Data
public class EquipmentDTO {
    private List<Equipment> equipment;
}
