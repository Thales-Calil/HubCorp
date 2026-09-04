package com.hubcorp.dto;

import com.hubcorp.model.Pergunta;
import lombok.Data;

@Data
public class PerguntaDTO {
    private String id;

    private String titulo;

    public Pergunta.TipoPergunta tipoPergunta;
}
