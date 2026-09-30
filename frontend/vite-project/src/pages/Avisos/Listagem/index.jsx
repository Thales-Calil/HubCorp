import { useState } from 'react';
import { Eye, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import './style.css';
const avisos = [{
  titulo: 'Manutenção programada no sistema de RH � 16/08',
  tipo: 'Urgente',
  conteudo: 'Informamos que o sistema de gestão de RH passará por manutenção preventiva no dia 16 de agosto de 2026, das 22h às 02h. Durante este período, o acesso às funcionalidades de folha...',
  classe: 'aviso-urgente'
}, {
  titulo: 'Semana de bem-estar corporativo � Agosto/2026',
  tipo: 'Evento',
  conteudo: 'A equipe de RH tem o prazer de anunciar a Semana de Bem-Estar Corporativo, que acontecerá de 18 a 22 de agosto. Serão oferecidas atividades de meditação, ginástica laboral, palestras...',
  classe: 'aviso-evento'
}, {
  titulo: 'Atualização da política de home office � vigência imediata',
  tipo: 'RH',
  conteudo: 'Comunicamos que a política de trabalho remoto foi atualizada. A partir de 15 de agosto de 2026, colaboradores elegíveis poderão realizar até 3 dias de home office por semana,...',
  classe: 'aviso-rh'
}, {
  titulo: 'Resultados do 2º trimestre de 2026',
  tipo: 'Geral',
  conteudo: '�0 com satisfação que compartilhamos os resultados do segundo trimestre de 2026. A empresa alcançou crescimento de 18% no faturamento em relação ao mesmo período do ano anterior,...',
  classe: 'aviso-geral'
}];
const tipos = ['Todos os tipos', 'Geral', 'Urgente', 'Evento', 'RH'];
function AvisosListagem({
  onNavigate,
  onNovoAviso
}) {
  const [busca, setBusca] = useState('');
  const [tipoSelecionado, setTipoSelecionado] = useState('Todos os tipos');
  const [menuAberto, setMenuAberto] = useState(false);
  const avisosFiltrados = avisos.filter(aviso => {
    const atendeBusca = aviso.titulo.toLowerCase().includes(busca.toLowerCase());
    const atendeTipo = tipoSelecionado === 'Todos os tipos' || aviso.tipo === tipoSelecionado;
    return atendeBusca && atendeTipo;
  });
  return <div className="avisos-page">
      <Sidebar activeItem="Avisos e Comunicados" isOpen={menuAberto} onClose={() => setMenuAberto(false)} onNavigate={onNavigate} />
      {menuAberto && <button className="avisos-sidebar-overlay" type="button" onClick={() => setMenuAberto(false)} aria-label="Fechar menu" />}

      <div className="avisos-workspace">
        <Header title="Avisos e Comunicados" onMenuClick={() => setMenuAberto(!menuAberto)} />
        <main className="avisos-content">
          <section className="avisos-heading">
            <div><h2>Avisos e Comunicados</h2><p>Comunicados oficiais publicados pela organização</p></div>
            <button className="new-notice-button" type="button" onClick={onNovoAviso}><Plus size={17} strokeWidth={1.8} /> Novo Aviso</button>
          </section>

          <section className="avisos-filters" aria-label="Filtros de avisos">
            <label className="notice-search"><Search size={17} strokeWidth={1.6} /><input value={busca} onChange={event => setBusca(event.target.value)} placeholder="Buscar por título..." /></label>
            <div className="notice-type-filters">
              {tipos.map(tipo => <button className={tipoSelecionado === tipo ? 'notice-filter-selected' : ''} key={tipo} type="button" onClick={() => setTipoSelecionado(tipo)}>{tipo}</button>)}
            </div>
          </section>

          <section className="notices-grid">
            {avisosFiltrados.map(aviso => <article className={`notice-card ${aviso.classe}`} key={aviso.titulo}>
                <div className="notice-card-heading"><h3>{aviso.titulo}</h3><span>{aviso.tipo}</span></div>
                <p>{aviso.conteudo}</p>
                <div className="notice-card-actions">
                  <button type="button" aria-label={`Visualizar ${aviso.titulo}`}><Eye size={15} strokeWidth={1.6} /></button>
                  <button type="button" aria-label={`Editar ${aviso.titulo}`}><Pencil size={15} strokeWidth={1.6} /></button>
                  <button className="delete-notice-button" type="button" aria-label={`Excluir ${aviso.titulo}`}><Trash2 size={15} strokeWidth={1.6} /></button>
                </div>
              </article>)}
          </section>
          {avisosFiltrados.length === 0 && <p className="no-notices">Nenhum aviso encontrado.</p>}
        </main>
      </div>
    </div>;
}
export default AvisosListagem;
