import { useState } from 'react';
import { Building2, CalendarDays, HardHat, LayoutGrid, Lock, Mail, Megaphone, MessageSquare, Users } from 'lucide-react';
import './style.css';
const perfis = {
  Administrador: 'Acesso total ao sistema',
  'Recursos Humanos': 'Gestão dos recursos humanos',
  Gerente: 'Gestão da equipe e atividades',
  Colaborador: 'Acesso às funções corporativas',
  Manutenção: 'Gestão de infraestrutura'
};
const recursos = [{
  titulo: 'Dashboard inteligente',
  icone: LayoutGrid
}, {
  titulo: 'Central do RH',
  icone: Users
}, {
  titulo: 'Chat corporativo',
  icone: MessageSquare
}, {
  titulo: 'Avisos e comunicados',
  icone: Megaphone
}, {
  titulo: 'Infraestrutura',
  icone: HardHat
}, {
  titulo: 'Calendário de eventos',
  icone: CalendarDays
}];
function Login({
  onEntrar
}) {
  const [perfil, setPerfil] = useState('Administrador');
  const [email, setEmail] = useState('ricardo.almeida@hubcorp.com.br');
  const [senha, setSenha] = useState('');
  function entrar() {
    onEntrar();
  }
  return <main className="login-page"><section className="login-institutional"><div className="login-brand"><span><Building2 size={40} strokeWidth={1.5} /></span><strong>hubcorp</strong></div><div className="login-presentation"><h1>Comunicação e gestão<br />em um só lugar.</h1><p>A plataforma modular que conecta equipes, centraliza processos e simplifica a gestão corporativa do dia a dia.</p><div className="login-features">{recursos.map(({
            titulo,
            icone: Icon
          }) => <div key={titulo}><Icon size={16} strokeWidth={1.6} />{titulo}</div>)}</div></div><footer>© 2026 HubCorp. Todos os direitos reservados.</footer></section><section className="login-access"><div className="login-form-wrap"><header><h2>Bem-vindo de volta</h2><p>Acesse o sistema com suas credenciais corporativas.</p></header><section className="login-card"><label>Perfil de acesso<div className="login-profile-select"><span><Users size={18} strokeWidth={1.6} /></span><div><select value={perfil} onChange={event => setPerfil(event.target.value)}>{Object.keys(perfis).map(item => <option key={item}>{item}</option>)}</select><small>{perfis[perfil]}</small></div></div></label><label>E-mail corporativo<div className="login-input"><Mail size={17} strokeWidth={1.6} /><input type="email" value={email} onChange={event => setEmail(event.target.value)} /></div></label><label>Senha<div className="login-input"><Lock size={17} strokeWidth={1.6} /><input type="password" value={senha} onChange={event => setSenha(event.target.value)} placeholder="⬢⬢⬢⬢⬢⬢⬢⬢" /></div></label><button type="button" className="login-submit" onClick={entrar}>Entrar no sistema</button><button type="button" className="forgot-password">Esqueci minha senha</button></section><p className="login-demo">Protótipo de demonstração � selecione o perfil para simular o acesso</p></div></section></main>;
}
export default Login;
