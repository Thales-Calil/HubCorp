import { useEffect, useState } from 'react';
import { BarChart3, Pencil, Plus, Search, Send, ToggleLeft, ToggleRight, Trash2 } from 'lucide-react';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import { temPermissao } from '../../../config/permissoes';
import { ApiError } from '../../../services/api';
import { atualizarFormulario, excluirFormulario, listarFormularios } from '../../../services/formularioService';
import './style.css';

function formatarData(data) {
  if (!data) return 'Data não disponível';

  const dataFormatada = new Date(data);
  return Number.isNaN(dataFormatada.getTime()) ? 'Data não disponível' : dataFormatada.toLocaleDateString('pt-BR');
}

function mensagemDeErro(error, operacao) {
  if (error instanceof ApiError && error.status === 403) {
    return 'Acesso negado. Você não possui permissão para esta operação.';
  }

  if (error instanceof ApiError && error.status === 0) {
    return 'Não foi possível carregar os formulários.';
  }

  return `Não foi possível ${operacao}.`;
}

function FormulariosListagem({
  mensagem,
  onEditarFormulario,
  onNavigate,
  onNovoFormulario,
  onLogout,
  onResponderFormulario,
  onSessionExpired,
  onVerRespostas,
  token,
  usuario
}) {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('Todos');
  const [formularios, setFormularios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [mensagemOperacao, setMensagemOperacao] = useState('');
  const [operacaoId, setOperacaoId] = useState(null);
  const [recarregar, setRecarregar] = useState(0);
  const [menuAberto, setMenuAberto] = useState(false);
  const podeGerenciar = temPermissao(usuario?.userType, 'GERENCIAR_FORMULARIOS');
  const podeResponder = temPermissao(usuario?.userType, 'RESPONDER_FORMULARIO');

  useEffect(() => {
    let ativo = true;

    async function carregarFormularios() {
      setCarregando(true);
      setErro('');

      try {
        const dados = await listarFormularios(token);

        if (ativo) setFormularios(Array.isArray(dados) ? dados : []);
      } catch (error) {
        if (!ativo) return;

        if (error instanceof ApiError && error.status === 401) {
          onSessionExpired();
          return;
        }

        setErro(mensagemDeErro(error, 'carregar os formulários'));
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarFormularios();

    return () => {
      ativo = false;
    };
  }, [onSessionExpired, recarregar, token]);

  const formulariosVisiveis = formularios.filter(formulario => {
    const correspondeBusca = formulario.titulo?.toLowerCase().includes(busca.toLowerCase());
    const correspondeFiltro = filtro === 'Todos' || filtro === 'Ativos' && formulario.ativo || filtro === 'Inativos' && !formulario.ativo;
    const permitidoNoPerfil = podeGerenciar || formulario.ativo;
    return correspondeBusca && correspondeFiltro && permitidoNoPerfil;
  });

  async function alterarStatus(formulario) {
    if (!podeGerenciar) {
      setErro('Acesso negado. Você não possui permissão para esta operação.');
      return;
    }

    setOperacaoId(formulario.id);
    setErro('');
    setMensagemOperacao('');

    try {
      await atualizarFormulario(formulario.id, {
        titulo: formulario.titulo,
        ativo: !formulario.ativo
      }, token);
      setMensagemOperacao(`Formulário ${formulario.ativo ? 'desativado' : 'ativado'} com sucesso.`);
      setRecarregar(valor => valor + 1);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        onSessionExpired();
        return;
      }

      setErro(mensagemDeErro(error, 'alterar o status do formulário'));
    } finally {
      setOperacaoId(null);
    }
  }

  async function removerFormulario(formulario) {
    if (!podeGerenciar) {
      setErro('Acesso negado. Você não possui permissão para esta operação.');
      return;
    }

    if (!window.confirm(`Deseja excluir permanentemente o formulário "${formulario.titulo}"?`)) return;

    setOperacaoId(formulario.id);
    setErro('');
    setMensagemOperacao('');

    try {
      await excluirFormulario(formulario.id, token);
      setMensagemOperacao('Formulário excluído com sucesso.');
      setRecarregar(valor => valor + 1);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        onSessionExpired();
        return;
      }

      setErro(mensagemDeErro(error, 'excluir o formulário'));
    } finally {
      setOperacaoId(null);
    }
  }

  return <div className="forms-page">
      <Sidebar activeItem="Formulários" isOpen={menuAberto} onClose={() => setMenuAberto(false)} onNavigate={onNavigate} usuario={usuario} />
      {menuAberto && <button className="forms-sidebar-overlay" type="button" onClick={() => setMenuAberto(false)} aria-label="Fechar menu" />}
      <div className="forms-workspace">
        <Header title="Formulários" onMenuClick={() => setMenuAberto(!menuAberto)} onLogout={onLogout} usuario={usuario} />
        <main className="forms-content">
          <section className="forms-heading">
            <div><h2>Formulários</h2><p>Gerencie formulários e acompanhe as respostas dos colaboradores.</p></div>
            {podeGerenciar && <button className="new-form-button" type="button" onClick={onNovoFormulario}><Plus size={17} strokeWidth={1.8} /> Novo Formulário</button>}
          </section>

          <section className="forms-filters" aria-label="Filtros de formulários">
            <label className="forms-search"><Search size={17} strokeWidth={1.6} /><input value={busca} onChange={event => setBusca(event.target.value)} placeholder="Buscar formulário..." /></label>
            <div className="forms-status-filters">{['Todos', 'Ativos', 'Inativos'].map(opcao => <button className={filtro === opcao ? 'forms-filter-selected' : ''} key={opcao} type="button" onClick={() => setFiltro(opcao)}>{opcao}</button>)}</div>
          </section>

          {(mensagem || mensagemOperacao) && <p className="forms-success-message" role="status">{mensagem || mensagemOperacao}</p>}
          {operacaoId !== null && <p className="forms-loading-message" role="status">Salvando alteração...</p>}
          {erro && <p className="forms-error-message" role="alert">{erro}</p>}
          {carregando && <p className="no-forms">Carregando formulários...</p>}
          {!carregando && !erro && formulariosVisiveis.length === 0 && <p className="no-forms">Nenhum formulário encontrado.</p>}

          {!carregando && !erro && formulariosVisiveis.length > 0 && <section className="forms-table-wrap"><table className="forms-table">
              <thead><tr><th>Formulário</th><th>Data de criação</th><th>Status</th><th>Ações</th></tr></thead>
              <tbody>{formulariosVisiveis.map(formulario => <tr key={formulario.id}>
                    <td className="form-title-cell">{formulario.titulo}</td>
                    <td>{formatarData(formulario.dataCriacao)}</td>
                    <td><span className={formulario.ativo ? 'form-status form-status-active' : 'form-status form-status-inactive'}>{formulario.ativo ? 'Ativo' : 'Inativo'}</span></td>
                    <td><div className="form-actions">
                        {formulario.ativo && podeResponder && <button className="form-answer-button" type="button" disabled={operacaoId !== null} onClick={() => onResponderFormulario(formulario.id)} aria-label={`Responder ${formulario.titulo}`} title="Visualizar e responder"><Send size={15} strokeWidth={1.6} /></button>}
                        {podeGerenciar && <button type="button" disabled={operacaoId !== null} onClick={() => onEditarFormulario(formulario.id)} aria-label={`Editar ${formulario.titulo}`}><Pencil size={15} strokeWidth={1.6} /></button>}
                        {podeGerenciar && <button type="button" disabled={operacaoId !== null} onClick={() => alterarStatus(formulario)} aria-label={`${formulario.ativo ? 'Desativar' : 'Ativar'} ${formulario.titulo}`} title={formulario.ativo ? 'Desativar' : 'Ativar'}>{formulario.ativo ? <ToggleRight size={17} strokeWidth={1.6} /> : <ToggleLeft size={17} strokeWidth={1.6} />}</button>}
                        {podeGerenciar && <button type="button" disabled={operacaoId !== null} onClick={() => onVerRespostas(formulario.id)} aria-label={`Ver respostas de ${formulario.titulo}`} title="Ver respostas"><BarChart3 size={15} strokeWidth={1.6} /></button>}
                        {podeGerenciar && <button className="form-delete-button" type="button" disabled={operacaoId !== null} onClick={() => removerFormulario(formulario)} aria-label={`Excluir ${formulario.titulo}`}><Trash2 size={15} strokeWidth={1.6} /></button>}
                      </div></td>
                  </tr>)}</tbody>
            </table></section>}
        </main>
      </div>
    </div>;
}

export default FormulariosListagem;
