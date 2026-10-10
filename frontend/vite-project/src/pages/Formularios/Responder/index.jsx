import { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import { temPermissao } from '../../../config/permissoes';
import { ApiError } from '../../../services/api';
import { buscarFormulario } from '../../../services/formularioService';
import { listarPerguntas } from '../../../services/perguntaService';
import { criarFormularioRespondido, criarResposta } from '../../../services/respostaService';
import './style.css';

function mensagemDeErro(error, operacao) {
  if (error instanceof ApiError && error.status === 403) {
    return 'Acesso negado. Você não possui permissão para esta operação.';
  }

  if (error instanceof ApiError && error.status === 0) {
    return 'Não foi possível conectar à API.';
  }

  return `Não foi possível ${operacao}.`;
}

function RespostaDaPergunta({ pergunta, valor, onChange, desabilitado }) {
  if (pergunta.tipo === 'TEXTO') {
    return <textarea disabled={desabilitado} value={valor || ''} onChange={event => onChange(event.target.value)} placeholder="Digite sua resposta" />;
  }

  if (pergunta.tipo === 'NUMERO') {
    return <input disabled={desabilitado} type="number" value={valor || ''} onChange={event => onChange(event.target.value)} placeholder="Informe um número" />;
  }

  if (pergunta.tipo === 'SIM_NAO') {
    return <div className="answer-options">{['SIM', 'NAO'].map(opcao => <label key={opcao}><input disabled={desabilitado} type="radio" name={`pergunta-${pergunta.id}`} value={opcao} checked={valor === opcao} onChange={event => onChange(event.target.value)} />{opcao === 'SIM' ? 'Sim' : 'Não'}</label>)}</div>;
  }

  if (pergunta.tipo === 'ESCALA') {
    return <div className="scale-options">{[1, 2, 3, 4, 5].map(opcao => <label key={opcao}><input disabled={desabilitado} type="radio" name={`pergunta-${pergunta.id}`} value={String(opcao)} checked={valor === String(opcao)} onChange={event => onChange(event.target.value)} /><span>{opcao}</span></label>)}</div>;
  }

  if (pergunta.tipo === 'MULTIPLA_ESCOLHA') {
    const opcoes = Array.isArray(pergunta.opcoes) ? pergunta.opcoes : [];
    return <div className="answer-options">{opcoes.map(opcao => <label key={opcao}><input disabled={desabilitado} type="radio" name={`pergunta-${pergunta.id}`} value={opcao} checked={valor === opcao} onChange={event => onChange(event.target.value)} />{opcao}</label>)}{opcoes.length === 0 && <p className="answer-contract-warning">Esta pergunta não possui opções válidas retornadas pela API.</p>}</div>;
  }

  return <p className="answer-contract-warning">Tipo de pergunta não reconhecido.</p>;
}

function FormulariosResponder({
  formularioId,
  onCancelar,
  onConcluido,
  onNavigate,
  onLogout,
  onSessionExpired,
  token,
  usuario
}) {
  const [formulario, setFormulario] = useState(null);
  const [perguntas, setPerguntas] = useState([]);
  const [respostas, setRespostas] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [menuAberto, setMenuAberto] = useState(false);
  const podeResponder = temPermissao(usuario?.userType, 'RESPONDER_FORMULARIO');

  useEffect(() => {
    let ativo = true;

    async function carregarFormulario() {
      setCarregando(true);
      setMensagem('');

      try {
        const [dadosFormulario, todasPerguntas] = await Promise.all([
          buscarFormulario(formularioId, token),
          listarPerguntas(token)
        ]);

        if (!ativo) return;

        setFormulario(dadosFormulario);
        setPerguntas((Array.isArray(todasPerguntas) ? todasPerguntas : []).filter(pergunta => Number(pergunta.formularioId) === Number(formularioId)).sort((primeira, segunda) => primeira.ordem - segunda.ordem));
      } catch (error) {
        if (!ativo) return;

        if (error instanceof ApiError && error.status === 401) {
          onSessionExpired();
          return;
        }

        setMensagem(mensagemDeErro(error, 'carregar o formulário'));
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarFormulario();

    return () => {
      ativo = false;
    };
  }, [formularioId, onSessionExpired, token]);

  function atualizarResposta(perguntaId, valor) {
    setRespostas(valores => ({ ...valores, [perguntaId]: valor }));
  }

  function respostasValidas() {
    if (!formulario?.ativo) {
      setMensagem('Este formulário está inativo e não pode ser respondido.');
      return false;
    }

    if (perguntas.length === 0) {
      setMensagem('Este formulário não possui perguntas disponíveis para resposta.');
      return false;
    }

    const perguntaSemResposta = perguntas.find(pergunta => !String(respostas[pergunta.id] || '').trim());
    if (perguntaSemResposta) {
      setMensagem(`Responda a pergunta ${perguntaSemResposta.ordem} antes de enviar.`);
      return false;
    }

    const perguntaComOpcaoInvalida = perguntas.find(pergunta => pergunta.tipo === 'MULTIPLA_ESCOLHA' && (!Array.isArray(pergunta.opcoes) || !pergunta.opcoes.includes(respostas[pergunta.id])));
    if (perguntaComOpcaoInvalida) {
      setMensagem(`A pergunta ${perguntaComOpcaoInvalida.ordem} não possui uma opção válida para envio.`);
      return false;
    }

    return true;
  }

  async function enviarRespostas() {
    setMensagem('');

    if (!podeResponder) {
      setMensagem('Acesso negado. Você não possui permissão para esta operação.');
      return;
    }

    if (!usuario?.id) {
      setMensagem('Não foi possível identificar o usuário autenticado.');
      return;
    }

    if (!respostasValidas()) return;

    setEnviando(true);
    let formularioRespondidoId = null;
    let respostasEnviadas = 0;

    try {
      const formularioRespondido = await criarFormularioRespondido({
        formularioId: Number(formularioId),
        usuarioId: usuario.id
      }, token);
      formularioRespondidoId = formularioRespondido?.id;

      if (!formularioRespondidoId) {
        throw new Error('Registro de formulário respondido sem identificador.');
      }

      for (const pergunta of perguntas) {
        await criarResposta({
          formularioRespondidoId,
          perguntaId: pergunta.id,
          valor: String(respostas[pergunta.id]).trim()
        }, token);
        respostasEnviadas += 1;
      }

      onConcluido('Respostas enviadas com sucesso.');
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        onSessionExpired();
        return;
      }

      if (formularioRespondidoId) {
        setMensagem(`O registro foi criado e ${respostasEnviadas} de ${perguntas.length} respostas foram enviadas. Pode haver salvamento parcial; não reenvie sem verificar com o RH.`);
        return;
      }

      setMensagem(mensagemDeErro(error, 'enviar as respostas'));
    } finally {
      setEnviando(false);
    }
  }

  const formularioInativo = formulario?.ativo === false;

  return <div className="answer-form-page">
      <Sidebar activeItem="Formulários" isOpen={menuAberto} onClose={() => setMenuAberto(false)} onNavigate={onNavigate} usuario={usuario} />
      {menuAberto && <button className="answer-form-sidebar-overlay" type="button" onClick={() => setMenuAberto(false)} aria-label="Fechar menu" />}
      <div className="answer-form-workspace">
        <Header title="Formulários" onMenuClick={() => setMenuAberto(!menuAberto)} onLogout={onLogout} usuario={usuario} />
        <main className="answer-form-content">
          <section className="answer-form-heading"><h2>{formulario?.titulo || 'Responder formulário'}</h2><p>Preencha todas as perguntas para enviar suas respostas.</p></section>
          {carregando && <p className="answer-loading">Carregando formulário...</p>}
          {mensagem && <p className="answer-error" role="alert">{mensagem}</p>}
          {!carregando && formularioInativo && <p className="answer-inactive-message">Este formulário está inativo e não aceita respostas.</p>}
          {!carregando && !mensagem && perguntas.length === 0 && <p className="answer-loading">Nenhuma pergunta encontrada para este formulário.</p>}
          {!carregando && formulario && perguntas.length > 0 && <section className="answer-form-card"><div className="answer-form-status">{formulario.ativo ? 'Formulário ativo' : 'Formulário inativo'}</div>{perguntas.map((pergunta, indice) => <article className="answer-question" key={pergunta.id}><div><strong>{indice + 1}. {pergunta.titulo}</strong><span>{pergunta.tipo === 'SIM_NAO' ? 'Sim ou Não' : pergunta.tipo === 'MULTIPLA_ESCOLHA' ? 'Múltipla Escolha' : pergunta.tipo === 'ESCALA' ? 'Escala de 1 a 5' : pergunta.tipo === 'NUMERO' ? 'Número' : 'Texto'}</span></div><RespostaDaPergunta pergunta={pergunta} valor={respostas[pergunta.id]} onChange={valor => atualizarResposta(pergunta.id, valor)} desabilitado={enviando || formularioInativo || !podeResponder} /></article>)}</section>}
          <div className="answer-form-actions"><button className="answer-cancel-button" type="button" disabled={enviando} onClick={onCancelar}>Cancelar</button><button className="answer-submit-button" type="button" disabled={carregando || enviando || formularioInativo || !podeResponder || perguntas.length === 0} onClick={enviarRespostas}>{enviando ? 'Enviando respostas...' : 'Enviar respostas'}</button></div>
        </main>
      </div>
    </div>;
}

export default FormulariosResponder;
