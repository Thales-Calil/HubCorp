import { Building2, CalendarDays, ChevronRight, ClipboardList, FileText, HardHat, LayoutGrid, Megaphone, MessageSquare, UserRound, Users, UsersRound, X } from 'lucide-react';
import { temPermissao } from '../../config/permissoes';
import './style.css';
const menuItems = [{
  icon: LayoutGrid,
  label: 'Dashboard'
}, {
  icon: Megaphone,
  label: 'Avisos e Comunicados',
  permissao: 'VISUALIZAR_NOTIFICACAO'
}, {
  icon: Users,
  label: 'Central do RH'
}, {
  icon: FileText,
  label: 'Formulários',
  permissao: 'VISUALIZAR_FORMULARIO'
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
  label: 'Usuários',
  permissao: 'GERENCIAR_USUARIOS'
}, {
  icon: UserRound,
  label: 'Meu Perfil'
}];
function Sidebar({
  isOpen,
  onClose,
  activeItem = 'Usuários',
  onNavigate,
  usuario
}) {
  // Os módulos sem a propriedade "permissao" permanecem demonstrativos
  // até que o backend possua um contrato de autorização específico para eles.
  const itensVisiveis = menuItems.filter(item => !item.permissao || temPermissao(usuario?.userType, item.permissao));
  const nome = usuario?.nome || 'Usuário';
  const iniciais = nome.split(' ').filter(Boolean).slice(0, 2).map(parte => parte[0]).join('').toUpperCase() || 'U';
  const perfil = usuario?.userType || 'Perfil indisponível';

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
        {itensVisiveis.map(({
        icon: Icon,
        label
      }) => <button className={`sidebar-item ${label === activeItem ? 'sidebar-item-active' : ''}`} key={label} onClick={() => onNavigate && onNavigate(label)} type="button">
            <span className="sidebar-icon"><Icon size={17} strokeWidth={1.6} /></span>
            <span>{label}</span>
            {label === activeItem && <ChevronRight className="sidebar-arrow" size={17} strokeWidth={1.6} />}
          </button>)}
      </nav>

      <div className="sidebar-account">
        <div className="account-avatar">{iniciais}</div>
        <div>
          <strong>{nome}</strong>
          <span>{perfil}</span>
        </div>
      </div>
    </aside>;
}
export default Sidebar;
