import { Bell, LogOut, Menu, Search } from 'lucide-react';
import './style.css';
function Header({
  onMenuClick,
  title = 'Gerenciamento de Usuários'
}) {
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
        <button className="header-icon-button logout-button" type="button" aria-label="Sair"><LogOut size={18} strokeWidth={1.6} /></button>
        <div className="header-avatar">RA</div>
        <strong className="header-user">Ricardo</strong>
      </div>
    </header>;
}
export default Header;
