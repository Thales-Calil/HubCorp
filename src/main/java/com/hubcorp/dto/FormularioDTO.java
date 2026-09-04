package com.hubcorp.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class FormularioDTO {

    private int id;

    private String titulo;

    private LocalDate dataCriacao;

    private boolean ativo;
}
