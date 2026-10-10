import { useEffect, useState } from 'react';
import { ListPlus, Plus, Trash2 } from 'lucide-react';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import { temPermissao } from '../../../config/permissoes';
import { ApiError } from '../../../services/api';
import { atualizarFormulario, buscarFormulario, criarFormularioCompleto } from '../../../services/formularioService';
import { listarPerguntas } from '../../../services/perguntaService';
import './style.css';

const tiposDePergunta = [{ valor: 'TEXTO', nome: 'Texto' }, { valor: 'NUMERO', nome: 'Número' }, { valor: 'SIM_NAO', nome: 'Sim ou Não' }, { valor: 'ESCALA', nome: 'Escala de 1 a 5' }, { valor: 'MULTIPLA_ESCOLHA', nome: 'Múltipla Escolha' }];

function novaPergunta() {
  return {
    chave: `${Date.now()}-${Math.random()}`,
    titulo: '',
    tipo: 'TEXTO',
    opcoes: ['', '']
  };
}

function nomeDoTipo(tipo) {
  return tiposDePergunta.find(item => item.valor === tipo)?.nome || tipo;
}

function mensagemDeErro(error, operacao) {
  if (error instanceof ApiError && error.status === 403) {
    return 'Acesso negado. Você não possui permissão para esta operação.';
  }

  if (error instanceof ApiError && error.status === 0) {
    return 'Não foi possível conectar à API.';
  }

  return `Não foi possível ${operacao}.`;
}

