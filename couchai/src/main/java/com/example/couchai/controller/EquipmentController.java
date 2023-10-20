package com.example.couchai.controller;


import com.example.couchai.dto.EquipmentDTO;
import com.example.couchai.entity.Equipment;
import com.example.couchai.service.EquipmentService;
import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EquipmentController {

    private final EquipmentService equipmentService;
    public EquipmentController(EquipmentService equipmentService){
        this.equipmentService=equipmentService;
    }

    @GetMapping("/equipments")
    public List<Equipment> findAll(){
        return equipmentService.findAll();
    }
    @PostMapping("/equipments")
    public String save(@Valid @RequestBody EquipmentDTO equipment){
       return equipmentService.saveAll(equipment.getEquipment());
    }

}
