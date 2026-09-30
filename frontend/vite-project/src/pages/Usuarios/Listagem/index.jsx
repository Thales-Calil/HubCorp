import { useState } from 'react'
import { Pencil, Plus, Power, Search, Trash2 } from 'lucide-react'
import Header from '../../../components/Header'
import Sidebar from '../../../components/Sidebar'
import './style.css'

const usuarios = [
  { nome: 'Ricardo Almeida', iniciais: 'RA', email: 'ricardo.almeida@hubcorp.com.br', perfil: 'Administrador', setor: 'Tecnologia da Informação', status: 'Ativo', avatar: 'green' },
  { nome: 'Fernanda Costa', iniciais: 'FC', email: 'fernanda.costa@hubcorp.com.br', perfil: 'Recursos Humanos', setor: 'Recursos Humanos', status: 'Ativo', avatar: 'blue' },
  { nome: 'Marcelo Vieira', iniciais: 'MV', email: 'marcelo.vieira@hubcorp.com.br', perfil: 'Gerente', setor: 'Comercial', status: 'Ativo', avatar: 'dark-green' },
  { nome: 'Camila Santos', iniciais: 'CS', email: 'camila.santos@hubcorp.com.br', perfil: 'Colaborador', setor: 'Comercial', status: 'Ativo', avatar: 'blue' },
  { nome: 'João Ferreira', iniciais: 'JF', email: 'joao.ferreira@hubcorp.com.br', perfil: 'Manutenção', setor: 'Facilities', status: 'Ativo', avatar: 'orange' },
  { nome: 'Patrícia Mendes', iniciais: 'PM', email: 'patricia.mendes@hubcorp.com.br', perfil: 'Colaborador', setor: 'Marketing', status: 'Ativo', avatar: 'blue' },
  { nome: 'Bruno Rocha', iniciais: 'BR', email: 'bruno.rocha@hubcorp.com.br', perfil: 'Gerente', setor: 'Operações', status: 'Ativo', avatar: 'blue' },
  { nome: 'Larissa Oliveira', iniciais: 'LO', email: 'larissa.oliveira@hubcorp.com.br', perfil: 'Colaborador', setor: 'Operações', status: 'Inativo', avatar: 'gold' },
]

const perfis = ['Todos', 'Administrador', 'Recursos Humanos', 'Gerente', 'Colaborador', 'Manutenção']
const statusOpcoes = ['Todos', 'Ativo', 'Inativo']

function UsuariosListagem({ onNovoUsuario, onNavigate }) {
  const [busca, setBusca] = useState('')
  const [perfilSelecionado, setPerfilSelecionado] = useState('Todos')
  const [statusSelecionado, setStatusSelecionado] = useState('Todos')
  const [menuAberto, setMenuAberto] = useState(false)

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const termo = busca.toLowerCase()
    const atendeBusca = usuario.nome.toLowerCase().includes(termo) || usuario.email.toLowerCase().includes(termo)
    const atendePerfil = perfilSelecionado === 'Todos' || usuario.perfil === perfilSelecionado
    const atendeStatus = statusSelecionado === 'Todos' || usuario.status === statusSelecionado

    return atendeBusca && atendePerfil && atendeStatus
  })

  return (
    <div className="usuarios-page">
      <Sidebar isOpen={menuAberto} onClose={() => setMenuAberto(false)} onNavigate={onNavigate} />
      {menuAberto && <button className="sidebar-overlay" type="button" onClick={() => setMenuAberto(false)} aria-label="Fechar menu" />}
      <div className="usuarios-workspace">
        <Header onMenuClick={() => setMenuAberto(!menuAberto)} />
        <main className="usuarios-content">
          <section className="usuarios-title-row">
            <div>
              <h2>Gerenciamento de Usuários</h2>
              <p>Cadastro, perfis e permissões de acesso ao sistema</p>
            </div>
            <button className="new-user-button" type="button" onClick={onNovoUsuario}><Plus size={17} strokeWidth={1.8} /> <span>Novo Usuário</span></button>
          </section>

          <section className="filters" aria-label="Filtros de usuários">
            <label className="user-search">
              <Search size={17} strokeWidth={1.6} />
              <input value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Buscar por nome ou e-mail..." />
            </label>
            <div className="filter-group">
              {perfis.map((perfil) => (
                <button className={perfilSelecionado === perfil ? 'filter-selected' : ''} key={perfil} onClick={() => setPerfilSelecionado(perfil)} type="button">
                  {perfil}
                </button>
              ))}
            </div>
            <div className="filter-group status-filters">
              {statusOpcoes.map((status) => (
                <button className={statusSelecionado === status ? 'filter-selected' : ''} key={status} onClick={() => setStatusSelecionado(status)} type="button">
                  {status}
                </button>
              ))}
            </div>
          </section>

          <section className="users-table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>USUÁRIO</th><th>E-MAIL</th><th>PERFIL</th><th>SETOR</th><th>STATUS</th><th>ÚLTIMO ACESSO</th><th>AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.email}>
                    <td>
                      <div className="user-cell">
                        <div className={`user-avatar avatar-${usuario.avatar}`}>{usuario.iniciais}</div>
                        <strong>{usuario.nome}</strong>
                      </div>
                    </td>
                    <td>{usuario.email}</td>
                    <td><span className={`profile-badge profile-${usuario.perfil.replaceAll(' ', '-').toLowerCase()}`}>{usuario.perfil}</span></td>
                    <td>{usuario.setor}</td>
                    <td><span className={`status-badge ${usuario.status === 'Ativo' ? 'status-active' : 'status-inactive'}`}>{usuario.status}</span></td>
                    <td></td>
                    <td>
                      <div className="action-buttons">
                        <button aria-label={`Editar ${usuario.nome}`} className="action-button edit-button" type="button"><Pencil size={14} strokeWidth={1.6} /></button>
                        <button aria-label={`Alterar status de ${usuario.nome}`} className={`action-button toggle-button ${usuario.status === 'Inativo' ? 'toggle-active' : ''}`} type="button"><Power size={14} strokeWidth={1.6} /></button>
                        <button aria-label={`Excluir ${usuario.nome}`} className="action-button delete-button" type="button"><Trash2 size={14} strokeWidth={1.6} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {usuariosFiltrados.length === 0 && <p className="empty-message">Nenhum usuário encontrado.</p>}
          </section>
        </main>
      </div>
    </div>
  )
}

export default UsuariosListagem
