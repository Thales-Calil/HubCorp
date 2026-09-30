import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import AtividadeRHModal from '../CRUD';
import './style.css';
const atividadesIniciais = [{
  titulo: 'Revisar e atualizar descrições de cargos',
  responsavel: 'Fernanda Costa',
  categoria: 'Documentação',
  prioridade: 'Alta',
  prazo: '20/08/2026',
  status: 'Em andamento'
}, {
  titulo: 'Organizar processo seletivo � Analista Financeiro Jr.',
  responsavel: 'Fernanda Costa',
  categoria: 'Recrutamento',
  prioridade: 'Alta',
  prazo: '30/08/2026',
  status: 'Novo'
}, {
  titulo: 'Aplicar pesquisa de clima organizacional',
  responsavel: 'Fernanda Costa',
  categoria: 'Clima Organizacional',
  prioridade: 'Média',
  prazo: '05/09/2026',
  status: 'Pendente'
}, {
  titulo: 'Processar documentação de novo colaborador',
  responsavel: 'Fernanda Costa',
  categoria: 'Admissão',
  prioridade: 'Alta',
  prazo: '16/08/2026',
  status: 'Concluído'
}];
const filtros = ['Todos', 'Novo', 'Pendente', 'Em andamento', 'Concluído'];
function classePrioridade(prioridade) {
  return prioridade === 'Alta' ? 'priority-high' : prioridade === 'Média' ? 'priority-medium' : 'priority-low';
}
function classeStatus(status) {
  if (status === 'Novo') return 'activity-status-new';
  if (status === 'Pendente') return 'activity-status-pending';
  if (status === 'Concluído') return 'activity-status-done';
  return 'activity-status-progress';
}
function AtividadesRHListagem({
  onNavigate
}) {
  const [busca, setBusca] = useState('');
  const [statusSelecionado, setStatusSelecionado] = useState('Todos');
  const [modalAberto, setModalAberto] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [atividades, setAtividades] = useState(atividadesIniciais);
  const atividadesFiltradas = atividades.filter(atividade => {
    const atendeBusca = atividade.titulo.toLowerCase().includes(busca.toLowerCase());
    const atendeStatus = statusSelecionado === 'Todos' || atividade.status === statusSelecionado;
    return atendeBusca && atendeStatus;
  });
  function criarAtividade(novaAtividade) {
    setAtividades([...atividades, novaAtividade]);
    setModalAberto(false);
  }
  return <div className="activities-page">
      <Sidebar activeItem="Atividades do RH" isOpen={menuAberto} onClose={() => setMenuAberto(false)} onNavigate={onNavigate} />
      {menuAberto && <button className="activities-sidebar-overlay" type="button" onClick={() => setMenuAberto(false)} aria-label="Fechar menu" />}
      <div className="activities-workspace">
        <Header title="Atividades do RH" onMenuClick={() => setMenuAberto(!menuAberto)} />
        <main className="activities-content">
          <section className="activities-heading">
            <div><h2>Controle de Atividades � RH</h2><p>Gerenciamento das atividades da equipe de Recursos Humanos</p></div>
            <button className="new-activity-button" type="button" onClick={() => setModalAberto(true)}><Plus size={17} strokeWidth={1.8} /> Nova Atividade</button>
          </section>

          <section className="activities-filters" aria-label="Filtros de atividades">
            <label className="activity-search"><input value={busca} onChange={event => setBusca(event.target.value)} placeholder="Buscar atividade..." /></label>
            <div className="activity-status-filters">
              {filtros.map(filtro => <button className={statusSelecionado === filtro ? 'activity-filter-selected' : ''} key={filtro} type="button" onClick={() => setStatusSelecionado(filtro)}>{filtro}</button>)}
            </div>
          </section>

          <section className="activities-table-wrap">
            <table className="activities-table">
              <thead><tr><th>Título</th><th>Responsável</th><th>Categoria</th><th>Prioridade</th><th>Prazo</th><th>Status</th><th>Ações</th></tr></thead>
              <tbody>
                {atividadesFiltradas.map(atividade => <tr key={`${atividade.titulo}-${atividade.prazo}`}>
                    <td className="activity-title">{atividade.titulo}</td><td>{atividade.responsavel}</td><td>{atividade.categoria}</td>
                    <td><span className={`priority-badge ${classePrioridade(atividade.prioridade)}`}>{atividade.prioridade}</span></td><td>{atividade.prazo}</td>
                    <td><span className={`activity-status ${classeStatus(atividade.status)}`}>{atividade.status}</span></td>
                    <td><div className="activity-actions"><button type="button" aria-label={`Editar ${atividade.titulo}`}><Pencil size={15} strokeWidth={1.6} /></button><button className="activity-delete" type="button" aria-label={`Excluir ${atividade.titulo}`}><Trash2 size={15} strokeWidth={1.6} /></button></div></td>
                  </tr>)}
              </tbody>
            </table>
            {atividadesFiltradas.length === 0 && <p className="no-activities">Nenhuma atividade encontrada.</p>}
          </section>
        </main>
      </div>
      {modalAberto && <AtividadeRHModal onFechar={() => setModalAberto(false)} onCriar={criarAtividade} />}
    </div>;
}
export default AtividadesRHListagem;
