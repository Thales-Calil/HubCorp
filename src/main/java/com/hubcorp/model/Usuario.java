package com.hubcorp.model;

import lombok.Data;
import jakarta.persistence.*;


@Data
@Entity(name="usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;

    private String nome;

    private String email;

    private String senha;

    private String telefone;

    private String cargo;

    private boolean ativo;

    public enum TipoUsuario {
        RH,
        GERENTE,
        COLABORADOR
    }

    // FK setor
}
