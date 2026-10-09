import { useEffect, useState } from 'react';
import { Pencil, Plus, Power, Search, Trash2 } from 'lucide-react';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import { ApiError } from '../../../services/api';
import { listarSetores } from '../../../services/setorService';
import { atualizarUsuario, excluirUsuario, listarUsuarios } from '../../../services/usuarioService';
import './style.css';

const perfis = ['Todos', 'Recursos Humanos', 'Gerente', 'Colaborador'];
const statusOpcoes = ['Todos', 'Ativo', 'Inativo'];

function iniciaisDoNome(nome) {
  return nome.split(' ').filter(Boolean).slice(0, 2).map(parte => parte[0]).join('').toUpperCase() || 'U';
}

function perfilAmigavel(userType) {
  const nomes = {
    RH: 'Recursos Humanos',
    GERENTE: 'Gerente',
    COLABORADOR: 'Colaborador'
  };

  return nomes[userType] || 'Perfil não identificado';
}

function classeDoPerfil(userType) {
  const classes = {
    RH: 'recursos-humanos',
    GERENTE: 'gerente',
    COLABORADOR: 'colaborador'
  };

  return classes[userType] || 'indefinido';
}

function classeDoAvatar(userType) {
  if (userType === 'RH') return 'green';
  if (userType === 'GERENTE') return 'dark-green';
  return 'blue';
}

function mensagemDeErro(error, operacao) {
  if (error instanceof ApiError && error.status === 403) {
    return 'Você não possui permissão para esta operação.';
  }

  if (error instanceof ApiError && error.status === 0) {
    return 'Não foi possível conectar à API.';
  }

  return `Não foi possível ${operacao}.`;
}

