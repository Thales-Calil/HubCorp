import { useState } from 'react';
import { X } from 'lucide-react';
import './style.css';
function AtividadeRHModal({
  onFechar,
  onCriar
}) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState('Média');
  const [status, setStatus] = useState('Novo');
  const [prazo, setPrazo] = useState('');
  const [categoria, setCategoria] = useState('Documentação');
  function criarAtividade() {
    if (!titulo || !prazo) {
      alert('Preencha o título e o prazo da atividade.');
      return;
    }
    const [ano, mes, dia] = prazo.split('-');
    onCriar({
      titulo,
      descricao,
      prioridade,
      status,
      categoria,
      prazo: `${dia}/${mes}/${ano}`,
      responsavel: 'Fernanda Costa'
    });
  }
  return <div className="activity-modal-overlay" role="presentation" onMouseDown={onFechar}>
      <section className="activity-modal" role="dialog" aria-modal="true" aria-labelledby="activity-modal-title" onMouseDown={event => event.stopPropagation()}>
        <header><h2 id="activity-modal-title">Nova Atividade</h2><button type="button" onClick={onFechar} aria-label="Fechar"><X size={19} strokeWidth={1.7} /></button></header>
        <div className="activity-modal-body">
          <label className="activity-modal-full-field">Título <em>*</em><input value={titulo} onChange={event => setTitulo(event.target.value)} placeholder="Descreva a atividade..." /></label>
          <label className="activity-modal-full-field">Descrição<textarea value={descricao} onChange={event => setDescricao(event.target.value)} placeholder="Detalhes sobre a atividade..." /></label>
          <div className="activity-modal-grid">
            <label>Prioridade<select value={prioridade} onChange={event => setPrioridade(event.target.value)}><option>Alta</option><option>Média</option><option>Baixa</option></select></label>
            <label>Status<select value={status} onChange={event => setStatus(event.target.value)}><option>Novo</option><option>Pendente</option><option>Em andamento</option><option>Concluído</option></select></label>
            <label>Prazo <em>*</em><input type="date" value={prazo} onChange={event => setPrazo(event.target.value)} /></label>
            <label>Categoria<select value={categoria} onChange={event => setCategoria(event.target.value)}><option>Documentação</option><option>Recrutamento</option><option>Clima Organizacional</option><option>Admissão</option></select></label>
          </div>
          <div className="activity-modal-actions"><button type="button" className="activity-modal-cancel" onClick={onFechar}>Cancelar</button><button type="button" className="activity-modal-create" onClick={criarAtividade}>Criar atividade</button></div>
        </div>
      </section>
    </div>;
}
export default AtividadeRHModal;
