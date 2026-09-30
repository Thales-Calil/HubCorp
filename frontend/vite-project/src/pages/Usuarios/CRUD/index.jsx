import { useState } from 'react';
import { Check } from 'lucide-react';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import './style.css';
const modulos = ['Avisos e Comunicados', 'Central do RH', 'Atividades do RH', 'Atividades dos Gerentes', 'Infraestrutura', 'Chat Corporativo', 'Calendário', 'Gerenciamento de Usuários', 'Perfil Pessoal'];
const permissoesPadrao = ['Chat Corporativo', 'Perfil Pessoal'];
function UsuariosCRUD({
  onCancelar,
  onNavigate
}) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataAdmissao, setDataAdmissao] = useState('');
  const [cargo, setCargo] = useState('');
  const [setor, setSetor] = useState('Comercial');
  const [perfil, setPerfil] = useState('Colaborador');
  const [status, setStatus] = useState('Ativo');
  const [permissoes, setPermissoes] = useState(permissoesPadrao);
  const [menuAberto, setMenuAberto] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const iniciais = nome ? nome.split(' ').filter(Boolean).slice(0, 2).map(parte => parte[0]).join('').toUpperCase() : '??';
  function alterarPermissao(modulo) {
    if (permissoes.includes(modulo)) {
      setPermissoes(permissoes.filter(permissao => permissao !== modulo));
      return;
    }
    setPermissoes([...permissoes, modulo]);
  }
  function limparFormulario() {
    setNome('');
    setEmail('');
    setTelefone('');
    setDataAdmissao('');
    setCargo('');
    setSetor('Comercial');
    setPerfil('Colaborador');
    setStatus('Ativo');
    setPermissoes(permissoesPadrao);
    setMensagem('');
  }
  function criarUsuario() {
    if (!nome || !email || !setor || !perfil) {
      setMensagem('Preencha os campos obrigatórios para criar o usuário.');
      return;
    }
    console.log({
      nome,
      email,
      telefone,
      dataAdmissao,
      cargo,
      setor,
      perfil,
      status,
      permissoes
    });
    setMensagem('Usuário preenchido com sucesso.');
  }
  return <div className="crud-page">
      <Sidebar isOpen={menuAberto} onClose={() => setMenuAberto(false)} onNavigate={onNavigate} />
      {menuAberto && <button className="crud-sidebar-overlay" type="button" onClick={() => setMenuAberto(false)} aria-label="Fechar menu" />}

      <div className="crud-workspace">
        <Header onMenuClick={() => setMenuAberto(!menuAberto)} />

        <main className="crud-content">
          <section className="crud-heading">
            <h2>Novo Usuário</h2>
            <p>Preencha os dados e configure as permissões de acesso</p>
          </section>

          <div className="crud-layout">
            <div className="crud-form-column">
              <section className="crud-card">
                <h3>Dados pessoais</h3>
                <div className="form-grid">
                  <label>Nome completo <em>*</em><input value={nome} onChange={event => setNome(event.target.value)} placeholder="Ex: Maria Silva" /></label>
                  <label>E-mail corporativo <em>*</em><input type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="nome@hubcorp.com.br" /></label>
                  <label>Telefone<input value={telefone} onChange={event => setTelefone(event.target.value)} placeholder="(11) 99999-9999" /></label>
                  <label>Data de admissão<input type="date" value={dataAdmissao} onChange={event => setDataAdmissao(event.target.value)} /></label>
                </div>
              </section>

              <section className="crud-card">
                <h3>Dados corporativos</h3>
                <div className="form-grid">
                  <label>Cargo<input value={cargo} onChange={event => setCargo(event.target.value)} placeholder="Ex: Analista Comercial" /></label>
                  <label>Setor <em>*</em><select value={setor} onChange={event => setSetor(event.target.value)}><option>Tecnologia da Informação</option><option>Recursos Humanos</option><option>Comercial</option><option>Marketing</option><option>Operações</option><option>Facilities</option></select></label>
                  <label>Perfil de acesso <em>*</em><select value={perfil} onChange={event => setPerfil(event.target.value)}><option>Administrador</option><option>Recursos Humanos</option><option>Gerente</option><option>Colaborador</option><option>Manutenção</option></select></label>
                  <label>Status<select value={status} onChange={event => setStatus(event.target.value)}><option>Ativo</option><option>Inativo</option></select></label>
                </div>
              </section>

              <section className="crud-card permissions-card">
                <div className="card-title-row"><h3>Permissões de acesso</h3><button type="button" onClick={() => setPermissoes(permissoesPadrao)}>Restaurar padrões do perfil</button></div>
                <p>Carregado com base no perfil {perfil}. Personalize conforme necessário.</p>
                <div className="permissions-grid">
                  {modulos.map(modulo => {
                  const selecionado = permissoes.includes(modulo);
                  return <label className={selecionado ? 'permission-option permission-selected' : 'permission-option'} key={modulo}>
                      <input type="checkbox" checked={selecionado} onChange={() => alterarPermissao(modulo)} />
                      <span className="checkbox-icon">{selecionado && <Check size={13} strokeWidth={3} />}</span><span>{modulo}</span>
                    </label>;
                })}
                </div>
              </section>

              {mensagem && <p className="form-message">{mensagem}</p>}
              <div className="form-actions"><button className="cancel-button" type="button" onClick={onCancelar}>Cancelar</button><button className="create-button" type="button" onClick={criarUsuario}>Criar usuário</button></div>
            </div>

            <aside className="preview-column">
              <p className="preview-title">Pré-visualização</p>
              <section className="preview-card">
                <div className="preview-avatar">{iniciais}</div>
                <strong>{nome || 'Nome do usuário'}</strong><span>{cargo || 'Cargo'}</span><small>{perfil}</small>
                <div className={status === 'Ativo' ? 'preview-status status-on' : 'preview-status status-off'}>{status}</div><p>{setor}</p>
              </section>
              <section className="access-card"><h3>Módulos com acesso</h3>{permissoes.length > 0 ? <ul>{permissoes.map(permissao => <li key={permissao}>{permissao}</li>)}</ul> : <p>Nenhum módulo selecionado</p>}</section>
            </aside>
          </div>
        </main>
      </div>
    </div>;
}
export default UsuariosCRUD;
