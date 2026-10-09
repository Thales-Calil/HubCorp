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
import { perfilReconhecido, temPermissao } from './config/permissoes';
import './App.css';

const telasPorItem = {
  Dashboard: 'dashboard',
  'Avisos e Comunicados': 'avisos',
  'Central do RH': 'central-rh',
  'Atividades do RH': 'atividades-rh',
  'Atividades dos Gerentes': 'atividades-gerentes',
  Infraestrutura: 'infraestrutura',
  Calendário: 'calendario',
  Chat: 'chat',
  'Meu Perfil': 'perfil',
  Usuários: 'listagem'
};

const permissaoPorTela = {
  avisos: 'VISUALIZAR_NOTIFICACAO',
  'avisos-crud': 'CRIAR_NOTIFICACAO',
  listagem: 'GERENCIAR_USUARIOS',
  crud: 'GERENCIAR_USUARIOS'
};

function AcessoNegado({ onLogout }) {
  return <main className="access-denied-page">
      <section className="access-denied-card">
        <h1>Acesso negado</h1>
        <p>Você não possui permissão para acessar esta funcionalidade.</p>
        <button type="button" onClick={onLogout}>Sair</button>
      </section>
    </main>;
}

function PerfilNaoReconhecido({ onLogout }) {
  return <main className="access-denied-page">
      <section className="access-denied-card">
        <h1>Perfil não reconhecido</h1>
        <p>O perfil retornado pela API não possui permissões configuradas no sistema.</p>
        <button type="button" onClick={onLogout}>Sair</button>
      </section>
    </main>;
}

function App() {
  const [autenticado, setAutenticado] = useState(false);
  const [token, setToken] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [tela, setTela] = useState('dashboard');
  const [usuarioEmEdicao, setUsuarioEmEdicao] = useState(null);
  const [mensagemUsuarios, setMensagemUsuarios] = useState('');
  const [notificacaoEmEdicao, setNotificacaoEmEdicao] = useState(null);
  const [mensagemAvisos, setMensagemAvisos] = useState('');
  const [mensagemSessao, setMensagemSessao] = useState('');

  function entrar({ token: novoToken, usuario: novoUsuario }) {
    setToken(novoToken);
    setUsuario(novoUsuario);
    setAutenticado(true);
    setTela('dashboard');
    setMensagemSessao('');
  }

  function sair() {
    setToken(null);
    setUsuario(null);
    setAutenticado(false);
    setTela('dashboard');
    setMensagemSessao('');
  }

  function sessaoExpirada() {
    setToken(null);
    setUsuario(null);
    setAutenticado(false);
    setTela('dashboard');
    setMensagemSessao('Sua sessão expirou. Faça login novamente.');
  }

  function telaPermitida(nomeDaTela) {
    const acao = permissaoPorTela[nomeDaTela];
    return !acao || temPermissao(usuario?.userType, acao);
  }

  function abrirTela(nomeDaTela) {
    if (!telaPermitida(nomeDaTela)) {
      setTela('acesso-negado');
      return;
    }

    setTela(nomeDaTela);
  }

  function navegar(item) {
    const destino = telasPorItem[item];

    if (destino) {
      abrirTela(destino);
    }
  }

  function novoUsuario() {
    setUsuarioEmEdicao(null);
    setMensagemUsuarios('');
    abrirTela('crud');
  }

  function editarUsuario(id) {
    if (!temPermissao(usuario?.userType, 'GERENCIAR_USUARIOS')) {
      setTela('acesso-negado');
      return;
    }

    setUsuarioEmEdicao(id);
    setMensagemUsuarios('');
    abrirTela('crud');
  }

  function concluirUsuario(mensagem) {
    setUsuarioEmEdicao(null);
    setMensagemUsuarios(mensagem);
    abrirTela('listagem');
  }

  function novoAviso() {
    setNotificacaoEmEdicao(null);
    setMensagemAvisos('');
    abrirTela('avisos-crud');
  }

  function editarAviso(id) {
    if (!temPermissao(usuario?.userType, 'EDITAR_NOTIFICACAO')) {
      setTela('acesso-negado');
      return;
    }

    setNotificacaoEmEdicao(id);
    setMensagemAvisos('');
    abrirTela('avisos-crud');
  }

  function concluirAviso(mensagem) {
    setNotificacaoEmEdicao(null);
    setMensagemAvisos(mensagem);
    abrirTela('avisos');
  }

  if (!autenticado || !token || !usuario) {
    return <Login onEntrar={entrar} mensagemSessao={mensagemSessao} />;
  }

  if (!perfilReconhecido(usuario.userType)) {
    return <PerfilNaoReconhecido onLogout={sair} />;
  }

  if (tela === 'acesso-negado' || !telaPermitida(tela)) {
    return <AcessoNegado onLogout={sair} />;
  }

  if (tela === 'dashboard') {
    return <Dashboard onNavigate={navegar} onLogout={sair} usuario={usuario} />;
  }
  if (tela === 'avisos') {
    return <AvisosListagem mensagem={mensagemAvisos} onEditarAviso={editarAviso} onNavigate={navegar} onNovoAviso={novoAviso} onLogout={sair} onSessionExpired={sessaoExpirada} token={token} usuario={usuario} />;
  }
  if (tela === 'avisos-crud') {
    return <AvisosCRUD notificacaoId={notificacaoEmEdicao} onCancelar={() => abrirTela('avisos')} onConcluido={concluirAviso} onNavigate={navegar} onLogout={sair} onSessionExpired={sessaoExpirada} token={token} usuario={usuario} />;
  }
  if (tela === 'central-rh') {
    return <CentralRH onNavigate={navegar} onLogout={sair} usuario={usuario} />;
  }
  if (tela === 'atividades-rh') {
    return <AtividadesRHListagem onNavigate={navegar} onLogout={sair} usuario={usuario} />;
  }
  if (tela === 'atividades-gerentes') {
    return <AtividadesGerentesListagem onNavigate={navegar} onLogout={sair} usuario={usuario} />;
  }
  if (tela === 'infraestrutura') {
    return <InfraestruturaListagem onNavigate={navegar} onLogout={sair} usuario={usuario} />;
  }
  if (tela === 'calendario') {
    return <CalendarioVisualizacao onNavigate={navegar} onLogout={sair} usuario={usuario} />;
  }
  if (tela === 'chat') {
    return <Chat onNavigate={navegar} onLogout={sair} usuario={usuario} />;
  }
  if (tela === 'perfil') {
    return <Perfil onNavigate={navegar} onLogout={sair} usuario={usuario} />;
  }
  if (tela === 'crud') {
    return <UsuariosCRUD onCancelar={() => abrirTela('listagem')} onConcluido={concluirUsuario} onNavigate={navegar} onLogout={sair} onSessionExpired={sessaoExpirada} token={token} usuario={usuario} usuarioId={usuarioEmEdicao} />;
  }
  if (tela === 'listagem') {
    return <UsuariosListagem mensagem={mensagemUsuarios} onEditarUsuario={editarUsuario} onNovoUsuario={novoUsuario} onNavigate={navegar} onLogout={sair} onSessionExpired={sessaoExpirada} token={token} usuario={usuario} />;
  }
  return <Dashboard onNavigate={navegar} onLogout={sair} usuario={usuario} />;
}

export default App;
