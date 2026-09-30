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
  descricao: 'Manutenção programada no sistema de RH � 16/08',
  tipo: 'Avisos',
  lida: false
}, {
  id: 2,
  titulo: 'Atualização do sistema',
  descricao: 'HubCorp atualizado para versão 2.4.1 com melhorias de desempenho',
  tipo: 'Sistema',
  lida: true
}];
function Perfil({
  onNavigate
}) {
  const [abaSelecionada, setAbaSelecionada] = useState('dados');
  const [menuAberto, setMenuAberto] = useState(false);
  const [nome, setNome] = useState('Ricardo Almeida');
  const [email, setEmail] = useState('ricardo.almeida@hubcorp.com.br');
  const [telefone, setTelefone] = useState('(11) 99812-3344');
  const [cargo, setCargo] = useState('Administrador do Sistema');
  const [notificacoes, setNotificacoes] = useState(notificacoesIniciais);
  const [preferencias, setPreferencias] = useState({
    avisos: true,
    atividades: true,
    solicitacoes: true,
    mensagens: true,
    calendario: false,
    sistema: true
  });
  const naoLidas = notificacoes.filter(notificacao => !notificacao.lida).length;
  return <div className="profile-page"><Sidebar activeItem="Meu Perfil" isOpen={menuAberto} onClose={() => setMenuAberto(false)} onNavigate={onNavigate} />{menuAberto && <button className="profile-sidebar-overlay" type="button" onClick={() => setMenuAberto(false)} aria-label="Fechar menu" />}<div className="profile-workspace"><Header title="Meu Perfil" onMenuClick={() => setMenuAberto(!menuAberto)} /><main className="profile-content"><section className="profile-hero"><span>RA</span><div><h2>Ricardo Almeida</h2><p>Administrador do Sistema · Tecnologia da Informação</p></div><strong>Administrador</strong></section><nav className="profile-tabs"><button type="button" className={abaSelecionada === 'dados' ? 'profile-tab-active' : ''} onClick={() => setAbaSelecionada('dados')}>Meus dados</button><button type="button" className={abaSelecionada === 'notificacoes' ? 'profile-tab-active' : ''} onClick={() => setAbaSelecionada('notificacoes')}>Notificações {naoLidas > 0 && <span>{naoLidas}</span>}</button><button type="button" className={abaSelecionada === 'preferencias' ? 'profile-tab-active' : ''} onClick={() => setAbaSelecionada('preferencias')}>Preferências</button></nav>{abaSelecionada === 'dados' && <PerfilGeral nome={nome} setNome={setNome} email={email} setEmail={setEmail} telefone={telefone} setTelefone={setTelefone} cargo={cargo} setCargo={setCargo} />}{abaSelecionada === 'notificacoes' && <PerfilNotificacoes notificacoes={notificacoes} setNotificacoes={setNotificacoes} />}{abaSelecionada === 'preferencias' && <PerfilPreferencias preferencias={preferencias} setPreferencias={setPreferencias} />}</main></div></div>;
}
export default Perfil;
