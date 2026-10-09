import { useState } from 'react';
import { Building2, CalendarDays, HardHat, LayoutGrid, Lock, Mail, Megaphone, MessageSquare, Users } from 'lucide-react';
import { AuthError, login } from '../../services/authService';
import './style.css';

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

function mensagemDeErro(error) {
  if (error instanceof AuthError && error.code === 'INVALID_CREDENTIALS') {
    return 'E-mail ou senha inválidos.';
  }

  if (error instanceof AuthError && error.code === 'INACTIVE_USER') {
    return 'Este usuário está inativo.';
  }

  if (error instanceof AuthError && error.code === 'API_UNAVAILABLE') {
    return 'Não foi possível conectar à API. Tente novamente mais tarde.';
  }

  return 'Não foi possível realizar o login. Tente novamente.';
}

function Login({ onEntrar, mensagemSessao = '' }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function entrar(event) {
    event.preventDefault();
    setErro('');

    if (!email.trim() || !senha) {
      setErro('Informe o e-mail e a senha.');
      return;
    }

    setCarregando(true);

    try {
      const sessao = await login({
        email: email.trim(),
        senha
      });

      onEntrar(sessao);
    } catch (error) {
      setErro(mensagemDeErro(error));
    } finally {
      setCarregando(false);
    }
  }

  return <main className="login-page">
      <section className="login-institutional">
        <div className="login-brand"><span><Building2 size={40} strokeWidth={1.5} /></span><strong>hubcorp</strong></div>
        <div className="login-presentation">
          <h1>Comunicação e gestão<br />em um só lugar.</h1>
          <p>A plataforma modular que conecta equipes, centraliza processos e simplifica a gestão corporativa do dia a dia.</p>
          <div className="login-features">{recursos.map(({ titulo, icone: Icon }) => <div key={titulo}><Icon size={16} strokeWidth={1.6} />{titulo}</div>)}</div>
        </div>
        <footer>© 2026 HubCorp. Todos os direitos reservados.</footer>
      </section>
      <section className="login-access">
        <div className="login-form-wrap">
          <header><h2>Bem-vindo de volta</h2><p>Acesse o sistema com suas credenciais corporativas.</p></header>
          <form className="login-card" onSubmit={entrar}>
            <label>Perfil de acesso
              <div className="login-profile-select">
                <span><Users size={18} strokeWidth={1.6} /></span>
                <div>
                  <select value="Perfil definido após o login" disabled aria-label="Perfil definido após o login"><option>Perfil definido após o login</option></select>
                  <small>O perfil é definido pelas credenciais.</small>
                </div>
              </div>
            </label>
            <label>E-mail corporativo
              <div className="login-input"><Mail size={17} strokeWidth={1.6} /><input type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="email" /></div>
            </label>
            <label>Senha
              <div className="login-input"><Lock size={17} strokeWidth={1.6} /><input type="password" value={senha} onChange={event => setSenha(event.target.value)} autoComplete="current-password" placeholder="••••••••" /></div>
            </label>
            {(erro || mensagemSessao) && <p className="login-error" role="alert">{erro || mensagemSessao}</p>}
            <button type="submit" className="login-submit" disabled={carregando}>{carregando ? 'Entrando...' : 'Entrar no sistema'}</button>
            <button type="button" className="forgot-password">Esqueci minha senha</button>
          </form>
          <p className="login-demo">Acesse com suas credenciais corporativas.</p>
        </div>
      </section>
    </main>;
}

export default Login;
