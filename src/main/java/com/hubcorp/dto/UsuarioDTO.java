package com.hubcorp.dto;

import com.hubcorp.model.Usuario;
import lombok.Data;

@Data
public class UsuarioDTO {

    private int id;

    private String nome;

    private String email;

    private String senha;

    private String telefone;

    private String cargo;

    private boolean ativo;

    private Usuario.TipoUsuario  tipoUsuario;
}
