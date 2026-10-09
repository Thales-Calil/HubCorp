import { Bell, LogOut, Menu, Search } from 'lucide-react';
import './style.css';

function obterIniciais(nome) {
  return nome.split(' ').filter(Boolean).slice(0, 2).map(parte => parte[0]).join('').toUpperCase() || 'U';
}

function Header({
  onMenuClick,
  onLogout,
  usuario,
  title = 'Gerenciamento de Usuários'
}) {
  const nome = usuario?.nome || 'Usuário';
  const iniciais = obterIniciais(nome);

  return <header className="header">
      <button className="header-menu-button" type="button" onClick={onMenuClick} aria-label="Abrir menu">
        <Menu size={22} strokeWidth={1.6} />
      </button>
      <h1>{title}</h1>

      <div className="header-actions">
        <label className="system-search">
          <Search size={16} strokeWidth={1.6} />
          <input placeholder="Buscar no sistema..." />
        </label>
        <button className="header-icon-button notification-button" type="button" aria-label="Notificações">
          <Bell size={18} strokeWidth={1.6} />
          <span>1</span>
        </button>
        <button className="header-icon-button logout-button" type="button" onClick={onLogout} aria-label="Sair"><LogOut size={18} strokeWidth={1.6} /></button>
        <div className="header-avatar">{iniciais}</div>
        <strong className="header-user">{nome}</strong>
      </div>
    </header>;
}
export default Header;
