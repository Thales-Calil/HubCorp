import { useState } from 'react';
import { X } from 'lucide-react';
import './style.css';
function AtividadeGerenteModal({
  onFechar,
  onCriar
}) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [colaborador, setColaborador] = useState('Camila Santos');
  const [setor, setSetor] = useState('Comercial');
  const [prazo, setPrazo] = useState('');
  const [status, setStatus] = useState('Novo');
  const [observacao, setObservacao] = useState('');
  function criarAtividade() {
    if (!titulo || !prazo) {
      alert('Preencha o título e o prazo da atividade.');
      return;
    }
    const [ano, mes, dia] = prazo.split('-');
    onCriar({
      titulo,
      descricao,
      colaborador,
      iniciais: colaborador === 'Camila Santos' ? 'CS' : 'LO',
      setor,
      prazo: `${dia}/${mes}/${ano}`,
      status,
      observacao,
      progresso: 0
    });
  }
  return <div className="manager-modal-overlay" role="presentation" onMouseDown={onFechar}>
      <section className="manager-modal" role="dialog" aria-modal="true" aria-labelledby="manager-modal-title" onMouseDown={event => event.stopPropagation()}>
        <header><h2 id="manager-modal-title">Nova Atividade</h2><button type="button" onClick={onFechar} aria-label="Fechar"><X size={19} strokeWidth={1.7} /></button></header>
        <div className="manager-modal-body">
          <label className="manager-modal-full">Título <em>*</em><input value={titulo} onChange={event => setTitulo(event.target.value)} placeholder="Descreva a atividade..." /></label>
          <label className="manager-modal-full">Descrição<textarea value={descricao} onChange={event => setDescricao(event.target.value)} /></label>
          <div className="manager-modal-grid"><label>Colaborador<select value={colaborador} onChange={event => setColaborador(event.target.value)}><option>Camila Santos</option><option>Larissa Oliveira</option></select></label><label>Setor<select value={setor} onChange={event => setSetor(event.target.value)}><option>Comercial</option><option>Operações</option><option>Marketing</option><option>TI</option></select></label><label>Prazo <em>*</em><input type="date" value={prazo} onChange={event => setPrazo(event.target.value)} /></label><label>Status<select value={status} onChange={event => setStatus(event.target.value)}><option>Novo</option><option>Pendente</option><option>Em andamento</option><option>Concluído</option></select></label></div>
          <label className="manager-modal-note">Observação para o colaborador<textarea value={observacao} onChange={event => setObservacao(event.target.value)} placeholder="Instruções ou contexto adicional..." /></label>
          <div className="manager-modal-actions"><button type="button" className="manager-modal-cancel" onClick={onFechar}>Cancelar</button><button type="button" className="manager-modal-create" onClick={criarAtividade}>Criar atividade</button></div>
        </div>
      </section>
    </div>;
}
export default AtividadeGerenteModal;
