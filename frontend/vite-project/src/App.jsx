import { useState } from 'react'
import AvisosCRUD from './pages/Avisos/CRUD'
import AvisosListagem from './pages/Avisos/Listagem'
import Dashboard from './pages/Dashboard'
import UsuariosListagem from './pages/Usuarios/Listagem'
import UsuariosCRUD from './pages/Usuarios/CRUD'

function App() {
  const [tela, setTela] = useState('dashboard')

  function navegar(item) {
    if (item === 'Dashboard') {
      setTela('dashboard')
    }

    if (item === 'Avisos e Comunicados') {
      setTela('avisos')
    }

    if (item === 'Usuários') {
      setTela('listagem')
    }
  }

  if (tela === 'dashboard') {
    return <Dashboard onNavigate={navegar} />
  }

  if (tela === 'avisos') {
    return <AvisosListagem onNavigate={navegar} onNovoAviso={() => setTela('avisos-crud')} />
  }

  if (tela === 'avisos-crud') {
    return <AvisosCRUD onCancelar={() => setTela('avisos')} onNavigate={navegar} />
  }

  if (tela === 'crud') {
    return <UsuariosCRUD onCancelar={() => setTela('listagem')} onNavigate={navegar} />
  }

  return <UsuariosListagem onNovoUsuario={() => setTela('crud')} onNavigate={navegar} />
}

export default App