function UsuariosListagem({
  mensagem,
  onEditarUsuario,
  onNovoUsuario,
  onNavigate,
  onLogout,
  onSessionExpired,
  token,
  usuario
}) {
  const [busca, setBusca] = useState('');
  const [perfilSelecionado, setPerfilSelecionado] = useState('Todos');
  const [statusSelecionado, setStatusSelecionado] = useState('Todos');
  const [menuAberto, setMenuAberto] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [mensagemOperacao, setMensagemOperacao] = useState('');
  const [operacaoId, setOperacaoId] = useState(null);
  const [recarregar, setRecarregar] = useState(0);

  useEffect(() => {
    let ativo = true;

    async function carregarDados() {
      setCarregando(true);
      setErro('');

      try {
        const [usuariosDaApi, setores] = await Promise.all([
          listarUsuarios(token),
          listarSetores(token)
        ]);

        if (!ativo) return;

        const setoresDaApi = Array.isArray(setores) ? setores : [];
        const usuariosNormalizados = usuariosDaApi.map(item => {
          const setor = setoresDaApi.find(itemSetor => Number(itemSetor.id) === Number(item.setorId));

          return {
            id: item.id,
            nome: item.nome,
            email: item.email,
            userType: item.userType,
            ativo: item.ativo === true,
            perfil: perfilAmigavel(item.userType),
            setor: setor?.nome || 'Setor não identificado',
            iniciais: iniciaisDoNome(item.nome),
            avatar: classeDoAvatar(item.userType)
          };
        });

        setUsuarios(usuariosNormalizados);
      } catch (error) {
        if (!ativo) return;

        if (error instanceof ApiError && error.status === 401) {
          onSessionExpired();
          return;
        }

        setErro(mensagemDeErro(error, 'carregar os usuários'));
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarDados();

    return () => {
      ativo = false;
    };
  }, [onSessionExpired, recarregar, token]);

  const usuariosFiltrados = usuarios.filter(item => {
    const termo = busca.toLowerCase();
    const atendeBusca = item.nome.toLowerCase().includes(termo) || item.email.toLowerCase().includes(termo);
    const atendePerfil = perfilSelecionado === 'Todos' || item.perfil === perfilSelecionado;
    const atendeStatus = statusSelecionado === 'Todos' || (item.ativo ? 'Ativo' : 'Inativo') === statusSelecionado;
    return atendeBusca && atendePerfil && atendeStatus;
  });

  async function alterarStatus(item) {
    const novoStatus = !item.ativo;
    const descricao = novoStatus ? 'ativar' : 'desativar';

    if (!window.confirm(`Deseja ${descricao} o usuário ${item.nome}?`)) return;

    setOperacaoId(item.id);
    setErro('');
    setMensagemOperacao('');

    try {
      await atualizarUsuario(item.id, { ativo: novoStatus }, token);
      setMensagemOperacao(`Status de ${item.nome} atualizado com sucesso.`);
      setRecarregar(valor => valor + 1);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        onSessionExpired();
        return;
      }

      setErro(mensagemDeErro(error, 'alterar o status do usuário'));
    } finally {
      setOperacaoId(null);
    }
  }

  async function removerUsuario(item) {
    if (Number(item.id) === Number(usuario.id)) {
      setErro('Não é possível excluir o próprio usuário autenticado.');
      return;
    }

    if (!window.confirm(`Deseja excluir permanentemente o usuário ${item.nome}?`)) return;

    setOperacaoId(item.id);
    setErro('');
    setMensagemOperacao('');

    try {
      await excluirUsuario(item.id, token);
      setMensagemOperacao(`Usuário ${item.nome} excluído com sucesso.`);
      setRecarregar(valor => valor + 1);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        onSessionExpired();
        return;
      }

      setErro(mensagemDeErro(error, 'excluir o usuário'));
    } finally {
      setOperacaoId(null);
    }
  }

  return <div className="usuarios-page">
      <Sidebar isOpen={menuAberto} onClose={() => setMenuAberto(false)} onNavigate={onNavigate} usuario={usuario} />
      {menuAberto && <button className="sidebar-overlay" type="button" onClick={() => setMenuAberto(false)} aria-label="Fechar menu" />}
      <div className="usuarios-workspace">
        <Header onMenuClick={() => setMenuAberto(!menuAberto)} onLogout={onLogout} usuario={usuario} />
        <main className="usuarios-content">
          <section className="usuarios-title-row">
            <div>
              <h2>Gerenciamento de Usuários</h2>
              <p>Cadastro, perfis e permissões de acesso ao sistema</p>
            </div>
            <button className="new-user-button" type="button" onClick={onNovoUsuario}><Plus size={17} strokeWidth={1.8} /> <span>Novo Usuário</span></button>
          </section>

          <section className="filters" aria-label="Filtros de usuários">
            <label className="user-search">
              <Search size={17} strokeWidth={1.6} />
              <input value={busca} onChange={event => setBusca(event.target.value)} placeholder="Buscar por nome ou e-mail..." />
            </label>
            <div className="filter-group">
              {perfis.map(perfil => <button className={perfilSelecionado === perfil ? 'filter-selected' : ''} key={perfil} onClick={() => setPerfilSelecionado(perfil)} type="button">{perfil}</button>)}
            </div>
            <div className="filter-group status-filters">
              {statusOpcoes.map(status => <button className={statusSelecionado === status ? 'filter-selected' : ''} key={status} onClick={() => setStatusSelecionado(status)} type="button">{status}</button>)}
            </div>
          </section>

          {(mensagem || mensagemOperacao) && <p className="users-success-message" role="status">{mensagem || mensagemOperacao}</p>}
          {erro && <p className="users-error-message" role="alert">{erro}</p>}
          {carregando && <p className="empty-message">Carregando usuários...</p>}
          {!carregando && !erro && usuarios.length === 0 && <p className="empty-message">Nenhum usuário cadastrado.</p>}

          {!carregando && !erro && usuarios.length > 0 && <section className="users-table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>USUÁRIO</th><th>E-MAIL</th><th>PERFIL</th><th>SETOR</th><th>STATUS</th><th>ÚLTIMO ACESSO</th><th>AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map(item => <tr key={item.id}>
                    <td><div className="user-cell"><div className={`user-avatar avatar-${item.avatar}`}>{item.iniciais}</div><strong>{item.nome}</strong></div></td>
                    <td>{item.email}</td>
                    <td><span className={`profile-badge profile-${classeDoPerfil(item.userType)}`}>{item.perfil}</span></td>
                    <td>{item.setor}</td>
                    <td><span className={`status-badge ${item.ativo ? 'status-active' : 'status-inactive'}`}>{item.ativo ? 'Ativo' : 'Inativo'}</span></td>
                    <td></td>
                    <td>
                      <div className="action-buttons">
                        <button aria-label={`Editar ${item.nome}`} className="action-button edit-button" type="button" disabled={operacaoId !== null} onClick={() => onEditarUsuario(item.id)}><Pencil size={14} strokeWidth={1.6} /></button>
                        <button aria-label={`Alterar status de ${item.nome}`} className={`action-button toggle-button ${!item.ativo ? 'toggle-active' : ''}`} type="button" disabled={operacaoId !== null} onClick={() => alterarStatus(item)}><Power size={14} strokeWidth={1.6} /></button>
                        <button aria-label={`Excluir ${item.nome}`} className="action-button delete-button" type="button" disabled={operacaoId !== null} onClick={() => removerUsuario(item)}><Trash2 size={14} strokeWidth={1.6} /></button>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
            {usuariosFiltrados.length === 0 && <p className="empty-message">Nenhum usuário encontrado.</p>}
          </section>}
        </main>
      </div>
    </div>;
}

export default UsuariosListagem;
