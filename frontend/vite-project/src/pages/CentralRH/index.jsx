import { useState } from 'react';
import { CircleAlert, Clock3, FileText, Lock, MessageSquare, Utensils } from 'lucide-react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import './style.css';
const indicadores = [{
  titulo: 'Novos relatos',
  valor: '1',
  icone: CircleAlert,
  classe: 'rh-blue'
}, {
  titulo: 'Sugestões pendentes',
  valor: '1',
  icone: Utensils,
  classe: 'rh-peach'
}, {
  titulo: 'Solicitações abertas',
  valor: '1',
  icone: FileText,
  classe: 'rh-blue'
}, {
  titulo: 'Comunicados de RH',
  valor: '1',
  icone: MessageSquare,
  classe: 'rh-green'
}];
const atividades = [{
  titulo: 'Revisar e atualizar descrições de cargos',
  status: 'Em andamento',
  classe: 'rh-status-progress'
}, {
  titulo: 'Organizar processo seletivo � Analista Financeiro Jr.',
  status: 'Novo',
  classe: 'rh-status-new'
}, {
  titulo: 'Aplicar pesquisa de clima organizacional',
  status: 'Pendente',
  classe: 'rh-status-pending'
}];
const relatos = [{
  titulo: 'Assédio moral no ambiente de trabalho',
  status: 'Em análise',
  classe: 'rh-status-progress',
  icone: CircleAlert,
  cor: 'rh-item-peach',
  anonimo: true
}, {
  titulo: 'Flexibilização do horário de entrada',
  status: 'Novo',
  classe: 'rh-status-new',
  icone: CircleAlert,
  cor: 'rh-item-blue'
}, {
  titulo: 'Reconhecimento à equipe de RH',
  status: 'Respondido',
  classe: 'rh-status-answered',
  icone: CircleAlert,
  cor: 'rh-item-green'
}];
const sugestoes = [{
  titulo: 'Adicionar opção vegetariana diariamente',
  status: 'Em análise',
  classe: 'rh-status-progress',
  icone: Utensils,
  cor: 'rh-item-peach'
}, {
  titulo: 'Ampliar variedade de frutas no café da manhã',
  status: 'Novo',
  classe: 'rh-status-new',
  icone: Utensils,
  cor: 'rh-item-blue'
}];
const solicitacoes = [{
  titulo: 'Solicitação de segunda via de crachá',
  status: 'Em andamento',
  classe: 'rh-status-progress',
  icone: FileText,
  cor: 'rh-item-peach'
}, {
  titulo: 'Atualização de dados cadastrais',
  status: 'Novo',
  classe: 'rh-status-new',
  icone: FileText,
  cor: 'rh-item-blue'
}, {
  titulo: 'Solicitação de declaração de vínculo',
  status: 'Respondido',
  classe: 'rh-status-answered',
  icone: FileText,
  cor: 'rh-item-green'
}];
const comunicados = ['Atualização da política de home office � vigência imediata'];
const abas = [{
  id: 'relatos',
  titulo: 'Relatos Anônimos',
  quantidade: 3
}, {
  id: 'sugestoes',
  titulo: 'Sugestões para o Refeitório',
  quantidade: 2
}, {
  id: 'solicitacoes',
  titulo: 'Solicitações Recebidas',
  quantidade: 3
}];
function CentralRH({
  onNavigate,
  onLogout,
  usuario
}) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [abaSelecionada, setAbaSelecionada] = useState('relatos');
  const itensDaAba = abaSelecionada === 'relatos' ? relatos : abaSelecionada === 'sugestoes' ? sugestoes : solicitacoes;
  return <div className="central-rh-page">
      <Sidebar activeItem="Central do RH" isOpen={menuAberto} onClose={() => setMenuAberto(false)} onNavigate={onNavigate} usuario={usuario} />
      {menuAberto && <button className="central-rh-sidebar-overlay" type="button" onClick={() => setMenuAberto(false)} aria-label="Fechar menu" />}
      <div className="central-rh-workspace">
        <Header title="Central do RH" onMenuClick={() => setMenuAberto(!menuAberto)} onLogout={onLogout} usuario={usuario} />
        <main className="central-rh-content">
          <section className="central-rh-intro">
            <div><h2>Central do RH</h2><p>Monitoramento de relatos, sugestões e solicitações recebidas</p></div>
            <button type="button" className="rh-activities-button">Ver atividades <span>� </span></button>
          </section>

          <section className="rh-indicators-grid">
            {indicadores.map(({
            titulo,
            valor,
            icone: Icon,
            classe
          }) => <article className="rh-indicator-card" key={titulo}>
                <span className={`rh-indicator-icon ${classe}`}><Icon size={21} strokeWidth={1.7} /></span>
                <div><p>{titulo}</p><strong>{valor}</strong></div>
              </article>)}
          </section>

          <section className="rh-panel rh-activities-panel">
            <div className="rh-panel-heading"><h3>�altimas atividades do RH</h3><button type="button">Ver todas <span>� </span></button></div>
            <div className="rh-activity-list">
              {atividades.map(atividade => <div className="rh-activity-item" key={atividade.titulo}>
                  <span className="rh-activity-icon"><Clock3 size={15} strokeWidth={1.7} /></span>
                  <p>{atividade.titulo}</p><small className={atividade.classe}>{atividade.status}</small>
                </div>)}
            </div>
          </section>

          <section className="rh-tabs-section">
            <div className="rh-tabs" role="tablist" aria-label="Registros da Central do RH">
              {abas.map(aba => <button key={aba.id} type="button" role="tab" aria-selected={abaSelecionada === aba.id} className={abaSelecionada === aba.id ? 'rh-tab-active' : ''} onClick={() => setAbaSelecionada(aba.id)}>
                  {aba.titulo}<span>{aba.quantidade}</span>
                </button>)}
            </div>
            <article className="rh-panel rh-records-panel">
              {itensDaAba.map(({
              titulo,
              status,
              classe,
              icone: Icon,
              cor,
              anonimo
            }) => <div className="rh-record-item" key={titulo}>
                  <span className={`rh-record-icon ${cor}`}><Icon size={16} strokeWidth={1.7} /></span>
                  <div><p>{titulo}</p>{anonimo && <Lock className="rh-lock" size={13} strokeWidth={1.6} />}</div>
                  <small className={classe}>{status}</small>
                </div>)}
            </article>
          </section>

          <section className="rh-communications-section">
            <div className="rh-panel-heading"><h3>Comunicados de RH recentes</h3><button type="button">Ver todos <span>� </span></button></div>
            <div className="rh-communications-list">
              {comunicados.map(comunicado => <article className="rh-communication-card" key={comunicado}>{comunicado}</article>)}
            </div>
          </section>
        </main>
      </div>
    </div>;
}
export default CentralRH;
