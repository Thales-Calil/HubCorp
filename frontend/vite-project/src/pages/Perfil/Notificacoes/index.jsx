import { Bell, Check, Trash2 } from 'lucide-react';
import { useState } from 'react';
import './style.css';
const filtros = ['Todas', 'Não lidas', 'Avisos', 'Tarefas', 'Solicitações', 'Mensagens', 'Sistema'];
function PerfilNotificacoes({
  notificacoes,
  setNotificacoes
}) {
  const [filtroNotificacao, setFiltroNotificacao] = useState('Todas');
  const filtradas = notificacoes.filter(notificacao => filtroNotificacao === 'Todas' || filtroNotificacao === 'Não lidas' && !notificacao.lida || notificacao.tipo === filtroNotificacao);
  function marcarLida(id) {
    setNotificacoes(notificacoes.map(notificacao => notificacao.id === id ? {
      ...notificacao,
      lida: true
    } : notificacao));
  }
  return <section className="notifications-area"><div className="notifications-toolbar"><div>{filtros.map(filtro => <button type="button" key={filtro} className={filtroNotificacao === filtro ? 'notification-filter-active' : ''} onClick={() => setFiltroNotificacao(filtro)}>{filtro}</button>)}</div><button type="button" onClick={() => setNotificacoes(notificacoes.map(notificacao => ({
        ...notificacao,
        lida: true
      })))}>Marcar todas como lidas</button></div><div className="notifications-list">{filtradas.map(notificacao => <article className={notificacao.lida ? '' : 'notification-unread'} key={notificacao.id}><span><Bell size={17} strokeWidth={1.6} /></span><div><h3>{notificacao.titulo}</h3><p>{notificacao.descricao}</p></div><nav>{!notificacao.lida && <button className="mark-read" type="button" onClick={() => marcarLida(notificacao.id)} aria-label="Marcar como lida"><Check size={16} strokeWidth={1.7} /></button>}<button className="delete-notification" type="button" onClick={() => setNotificacoes(notificacoes.filter(item => item.id !== notificacao.id))} aria-label="Excluir notificação"><Trash2 size={16} strokeWidth={1.6} /></button></nav></article>)}{filtradas.length === 0 && <p className="no-notifications">Nenhuma notificação encontrada.</p>}</div></section>;
}
export default PerfilNotificacoes;