function FormulariosCRUD({
  formularioId,
  onCancelar,
  onConcluido,
  onNavigate,
  onLogout,
  onSessionExpired,
  token,
  usuario
}) {
  const editando = Boolean(formularioId);
  const podeGerenciar = temPermissao(usuario?.userType, 'GERENCIAR_FORMULARIOS');
  const [titulo, setTitulo] = useState('');
  const [ativo, setAtivo] = useState(true);
  const [perguntas, setPerguntas] = useState([novaPergunta()]);
  const [perguntasExistentes, setPerguntasExistentes] = useState([]);
  const [carregando, setCarregando] = useState(editando);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    let ativoNoComponente = true;

    if (!editando) return undefined;

    async function carregarFormulario() {
      try {
        const [formulario, todasPerguntas] = await Promise.all([
          buscarFormulario(formularioId, token),
          listarPerguntas(token)
        ]);

        if (!ativoNoComponente) return;

        setTitulo(formulario.titulo || '');
        setAtivo(formulario.ativo === true);
        setPerguntasExistentes((Array.isArray(todasPerguntas) ? todasPerguntas : []).filter(pergunta => Number(pergunta.formularioId) === Number(formularioId)).sort((primeira, segunda) => primeira.ordem - segunda.ordem));
      } catch (error) {
        if (!ativoNoComponente) return;

        if (error instanceof ApiError && error.status === 401) {
          onSessionExpired();
          return;
        }

        setMensagem(mensagemDeErro(error, 'carregar o formulário'));
      } finally {
        if (ativoNoComponente) setCarregando(false);
      }
    }

    carregarFormulario();

    return () => {
      ativoNoComponente = false;
    };
  }, [editando, formularioId, onSessionExpired, token]);

  const perguntasDaPrevia = editando ? perguntasExistentes : perguntas;

  function atualizarPergunta(chave, campo, valor) {
    setPerguntas(lista => lista.map(pergunta => pergunta.chave === chave ? { ...pergunta, [campo]: valor } : pergunta));
  }

  function atualizarOpcao(chave, indice, valor) {
    setPerguntas(lista => lista.map(pergunta => {
      if (pergunta.chave !== chave) return pergunta;
      return { ...pergunta, opcoes: pergunta.opcoes.map((opcao, posicao) => posicao === indice ? valor : opcao) };
    }));
  }

  function adicionarOpcao(chave) {
    setPerguntas(lista => lista.map(pergunta => pergunta.chave === chave ? { ...pergunta, opcoes: [...pergunta.opcoes, ''] } : pergunta));
  }

  function removerOpcao(chave, indice) {
    setPerguntas(lista => lista.map(pergunta => pergunta.chave === chave ? { ...pergunta, opcoes: pergunta.opcoes.filter((_, posicao) => posicao !== indice) } : pergunta));
  }

  function removerPergunta(chave) {
    setPerguntas(lista => lista.filter(pergunta => pergunta.chave !== chave));
  }

  function prepararPerguntas() {
    if (perguntas.length === 0) {
      setMensagem('Adicione ao menos uma pergunta ao formulário.');
      return null;
    }

    const perguntasPreparadas = [];

    for (let indice = 0; indice < perguntas.length; indice += 1) {
      const pergunta = perguntas[indice];
      const tituloPergunta = pergunta.titulo.trim();

      if (!tituloPergunta) {
        setMensagem(`Informe o texto da pergunta ${indice + 1}.`);
        return null;
      }

      const perguntaPreparada = {
        titulo: tituloPergunta,
        tipo: pergunta.tipo,
        ordem: indice + 1
      };

      if (pergunta.tipo === 'MULTIPLA_ESCOLHA') {
        const opcoes = pergunta.opcoes.map(opcao => opcao.trim()).filter(Boolean);

        if (opcoes.length < 2) {
          setMensagem(`Cadastre ao menos duas opções na pergunta ${indice + 1}.`);
          return null;
        }

        perguntaPreparada.opcoes = opcoes;
      }

      perguntasPreparadas.push(perguntaPreparada);
    }

    return perguntasPreparadas;
  }

  async function salvarFormulario() {
    setMensagem('');

    if (!podeGerenciar) {
      setMensagem('Acesso negado. Você não possui permissão para esta operação.');
      return;
    }

    if (!titulo.trim()) {
      setMensagem('Informe o título do formulário.');
      return;
    }

    const perguntasPreparadas = editando ? null : prepararPerguntas();
    if (!editando && !perguntasPreparadas) return;

    setSalvando(true);

    try {
      if (editando) {
        await atualizarFormulario(formularioId, { titulo: titulo.trim(), ativo }, token);
        onConcluido('Formulário atualizado com sucesso.');
      } else {
        await criarFormularioCompleto({ titulo: titulo.trim(), ativo, perguntas: perguntasPreparadas }, token);
        onConcluido('Formulário criado com sucesso.');
      }
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        onSessionExpired();
        return;
      }

      if (!editando) {
        if (error instanceof ApiError && (error.status === 0 || error.status === 403)) {
          setMensagem(mensagemDeErro(error, 'criar o formulário'));
          return;
        }

        setMensagem('A criação falhou. O backend pode ter salvo o formulário ou algumas perguntas; não reenvie sem verificar a listagem.');
        return;
      }

      setMensagem(mensagemDeErro(error, 'atualizar o formulário'));
    } finally {
      setSalvando(false);
    }
  }

  return <div className="form-crud-page">
      <Sidebar activeItem="Formulários" isOpen={menuAberto} onClose={() => setMenuAberto(false)} onNavigate={onNavigate} usuario={usuario} />
      {menuAberto && <button className="form-crud-sidebar-overlay" type="button" onClick={() => setMenuAberto(false)} aria-label="Fechar menu" />}
      <div className="form-crud-workspace">
        <Header title="Formulários" onMenuClick={() => setMenuAberto(!menuAberto)} onLogout={onLogout} usuario={usuario} />
        <main className="form-crud-content">
          <section className="form-crud-heading"><h2>{editando ? 'Editar Formulário' : 'Novo Formulário'}</h2><p>{editando ? 'Atualize os dados que o backend permite alterar.' : 'Cadastre o formulário e suas perguntas.'}</p></section>
          <div className="form-crud-layout">
            <section className="form-editor-column">
              <section className="form-editor-card">
                <h3>Dados do formulário</h3>
                <div className="form-editor-grid"><label>Título <em>*</em><input disabled={carregando || salvando || !podeGerenciar} value={titulo} onChange={event => setTitulo(event.target.value)} placeholder="Ex: Pesquisa de clima organizacional" /></label><label>Status<select disabled={carregando || salvando || !podeGerenciar} value={ativo ? 'true' : 'false'} onChange={event => setAtivo(event.target.value === 'true')}><option value="true">Ativo</option><option value="false">Inativo</option></select></label></div>
              </section>

              {!editando && <section className="form-editor-card">
                  <div className="form-card-title"><div><h3>Perguntas</h3><p>Defina a ordem e o tipo de cada pergunta.</p></div><button className="add-question-button" type="button" disabled={salvando || !podeGerenciar} onClick={() => setPerguntas(lista => [...lista, novaPergunta()])}><Plus size={15} strokeWidth={1.8} /> Adicionar</button></div>
                  <div className="question-editor-list">{perguntas.map((pergunta, indice) => <article className="question-editor" key={pergunta.chave}>
                        <div className="question-editor-heading"><strong>Pergunta {indice + 1}</strong><button type="button" disabled={salvando || !podeGerenciar} onClick={() => removerPergunta(pergunta.chave)} aria-label={`Remover pergunta ${indice + 1}`}><Trash2 size={15} strokeWidth={1.6} /></button></div>
                        <label>Texto <em>*</em><input disabled={salvando || !podeGerenciar} value={pergunta.titulo} onChange={event => atualizarPergunta(pergunta.chave, 'titulo', event.target.value)} placeholder="Escreva a pergunta" /></label>
                        <label>Tipo<select disabled={salvando || !podeGerenciar} value={pergunta.tipo} onChange={event => atualizarPergunta(pergunta.chave, 'tipo', event.target.value)}>{tiposDePergunta.map(tipo => <option key={tipo.valor} value={tipo.valor}>{tipo.nome}</option>)}</select></label>
                        {pergunta.tipo === 'MULTIPLA_ESCOLHA' && <div className="question-options"><span>Opções <em>*</em></span>{pergunta.opcoes.map((opcao, opcaoIndice) => <div key={`${pergunta.chave}-${opcaoIndice}`}><input disabled={salvando || !podeGerenciar} value={opcao} onChange={event => atualizarOpcao(pergunta.chave, opcaoIndice, event.target.value)} placeholder={`Opção ${opcaoIndice + 1}`} /><button type="button" disabled={salvando || !podeGerenciar || pergunta.opcoes.length <= 2} onClick={() => removerOpcao(pergunta.chave, opcaoIndice)} aria-label={`Remover opção ${opcaoIndice + 1}`}><Trash2 size={14} strokeWidth={1.6} /></button></div>)}<button className="add-option-button" type="button" disabled={salvando || !podeGerenciar} onClick={() => adicionarOpcao(pergunta.chave)}><ListPlus size={14} strokeWidth={1.7} /> Adicionar opção</button></div>}
                      </article>)}</div>
                </section>}

              {editando && <section className="form-editor-card question-readonly-card"><h3>Perguntas existentes</h3><p>O backend atual permite editar título e status do formulário, mas não atualiza opções de perguntas de forma segura. Por isso, as perguntas ficam somente para consulta.</p>{carregando && <p>Carregando perguntas...</p>}{!carregando && perguntasExistentes.length === 0 && <p>Nenhuma pergunta cadastrada.</p>}{perguntasExistentes.map(pergunta => <div className="readonly-question" key={pergunta.id}><strong>{pergunta.ordem}. {pergunta.titulo}</strong><span>{nomeDoTipo(pergunta.tipo)}</span>{pergunta.tipo === 'MULTIPLA_ESCOLHA' && Array.isArray(pergunta.opcoes) && <small>Opções: {pergunta.opcoes.join(', ')}</small>}</div>)}</section>}

              {mensagem && <p className="form-crud-message" role="alert">{mensagem}</p>}
              <div className="form-crud-actions"><button className="form-cancel-button" type="button" disabled={salvando} onClick={onCancelar}>Cancelar</button><button className="form-save-button" type="button" disabled={carregando || salvando || !podeGerenciar} onClick={salvarFormulario}>{salvando ? editando ? 'Salvando...' : 'Criando...' : editando ? 'Salvar alterações' : 'Criar formulário'}</button></div>
            </section>

            <aside className="form-preview-column"><p className="form-preview-title">Pré-visualização</p><section className="form-preview-card"><h3>{titulo || 'Título do formulário'}</h3><span className={ativo ? 'form-preview-status is-active' : 'form-preview-status'}>{ativo ? 'Ativo' : 'Inativo'}</span><div>{perguntasDaPrevia.length === 0 && <p>Nenhuma pergunta cadastrada.</p>}{perguntasDaPrevia.map((pergunta, indice) => <article key={pergunta.id || pergunta.chave || indice}><strong>{indice + 1}. {pergunta.titulo || 'Pergunta sem texto'}</strong><small>{nomeDoTipo(pergunta.tipo)}</small></article>)}</div></section></aside>
          </div>
        </main>
      </div>
    </div>;
}

export default FormulariosCRUD;
