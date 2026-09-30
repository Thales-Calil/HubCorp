import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import AtividadeGerenteModal from '../CRUD';
import './style.css';
const atividadesIniciais = [{
  titulo: 'Elaborar proposta comercial � Grupo Horizonte',
  colaborador: 'Camila Santos',
  iniciais: 'CS',
  setor: 'Comercial',
  prazo: '18/08/2026',
  progresso: 60,
  status: 'Em andamento'
}, {
  titulo: 'Mapear fluxo do processo de compras',
  colaborador: 'Larissa Oliveira',
  iniciais: 'LO',
  setor: 'Operações',
  prazo: '25/08/2026',
  progresso: 20,
  status: 'Pendente'
}, {
  titulo: 'Relatório mensal de vendas � Julho/2026',
  colaborador: 'Camila Santos',
  iniciais: 'CS',
  setor: 'Comercial',
  prazo: '15/08/2026',
  progresso: 100,
  status: 'Concluído'
}, {
  titulo: 'Revisar indicadores de SLA operacional',
  colaborador: 'Larissa Oliveira',
  iniciais: 'LO',
  setor: 'Operações',
  prazo: '22/08/2026',
  progresso: 0,
  status: 'Novo'
}];
const setores = ['Todos os setores', 'Comercial', 'Operações', 'Marketing', 'TI'];
function classeStatus(status) {
  if (status === 'Novo') return 'manager-status-new';
  if (status === 'Concluído') return 'manager-status-done';
  return 'manager-status-pending';
}
function classeProgresso(status) {
  return status === 'Concluído' ? 'progress-done' : status === 'Novo' ? 'progress-new' : 'progress-pending';
}
function AtividadesGerentesListagem({
  onNavigate
}) {
  const [setorSelecionado, setSetorSelecionado] = useState('Todos os setores');
  const [modalAberto, setModalAberto] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [atividades, setAtividades] = useState(atividadesIniciais);
  const atividadesFiltradas = atividades.filter(atividade => setorSelecionado === 'Todos os setores' || atividade.setor === setorSelecionado);
  function criarAtividade(novaAtividade) {
    setAtividades([...atividades, novaAtividade]);
    setModalAberto(false);
  }
  return <div className="manager-activities-page">
      <Sidebar activeItem="Atividades dos Gerentes" isOpen={menuAberto} onClose={() => setMenuAberto(false)} onNavigate={onNavigate} />
      {menuAberto && <button className="manager-sidebar-overlay" type="button" onClick={() => setMenuAberto(false)} aria-label="Fechar menu" />}
      <div className="manager-activities-workspace">
        <Header title="Atividades dos Gerentes" onMenuClick={() => setMenuAberto(!menuAberto)} />
        <main className="manager-activities-content">
          <section className="manager-activities-heading">
            <div><h2>Controle de Atividades � Gerentes</h2><p>Gerenciamento das atividades por equipe e setor</p></div>
            <button className="new-manager-activity-button" type="button" onClick={() => setModalAberto(true)}><Plus size={17} strokeWidth={1.8} /> Nova Atividade</button>
          </section>
          <section className="manager-sector-filters" aria-label="Filtro por setor">
            {setores.map(setor => <button key={setor} type="button" className={setorSelecionado === setor ? 'manager-filter-selected' : ''} onClick={() => setSetorSelecionado(setor)}>{setor}</button>)}
          </section>
          <section className="manager-table-wrap">
            <table className="manager-table">
              <thead><tr><th>Atividade</th><th>Colaborador</th><th>Setor</th><th>Prazo</th><th>Progresso</th><th>Status</th><th>Ações</th></tr></thead>
              <tbody>{atividadesFiltradas.map(atividade => <tr key={`${atividade.titulo}-${atividade.prazo}`}>
                  <td className="manager-activity-title">{atividade.titulo}</td>
                  <td><div className="manager-collaborator"><span className={atividade.iniciais === 'CS' ? 'avatar-camila' : 'avatar-larissa'}>{atividade.iniciais}</span>{atividade.colaborador}</div></td>
                  <td>{atividade.setor}</td><td>{atividade.prazo}</td>
                  <td><div className="manager-progress"><span className="manager-progress-track"><i className={classeProgresso(atividade.status)} style={{
                        width: `${atividade.progresso}%`
                      }} /></span><small>{atividade.progresso}%</small></div></td>
                  <td><span className={`manager-status ${classeStatus(atividade.status)}`}>{atividade.status}</span></td>
                  <td><div className="manager-actions"><button type="button" aria-label={`Editar ${atividade.titulo}`}><Pencil size={15} strokeWidth={1.6} /></button><button className="manager-delete" type="button" aria-label={`Excluir ${atividade.titulo}`}><Trash2 size={15} strokeWidth={1.6} /></button></div></td>
                </tr>)}</tbody>
            </table>
            {atividadesFiltradas.length === 0 && <p className="no-manager-activities">Nenhuma atividade encontrada para este setor.</p>}
          </section>
        </main>
      </div>
      {modalAberto && <AtividadeGerenteModal onFechar={() => setModalAberto(false)} onCriar={criarAtividade} />}
    </div>;
}
export default AtividadesGerentesListagem;
