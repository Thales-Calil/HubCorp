package com.hubcorp.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity(name="notificacao")
public class Notificacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String titulo;

    private String descricao;


    // @ManyToOne
    // @JoinColumn
    // private Usuario usuario;
}
