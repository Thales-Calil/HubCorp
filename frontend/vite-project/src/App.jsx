import { useState } from 'react';
import AvisosCRUD from './pages/Avisos/CRUD';
import AvisosListagem from './pages/Avisos/Listagem';
import Dashboard from './pages/Dashboard';
import CentralRH from './pages/CentralRH';
import AtividadesRHListagem from './pages/AtividadesRH/Listagem';
import AtividadesGerentesListagem from './pages/AtividadesGerentes/Listagem';
import InfraestruturaListagem from './pages/Infraestrutura/Listagem';
import CalendarioVisualizacao from './pages/Calendario/Visualizacao';
import Chat from './pages/Chat';
import Perfil from './pages/Perfil';
import Login from './pages/Login';
import UsuariosListagem from './pages/Usuarios/Listagem';
import UsuariosCRUD from './pages/Usuarios/CRUD';
function App() {
  const [autenticado, setAutenticado] = useState(false);
  const [tela, setTela] = useState('dashboard');
  function navegar(item) {
    if (item === 'Dashboard') {
      setTela('dashboard');
    }
    if (item === 'Avisos e Comunicados') {
      setTela('avisos');
    }
    if (item === 'Central do RH') {
      setTela('central-rh');
    }
    if (item === 'Atividades do RH') {
      setTela('atividades-rh');
    }
    if (item === 'Atividades dos Gerentes') {
      setTela('atividades-gerentes');
    }
    if (item === 'Infraestrutura') {
      setTela('infraestrutura');
    }
    if (item === 'Calendário') {
      setTela('calendario');
    }
    if (item === 'Chat') {
      setTela('chat');
    }
    if (item === 'Meu Perfil') {
      setTela('perfil');
    }
    if (item === 'Usuários') {
      setTela('listagem');
    }
  }
  if (!autenticado) {
    return <Login onEntrar={() => {
      setAutenticado(true);
      setTela('dashboard');
    }} />;
  }
  if (tela === 'dashboard') {
    return <Dashboard onNavigate={navegar} />;
  }
  if (tela === 'avisos') {
    return <AvisosListagem onNavigate={navegar} onNovoAviso={() => setTela('avisos-crud')} />;
  }
  if (tela === 'avisos-crud') {
    return <AvisosCRUD onCancelar={() => setTela('avisos')} onNavigate={navegar} />;
  }
  if (tela === 'central-rh') {
    return <CentralRH onNavigate={navegar} />;
  }
  if (tela === 'atividades-rh') {
    return <AtividadesRHListagem onNavigate={navegar} />;
  }
  if (tela === 'atividades-gerentes') {
    return <AtividadesGerentesListagem onNavigate={navegar} />;
  }
  if (tela === 'infraestrutura') {
    return <InfraestruturaListagem onNavigate={navegar} />;
  }
  if (tela === 'calendario') {
    return <CalendarioVisualizacao onNavigate={navegar} />;
  }
  if (tela === 'chat') {
    return <Chat onNavigate={navegar} />;
  }
  if (tela === 'perfil') {
    return <Perfil onNavigate={navegar} />;
  }
  if (tela === 'crud') {
    return <UsuariosCRUD onCancelar={() => setTela('listagem')} onNavigate={navegar} />;
  }
  return <UsuariosListagem onNovoUsuario={() => setTela('crud')} onNavigate={navegar} />;
}
export default App;
