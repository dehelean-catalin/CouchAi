package com.example.couchai.service;

import com.example.couchai.dto.EquipmentDTO;
import com.example.couchai.entity.Equipment;

import java.util.List;

public interface EquipmentService {
    List<Equipment> findAll();
    Equipment findById(String id);
    String saveAll(List<Equipment> equipment);
    void deleteById(String id);
}
