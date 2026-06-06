package com.gihan.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String vehicleDetails;
    private String status; // "AVAILABLE" or "ON_RIDE"


    public Driver() {}
    public Driver(String name, String vehicleDetails, String status) {
        this.name = name;
        this.vehicleDetails = vehicleDetails;
        this.status = status;
    }
}
