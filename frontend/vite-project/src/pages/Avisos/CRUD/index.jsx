import { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import { temPermissao } from '../../../config/permissoes';
import { ApiError } from '../../../services/api';
import {
  atualizarNotificacao,
  atualizarSetoresNotificacao,
  buscarNotificacao,
  criarNotificacao
} from '../../../services/notificacaoService';
import { listarSetores } from '../../../services/setorService';
import './style.css';

function setoresDaNotificacao(notificacao) {
  const setores = notificacao?.Sectors || notificacao?.setores || [];
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

function AvisosCRUD({
  notificacaoId,
  onCancelar,
  onConcluido,
  onNavigate,
  onLogout,
  onSessionExpired,
  token,
  usuario
}) {
  const editando = Boolean(notificacaoId);
  const podeCriar = temPermissao(usuario?.userType, 'CRIAR_NOTIFICACAO');
  const podeEditar = temPermissao(usuario?.userType, 'EDITAR_NOTIFICACAO');
  const podeConsultarSetores = temPermissao(usuario?.userType, 'GERENCIAR_SETORES');
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [setorId, setSetorId] = useState('');
  const [setores, setSetores] = useState([]);
  const [setoresOriginais, setSetoresOriginais] = useState([]);
  const [multiplosSetores, setMultiplosSetores] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [carregandoDados, setCarregandoDados] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    let ativo = true;

    if (!podeConsultarSetores) {
      return undefined;
    }

    async function carregarFormulario() {
      setCarregandoDados(true);
      setMensagem('');

      try {
        const requisicoes = [listarSetores(token)];

        if (editando) {
          requisicoes.push(buscarNotificacao(notificacaoId, token));
        }

        const [setoresDaApi, notificacaoDaApi] = await Promise.all(requisicoes);

        if (!ativo) return;

        setSetores(Array.isArray(setoresDaApi) ? setoresDaApi : []);

        if (notificacaoDaApi) {
          const setoresAssociados = setoresDaNotificacao(notificacaoDaApi);
          const idsDosSetores = setoresAssociados.map(setor => String(setor.id));

          setTitulo(notificacaoDaApi.titulo || '');
          setConteudo(notificacaoDaApi.descricao || '');
          setSetoresOriginais(idsDosSetores);
          setMultiplosSetores(idsDosSetores.length > 1);
          setSetorId(idsDosSetores.length === 1 ? idsDosSetores[0] : '');
        }
      } catch (error) {
        if (!ativo) return;

        if (error instanceof ApiError && error.status === 401) {
          onSessionExpired();
          return;
        }

        setMensagem(mensagemDeErro(error, editando ? 'carregar o comunicado' : 'carregar os setores'));
      } finally {
        if (ativo) setCarregandoDados(false);
      }
    }

    carregarFormulario();

    return () => {
      ativo = false;
    };
  }, [editando, notificacaoId, onSessionExpired, podeConsultarSetores, token]);

  const setorSelecionado = setores.find(setor => String(setor.id) === setorId);
  const podeSalvar = editando ? podeEditar : podeCriar;
  const setorFoiAlterado = !multiplosSetores && setorId !== (setoresOriginais[0] || '');
  const destinatariosDisponiveis = podeConsultarSetores && !multiplosSetores && setores.length > 0;
  const dadosEmCarregamento = podeConsultarSetores && carregandoDados;
  const mensagemVisivel = mensagem || (!podeConsultarSetores
    ? 'A publicação depende de setores reais, mas este perfil não possui permissão para consultá-los.'
    : '');

  async function salvarAviso() {
    setMensagem('');

    if (!podeSalvar) {
      setMensagem('Você não possui permissão para esta operação.');
      return;
    }

    if (!podeConsultarSetores) {
      setMensagem('Operação não disponível por ausência de contrato seguro para consultar os setores destinatários.');
      return;
    }

    if (!titulo.trim() || !conteudo.trim()) {
      setMensagem('Preencha o título e o conteúdo do comunicado.');
      return;
    }

    if (!editando && !setorId) {
      setMensagem('Selecione um setor destinatário real para publicar o comunicado.');
      return;
    }

    if (!editando && !usuario?.id) {
      setMensagem('Não foi possível identificar o autor autenticado do comunicado.');
      return;
    }

    if (editando && setorFoiAlterado && !setorId) {
      setMensagem('A remoção de destinatários não possui contrato seguro nesta tela. Selecione um setor real.');
      return;
    }

    setSalvando(true);
    let setoresAtualizados = false;

    try {
      if (editando) {
        if (setorFoiAlterado) {
          await atualizarSetoresNotificacao(notificacaoId, [Number(setorId)], token);
          setoresAtualizados = true;
        }

        await atualizarNotificacao(notificacaoId, {
          titulo: titulo.trim(),
          descricao: conteudo.trim()
        }, token);

        onConcluido('Comunicado atualizado com sucesso.');
      } else {
        await criarNotificacao({
          titulo: titulo.trim(),
          descricao: conteudo.trim(),
          autorId: usuario?.id,
          setores: [Number(setorId)]
        }, token);

        onConcluido('Comunicado publicado com sucesso.');
      }
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        onSessionExpired();
        return;
      }

      if (setoresAtualizados) {
        setMensagem('Destinatários atualizados, mas não foi possível salvar o conteúdo do comunicado.');
        return;
      }

      setMensagem(mensagemDeErro(error, editando ? 'atualizar o comunicado' : 'publicar o comunicado'));
    } finally {
      setSalvando(false);
    }
  }

  const descricaoDoSetor = multiplosSetores
    ? 'Este comunicado possui múltiplos setores. A alteração de destinatários exige um contrato específico para edição múltipla.'
    : !podeConsultarSetores
      ? 'A consulta de setores é restrita a RH no backend atual.'
      : 'Somente IDs reais de setores são enviados para a API.';

  return <div className="aviso-crud-page">
      <Sidebar activeItem="Avisos e Comunicados" isOpen={menuAberto} onClose={() => setMenuAberto(false)} onNavigate={onNavigate} usuario={usuario} />
      {menuAberto && <button className="aviso-crud-sidebar-overlay" type="button" onClick={() => setMenuAberto(false)} aria-label="Fechar menu" />}

      <div className="aviso-crud-workspace">
        <Header title="Avisos e Comunicados" onMenuClick={() => setMenuAberto(!menuAberto)} onLogout={onLogout} usuario={usuario} />
        <main className="aviso-crud-content">
          <section className="aviso-crud-heading">
            <h2>{editando ? 'Editar Aviso' : 'Novo Aviso'}</h2>
            <p>{editando ? 'Atualize as informações suportadas pela API de comunicados' : 'Preencha as informações para publicar um comunicado'}</p>
          </section>

          <div className="aviso-crud-layout">
            <section className="aviso-form-card">
              <div className="aviso-form-grid">
                <label>Categoria <small>Não persistida pela API</small><select disabled value=""><option>Categoria indisponível</option></select></label>
                <label>Setor destinatário <em>*</em><small>{descricaoDoSetor}</small><select value={setorId} disabled={!destinatariosDisponiveis || dadosEmCarregamento} onChange={event => setSetorId(event.target.value)}><option value="">{dadosEmCarregamento ? 'Carregando setores...' : multiplosSetores ? 'Múltiplos setores associados' : setores.length === 0 ? 'Nenhum setor disponível' : 'Selecione um setor'}</option>{setores.map(setor => <option key={setor.id} value={setor.id}>{setor.nome}</option>)}</select></label>
              </div>

              <label className="aviso-full-field">Título <em>*</em><input value={titulo} disabled={!podeSalvar || !podeConsultarSetores || salvando} onChange={event => setTitulo(event.target.value)} placeholder="Ex: Comunicado importante" /></label>
              <label className="aviso-full-field">Conteúdo <em>*</em><textarea value={conteudo} disabled={!podeSalvar || !podeConsultarSetores || salvando} onChange={event => setConteudo(event.target.value)} placeholder="Escreva o comunicado para os setores selecionados..." /></label>

              <div className="aviso-form-grid aviso-full-field">
                <label className="aviso-date-field">Data de expiração <small>Não persistida pela API</small><input type="date" disabled value="" /></label>
              </div>

              {mensagemVisivel && <p className="aviso-form-message" role="alert">{mensagemVisivel}</p>}
              <div className="aviso-form-actions">
                <button className="aviso-cancel-button" type="button" disabled={salvando} onClick={onCancelar}>Cancelar</button>
                <button className="aviso-publish-button" type="button" disabled={salvando || dadosEmCarregamento || !podeSalvar || !podeConsultarSetores || (!editando && setores.length === 0)} onClick={salvarAviso}>{salvando ? editando ? 'Salvando alterações...' : 'Publicando...' : editando ? 'Salvar alterações' : 'Publicar aviso'}</button>
              </div>
            </section>

            <aside className="aviso-preview-column">
              <p className="aviso-preview-title">Pré-visualização</p>
              <section className="aviso-preview-card preview-geral">
                <div><h3>{titulo || 'Título do comunicado'}</h3><span>Comunicado</span></div>
                <p>{conteudo || 'O conteúdo do comunicado aparecerá aqui.'}</p>
              </section>
              <section className="publisher-card">
                <h3>Autor do comunicado</h3>
                <strong>{usuario?.nome || 'Usuário não identificado'}</strong>
                <p>{usuario?.cargo || 'Cargo não informado'}</p>
                {setorSelecionado && <p>Destinatário: {setorSelecionado.nome}</p>}
              </section>
            </aside>
          </div>
        </main>
      </div>
    </div>;
}

export default AvisosCRUD;
