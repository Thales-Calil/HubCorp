package com.hubcorp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity(name="formulario")
public class Formulario {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    private String titulo;

    private LocalDate dataCriacao;

    private boolean ativo;
}
