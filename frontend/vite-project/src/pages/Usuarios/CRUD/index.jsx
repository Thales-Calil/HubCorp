import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import { permissoesPorPerfil } from '../../../config/permissoes';
import { ApiError } from '../../../services/api';
import { listarSetores } from '../../../services/setorService';
import { atualizarUsuario, buscarUsuario, criarUsuario } from '../../../services/usuarioService';
import './style.css';

const perfis = [{
  valor: 'RH',
  nome: 'Recursos Humanos'
}, {
  valor: 'GERENTE',
  nome: 'Gerente'
}, {
  valor: 'COLABORADOR',
  nome: 'Colaborador'
}];

function iniciaisDoNome(nome) {
  return nome.split(' ').filter(Boolean).slice(0, 2).map(parte => parte[0]).join('').toUpperCase() || '??';
}

function nomeDoPerfil(valor) {
  return perfis.find(perfil => perfil.valor === valor)?.nome || 'Perfil não identificado';
}

function mensagemDeErro(error, operacao) {
  if (error instanceof ApiError && error.status === 403) {
    return 'Você não possui permissão para esta operação.';
  }

  if (error instanceof ApiError && error.status === 0) {
    return 'Não foi possível conectar à API.';
  }

  return `Não foi possível ${operacao}.`;
}

