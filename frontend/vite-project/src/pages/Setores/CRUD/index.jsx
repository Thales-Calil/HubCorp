import { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import { ApiError } from '../../../services/api';
import { atualizarSetor, buscarSetor, criarSetor } from '../../../services/setorService';
import './style.css';

function erroDaApi(error, operacao) {
  if (error instanceof ApiError && error.status === 403) return 'Você não possui permissão para esta operação.';
  if (error instanceof ApiError && error.status === 404) return 'O setor não foi encontrado.';
  if (error instanceof ApiError && error.status === 0) return 'Não foi possível conectar à API.';
  return `Não foi possível ${operacao}.`;
}

function SetoresCRUD({ onCancelar, onConcluido, onNavigate, onLogout, onSessionExpired, setorId, token, usuario }) {
  const editando = setorId !== null && setorId !== undefined;
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [menuAberto, setMenuAberto] = useState(false);
  const [carregando, setCarregando] = useState(editando);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    if (!editando) return undefined;
    let ativo = true;

    async function carregarSetor() {
      setCarregando(true);
      setMensagem('');

      try {
        const setor = await buscarSetor(setorId, token);

        if (ativo) {
          setNome(setor.nome || '');
          setDescricao(setor.descricao || '');
        }
      } catch (error) {
        if (!ativo) return;
        if (error instanceof ApiError && error.status === 401) {
          onSessionExpired();
          return;
        }
        setMensagem(erroDaApi(error, 'carregar o setor'));
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarSetor();

    return () => {
      ativo = false;
    };
  }, [editando, onSessionExpired, setorId, token]);

  async function salvarSetor() {
    const nomeTratado = nome.trim();

    if (!nomeTratado) {
      setMensagem('Informe o nome do setor.');
      return;
    }

    setMensagem('');
    setSalvando(true);

    try {
      const dados = { nome: nomeTratado, descricao: descricao.trim() };

      if (editando) {
        await atualizarSetor(setorId, dados, token);
        onConcluido('Setor atualizado com sucesso.');
      } else {
        await criarSetor(dados, token);
        onConcluido('Setor cadastrado com sucesso.');
      }
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        onSessionExpired();
        return;
      }
      setMensagem(erroDaApi(error, editando ? 'atualizar o setor' : 'cadastrar o setor'));
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="setor-crud-page">
      <Sidebar
        activeItem="Setores"
        isOpen={menuAberto}
        onClose={() => setMenuAberto(false)}
        onNavigate={onNavigate}
        usuario={usuario}
      />
      {menuAberto && (
        <button
          className="setor-crud-sidebar-overlay"
          type="button"
          onClick={() => setMenuAberto(false)}
          aria-label="Fechar menu"
        />
      )}
      <div className="setor-crud-workspace">
        <Header
          title="Gerenciamento de Setores"
          onMenuClick={() => setMenuAberto(!menuAberto)}
          onLogout={onLogout}
          usuario={usuario}
        />
        <main className="setor-crud-content">
          <section className="setor-crud-heading">
            <h2>{editando ? 'Editar Setor' : 'Cadastro de Setor'}</h2>
            <p>{editando ? 'Atualize as informações do setor.' : 'Preencha os dados para cadastrar um novo setor.'}</p>
          </section>
          <section className="setor-form-card">
            <h3>Dados do setor</h3>
            {carregando ? (
              <p className="setor-form-loading">Carregando setor...</p>
            ) : (
              <div className="setor-form-grid">
                <label>
                  Nome do setor <em>*</em>
                  <input
                    value={nome}
                    onChange={event => setNome(event.target.value)}
                    placeholder="Ex: Recursos Humanos"
                    disabled={salvando}
                  />
                </label>
                <label>
                  Descrição
                  <textarea
                    value={descricao}
                    onChange={event => setDescricao(event.target.value)}
                    placeholder="Ex: Gestão de pessoas"
                    disabled={salvando}
                    rows="5"
                  />
                </label>
              </div>
            )}
          </section>
          {mensagem && (
            <p className="setor-form-message" role="alert">
              {mensagem}
            </p>
          )}
          <div className="setor-form-actions">
            <button
              className="setor-cancel-button"
              type="button"
              disabled={salvando}
              onClick={onCancelar}
            >
              Cancelar
            </button>
            <button
              className="setor-save-button"
              type="button"
              disabled={salvando || carregando}
              onClick={salvarSetor}
            >
              {salvando ? 'Salvando...' : editando ? 'Salvar Alterações' : 'Cadastrar Setor'}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SetoresCRUD;
