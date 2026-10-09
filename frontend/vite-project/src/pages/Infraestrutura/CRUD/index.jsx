import { useState } from 'react';
import { X } from 'lucide-react';
import './style.css';
function InfraestruturaModal({
  quantidade,
  onFechar,
  onCriar,
  usuario
}) {
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('Outros');
  const [prioridade, setPrioridade] = useState('Média');
  const [localizacao, setLocalizacao] = useState('');
  const [descricao, setDescricao] = useState('');
  const nomeSolicitante = usuario?.nome || 'Usuário';
  const iniciaisSolicitante = nomeSolicitante.split(' ').filter(Boolean).slice(0, 2).map(parte => parte[0]).join('').toUpperCase() || 'U';
  function enviarSolicitacao() {
    if (!titulo || !localizacao) {
      alert('Preencha o título e a localização da solicitação.');
      return;
    }
    onCriar({
      numero: `INF-2026-${49 + quantidade}`,
      titulo,
      tipo,
      prioridade,
      localizacao,
      descricao,
      solicitante: nomeSolicitante,
      iniciais: iniciaisSolicitante,
      status: 'Aberta',
      data: '15/08/2026'
    });
  }
  return <div className="infrastructure-modal-overlay" role="presentation" onMouseDown={onFechar}><section className="infrastructure-modal" role="dialog" aria-modal="true" aria-labelledby="infrastructure-modal-title" onMouseDown={event => event.stopPropagation()}><header><h2 id="infrastructure-modal-title">Nova Solicitação de Infraestrutura</h2><button type="button" onClick={onFechar} aria-label="Fechar"><X size={19} strokeWidth={1.7} /></button></header><div className="infrastructure-modal-body"><label className="infra-modal-full">Título <em>*</em><input value={titulo} onChange={event => setTitulo(event.target.value)} placeholder="Descreva brevemente o problema..." /></label><div className="infra-modal-grid"><label>Tipo<select value={tipo} onChange={event => setTipo(event.target.value)}><option>Elétrica</option><option>Hidráulica</option><option>TI</option><option>Climatização</option><option>Mobiliário</option><option>Outros</option></select></label><label>Prioridade<select value={prioridade} onChange={event => setPrioridade(event.target.value)}><option>Baixa</option><option>Média</option><option>Alta</option></select></label></div><label className="infra-modal-full">Localização <em>*</em><input value={localizacao} onChange={event => setLocalizacao(event.target.value)} placeholder="Ex: 3º Andar � Sala 302" /></label><label className="infra-modal-full">Descrição detalhada<textarea value={descricao} onChange={event => setDescricao(event.target.value)} placeholder="Descreva o problema com detalhes..." /></label><div className="infra-modal-actions"><button type="button" className="infra-modal-cancel" onClick={onFechar}>Cancelar</button><button type="button" className="infra-modal-submit" onClick={enviarSolicitacao}>Enviar solicitação</button></div></div></section></div>;
}
export default InfraestruturaModal;
