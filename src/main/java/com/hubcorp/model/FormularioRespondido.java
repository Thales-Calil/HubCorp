package com.hubcorp.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity(name="formulario_respondido")
public class FormularioRespondido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private LocalDateTime dataResposta;

    // @ManyToOne
    // @JoinColumn(name="id_formulario")
    // private Formulario formulario;

    // FK formulario
    // FK usuario
    // FK pergunta
    // FK resposta
}
