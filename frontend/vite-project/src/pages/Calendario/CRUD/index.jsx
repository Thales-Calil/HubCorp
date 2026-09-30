import { useState } from 'react';
import { X } from 'lucide-react';
import './style.css';
function EventoModal({
  onFechar,
  onCriar
}) {
  const [titulo, setTitulo] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [categoria, setCategoria] = useState('Reunião');
  const [setor, setSetor] = useState('Todos');
  const [local, setLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  function criarEvento() {
    if (!titulo || !data) {
      alert('Preencha o título e a data do evento.');
      return;
    }
    onCriar({
      titulo,
      data,
      horario,
      categoria,
      setor,
      local,
      descricao
    });
  }
  return <div className="event-modal-overlay" role="presentation" onMouseDown={onFechar}><section className="event-modal" role="dialog" aria-modal="true" aria-labelledby="event-modal-title" onMouseDown={event => event.stopPropagation()}><header><h2 id="event-modal-title">Novo Evento</h2><button type="button" onClick={onFechar} aria-label="Fechar"><X size={19} strokeWidth={1.7} /></button></header><div className="event-modal-body"><label className="event-modal-full">Título <em>*</em><input value={titulo} onChange={event => setTitulo(event.target.value)} placeholder="Ex: Reunião de planejamento Q4" /></label><div className="event-modal-grid"><label>Data <em>*</em><input type="date" value={data} onChange={event => setData(event.target.value)} /></label><label>Horário<input type="time" value={horario} onChange={event => setHorario(event.target.value)} /></label><label>Categoria<select value={categoria} onChange={event => setCategoria(event.target.value)}><option>Reunião</option><option>Feriado</option><option>Treinamento</option><option>Evento Social</option></select></label><label>Setor<select value={setor} onChange={event => setSetor(event.target.value)}><option>Todos</option><option>Comercial</option><option>Operações</option><option>Marketing</option><option>TI</option><option>Recursos Humanos</option></select></label></div><label className="event-modal-full">Local<input value={local} onChange={event => setLocal(event.target.value)} placeholder="Ex: Sala de Reuniões A � 4º Andar" /></label><label className="event-modal-full">Descrição<textarea value={descricao} onChange={event => setDescricao(event.target.value)} placeholder="Detalhes sobre o evento..." /></label><div className="event-modal-actions"><button type="button" className="event-modal-cancel" onClick={onFechar}>Cancelar</button><button type="button" className="event-modal-create" onClick={criarEvento}>Criar evento</button></div></div></section></div>;
}
export default EventoModal;
