import { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import PerfilGeral from './Geral';
import PerfilNotificacoes from './Notificacoes';
import PerfilPreferencias from './Preferencias';
import './perfil.css';

const notificacoesIniciais = [{
  id: 1,
  titulo: 'Novo aviso publicado',
  descricao: 'Manutenção programada no sistema de RH · 16/08',
  tipo: 'Avisos',
  lida: false
}, {
  id: 2,
  titulo: 'Atualização do sistema',
  descricao: 'HubCorp atualizado para versão 2.4.1 com melhorias de desempenho',
  tipo: 'Sistema',
  lida: true
}];

const nomesDePerfil = {
  RH: 'Recursos Humanos',
  GERENTE: 'Gerente',
  COLABORADOR: 'Colaborador'
};

function obterIniciais(nome) {
  return nome.split(' ').filter(Boolean).slice(0, 2).map(parte => parte[0]).join('').toUpperCase() || 'U';
}

function Perfil({
  onNavigate,
  onLogout,
  usuario
}) {
  const [abaSelecionada, setAbaSelecionada] = useState('dados');
  const [menuAberto, setMenuAberto] = useState(false);
  const [notificacoes, setNotificacoes] = useState(notificacoesIniciais);
  const [preferencias, setPreferencias] = useState({
    avisos: true,
    atividades: true,
    solicitacoes: true,
    mensagens: true,
    calendario: false,
    sistema: true
  });
  const nome = usuario?.nome || 'Usuário';
  const email = usuario?.email || 'Não informado';
  const telefone = 'Não informado pela sessão';
  const cargo = usuario?.cargo || 'Cargo não informado';
  const perfil = nomesDePerfil[usuario?.userType] || 'Perfil não identificado';
  const iniciais = obterIniciais(nome);
  const naoLidas = notificacoes.filter(notificacao => !notificacao.lida).length;

  return <div className="profile-page">
      <Sidebar activeItem="Meu Perfil" isOpen={menuAberto} onClose={() => setMenuAberto(false)} onNavigate={onNavigate} usuario={usuario} />
      {menuAberto && <button className="profile-sidebar-overlay" type="button" onClick={() => setMenuAberto(false)} aria-label="Fechar menu" />}
      <div className="profile-workspace">
        <Header title="Meu Perfil" onMenuClick={() => setMenuAberto(!menuAberto)} onLogout={onLogout} usuario={usuario} />
        <main className="profile-content">
          <section className="profile-hero"><span>{iniciais}</span><div><h2>{nome}</h2><p>{cargo} · {perfil}</p></div><strong>{perfil}</strong></section>
          <nav className="profile-tabs">
            <button type="button" className={abaSelecionada === 'dados' ? 'profile-tab-active' : ''} onClick={() => setAbaSelecionada('dados')}>Meus dados</button>
            <button type="button" className={abaSelecionada === 'notificacoes' ? 'profile-tab-active' : ''} onClick={() => setAbaSelecionada('notificacoes')}>Notificações {naoLidas > 0 && <span>{naoLidas}</span>}</button>
            <button type="button" className={abaSelecionada === 'preferencias' ? 'profile-tab-active' : ''} onClick={() => setAbaSelecionada('preferencias')}>Preferências</button>
          </nav>
          {abaSelecionada === 'dados' && <PerfilGeral nome={nome} email={email} telefone={telefone} cargo={cargo} />}
          {abaSelecionada === 'notificacoes' && <PerfilNotificacoes notificacoes={notificacoes} setNotificacoes={setNotificacoes} />}
          {abaSelecionada === 'preferencias' && <PerfilPreferencias preferencias={preferencias} setPreferencias={setPreferencias} />}
        </main>
      </div>
    </div>;
}

export default Perfil;
