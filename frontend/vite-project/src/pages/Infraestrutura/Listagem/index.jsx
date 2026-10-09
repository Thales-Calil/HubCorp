import { useState } from 'react';
import { Eye, Plus } from 'lucide-react';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import InfraestruturaModal from '../CRUD';
import './style.css';
const solicitacoesIniciais = [{
  numero: 'INF-2026-047',
  titulo: 'Ar-condicionado com defeito na sala 302',
  solicitante: 'Camila',
  iniciais: 'CS',
  tipo: 'Outros',
  prioridade: 'Alta',
  status: 'Em andamento',
  data: '12/08/2026'
}, {
  numero: 'INF-2026-046',
  titulo: 'Lâmpada queimada no corredor do 1º andar',
  solicitante: 'Patrícia',
  iniciais: 'PM',
  tipo: 'Elétrica',
  prioridade: 'Baixa',
  status: 'Concluída',
  data: '10/08/2026'
}, {
  numero: 'INF-2026-048',
  titulo: 'Vazamento na torneira do banheiro masculino',
  solicitante: 'Bruno',
  iniciais: 'BR',
  tipo: 'Hidráulica',
  prioridade: 'Média',
  status: 'Aberta',
  data: '14/08/2026'
}, {
  numero: 'INF-2026-045',
  titulo: 'Impressora da TI sem conectividade',
  solicitante: 'Ricardo',
  iniciais: 'RA',
  tipo: 'TI',
  prioridade: 'Alta',
  status: 'Aceita',
  data: '09/08/2026'
}];
const filtros = ['Todos', 'Aberta', 'Aceita', 'Em andamento', 'Concluída', 'Cancelada'];
function classePrioridade(prioridade) {
  return prioridade === 'Alta' ? 'infra-priority-high' : prioridade === 'Média' ? 'infra-priority-medium' : 'infra-priority-low';
}
function classeStatus(status) {
  if (status === 'Concluída') return 'infra-status-done';
  if (status === 'Em andamento') return 'infra-status-progress';
  if (status === 'Cancelada') return 'infra-status-canceled';
  return 'infra-status-open';
}
function classeAvatar(iniciais) {
  return iniciais === 'RA' ? 'avatar-ra' : iniciais === 'PM' ? 'avatar-pm' : 'avatar-blue';
}
function InfraestruturaListagem({
  onNavigate,
  onLogout,
  usuario
}) {
  const [busca, setBusca] = useState('');
  const [statusSelecionado, setStatusSelecionado] = useState('Todos');
  const [modalAberto, setModalAberto] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [solicitacoes, setSolicitacoes] = useState(solicitacoesIniciais);
  const solicitacoesFiltradas = solicitacoes.filter(solicitacao => {
    const texto = busca.toLowerCase();
    return solicitacao.titulo.toLowerCase().includes(texto) && (statusSelecionado === 'Todos' || solicitacao.status === statusSelecionado) || solicitacao.numero.toLowerCase().includes(texto) && (statusSelecionado === 'Todos' || solicitacao.status === statusSelecionado);
  });
  function criarSolicitacao(novaSolicitacao) {
    setSolicitacoes([...solicitacoes, novaSolicitacao]);
    setModalAberto(false);
  }
  return <div className="infrastructure-page">
      <Sidebar activeItem="Infraestrutura" isOpen={menuAberto} onClose={() => setMenuAberto(false)} onNavigate={onNavigate} usuario={usuario} />
      {menuAberto && <button className="infrastructure-sidebar-overlay" type="button" onClick={() => setMenuAberto(false)} aria-label="Fechar menu" />}
      <div className="infrastructure-workspace"><Header title="Solicitações de Infraestrutura" onMenuClick={() => setMenuAberto(!menuAberto)} onLogout={onLogout} usuario={usuario} />
        <main className="infrastructure-content">
          <section className="infrastructure-heading"><div><h2>Solicitações de Infraestrutura</h2><p>Registro e acompanhamento de demandas de manutenção e instalações</p></div><button type="button" className="new-request-button" onClick={() => setModalAberto(true)}><Plus size={17} strokeWidth={1.8} /> Nova Solicitação</button></section>
          <section className="infrastructure-filters"><label className="infrastructure-search"><input value={busca} onChange={event => setBusca(event.target.value)} placeholder="Buscar por título ou nº..." /></label><div className="infrastructure-status-filters">{filtros.map(filtro => <button type="button" className={statusSelecionado === filtro ? 'infra-filter-selected' : ''} key={filtro} onClick={() => setStatusSelecionado(filtro)}>{filtro}</button>)}</div></section>
          <section className="infrastructure-table-wrap"><table className="infrastructure-table"><thead><tr><th>Nº</th><th>Título</th><th>Solicitante</th><th>Tipo</th><th>Prioridade</th><th>Status</th><th>Data</th><th>Ações</th></tr></thead><tbody>{solicitacoesFiltradas.map(solicitacao => <tr key={solicitacao.numero}><td className="request-number">{solicitacao.numero}</td><td className="request-title">{solicitacao.titulo}</td><td><div className="requester"><span className={classeAvatar(solicitacao.iniciais)}>{solicitacao.iniciais}</span>{solicitacao.solicitante}</div></td><td>{solicitacao.tipo}</td><td><span className={`infra-priority ${classePrioridade(solicitacao.prioridade)}`}>{solicitacao.prioridade}</span></td><td><span className={`infra-status ${classeStatus(solicitacao.status)}`}>{solicitacao.status}</span></td><td>{solicitacao.data}</td><td><button type="button" className="view-request"><Eye size={14} strokeWidth={1.6} /> Ver</button></td></tr>)}</tbody></table>{solicitacoesFiltradas.length === 0 && <p className="no-infrastructure-requests">Nenhuma solicitação encontrada.</p>}</section>
        </main>
      </div>
      {modalAberto && <InfraestruturaModal quantidade={solicitacoes.length} onFechar={() => setModalAberto(false)} onCriar={criarSolicitacao} usuario={usuario} />}
    </div>;
}
export default InfraestruturaListagem;
