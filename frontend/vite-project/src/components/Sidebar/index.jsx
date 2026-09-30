import { Building2, CalendarDays, ChevronRight, ClipboardList, HardHat, LayoutGrid, Megaphone, MessageSquare, UserRound, Users, UsersRound, X } from 'lucide-react';
import './style.css';
const menuItems = [{
  icon: LayoutGrid,
  label: 'Dashboard'
}, {
  icon: Megaphone,
  label: 'Avisos e Comunicados'
}, {
  icon: Users,
  label: 'Central do RH'
}, {
  icon: ClipboardList,
  label: 'Atividades do RH'
}, {
  icon: ClipboardList,
  label: 'Atividades dos Gerentes'
}, {
  icon: HardHat,
  label: 'Infraestrutura'
}, {
  icon: MessageSquare,
  label: 'Chat'
}, {
  icon: CalendarDays,
  label: 'Calendário'
}, {
  icon: UsersRound,
  label: 'Usuários'
}, {
  icon: UserRound,
  label: 'Meu Perfil'
}];
function Sidebar({
  isOpen,
  onClose,
  activeItem = 'Usuários',
  onNavigate
}) {
  return <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-brand">
        <div className="brand-mark"><Building2 size={25} strokeWidth={1.7} /></div>
        <div>
          <strong>HubCorp</strong>
          <span>Plataforma Corporativa</span>
        </div>
        <button className="sidebar-close" type="button" onClick={onClose} aria-label="Fechar menu">
          <X size={21} strokeWidth={1.6} />
        </button>
      </div>

      <nav className="sidebar-menu" aria-label="Menu principal">
        {menuItems.map(({
        icon: Icon,
        label
      }) => <button className={`sidebar-item ${label === activeItem ? 'sidebar-item-active' : ''}`} key={label} onClick={() => onNavigate && onNavigate(label)} type="button">
            <span className="sidebar-icon"><Icon size={17} strokeWidth={1.6} /></span>
            <span>{label}</span>
            {label === activeItem && <ChevronRight className="sidebar-arrow" size={17} strokeWidth={1.6} />}
          </button>)}
      </nav>

      <div className="sidebar-account">
        <div className="account-avatar">RA</div>
        <div>
          <strong>Ricardo Almeida</strong>
          <span>Administrador</span>
        </div>
      </div>
    </aside>;
}
export default Sidebar;
