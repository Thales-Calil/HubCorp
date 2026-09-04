package com.hubcorp.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity(name="pergunta")
public class Pergunta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    private String titulo;

    public enum TipoPergunta{
        ESCALA,
        MULTIPLA_ESCOLHA,
        TEXTO,
        NUMERO,
        CHECKBOX
    }

    private int ordem;

    // @Enumerated(EnumType.STRING)
    // private tipoPergunta tipo;

    // FK formulario
}
