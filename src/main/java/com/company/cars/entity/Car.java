package com.company.cars.entity;

import io.jmix.core.entity.annotation.JmixGeneratedValue;
import io.jmix.core.metamodel.annotation.InstanceName;
import io.jmix.core.metamodel.annotation.JmixEntity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.UUID;

@JmixEntity
@Table(name = "CAR", indexes = {
        @Index(name = "IDX_CAR_MODEL_ID", columnList = "MODEL_ID")
})
@Entity
public class Car {
    @JmixGeneratedValue
    @Column(name = "ID", nullable = false)
    @Id
    private UUID id;

    @InstanceName
    @Column(name = "DESCRIPTION")
    @Lob
    private String description;

    @Column(name = "REG_NUMBER", nullable = false)
    private String regNumber;

    @JoinColumn(name = "MODEL_ID", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Model model;

    @Column(name = "PRICE", precision = 19, scale = 2)
    private BigDecimal price;

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Model getModel() {
        return model;
    }

    public void setModel(Model model) {
        this.model = model;
    }

    public String getRegNumber() {
        return regNumber;
    }

    public void setRegNumber(String regNumber) {
        this.regNumber = regNumber;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}