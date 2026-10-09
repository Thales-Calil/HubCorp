import { useEffect, useState } from 'react';
import { Eye, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import { temPermissao } from '../../../config/permissoes';
import { ApiError } from '../../../services/api';
import { excluirNotificacao, listarNotificacoes } from '../../../services/notificacaoService';
import './style.css';

function setoresDaNotificacao(notificacao) {
  const setores = notificacao.Sectors || notificacao.setores || [];
  return Array.isArray(setores) ? setores : [];
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

function AvisosListagem({
  mensagem,
  onEditarAviso,
  onNavigate,
  onNovoAviso,
  onLogout,
  onSessionExpired,
  token,
  usuario
}) {
  const [busca, setBusca] = useState('');
  const [menuAberto, setMenuAberto] = useState(false);
  const [avisos, setAvisos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [mensagemOperacao, setMensagemOperacao] = useState('');
  const [excluindoId, setExcluindoId] = useState(null);
  const [recarregar, setRecarregar] = useState(0);
  const podeCriar = temPermissao(usuario?.userType, 'CRIAR_NOTIFICACAO');
  const podeEditar = temPermissao(usuario?.userType, 'EDITAR_NOTIFICACAO');
  const podeExcluir = temPermissao(usuario?.userType, 'EXCLUIR_NOTIFICACAO');
  const listagemAdministrativaSegura = usuario?.userType === 'RH';

  useEffect(() => {
    let ativo = true;

    if (!listagemAdministrativaSegura) {
      return undefined;
    }

    async function carregarAvisos() {
      setCarregando(true);
      setErro('');

      try {
        const notificacoes = await listarNotificacoes(token);

        if (!ativo) return;

        setAvisos(Array.isArray(notificacoes) ? notificacoes.map(notificacao => ({
          id: notificacao.id,
          titulo: notificacao.titulo,
          descricao: notificacao.descricao,
          setores: setoresDaNotificacao(notificacao)
        })) : []);
      } catch (error) {
        if (!ativo) return;

        if (error instanceof ApiError && error.status === 401) {
          onSessionExpired();
          return;
        }

        setErro(mensagemDeErro(error, 'carregar os comunicados'));
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarAvisos();

    return () => {
      ativo = false;
    };
  }, [listagemAdministrativaSegura, onSessionExpired, recarregar, token]);

  const avisosFiltrados = avisos.filter(aviso => aviso.titulo.toLowerCase().includes(busca.toLowerCase()));

  async function removerAviso(aviso) {
    if (!window.confirm(`Deseja excluir permanentemente o comunicado "${aviso.titulo}"?`)) return;

    setExcluindoId(aviso.id);
    setErro('');
    setMensagemOperacao('');

    try {
      await excluirNotificacao(aviso.id, token);
      setMensagemOperacao('Comunicado excluído com sucesso.');
      setRecarregar(valor => valor + 1);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        onSessionExpired();
        return;
      }

      setErro(mensagemDeErro(error, 'excluir o comunicado'));
    } finally {
      setExcluindoId(null);
    }
  }

  return <div className="avisos-page">
      <Sidebar activeItem="Avisos e Comunicados" isOpen={menuAberto} onClose={() => setMenuAberto(false)} onNavigate={onNavigate} usuario={usuario} />
      {menuAberto && <button className="avisos-sidebar-overlay" type="button" onClick={() => setMenuAberto(false)} aria-label="Fechar menu" />}

      <div className="avisos-workspace">
        <Header title="Avisos e Comunicados" onMenuClick={() => setMenuAberto(!menuAberto)} onLogout={onLogout} usuario={usuario} />
        <main className="avisos-content">
          <section className="avisos-heading">
            <div><h2>Avisos e Comunicados</h2><p>Comunicados oficiais publicados pela organização</p></div>
            {podeCriar && <button className="new-notice-button" type="button" onClick={onNovoAviso}><Plus size={17} strokeWidth={1.8} /> Novo Aviso</button>}
          </section>

          <section className="avisos-filters" aria-label="Filtros de avisos">
            <label className="notice-search"><Search size={17} strokeWidth={1.6} /><input value={busca} onChange={event => setBusca(event.target.value)} placeholder="Buscar por título..." /></label>
            <div className="notice-type-filters"><button type="button" disabled title="Filtro disponível quando o backend oferecer categorias.">Categorias indisponíveis</button></div>
          </section>

          {(mensagem || mensagemOperacao) && <p className="notices-success-message" role="status">{mensagem || mensagemOperacao}</p>}
          {excluindoId !== null && <p className="notices-success-message" role="status">Excluindo comunicado...</p>}
          {erro && <p className="notices-error-message" role="alert">{erro}</p>}
          {!listagemAdministrativaSegura && <p className="notices-security-message">A listagem está bloqueada porque o backend ainda não filtra comunicados pelos setores destinatários.</p>}
          {listagemAdministrativaSegura && carregando && <p className="no-notices">Carregando avisos...</p>}
          {listagemAdministrativaSegura && !carregando && !erro && avisos.length === 0 && <p className="no-notices">Nenhum comunicado encontrado.</p>}

          {listagemAdministrativaSegura && !carregando && !erro && avisos.length > 0 && <section className="notices-grid">
            {avisosFiltrados.map(aviso => <article className="notice-card aviso-geral" key={aviso.id}>
                <div className="notice-card-heading"><h3>{aviso.titulo}</h3><span>Comunicado</span></div>
                <p>{aviso.descricao}</p>
                {aviso.setores.length > 0 && <small className="notice-sectors">Setores: {aviso.setores.map(setor => setor.nome).join(', ')}</small>}
                <div className="notice-card-actions">
                  <button type="button" aria-label={`Visualizar ${aviso.titulo}`} disabled title="A visualização detalhada não está disponível nesta etapa."><Eye size={15} strokeWidth={1.6} /></button>
                  {podeEditar && <button type="button" aria-label={`Editar ${aviso.titulo}`} disabled={excluindoId !== null} onClick={() => onEditarAviso(aviso.id)}><Pencil size={15} strokeWidth={1.6} /></button>}
                  {podeExcluir && <button className="delete-notice-button" type="button" aria-label={`Excluir ${aviso.titulo}`} disabled={excluindoId !== null} onClick={() => removerAviso(aviso)}><Trash2 size={15} strokeWidth={1.6} /></button>}
                </div>
              </article>)}
          </section>}
          {listagemAdministrativaSegura && !carregando && !erro && avisos.length > 0 && avisosFiltrados.length === 0 && <p className="no-notices">Nenhum comunicado encontrado.</p>}
        </main>
      </div>
    </div>;
}

export default AvisosListagem;