function UsuariosCRUD({
  onCancelar,
  onConcluido,
  onNavigate,
  onLogout,
  onSessionExpired,
  token,
  usuario,
  usuarioId
}) {
  const editando = Boolean(usuarioId);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cargo, setCargo] = useState('');
  const [setorId, setSetorId] = useState('');
  const [perfil, setPerfil] = useState('COLABORADOR');
  const [ativo, setAtivo] = useState(true);
  const [setores, setSetores] = useState([]);
  const [menuAberto, setMenuAberto] = useState(false);
  const [carregandoDados, setCarregandoDados] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    let ativoNoComponente = true;

    async function carregarFormulario() {
      setCarregandoDados(true);
      setMensagem('');

      try {
        const requisicoes = [listarSetores(token)];

        if (editando) {
          requisicoes.push(buscarUsuario(usuarioId, token));
        }

        const [setoresDaApi, usuarioDaApi] = await Promise.all(requisicoes);

        if (!ativoNoComponente) return;

        setSetores(Array.isArray(setoresDaApi) ? setoresDaApi : []);

        if (usuarioDaApi) {
          setNome(usuarioDaApi.nome || '');
          setEmail(usuarioDaApi.email || '');
          setTelefone(usuarioDaApi.telefone || '');
          setCargo(usuarioDaApi.cargo || '');
          setSetorId(String(usuarioDaApi.setorId || ''));
          setPerfil(usuarioDaApi.userType || 'COLABORADOR');
          setAtivo(usuarioDaApi.ativo === true);
          setSenha('');
        }
      } catch (error) {
        if (!ativoNoComponente) return;

        if (error instanceof ApiError && error.status === 401) {
          onSessionExpired();
          return;
        }

        setMensagem(mensagemDeErro(error, editando ? 'carregar o usuário' : 'carregar os setores'));
      } finally {
        if (ativoNoComponente) setCarregandoDados(false);
      }
    }

    carregarFormulario();

    return () => {
      ativoNoComponente = false;
    };
  }, [editando, onSessionExpired, token, usuarioId]);

  const iniciais = iniciaisDoNome(nome);
  const setorSelecionado = setores.find(setor => Number(setor.id) === Number(setorId));
  const nomeSetor = setorSelecionado?.nome || (carregandoDados ? 'Carregando setores...' : 'Setor não identificado');
  const permissoes = permissoesPorPerfil[perfil] || [];

  async function salvarUsuario() {
    setMensagem('');

    if (!nome.trim() || !email.trim() || !setorId || !perfil || (!editando && !senha)) {
      setMensagem('Preencha os campos obrigatórios para salvar o usuário.');
      return;
    }

    if (setores.length === 0) {
      setMensagem('Nenhum setor disponível para o cadastro.');
      return;
    }

    const dados = {
      nome: nome.trim(),
      email: email.trim(),
      telefone: telefone.trim() || null,
      cargo: cargo.trim() || null,
      setorId: Number(setorId),
      userType: perfil,
      ativo
    };

    if (senha) {
      dados.senha = senha;
    }

    setSalvando(true);

    try {
      if (editando) {
        await atualizarUsuario(usuarioId, dados, token);
        onConcluido('Usuário atualizado com sucesso.');
      } else {
        await criarUsuario(dados, token);
        onConcluido('Usuário criado com sucesso.');
      }
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        onSessionExpired();
        return;
      }

      setMensagem(mensagemDeErro(error, editando ? 'atualizar o usuário' : 'criar o usuário'));
    } finally {
      setSalvando(false);
    }
  }

  return <div className="crud-page">
      <Sidebar isOpen={menuAberto} onClose={() => setMenuAberto(false)} onNavigate={onNavigate} usuario={usuario} />
      {menuAberto && <button className="crud-sidebar-overlay" type="button" onClick={() => setMenuAberto(false)} aria-label="Fechar menu" />}

      <div className="crud-workspace">
        <Header onMenuClick={() => setMenuAberto(!menuAberto)} onLogout={onLogout} usuario={usuario} />

        <main className="crud-content">
          <section className="crud-heading">
            <h2>{editando ? 'Editar Usuário' : 'Novo Usuário'}</h2>
            <p>{editando ? 'Atualize os dados suportados pelo cadastro corporativo' : 'Preencha os dados para cadastrar um novo usuário'}</p>
          </section>

          <div className="crud-layout">
            <div className="crud-form-column">
              <section className="crud-card">
                <h3>Dados pessoais</h3>
                <div className="form-grid">
                  <label>Nome completo <em>*</em><input value={nome} onChange={event => setNome(event.target.value)} placeholder="Ex: Maria Silva" /></label>
                  <label>E-mail corporativo <em>*</em><input type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="nome@hubcorp.com.br" /></label>
                  <label>Telefone<input value={telefone} onChange={event => setTelefone(event.target.value)} placeholder="(11) 99999-9999" /></label>
                  <label>Data de admissão <small>Não persistida pela API</small><input type="date" disabled value="" /></label>
                  <label>Senha {editando ? <small>Deixe em branco para manter a atual</small> : <em>*</em>}<input type="password" value={senha} onChange={event => setSenha(event.target.value)} autoComplete="new-password" /></label>
                </div>
              </section>

              <section className="crud-card">
                <h3>Dados corporativos</h3>
                <div className="form-grid">
                  <label>Cargo<input value={cargo} onChange={event => setCargo(event.target.value)} placeholder="Ex: Analista Comercial" /></label>
                  <label>Setor <em>*</em><select value={setorId} disabled={carregandoDados || setores.length === 0} onChange={event => setSetorId(event.target.value)}><option value="">{carregandoDados ? 'Carregando setores...' : setores.length === 0 ? 'Nenhum setor disponível' : 'Selecione um setor'}</option>{setores.map(setor => <option key={setor.id} value={setor.id}>{setor.nome}</option>)}</select></label>
                  <label>Perfil de acesso <em>*</em><select value={perfil} onChange={event => setPerfil(event.target.value)}>{perfis.map(opcao => <option key={opcao.valor} value={opcao.valor}>{opcao.nome}</option>)}</select></label>
                  <label>Status<select value={ativo ? 'true' : 'false'} onChange={event => setAtivo(event.target.value === 'true')}><option value="true">Ativo</option><option value="false">Inativo</option></select></label>
                </div>
              </section>

              <section className="crud-card permissions-card">
                <div className="card-title-row"><h3>Permissões de acesso</h3></div>
                <p>Definidas pelo perfil no backend. Alterações individuais não são persistidas.</p>
                <div className="permissions-grid">
                  {permissoes.map(permissao => <div className="permission-option permission-selected permission-readonly" key={permissao}><span className="checkbox-icon"><Check size={13} strokeWidth={3} /></span><span>{permissao}</span></div>)}
                </div>
              </section>

              {mensagem && <p className="form-message" role="alert">{mensagem}</p>}
              <div className="form-actions"><button className="cancel-button" type="button" disabled={salvando} onClick={onCancelar}>Cancelar</button><button className="create-button" type="button" disabled={salvando || carregandoDados || setores.length === 0} onClick={salvarUsuario}>{salvando ? 'Salvando...' : editando ? 'Salvar alterações' : 'Criar usuário'}</button></div>
            </div>

            <aside className="preview-column">
              <p className="preview-title">Pré-visualização</p>
              <section className="preview-card">
                <div className="preview-avatar">{iniciais}</div>
                <strong>{nome || 'Nome do usuário'}</strong><span>{cargo || 'Cargo'}</span><small>{nomeDoPerfil(perfil)}</small>
                <div className={ativo ? 'preview-status status-on' : 'preview-status status-off'}>{ativo ? 'Ativo' : 'Inativo'}</div><p>{nomeSetor}</p>
              </section>
              <section className="access-card"><h3>Permissões do perfil</h3>{permissoes.length > 0 ? <ul>{permissoes.map(permissao => <li key={permissao}>{permissao}</li>)}</ul> : <p>Nenhuma permissão configurada</p>}</section>
            </aside>
          </div>
        </main>
      </div>
    </div>;
}

export default UsuariosCRUD;
