import { useEffect, useState } from 'react';
import { ClipboardCheck } from 'lucide-react';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import { temPermissao } from '../../../config/permissoes';
import { ApiError } from '../../../services/api';
import { buscarFormulario } from '../../../services/formularioService';
import { listarPerguntas } from '../../../services/perguntaService';
import { listarFormulariosRespondidos, listarRespostas } from '../../../services/respostaService';
import './style.css';

function formatarData(data) {
  if (!data) return 'Data não disponível';

  const dataFormatada = new Date(data);
  return Number.isNaN(dataFormatada.getTime()) ? 'Data não disponível' : dataFormatada.toLocaleString('pt-BR');
}

function mensagemDeErro(error) {
  if (error instanceof ApiError && error.status === 403) {
    return 'Acesso negado. Você não possui permissão para consultar respostas.';
  }

  if (error instanceof ApiError && error.status === 0) {
    return 'Não foi possível conectar à API.';
  }

  return 'Não foi possível carregar as respostas.';
}

function FormulariosRespostas({
  formularioId,
  onNavigate,
  onLogout,
  onSessionExpired,
  onVoltar,
  token,
  usuario
}) {
  const [formulario, setFormulario] = useState(null);
  const [perguntas, setPerguntas] = useState([]);
  const [formulariosRespondidos, setFormulariosRespondidos] = useState([]);
  const [respostas, setRespostas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [menuAberto, setMenuAberto] = useState(false);
  const podeGerenciar = temPermissao(usuario?.userType, 'GERENCIAR_FORMULARIOS');

  useEffect(() => {
    let ativo = true;

    async function carregarRespostas() {
      setCarregando(true);
      setErro('');

      try {
        const [dadosFormulario, todasPerguntas, todosFormulariosRespondidos, todasRespostas] = await Promise.all([
          buscarFormulario(formularioId, token),
          listarPerguntas(token),
          listarFormulariosRespondidos(token),
          listarRespostas(token)
        ]);

        if (!ativo) return;

        setFormulario(dadosFormulario);
        setPerguntas((Array.isArray(todasPerguntas) ? todasPerguntas : []).filter(pergunta => Number(pergunta.formularioId) === Number(formularioId)).sort((primeira, segunda) => primeira.ordem - segunda.ordem));
        setFormulariosRespondidos((Array.isArray(todosFormulariosRespondidos) ? todosFormulariosRespondidos : []).filter(item => Number(item.formularioId) === Number(formularioId)));
        setRespostas(Array.isArray(todasRespostas) ? todasRespostas : []);
      } catch (error) {
        if (!ativo) return;

        if (error instanceof ApiError && error.status === 401) {
          onSessionExpired();
          return;
        }

        setErro(mensagemDeErro(error));
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarRespostas();

    return () => {
      ativo = false;
    };
  }, [formularioId, onSessionExpired, token]);

  const perguntasPorId = new Map(perguntas.map(pergunta => [Number(pergunta.id), pergunta]));
  const respostasPorFormularioRespondido = new Map();

  respostas.forEach(resposta => {
    const id = Number(resposta.formularioRespondidoId);
    if (!respostasPorFormularioRespondido.has(id)) respostasPorFormularioRespondido.set(id, []);
    respostasPorFormularioRespondido.get(id).push(resposta);
  });

  return <div className="form-responses-page">
      <Sidebar activeItem="Formulários" isOpen={menuAberto} onClose={() => setMenuAberto(false)} onNavigate={onNavigate} usuario={usuario} />
      {menuAberto && <button className="form-responses-sidebar-overlay" type="button" onClick={() => setMenuAberto(false)} aria-label="Fechar menu" />}
      <div className="form-responses-workspace">
        <Header title="Formulários" onMenuClick={() => setMenuAberto(!menuAberto)} onLogout={onLogout} usuario={usuario} />
        <main className="form-responses-content">
          <section className="form-responses-heading"><div><h2>Respostas do formulário</h2><p>{formulario?.titulo || 'Consulta administrativa das respostas registradas.'}</p></div><button type="button" onClick={onVoltar}>Voltar</button></section>
          {!podeGerenciar && <p className="responses-error" role="alert">Acesso negado. Você não possui permissão para consultar respostas.</p>}
          {carregando && <p className="responses-loading">Carregando respostas...</p>}
          {erro && <p className="responses-error" role="alert">{erro}</p>}
          {!carregando && !erro && podeGerenciar && formulariosRespondidos.length === 0 && <p className="responses-loading">Nenhuma resposta encontrada para este formulário.</p>}
          {!carregando && !erro && podeGerenciar && formulariosRespondidos.length > 0 && <section className="responses-list">{formulariosRespondidos.map(item => {
              const respostasDoRegistro = respostasPorFormularioRespondido.get(Number(item.id)) || [];
              return <article className="response-record-card" key={item.id}>
                  <header><span><ClipboardCheck size={18} strokeWidth={1.6} /></span><div><h3>Resposta #{item.id}</h3><p>Respondente: usuário #{item.usuarioId} · {formatarData(item.dataResposta)}</p></div></header>
                  <div className="response-values">{respostasDoRegistro.length === 0 && <p>Nenhuma resposta vinculada foi retornada pela API.</p>}{respostasDoRegistro.map(resposta => <div key={resposta.id}><strong>{perguntasPorId.get(Number(resposta.perguntaId))?.titulo || `Pergunta #${resposta.perguntaId}`}</strong><span>{resposta.valor}</span></div>)}</div>
                </article>;
            })}</section>}
        </main>
      </div>
    </div>;
}

export default FormulariosRespostas;
