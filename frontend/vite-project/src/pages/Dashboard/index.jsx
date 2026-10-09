import { useState } from 'react';
import { Bell, CalendarDays, ClipboardList, HardHat, MessageSquare, Users } from 'lucide-react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import './style.css';
const indicadores = [{
  titulo: 'Avisos publicados',
  valor: '4',
  icone: Bell,
  classe: 'indicator-blue'
}, {
  titulo: 'Atividades pendentes',
  valor: '3',
  icone: ClipboardList,
  classe: 'indicator-peach'
}, {
  titulo: 'Solicitações em andamento',
  valor: '3',
  icone: HardHat,
  classe: 'indicator-orange'
}, {
  titulo: 'Mensagens não lidas',
  valor: '0',
  icone: MessageSquare,
  classe: 'indicator-blue'
}];
const avisos = [{
  titulo: 'Manutenção programada no sistema de RH 16/08',
  autor: 'Ricardo Almeida ⬢ 13/08/2026',
  tipo: 'Urgente',
  classe: 'badge-urgent'
}, {
  titulo: 'Semana de bem-estar corporativo Agosto/2026',
  autor: 'Fernanda Costa ⬢ 11/08/2026',
  tipo: 'Evento',
  classe: 'badge-event'
}, {
  titulo: 'Atualização da política de home office vigência imediata',
  autor: 'Fernanda Costa ⬢ 10/08/2026',
  tipo: 'RH',
  classe: 'badge-rh'
}];
const eventos = [{
  dia: '18',
  titulo: 'Reunião de Planejamento Q3',
  tipo: 'Reunião',
  classe: 'event-meeting'
}, {
  dia: '18',
  titulo: 'Semana de Bem-Estar Corporativo',
  tipo: 'Evento Social',
  classe: 'event-social'
}, {
  dia: '20',
  titulo: 'Treinamento: Excel Avançado',
  tipo: 'Treinamento',
  classe: 'event-training'
}];
const solicitacoes = [{
  codigo: 'INF-2026-047',
  titulo: 'Ar-condicionado com defeito na sala 302',
  status: 'Em andamento',
  classe: 'request-progress'
}, {
  codigo: 'INF-2026-048',
  titulo: 'Vazamento na torneira do banheiro masculino',
  status: 'Aberta',
  classe: 'request-open'
}, {
  codigo: 'INF-2026-045',
  titulo: 'Impressora da TI sem conectividade',
  status: 'Aceita',
  classe: 'request-accepted'
}];
const atalhos = [{
  titulo: 'Avisos',
  icone: Bell,
  classe: 'shortcut-blue'
}, {
  titulo: 'Chat',
  icone: MessageSquare,
  classe: 'shortcut-blue'
}, {
  titulo: 'Calendário',
  icone: CalendarDays,
  classe: 'shortcut-green'
}, {
  titulo: 'Infraestrutura',
  icone: HardHat,
  classe: 'shortcut-orange'
}, {
  titulo: 'Central do RH',
  icone: Users,
  classe: 'shortcut-green'
}, {
  titulo: 'Atividades',
  icone: ClipboardList,
  classe: 'shortcut-peach'
}];
function Dashboard({
  onNavigate
}) {
  const [menuAberto, setMenuAberto] = useState(false);
  return <div className="dashboard-page">
      <Sidebar activeItem="Dashboard" isOpen={menuAberto} onClose={() => setMenuAberto(false)} onNavigate={onNavigate} />
      {menuAberto && <button className="dashboard-sidebar-overlay" type="button" onClick={() => setMenuAberto(false)} aria-label="Fechar menu" />}
      <div className="dashboard-workspace">
        <Header title="Dashboard" onMenuClick={() => setMenuAberto(!menuAberto)} />
        <main className="dashboard-content">
          <section className="indicators-grid">
            {indicadores.map(({
            titulo,
            valor,
            icone: Icon,
            classe
          }) => <article className="indicator-card" key={titulo}>
                <span className={`indicator-icon ${classe}`}><Icon size={21} strokeWidth={1.7} /></span>
                <div><p>{titulo}</p><strong>{valor}</strong></div>
              </article>)}
          </section>

          <section className="dashboard-grid">
            <article className="dashboard-card notices-card">
              <div className="dashboard-card-heading"><h2>Avisos Recentes</h2><button type="button">Ver todos � </button></div>
              <div className="notices-list">
                {avisos.map(aviso => <div className="notice-item" key={aviso.titulo}>
                    <div><strong>{aviso.titulo}</strong><span>{aviso.autor}</span></div>
                    <small className={aviso.classe}>{aviso.tipo}</small>
                  </div>)}
              </div>
            </article>

            <article className="dashboard-card pending-card">
              <div className="dashboard-card-heading"><h2>Minhas Atividades Pendentes</h2><button type="button">Ver todas � </button></div>
            </article>

            <article className="dashboard-card events-card">
              <div className="dashboard-card-heading"><h2>Próximos Eventos</h2><button type="button">Calendário � </button></div>
              <div className="events-list">
                {eventos.map(evento => <div className="event-item" key={evento.titulo}>
                    <strong>{evento.dia}</strong><span>{evento.titulo}</span><small className={evento.classe}>{evento.tipo}</small>
                  </div>)}
              </div>
            </article>

            <article className="dashboard-card requests-card">
              <div className="dashboard-card-heading"><h2>Solicitações em Andamento</h2><button type="button">Ver todas � </button></div>
              <div className="requests-list">
                {solicitacoes.map(solicitacao => <div className="request-item" key={solicitacao.codigo}>
                    <div><strong>{solicitacao.codigo}</strong><span>{solicitacao.titulo}</span></div>
                    <small className={solicitacao.classe}>{solicitacao.status}</small>
                  </div>)}
              </div>
            </article>
          </section>

          <section className="dashboard-card shortcuts-card">
            <div className="dashboard-card-heading"><h2>Acesso Rápido</h2></div>
            <div className="shortcuts-list">
              {atalhos.map(({
              titulo,
              icone: Icon,
              classe
            }) => <button type="button" className="shortcut-item" key={titulo}>
                  <span className={classe}><Icon size={19} strokeWidth={1.7} /></span>{titulo}
                </button>)}
            </div>
          </section>
        </main>
      </div>
    </div>;
}
export default Dashboard;
