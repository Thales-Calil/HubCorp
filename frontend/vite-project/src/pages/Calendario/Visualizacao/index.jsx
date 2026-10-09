import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import EventoModal from '../CRUD';
import './style.css';
const diasDoMes = [null, null, null, null, null, null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, null, null, null, null, null];
const eventosIniciais = [{
  data: '2026-08-18',
  titulo: 'Reunião de Planejamento Q3',
  categoria: 'Reunião',
  setor: 'Todos'
}, {
  data: '2026-08-18',
  titulo: 'Semana de Bem-Estar Corporativo',
  categoria: 'Evento Social',
  setor: 'Todos'
}, {
  data: '2026-08-20',
  titulo: 'Treinamento: Excel Avançado',
  categoria: 'Treinamento',
  setor: 'Todos'
}, {
  data: '2026-08-22',
  titulo: 'Happy Hour de Aniversário da Empresa',
  categoria: 'Evento Social',
  setor: 'Todos'
}];
const feriadoLateral = {
  data: '2026-08-04',
  titulo: 'Feriado Municipal � São Paulo',
  categoria: 'Feriado',
  setor: 'Todos'
};
const categorias = ['Reunião', 'Feriado', 'Treinamento', 'Evento Social'];
function classeEvento(categoria) {
  if (categoria === 'Reunião') return 'evento-reuniao';
  if (categoria === 'Feriado') return 'evento-feriado';
  if (categoria === 'Treinamento') return 'evento-treinamento';
  return 'evento-social';
}
function diaDoEvento(data) {
  return Number(data.split('-')[2]);
}
function CalendarioVisualizacao({
  onNavigate,
  onLogout,
  usuario
}) {
  const [eventos, setEventos] = useState(eventosIniciais);
  const [modalAberto, setModalAberto] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const proximosEventos = [...eventos.filter(evento => evento.data.startsWith('2026-08')), feriadoLateral].sort((a, b) => diaDoEvento(a.data) - diaDoEvento(b.data));
  function criarEvento(novoEvento) {
    setEventos([...eventos, novoEvento]);
    setModalAberto(false);
  }
  return <div className="calendar-page">
      <Sidebar activeItem="Calendário" isOpen={menuAberto} onClose={() => setMenuAberto(false)} onNavigate={onNavigate} usuario={usuario} />
      {menuAberto && <button className="calendar-sidebar-overlay" type="button" onClick={() => setMenuAberto(false)} aria-label="Fechar menu" />}
      <div className="calendar-workspace"><Header title="Calendário Corporativo" onMenuClick={() => setMenuAberto(!menuAberto)} onLogout={onLogout} usuario={usuario} />
        <main className="calendar-content"><section className="calendar-layout"><div className="calendar-main"><div className="calendar-toolbar"><div className="calendar-month"><button type="button" aria-label="Mês anterior"><ChevronLeft size={18} strokeWidth={1.7} /></button><h2>Agosto 2026</h2><button type="button" aria-label="Próximo mês"><ChevronRight size={18} strokeWidth={1.7} /></button></div><button className="new-event-button" type="button" onClick={() => setModalAberto(true)}><Plus size={17} strokeWidth={1.8} /> Novo Evento</button></div><div className="calendar-scroll"><section className="calendar-grid"><div className="calendar-weekdays">{['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map(dia => <span key={dia}>{dia}</span>)}</div><div className="calendar-days">{diasDoMes.map((dia, indice) => {
                    const eventosDoDia = dia ? eventos.filter(evento => evento.data === `2026-08-${String(dia).padStart(2, '0')}`) : [];
                    return <div className={`calendar-day ${dia ? '' : 'calendar-empty'}`} key={`${dia}-${indice}`}>{dia && <span className={dia === 14 ? 'calendar-today' : ''}>{dia}</span>}{eventosDoDia.map(evento => <p key={`${evento.titulo}-${evento.data}`} className={classeEvento(evento.categoria)}>{evento.titulo}</p>)}</div>;
                  })}</div></section></div><div className="calendar-legend">{categorias.map(categoria => <span key={categoria}><i className={classeEvento(categoria)} />{categoria}</span>)}</div></div><aside className="upcoming-events"><h3>Próximos eventos</h3><div>{proximosEventos.map(evento => <article key={`${evento.titulo}-${evento.data}`}><strong className={classeEvento(evento.categoria)}>{String(diaDoEvento(evento.data)).padStart(2, '0')}</strong><div><p>{evento.titulo}</p><span className={classeEvento(evento.categoria)}>{evento.categoria}</span></div></article>)}</div></aside></section></main>
      </div>
      {modalAberto && <EventoModal onFechar={() => setModalAberto(false)} onCriar={criarEvento} />}
    </div>;
}
export default CalendarioVisualizacao;
