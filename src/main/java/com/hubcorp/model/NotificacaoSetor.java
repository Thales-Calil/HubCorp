package com.hubcorp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity(name="notificacao_setor")
public class NotificacaoSetor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //FK setor
}
